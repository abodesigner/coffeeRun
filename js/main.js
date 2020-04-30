$(document).ready(function() {
  // cookies notification
  setTimeout(function() {
    $(".cookies-alert").addClass("d-flex justify-content-around");
    $("#cookieConsent").fadeIn(3000);
  }, 4000);

  // click on Ok button
  $("#okBtn").on("click", function() {
    $(".cookies-alert").removeClass("d-flex justify-content-around");
    $(".cookies-alert").fadeOut(200);
  });

  // initialize all tooltips on a page
  $('[data-toggle="tooltip"]').tooltip();

  // get current year @ footer
  $("#year").text(new Date().getFullYear());
  3;
  // smooth scroll
  $("#main-navbar a[href*='#']:not([href='#'])").on("click", function(event) {
    // prevent normal link behaviour
    event.preventDefault();

    let target = $(this).attr("href");

    // scroll with animate
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top
      },
      800,
      "linear"
    );
  });

  $("#home a[href*='#']:not([href='#'])").on("click", function(event) {
    // prevent normal link behaviour
    event.preventDefault();

    let target = $(this).attr("href");

    // scroll with animate
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top
      },
      500,
      "linear"
    );
  });

  // Add background color to navbar when scsrooling
  /*var target = $(window);
  var homeSection = $("#targetSection").offset().top;
  target.scroll(function() {
    if (target.scrollTop() > homeSection) {
      $(".navbar").addClass("custom-navbar");
      $(".navbar form a.btn-orange").addClass("btn-white");
      $(".navbar form a.btn-brown").addClass("text-white");
    } else {
      $(".navbar").removeClass("custom-navbar");
      $(".navbar form a.btn-orange").removeClass("btn-white");
      $(".navbar form a.btn-brown").removeClass("text-white");
    }
  });*/

  // Menu Cart Counter
  $("#add").on("click", function() {
    var currentVal = parseInt($(".menu-item-quantity").html(), 10);
    $(".menu-item-quantity").html(currentVal + 1);
  });

  $("#minus").on("click", function() {
    var currentVal = parseInt($(".menu-item-quantity").html(), 10);

    if (currentVal === 0) {
      $(".menu-item-quantity").html(currentVal);
    } else {
      $(".menu-item-quantity").html(currentVal - 1);
    }
  });

  // Remove placeholder when focus
  $("#group_name").on("focus", function() {
    $("#group_name").attr("placeholder", "");
  });

  $("#group_name").on("blur", function() {
    $("#group_name").attr("placeholder", "Name of Group");
  });

  $("#friends").on("focus", function() {
    $("#friends").attr("placeholder", "");
  });

  $("#friends").attr("placeholder", "Invite your friends");

  $("#friends").on("blur", function() {
    $("#friends").attr("placeholder", "Invite your friends");
  });

  // show/hide download app form
  $(".app a").on("click", function() {
    $(".app-download-form").slideToggle();
    $(".rotate").toggleClass("down");
  });

  // Validate form in partners page
  $("#merchant-form").on("submit", function(e) {
    let messages = [];

    let mobileNumber = $("#mobile").val();

    if (mobileNumber.length < 10) {
      messages.push("too short");
    }

    if (!mobileNumber.match(/^[0-9]{10}$/)) {
      messages.push(
        "Please enter a valid phone number without special characters ex: 5555555555"
      );
    }

    // display errors
    if (messages.length > 0) {
      e.preventDefault();
      let result = messages.join(", ");
      $("#error").text(result);
    }
  });

  // remove placeholder when focus
  $("#openingHours").on("focus", function() {
    $(this).val("");
  });

  $("#openingHours").on("blur", function() {
    $(this).val(`Monday - Friday:10am - 8pm
Saturday - Sunday:10am - 10pm`);
  });

  // Validate promote Form
  $("#submitBtn").on("click", function(e) {
    let msgArr = [];

    let openHours = $("#openingHours").val();

    if (openHours === "") {
      msgArr.push("Enter your menu hours");
    }

    // display errors
    if (msgArr.length > 0) {
      e.preventDefault();
      let res = msgArr.join(", ");
      $("#err").text(res);
      $("#err").css("color", "red");
    }
  });

  // getUserData()
  function getUserData() {
    let user = JSON.parse(localStorage.getItem("UserData"));
    return user;
  }

  // login function
  function login() {
    //get values
    let userEmail = $("#email").val();
    let userPass = $("#password").val();

    if (userEmail !== "" && userPass !== "") {
      data = {
        email: userEmail,
        password: userPass
      };
      url = "http://178.63.132.246:8080/api/account";

      $.ajax({
        type: "GET",
        url: url,
        data: data,
        //  beforeSend: function(xhr){
        //     let user = JSON.parse(localStorage.getItem('UserData'));
        //     xhr.setRequestHeader('Authorization', "Bearer" + " " + user.jwtToken);
        //  },
        success: function(response, status) {
          if (response.hasError) {
            //alert("bad request error, see console");
            $(".alert")
              .removeClass("alert-success")
              .addClass("alert-danger")
              .text("Email or Password is wrong!");

            for (let i = 0; i < response.errors.length; i++) {
              //console.log(response.errors[i].description)
            }

            return;
          }

          // store userData to localStorage
          localStorage.setItem("UserData", JSON.stringify(response.data));

          // console.log("SUCCESS");

          if (status === "success") {
            $(".alert")
              .removeClass("alert-danger")
              .addClass("alert-success")
              .text("login done successfully");

            // redirect user to product search
            setInterval(function() {
              window.location.replace("restaurants.html");
            }, 500);
          }
        }
      });
    }
  }

  // check if user login or not
  function isLogged() {
    let user = JSON.parse(localStorage.getItem("UserData"));
    if (user) {
      $("#login").hide();

      // do stuff if user login
      $("#searchBox").on("change", function(e) {
        console.log("This is from User login");
        e.preventDefault();
      });
    } else {
      $("#login").show();

      // do stuff if user not login
      searchForProduct();
    }
  }

  isLogged();

  // register function
  function register() {
    // get values from register form
    const firstName = $("#fname").val();
    const lastName = $("#lname").val();
    const email = $("#email").val();
    const phoneNumber = $("#mobile").val();
    const password = $("#password").val();

    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password
      };

      url = "http://178.63.132.246:8080/api/account";

      $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function(response) {
          if (response.hasError) {
            alert("badrequest error, see console");
            for (var i = 0; i < response.errors.length; i++) {
              console.log(response.errors[i].description);
            }

            return;
          }

          // RESET FORM INPUT
          $("#fname").val("");
          $("#lname").val("");
          $("#email").val("");
          $("#mobile").val("");
          $("#password").val("");

          //console.log(response);
          $(".alert")
            .removeClass("alert-danger")
            .addClass("alert-success")
            .text("Congratulation, registration done successfully");

          setInterval(function() {
            $(".alert").hide();
            window.location.replace("signin.html");
          }, 5000);
        },

        error: function(xhr, status, error) {
          //console.log(xhr, status, error);
        }
      });
    } else {
      $(".alert")
        .removeClass("alert-success")
        .addClass("alert-danger")
        .text("Empty Fields");

      setInterval(function() {
        $(".alert").hide();
      }, 5000);
    }
  }

  // When signin button, login() function invoked
  $("#signin-form").on("submit", function(event) {
    event.preventDefault();
    login();
  });

  //  When signup button, register() function invoked
  $("#signup-form").on("submit", function(e) {
    e.preventDefault();
    register();
  });

  //Input Search For Product
  function searchForProduct() {
    $("#searchBox").on("change", function(event) {
      event.preventDefault();

      // get keyword value
      let keyword = $(this).val();

      // get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;

          let data = {
            keyword: keyword,
            lat: lat,
            lng: lng
          };

          url = "https://178.63.132.246:44300/api/Product/search-product";

          //make ajax GET request
          $.ajax({
            type: "GET",
            url: url,
            data: data,
            success: function(response) {
              console.log(response);
            },
            error: function(err) {
              console.log(err);
            }
          });
        });
      } else {
        alert("Geolocation is not supported by this browser");
      }
    });
  }

  // geocoding function
  function geocoding() {
    let location = $("#searchBox").val();
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: location,
          key: "AIzaSyCnlwozEPLpM58UqIkb2OKfhVEkTP3aGUQ"
        }
      })
      .then(function(response) {
        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;

        getProducts(lat, lng);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});

// add items to cart dynamically

//  grab elements
const addToCartBtn = document.getElementById("addToCart");
const orderCartContainer = document.querySelector(".order-cart-container");
const restName = document.querySelector("h2.r-name");
const restAddress = document.querySelector("p.r-address");
const itemQty = document.querySelector(".menu-item-quantity");
const orderName = document.querySelector(".cart-header-content h2");

const orderSize = document.querySelector(".size");
const orderMilk = document.querySelector(".milk");
const orderPrice = document.querySelector(".menu-item-price");

// add eventListener

// check if element exist
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", function(e) {
    // prevent efault pehaviour of form
    e.preventDefault();

    // get checked value from Size radio buttons
    const radioSizeBtns = document.getElementsByName("size");
    let checkedSizeVal;
    radioSizeBtns.forEach(radioSize => {
      if (radioSize.checked) {
        checkedSizeVal = radioSize.value;
      }
    });

    // get checked value from Milk radio buttons
    const radioMilkBtns = document.getElementsByName("milk");
    let checkedMilkVal;
    radioMilkBtns.forEach(radioMilk => {
      if (radioMilk.checked) {
        checkedMilkVal = radioMilk.value;
      }
    });

    // get checked value from Modification checkbox
    const feauresBtns = document.getElementsByName("options[]");
    let checkedFeatureVal;
    feauresBtns.forEach(feature => {
      if (feature.checked) {
        checkedFeatureVal = feature.value;
      }
    });

    // get checked value from Sugar radio buttons
    const radioSugarBtns = document.getElementsByName("sugar");
    let checkedSugarVal;
    radioSugarBtns.forEach(radioSugar => {
      if (radioSugar.checked) {
        checkedSugarVal = radioSugar.value;
      }
    });

    // Remove cart-empty div
    // const childDiv = document.querySelector(".cart-empty");
    // const parent = childDiv.parentNode;
    // parent.removeChild(childDiv);

    //   /*========================
    //      Create Order-Cart-Hader
    //     ========================
    //   */
    const divHeader = document.createElement("div");
    divHeader.setAttribute("class", "order-card-header p-2");

    // Create Restaurant Name & add value from user selection
    const restNameElm = document.createElement("h5");
    restNameElm.setAttribute("class", "r-name");
    restNameElm.textContent = restName.textContent;

    // Create Restaurant Address & add value from user selection
    const restAddressElm = document.createElement("p");
    restAddressElm.setAttribute("class", "r-address mb-0");
    restAddressElm.textContent = restAddress.textContent;

    //append children to divHeader
    divHeader.appendChild(restNameElm);
    divHeader.appendChild(restAddressElm);

    // append divHeader to orderCartContainer
    orderCartContainer.prepend(divHeader);

    //   /*========================
    //      Create Order-Cart-Body
    //     ========================
    //   **/

    //   Create Order-Cart-Body
    const divBody = document.createElement("div");
    divBody.setAttribute("class", "order-card-body py-2");

    const flexDiv = document.createElement("div");
    flexDiv.setAttribute("class", "d-flex");

    const qtyDiv = document.createElement("div");
    qtyDiv.setAttribute("class", "order-qty p-2");
    qtyDiv.textContent = itemQty.textContent;

    const descDiv = document.createElement("div");
    qtyDiv.setAttribute("class", "order-description p-2");

    const priceDiv = document.createElement("div");
    priceDiv.setAttribute("class", "order-price p-2 flex-grow-1 text-right");
    priceDiv.textContent = "3.5";

    const orderNameElm = document.createElement("span");
    orderNameElm.setAttribute("class", "name");
    orderNameElm.textContent = orderName.textContent;

    const extraOptionsDiv = document.createElement("div");
    extraOptionsDiv.setAttribute("class", "extra-options ml-3");

    //  child of extraOptionsDiv
    const sizeSpan = document.createElement("span");
    sizeSpan.setAttribute("class", "size");
    sizeSpan.textContent = checkedSizeVal;
    sizeSpan.textContent += ",";
    const milkSpan = document.createElement("span");
    milkSpan.setAttribute("class", "milk");
    milkSpan.textContent = checkedMilkVal;
    // add child to extraOptionsDiv
    extraOptionsDiv.appendChild(sizeSpan);
    extraOptionsDiv.appendChild(milkSpan);

    // add child to descDiv
    descDiv.appendChild(orderNameElm);
    descDiv.appendChild(extraOptionsDiv);

    // add child to flexDiv
    flexDiv.appendChild(qtyDiv);
    flexDiv.appendChild(descDiv);
    flexDiv.appendChild(priceDiv);

    // add flexDiv to divContainer
    divBody.prepend(flexDiv);

    const line = document.createElement("hr");
    divBody.appendChild(line);

    //  add divBody to orderCartContainer
    orderCartContainer.appendChild(divBody);

    //   /*===========================
    //      Create Order-Cart-Footer
    //     =========================
    //   */

    //   // create
    const divFooter = document.createElement("div");
    divFooter.setAttribute("class", "order-card-footer");

    //   // create subtotal item
    const subTotalContainer = document.createElement("div");
    subTotalContainer.setAttribute(
      "class",
      "d-flex px-2 justify-content-between"
    );

    const subtTotal = document.createElement("span");
    subtTotal.setAttribute("class", "subtotal");
    subtTotal.textContent = "SUBTOTAL";

    const subtTotalVal = document.createElement("span");
    subtTotalVal.setAttribute("class", "total");
    subtTotalVal.textContent = "$2.22";

    subTotalContainer.appendChild(subtTotal);
    subTotalContainer.appendChild(subtTotalVal);

    divFooter.appendChild(subTotalContainer);

    //   // create subtotal item
    const taxContainer = document.createElement("div");
    taxContainer.setAttribute("class", "d-flex px-2 justify-content-between");

    const tax = document.createElement("span");
    tax.textContent = "TAX";

    const taxVal = document.createElement("span");
    taxVal.setAttribute("class", "item-price");
    taxVal.textContent = "$0.22";

    taxContainer.appendChild(tax);
    taxContainer.appendChild(taxVal);

    divFooter.appendChild(taxContainer);

    //   // create Total item
    const totalContainer = document.createElement("div");
    totalContainer.setAttribute("class", "d-flex px-2 justify-content-between");

    const total = document.createElement("span");
    total.textContent = "TOTAL";
    const totalVal = document.createElement("span");
    totalVal.setAttribute("class", "item-price");
    totalVal.textContent = "$8.50";

    totalContainer.appendChild(total);
    totalContainer.appendChild(totalVal);

    divFooter.appendChild(totalContainer);

    //   // create Rewards item
    const rewardContainer = document.createElement("div");
    rewardContainer.setAttribute(
      "class",
      "d-flex px-2 justify-content-between"
    );

    const reward = document.createElement("span");
    reward.textContent = "REWARD";

    const rewardVal = document.createElement("span");
    rewardVal.setAttribute("class", "item-price");
    rewardVal.textContent = "28pt";

    rewardContainer.appendChild(reward);
    rewardContainer.appendChild(rewardVal);

    divFooter.appendChild(rewardContainer);

    //   // create hideelement
    const smallElem = document.createElement("small");
    smallElem.classList.add("h-details", "d-block", "text-left", "px-2");
    smallElem.textContent = "Hide Details";
    divFooter.appendChild(smallElem);
    orderCartContainer.appendChild(divFooter);

    //   //add place Order button
    const a = document.createElement("a");
    const linkText = document.createTextNode("place order");
    a.appendChild(linkText);
    a.setAttribute("href", "user_profile.html");
    a.setAttribute("role", "button");
    a.classList.add("btn", "btn-blue", "mt-3");
    a.style.textTransform = "capitalize";
    divFooter.appendChild(a);

    //   // add item to parent
    orderCartContainer.appendChild(divFooter);

    console.log(`${restName.textContent}
                ${restAddress.textContent} `);

    console.log(`Size: ${checkedSizeVal}`);
    console.log(`Milk: ${checkedMilkVal}`);
    console.log(`Sugar: ${checkedSugarVal} sugar`);
    console.log(`Extra Options: ${checkedFeatureVal}`);
    console.log(`qty : ${qtyDiv.textContent}`);
  });

  // // create tags input
  const tagContainer = document.querySelector(".tag-container");
  const input = document.querySelector(".tag-container input");

  let tags = [];

  function createTag(label) {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const iClose = document.createElement("i");
    iClose.setAttribute("id", "close");
    iClose.setAttribute("data-item", label);

    div.setAttribute("class", "tag");
    span.innerText = label;
    iClose.setAttribute("class", "fas fa-times");

    div.appendChild(span);
    div.appendChild(iClose);

    return div;
  }

  // reset function
  function reset() {
    document.querySelectorAll(".tag").forEach(function(tag) {
      tag.parentElement.removeChild(tag);
    });
  }

  // // add values to tags array
  function addTags() {
    reset();
    tags
      .slice()
      .reverse()
      .forEach(function(tag) {
        if (tag == "") {
          alert("please ennter value");
        } else {
          const input = createTag(tag);
          tagContainer.prepend(input);
        }
      });
    return tags;
  }

  if (input) {
    input.addEventListener("keyup", function(e) {
      e.preventDefault();

      e.stopPropagation();
      if (e.key === "Enter") {
        tags.push(input.value); // add values to array
        const result = addTags(); // show values on input
        console.log(result.join());
        input.value = ""; // reset input
      }
    });
  }

  // // delete item when click on x close
  document.addEventListener("click", function(e) {
    if (e.target.nodeName === "I") {
      const value = e.target.getAttribute("data-item");
      const index = tags.indexOf(value);
      tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
      console.log(tags);
      addTags();
    }
  });
}
