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
    })
}



loadFunctions();
function loadFunctions() {
    getCurrentYear();
    showCookiesAlert();
    closeButton();
    searchForProduct();
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

        url = "https://app.coffeerunstore.com/api/Login";

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

//Input Search For Product
function searchForProduct() {
    $("#searchBox").on("change", function (event) {
        event.preventDefault();

        // get keyword value
        let keyword = $(this).val();

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

                url = "https://178.63.132.246:44300/api/Product/search-product";

                //make ajax GET request
                $.ajax({
                    type: "GET",
                    url: url,
                    data: data,
                    success: function (response) {
                        console.log(response);

                        let result = JSON.parse(response);

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
    });
}
