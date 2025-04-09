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

let detailModal;
let detailContent;

function init() {
    if (window.innerHeight > window.innerWidth) {
        document.getElementById('full-window').style.height = parseFloat(window.innerHeight) + 'px';
        console.log('testing height');
    }

    frameLoader(false, gpsFrame);
}

function frameLoader(unloadOld, frameData) {
    if (document.getElementById(frameData.id)) {
        return;
    }
    console.log('changing window');
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

function searchClickHandler() {

    detailContent.appendChild();


    detailModal.showModal();
    document.body.classList.add('dialog-open');
}

function detailModalClickHandler(e) {
    if (e.target.nodeName === 'DIALOG' || e.target.nodeName === 'BUTTON') {
        detailModal.close();
    }
}


function detailModalCloseHandler() {
    document.body.classList.remove('dialog-open');
}
