window.addEventListener("load", function () {
    document.getElementsByClassName("about-nav-sections")[0].id = "rotate"
    sections = document.getElementsByClassName("about-nav-sections")[0].children
    sections[0].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate5"
        //document.getElementsByClassName("about-section-text").innerText =
        //document.getElementsByClassName("about-section-title").innerText = 
    })
    sections[1].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate4"
    })
    sections[2].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate3"
    })
    sections[3].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate2"
    })
    sections[4].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate1"
    })

})

const section_data = JSON.parse(`{
    "about-intro": {
        "title": "",
        "text": ""
    },
    "about-coding": {
        "title": "",
        "text": ""
    },
    "about-life": {
        "title": "",
        "text": ""
    },
    "about-3D": {
        "title": "",
        "text": ""
    },
    "about-why": {
        "title": "",
        "text": ""
    }
}`)
