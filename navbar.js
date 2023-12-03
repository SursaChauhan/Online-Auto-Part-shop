function navbar(){
    return  ` 
    <header>
    <div id="navbar_container">
    <div id="nav_parent">
        <div id="nav_child_1">
            <p>Help | Order Status</p>
            <p>Free shipping : On All U.S. Orders Over $100</p>
            <p><span><i class="fa-solid fa-phone"></i></span> 123.456.7890</p>
        </div>
        <div id="nav_child_2">
            <div>
                <div>
                    <img src="https://i.postimg.cc/6pvdh9G0/logg.png" alt="logo">
                </div>
                <div>
                    <input type="text" id="search_input" placeholder="Search by Model Year, Products...">
                    <button id="search_btn"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div>
                <span id="username_text"></span>
                <button id="logout_text" style="display: none">Logout</button>
                <p><a href="./loginPage/index.html" id="login_text">Login</a></p>
                    <p><i class="fa-solid fa-heart"></i></p>
                    <p><a href="../cart/cart.html" style="color: #949494;"><i class="fa-solid fa-cart-shopping"></i></a></p>
                    
                </div>
            </div>
        </div>
        <div id="nav_child_3">
            <a href="#">Exterior</a>
            <a href="#">Interior</a>
            <a href="#">Performance</a>
            <a href="#">Wheels and Tires</a>
            <a href="#">Body Parts</a>
            <a href="#">Repair Parts</a>
            <a href="#">Electronics</a>
            <a href="#">Tools & Garage</a>
        </div>
    </div>
</div>


<nav>
    <div id="navm">
        <div class="hamburger">
            <i class="fas fa-bars"></i>
        </div>
        <div class="logo">
            <!-- <h2>BigBasket</h2> -->
            <div>
                <img src="https://i.postimg.cc/6pvdh9G0/logg.png" alt="logo">
            </div>
        </div>
        <div class="profile">
            <i class="fas fa-user"></i>
        </div>
    </div>
    <div id="mysearch">
        <div class="search-container1">
            <form action="/search">
                <input type="text" placeholder="Search..." />
                <button type="submit"><i class="fa fa-search"></i></button>
            </form>
        </div>
    </div>
</nav>

<div class="slide-menu">
    <h4>Auto Parts</h4>
    <ul>
        <li><a href="#">Exterior</a></li>
        <li><a href="#">Interior</a></li>
        <li><a href="#">Performance</a></li>
        <li><a href="#">Wheels and Tires</a></li>
        <li><a href="#">Body Parts</a></li>
        <li><a href="#">Repair Parts</a></li>
        <li><a href="#">Electronics</a></li>
        <li><a href="#">Tools & Garage</a></li>
    </ul>
</div></header>
`
}

export {navbar};