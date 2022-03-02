// Some useful variables //
const searchBox = document.querySelector('.search__box');
const productsContainer = document.querySelector('.products__container');
const productDetailContainer = document.querySelector('.product__detail');
const loadButton = document.querySelector('.load__btn');
let totalProducts = [];
//............................//
//............................//

//....Some utilities functions.....//
//..Function of set error message as inner html..//
const errorHandler = error => {
    productsContainer.innerHTML = `<h2 class="text-center mt-5">${error}</h2>`;
    loadButton.innerHTML = '';

};
//............................//


//..Loading spinner toggler..//
const spinnerToggler = (style) => {
    document.querySelector('.spinner').style.display = style;
};
//............................//


//.......Search with Enter Button........//
const searchWithEnter = e => {
    if (e.keyCode === 13) {
        loadProducts();
    }
};
//............................//
//....Some Utilities Functions End.....//


// Function of Load all Phones //
const loadProducts = async () => {
    errorHandler('');
    productDetailContainer.textContent = '';
    if (searchBox.value === '') {
        errorHandler('');
        errorHandler('type something');
    } else {
        spinnerToggler('block');
        try {
            const url = `https://openapi.programming-hero.com/api/phones?search=${searchBox.value}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.status) {
                displayProducts(data.data, true);
                totalProducts = data.data;
            } else {
                errorHandler('');
                throw 'No result found';
            }
        } catch (error) {
            errorHandler(error);
        }
        spinnerToggler('none');
    }
    searchBox.value = '';
};
//............................//
//............................//


// Function of Display Desired Phones //
const displayProducts = (products, isTrue) => {
    let isFalse;
    if (isTrue) {
        products = products.slice(0, 20);
        isFalse = true;
    } else {
        isFalse = false;
        errorHandler('');
        products = totalProducts;  // load all products 
    }
    products.forEach(product => {
        // Destructuring data from phone //
        const { brand, phone_name, slug, image } = product;
        const productDiv = document.createElement('div');
        productDiv.classList.add('col-md-3');
        productDiv.innerHTML = `
            <div class="card border-0 mx-auto mb-4" style="width: 10rem;">
                <img src="${image}" class="card-img-top" alt="${phone_name}">
                <div class="card-body">
                    <p class="card-text">${brand}</p>
                    <h6 class="card-title">${phone_name}</h6>
                    <a href="#products__container" onclick="loadproductDetail('${slug}')" style="text-decoration: none; text-align: center">Detail</a>
                </div>
            </div>
            `;
        productsContainer.appendChild(productDiv);
    });
    if (isFalse === true) {
        loadButton.innerHTML = `
                <button onclick="displayProducts('false')" type="button" class="btn btn-outline-dark btn-sm">
                    load more
                </button>
            `;
    } else {
        totalProducts = [];
        loadButton.innerHTML = '';
    }
};
//..........................................................//
//..........................................................//


// Load Details function //
const loadproductDetail = async slug => {
    productDetailContainer.textContent = '';
    try {
        const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.status) {
            displayProductDetail(data.data);
        } else {
            throw 'Nothing is found';
        }
    } catch (error) {
        errorHandler(error);
    }
};
//.....................................//
//.....................................//


// Function of display phone details //
const displayProductDetail = product => {
    // Destructuring data from phone //
    const { image, name, releaseDate,
        mainFeatures: { chipSet, displaySize, memory, sensors, storage } = {},
        others: { Bluetooth, GPS, NFC, Radio, USB, WLAN } = {} } = product;
    const productDetail = document.createElement('div');
    productDetail.innerHTML = `
    <div class="card mb-5 p-2 mx-auto" style="max-width: 1000px;">
        <div class="row text-center">
            <div class="col-12">
                <img src="${image}" class="img-fluid w-25 rounded-start" alt="${name}">
                <h5 class="card-title text-muted m-2">${name}</h5>
                <p class="card-text m-2">${releaseDate ? releaseDate : 'no release date'}</p>
            </div>
        </div>
            <div class="card-body text-center">
                <ul>
                    <h6 class="card-text"><strong>Specification</strong></h6>
                    <li>Chipset: <small>${chipSet ? chipSet : 'No'}</small></li>
                    <li>Display: <small>${displaySize ? displaySize : 'No'}</small></li>
                    <li>RAM: <small>${memory ? memory : 'No'}</small></li>
                    <li>Storage: <small>${storage ? storage : 'No'}</small></li>
                    <li>Sensors: <small>${sensors ? sensors.join(', ') : 'No'}</small></li>
                </ul>
                <ul>
                    <h6 class="card-text"><strong>Others</strong></h6>
                    <li>Bluetooth: <small>${Bluetooth ? Bluetooth : 'No'}</small></li>
                    <li>GPS: <small>${GPS ? GPS : 'No'}</small></li>
                    <li>NFC: <small>${NFC ? NFC : 'No'}</small></li>
                    <li>FM: <small>${Radio ? Radio : 'No'}</small></li>
                    <li>USB: <small>${USB ? USB : 'No'}</small></li>
                    <li>WLAN: <small>${WLAN ? WLAN : 'No'}</small></li>
                </ul>
            </div>
    </div>
    `;
    productDetailContainer.appendChild(productDetail);
};
//.......................................................//
//.......................................................//
// Thank You //