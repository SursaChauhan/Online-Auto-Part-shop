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
let products = [];
async function fetchdata() {
    try {
        let res = await fetch(`https://mock-api-template-vema.onrender.com/tyres?_page=${1}&limit=5`, {
            method: 'GET'
        });

        let data = await res.json();
        console.log(data);
        products = data;
        console.log("products", products);

        localStorage.setItem('cart-products', JSON.stringify(products));
    } catch (err) {
        console.log(err);
    }
}
fetchdata();
// console.log(products);

var pds = JSON.parse(localStorage.getItem('cart-products')) || [];
var items = document.getElementById('items')
function display(products) {
    updateprice(products)
    items.innerHTML = "";
    if (products.length == 0) {
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
    document.getElementById('total-items').innerText = products.length;
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


        var qtyLabel = document.createElement('label'); // New element for quantity label
        var qtySelect = document.createElement('select');

       
        var br = document.createElement('br')
     

        
    for (var i = 1; i <= 10; i++) { // You can customize the range of quantity
        var option = document.createElement('option');
        option.value = i;
        option.text = i;
        qtySelect.add(option);
    }
    qtySelect.value =element.quantity;

        
        btn.textContent = 'REMOVE';
        btn.id = "removeBtn"

        img.src = element.images[0];
        img.style.width = '100px';

        strikeoff.style.fontSize = "15px";
        strikeoff.style.marginRight = "20px"

        name.textContent = element.name;

        qtyLabel.innerHTML = `Quantity: `
        qtyLabel.className = 'name';

        brand.textContent =   `Brand: ${element.brand}`;
    category.textContent =  `Category: ${element.category}`;
        price.textContent = '₹ ' + element.price;
        price.style.float = 'top'

        strikeoff.textContent = '₹ ' + element.price * 2;
        strikeoff.style.float = 'top'
        strikeoff.style.textDecoration = "line-through"

        btn.addEventListener('click', function (event) {
            event.preventDefault();
            products.splice(index, 1);
            localStorage.setItem('cart-products', JSON.stringify(products));
            document.getElementById('total-cost').textContent = total(products)
            display(products)

        });


        // let increase = document.getElementById("increase");
        // add.addEventListener("click", (event) => {
        //     event.preventDefault();
        //     element.quantity = element.quantity + 1;
        //     element.price = (element.price / (element.quantity - 1)) * element.quantity
        //     // console.log(element.price/(element.quantity-1))
        //     localStorage.setItem('cart-products', JSON.stringify(products));
        //     display(products);
        // })

        // less.addEventListener("click", (event) => {
        //     event.preventDefault();
        //     if (element.quantity == 1) less.disabled = true;
        //     else {
        //         element.quantity = element.quantity - 1;
        //         element.price = (element.price / (element.quantity + 1)) * element.quantity
        //         localStorage.setItem('cart-products', JSON.stringify(products));
        //         display(products)
        //     }
        // })
newprice.append(price,strikeoff)
upperdiv.append(name,newprice);
upperdiv.style.display ='flex'

        div.append(upperdiv,brand,category, qtyLabel,qtySelect, br, btn);
        item.append(img, div);
        items.append(item);
        document.getElementById('total-cost').textContent = total(products)
    })
}
display(pds);
function total(arr) {
    if (arr.length == 0) return 0;
    else
        return arr.reduce(function (acc, element, index) {
            return acc + + +arr[index].price;
        }, 0)
}

// console.log(total(products));
//redirecting to address page
var nxtPage = document.querySelector('#tp>button');
// console.log(nxtPage)
nxtPage.addEventListener('click', function (event) {
    window.location.href = '../address/address.html';
})


function updateprice(products) {
    let strikeoff = document.getElementById("strikeoff");
    let sp = products.reduce(function (acc, element, index) {
        return acc + + +element.price * 2;
    }, 0)
    strikeoff.innerText = sp;
    let discount = document.getElementById("discount");
    discount.innerText = "- " + sp / 2
    let total = document.getElementById("total");
    total.innerText = sp / 2
    let save = document.getElementById("price-discount");
    save.innerText = sp / 2;
}