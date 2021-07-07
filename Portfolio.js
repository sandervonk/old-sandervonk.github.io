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
        { "title": "Aeries Overview Art <br> Project Page", "image": "AeriesOverview.png" }
    ]`
projects = JSON.parse(projects)
console.log(`projects:`)
console.log(projects)
function createProjects() {
    for (project of projects) {
        var title = project["title"]
        var image = project["image"]
        var elementForAdd = `<div class="flex-item" style="background-image: url(projects/${image})"><div><div class="bottomText">${title}</div></div></div>`
        console.log("created element: ")
        console.log(elementForAdd)
        document.getElementsByClassName('flex-container')[0].innerHTML += elementForAdd
    }
}
setTimeout(createProjects, 100)
