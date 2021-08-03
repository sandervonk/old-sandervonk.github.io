window.addEventListener("load", function () {
    sections = document.getElementsByClassName("about-nav-sections")[0].children
    document.getElementById("js-section-rotate1")
    sections[0].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate1"
    })
    sections[1].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate2"
    })
    sections[2].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate3"
    })
    sections[3].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate4"
    })
    sections[4].addEventListener("click", function () {
        document.getElementsByClassName("about-nav-sections")[0].className = "about-nav-sections rotate5"
    })
})