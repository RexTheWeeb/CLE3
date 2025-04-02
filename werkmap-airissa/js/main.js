window.addEventListener('load', init);

// globals
const apiUrl = 'webservice/index.php';
let gallery;
let findShop;

function init() {
    gallery = document.querySelector('#shop-gallery');
    findShop = document.querySelector('#find-shop');
    gallery.addEventListener('click', ShopClickHandler);
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
    findShop.appendChild(micIcon);
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

function shopClickHandler(e) {
    console.log(e.target);
    const clickedItem = e.target;
}

function errorHandler(error) {
    console.log(error);
    const message = document.createElement('div');
    message.classList.add('error');
    message.innerHTML = 'Er is iets fout gegaan';
    // gallery.before(message);
}