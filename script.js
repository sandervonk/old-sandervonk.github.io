function transition() {
    highlightCurrentPage()
    setupSelection()
    if (window.location.href.includes("Contact.html")) {
        setLinks()
    }
    document.querySelector("img[src='../img/SiteName.png']").addEventListener("click", function () {
        window.location.href = "https://sander.vonk.productions"
    })
}
function highlightCurrentPage() {
    window.addEventListener("load", transition)
    pageId = window.location.href.split("?")[0].split("/")[window.location.href.split("/").length - 2]
    pageId = pageId.replace("About", "About_Me")
    if (pageId != "" && pageId != "404") {
        document.getElementById(pageId).style = "background-color: rgba(173, 216, 230, 0.5) !important; transition: background-color 1.5s;"
        document.getElementById(pageId + "2").style = "background-color: rgba(173, 216, 230, 0.5) !important; transition: background-color 1.5s;"
    } else {
        pageId = "Contact"
        document.getElementById(pageId).style = "background-color: rgba(173, 216, 230, 0.5) !important; transition: background-color 1.5s;"
    }
}


function clearSelections() {
    var selections = document.querySelectorAll('[original-content]');
    selections.forEach(function (selection) {
        selection.innerHTML = selection.getAttribute('original-content');
    });
}

function setupSelection() {
    document.body.addEventListener('mousedown', function () {
        if (document.body.classList.contains('selections-enabled')) {
            document.body.classList.remove('selections-enabled');
            clearSelections();
        }
    });
}
function toGit() {
    window.location.href = "https://github.com/sandervonk"
    console.log("toGit called")
}
function toMail() {
    window.location.href = "mailto:sander.c.vonk@gmail.com"
    console.log("toMail called")
}
function setLinks() {
    console.log("settingLinks")
    document.getElementById('git-parent').onclick = toGit
    document.getElementById('mail-parent').onclick = toMail

    const element1 = document.querySelector("#git-parent");
    const element2 = document.querySelector("#mail-parent");

    element1.addEventListener("mouseover", event => {
        element2.style = "transform: translate(-50%, -50%) rotate(-130deg) translate(180px) rotate(130deg);"
    });

    element1.addEventListener("mouseout", event => {
        element2.style.transform = ""
    });
    element2.addEventListener("mouseover", event => {
        element1.style = "transform: translate(-50%, -50%) rotate(-179deg) translate(180px) rotate(179deg);"
    });

    element2.addEventListener("mouseout", event => {
        element1.style.transform = ""
    });


}
//totally not an easter egg
var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
};
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];


var konamiCodePosition = 0;

document.addEventListener('keydown', function (e) {
    var key = allowedKeys[e.keyCode];
    var requiredKey = konamiCode[konamiCodePosition];
    if (key == requiredKey) {
        konamiCodePosition++;
        if (konamiCodePosition == konamiCode.length) {
            activateCheats();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});

function activateCheats() {
    document.body.style.backgroundImage = "url('images/cheatBackground.png')";

    var audio = new Audio('audio/coin.mp3');
    audio.play();

    alert("totally not an easter egg 🙃");
}
//for alt menu
function myFunction(x) {
    x.classList.toggle("change");
}
window.addEventListener("load", transition)
