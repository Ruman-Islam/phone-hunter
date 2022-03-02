// Some useful variables //
const searchBox = document.querySelector('.search__box');
const productsContainer = document.querySelector('.products__container');
const productDetailContainer = document.querySelector('.product__detail');
const showAllButton = document.querySelector('.show__all');
const toast = document.querySelector('.toast');
let totalProducts = [];
//............................//
//............................//

//....Utility functions.....//
//..Function of set dynamically error message as inner html..//
const errorHandler = error => {
    productsContainer.innerHTML = `<h2 class="text-center mt-5">${error}</h2>`;
    showAllButton.innerHTML = '';
};
//............................//


//..Loading spinner toggler..//
const spinnerToggler = (style) => {
    document.querySelector('.spinner').style.display = style;
};  // While data is loading 
//............................//


//.......Search with Enter Button........//
const searchWithEnter = e => {   // Type product name in the search box &
    if (e.keyCode === 13) {   // hit the enter button for search
        loadProducts();
    }
};
//............................//
//.....................................//


// Function of load all products //
const loadProducts = async () => {
    errorHandler('');
    productDetailContainer.textContent = '';
    if (searchBox.value === '') {  // When search box is empty
        errorHandler('');
        errorHandler('type something');
    } else {
        spinnerToggler('block');
        try {
            const url = `https://openapi.programming-hero.com/api/phones?search=${searchBox.value}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.status) {
                toast.classList.add('show');
                displayProducts(data.data, true);
                totalProducts = data.data;  // Storing all products for show all
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


// Function of display desired products //
const displayProducts = (products, isTrue) => {
    let isShowAll;
    if (isTrue) {
        products = products.slice(0, 20);  // Load 20 products
        isShowAll = true;
    } else {
        isShowAll = false;
        errorHandler('');
        products = totalProducts;  // Load all products 
    }
    products.forEach(product => {
        // Destructuring data from product //
        const { brand, phone_name, slug, image } = product;
        const productDiv = document.createElement('div');
        productDiv.classList.add('col-md-4');

        // A simple product card //
        productDiv.innerHTML = `
            <div class="card border-0 mx-auto mb-4" style="width: 13rem;">
                <img src="${image}" class="card-img-top" alt="${phone_name}">
                <div class="card-body">
                    <p class="card-text">${brand}</p>
                    <h6 class="card-title">${phone_name}</h6>
                    <a
                        href="#products__container"
                        onclick="loadproductDetail('${slug}')" 
                        style="text-decoration: none; text-align: center">
                        Detail
                    </a>
                </div>
            </div>
            `;
        productsContainer.appendChild(productDiv);
    });
    // Condition for show all button or not //
    if (isShowAll === true) {
        showAllButton.innerHTML = `
                <button onclick="displayProducts('false')" type="button" class="btn btn-outline-dark btn-sm">
                    Show all
                </button>
            `;
    } else {
        totalProducts = [];
        showAllButton.innerHTML = '';
    }
};
//..........................................................//
//..........................................................//


// Function of load product details //
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


// Function of display product details //
const displayProductDetail = product => {
    // Destructuring data from product //
    const { image, name, releaseDate,
        mainFeatures: { chipSet, displaySize, memory, sensors, storage } = {},
        others: { Bluetooth, GPS, NFC, Radio, USB, WLAN } = {} } = product;

    // A simple card of product details //
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