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

6(x-4)+7 = 5(x-3)+18
6(x-4) - 5(x-3) = 11
1.2(x-4) - x - 3 = 2.2
x - 0.8333x - 6.5 = 1.83333
x - 0.8333x = 8.3333
0.16667x = 8.33333
x =



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
    b: (northWestCoords.lat - mapMiddlePoint.lat),
    c: (northWestCoords.long - mapMiddlePoint.long)
}
const latBAngle = {
    a: (northWestCoords.lat - northEastCoords.lat) / (northWestCoords.long - northEastCoords.long),
    b: (northEastCoords.lat - mapMiddlePoint.lat),
    c: (northEastCoords.long - mapMiddlePoint.long)
}

const longLength = Math.sqrt(Math.pow((northWestCoords.long - northEastCoords.long), 2) + Math.pow((northWestCoords.long - northEastCoords.long), 2));
const longAngle = {
    a: (northWestCoords.long - southWestCoords.long) / (northWestCoords.lat - southWestCoords.lat),
    b: (southWestCoords.lat - mapMiddlePoint.lat),
    c: (southWestCoords.long - mapMiddlePoint.long)
}
const longBAngle = {
    a: (northWestCoords.long - southWestCoords.long) / (northWestCoords.lat - southWestCoords.lat),
    b: (southEastCoords.lat - mapMiddlePoint.lat),
    c: (southEastCoords.long - mapMiddlePoint.long)
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

}
