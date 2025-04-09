// noinspection DuplicatedCode,EqualityComparisonWithCoercionJS,SpellCheckingInspection

window.addEventListener('load', init);
let target = null;
let gpsButton = null;
// let zoom;

let mapAlign;
// let zoomAmount;

let mapBottom;
let mapLeft;
let gpsLocation;
// let scrollPos = 0;


const middleLat = 51.91745720241767;
const middleLong = 4.484286416720071;
const deltaLong = 0.001683188127687;
const deltaLat = 0.00075861969161;
// const phonePosLat = 51.91733333391915;
// const phonePosLong = 4.484693345428029;
const phonePosLat = 51.91740202637835;
const phonePosLong = 4.484222738958786;

const gpsOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
}


function init() {


    target = document.getElementById('target');
    // gpsButton = document.getElementById('go-to-gps');
    // zoom = document.getElementById('navigator-window');


    if (typeof navigator.geolocation === 'undefined') {
        target.innerText = 'Geolocation API not supported.';
        return;
    }

    loadBaseLayer();
    createMap();
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
    
}

function loadBaseLayer() {
    const gpsBody = document.createElement("body");
    gpsBody.id = 'gps-body';
    document.getElementById('page-loader');

    const gpsNav = document.createElement("nav");
    gpsNav.id = 'search';
    gpsBody.appendChild(gpsNav)

    const searchFunction = document.createElement("input");
    searchFunction.type = 'text';
    searchFunction.id = 'search-balk';
    searchFunction.name = 'search';
    searchFunction.maxLength = 30;
    searchFunction.placeholder = 'Q search';
    gpsNav.appendChild(searchFunction);

    const searchLabel = document.createElement("label");
    searchLabel.for = 'search-balk';

    const mapWindow = document.createElement("main");
    mapWindow.id = 'map-window';
}

//start gpsButton code
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

//creates a stop gpsButton and removes the initial start gpsButton and
function createExitButton() {
    console.log('start creating exit gpsButton')
    gpsButton.removeEventListener('click', buttonClickHandler);
    gpsButton.remove();

    const exitButton = document.createElement("Button");
    exitButton.id = ("go-to-gps");
    exitButton.className = ('nav-button');
    exitButton.innerText = 'Stop tracking';
    document.getElementById('gps-selector').appendChild(exitButton);
    exitButton.addEventListener('click', stopWatchingPos);
}

function stopWatchingPos() {
    /* stop watching pos
    Remove stop gpsButton
    add back start gpsButton
     */
    navigator.geolocation.clearWatch(gpsLocation);
    if (document.getElementById('pointer-arrow') != undefined) {
        const pointer = document.getElementById("pointer-arrow");
        pointer.remove();
    }

    const exitButton = document.getElementById('go-to-gps');
    exitButton.removeEventListener('click', stopWatchingPos);
    exitButton.remove();
    console.log('did the gpsButton get removed?');


    gpsButton = document.createElement("Button");
    gpsButton.id = ("go-to-gps");
    gpsButton.className = ('nav-button');
    gpsButton.innerText = 'Start tracking';
    document.getElementById("gps-selector").appendChild(gpsButton);
    gpsButton.addEventListener('click', buttonClickHandler);
}

//draws the map as the bottom layer
function createMap() {
    const navWindow = document.createElement("body");
    navWindow.id = 'navigator-window';
    navWindow.style.position = 'absolute';
    navWindow.style.justifySelf = 'anchor-center'
    if (window.innerHeight > window.innerWidth) {
        navWindow.style.height = '80vh';
        navWindow.style.width = '100vw';
    } else {
        navWindow.style.height = '100vh';
        navWindow.style.width = '50vw';
    }
    document.getElementById('map-window').appendChild(navWindow);


    const mapDiv = document.createElement("div");
    mapDiv.id = 'map-div';
    mapDiv.style.height = '100%';
    mapDiv.style.width = '100%';
    mapDiv.style.overflow = 'hidden';
    mapDiv.style.position = 'absolute';
    mapDiv.style.zIndex = '1';
    mapDiv.style.display = 'flex';
    mapDiv.style.justifyContent = 'center';
    navWindow.appendChild(mapDiv)

    console.log(`creating the map`)
    const mapImage = document.createElement("img");
    mapImage.id = 'shop-map';
    mapImage.src = `../images/school-maps-view.png`;
    mapImage.alt = "";
    mapImage.style.position = 'absolute';
    mapImage.style.height = '100%';
    mapImage.style.width = 'auto';
    mapDiv.appendChild(mapImage);


    if (window.innerHeight > window.innerWidth) {
        navWindow.height = '80vh';
        navWindow.width = '100vw';
    } else {
        navWindow.height = '100vh';
    }


}


function showCurrentLocation() {
    console.log(`showCurrentLocation`);

    const pointer = document.createElement("img");
    pointer.id = ('pointer-arrow');
    pointer.src = "../images/map_arrow.png";
    pointer.alt = '';
    pointer.style.position = 'absolute';
    pointer.style.alignSelf = 'anchor-center';
    pointer.style.justifySelf = 'anchor-center';
    pointer.style.zIndex = '2';
    pointer.style.height = '50px';
    document.getElementById('navigator-window').appendChild(pointer);

    startUpdating();
}

function startUpdating() {
    mapAlign = document.getElementById('shop-map')
    console.log('starts updating');
    gpsLocation = navigator.geolocation.watchPosition(updatePointerPosition, error, gpsOptions);
}

async function updatePointerPosition(location) {
    const userLatitude = location.coords.latitude;
    const userLongitude = location.coords.longitude;
    console.log(`userLongitude is ${userLongitude} and userLatitude is ${userLatitude}`);


    const deltaPosLat = phonePosLat - middleLat;
    const deltaPosLong = middleLong - phonePosLong;
    const finalCalcLat = deltaPosLat / deltaLat;
    const finalCalcLong = deltaPosLong / deltaLong;

    console.log('phonePosLat ' + phonePosLat);
    console.log('phonePosLong ' + phonePosLong);
    console.log('deltaPosLat ' + deltaPosLat);
    console.log('deltaPosLong ' + deltaPosLong);
    console.log('finalCalcLat ' + finalCalcLat);
    console.log('finalCalcLong ' + finalCalcLong);


    let longitudeScreenPos = finalCalcLong * 100;
    let latitudeScreenPos = finalCalcLat * 100;

    console.log(document.getElementById('navigator-window').height);


    mapBottom = latitudeScreenPos.toFixed(5);
    mapLeft = longitudeScreenPos.toFixed(5);
    mapAlign.style.transform = `translate(${mapLeft}%, ${mapBottom}%)`
    console.log(`mapBottom is ${mapBottom} and mapTop is ${mapLeft}`);
    /*    if (document.getElementById('show-map') != undefined) {
            console.log(`movetest is currently ${moveTest}`)
            const mapTransform = document.getElementById('shop-map');
            mapTransform.style.transform = `rotate(${moveTest}deg)`;
        }*/
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}


