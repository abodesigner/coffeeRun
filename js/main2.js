document.addEventListener("DOMContentLoaded", handleEvents);

function handleEvents(e) {

    function showCookiesAlert() {
        setTimeout(function () {
            $(".cookies-alert").addClass("d-flex justify-content-around");
            $(".cookies-alert").fadeIn(2000);
        }, 2000);
    }


}