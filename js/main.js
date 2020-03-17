$(document).ready(function() {
  // initialize all tooltips on a page
  $('[data-toggle="tooltip"]').tooltip();

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
  $("#merchant-form").on("submit", function(e){

    let messages = [];
    
    let mobileNumber = $("#mobile").val();

    if ( mobileNumber.length < 10 ) {
      messages.push("too short");
    }  
    
    if( !(mobileNumber.match(/^[0-9]{10}$/)) ){
      messages.push("Please enter a valid phone number without special characters ex: 5555555555");
    }

    

    // display errors
    if( messages.length > 0){
      e.preventDefault();
      let result = messages.join(', ');
      $("#error").text(result);
      
    }
    
  });



  // remove placeholder when focus
  $("#openingHours").on("focus", function(){

    $(this).val("")

  });

  $("#openingHours").on("blur", function(){

    $(this).val(`Monday - Friday:10am - 8pm
Saturday - Sunday:10am - 10pm`);

  });

  // Validate promote Form
   $("#submitBtn").on("click", function(e){
    
    let msgArr = [];

    let openHours = $("#openingHours").val();

    if( openHours === ""){
      msgArr.push("Enter your menu hours");
    } 

    // display errors
    if( msgArr.length > 0){
      e.preventDefault();
      let res = msgArr.join(', ');
      $("#err").text(res);
      $("#err").css("color", "red");
      
    }
    
      
  });








  


});

// add items to cart dynamically

//  grab elements
 const addToCartBtn = document.getElementById("#addToCart");
 const orderCartContainer = document.querySelector(".order-cart-container");
 const restName    = document.querySelector("h2.r-name");
 const restAddress = document.querySelector("p.r-address");
 const itemQty     = document.querySelector(".menu-item-quantity");
 const orderName   = document.querySelector(".cart-header-content h2");

 const orderSize  = document.querySelector(".size");
 const orderMilk  = document.querySelector(".milk");
 const orderPrice = document.querySelector(".order-price");

// add eventListener

// check if element exist
if(addToCartBtn){
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
  const childDiv = document.querySelector(".cart-empty");
  const parent = childDiv.parentNode;
  parent.removeChild(childDiv);

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
//   */

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
   priceDiv.textContent = orderPrice.textContent;

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
  rewardContainer.setAttribute("class", "d-flex px-2 justify-content-between");

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

// // reset function
function reset() {
  document.querySelectorAll(".tag").forEach(function(tag) {
    tag.parentElement.removeChild(tag);
  });
}

// function removeTag() {
//   // const items = document.querySelectorAll(".tag span");
//   // items.forEach(function(item) {
//   //   console.log(item.textContent);
//   //   // const index = tags.indexOf();
//   //   // let newArr = tags.splice(index, 1);
//   //   // console.log(index);
// }

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

input.addEventListener("keyup", function(e) {
  e.stopPropagation();
  if (e.key === "Enter") {
    tags.push(input.value); // add values to array
    const result = addTags(); // show values on input
    console.log(result.join());
    input.value = ""; // reset input
  }
});

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