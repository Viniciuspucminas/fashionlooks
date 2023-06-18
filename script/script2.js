// Função para criar o elemento de imagem
function createImageElement(imageUrl) {
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.style.width = "270px";
    imageElement.style.height = "250px";
    return imageElement;
  }
  
  // Função para criar o elemento de texto
  function createTextElement(text) {
    const textElement = document.createElement('p');
    textElement.textContent = text;
    return textElement;
  }
  
  // Função para lidar com o clique em um produto
  function handleProductClick(productId) {
    // Redirecionar para a página de detalhes do produto
    window.location.href = `product.html?id=${productId}`;
  }
  
  // Função para carregar os produtos na seção de produtos
  function loadProducts() {
    const productContainer = document.getElementById('product-container');
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        data.forEach(product => {
          const imageUrl = product.image;
          const imageElement = createImageElement(imageUrl);
          const textElement = createTextElement(product.title);
  
          // Adicionar um evento de clique ao elemento de imagem
          imageElement.addEventListener('click', () => handleProductClick(product.id));
  
          const productDiv = document.createElement('div');
          productDiv.appendChild(imageElement);
          productDiv.appendChild(textElement);
          productContainer.appendChild(productDiv);
        });
      })
      .catch(error => {
        console.log('Ocorreu um erro na requisição:', error);
      });
  }
  
  // Função para carregar as informações adicionais na seção adicional
  function loadAdditionalInfo() {
    const additionalList = document.getElementById('additional-list');
    const additionalInfo = ['Informação 1', 'Informação 2', 'Informação 3'];
  
    additionalInfo.forEach(info => {
      const infoElement = document.createElement('li');
      infoElement.textContent = info;
      additionalList.appendChild(infoElement);
    });
  }
  
  // Carregar os produtos e as informações adicionais ao carregar a página
  window.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadAdditionalInfo();
  });
  