window.addEventListener('load', init);

const gpsFrame = {
    frame: 'gpsFrame',
    id: 'gps-loader',
    src: `./html/gps.html`
}

const jumboFrame = {
    frame: 'jumboFrame',
    id: 'jumbo-loader',
    src: `./html/jumbo.html`
}

function init() {
    frameLoader(false, gpsFrame);
}

function frameLoader(unloadOld, frameData) {
    if (unloadOld) {
        frameRemover(unloadOld);
    }

    const dataLoader = document.createElement("iframe");
    dataLoader.id = frameData.id;
    dataLoader.src = frameData.src;
    document.getElementById('page-loader').appendChild(dataLoader);
}

function frameRemover(frameData) {
    document.getElementById(frameData.id).remove();
}