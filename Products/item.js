const itemdetails = JSON.parse(localStorage.getItem('productkey'));


const productsContainer = document.getElementById("products_container");

// Assuming 'images' is an array of image URLs in your itemdetails
if (itemdetails && itemdetails.images) {
  const mainPage = document.getElementById('mainPage');
  const thumbnailsDiv = document.getElementById('thumbnails');
  const picsDiv = document.getElementById('pics');

  itemdetails.images.forEach((imageUrl, index) => {
    // Create a thumbnail image
    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = imageUrl;
    thumbnailImg.alt = `Thumbnail ${index + 1}`;
    thumbnailImg.classList.add('thumbnail'); // Add a class for styling

    // Create a large image
    const largeImg = document.createElement('img');
    largeImg.src = imageUrl;
    largeImg.alt = `Image ${index + 1}`;
    largeImg.classList.add('large-image'); 

    thumbnailImg.addEventListener('click', () => {
      
      const activeThumbnails = document.querySelectorAll('.thumbnail.active');
      activeThumbnails.forEach((thumbnail) => {
        thumbnail.classList.remove('active');
      });

      thumbnailImg.classList.add('active');

      // Display the corresponding large image in the 'pics' div
      picsDiv.innerHTML = '';
      picsDiv.appendChild(largeImg);
    });

    // Append the thumbnail to the 'thumbnails' div
    thumbnailsDiv.appendChild(thumbnailImg);

   
    if (index === 0) {
      thumbnailImg.classList.add('active'); 
      picsDiv.appendChild(largeImg);
    }
  });
}


// Function to update the product details
function updateProductDetails() {
    const description = document.getElementById("description");
const impdetails =document.createElement("div");

    // Retrieve product details from the data object
    const productName = document.createElement("p");
    productName.textContent = `${itemdetails.name}`;

    const productBrand = document.createElement("p");
    productBrand.textContent = ` ${itemdetails.brand}`;

    const productPrice = document.createElement("p");
    productPrice.textContent = ` ₹${itemdetails.price.toFixed(2)}`;

    const productRatings = document.createElement("p");

 const quantity=document.createElement("div")
   quantity.classList.add("quantity");

    const quantityLabel = document.createElement("label");
    quantityLabel.textContent = "Quantity ";
    quantity.appendChild(quantityLabel);
    
    const quantitySelect = document.createElement("select");
    for (let i = 1; i <= 10; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      quantitySelect.appendChild(option);
    }
    quantity.appendChild(quantitySelect);

    const addToBasket = document.createElement("button");
    addToBasket.textContent = "Add to Basket";

    // Add a click event listener to the "Add to Basket" button
addToBasket.addEventListener("click", () => {
    // Change the text content
   
    setTimeout(() => {
        addToBasket.textContent = "Added to Basket";
        addToBasket.style.backgroundColor="lightgreen";
       
        localStorage.setItem('cartitem',JSON.stringify(itemdetails));
        addToBasket.classList.add("added-to-basket");
    }, 1000); 
  
   
    setTimeout(() => {
      addToBasket.classList.remove("added-to-basket");
      addToBasket.textContent = "Add to Basket";
      addToBasket.style.backgroundColor="";
    }, 5000); // Reset after 2 seconds
  });

  const Buynow = document.createElement("button");
  Buynow.textContent = "Buy Now";

  Buynow.addEventListener("click",()=>{
    window.location.href=''
    localStorage.setItem('cartitem',JSON.stringify(itemdetails));
  })
    impdetails.appendChild(productName);
    impdetails.appendChild(productBrand);
    impdetails.appendChild(productPrice);
    impdetails.appendChild(productRatings);
    impdetails.appendChild(quantity);
    impdetails.appendChild(addToBasket);
    impdetails.appendChild(Buynow);
    description.append(impdetails);
}

// Call the function to update product details
updateProductDetails();



// 
function fetchDataFromAPI() {
    fetch('https://drab-gold-goat-sock.cyclic.app/tyres')
      .then(response => response.json())
      .then(data => {
        popularkData = data;
        populateProducts();
        displayData(popularkData);
       
      })
      .catch(error => {
        console.error('Error fetching data from the API', error);
      });
  }
  fetchDataFromAPI();

  const productsPerPage = 6;
  let popularkData = [];

  function displayData(data) {
    // Clear the existing products container
    productsContainer.innerHTML = '';
  
    data.forEach((product) => {
      const productContainer = createProductElement(product);
      productsContainer.appendChild(productContainer);
  
    });
  }

const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

let currentSlide = 0; // Current slide index

function createProductElement(product) {
  // Create the product element (e.g., a div containing product information)
  const productElement = document.createElement('div');
  productElement.classList.add('product');

  const h3 = document.createElement("h3");
  h3.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = `Price:  $${product.price}`;

  const img = document.createElement("img");
  img.setAttribute("src", product.images[0]);
  img.setAttribute("alt", product.name);

  const heartButton = document.createElement("button");
  heartButton.innerHTML = "&#9825;" // This is the heart symbol
  // Add a click event listener to handle adding the product to local storage
  heartButton.addEventListener("click", () => {

    heartButton.innerHTML = "❤️"
    heartButton.style.Color = ("red");
    localStorage.setItem(`product_${product.id}`, JSON.stringify(product));
  });

  productElement.addEventListener("click", function () {
    window.location.href = "./item.html"
    localStorage.setItem('productkey', JSON.stringify(product));
  })

  productElement.appendChild(img);
  productElement.appendChild(h3);
  productElement.appendChild(price);
  productElement.appendChild(heartButton);

  return productElement;
}



// Populate products into the carousel (You can use your data source)
function populateProducts() {
    // Clear existing products
    const productsContainer = document.querySelector(".products-container");
    productsContainer.innerHTML = "";
  
    // Display products based on the currentSlide
    for (let i = currentSlide; i < currentSlide + productsPerPage; i++) {
      if (i < popularkData.length) {
        const product = popularkData[i];
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement); // Use productsContainer here
      }
    }
  }
  
  
  // Event listeners for navigation
  prevButton.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide -= productsPerPage;
      populateProducts();
    }
  });
  
  nextButton.addEventListener("click", () => {
    if (currentSlide + productsPerPage < popularkData.length) {
      currentSlide += productsPerPage;
      populateProducts();
    }
  });
  
  // Initial population of products
  populateProducts();