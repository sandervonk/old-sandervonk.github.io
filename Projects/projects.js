function dumpResponse() {
  // `this` will refer to the `XMLHTTPRequest` object that executes this function
  let projects = JSON.parse(this.responseText),
    html = `<div id="github-projects"><a href="https://github.com/sandervonk" class="github-label rounded-full bg-purple"><img src="/img/github.svg" id="github-label-img" />Github Projects</a>`;
  for (let project of projects) {
    html += `<a class="github-project rounded-full bg-teal" title="${"https://github.com/" + project["full_name"]}" href="${"https://github.com/" + project["full_name"]}">${project.name}</a>`;
  }
  html += "</div>";
  document.getElementById("github-section-parent").innerHTML = html;
}
var request = new XMLHttpRequest();
// Set the event handler
request.onload = dumpResponse;
// Initialize the request
request.open("get", "https://api.github.com/users/sandervonk/repos?per-page=100&sort=updated&order=desc", true);
// Fire away!
request.send();
$.fn.isInViewport = function () {
  let elementTop = $(this).offset().top;
  let elementBottom = elementTop + $(this).outerHeight();
  let viewportTop = $(window).scrollTop() + 71;
  let viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

function getContrast(hexcolor) {
  return parseInt(hexcolor.replace("#", ""), 16) > 0xffffff / 2 ? "#000000" : "#ffffff";
}
function getContrastAccent(hexcolor) {
  return parseInt(hexcolor.replace("#", ""), 16) > 0xffffff / 2 ? "#add8e680" : "#d7d7d745";
}
// scroll listener to update theme-color meta tag with color of active (w/ jquery)
$(".projects-wrapper").scroll(function () {
  // get in-view child of .projects-wrapper
  let inView = $(
    $(".projects-wrapper")
      .children()
      .filter(function () {
        return $(this).isInViewport();
      })[0]
  );
  // get color of in-view child
  let color = inView.children("div.container").css("background-color");
  color = `#${color
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .slice(1)
    .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
    .join("")}`;
  if ($(".projects-wrapper").scrollTop() == 0) {
    color = "#ffffff";
  }
  // update theme-color meta tag
  $("meta[name=theme-color], meta[name='apple-mobile-web-app-status-bar']").attr("content", color);
  //update #titleBar background color
  $("#titleBar, .sideMenu").css("background-color", color);
  //update #titlebar accent color to have enough contrast
  let contrastingColor = getContrast(color);
  if (contrastingColor == "#000000") {
    $("#invert-title").css("filter", "invert(0)");
  } else {
    $("#invert-title").css("filter", "invert(1)");
  }
  $("body").css("--accent-transparent", getContrastAccent(color));
  $("#titleBar, .sideMenu").css("color", contrastingColor);
  $("#titleBar, .sideMenu").css("border-color", contrastingColor + "4d");
});
