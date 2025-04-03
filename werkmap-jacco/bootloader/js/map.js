// noinspection DuplicatedCode,EqualityComparisonWithCoercionJS,SpellCheckingInspection

window.addEventListener('load', init);
let target;

let mapAlign;

let mapBottom;
let mapLeft;
let gpsLocation;
/*
let gpsButton;


let zoomAmount;
let goZoom;

let userHeading = 0;
let setTimer = 0;
let rotateImage;
*/


/*
let northEastCoords = {
    long: 4.483382,
    lat: 51.917750,
}
const southEastCoords = {
    long: 4.483382,
    lat: 51.917209,
}
let northWestCoords = {
    long: 4.485143,
    lat: 51.917750,
}
let southWestCoords = {
    long: 4.485143,
    lat: 51.917209,
}
*/

/*
    middle-point: 51.917756142557614, 4.486753365589036
    north-west: 51.917802049908644, 4.486728272695444
    north-east: 51.91788685448941,4.487131202394949
    south-west: 51.917756142557614, 4.486753365589036
    south-east: 51.91783676049863, 4.487170234373276

*/


const middleLat = 51.91745720241767;
const middleLong = 4.484286416720071;
const deltaLong = 0.001683188127687;
const deltaLat = 0.00075861969161;
const phonePosLat = 51.91733333391915;
const phonePosLong = 4.484693345428029;
// const phonePosLat = 51.91740202637835;
// const phonePosLong = 4.484222738958786;

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
    console.log('stop being stinky')
    createPointer();
    navigator.geolocation.getCurrentPosition(startUpdating);

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


//draws the map as the bottom layer
function createMap() {
    const navWindow = document.createElement("body");
    navWindow.id = 'navigator-window';
    document.getElementById('map-window').appendChild(navWindow);


    const mapDiv = document.createElement("div");
    mapDiv.id = 'map-div';
    navWindow.appendChild(mapDiv)

    console.log(`creating the map`)
    const mapImage = document.createElement("img");
    mapImage.id = 'shop-map';
    mapImage.src = `../images/school-maps-view.png`;
    mapImage.alt = "";
    mapDiv.appendChild(mapImage);

}


function createPointer() {
    console.log(`creating pointer`);

    const pointer = document.createElement("img");
    pointer.id = ('pointer-arrow');
    pointer.src = "../images/map_arrow.png";
    pointer.alt = '';
    document.getElementById('navigator-window').appendChild(pointer);
}

function startUpdating(location) {
    mapAlign = document.getElementById('shop-map')
    console.log('starts updating');
    gpsLocation = navigator.geolocation.watchPosition(updatePointerPosition, error, gpsOptions);
    // addEventListener("deviceorientationabsolute", changeHeading);

}

async function updatePointerPosition(location) {
    const userLatitude = location.coords.latitude;
    const userLongitude = location.coords.longitude;
    console.log(`userLongitude is ${userLongitude} and userLatitude is ${userLatitude}`);

    const deltaPosLat = userLatitude - middleLat;
    const deltaPosLong = middleLong - userLongitude;
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

    mapBottom = latitudeScreenPos.toFixed(5);
    mapLeft = longitudeScreenPos.toFixed(5);
    mapAlign.style.transform = `translate(${mapLeft}%, ${mapBottom}%)`;
    console.log(`mapBottom is ${mapBottom} and mapTop is ${mapLeft}`);
}


function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}


/* async function changeHeading(heading) {
    if (Date.now() >= setTimer || setTimer == 0) {
        console.log(`${heading.alpha}`);
        if (heading.alpha != null) {
            rotateImage = `${heading.alpha}deg`;
            mapAlign.style.rotate = rotateImage;
        }
        setTimer = Date.now() + 250;
    }
}

//start gpsButton code
function buttonClickHandler() {

    // createExitButton();
    if (document.getElementById('shop-map') == undefined) {     //test if map is already drawn
        createMap();
    }
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

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
    /!* stop watching pos
    Remove stop gpsButton
    add back start gpsButton
     *!/
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

    function scrollZoomHandler(goZoom) {
        // if scroll out shrink image
        // if scroll in enlarge image

console.log('starting scroll function');


}
}*/
