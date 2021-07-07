function transition() {
    document.getElementById('menu').className = "menuTransition"
    console.log(`ran function 'transition'`)
    highlightCurrentPage()
    setupSelection()
    if (window.location.href.includes("Contact.html")) {
        setLinks()
    }
}
function highlightCurrentPage() {
    pageId = window.location.href.split("/")[window.location.href.split("/").length - 1].substring(0, window.location.href.split("/")[window.location.href.split("/").length - 1].length - 5)
    document.getElementById(pageId).style = "background-color: rgba(173, 216, 230, 0.5); transition: background-color 1.5s;"
}
window.onload = transition





//for selection manipulation
var selectionElements = document.querySelectorAll('.selection');
selectionElements.forEach(function (element) {
    element.setAttribute('original-content', element.innerHTML);  // this will be needed to reset to original after a selection has been made
    element.addEventListener('mouseup', function () {
        replaceContentWithSelectionWrapper(this)
    });
});

function replaceContentWithSelectionWrapper(element) {
    let selection = window.getSelection().toString();
    if (selection.length <= 0) { // if selection length is not bigger then 0 we can stop right here
        return;
    }
    // next lines should be self explanatory
    // get start of string until selection
    // get the end of string after selection
    // concatenate all strings back together
    let selObj = window.getSelection();
    let selRange = selObj.getRangeAt(0);
    let originalString = element.innerHTML;
    let start = originalString.substr(0, selRange.startOffset);
    let end = originalString.substr(selRange.endOffset);
    element.innerHTML = start + '<span class="mark-special-selected">' + selection + '</span>' + end;
    document.body.classList.add('selections-enabled');
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

