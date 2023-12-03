let mainSection = document.getElementById('mainSection');

let interiors = document.getElementById('filter-Interios-on-Canvas');

let sortlowtohigh = document.getElementById('sort-low-to-high')

async function autoPartsShop() {

    try {
        
        let res = await fetch(`https://mock-api-template-vema.onrender.com/tyres`, {

        method: "GET",

        })

        console.log('res', res);

        let data = await res.json();
        console.log('data', data);

        let htmlStr = '';

        data.forEach((ele) => {

            htmlStr += `
            <div class="cards">
            <img class="card-image" src="${ele.images[0]}" alt="Auto Parts">
            <h4 class="card-name">${ele.name}</h4>
            <h5 class="card-brand">${ele.brand}</h5>
            <p>Price : ${ele.price}$</p>
            <button class="card-button">Add to Cart</button>
            </div>
            `

        })

        mainSection.innerHTML = htmlStr;

    } catch (error) {
        console.log(error);
    }

}

autoPartsShop()

interiors.addEventListener('click', () => {

    autoPartsShop(`https://mock-api-template-vema.onrender.com/tyres`, `category=Medium on Category`)

})

sortlowtohigh.addEventListener('click', () => {

    autoPartsShop(`https://mock-api-template-vema.onrender.com/tyres&_sort=price&_order=asc`);

})