/*
51.917422377385854,4.484449450314969
51.917478021432544,4.484716487862897
51.91727858333623,4.484538127000633
51.91733723212852,4.484820403137974


51.917422377385854,4.484449450314969
51.917478021432544,4.484716487862897
51.91727858333623, 4.484538127000633
51.91733537180129,4.48481101998118

51.91727858333623
4.484538127000633
51.91734647382137
4.484861964561333

{ a: 0.20837536564102874, b: 0.00004407500146896837 }
{ a: -0.6166923171967137, b: -0.0001807848331054629 }

a(x-b)+c = d(x-e)+f
ax-ab+c = dx-de+f
a-d = (de+f) - (ab+c)
xpos = ((de+f)-(ab+c))/(a-d)
ypos = a(x-b)+c

*/


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
const latBAngle = {
    a: (northWestCoords.lat - northEastCoords.lat) / (northWestCoords.long - northEastCoords.long),
    b: (northEastCoords.long - mapMiddlePoint.long),
    c: (northEastCoords.lat - mapMiddlePoint.lat),
}

const longLength = Math.sqrt(Math.pow((northWestCoords.long - northEastCoords.long), 2) + Math.pow((northWestCoords.long - northEastCoords.long), 2));
const longAngle = {
    a: (northWestCoords.long - southWestCoords.long) / (northWestCoords.lat - southWestCoords.lat),
    b: (southWestCoords.long - mapMiddlePoint.long),
    c: (southWestCoords.lat - mapMiddlePoint.lat),
}
const longBAngle = {
    a: (northWestCoords.long - southWestCoords.long) / (northWestCoords.lat - southWestCoords.lat),
    b: (southEastCoords.long - mapMiddlePoint.long),
    c: (southEastCoords.lat - mapMiddlePoint.lat),
}

const lookAtAllThoseChickens = [mapTop, mapBottom, mapLeft, mapRight, mapHeight, mapWidth, latLength, longLength];
console.log(`look at all those numbers ${lookAtAllThoseChickens}`);
console.log(latAngle);
console.log(latBAngle);
console.log(longAngle);
console.log(longBAngle);


setPosition();

async function setPosition() {
    const userPosition = {
        lat: 51.91733333391915,
        long: 4.484693345428029

        // lat: location.coords.latitude,
        // long: location.coords.longitude,
        //0.20837536564102874(x+0.0001807848331054629)+0.00004407500146896837=-0.6166923171967137(x-0.00006311027995486995)+0.000044968465232386734
    }
    console.log(`userLatitude is ${userPosition.lat} and userLongitude is ${userPosition.long}`);

    const userPositionDelta = {
        lat: userPosition.lat - mapMiddlePoint.lat,
        long: userPosition.long - mapMiddlePoint.long
    }

    console.log(userPositionDelta);

    algebruh(userPositionDelta, latAngle, longAngle);
    algebruh(userPositionDelta, longAngle, latAngle);
}

function algebruh (userVar, gpsVar, gpsVar2) {
    const a = gpsVar2.a;
    const b = userVar.long;
    const c = userVar.lat;
    const d = gpsVar.a;
    const e = gpsVar.b;
    const f = gpsVar.c;

    const xpos = (((d*e + f)-(a*b + c))/(a - d));
    const ypos = a*(xpos-b)+c;

    console.log(`je moeder is een plopkoek ${xpos}`);
    console.log(`je moeder is niet een plopkoek ${ypos}`);
}