// let mainSection = document.getElementById('mainSection');

// let interiors = document.getElementById('filter-Interios-on-Canvas');

// let sortlowtohigh = document.getElementById('sort-low-to-high')

// async function autoPartsShop() {

//     try {
        
//         let res = await fetch(`https://mock-api-template-vema.onrender.com/tyres`, {

//         method: "GET",

//         })

//         console.log('res', res);

//         let data = await res.json();
//         console.log('data', data);

//         let htmlStr = '';

//         data.forEach((ele) => {

//             htmlStr += `
//             <div class="cards">
//             <img class="card-image" src="${ele.images[0]}" alt="Auto Parts">
//             <h4 class="card-name">${ele.name}</h4>
//             <h5 class="card-brand">${ele.brand}</h5>
//             <p>Price : ${ele.price}$</p>
//             <button class="card-button">Add to Cart</button>
//             </div>
//             `

//         })

//         mainSection.innerHTML = htmlStr;

//     } catch (error) {
//         console.log(error);
//     }

// }

// autoPartsShop()

// interiors.addEventListener('click', () => {

//     autoPartsShop(`https://mock-api-template-vema.onrender.com/tyres`, `category=Medium on Category`)

// })

// // sortlowtohigh.addEventListener('click', () => {

// //     autoPartsShop(`https://mock-api-template-vema.onrender.com/tyres&_sort=price&_order=asc`);

// // })

const productsContainer = document.getElementById("products_container");
const sortingSelect = document.getElementById("sorting");
let flag = false;

// Flag to track whether sorting is applied
let isSortingApplied = false;
let currentPage ;
function fetchDataFromAPI(currentPage=1) {
  fetch('https://drab-gold-goat-sock.cyclic.app/tyres?_page=${currentPage}&_limit=12')
    .then(response => response.json())
    .then(data => {
      popularkData = data;
      populateProducts(popularkData);
      displayData(popularkData);
      sortAndDisplay(sortingSelect.value);
      flag = true;
    })
    .catch(error => {
      console.error('Error fetching data from the API', error);
    });
}

// Call the function to fetch data from the API when the page loads
fetchDataFromAPI();

// Function to display the data
function displayData(data) {
  // Clear the existing products container
  productsContainer.innerHTML = '';

  data.forEach((product) => {
    const productContainer = createProductElement(product);
    productsContainer.appendChild(productContainer);

  });
}

let popularkData = [];
const productsPerPage = 4;
let currentStartIndex = 0;


// Sorting
sortingSelect.addEventListener("change", () => {
  const selectedOption = sortingSelect.value;
  sortAndDisplay(selectedOption);
});

function sortAndDisplay(selectedOption) {
  // Sort the original data based on the selected option if sorting is not applied
  if (!isSortingApplied) {
    isSortingApplied = false; // Update the sorting flag

    switch (selectedOption) {
      case "atoz":
        popularkData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "ztoa":
        popularkData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "lowtohigh":
        popularkData.sort((a, b) => a.price - b.price);
        break;
      case "hightolow":
        popularkData.sort((a, b) => b.price - a.price);
        break;
      default:
        // If no valid sorting option is selected, reset the flag
        isSortingApplied = false;
        break;
    }
  }

  // Display the sorted or unsorted data
  displayCurrentPage();
}

// Function to filter and display the data based on selected filters
function filterAndDisplay() {
  const selectedFilters = [];
  const selectedBrands = [];

  // Get selected product categories
  const categoryCheckboxes = document.querySelectorAll('#filterCategory input[type="checkbox"]');
  categoryCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedFilters.push(checkbox.value);
    }
  });

  // Get selected product brands
  const brandCheckboxes = document.querySelectorAll('#filterBrand input[type="checkbox"]');
  brandCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedBrands.push(checkbox.value);
      
    }
  });

  // Get selected price range
  const priceRangeFilter = document.getElementById('price_range_filter');
  const selectedPrice = priceRangeFilter.value;

  // Filter products based on selected filters
  const filteredData = popularkData.filter(product => {
    const categoryMatch = selectedFilters.length === 0 || selectedFilters.includes(product.category);
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const priceMatch = product.price <= selectedPrice;
    return categoryMatch && brandMatch && priceMatch;
  });

  // Call the function to display the filtered data
  displayData(filteredData);
}

// Add event listeners for checkboxes and price range filter
const filterCheckboxes = document.querySelectorAll('.filter input[type="checkbox"]');
const priceRangeFilter = document.getElementById('price_range_filter');

filterCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', filterAndDisplay);
});

priceRangeFilter.addEventListener('input', filterAndDisplay);

// Function to display the data (You should implement this based on your HTML structure)

// Call the function to fetch data from the API when the page loads
fetchDataFromAPI();




// const popularproductsContainer = document.querySelector(".products-container");
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
  price.textContent = `Price:  ₹${product.price}`;

  const bag = document.createElement("button");
  bag.textContent="Add to Cart";

  const newimg =document.createElement("img");
  newimg.setAttribute("alt", product.name);
  newimg.setAttribute("id","newimg");
  newimg.src= `../images/basket-cart-icon-27.png`;

  bag.addEventListener("click", () => {
    bagnew()
  });

   async function bagnew(){
    bag.textContent = "Added to Cart";
    bag.style.backgroundColor = "";
    bag.append(newimg);

    const postData = {
        name:product.name ,
        category: product.category,
        brand: product.brand,
        price: product.price,
        quantity: product.quantity,
        images: product.images[0],
      };
     

      try {
        // Make the POST request
        const response = await fetch('https://cart-one.onrender.com/users',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          })
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        console.log('Data sent successfully:', data);
    
        // Assuming you want to continue with the UI changes after the POST request is successful
        bag.textContent = "Added to Cart";
        bag.style.backgroundColor = "lightgreen";
    
        // Set a timeout to revert the changes after 2 seconds
        setTimeout(() => {
            bag.textContent = "Add to Cart";
            bag.style.backgroundColor = "";
            bag.append(newimg);
             // Reset background color to the original state
          }, 2000);

      } catch (error) {
        console.error('Error sending data:', error);
        // Handle errors, e.g., show an error message to the user
      } 

     
   }
      

   
  
  const img = document.createElement("img");
  img.setAttribute("src", product.images[0]);
  img.setAttribute("alt", product.name);


// heartbtn 

//   const heartButton = document.createElement("button");
//   heartButton.innerHTML = "&#9825;" // This is the heart symbol
//  heartButton.setAttribute("id","heartbtn");
//   heartButton.addEventListener("click", () => {

//     heartButton.innerHTML = "❤️"
//     heartButton.style.Color = ("red");
//     localStorage.setItem(`product_${product.id}`, JSON.stringify(product));
//   });

  img.addEventListener("click", function () {
    window.location.href = "./item.html"
    localStorage.setItem('productkey', JSON.stringify(product));
  })
bag.append(newimg)
  productElement.appendChild(img);
  productElement.appendChild(h3);
  productElement.appendChild(price);
  productElement.appendChild(bag);
  // productElement.appendChild(heartButton);

  return productElement;
}


productsContainer.addEventListener("scroll",()=>{
    
  let clientHeight = productsContainer.clientHeight;
  let scrollHeight = productsContainer.scrollHeight;
  let scrollTop = productsContainer.scrollTop;

  //console.log(clientHeight,scrollHeight,scrollTop);
  if((scrollHeight - clientHeight)<=Math.ceil(scrollTop) && flag){
      console.log("we are at the bottom");
      page++;
      fetchData(page);
      flag = false;
  }
})

// Populate products into the carousel (You can use your data source)


// Populate products into the carousel (You can use your data source)
function populateProducts(popularkData) {
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
    populateProducts(popularkData);
  }
});

nextButton.addEventListener("click", () => {
  if (currentSlide + productsPerPage < popularkData.length) {
    currentSlide += productsPerPage;
    populateProducts(popularkData);
  }
});

// Initial population of products
populateProducts(popularkData);


//pagination

const productsPerPageList = 11;
function displayProducts(pageNumber, productsPerPage) {
  // Calculate the start and end indices for the current page
  const startIndex = (pageNumber - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Clear the existing products container
  const productsContainer = document.getElementById("products_container");
  productsContainer.innerHTML = '';

  // Display products for the current page
  for (let i = startIndex; i < endIndex && i < popularkData.length; i++) {
    const product = popularkData[i];
    const productContainer = createProductElement(product);
    productsContainer.appendChild(productContainer);
  }
}
let paginationContainer =document.getElementById("pagination");

function createPaginationButtons() {
  const totalPages = Math.ceil(popularkData.length / productsPerPageList);

  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      displayCurrentPage(popularkData);
    });
    paginationContainer.append(pageButton);
  }
}

createPaginationButtons();
function displayCurrentPage(popularkData) {
  const startIndex = (currentPage - 1) * productsPerPageList;
  const endIndex = startIndex + productsPerPageList;
  const productsToDisplay = popularkData.slice(startIndex, endIndex);

  displayData(productsToDisplay);
}

// Initial population of the first page
displayCurrentPage();