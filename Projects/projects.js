function dumpResponse() {
  // `this` will refer to the `XMLHTTPRequest` object that executes this function
  let projects = JSON.parse(this.responseText),
    html = `<div id="github-projects">`;
  for (let project of projects) {
    html += `<div class="github-project"><a href="${
      "https://github.com/" + project["full_name"]
    }">${project.name}</div>`;
  }
  html += "</div>";
  console.log(html);
  document.getElementById("github-section").innerHtml = html;
}
var request = new XMLHttpRequest();
// Set the event handler
request.onload = dumpResponse;
// Initialize the request
request.open(
  "get",
  "https://api.github.com/users/sandervonk/repos?per-page=20",
  true
);
// Fire away!
request.send();
