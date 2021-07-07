var projects =
    `[
        { "title": "Eve from WALL-E", "image": "Eve.jpg" },
        { "title": "Low-Poly Aircraft Carrier", "image": "Carrier.png" },
        { "title": "Low-Poly Lighthouse", "image": "Lighthouse.png" },
        { "title": "Pixel 4a Concept", "image": "Pixel4a.png" },
        { "title": "Vinyl Record Player", "image": "RecordPlayer.png" },
        { "title": "Snoopy in Cell-Shaded 3D", "image": "Snoopy.png" },
        { "title": "Nintendo Switch Promo Art", "image": "Switch.png" },
        { "title": "Xbox Promo Art Remake", "image": "Xbox.png" },
        { "title": "Minimalistic Windows 10 Wallpaper", "image": "Windows.png" },
        { "title": "Windmill Landscape Art", "image": "Landscape.png" },
        { "title": "Aeries Login Art Prototype", "image": "AeriesLogin.png" },
        { "title": "Aeries Overview Art Project Page", "image": "AeriesOverview.png" }
    ]`
var onclickFunction = function (name, fn, href3) {
    return (new Function("return function (call) { return function " + name +
        ` () {  window.location.href = "${href3}"  }; };`)())(Function.apply.bind(fn));
};
projects = JSON.parse(projects)
console.log(`projects:`)
console.log(projects)
function createProjects() {
    for (project of projects) {
        var title = project["title"]
        var image = project["image"].split(".")[0] + "512." + project["image"].split(".")[1]
        var elementForAdd = `<div class="flex-item" id="portfolio-${title.replace(/[^a-z0-9]/gmi, "-")}" style="background-image: url(projects/${image})"><div><div class="bottomText">${title}</div></div></div>`
        document.getElementsByClassName('flex-container')[0].innerHTML += elementForAdd

    }
    for (project2 of projects) {
        var title2 = project2["title"]
        var href2 = `?portfolio-${title2.replace(/[^a-z0-9]/gmi, "-")}`
        var genFunc = function name() { };
        genFunc = onclickFunction(`${title2.replace(/[^a-z0-9]/gmi, "")}`, genFunc, href2)
        document.getElementById(`portfolio-${title2.replace(/[^a-z0-9]/gmi, "-")}`).onclick = genFunc
    }

}

function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
function createLightbox() {
    disableScroll()
    document.getElementsByClassName('lightbox')[0].style = "display: unset !important;"
    const element = document.getElementById(window.location.href.split(".html?")[1])
    featureImg = element.style['background-image'].replace('512', '')
    bottomText = element.children[0].children[0].textContent
    document.getElementsByClassName('lightbox')[0].onclick = function toPortfolio() {
        window.location.href = "Portfolio.html"
    }
    document.getElementsByClassName('topImg')[0].style["background"] = featureImg
    document.getElementsByClassName('topImg')[0].innerHTML = bottomText
}
if (window.location.href.includes(`?portfolio-`)) { setTimeout(createLightbox, 200) }
setTimeout(createProjects, 100)


