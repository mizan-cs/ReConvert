import '../css/reconvert-app.css'
const axios = require('axios').default;

// Add to cart button
const cartButton = document.getElementById('add-to-cart-button-th');

// This need to assign in constant variable
const apiUrl = 'https://reconvert.themizan.me';

var buttonLabel = 'Add To Cart';
var buttonColor = '#000';

cartButton.addEventListener('click', function (event, productId) {
    event.preventDefault();

    // Request for the design data to app
    axios.post(apiUrl+'/api/shop-design', {name:window.Shopify.shop})
        .then(res=>{
            // Show the popup according to the design data
            openBox(res);
        })
        .catch(err=>{
            // Handle the exception
            console.log('Something is wrong. Please try again')
        })

});

function openBox(res) {

    // Fetching the design data
    if (res.data.status == 'success'){
        var buttonLabel = res.data.data.button_label;
        var buttonColor = res.data.data.button_color;
    } else {
        var buttonLabel = 'Add To Cart';
        var buttonColor = '#000';
    }

    // Set the initial image of the product index
    var activeImageIndex = 0;
    var activeImage = currentProduct.images[activeImageIndex];

    // Configuring the popup HTML
    var popup = `
    <div class="popup-box" id="popup-box">
    <div class="modal-box">
      <div class="modal-wrapper">
        <div class="carousel">
          <div class="carousel-img">
            <img id="carousel-image-el" src="`+ activeImage +`" alt="" class="">
          </div>
          <button type="button" id="prevImage" class="carousel-leftBtn">
            <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <button type="button" id="nextImage" class="absolute top-1/2 right-0 carousel-rightBtn">
            <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div class="modal-content">
          <span class="product-tag">`+ currentProduct.type +`</span>
          <span class="product-name">`+currentProduct.title+`</span>
          <div>
            <span style="text-decoration: line-through;">`+ String(currentProduct.compare_at_price == null ? "":String(parseFloat(currentProduct.compare_at_price/100))+" "+String(window.Shopify.currency.active)) +`</span>
            <span class="protuct-price">`+ String(parseFloat(currentProduct.price/100).toFixed(2))+" "+String(window.Shopify.currency.active) +`</span>
          </div>
        </div>
        <div class="product-action">
          <div class="product-action-wrapper">
            <div class="product-action-quantity">
              <label for="" class="lable"> Quantity</label>

              <div class="quantity-box">
                <button class="product-dic">-</button>
                <input type="text" value="5" class="quantity-input">
                <button class="product-inc">+</button>
              </div>
            </div>
            <div class="product-action-size-color">
              <label for="" class="lable">Select size</label>

              <select name="" id="" class="product-size-select">
                <option value="">M</option>
                <option value="">L</option>
              </select>
            </div>
          </div>
          <div class="">
            <label for="" class="lable">Select color</label>
            <select name="" id="" class="product-color-select">
              <option value="">Red</option>
              <option value="">Blue</option>
            </select>
          </div>
        </div>
        <div class="product-buttons">
          <button  class="product-addBtn" style="background-color: `+ buttonColor +`" type="button">`+ buttonLabel +`</button>
          <button class="product-disableBtn" id="noThanksButton" type="button">No Thanks</button>
        </div>
      </div>
      <button id="closeButton" type="button" class="btnClose">
        <svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>
  </div>
  `

    var body = document.getElementById('reconvert-app');
    body.innerHTML = body.innerHTML + popup;

    // Change image position to next
    var nextImageButton = document.getElementById('nextImage');
    nextImageButton.addEventListener('click', function () {
        if(currentProduct.images.length - 1 > activeImageIndex){
            activeImageIndex++;
            document.getElementById('carousel-image-el').src = currentProduct.images[activeImageIndex];
            console.log(currentProduct.images[activeImageIndex])
        }
        return;
    });

    // Change image position to previous
    var prevImageButton = document.getElementById('prevImage');
    prevImageButton.addEventListener('click', function () {
        if(activeImageIndex > 0){
            activeImageIndex--;
            document.getElementById('carousel-image-el').src = currentProduct.images[activeImageIndex];
            console.log(currentProduct.images[activeImageIndex])
        }
        return;
    });

    // Close button click event
    var closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', function () {
        var popupBox = document.getElementById('popup-box');
        popupBox.remove();

    });

    // No Thanks button click event
    var noThanksButton = document.getElementById('noThanksButton');
    noThanksButton.addEventListener('click', function () {
        var popupBox = document.getElementById('popup-box');
        popupBox.remove();

    });
}
