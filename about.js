const section_data = JSON.parse(`{
    "about-intro": {
        "title": "Introduction",
        "text": "Welcome! As you may have noticed so far, this is my site! Working on it has been a ongoing project for a couple months now, though my time/effort was by no means distributed equally among all the pages. "
    },
    "about-coding": {
        "title": "Coding",
        "text": ""
    },
    "about-life": {
        "title": "My Life",
        "text": ""
    },
    "about-3D": {
        "title": "3D & Blender",
        "text": ""
    },
    "about-why": {
        "title": "Why: this site and more",
        "text": ""
    }
}`)
function setSection(sectionNum) {
    let sections = document.getElementsByClassName("about-nav-sections")[0].children
    document.getElementsByClassName("section-text")[0].innerHTML = section_data[sections[sectionNum].id].text
    document.getElementsByClassName("about-section-title")[0].innerHTML = section_data[sections[sectionNum].id].title
}

window.addEventListener("load", function () {
    document.getElementsByClassName("about-nav-sections")[0].id = "rotate"
    let sections = document.getElementsByClassName("about-nav-sections")[0].children
    sections[0].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate5"
        setSection(0)
    })
    sections[1].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate4"
        setSection(1)
    })
    sections[2].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate3"
        setSection(2)
    })
    sections[3].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate2"
        setSection(3)
    })
    sections[4].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate1"
        setSection(4)
    })

})

