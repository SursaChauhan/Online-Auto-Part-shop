// var products = [
//     {
//         id:1,
//         images : ['https://m.media-amazon.com/images/I/61UzyToy2YL._AC_AA180_.jpg'],
//         name : 'Spark Plug',
//         quantity : 1,
//         price : 459,
//     },
//     {
//         id:2,
//         images : ['../image/cart2.webp'],
//         name : 'Brake Disc',
//         quantity : 1,
//         price : 5999,
//     },
//     {
//         id:3,
//         images : ['../image/cart3.webp'],
//         name : 'Oil Filter',
//         quantity : 1,
//         price : 549,
//     },


// ]


 products = JSON.parse(localStorage.getItem('cart-products'))||[];
async function fetchdata() {
    try {
        let res = await fetch(`https://mock-api-template-vema.onrender.com/tyres?_page=${1}&limit=5`, {
            method: 'GET'
        });

        let data = await res.json();
        console.log(data);
        products = data;
        console.log("products", products);
display(products);

        localStorage.setItem('cart-products', JSON.stringify(products));
    } catch (err) {
        console.log(err);
    }
}
fetchdata();
console.log(products);

var items = document.getElementById('items')
function display(products) {
    
  let Shopping= document.getElementById('Shopping');
    items.innerHTML = "";
    if (products.length == 0) {
        Shopping.innerText=`Shopping Cart is Empty`;

        var img = document.createElement('img');
        img.src = "https://assets-v2.lottiefiles.com/a/cbbb0d80-1185-11ee-bb81-1f8a0ee065ae/kGZag9os6n.gif"
        img.style.width = "80%";
        img.style.marginTop = "0px"
        img.style.paddingTop = "0px"
        var shopnow = document.createElement('h3');
        shopnow.className = "shopnow"
        shopnow.innerText = 'Your cart is Empty!'
        items.append(shopnow, img);

    }
    else{
        Shopping.innerText=`Shopping Cart :${products.length} Items`;

    products.forEach(function (element, index) {
        var item = document.createElement('div');
        item.className = 'item';
        var div = document.createElement('div');
        var img = document.createElement('img');
        var name = document.createElement('h4');
        var price = document.createElement('h6');
        var strikeoff = document.createElement('h6');
        var btn = document.createElement('button');
        var brand = document.createElement('p'); // New element for brand
        var category = document.createElement('p');
        var newprice =document.createElement("div");
        var upperdiv =document.createElement("div");
        var brandcatdiv =document.createElement("div");

        var brandcatdiv =document.createElement("div");
        var otherinfo =document.createElement("div");

        var qtyLabel = document.createElement('label'); // New element for quantity label
        var qtySelect = document.createElement('select');
  
    for (var i = 1; i <= 10; i++) { // You can customize the range of quantity
        var option = document.createElement('option');
        option.value = i;
        option.text = i;
        qtySelect.add(option);
    }
    qtySelect.value =element.quantity;

        
        btn.textContent = '| REMOVE';
        btn.id = "removeBtn";

        img.src = element.images[0];
        img.style.width = '100px';

        name.textContent = element.name;

        qtyLabel.innerHTML = `Quantity: `
        qtyLabel.className = 'name';

        brand.textContent =   `Brand: ${element.brand}`;
    category.textContent =  `Category: ${element.category}`;
        price.textContent = ' ₹ ' + element.price;
        price.style.float = 'top'

        strikeoff.textContent = ' MRP :₹ ' + element.price * 2;
        strikeoff.style.float = 'top'
        // strikeoff.style.textDecoration = "line-through"

      // Inside the forEach loop where you create removeBtn elements
btn.addEventListener('click', async function (event) {
    try {
        event.preventDefault();

        // Make the DELETE request to remove the item from the server
        const response = await fetch(`https://mock-api-template-vema.onrender.com/tyres/${products[index].id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const deletedData = await response.json();
        console.log('Item deleted successfully on the server:', deletedData);

        // Update the local storage and remove the item from the products array
        products.splice(index, 1);
        localStorage.setItem('cart-products', JSON.stringify(products));

        // Update the displayed items
        display(products);
        // updateprice(products);
        // Update the total cost and the number of items
        document.getElementById('total-cost').textContent = `Subtotal (${products.length} items) :₹ ${total(products)}`;
    } catch (error) {
        console.error('There was a problem with the DELETE request:', error);
    }
});


newprice.append(strikeoff,price)
newprice.setAttribute("class","newprice");
upperdiv.append(name,newprice);

upperdiv.setAttribute("class","upperdiv")

brandcatdiv.append(brand,category)
brandcatdiv.setAttribute("class","brandcatdiv")

qtyLabel.append(qtySelect);
otherinfo.append(qtyLabel,btn);
otherinfo.setAttribute("class","otherinfo");

        div.append(upperdiv,brandcatdiv, otherinfo);
        item.append(img, div);
        items.append(item);
        document.getElementById('total-cost').textContent = `Subtotal (${products.length} items) :₹ ${total(products)}`

        var Subtotal =document.getElementById("price-cost");
        Subtotal.textContent= `Subtotal (${products.length} items) :₹ ${total(products)}`

        

        qtySelect.addEventListener('change', async function () {
            try {
                const newQuantity = parseInt(qtySelect.value);
        
                // Update the local storage
                products[index].quantity = newQuantity;
                localStorage.setItem('cart-products', JSON.stringify(products));
        
                // Prepare the data for the PATCH request
                const patchData = {
                    quantity: newQuantity
                };
        
                // Make the PATCH request to update the quantity on the server
                const response = await fetch(`https://mock-api-template-vema.onrender.com/tyres/${products[index].id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(patchData),
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.json();
                console.log('Quantity updated successfully on the server:', data);

                // Update the displayed items
              
                display(products);
                let strikeoff = document.getElementById("strikeoff");
                let sp = products.reduce(function (acc, element, index) {
                    // return acc + + +element.price * 2;
                    return acc + + +products[index].price * +products[index].quantity;
                }, 0)
                strikeoff.innerText = sp;

                let discount = document.getElementById("discount");
                discount.innerText = "- " + sp / 2
                let total = document.getElementById("total");
                total.innerText = sp / 2
                let save = document.getElementById("price-discount");
                save.innerText = sp / 2;
                // Update the total cost and the number of items
                document.getElementById('total-cost').textContent = `Subtotal (${products.length} items) :₹ ${sp}`;
            } catch (error) {
                console.error('There was a problem with the PATCH request:', error);
            }
        });
        

    })
    let strikeoff = document.getElementById("strikeoff");
                let sp = products.reduce(function (acc, element, index) {
                    // return acc + + +element.price * 2;
                    return acc + + +products[index].price * +products[index].quantity;
                }, 0)
                strikeoff.innerText = sp;

                let discountr = document.getElementById("discount");
                discountr.innerText = "- " + sp / 2
                let totals = document.getElementById("total");
                totals.innerText = sp / 2
                let save = document.getElementById("price-discount");
                save.innerText = sp / 2;

}
}


var proceed =document.getElementById("Proceed")
proceed.addEventListener("click",()=>{

    const paymentprice =localStorage.setItem("paymentprice",total(products));
    window.location.href='../address.html'

});


function total(arr) {
    if (arr.length == 0) return 0;
    else
        return arr.reduce(function (acc, element, index) {
            return acc + + +arr[index].price * +arr[index].quantity;
        }, 0)
}

function updateprice(products) {
    let strikeoff = document.getElementById("strikeoff");
    let sp = products.reduce(function (acc, element, index) {
        // return acc + + +element.price * 2;
        return acc + + +arr[index].price * +arr[index].quantity;
    }, 0)
    strikeoff.innerText = sp;
    let discount = document.getElementById("discount");
    discount.innerText = "- " + sp / 2
    let total = document.getElementById("total");
    total.innerText = sp / 2
    let save = document.getElementById("price-discount");
    save.innerText = sp / 2;
}