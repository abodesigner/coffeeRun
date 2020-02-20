$(document).ready(function() {
  // get current year @ footer
  $("#year").text(new Date().getFullYear());

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

  // Remove placeholder when press
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
});

// add items to cart
const restName = document.querySelector(".order-content .r-name");
const restAddress = document.querySelector(".order-content .r-address");

const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", function(e) {
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

  console.log(`${restName.textContent} 
               ${restAddress.textContent} `);
  console.log(`Size: ${checkedSizeVal}`);
  console.log(`Milk: ${checkedMilkVal}`);
  console.log(`Sugar: ${checkedSugarVal} sugar`);
  console.log(`${checkedFeatureVal}`);
  e.preventDefault();
});

// create tags input
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

function removeTag() {
  // const items = document.querySelectorAll(".tag span");
  // items.forEach(function(item) {
  //   console.log(item.textContent);
  //   // const index = tags.indexOf();
  //   // let newArr = tags.splice(index, 1);
  //   // console.log(index);
}

// add values to tags array
function addTags() {
  reset();
  tags
    .slice()
    .reverse()
    .forEach(function(tag) {
      const input = createTag(tag);
      tagContainer.prepend(input);
    });
  console.log(tags);
}

input.addEventListener("keyup", function(e) {
  if (e.key === "Enter") {
    tags.push(input.value); // add values to array
    addTags(); // show values on input
    input.value = ""; // reset input
  }
});

// delete item when click on x close
document.addEventListener("click", function(e) {
  if (e.target.nodeName === "I") {
    const value = e.target.getAttribute("data-item");
    const index = tags.indexOf(value);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    console.log(tags);
    addTags();
  }
});
