
document.addEventListener("DOMContentLoaded", handleEvents);

function handleEvents(e) {

    //  When signup button, register() function invoked
    $("#signup-form").on("submit", function (e) {
        register();
        e.preventDefault();
    });

    // When signin button, login() function invoked
    $("#signin-form").on("submit", function (event) {
        login();
        event.preventDefault();
    });

    // Search For Product
    $("#searchBox").on("change", function (e) {
        searchForProduct();
        e.preventDefault();
    });

    // menu qty counter by +
    $("#add").on("click", function () {
        let currentVal = parseInt($(".menu-item-quantity").html(), 10);
        $(".menu-item-quantity").html(currentVal + 1);
    });

    // menu qty counter by -
    $("#minus").on("click", function () {
        let currentVal = parseInt($(".menu-item-quantity").html(), 10);

        if (currentVal === 0) {
            $(".menu-item-quantity").html(currentVal);
        } else {
            $(".menu-item-quantity").html(currentVal - 1);
        }
    });

    // cartBtn eventListener
    let cart = document.getElementById("cartBtn");
    if (cart) {
        cart.addEventListener("click", handleAddToCart)
    }

    // placeBtn eventListener using Event Delegation
    let card = document.querySelector(".card");
    if (card) {

        card.addEventListener("click", function (e) {

            if (e.target.id == 'placeBtn') {
                handlePlaceOrder();
            }
        });
    }

    // toggle password [show/hide] in login form
    let eyeIcon = document.getElementById("eye-icon");
    if (eyeIcon)
        eyeIcon.addEventListener("click", togglePassword);

    // logout
    $("#logout").on("click", function () {
        localStorage.clear();
        alert("Are you sure to exist our app?");
        setTimeout(function () {
            window.location.replace("index.html");
        }, 500);
    })

}

// toggle Passoword
function togglePassword() {
    if (document.getElementById("password").type === 'password') {
        document.getElementById("password").type = 'text';
        this.classList.remove('fa-eye-slash')
        this.classList.add('fa-eye');
    } else {
        document.getElementById("password").type = 'password';
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
    }
}

function handlePlaceOrder() {

    // if not login, redirect to login
    if (isLogged()) {

        window.location.replace("payment.html");
        handlePayment();

    } else { // else, go to stripe payment
        alert("You should login first, you will redirecetd to login page after 5 seconds");
        setTimeout(function () {
            window.location.replace("signin.html");
        }, 5000);

    }

}

function handlePayment() { }


// get checked value from Sugar radio buttons
function getSugar() {
    const sugarBtns = document.getElementsByName("sugar");
    let checkedVal;
    sugarBtns.forEach((suger) => {
        if (suger.checked) {
            checkedVal = suger.value;
        }
    });

    return checkedVal;
}

// get checked value from Extra Options
function getExtraOptions() {
    let options = document.getElementsByName("options[]");
    let extraOptions = {
        checkedVal: '',
        price: ''
    }
    let selected = [];
    let price, finalPrice;
    // loop through nodeList using ES6
    options.forEach(option => {
        if (option.checked)
            // selected.push(option.value);
            extraOptions.checkedVal = option.value;
        price = option.nextElementSibling.children[1].textContent;
        finalPrice = price.slice(1);
        extraOptions.price = finalPrice;

        selected.push(extraOptions);
    });

    return selected;
}

// get checked value from Milk radio buttons
function getMilkType() {
    let milkBtns = document.getElementsByName("milk");

    let milkType = {
        checkedVal: "",
        price: ""
    }

    let price, finalPrice;
    milkBtns.forEach(milk => {
        if (milk.checked) {
            milkType.checkedVal = milk.value;
            price = milk.nextElementSibling.children[1].textContent;
            finalPrice = price.slice(1);
            milkType.price = finalPrice;
        }
    });

    return milkType;
}

// get checked value from Size RadioButtons
function getOrderSize(e) {
    let size = {
        checkedVal: "",
        price: ""
    };
    1
    let sizeBtns = document.getElementsByName("size");
    let price, finalPrice;
    sizeBtns.forEach(orderSize => {
        if (orderSize.checked) {
            size.checkedVal = `${orderSize.value}`;
            price = orderSize.nextElementSibling.children[1].textContent;
            finalPrice = price.slice(1);
            size.price = finalPrice;
        }

    });

    return size;
}

function getOrder(e) {

    let order = {
        size: "",
        milkType: "",
        options: [],
        sugar: ""
    };

    order.size = getOrderSize(e);
    order.milkType = getMilkType();
    order.options.push(getExtraOptions());
    order.sugar = getSugar();

    return order;
}

function handleAddToCart(e) {

    // 1) remove the default body of cart
    let emptyCard = document.querySelector(".cart-empty");
    emptyCard.style.display = "none";



    // 2) get order
    let order = getOrder();
    console.log(order);


    // 3) create Cart Elements
    let restName = document.querySelector("h2.r-name");
    let restAddress = document.querySelector("p.r-address");

    // let shoppingCart = document.querySelector(".shopping-cart");
    let cardContainer = document.querySelector(".card");


    // Create Card Header
    let divHeader = document.createElement("div");
    divHeader.setAttribute("class", "card-header bg-warning border-transparent");

    // Create Restaurant Name & add value from user selection
    let restNameElm = document.createElement("h4");
    restNameElm.setAttribute("class", "r-name");
    restNameElm.textContent = restName.textContent;

    // Create Restaurant Address & add value from user selection
    let restAddressElm = document.createElement("p");
    restAddressElm.setAttribute("class", "r-address mb-0");
    restAddressElm.textContent = restAddress.textContent;

    //append children to divHeader
    divHeader.appendChild(restNameElm);
    divHeader.appendChild(restAddressElm);

    // append divHeader to orderCartContainer
    cardContainer.appendChild(divHeader);

    cardContainer.innerHTML += `
                        <div class="card-body text-secondary" id="cart-items">
                            <div class="d-flex">
                                <div class="quantity mr-2">
                                    <span>1</span>
                                </div>
                                <div class="description">
                                    <span><strong> Flat White</strong></span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div class="addons">
                                    <span>Regular, Whole</span>
                                </div>
                                <div class="total-price">$549</div>
                                <div class="buttons">
                                    <i class="fas fa-minus-circle"></i>
                                </div>
                            </div>
                        </div>
`;


    // create card footer
    let divFooter = document.createElement("div");
    divFooter.setAttribute("class", "card-footer text-center bg-transparent border-transparent");

    //add place Order button
    let placeBtn = document.createElement("button");
    let btnText = document.createTextNode("Place Order");
    placeBtn.appendChild(btnText);
    placeBtn.id = "placeBtn";
    placeBtn.setAttribute("class", "btn btn-orange");

    divFooter.appendChild(placeBtn);
    cardContainer.appendChild(divFooter);


    // let btn = document.createElement("button");
    // btn.classList.add("btn", "btn-danger");

    // btn.appendChild(document.createTextNode("test"));

    // cartContainer.appendChild(btn);


    //     cartContainer.innerHTML = `<div class="card border-0 mb-3 rounded-0">
    //     <div class="card-header bg-warning border-transparent">
    //         <div class="order-contentp-2">
    //             <h2 class="r-name mb-0">V69 COFFEE (GRESHAM ST)</h2>
    //             <p class="r-address text-white">30 Gresham Street</p>
    //         </div>
    //     </div>

    //     <div class="card-body text-secondary" id="cart-items">

    //         <!-- cart items wil be added here by javascript -->
    //         <div class="d-flex">
    //             <div class="quantity mr-2">
    //                 <span>1</span>
    //             </div>
    //             <div class="description">
    //                 <span><strong> Flat White</strong></span>
    //             </div>
    //         </div>
    //         <div class="d-flex justify-content-between">
    //             <div class="addons">
    //                 <span>Regular, Whole</span>
    //             </div>
    //             <div class="total-price">$549</div>
    //             <div class="buttons">
    //                 <i class="fas fa-minus-circle"></i>

    //             </div>
    //         </div>

    //     </div>
    // </div>`




    // 3) add items to cart

    e.preventDefault();
}

loadFunctions();

function loadFunctions() {
    getCurrentYear();
    showCookiesAlert();
    closeButton();
    initToolTip();
    isLogged();
    showDeliverCharge();

}

function initToolTip() {
    // initialize all tooltips on a page
    $("[data-toggle='tooltip']").tooltip();
}

function getCurrentYear() {
    document.getElementById("year").textContent = new Date().getFullYear();
}

function showCovidAlert() {
    setTimeout(function () {
        $(".covid-alert").fadeIn(2000);
    }, 2000);

    setTimeout(function () {
        $(".covid-alert").fadeOut(2000);
    }, 10000);
}

function showCookiesAlert() {
    setTimeout(function () {
        $(".cookies-alert").addClass("d-flex justify-content-around align-items-center");
        $(".cookies-alert").fadeIn(2000);
    }, 2000);
}

function closeButton() {
    $("#okBtn").on("click", function () {
        $(".cookies-alert").removeClass("d-flex justify-content-around");
        $(".cookies-alert").fadeOut(2000);

        showCovidAlert();

    });

}

// register function
function register() {

    // Get values from register form
    const firstName = $("#fname").val();
    const lastName = $("#lname").val();
    const email = $("#email").val();
    const phoneNumber = $("#mobile").val();
    const password = $("#password").val();

    if (firstName !== "" && lastName !== "" && email !== "" && password !== "") {

        data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
        };

        url = "https://app.coffeerunstore.com/api/Register";

        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (response, status) {
                if (response.hasError) {
                    alert("Request Error");
                    for (var i = 0; i < response.errors.length; i++) {
                        console.log(response.errors[i].description);
                    }

                    console.log(status);
                    return;
                }

                // RESET FORM INPUT
                $("#fname").val("");
                $("#lname").val("");
                $("#email").val("");
                $("#mobile").val("");
                $("#password").val("");

                //console.log(response);
                $(".alert").removeClass("alert-danger").addClass("alert-success").text("Congratulation, registration done successfully");

                setInterval(function () {
                    $(".alert").hide();
                    window.location.replace("signin.html");
                }, 5000);
            },

            error: function (xhr, status, error) {
                //console.log(xhr, status, error);
            },
        });

    } else { // Empty Fields

        $(".alert").removeClass("alert-success").addClass("alert-danger").text("Empty Fields");

        setInterval(function () {
            $(".alert").hide();
        }, 3000);
    }
}

// login function
function login() {

    //get values
    let userEmail = $("#email").val();
    let userPass = $("#password").val();

    if (userEmail !== "" && userPass !== "") {
        data = {
            email: userEmail,
            password: userPass,
        };

        //url = "https://app.coffeerunstore.com/api/Login";
        url = `https://app.coffeerunstore.com/api/Login?email=${data.email}&password=${data.password}`;

        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (response, status) {
                if (response.hasError) {

                    $(".alert").removeClass("alert-success").addClass("alert-danger").text("Email or Password is wrong!");
                    setTimeout(function () {
                        $(".alert").fadeOut()
                    }, 5000)
                    return;
                }

                // store userData to localStorage
                localStorage.setItem("UserData", JSON.stringify(response.data));

                if (status === "success") {
                    $(".alert").removeClass("alert-danger").addClass("alert-success").text("login done successfully");

                    // redirect user to product search
                    setTimeout(function () {
                        window.location.replace("restaurants.html");
                    }, 500);
                }
            },
        });
    }
}

// getUserData()
function getUserData() {
    let user = JSON.parse(localStorage.getItem("UserData"));
    return user;
}

// check if user login or not
function isLogged() {

    let userData = getUserData();

    if (userData === null) {
        $("#signin-btn").show();
        $("#user-account").hide();

        return false;

    } else {

        $("#signin-btn").hide();
        $("#user-account").show();

        getShops();
        getCategories();
        getProducts();

        // userData.roles.forEach(role => {
        //     if (role === 'Admin') {
        //         console.log(`Welcome ${userData.name}`);
        //     } else if (role === 'User') {
        //         console.log(`Hello ${userData.name}`);
        //     } else if (role === 'Provider') {
        //         console.log(`HI ${userData.name}`);
        //     }
        //     else {
        //         console.log(`Guest`);
        //     }
        // });

        return true;

    }

}



//Input Search For Product
function searchForProduct() {

    // get keyword value
    let keyword = $("#searchBox").val();

    // get user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;

            let data = {
                keyword: keyword,
                lat: lat,
                lng: lng,
            };

            url = `https://app.coffeerunstore.com/api/Product/search-product?Keyword=${data.keyword}`;

            //make ajax GET request
            $.ajax({
                type: "GET",
                url: url,
                data: data,
                success: function (response) {

                    console.log(response);

                    let output = "";
                    response.data.forEach(function (product) {
                        console.log(`${product.name} - ${product.shopName})`);

                        output += `<div class="media-list">
                        <a href="order-details.html" class="media">
                          <img src="img/CR13.jpg" width="190px" class="mr-3" alt="..." />
                          <div class="media-body">
                            <h3 class="my-0">${product.shopName}</h3>
                            <p class="media-description">${product.shopTypeName}</p>
                            <ul class="media-tags d-flex">
                              <li class="media-tag media-tag-yellow mr-sm-2">
                                fisrt-taste
                              </li>
                              <li class="media-tag">closed</li>
                              <li class="media-price text-right flex-grow-1">Price: $${product.price}</li>
                            </ul>
                            <div class="media-hourse">
                              <span> Open 9:40 AM - 6:00 PM </span>
                            </div>
                          </div>
                        </a>
                      </div>`;

                        document.getElementById("product-list").innerHTML = output;
                    });

                    //loop through th response, but loop through the value not all object

                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
    } else {
        alert("Geolocation is not supported by this browser");
    }

}


// get shops
function getShops() {

    $.ajax({
        type: "GET",
        url: "https://app.coffeerunstore.com/api/Shop",
        success: function (response) {
            console.log(response);

            let output1 = "";
            let output2 = "";
            response.data.forEach(function (shop) {

                output2 = ` <h2 class="mb-0">${shop.name} (${shop.address})</h2>
                                <p>${shop.description}</p>
                            `;

                output1 += `
                <div class="media-list">
                <a href="order-details.html" class="media">
                  <img src="img/CR13.jpg" width="190px" class="mr-3" alt="..." />
                  <div class="media-body">
                    <h3 class="my-0">${shop.name} (${shop.address})</h3>
                    <p class="media-description">${shop.description}</p>
                    <ul class="media-tags d-flex">
                      <li class="media-tag media-tag-yellow mr-sm-2">
                        fisrt-taste
                      </li>
                      <li class="media-tag">${shop.isClosed}</li>

                    </ul>
                    <div class="media-hourse">
                      <span> Open ${shop.startTime} AM - ${shop.endTime} PM </span>
                    </div>
                  </div>
                </a>
              </div>`;
            });

            $("#shop-heading").html(output2);
            $("#product-list").html(output1);
        },
        error: function (err) {
            console.log(err);
        }

    });
}

// get Categories
function getCategories() {
    $.ajax({
        type: "GET",
        url: "https://app.coffeerunstore.com/api/Category",
        success: function (response) {
            console.log(response);
            let output = "";
            response.data.forEach(function (cat) {

                output += `<li>
                                <a href="#" class="clickable">${cat.name}</a>
                            </li>`

            });

            $("#categories").html(output);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

// get products
function getProducts() {
    $.ajax({
        type: "GET",
        url: "https://app.coffeerunstore.com/api/Product",
        success: function (response) {
            console.log(response);
            let output = "";
            response.data.forEach(function (product) {

                output += `<li class="menu-item">
                <a href="addToCart.html" target="_blank" class="menu-item-inner">

                    <h2 class="menu-item-title">${product.name}</h2>

                    <p class="menu-item-description">${product.description}.</p>
                </a>
            </li>`

            });

            $("#menu-items").html(output);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function showDeliverCharge() {

    let radioBtn = document.getElementsByName("deliveryOption");

    let checkedVal;

    radioBtn.forEach(function (item) {

        item.addEventListener("click", function (e) {
            if (e.target.value === 'Yes') {
                // show the charge div
                if (document.getElementById("delivery-charge").style.display = "none") {
                    document.getElementById("delivery-charge").style.display = "block"
                }
            }
            if (e.target.value === 'No') {
                // show the charge div
                if (document.getElementById("delivery-charge").style.display = "block") {
                    document.getElementById("delivery-charge").style.display = "none"
                }
            }
        });

    });

    return checkedVal;



}




