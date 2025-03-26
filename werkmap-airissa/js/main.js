window.addEventListener('load', init);

// globals
const apiUrl = 'webservice/index.php';
let gallery;

function init() {
    gallery = document.querySelector('#shop-gallery');
    // gallery.addEventListener('click', ShopClickHandler);

    getShopAddressData();

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
        shopAddressCard.dataset.shopAddress = shopAddress.shopAddress;

        gallery.appendChild(shopAddressCard);
        fillShopAddressCard(shopAddress);

    }
}

function fillShopAddressCard(movie) {
    const shopAddressCard = document.querySelector(`.shopAddress-card[data-name='${shopAddress.id}']`);

    // Add title
    const title = document.createElement('h2');
    title.innerText = `${shopAddress.shop} (${shopAddress.address})`;
    shopAddressCard.appendChild(title);

    // add img
    const shopImage = document.createElement('img');
    shopImage.src = `img/${shopAddress.shop}.png`;
    shopImage.alt = shopAddress.shop;
    shopAdressCard.appendChild(shopImage);

}

// function fillShopAdressCard(shopAdress) {
//     const shopAdressCard = document.querySelector(`.shopAdress-card[data-name='${shopAdress.shopAdress}']`)
//
// //     add title
//     const shopName = document.createElement('h2');
//     shopName.innerText = `${shopAdress.shopAdress}`;
//     shopAdressCard.appendChild(shopName);
//
// }

function errorHandler(error) {
    console.log(error);
    const message = document.createElement('div');
    message.classList.add('error');
    message.innerHTML = 'Er is iets fout gegaan';
    // gallery.before(message);
}