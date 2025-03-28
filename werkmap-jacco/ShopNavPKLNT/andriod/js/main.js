// noinspection DuplicatedCode,EqualityComparisonWithCoercionJS

window.addEventListener('load', init);
let target = null;
let button = null;
let pointerTop;
let pointerLeft;
let gpsLocation;
let moveTest = 0;
let pointer;

const gpsOptions = {
    enableHighAccuracy: true,
    timeout: 3000,
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

//start button code
function buttonClickHandler() {

    createExitButton();
    if (document.getElementById('shop-map') == undefined) {     //test if map is already drawn
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
    console.log(`showCurrentLocation`);

    pointer = document.createElement("img");
    pointer.id = ('pointer-arrow');
    pointer.src = "./images/map_arrow.png";
    pointer.alt = 'Pointer';
    updatePointerPosition(location);
    pointer.style.top = pointerTop;
    pointer.style.left = pointerLeft;
    document.getElementById('navigator-window').appendChild(pointer);
    startUpdating(pointer);
}

function startUpdating() {
    gpsLocation = navigator.geolocation.watchPosition(updatePointerPosition, error, gpsOptions);
    console.log('starts updating')
}

async function updatePointerPosition(location) {
    const userLatitude = location.coords.latitude;
    const userLongitude = location.coords.longitude;
    console.log(`userLongitude is ${userLongitude} and userLatitude is ${userLatitude}`);

    //51.917750,4.483382 top right school   delta lat 541
    //51.917209,4.485143 bottom left school delta long 1761

    let latitudeScreenPos = (51.918 - parseFloat(userLatitude)) * 1000;
    let longitudeScreenPos = (parseFloat(userLongitude) - 4.484) * 1000;
    console.log(`longitudeScreenPos is ${longitudeScreenPos} and latitudeScreenPos is ${latitudeScreenPos}`);

    latitudeScreenPos = latitudeScreenPos / 2.5 * 100;
    longitudeScreenPos = longitudeScreenPos / 1.7 * 100;

    pointerTop = latitudeScreenPos + '%';
    pointerLeft = longitudeScreenPos + '%';
    pointer.style.top = pointerTop;
    pointer.style.left = pointerLeft;

    console.log(`pointerTop is ${pointerTop} and pointerLeft is ${pointerLeft}`);
}

/*
userLongitude is 4.4848708 and userLatitude is 51.9173339
longitudeScreenPos is 0.8708000000003935 and latitudeScreenPos is 0.26660999999990054
pointerTop is 15.682941176464738% and pointerLeft is 16.125925925933213%
*/
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
