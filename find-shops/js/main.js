window.addEventListener('load', init);

const shopsApi = 'webservice/shops.php';

let gallery;
let findShop;


let body;

function init() {
    body = document.querySelector('body');

    gallery = document.querySelector('#shop-gallery');
    findShop = document.querySelector('#find-shop');
    // gallery.addEventListener('click', ShopClickHandler);

    createShopAddress();
    getShopAddressData();
}

function modeSwitch() {
    let body = document.body;
    body.classList.toggle('dark-mode');
}

function createShopAddress() {
    const homeIcon = document.createElement('img');
    homeIcon.src = 'webservice/img/CLE3-ShopNav-Icons-04.png';
    homeIcon.alt = 'home';
    findShop.appendChild(homeIcon);

    const searchProductBar = document.createElement('h2');
    searchProductBar.classList.add('findAddress');
    searchProductBar.innerText = 'Zoek Winkel + adres';
    findShop.appendChild(searchProductBar);

    const outputDiv = document.createElement('div');
    outputDiv.id = 'output';
    outputDiv.contentEditable = true;
    findShop.appendChild(outputDiv);

    const micIcon = document.createElement('img');
    micIcon.src = 'webservice/img/CLE3-ShopNav-Icons-01.png';
    micIcon.alt = 'microphone';
    micIcon.addEventListener("click", () => recognition.start()); // (SISSI) button to start speech to text
    findShop.appendChild(micIcon);

    const clearButton = document.createElement('button');
    clearButton.id = 'clearButton';
    clearButton.innerText = 'Clear';
    findShop.appendChild(clearButton);

    // (SISSI) start; Speech to Text coding
    // Constants for the language and the default language
    const LANG = "nl-NL"; // Dutch (Netherlands)

    // Event listeners for the clear button
    clearButton.addEventListener("click", () => {
        outputDiv.textContent = "";
    });

    // Create a new SpeechRecognition object
    const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition)();

    // Set the language of the recognition
    recognition.lang = LANG;

    // Event listeners for the recognition
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        outputDiv.textContent += ` ${transcript}`;
        if (transcript === 'Jumbo Rotterdam') {
            document.getElementById('shop-gallery').scrollIntoView();
        }
    };

    // Event listeners for the start and end of the recognition
    recognition.onstart = () => micIcon.src = 'webservice/img/CLE3-ShopNav-Icons-02.png';
    recognition.onend = () => micIcon.src = 'webservice/img/CLE3-ShopNav-Icons-01.png';
    // (SISSI) end; Speech to Text coding
}

function getShopAddressData() {
//     fetch api url
    fetch(shopsApi)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(createShopAddressCards)

        .catch(ajaxErrorHandler);
}

function createShopAddressCards(data) {
    console.log(data);
    for (let shopAddress of data) {
        const shopAddressCard = document.createElement('a');
        shopAddressCard.classList.add('shopAddress-card');
        shopAddressCard.href = '../find-products/';
        shopAddressCard.dataset.id = shopAddress.id;

        gallery.appendChild(shopAddressCard);
        fillShopAddressCard(shopAddress);

    }
}

function fillShopAddressCard(shopAddress) {
    const shopAddressCard = document.querySelector(`.shopAddress-card[data-id='${shopAddress.id}']`);

    const title = document.createElement('h2');
    title.innerText = `${shopAddress.shop}`;
    shopAddressCard.appendChild(title);

    // add img
    const shopImage = document.createElement('img');
    shopImage.src = 'webservice/img/Jumbo.png';
    shopImage.alt = shopAddress.shop;
    shopAddressCard.appendChild(shopImage);

    // Add title adress
    const address = document.createElement('h3');
    address.innerText = `${shopAddress.address}`;
    shopAddressCard.appendChild(address);
}

function ajaxErrorHandler(error) {
    console.log(error);
    const message = document.createElement('div');
    message.classList.add('error');
    message.innerHTML = 'Something went wrong, please try again later.';
    productGallery.before(message);
}