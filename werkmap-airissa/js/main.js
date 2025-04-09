window.addEventListener('load', init);

// globals
const apiUrl = 'webservice/index.php';
let gallery;
let findShop;

// DOM elementen
function init() {
    gallery = document.querySelector('#shop-gallery');
    findShop = document.querySelector('#find-shop');
    // gallery.addEventListener('click', ShopClickHandler);
    createShopAddress();
    getShopAddressData();
}

// What kind of information does it need.
function createShopAddress() {
    // image logo
    const homeIcon = document.createElement('img');
    homeIcon.src = 'img/home-icon.png';
    homeIcon.alt = 'home';
    findShop.appendChild(homeIcon);
    //search bar
    const searchProductBar = document.createElement('h2');
    searchProductBar.classList.add('findAddress');
    searchProductBar.innerText = 'Zoek Winkel + adres';
    findShop.appendChild(searchProductBar);
    // the search bar input
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'zoek...');
    findShop.appendChild(searchInput);
    //  microphone icon
    const micIcon = document.createElement('img');
    micIcon.src = 'img/microphone-icon.png';
    micIcon.alt = 'microphone';
    // micIcon.addEventListener("click", () => recognition.start()); // (SISSI) button to start speech to text
    findShop.appendChild(micIcon);
    //
    // // (SISSI) start; Speech to Text coding
    // const startButton = document.getElementById("startButton");
    // const outputDiv = document.getElementById("output");
    // const clearButton = document.getElementById("clear");
    //
    // // Constants for the language and the default language
    // const LANG = "nl-NL"; // Dutch (Netherlands)
    // const DEFAULT_LANG = "en-US"; // English (United States)
    //
    // // Event listeners for the clear button
    // clearButton.addEventListener("click", () => {
    //     outputDiv.textContent = "";
    // });
    //
    // // Create a new SpeechRecognition object
    // const recognition = new (window.SpeechRecognition ||
    //     window.webkitSpeechRecognition ||
    //     window.mozSpeechRecognition ||
    //     window.msSpeechRecognition)();
    //
    // // Set the language of the recognition
    // recognition.lang = LANG;
    //
    // // Event listeners for the recognition
    // recognition.onresult = (event) => {
    //     const transcript = event.results[0][0].transcript;
    //     outputDiv.textContent += ` ${transcript}`;
    // };
    //
    // // Event listeners for the start and end of the recognition
    // recognition.onstart = () => startButton.textContent = "Luisteren...";
    // recognition.onend = () => startButton.textContent = "Start";
    //
    // // (SISSI) end; Speech to Text coding

//     camera
    // Airissa QuaggaJS Barscanner
    const camIcon = document.createElement('img');
    camIcon.src = 'img/CLE3-ShopNav-Icons-03.png';
    camIcon.alt = 'camera';
    camIcon.id = 'btn';
    findShop.appendChild(camIcon);

    var _scannerIsRunning = false;

    function startScanner() {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#scanner-container'),
                constraints: {
                    width: 250,
                    height: 150,
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
                    drawingCtx.clearRect(1000, 1000, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, {x: 1000, y: 1000}, drawingCtx, {color: "green", lineWidth: 2});
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, {x: 1000, y: 1000}, drawingCtx, {
                        color: "#00F",
                        lineWidth: 2
                    });
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

// Get the data from the apiUrl/Web API
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

// Create a loop of the cards
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

// Here you fill the cards with content
function fillShopAddressCard(shopAddress) {
    const shopAddressCard = document.querySelector(`.shopAddress-card[data-id='${shopAddress.id}']`);
    // add title aka the brand name
    const title = document.createElement('h2');
    title.innerText = `${shopAddress.shop}`;
    shopAddressCard.appendChild(title);

    // add img
    const shopImage = document.createElement('img');
    shopImage.src = 'img/jumbo.png';
    shopImage.alt = shopAddress.shop;
    shopAddressCard.appendChild(shopImage);

    // Add title adress
    const address = document.createElement('h3');
    address.innerText = `${shopAddress.address}`;
    shopAddressCard.appendChild(address);

}

// Error functie if there is something with the data.
function errorHandler(error) {
    console.log(error);
    const message = document.createElement('div');
    message.classList.add('error');
    message.innerHTML = 'Er is iets fout gegaan';
    // gallery.before(message);
}