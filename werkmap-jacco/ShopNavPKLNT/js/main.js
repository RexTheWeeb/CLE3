// noinspection DuplicatedCode,EqualityComparisonWithCoercionJS

window.addEventListener('load', init);
let target = null;
let button = null;
// let zoom;

let moveTest = 0;
let pointer;
// let zoomAmount;

let pointerTop;
let pointerLeft;
let gpsLocation;
// let scrollPos = 0;

const gpsOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
}


function init() {
    target = document.getElementById('target');
    button = document.getElementById('start-button');
    // zoom = document.getElementById('navigator-window');


    if (typeof navigator.geolocation === 'undefined') {
        target.innerText = 'Geolocation API not supported.';
        return;
    }


    button.addEventListener('click', buttonClickHandler);
    // zoom.addEventListener('wheel', scrollZoomHandler);
}

//start button code
function buttonClickHandler() {

    createExitButton();
    if (document.getElementById('shop-map') == undefined) {     //test if map is already drawn
        createMap();
    }
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

/*function scrollZoomHandler() {
    /!*  if scroll in enlarge image
        if scroll out shrink image
    *!/
    console.log('starting scroll function');
    // scrollPos = window.scr;
    console.log('currently scroll pos is ' + scrollPos);
    if (scrollPos >= 1) {
        scrollPos = 1
    } else if (scrollPos <= 0) {
        scrollPos = 0;
    }

    // document.getElementById('shop-map').transform = (scale(scrollPos))

}*/

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
    document.getElementById("main-window").appendChild(button);
    button.addEventListener('click', buttonClickHandler);
}

//draws the map as the bottom layer
function createMap() {
    console.log(`creating the map`)
    const mapImage = document.createElement("img");
    mapImage.id = 'shop-map';
    mapImage.src = `./images/school-maps-view.png`;
    mapImage.alt = "";
    if (window.innerHeight < window.innerWidth) {
        const portraitForm = document.getElementById('navigator-window');
        portraitForm.height = '80%';
        portraitForm.width = 'auto';
    } else {
        mapImage.height = window.innerHeight;
    }


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
    document.getElementById('main-window').appendChild(exitButton);
    exitButton.addEventListener('click', stopWatchingPos);
}


function showCurrentLocation(location) {
    console.log(`showCurrentLocation`);

    pointer = document.createElement("img");
    pointer.id = ('pointer-arrow');
    pointer.src = "./images/map_arrow.png";
    pointer.alt = '';
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

    moveTest = parseFloat(document.getElementById('gpsTest').value);
    console.log(`gps test slider is currently set to ${moveTest}`);

    document.getElementById('pointer-arrow');

    let latitudeScreenPos = (51.92 - parseFloat(userLatitude)) / 0.01 * 100 + moveTest;
    let longitudeScreenPos = ((parseFloat(userLongitude) - 4.474)) / 0.025 * 100 + moveTest;

    pointerTop = latitudeScreenPos + '%';
    pointerLeft = longitudeScreenPos + '%';
    pointer.style.top = pointerTop;
    pointer.style.left = pointerLeft;

    if (document.getElementById('show-map') != 'undefined') {
        console.log(`movetest is currently ${moveTest}`)
        const mapTransform = document.getElementById('show-map');
        mapTransform.style.transform = `translate(0, )`;
    }
    console.log(`pointerTop is ${pointerTop} and pointerLeft is ${pointerLeft}`);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
