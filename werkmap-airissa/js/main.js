window.addEventListener('load', init);

// globals
const apiUrl = 'webservice/index.php';
let gallery;
let findShop;

function init() {
    gallery = document.querySelector('#shop-gallery');
    findShop = document.querySelector('#find-shop');
    // gallery.addEventListener('click', ShopClickHandler);
    createShopAddress();
    getShopAddressData();
}

function createShopAddress() {
    const homeIcon = document.createElement('img');
    homeIcon.src = 'img/home-icon.png';
    homeIcon.alt = 'home';
    findShop.appendChild(homeIcon);

    const searchProductBar = document.createElement('h2');
    searchProductBar.classList.add('findAddress');
    searchProductBar.innerText = 'Zoek Winkel + adres';
    findShop.appendChild(searchProductBar);

    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'zoek...');
    findShop.appendChild(searchInput);

    const micIcon = document.createElement('img');
    micIcon.src = 'img/microphone-icon.png';
    micIcon.alt = 'microphone';
    micIcon.addEventListener("click", () => recognition.start()); // (SISSI) button to start speech to text
    findShop.appendChild(micIcon);

    // (SISSI) start; Speech to Text coding
    const startButton = document.getElementById("startButton");
    const outputDiv = document.getElementById("output");
    const clearButton = document.getElementById("clear");

    // Constants for the language and the default language
    const LANG = "nl-NL"; // Dutch (Netherlands)
    const DEFAULT_LANG = "en-US"; // English (United States)

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
    };

    // Event listeners for the start and end of the recognition
    recognition.onstart = () => startButton.textContent = "Luisteren...";
    recognition.onend = () => startButton.textContent = "Start";

    // (SISSI) end; Speech to Text coding
}

function getShopAddressData() {
//     fetch api url
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(createShopAddressCards)

        .catch(errorHandler);
}

function createShopAddressCards(data) {
    console.log(data);
    for (let shopAddress of data) {
        const shopAddressCard = document.createElement('div');
        shopAddressCard.classList.add('shopAddress-card');
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
    shopImage.src = 'img/Jumbo.png';
    shopImage.alt = shopAddress.shop;
    shopAddressCard.appendChild(shopImage);

    // Add title adress
    const address = document.createElement('h3');
    address.innerText = `${shopAddress.address}`;
    shopAddressCard.appendChild(address);

}

function errorHandler(error) {
    console.log(error);
    const message = document.createElement('div');
    message.classList.add('error');
    message.innerHTML = 'Er is iets fout gegaan';
    // gallery.before(message);
}