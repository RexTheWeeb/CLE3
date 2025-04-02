// Start JS codes - Sissi
window.addEventListener('load', init);

const apiUrl = 'webservice/index.php';
let productGallery;
let findProduct;

function init() {
    productGallery = document.querySelector('#products-gallery');
    productGallery.addEventListener('click', productClickHandler);
    findProduct = document.querySelector('#find-product');

    createFindProduct();
    getProductData();
}

function modeSwitch() {
    let body = document.body;
    body.classList.toggle('dark-mode');
}

// Find product page
function createFindProduct() {
    const div = document.createElement('div');
    div.classList.add('top-buttons');
    findProduct.appendChild(div);

    const backIcon = document.createElement('img');
    backIcon.src = 'webservice/img/CLE3-ShopNav-Icons-05.png';
    backIcon.alt = 'back';
    div.appendChild(backIcon);

    const homeIcon = document.createElement('img');
    homeIcon.src = 'webservice/img/CLE3-ShopNav-Icons-04.png';
    homeIcon.alt = 'home';
    div.appendChild(homeIcon);

    const findProductText = document.createElement('h2');
    findProductText.classList.add('findProduct');
    findProductText.innerText = 'Vind Product';
    findProduct.appendChild(findProductText);

    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'zoek...');
    findProduct.appendChild(searchInput);

    const micIcon = document.createElement('img');
    micIcon.src = 'webservice/img/CLE3-ShopNav-Icons-02.png';
    micIcon.alt = 'microphone';
    micIcon.addEventListener('click', micClickHandler);
    findProduct.appendChild(micIcon);
}

function micClickHandler(e) {
    e.preventDefault();
    console.log(e.target);
}

// Scan products page


// Show products page
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

    const productPrice = document.createElement('h3');
    productPrice.classList.add('price');
    productPrice.innerText = `€${product.price}`;
    productCard.appendChild(productPrice);
}

function productClickHandler(e) {
    e.preventDefault();
    console.log(e.target);
}

function ajaxErrorHandler(error) {
    console.log(error);
    const message = document.createElement('div');
    message.classList.add('error');
    message.innerHTML = 'Something went wrong, please try again later.';
    productGallery.before(message);
}