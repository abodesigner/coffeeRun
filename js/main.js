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

// // show app download form using vanilia JS
// let app = document.querySelector(".orders-section .app a");

// // addEventListener
// app.addEventListener("click", runHandler);

// // event Handker function
// function runHandler() {
//   // toggle show/hide app form
//   const appDownloadLink = document.querySelector(".app-download-link");
//   if (appDownloadLink.style.display === "none") {
//     appDownloadLink.style.display = "flex";
//     appDownloadLink.classList.add("toggle-content");
//   } else {
//     appDownloadLink.style.display = "none";
//     appDownloadLink.classList.remove("toggle-content");
//   }
// }
