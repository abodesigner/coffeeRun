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
  var target = $(window);
  target.scroll(function() {
    if (target.scrollTop() >= 150) {
      $(".navbar").addClass("custom-navbar");
    } else {
      $(".navbar").removeClass("custom-navbar");
    }
  });
});
