function dumpResponse() {
  // `this` will refer to the `XMLHTTPRequest` object that executes this function
  let projects = JSON.parse(this.responseText),
    html = `<div id="github-projects"><a href="https://github.com/sandervonk" class="github-label rounded-full bg-purple"><img src="/img/github.svg" id="github-label-img" />Github Projects</a>`;
  for (let project of projects) {
    html += `<a class="github-project rounded-full bg-teal" title="${"https://github.com/" + project["full_name"]}" href="${"https://github.com/" + project["full_name"]}">${project.name}</a>`;
  }
  html += "</div>";
  document.getElementById("github-section-parent").innerHTML = html;
  console.log(html);
}
var request = new XMLHttpRequest();
// Set the event handler
request.onload = dumpResponse;
// Initialize the request
request.open("get", "https://api.github.com/users/sandervonk/repos?per-page=100&sort=updated&order=desc", true);
// Fire away!
request.send();
