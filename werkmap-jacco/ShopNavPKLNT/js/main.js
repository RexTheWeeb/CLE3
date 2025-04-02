// noinspection DuplicatedCode,EqualityComparisonWithCoercionJS,SpellCheckingInspection

window.addEventListener('load', init);
let target = null;
let button = null;
// let zoom;

let moveTest = 0;
let mapAlign;
// let zoomAmount;

let mapBottom;
let mapLeft;
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
    document.getElementById('main-window').appendChild(navWindow);


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
    mapImage.src = `./images/school-maps-view.png`;
    mapImage.alt = "";
    mapImage.style.position = 'absolute';
    mapImage.style.height = '100%';
    mapDiv.appendChild(mapImage);


    if (window.innerHeight > window.innerWidth) {
        navWindow.height = '80vh';
        navWindow.width = '100vw';
    } else {
        navWindow.height = '100vh';
    }


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


function showCurrentLocation() {
    console.log(`showCurrentLocation`);

    const pointer = document.createElement("img");
    pointer.id = ('pointer-arrow');
    pointer.src = "./images/map_arrow.png";
    pointer.alt = '';
    pointer.style.position = 'absolute';
    pointer.style.alignSelf = 'anchor-center';
    pointer.style.justifySelf = 'anchor-center';
    pointer.style.zIndex = '2';
    pointer.style.height = '50px';
    pointer.document.getElementById('navigator-window').appendChild(pointer);

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

    moveTest = parseFloat(document.getElementById('position-test').value);
    console.log(`gps test slider is currently set to ${moveTest}`);

    /*
        phone pos Long:  4.484693345428029 & Lat: 51.91733333391915 delta: long: 0.001417881953371 lat: 0.00025713535765
        51.91707116464235, 51.91782978433396, 0.00075861969161
        4.483445518046629, 4.485128706174316, 0.001683188127687

        51.91750202637835, 4.483722738958786 test

        51.91745720241767, 4.484286416720071 middle

        delta pos = middle pos - phone pos
        offset image = delta pos / 0.5 delta map
     */

    // let latitudeScreenPos = (51.96 - parseFloat(userLatitude)) / 0.1 * 100 /*+ moveTest*/;
    // let longitudeScreenPos = ((parseFloat(userLongitude) - 4.474)) / 0.025 * 100 /*+ moveTest*/;


    const middleLat = 51.91745720241767;
    const middleLong = 4.484286416720071;
    const deltaLong = 0.001683188127687;
    const deltaLat = 0.00075861969161;
    const phonePosLat = 51.91733333391915;
    const phonePosLong = 4.484693345428029;
    // const phonePosLat = 51.91750202637835;
    // const phonePosLong = 4.483722738958786;
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
    // mapAlign.style.transform = 'translate(500px, 0px)';
    /*    if (document.getElementById('show-map') != undefined) {
            console.log(`movetest is currently ${moveTest}`)
            const mapTransform = document.getElementById('shop-map');
            mapTransform.style.transform = `rotate(${moveTest}deg)`;
        }*/
    console.log(`mapBottom is ${mapBottom} and mapTop is ${mapLeft}`);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}


