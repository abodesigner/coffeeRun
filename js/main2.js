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

// check if user login or not
function isLogged() {
    let user = JSON.parse(localStorage.getItem("UserData"));
    if (user) {

        $("#signin-btn").hide();

        // do stuff if user login
        // $("#searchBox").on("change", function (e) {
        //   console.log("This is login User");
        //   e.preventDefault();
        // });

    } else {

        $("#signin-btn").show();

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
