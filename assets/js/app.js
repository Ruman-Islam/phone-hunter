// Some useful variables
const searchBox = document.querySelector('.search__box');
const phonesContainer = document.querySelector('.phones__container');
const phoneDetail = document.querySelector('.phone__detail');

const errorHandler = (error) => {
    phonesContainer.innerHTML = `<h1 class="text-center">${error}</h1>`;
};

const clearPreviousData = () => {
    phonesContainer.textContent = '';
};

// Function of Load all Phones
const loadProducts = async () => {
    if (searchBox.value === '') {
        errorHandler('You typed nothing');
    } else {
        clearPreviousData();
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
    }
};


// Function of Display Relevant Phones
const displayProducts = phones => {
    phones.forEach(phone => {
        // Destructuring info
        const { brand, phone_name, slug, image } = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col-md-3');
        phoneDiv.innerHTML = `
        <div class="card border-0 mx-auto" style="width: 14rem;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone_name}</h5>
                <p class="card-text">${brand}</p>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
};