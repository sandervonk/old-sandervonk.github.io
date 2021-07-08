
//assign projects list and their info here. To add multiple descriptions, just seperate them with the string " | " or "[NEWLINE] (in progress), everything is done automatically!!
var projects = `[
        {
          "title": "Eve from WALL-E",
          "image": "Eve.jpg",
          "description": "Though this project orignally started as a way for me to practice Sci-Fi and animated movie styles, it ended up being really good practice for natural looking animations. Eve's mix of robotic and smooth animations presented for a unique challenge"
        },
        {
          "title": "Low-Poly Aircraft Carrier",
          "image": "Carrier.png",
          "description": "Modeled with the goal of a low triangle count, this project really helped me improve my low-poly modelling skills. It also served as a very helpful introduction into map making, especially with player navigation in mind. Though certainly not made with graphical beauty in mind, this map certainly holds its own. It also uses a palette to reach its' miniscule file size.[NEWLINE]The bottom deck features assets of many different types. When looking over the timelapse I took of modelling this project, I realized just how many assets I had to delete because of their high poly counts. Barrels and spherical objects were some of the biggest culprits"
        },
        {
          "title": "Low-Poly Lighthouse",
          "image": "Lighthouse.png",
          "description": "Though the main aim of this project was to get more practice with low-poly enviroments, it also served as a very helpful segway into a sort of, for lack of a better word, multi-media, type of rendering, a mix of many styles and techniques.[NEWLINE]This project also provided me with lots of helpful practice using hype-realistic rendering on non-realistic scenes. In this render specifically, I used a volumetric for the beam of the lighthouse, something that, though actually low-poly itself, provides some extra depth to the scne, different from the harsh lines on the rest of the landscape"
        },
        {
          "title": "Pixel 4a Concept",
          "image": "Pixel4a.png",
          "description": "One of my favorite projects to date, the Pixel 4a concept, a set of about 10-15 individual renders based on what was at the time my idea of what the Google Pixel 4a should look like. Along the way, I learned to reproduce a lot of the styles used in the publicized material for the former Pixel 4 & Pixel 4 XL.[NEWLINE]This taught me a lot about product advertisement, something that I haven't used yet, but fun nevertheless! I was especially intrigued by the smooth animations used, something that took me awhile to get down, but later allowed me to create a bunch of (looping!) ad renders for my concept"
        },
        {
          "title": "Vinyl Record Player",
          "image": "RecordPlayer.png",
          "description": "Perhaps one of the less fine-tuned projects I've worked on, this model mainly served as practice with image texturing and product design. I worked off of promo art for a small kickstarter retro-modern vinyl record player called the TT8.[NEWLINE]If you look closely at the corners, you can actually see some of the spots where the UV was all mapped to one point because of weirdly-placed bevel modifiers"
        },
        {
          "title": "Snoopy in Cell-Shaded 3D",
          "image": "Snoopy.png",
          "description": "Ranking high among my favorite ever projects, making these models was a joy, especially when I switched over from a solid clay-like preview to a realtime renderer, which showed me the true cell-shaded nature of the models.[NEWLINE]Though this is still very much a work in progress, I love the direction in which its' going, and really appreciate the experience I've learned with cartoon styles in 3D modelling softwares and renderers"
        },
        {
          "title": "Nintendo Switch Promo Art",
          "image": "Switch.png",
          "description": "Yet another product remake, modelling the Nintendo Switch really helped me learn how to detail efficiently. Though I wont pretend that it took any small amount of time, working off of just 3 different angles of the product, I think I was able to pull off the general design pretty well![NEWLINE]For this project, I also remade most of the promotional material I could find, along with a couple poses/enviroments of my own creation"
        },
        {
          "title": "Xbox Promo Art Remake",
          "image": "Xbox.png",
          "description": "This peice was mainly done as a challenge to myself to see how well I could recreate a professional product render. Given that I had no real-life counterpart and nothing but some vauge promotional materials to work off of, I really like the way this turned out. The creases coming from the corners are very visible, something I struggled to get less apparent. Though this model creates more of a V from the corners to the middle, it still represents the model pretty well imo.[NEWLINE]Though I tend to forget it myself, this model is actually only the top part of the xbox, under there it's just a flat bottom, no detailing, which definitely made modelling it easier"
        },
        {
          "title": "Minimalistic Windows 10 Wallpaper",
          "image": "Windows.png",
          "description": "This idea came to me when I was working with small windows and was looking at my background a lot. I wondered just how hard it would be to make a minimalistic version of the widely-known Windows 10 wallpaper.[NEWLINE]Though I have to admit I had it a lot easier than those trying to take the pictures in real life, I'm still proud of this idea, and love the way it turned out"
        },
        {
          "title": "Windmill Landscape Art",
          "image": "Landscape.png",
          "description": "Originally meant as a small birthday present for my father, modelling this landscape was tedious, but undoubtedly fun. I enjoyed creating the mountains in the back most, though I meant for the 'grass' and the windmill itself to be the main feature peice of this render. This render also helped me become more accustomed to do hyper-realistic renders of low-poly scenes. I also mixed in some higher-poly features, namely the water in the pond"
        },
        {
          "title": "Aeries Login Art Prototype",
          "image": "AeriesLogin.png",
          "description": "Though this peice orginally started as a simple 2D promotional image I made for my Simplify Aeries extension (and for fun!!), this peice attempts to be abstract while also including real site and extension elements. Note specifically the Login Page elements and the extension logo"
        },
        {
          "title": "Aeries Overview Art Project Page",
          "image": "AeriesOverview.png",
          "description": "A continuation of the Login Page art, this graphic was used on the 'Project' page of this site as the background, to mimic the style of the actual Aeries.com graphics. I took some design ideas from them, and tried to keep it fairly abstract. My main change was the elements protruding from the phoen display, which are made to more accurately reflect the real interface, or at least my vision for it"
        }
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
    var sheet = window.document.styleSheets[0];
    sheet.insertRule('body {overflow-y: hidden !important;overflow-x: hidden !important;}', sheet.cssRules.length);
    sheet.insertRule(`::-webkit-scrollbar {width: 0 !important; height: 0 !important; display: none !important; }`, sheet.cssRules.length);


}
function createLightbox() {
    disableScroll()
    document.getElementsByClassName('lightbox overlay')[0].style = "display: unset !important;"
    const element = document.getElementById(window.location.href.split(".html?")[1])
    featureImg = element.style['background-image'].replace('512', '')
    bottomText = element.children[0].children[0].textContent
    var description = ""
    for (line of projects) {
        if (line["title"] == bottomText) {
            description = line["description"]
        }
    }
    document.getElementById('lightbox-overlay').onclick = function toPortfolio() {
        window.location.href = "Portfolio.html"
    }
    document.getElementsByClassName('topImg')[0].style["background"] = featureImg
    document.getElementsByClassName('topImg')[0].innerHTML = bottomText
    document.getElementsByClassName('lightbox-description')[0].innerHTML = description
    var foundSplit = false
    splitStrings = [" | ", "[NEWLINE]"]
    for (splitString of splitStrings) { }
    if (description.split(splitString).length > 1) {
        foundSplit = true
        console.log("starting split process")
        for (const descriptionPart of description.split(splitString)) {
            console.log("looping through element:")
            console.log(descriptionPart)
            if (descriptionPart != description.split(splitString)[0]) {
                console.log("is NOT first part")
                var lightboxDescriptionElement = `<div class="lightbox-description">${descriptionPart}</div>`
                document.getElementsByClassName('lightbox-description')[0].parentElement.innerHTML += lightboxDescriptionElement
            } else {
                console.log("IS first part")
                console.log("setting this element to this:")
                console.log([document.getElementsByClassName('lightbox-description')[0], descriptionPart])
                document.getElementsByClassName('lightbox-description')[0].textContent = descriptionPart

            }

        }
    }
    console.log("found split ?")
    console.log(foundSplit)
    if (!foundSplit) {
        var sheet = window.document.styleSheets[0];
        sheet.insertRule(`.lightbox-description {text-align: justify !important;}`);
    }
}
if (window.location.href.includes(`?portfolio-`)) { setTimeout(createLightbox, 200) }
setTimeout(createProjects, 100)


