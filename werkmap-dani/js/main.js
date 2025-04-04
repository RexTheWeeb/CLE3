window.addEventListener('load', init);

//Lijst met variebelen.
const apiUrl = 'webservice/index.php';
let body;
let productList = [];
let productDetails;
let buttonContainer;
let productGallery;
let confirmationScreen;
let dialogButton;
let confirmButtonCheck;
let confirmButtonCancel;

function init() {
    //Selecteer onderdelen uit de HTML.
    body = document.querySelector('body');
    productGallery = document.querySelector('#products-gallery');
    productDetails = document.querySelector('#details-list');
    buttonContainer = document.querySelector('#button-container');
    confirmationScreen = document.querySelector('#confirmation-screen');
    dialogButton = document.querySelector('#close-button');
    confirmButtonCheck = document.querySelector('#confirm-check');
    confirmButtonCancel = document.querySelector('#confirm-cancel');
    productDetails.addEventListener("click", detailClickHandler);
    productDetails.addEventListener("close", detailCloseHandler);
    confirmationScreen.addEventListener("click", confirmationClickHandler);
    confirmationScreen.addEventListener("close", confirmationCloseHandler);
    getProductData();
}

function getProductData() {
    //Fetch de product data.
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        //Maak de product kaarten aan als alles klopt anders geef een error terug.
        .then(createProductCards)

        .catch(ajaxErrorHandler);
}

//Maak de producten aan gebaseerd op data uit de webservice.
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

//Vul de div elementen aangemaakt bij de vorige functie met gegevens uit de webservice.
function fillProductCard(product) {
    const productCard = document.querySelector(`.product-card[data-name='${product.name}']`);

    //Genereer de naam.
    const productName = document.createElement('h2');
    productName.classList.add('name');
    productName.innerText = `${product.name}`;
    productCard.appendChild(productName);

    //Genereer de afbeelding.
    const productImg = document.createElement('img');
    productImg.src = `webservice/img/${product.id}.avif`;
    productImg.alt = product.name;
    productCard.appendChild(productImg);
    //Voeg de klik element toe om de details later op te roepen.

    //Genereer de prijs.
    const productPrice = document.createElement('h3');
    productPrice.classList.add('price');
    productPrice.innerText = `€${product.price}`;
    productCard.appendChild(productPrice);

    //Genereer de details knop.
    const detailButton = document.createElement("BUTTON");
    const buttonContent = document.createTextNode('Details');
    detailButton.classList.add('detail-button');
    detailButton.appendChild(buttonContent);
    productCard.appendChild(detailButton);
    detailButton.addEventListener("click", function () {
        fetchProductDetails(product.id);
        console.log(product.id)
    });

    //Genereer de confirmatie knop.
    const searchButton = document.createElement("BUTTON");
    const searchButtonText = document.createTextNode('Zoek naar product');
    searchButton.classList.add('search-button');
    searchButton.appendChild(searchButtonText);
    productCard.appendChild(searchButton);
    searchButton.addEventListener("click", function () {
        createConfirmationScreen(product.id);
    });

}

//Geef een error terug.
function ajaxErrorHandler(error) {
    console.log(error);
    const message = document.createElement('div');
    message.classList.add('error');
    message.innerHTML = 'Something went wrong, please try again later.';
    productGallery.before(message);
}

//Haal de details van het product uit de webservice.
function fetchProductDetails(id) {
    //Fetch de details van de product.
    fetch(`webservice/index.php?id=${id}`)
        .then(response => {

            return response.json();

        })
        .then(details => {
            //Check of het ID klopt met de details.
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


//Laat de product details zien.
function displayProductDetails(product, details) {
    //Laat de details zien.
    dialogButton.style.display = "block";
    //Genereer de HTML content.
    productDetails.innerHTML =
        ` 
<img src="webservice/img/${product.id}.avif" alt="${product.name}" class="details-image">
         <h2>${product.name}</h2>
         <p>Ingredienten: ${details.ingredients}</p>
         <p>Gewicht: ${details.weight}</p>
         <p>Allergien: ${details.allergies}</p>
        `
    productDetails.appendChild(dialogButton);
    productDetails.style.display = "flex";
    productDetails.showModal();
    body.classList.add("open-dialog");
}

function detailClickHandler(e) {
    //Sluit de details venster.
    if (e.target.nodeName === 'BUTTON') {
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

//Maak het product confirmatie scherm.
function productConfirmationScreen(product) {
    confirmButtonCheck.style.display = "block";
    confirmButtonCancel.style.display = "block";
    confirmationScreen.innerHTML =
        `
        <div class="confirmation-box">
         <img src="webservice/img/${product.id}.avif" alt="${product.name}" class="details-image">
         <h2>${product.name}</h2>
          `
    buttonContainer.appendChild(confirmButtonCheck);
    buttonContainer.appendChild(confirmButtonCancel);
    confirmationScreen.appendChild(buttonContainer);
    confirmationScreen.style.display = "flex";
    confirmButtonCheck.addEventListener("click", () => {

    });
    confirmationScreen.showModal();
    body.classList.add("open-dialog");
}

function confirmationClickHandler(e) {
    //Sluit de details venster.
    if (e.target === confirmButtonCancel) {
        confirmationScreen.close();
    }
}

function confirmationCloseHandler() {
    //Verwijder de content in het venster.
    body.classList.remove('open-dialog');
    confirmationScreen.innerHTML = "";
    confirmationScreen.style.display = "none";
}