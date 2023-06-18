window.addEventListener('load',getProduct);

const id = document.location.search.split('=')[1];
const title = document.querySelector('title');
const productTitle = document.getElementById('product-title');
const productDescription = document.getElementById('product-description');
const productPrice = document.getElementById('product-price');
const productImg = document.getElementById('product-img');
const productRating = document.getElementById('product-rate');
const starElement = document.createElement('span');
starElement.setAttribute('class', 'fa fa-star');

async function getProduct(){

    const product = await fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error));
      renderProduct(product);
}

function renderProduct(product){
  title.textContent = product.title;
  productTitle.textContent = product.title;
  productImg.src = product.image;
  productImg.style.width = "270px";
  productImg.style.height = "250px";
  productDescription.innerText = product.description;
  productPrice.innerText = product.price;

  renderStars(product.rating.rate).forEach(star => productRating.appendChild(star));
}

function renderStars(rate){
  rate = parseInt(rate);
  let stars = [];
  for(let i = 0; i < 5; i++){
    let star = starElement.cloneNode();
    
    if(rate > 0){
      star.classList.add('checked');
      
    }
    stars.push(star);
    rate--;
  }

  return stars;
}


