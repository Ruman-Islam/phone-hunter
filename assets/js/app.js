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
    if (searchBox.value === '') {  // While search box is empty
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
        productDiv.classList.add('col-md-3');

        // A simple product card //
        productDiv.innerHTML = `
            <div class="card border-0 mx-auto mb-4" style="width: 13rem;">
                <img src="${image}" class="card-img-top" alt="${phone_name}">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <p class="card-text">${brand}</p>
                        <a
                            href="#products__container"
                            onclick="loadproductDetail('${slug}')" 
                            style="text-decoration: none;">
                            <svg xmlns="http://www.w3.org/2000/svg" style="width: 20px"
                            class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                            more
                        </a>
                    </div>
                    <h6 class="card-title">${phone_name}</h6>
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
        <div class="row mb-5">
            <div class="card col-md-5 p-2">
                <img src="${image}" class="img-fluid w-75 rounded-start" alt="${name}">
                <h2 class="card-title text-muted m-3">${name}</h2>
                <h6 class="card-text text-muted ms-3">Release Date: <small>${releaseDate ? releaseDate : 'Not available'}</small></h6>
            </div>
            <div class="card col-md-7 p-2">
                <ul>
                    <h5 class="card-text text-muted mt-5"><strong>Specification</strong></h5>
                    <li><strong>Chipset:</strong> <small>${chipSet ? chipSet : 'Not available'}</small></li>
                    <li><strong>Display:</strong> <small>${displaySize ? displaySize : 'Not available'}</small></li>
                    <li><strong>RAM:</strong> <small>${memory ? memory : 'Not available'}</small></li>
                    <li><strong>Storage:</strong> <small>${storage ? storage : 'Not available'}</small></li>
                    <li><strong>Sensors:</strong> <small>${sensors ? sensors.join(', ') : 'Not available'}</small></li>
                </ul>
                <ul>
                    <h5 class="card-text text-muted mt-5"><strong>Other Features</strong></h5>
                    <li><strong>Bluetooth:</strong> <small>${Bluetooth ? Bluetooth : 'Not available'}</small></li>
                    <li><strong>GPS:</strong> <small>${GPS ? GPS : 'Not available'}</small></li>
                    <li><strong>NFC:</strong> <small>${NFC ? NFC : 'Not available'}</small></li>
                    <li><strong>FM:</strong> <small>${Radio ? Radio : 'Not available'}</small></li>
                    <li><strong>USB:</strong> <small>${USB ? USB : 'Not available'}</small></li>
                    <li><strong>WLAN:</strong> <small>${WLAN ? WLAN : 'Not available'}</small></li>
                </ul>
            </div>
        </div>
    `;
    productDetailContainer.appendChild(productDetail);
};
//.......................................................//
//.......................................................//
// Thank You //