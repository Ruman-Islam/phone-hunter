// Some useful variables
const searchBox = document.querySelector('.search__box');
const phonesContainer = document.querySelector('.phones__container');
const phoneDetailContainer = document.querySelector('.phone__detail');
//............................//

//..Some utilities functions..//
//..Function of set error message as inner html..//
const errorHandler = (error) => {
    phonesContainer.innerHTML = `<h1 class="text-center mt-5">${error}</h1>`;
};
//............................//

//............................//
// const clearPreviousData = (param) => {
//     if (param) {
//         phonesContainer.textContent = '';
//     } else {
//         phoneDetail.textContent = '';
//     }
// };
//............................//

//..Loading spinner toggler..//
const spinnerToggler = (style) => {
    document.querySelector('.spinner').style.display = style;
};
//............................//

//..Enter Search..//
const searchWithEnter = e => {
    if (e.keyCode === 13) {
        loadProducts();
    }
};
//............................//

// Function of Load all Phones
const loadProducts = async () => {
    phonesContainer.textContent = '';
    phoneDetailContainer.textContent = '';
    if (searchBox.value === '') {
        errorHandler('You typed nothing');
    } else {
        spinnerToggler('block');
        try {
            const url = `https://openapi.programming-hero.com/api/phones?search=${searchBox.value}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.status) {
                displayProducts(data.data);
            } else {
                throw 'Nothing is found';
            }
        } catch (error) {
            errorHandler(error);
        }
        spinnerToggler('none');
    }
    searchBox.value = '';
};
//............................//


// Function of Display Desired Phones
const displayProducts = phones => {
    phones = phones.slice(0, 20);
    phones.forEach(phone => {
        // Destructuring here from phone
        const { brand, phone_name, slug, image } = phone;
        // console.log(slug);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col-md-3');
        phoneDiv.innerHTML = `
        <div class="card border-0 mx-auto" style="width: 10rem;">
            <img src="${image}" class="card-img-top" alt="${phone_name}">
            <div class="card-body">
                <p class="card-text">${brand}</p>
                <div class="d-flex justify-content-between">
                    <h6 class="card-title">${phone_name}</h6>
                    <a href="#header" onclick="loadPhoneDetail('${slug}')" class="card-text text-primary" style="text-decoration: none">
                        Detail
                    </a>
                </div>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
};
//............................//


// More details function
const loadPhoneDetail = async id => {
    phoneDetailContainer.textContent = '';
    try {
        const url = `https://openapi.programming-hero.com/api/phone/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.status) {
            displayPhoneDetail(data.data);
        } else {
            throw 'Nothing is found';
        }
    } catch (error) {
        errorHandler(error);
    }
};
//............................//


// Function of display phone details
const displayPhoneDetail = (data) => {
    const { image, name, releaseDate,
        mainFeatures: { chipSet, displaySize, memory, sensors, storage } = {},
        others: { Bluetooth, GPS, NFC, Radio, USB, WLAN } = {} } = data;
    const phoneDetail = document.createElement('div');
    phoneDetail.innerHTML = `
    <div class="card mb-5 p-2 mx-auto" style="max-width: 1000px;">
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${image}" class="h-75 rounded-start" alt="${name}">
                <h5 class="card-title text-muted m-3">${name}</h5>
                <p class="card-text m-3">${releaseDate ? releaseDate : 'no release date'}</p>
            </div>
            <div class="col-md-5">
                <div class="card-body">
                    <h6 class="card-text"><strong>Specification</strong></h6>
                    <p class="card-text">${chipSet}</p>
                    <p class="card-text">${displaySize}</p>
                    <p class="card-text">${memory}</p>
                    <p class="card-text">${storage}</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card-body">
                <h6 class="card-text"><strong>Others</strong></h6>
                <p class="card-text">${Bluetooth}</p>
                <p class="card-text">${GPS}</p>
                <p class="card-text">${NFC}</p>
                <p class="card-text">${Radio}</p>
                <p class="card-text">${USB}</p>
                <p class="card-text">${WLAN}</p>
                </div>
            </div>
        </div>
    </div>
    `;
    phoneDetailContainer.appendChild(phoneDetail);
};
//............................//