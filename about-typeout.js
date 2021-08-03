
const carouselText = [
    { text: "Sander", color: "orange" },
    { text: "a coder", color: "green" },
    { text: "an artist", color: "red" },
    { text: "But mostly, I'm just me", color: "black" }
];

$(document).ready(async function () {
    carousel(carouselText, "#feature-text");
});

async function typeSentence(sentence, eleRef, delay = 100) {
    const letters = sentence.split("");
    let i = 0;
    while (i < letters.length) {
        await waitForMs(delay);
        $(eleRef).append(letters[i]);
        i++;
    }
    return;
}

async function deleteSentence(eleRef) {
    const sentence = $(eleRef).html();
    const letters = sentence.split("");
    let i = 0;
    while (letters.length > 0) {
        await waitForMs(100);
        letters.pop();
        $(eleRef).html(letters.join(""));
    }
}

async function carousel(carouselList, eleRef) {
    var i = 0;
    while (true) {
        if (i <= 2) {
            if (i === 1) {
                await waitForMs(100);
                document.getElementById("cursor-main").style.visibility = "hidden";
                document.getElementById("cursor-extra").style.visibility = "visible";
                await waitForMs(100);
                document.getElementById("sentence-extra").innerText = "Hi, ";
                await waitForMs(100);
                document.getElementById("sentence-extra").innerText = "Hi,";
                await waitForMs(100);
                document.getElementById("sentence-extra").innerText = "Hi";
                await waitForMs(100);
                document.getElementById("sentence-extra").innerText = "H";
                await waitForMs(100);
                document.getElementById("sentence-extra").innerText = "";
                await waitForMs(100);
                document.getElementById("cursor-extra").style.visibility = "hidden";
                await waitForMs(100);
                document.getElementById("cursor-main").style.visibility = "visible";
                await waitForMs(100);
            }
            updateFontColor(eleRef, carouselList[i].color);
            await typeSentence(carouselList[i].text, eleRef);
            await waitForMs(1500);
            await deleteSentence(eleRef);
            await waitForMs(500);
            i++;
            if (i >= carouselList.length) {
                i = 0;
            }
        } else {
            document.getElementById("sentence").innerText = "";
            document.getElementById("feature-text").style.color = "black";
            document.getElementById("feature-text").innerText = "I'm";
            await deleteSentence(eleRef);
            await typeSentence(carouselList[i].text, eleRef);
            await waitForMs(1000)
            await deleteSentence(eleRef)
            await typeSentence("Welcome and enjoy!", eleRef);
            break;
        }
    }
}

function updateFontColor(eleRef, color) {
    $(eleRef).css("color", color);
}

function waitForMs(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
