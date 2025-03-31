window.addEventListener('load', init);

const apiUrl = 'webservice/products.php';
let body;
let productList = [];
let productDetails;
let detailsContent;
let productGallery;
let confirmationScreen;
let dialogButton;
let confirmButtonCheck;
let confirmButtonCancel;

function init() {
    body = document.querySelector('body');
    productGallery = document.querySelector('#products-gallery');
    productDetails = document.querySelector('#details-list');
    detailsContent = document.querySelector('#detail-container');
    confirmationScreen = document.querySelector('#confirmation-screen');
    dialogButton = document.querySelector('#close-button');
    confirmButtonCheck = document.querySelector('#confirm-check');
    confirmButtonCancel = document.querySelector('#confirm-cancel');
    productDetails.addEventListener("click", detailClickHandler);
    productDetails.addEventListener("close", detailCloseHandler);
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
    //Fetch de details van de product.
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
    //Laat de details zien.
    dialogButton.style.display = "block";
    //Genereer de HTML content.
    productDetails.innerHTML =
        `<img src="webservice/img/${product.id}.avif" alt="${product.name}" class="details-image">
         <h2>${product.name}</h2>
         <p>Ingredienten: ${details.ingredients}</p>
         <p>Gewicht: ${details.weight}</p>
         <p>Allergien: ${details.allergies}</p>
        `
    productDetails.appendChild(dialogButton);
    productDetails.style.display = "block";
    productDetails.showModal();
    body.classList.add("open-dialog");
}

function detailClickHandler(e) {
    //Sluit de details venster.
    if (e.target.nodeName === 'DIALOG' || e.target.nodeName === 'BUTTON') {
        productDetails.close();
    }
}

function detailCloseHandler() {
    //Verwijder de content in het venster.
    body.classList.remove('open-dialog');
    productDetails.innerHTML = "";
    productDetails.style.display = "none";
}

function createConfirmationScreen(id) {
    //Genereer de confirmatie scherm.
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
    confirmButtonCheck.style.display = "block";
    confirmButtonCancel.style.display = "block";
    confirmationScreen.innerHTML =
        `
        <div class="confirmation-box">
         <img src="webservice/img/${product.id}.avif" alt="${product.name}" class="details-image">
         <h2>${product.name}</h2>
          `
    confirmationScreen.appendChild(confirmButtonCheck);
    confirmationScreen.appendChild(confirmButtonCancel);
    confirmButtonCheck.addEventListener("click", () => {

    })
    confirmButtonCancel.addEventListener("click", () => {

    })
}