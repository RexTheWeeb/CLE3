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
// noinspection DuplicatedCode,EqualityComparisonWithCoercionJS,SpellCheckingInspection

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

const longLength = Math.sqrt(Math.pow((northWestCoords.long - northEastCoords.long), 2) + Math.pow((northWestCoords.long - northEastCoords.long), 2));
const longAngle = {
    a: (northWestCoords.long - southWestCoords.long) / (northWestCoords.lat - southWestCoords.lat),
    b: (southWestCoords.long - mapMiddlePoint.long),
    c: (southWestCoords.lat - mapMiddlePoint.lat),
}


const lookAtAllThoseChickens = [mapTop, mapBottom, mapLeft, mapRight, mapHeight, mapWidth, latLength, longLength];
console.log(`look at all those numbers ${lookAtAllThoseChickens}`);
console.log(latAngle);
console.log(longAngle);


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

    algebruh(userPositionDelta, latAngle, longAngle, latLength);
    algebruh(userPositionDelta, longAngle, latAngle, longLength);
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

    const distanceToStart = Math.sqrt(Math.pow((xPos - latAngle.b), 2) + Math.pow((yPos - latAngle.c), 2)) / distancetoTop;

    console.log(`the xPos is ${xPos}`);
    console.log(`the yPos is ${yPos}`);
    console.log(`The distance is ${distanceToStart}`)
}

/*
gpsVar.a = 0.20684785574755615
gpsVar.b = -0.00031013039752636473
gpsVar.c = 0.0000064108796351547426
gpsVar2.a = -0.7235011887720235
userVar.lat = 0.0003672138229120492
userVar.long = 0.0004127094271666465
the xPos is 0.00013581675670997192
the yPos is 0.0005675459991497134
The distance is 1.2718687061740115
gpsVar.a = -0.7235011887720235
gpsVar.b = -0.00021826474463804146
gpsVar.c = -0.00012056286182371423
gpsVar2.a = 0.20684785574755615
userVar.lat = 0.0003672138229120492
userVar.long = 0.0004127094271666465
the xPos is -0.00044631629926998064
the yPos is 0.0001895261933666461
The distance is 0.2924010701652761
 */