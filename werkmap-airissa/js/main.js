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