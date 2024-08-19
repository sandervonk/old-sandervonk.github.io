"use strict";

// detect when the header is stickied
function headerListener() {
  $(document.body).off("scroll resize");
  $(window).on("resize", () => {
    if ($(window).width() > 500) {
      $("header").removeClass("open");
    }
  });
}
headerListener();

// move the scroll sensing into its own listener on document.body that checks all elements with the [fadeonview] attribute
$(".projects-wrapper, body").on("scroll resize", () => {
  if ($(".projects-wrapper" ).scrollTop() || $("body" ).scrollTop() > 0) {
    $("header").addClass("sticky");
  } else {
    $("header").removeClass("sticky");
  }
});

// SEARCH

$("#native-search").click(() => {
  let g_search = `<script async src="https://cse.google.com/cse.js?cx=4122919ed8c6c4889"></script><div class="gcse-search" data-personalizedAds="false" style="padding: 0 !important; height: 60px; width: 177px; box-sizing: border-box; flex-shrink: 0; flex-grow: 0"></div>`;
  $("#g-search").html(g_search);
  $(".toggle-search").toggle();
});

// menu controls on mobile
$("#nav-button").click(() => {
  $("header").toggleClass("open");
});