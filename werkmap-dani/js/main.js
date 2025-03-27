window.addEventListener('load', init);

const apiUrl = 'webservice/index.php';
let productList = [];
let productDetails;
let productGallery;
let confirmationScreen;

function init() {
    productGallery = document.querySelector('#products-gallery');
    productDetails = document.querySelector('#details-list');
    confirmationScreen = document.querySelector('#confirmation-screen');
    getProductData();
}

function getProductData() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(createProductCards)

        .catch(ajaxErrorHandler);
}

function createProductCards(data) {
    console.log(data);

    for (let product of data) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.dataset.name = product.name;

        productGallery.appendChild(productCard);
        fillProductCard(product);
        productList = data;
    }
}

function fillProductCard(product) {
    const productCard = document.querySelector(`.product-card[data-name='${product.name}']`);

    const productName = document.createElement('h2');
    productName.classList.add('name');
    productName.innerText = `${product.name}`;
    productCard.appendChild(productName);

    const productImg = document.createElement('img');
    productImg.src = `webservice/img/${product.id}.avif`;
    productImg.alt = product.name;
    productCard.appendChild(productImg);
    productImg.addEventListener("click", function () {
        createConfirmationScreen(product.id);
        fetchProductDetails(product.id);
        console.log(product.id)
    });

    const productPrice = document.createElement('h3');
    productPrice.classList.add('price');
    productPrice.innerText = `€${product.price}`;
    productCard.appendChild(productPrice);
}

function ajaxErrorHandler(error) {
    console.log(error);
    const message = document.createElement('div');
    message.classList.add('error');
    message.innerHTML = 'Something went wrong, please try again later.';
    productGallery.before(message);
}

function fetchProductDetails(id) {
    fetch(`webservice/index.php?id=${id}`)
        .then(response => {

            return response.json();

        })
        .then(details => {
            const productInfo = productList.find(product => product.id === id);
            if (!productInfo) {
                console.error("Product niet gevonden!");
                return;
            }
            displayProductDetails(productInfo, details);
        })
        .catch(error => {
            console.error("Error fetching details:", error.message);
            productDetails.innerHTML = `<p class="error-message">${error.message}</p>`;
        });
}

function displayProductDetails(product, details) {
    productDetails.innerHTML =
        `<div class="details-box">
         <img src="webservice/img/${product.id}.avif" alt="${product.name}" class="details-image">
         <h2>${product.name}</h2>
         <p><strong>Ingredienten:</strong> ${details.ingredients}</p>
         <p><strong>Gewicht:</strong> ${details.weight}</p>
         <p><strong>Allergien:</strong> ${details.allergies}</p>
         </div>
        `
    productDetails.style.display = "block";
}

function createConfirmationScreen(id) {
    fetch(`webservice/index.php?id=${id}`)
        .then(response => {

            return response.json();

        })
        .then(details => {
            const productInfo = productList.find(product => product.id === id);
            if (!productInfo) {
                console.error("Product niet gevonden!");
                return;
            }
            productConfirmationScreen(productInfo);
        })
        .catch(error => {
            console.error("Error fetching details:", error.message);
            confirmationScreen.innerHTML = `<p class="error-message">${error.message}</p>`;
        });
}

function productConfirmationScreen(product) {

    confirmationScreen.innerHTML =
        `
        <div class="confirmation-box">
         <img src="webservice/img/${product.id}.avif" alt="${product.name}" class="details-image">
         <h2>${product.name}</h2>
         <p>✔</p>
         <p>❌</p>
    `
}