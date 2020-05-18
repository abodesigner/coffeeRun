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

    // cartBtn eventListener
    let cart = document.getElementById("cartBtn");
    if (cart) {
        cart.addEventListener("click", handleCart);
    }

    // placeBtn eventListener
    $("#placeBtn").on("click", handleOrder);

}

function handleOrder() {
    // if not login, redirect to login
    if (!isLogged()) { // not login
        alert("You should login first, you will redirecetd to login page after 5 seconds")
        setTimeout(function () {
            window.location.replace("signin.html");
        }, 5000);
    } else {
        window.location.replace("payment.html");
    }

    // els, go to stripe payment
}


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
    const options = document.getElementsByName("options[]");
    let checkedVal;
    options.forEach((option) => {
        if (option.checked) {
            checkedVal = option.value;
        }
    });

    return checkedVal;
}


// get checked value from Milk radio buttons
function getMilkType() {
    const milkBtns = document.getElementsByName("milk");
    let checkedVal;
    milkBtns.forEach(milk => {
        if (milk.checked) {
            checkedVal = milk.value;
        }
    });

    return checkedVal;
}

// get checked value from Size RadioButtons
function getOrderSize() {
    let sizeBtns = document.getElementsByName("size");
    let checkedVal;
    sizeBtns.forEach(orderSize => {
        if (orderSize.checked) {
            checkedVal = orderSize.value;
        }
    });
    return checkedVal;
}

function getItemsValues() {

    console.log(getOrderSize());
    console.log(getMilkType());
    console.log(getExtraOptions());
    console.log(getSugar());


}

function handleCart(e) {

    // 1) get items's values
    getItemsValues();


    // 2) create new cart

    // 3) add items to cart


    e.preventDefault();
}



loadFunctions();
function loadFunctions() {
    getCurrentYear();
    showCookiesAlert();
    closeButton();
    isLogged();
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
        $(".cookies-alert").addClass("d-flex justify-content-around");
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
                    console.log(status);
                    for (var i = 0; i < response.errors.length; i++) {
                        console.log(response.errors[i].description);
                    }

                    // $(".alert").removeClass("alert-success").addClass("alert-danger").text("Email or Password is wrong!");
                    // setTimeout(function () {
                    //     $(".alert").fadeOut()
                    // }, 2000)
                    return;
                }

                // store userData to localStorage
                localStorage.setItem("UserData", JSON.stringify(response.data));

                // console.log("SUCCESS");

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

    // userData.roles.forEach(role => {

    //     console.log(`SUCCESS: THIS IS : ${role}`);
    // });


    if (userData) {

        $("#signin-btn").hide();

        // do stuff if user login
        // $("#searchBox").on("change", function (e) {
        //   console.log("This is login User");
        //   e.preventDefault();
        // });
        return true;
    } else {

        $("#signin-btn").show();

        return false;

        // do stuff if user not login
        //searchForProduct();
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
                },
            });
        });
    } else {
        alert("Geolocation is not supported by this browser");
    }

}
