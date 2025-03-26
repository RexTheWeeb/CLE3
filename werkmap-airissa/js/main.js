window.addEventListener('load', init);

function init() {
   
}

function errorHandler(error) {
    console.log(error);
    const message = document.createElement('div');
    message.classList.add('error');
    message.innerHTML = 'Er is iets fout gegaan';

}