// noinspection DuplicatedCode,EqualityComparisonWithCoercionJS,SpellCheckingInspection

window.addEventListener('load', init);
let target;

let mapAlign;

let offsetBottom;
let offsetLeft;
let gpsLocation;


const northWestCoords = {
    lat: 51.917422377385854,
    long: 4.484449450314969,
}
const northEastCoords = {
    lat: 51.917478021432544,
    long: 4.484716487862897,
}
const southWestCoords = {
    lat: 51.91727858333623,
    long: 4.484538127000633,
}
const southEastCoords = {
    lat: 51.91733537180129,
    long: 4.48481101998118,
}

const mapTop = Math.max(northWestCoords.lat, northEastCoords.lat, southWestCoords.lat, southEastCoords.lat)
const mapBottom = Math.min(northWestCoords.lat, northEastCoords.lat, southWestCoords.lat, southEastCoords.lat);
const mapLeft = Math.min(northWestCoords.long, northEastCoords.long, southWestCoords.long, southEastCoords.long);
const mapRight = Math.max(northWestCoords.long, northEastCoords.long, southWestCoords.long, southEastCoords.long);
const mapHeight = mapTop - mapBottom;
const mapWidth = mapLeft - mapRight;


const mapMiddlePoint = {
    lat: mapTop - (mapHeight / 2),
    long: mapRight - (mapWidth / 2),
}

const latLength = (Math.pow((northWestCoords.lat - northEastCoords.lat), 2) + Math.pow((northWestCoords.long - northEastCoords.long), 2));
const latAngle = {
    a: (northWestCoords.lat - northEastCoords.lat) / (northWestCoords.long - northEastCoords.long),
    b: (northWestCoords.lat - mapMiddlePoint.lat)
}

const longLength = (Math.pow((northWestCoords.long - northEastCoords.long), 2) + Math.pow((northWestCoords.long - northEastCoords.long), 2));
const longAngle = {
    a: (northWestCoords.long - southWestCoords.long) / (northWestCoords.lat - southWestCoords.lat),
    b: (northWestCoords.long - mapMiddlePoint.long)
}


const lookAtAllThoseChickens = [mapTop, mapBottom, mapLeft, mapRight, mapHeight, mapWidth, latLength, longLength];
console.log(`look at all those numbers ${lookAtAllThoseChickens}`);
console.log(latAngle);
console.log(longAngle);


/*
    middle-point: 51.917756142557614, 4.486753365589036
    north-west: 51.917802049908644, 4.486728272695444
    north-east: 51.91788685448941,4.487131202394949
    south-west: 51.917756142557614, 4.486753365589036
    south-east: 51.91783676049863, 4.487170234373276

*/


/*const middleLat = 51.91745720241767;
const middleLong = 4.484286416720071;
const deltaLong = 0.001683188127687;
const deltaLat = 0.00075861969161;
const phonePosLat = 51.91733333391915;
const phonePosLong = 4.484693345428029;*/
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
    const userPosition = {
        lat: location.coords.latitude,
        long: location.coords.longitude,
    }
    console.log(`userLatitude is ${userPosition.lat} and userLongitude is ${userPosition.long}`);

    const userPositionDelta = {
        lat: userPosition.lat - mapMiddlePoint.lat,
        long: userPosition.long - mapMiddlePoint.long
    }

    // latAngle.a*userPositionDelta.lat+(latAngle.b-userPositionDelta.long) = longAngle.a*x+longAnlge.b
    // longAngle.a*userPositionDelta.long+(longAngle.b-userPositionDelta.lat) = longAngle.a*x+longAnlge.b


    let longitudeScreenPos = finalCalcLong * 100;
    let latitudeScreenPos = finalCalcLat * 100;

    offsetBottom = latitudeScreenPos.toFixed(5);
    offsetLeft = longitudeScreenPos.toFixed(5);
    mapAlign.style.transform = `translate(${offsetLeft}%, ${offsetBottom}%)`;
    console.log(`mapBottom is ${offsetBottom} and mapTop is ${offsetLeft}`);
}


function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

/*
let gpsButton;


let zoomAmount;
let goZoom;

let userHeading = 0;
let setTimer = 0;
let rotateImage;

async function changeHeading(heading) {
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
