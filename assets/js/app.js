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
        <div class="card border-0 mx-auto" style="width: 14rem;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">${brand}</p>
                <div class="d-flex justify-content-between">
                    <h6 class="card-title">${phone_name}</h6>
                    <p onclick="loadPhoneDetail('${slug}')" class="card-text text-primary" style="cursor: pointer">
                        more
                    </p>
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

const displayPhoneDetail = (data) => {
    const { brand, image, mainFeatures, name, releaseDate, others } = data;
    console.log(brand, image, mainFeatures, name, releaseDate, others);
    const phoneDetail = document.createElement('div');
    phoneDetail.innerHTML = `
    <div class="card border-0 mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${releaseDate}</p>
                    <p class="card-text"></p>
                </div>
            </div>
        </div>
    </div>
    `;
    phoneDetailContainer.appendChild(phoneDetail);
};