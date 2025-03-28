window.addEventListener('load', init);
let target = null;
let button = null;
let d = new Date();
let timer = null;
let pointerTop;
let pointerLeft;
let gpsLocation;

const gpsOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
}


function init() {
    target = document.getElementById('target');
    button = document.getElementById('start-button');


    if (typeof navigator.geolocation === 'undefined') {
        target.innerText = 'Geolocation API not supported.';
        return;
    }


    button.addEventListener('click', buttonClickHandler);

}

function buttonClickHandler() {

    createExitButton();
    if (document.getElementById('shop-map') == undefined) {
        createMap();
    }
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

//draws the map as the bottom layer
function createMap() {
    console.log(`creating the map`)
    const mapImage = document.createElement("img");
    mapImage.id = 'shop-map';
    mapImage.src = `./images/school-maps-view.png`;
    mapImage.alt = "";

    mapImage.height = window.innerHeight * 0.95;

    document.getElementById('navigator-window').appendChild(mapImage);
}

//creates a stop button and removes the initial start button and
function createExitButton() {
    console.log('start creating exit button')
    button.removeEventListener('click', buttonClickHandler);
    button.remove();

    const exitButton = document.createElement("button");
    exitButton.id = ("exit-button");

    exitButton.innerText = 'Stop tracking';
    document.getElementById('mainid').appendChild(exitButton);
    exitButton.addEventListener('click', stopWatchingPos);
}

function stopWatchingPos() {
    /* stop watching pos
    Remove stop button
    add back start button
     */
    navigator.geolocation.clearWatch(gpsLocation);
    if (document.getElementById('pointer-arrow') != undefined) {
        const pointer = document.getElementById("pointer-arrow");
        pointer.remove();
    }

    const exitButton = document.getElementById('exit-button');
    exitButton.removeEventListener('click', stopWatchingPos);
    exitButton.remove();
    console.log('did the button get removed?');


    button = document.createElement("button");
    button.id = ("start-button");
    button.innerText = 'Start tracking';
    document.getElementById("mainid").appendChild(button);
    button.addEventListener('click', buttonClickHandler);
}


function showCurrentLocation(location) {
    console.log(`showCurrentLocation`)

    const pointer = document.createElement("img");
    pointer.id = ('pointer-arrow');
    pointer.src = "./images/map_arrow.png";
    pointer.alt = 'Pointer';
    updatePointerPosition(location)
    pointer.style.top = pointerTop;
    pointer.style.left = pointerLeft;
    document.getElementById('navigator-window').appendChild(pointer);
    startUpdating(pointer);
}

function startUpdating() {
    const pointer = document.getElementById('pointer-arrow');
    pointer.style.top = pointerTop;
    pointer.style.left = pointerLeft;
    gpsLocation = navigator.geolocation.watchPosition(updatePointerPosition, error, gpsOptions);
    console.log('starts updating')
}

async function updatePointerPosition(location) {
    const userLatitude = location.coords.latitude;
    const userLongitude = location.coords.longitude;
    console.log(`userLatitude is ${userLatitude} and userLongitude is ${userLongitude}`);

    //51.917750,4.483382 top right school   delta lat 541
    //51.917209,4.485143 bottom left school delta long 1761

    let latitudeScreenPos = (51.92 - parseFloat(userLatitude)) / 0.01 * 100;
    let longitudeScreenPos = ((parseFloat(userLongitude) - 4.484)) / 2 * 100;
    

    pointerTop = latitudeScreenPos + '%';
    pointerLeft = longitudeScreenPos + '%';

    console.log(`pointerTop is ${pointerTop} and pointerLeft is ${pointerLeft}`);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
