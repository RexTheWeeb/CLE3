window.addEventListener('load', init);

const apiUrl = 'webservice/index.php';
let productList = [];
let productDetails;

function fetchProductDetails(id) {
    fetch(`webservice/index.php?id=${id}`)
        .then(response => {

            return response.json();

        })
        .then(details => {
            const productInfo = productList.find(product => product.id === id);
            if (!productInfo) {
                console.error("Product niet gevonden!");
                return;
            }
            displayProductDetails(productInfo, details);
        })
        .catch(error => {
            console.error("Error fetching details:", error.message);
            productDetails.innerHTML = `<p class="error-message">${error.message}</p>`;
        });
}

function displayProductDetails(product, details) {
    productDetails.innerHTML =
        `<div class="details-box">
         <img src="img/${product.image}" alt="${product.name}" class="details-image">
         <h2>${product.name}</h2>
         <p><strong>Ingredienten:</strong> ${details.ingredients}</p>
         <p><strong>Gewicht:</strong> ${details.weight}</p>
         <p><strong>Allergien:</strong> ${details.allergies}</p>
         </div>
        `
}