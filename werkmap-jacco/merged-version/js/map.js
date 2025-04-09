// noinspection DuplicatedCode,EqualityComparisonWithCoercionJS,SpellCheckingInspection

window.addEventListener('load', init);
let target = null;
let gpsButton = null;
// let zoom;

let mapAlign;
let xOffset;
let yOffset;
let destinationYOffset;
let destinationXOffset;
let distanceToStart;
// let zoomAmount;


let gpsLocation;


const gpsOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
}


const northWestCoords = {
    lat: 51.91738429705672,
    long: 4.484339760175307,
}
const northEastCoords = {
    lat: 51.91749844903891,
    long: 4.484891624644852,
}
const southWestCoords = {
    lat: 51.91725732331526,
    long: 4.484431625828195,
}
const southEastCoords = {
    lat: 51.91737230280984,
    long: 4.48496002097036,
}

const mapTop = Math.max(northWestCoords.lat, northEastCoords.lat)
const mapBottom = Math.min(northWestCoords.lat, northEastCoords.lat);
const mapLeft = Math.min(northWestCoords.long, northEastCoords.long);
const mapRight = Math.max(northWestCoords.long, northEastCoords.long);
const mapHeight = mapTop - mapBottom;
const mapWidth = mapRight - mapLeft;


const mapMiddlePoint = {
    lat: mapTop - (mapHeight / 2),
    long: mapRight - (mapWidth / 2),
}

const latLength = Math.sqrt(Math.pow((northWestCoords.lat - northEastCoords.lat), 2) + Math.pow((northWestCoords.long - northEastCoords.long), 2));
const latAngle = {
    a: (northWestCoords.lat - northEastCoords.lat) / (northWestCoords.long - northEastCoords.long),
    b: (northWestCoords.long - mapMiddlePoint.long),
    c: (northWestCoords.lat - mapMiddlePoint.lat),
}

const longLength = Math.sqrt(Math.pow((northWestCoords.long - northEastCoords.long), 2) + Math.pow((northWestCoords.lat - northEastCoords.lat), 2));
const longAngle = {
    a: (northWestCoords.long - southWestCoords.long) / (northWestCoords.lat - southWestCoords.lat),
    b: (southWestCoords.long - mapMiddlePoint.long),
    c: (southWestCoords.lat - mapMiddlePoint.lat),
}


const lookAtAllThoseChickens = [mapTop, mapBottom, mapLeft, mapRight, mapHeight, mapWidth, latLength, longLength];
console.log(`look at all those numbers ${lookAtAllThoseChickens}`);
console.log(latAngle);
console.log(longAngle);


const breadPosition = {
    lat: northWestCoords.lat - 51.9173499141331,
    long: northWestCoords.long - 4.484581157201401
}
const finalDestination = breadPosition;


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
    document.getElementById('map-window').appendChild(navWindow);


    const mapDiv = document.createElement("div");
    mapDiv.id = 'map-div';
    navWindow.appendChild(mapDiv)

    console.log(`creating the map`)
    const mapImage = document.createElement("img");
    mapImage.id = 'shop-map';
    mapImage.src = `../images/Map_schoolTest.png`;
    mapImage.alt = "";
    mapDiv.appendChild(mapImage);

}


function showCurrentLocation() {
    console.log(`showCurrentLocation`);

    const pointer = document.createElement("img");
    pointer.id = ('pointer-arrow');
    pointer.src = "../images/map_arrow.png";
    pointer.alt = '';
    document.getElementById('navigator-window').appendChild(pointer);

    startUpdating();
}

function createDestinationPointer() {

    const destinationPointer = document.createElement("img");
    destinationPointer.id = ('destination-pointer');
    destinationPointer.src = "../images/destination_pointer.png";
    destinationPointer.alt = '';
    document.getElementById('navigator-window').appendChild(destinationPointer);

}

function startUpdating() {
    mapAlign = document.getElementById('shop-map')
    console.log('starts updating');
    createDestinationPointer();
    gpsLocation = navigator.geolocation.watchPosition(updatePointerPosition, error, gpsOptions);
}

async function updatePointerPosition(location) {
    const userPosition = {
        // lat: 51.91735232038332,
        // long: 4.484836616954025
        lat: 51.9173173579621,
        long: 4.484589105824364
        // lat: location.coords.latitude,
        // long: location.coords.longitude,
    }
    console.log(`userLatitude is ${userPosition.lat} and userLongitude is ${userPosition.long}`);

    const userPositionDelta = {
        lat: userPosition.lat - mapMiddlePoint.lat,
        long: userPosition.long - mapMiddlePoint.long
    }

    console.log(userPositionDelta);

    algebruh(userPositionDelta, latAngle, longAngle, latLength);
    yOffset = distanceToStart * -100;

    algebruh(userPositionDelta, longAngle, latAngle, longLength);
    xOffset = distanceToStart * -100;

    mapAlign.style.transform = `translate(${xOffset}%, ${yOffset}%)`
    console.log(`mapBottom is ${xOffset} and mapTop is ${yOffset}`);

    offsetDestinationPoint(userPosition, finalDestination)
    const destinationPointer = document.getElementById('destination-pointer');
    destinationPointer.style.transform = `translate(${destinationXOffset}px, ${destinationYOffset}px)`


}

function offsetDestinationPoint(userPos, destination) {
    const latOffset = (destination.lat - (userPos.lat - northWestCoords.lat)) / latLength;
    const longOffset = (destination.long - (userPos.long - northWestCoords.long)) / longLength;
    destinationYOffset = latOffset * window.innerHeight;
    destinationXOffset = longOffset * window.innerWidth;
    console.log(destination)
    console.log(`destinationYOffset is ${destinationYOffset}`);
    console.log(`destinationXOffset is ${destinationXOffset}`);
}

function algebruh(userVar, gpsVar, gpsVar2, distancetoTop) {
    const a = gpsVar2.a;
    const b = userVar.long;
    const c = userVar.lat;
    const d = gpsVar.a;
    const e = gpsVar.b;
    const f = gpsVar.c;

    const xPos = (((d * e + f) - (a * b + c)) / (a - d));
    const yPos = a * (xPos - b) + c;

    distanceToStart = Math.sqrt(Math.pow((xPos - latAngle.b), 2) + Math.pow((yPos - latAngle.c), 2)) / distancetoTop;

    console.log(`gpsVar.a = ${gpsVar.a}`)
    console.log(`gpsVar.b = ${gpsVar.b}`)
    console.log(`gpsVar.c = ${gpsVar.c}`)
    console.log(`gpsVar2.a = ${gpsVar2.a}`)
    console.log(`userVar.lat = ${userVar.lat}`)
    console.log(`userVar.long = ${userVar.long}`)
    console.log(`the xPos is ${xPos}`);
    console.log(`the yPos is ${yPos}`);
    console.log(`The distance is ${distanceToStart}`);
}


function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}


/*
async function setPosition() {
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

}
const middleLat = 51.91745720241767;
const middleLong = 4.484286416720071;
const deltaLong = 0.001683188127687;
const deltaLat = 0.00075861969161;
// const phonePosLat = 51.91733333391915;
// const phonePosLong = 4.484693345428029;
const phonePosLat = 51.91740202637835;
const phonePosLong = 4.484222738958786;


function scrollZoomHandler() {
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