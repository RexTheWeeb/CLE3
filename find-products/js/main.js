window.addEventListener('load', init);

const productsApi = 'webservice/products.php';

let findProduct;

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

    findProduct = document.querySelector('#find-product');

    createFindProduct();
    getProductData();
}

function modeSwitch() {
    let body = document.body;
    body.classList.toggle('dark-mode');
}

// function createShopAddress() {
//     const homeIcon = document.createElement('img');
//     homeIcon.src = 'webservice/img/CLE3-ShopNav-Icons-04.png';
//     homeIcon.alt = 'home';
//     findShop.appendChild(homeIcon);
//
//     const searchProductBar = document.createElement('h2');
//     searchProductBar.classList.add('findAddress');
//     searchProductBar.innerText = 'Zoek Winkel + adres';
//     findShop.appendChild(searchProductBar);
//
//     const outputDiv = document.createElement('div');
//     outputDiv.id = 'output';
//     outputDiv.contentEditable = true;
//     findProduct.appendChild(outputDiv);
//
//     const micIcon = document.createElement('img');
//     micIcon.src = 'webservice/img/CLE3-ShopNav-Icons-01.png';
//     micIcon.alt = 'microphone';
//     findShop.appendChild(micIcon);
//
//     const clearButton = document.createElement('button');
//     clearButton.id = 'clearButton';
//     clearButton.innerText = 'Clear';
//     findProduct.appendChild(clearButton);
//
//     // (SISSI) start; Speech to Text coding
//     // Constants for the language and the default language
//     const LANG = "nl-NL"; // Dutch (Netherlands)
//
//     // Event listeners for the clear button
//     clearButton.addEventListener("click", () => {
//         outputDiv.textContent = "";
//     });
//
//     // Create a new SpeechRecognition object
//     const recognition = new (window.SpeechRecognition ||
//         window.webkitSpeechRecognition ||
//         window.mozSpeechRecognition ||
//         window.msSpeechRecognition)();
//
//     // Set the language of the recognition
//     recognition.lang = LANG;
//
//     // Event listeners for the recognition
//     recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         outputDiv.textContent += ` ${transcript}`;
//     };
//
//     // Event listeners for the start and end of the recognition
//     recognition.onstart = () => micIcon.src = 'webservice/img/CLE3-ShopNav-Icons-02.png';
//     recognition.onend = () => micIcon.src = 'webservice/img/CLE3-ShopNav-Icons-01.png';
//     // (SISSI) end; Speech to Text coding
// }
//
// function getShopAddressData() {
// //     fetch api url
//     fetch(shopsApi)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(createShopAddressCards)
//
//         .catch(ajaxErrorHandler);
// }
//
// function createShopAddressCards(data) {
//     console.log(data);
//     for (let shopAddress of data) {
//         const shopAddressCard = document.createElement('a');
//         shopAddressCard.classList.add('shopAddress-card');
//         shopAddressCard.href = '#find-product';
//         shopAddressCard.dataset.id = shopAddress.id;
//
//         gallery.appendChild(shopAddressCard);
//         fillShopAddressCard(shopAddress);
//
//     }
// }
//
// function fillShopAddressCard(shopAddress) {
//     const shopAddressCard = document.querySelector(`.shopAddress-card[data-id='${shopAddress.id}']`);
//
//     const title = document.createElement('h2');
//     title.innerText = `${shopAddress.shop}`;
//     shopAddressCard.appendChild(title);
//
//     // add img
//     const shopImage = document.createElement('img');
//     shopImage.src = 'webservice/img/jumbo.png';
//     shopImage.alt = shopAddress.shop;
//     shopAddressCard.appendChild(shopImage);
//
//     // Add title adress
//     const address = document.createElement('h3');
//     address.innerText = `${shopAddress.address}`;
//     shopAddressCard.appendChild(address);
//
//
// }

function createFindProduct() {
    const div = document.createElement('div');
    div.classList.add('top-buttons');
    findProduct.appendChild(div);

    const aBack = document.createElement('a');
    aBack.href = '#shop-gallery';
    div.appendChild(aBack);

    const aHome = document.createElement('a');
    aHome.href = '#find-shop';
    div.appendChild(aHome);

    const backIcon = document.createElement('img');
    backIcon.src = 'webservice/img/CLE3-ShopNav-Icons-05.png';
    backIcon.alt = 'back';
    backIcon.href = '#find-shop';
    aBack.appendChild(backIcon);

    const homeIcon = document.createElement('img');
    homeIcon.src = 'webservice/img/CLE3-ShopNav-Icons-04.png';
    homeIcon.alt = 'home';
    aHome.appendChild(homeIcon);

    const findProductText = document.createElement('h2');
    findProductText.classList.add('findProduct');
    findProductText.innerText = 'Vind Product';
    findProduct.appendChild(findProductText);

    const outputDiv = document.createElement('div');
    outputDiv.id = 'output';
    outputDiv.contentEditable = true;
    findProduct.appendChild(outputDiv);

    const micIcon = document.createElement('img');
    micIcon.src = 'webservice/img/CLE3-ShopNav-Icons-01.png';
    micIcon.alt = 'microphone';
    micIcon.addEventListener('click', micClickHandler);
    findProduct.appendChild(micIcon);

    const clearButton = document.createElement('button');
    clearButton.id = 'clearButton';
    clearButton.innerText = 'Clear';
    findProduct.appendChild(clearButton);

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
    };

    // Event listeners for the start and end of the recognition
    recognition.onstart = () => micIcon.src = 'webservice/img/CLE3-ShopNav-Icons-02.png';
    recognition.onend = () => micIcon.src = 'webservice/img/CLE3-ShopNav-Icons-01.png';
    // (SISSI) end; Speech to Text coding

    // Airissa QuaggaJS Barscanner
    const camIcon = document.createElement('img');
    camIcon.src = 'webservice/img/CLE3-ShopNav-Icons-03.png';
    camIcon.alt = 'camera';
    camIcon.id = 'btn';
    findProduct.appendChild(camIcon);

    var _scannerIsRunning = false;

    function startScanner() {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#scanner-container'),
                constraints: {
                    width: 480,
                    height: 320,
                    facingMode: "environment"
                },
            },
            decoder: {
                readers: [
                    "code_128_reader",
                    "ean_reader",
                    "ean_8_reader",
                    "code_39_reader",
                    "code_39_vin_reader",
                    "codabar_reader",
                    "upc_reader",
                    "upc_e_reader",
                    "i2of5_reader"
                ],
                debug: {
                    showCanvas: true,
                    showPatches: true,
                    showFoundPatches: true,
                    showSkeleton: true,
                    showLabels: true,
                    showPatchLabels: true,
                    showRemainingPatchLabels: true,
                    boxFromPatches: {
                        showTransformed: true,
                        showTransformedBox: true,
                        showBB: true
                    }
                }
            },

        }, function (err) {
            if (err) {
                console.log(err);
                return
            }

            console.log("Initialization finished. Ready to start");
            Quagga.start();

            // Set flag to is running
            _scannerIsRunning = true;
        });

        Quagga.onProcessed(function (result) {
            var drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
                }
            }
        });


        Quagga.onDetected(function (result) {
            console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
        });
    }


    // Start/stop scanner
    document.getElementById("btn").addEventListener("click", function () {
        if (_scannerIsRunning) {
            Quagga.stop();
        } else {
            startScanner();
        }
    }, false);
}

function micClickHandler(e) {
    e.preventDefault();
    console.log(e.target);
}

function getProductData() {
    fetch(productsApi)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(createProductCards)

        .catch(ajaxErrorHandler);
}

function createProductCards(productsData) {
    console.log(productsData);

    for (let product of productsData) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.dataset.name = product.name;

        productGallery.appendChild(productCard);
        fillProductCard(product);
        productList = productsData;
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
    fetch(`webservice/products.php?id=${id}`)
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
            // confirmationScreen.innerHTML = `<p class="error-message">${error.message}</p>`;
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