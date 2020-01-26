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

  // Build dropdown-list based on another one

  $("select#category").on("change", function() {
    var target = $(this)
      .find(":selected")
      .attr("data-target");

    //var id = $(this).attr("id");

    //$("div[id^='"+id+"']").hide();
    //$("#"+id+"-"+target).show();

    console.log(target);
  });

  // Menu Cart
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
});
