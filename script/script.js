const productCatalog = document.getElementById('product-catalog');
const inputFilter = document.getElementById('filter-field');
const buttonFilter = document.getElementById('button-filter');

inputFilter.addEventListener('input', filterProduct);

renderProducts();


function filterProduct(){
  const value = inputFilter.value.toLowerCase();
  const productCatalog = document.querySelector('#product-catalog');

  const filteredProductCard = Array(...productCatalog.childNodes).filter(el => el.firstChild.textContent.toLowerCase().includes(value));

  handleCardsVisibility(filteredProductCard);

  function handleCardsVisibility(filteredResult){
    productCatalog.childNodes.forEach(el => el.style.display = 'none')
    filteredResult.forEach(el => el.style.display = 'inherit');
  }
  
}
    
async function fetchProduct(start, end){

  const promises = [];

  for (let i = start; i < end; i++) {
    let productPromise = fetch(`https://fakestoreapi.com/products/${i}`)
    .then(response => response.json())

    .catch(error => {
      console.error('Ocorreu um erro na requisição:', error);
      });
    promises.push(productPromise);
  }
  return Promise.all(promises);
}



//let cardHide = document.querySelectorAll('.card');

async function renderProducts(){
  const products = await fetchProduct(15, 20);
  const cards = products.map(product => ProductCard(product));
  cards.forEach(card => productCatalog.appendChild(card))
  console.log(productCatalog)
}

function ProductCard(product){
  let productCount = 0;

  function viewCount(){

    const divCount = document.createElement('div');
    divCount.classList.add('view-count');
    const createInput = InputProductCount();

    function SubButton(){
      const subBtn = document.createElement('button');
      subBtn.addEventListener('click', sub);
      const buttonImage = document.createElement('img');
      buttonImage.src = "./img/icon/icons8-sinal-de-menos-24.png";
      subBtn.appendChild(buttonImage);
    
      function sub() {
        if(+createInput.value === 0) return;
          createInput.value = +createInput.value - 1;
          console.log(createInput.value)
      }
      return subBtn;
    }

    function AddButton(){
      const addBtn = document.createElement('button');
      addBtn.addEventListener('click', sum);
      const buttonImage = document.createElement('img');
      buttonImage.src = "./img/icon/icons8-adicionar-24.png";
      addBtn.appendChild(buttonImage);
    
      function sum() {
        createInput.value = +createInput.value + 1;
        console.log(createInput.value)
      }
      
      return addBtn;
    }

    function InputProductCount(){
      const input = document.createElement('input');
      input.classList.add('count-purchase');
      input.min = 0;
      input.type = 'number';
      input.value = productCount;
      input.addEventListener('change', (e) => {
        return productCount = e.target.value;
      })
    
      return input;
    }


    
    divCount.appendChild(SubButton());
    divCount.appendChild(createInput);
    divCount.appendChild(AddButton());

    return divCount;
  }
  
  function PurchaseButton(){
    const button = document.createElement('button');
    button.textContent = 'Comprar';
    button.classList.add('btn-primary');
  
    return button;
  }

  function ProductTitle(title){
    const span = document.createElement('span');
    span.textContent = title;
  
    return span;
  }

  function ProductImage(src, id){
    const imageContainer = document.createElement('a');
    const image = document.createElement('img');
    
    image.width = 270;
    image.height = 270;
    image.src = src;
    imageContainer.appendChild(image);
    imageContainer.href = `product.html?id=${id}`
    imageContainer.style.cursor = 'pointer';

    return imageContainer;
  }



  const div = document.createElement('div');

  div.classList.add('card');
  div.appendChild(ProductTitle(product.title));
  div.appendChild(ProductImage(product.image, product.id));
  div.appendChild(viewCount())
  div.appendChild(PurchaseButton());
  
  return div;
}