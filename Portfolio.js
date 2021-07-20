
//assign projects list and their info here. To add multiple descriptions, just seperate them with the string " | " or "[NEWLINE] (in progress), everything is done automatically!!
/*template:
,
        {
            "title": "title",
            "image": "image.png",
            "description": "description"
        }
*/
/*
async function loadFile(url) {
  try {
    const response = await fetch(url);
    const data = await response.text();
    //console.log(Array.from(JSON.parse(data)))
    return Array.from(JSON.parse(data))
  } catch (err) {
    console.error(err);
  }
}

var projects = loadFile("Projects.json")
*/

var multiplyWireframe = false
function removeCompare() {
  document.getElementsByClassName("img-comp-container")[0].remove()
  for (button of document.getElementsByTagName("button")) {
    button.remove()
  }
  document.getElementById("clean-button").remove()
}
var projects = ""
$.ajax({
  url: 'Projects.json',
  dataType: "text",
  success: function (response) {
    projects = response
    projects = JSON.parse(projects)
    console.warn(projects)
    setupPage()
  },
  error: function (err) {
    console.error("error: could not load projects.json :(")
    //console.log(err)
  }
});
var slideIndex = 1;
var sketchIndex = 1;
//isnewFromLocal
function setupPage() {
  if (window.location.href.includes(`?portfolio-`)) {
    setTimeout(createLightbox, 200);
    setTimeout(showSlides, 210);
    setTimeout(showSketch, 210);
  }
  setTimeout(createProjects, 100)
  //setTimeout(updateFiller, 200)
  //window.onresize = updateFiller

}
var onclickFunction = function (name, fn, href3) {
  return (new Function("return function (call) { return function " + name +
    ` () {  window.location.href = "${href3}"  }; };`)())(Function.apply.bind(fn));
};


const isMultiple = num => {
  const byThree = parseInt(num / 3);
  const byFour = parseInt(num / 4);
  if (num === byThree * 3 && num === byFour * 4) {
    return true
  } else { return false }
};
function resetCompare() {
  lastclicked = [88, 88]
  compare([88, 88])
  multiplyWireframe = false
  document.getElementById("overlay-button").classList = "";
  document.getElementsByClassName("img-comp-overlay")[0].children[0].style["mix-blend-mode"] = "unset"
}
function toggleWireframe() {
  if (document.getElementById("overlay-button").classList[0] === "active") {
    document.getElementById("overlay-button").classList = "";
    multiplyWireframe = false
    compare(lastclicked)
  } else {
    document.getElementById("overlay-button").classList = "active"
    multiplyWireframe = true
    compare(lastclicked)
  }
}
function createProjects() {

  for (project of projects) {
    var title = project["title"]
    var image = project["image"].split(".")[0] + "512." + project["image"].split(".")[1]
    var elementForAdd = `<div class="flex-item" id="portfolio-${title.replace(/[^a-z0-9]/gmi, "-")}" style="background-image: url(projects/${image})"><div><div class="bottomText">${title}</div></div></div>`
    document.getElementsByClassName('flex-container')[0].innerHTML += elementForAdd

  }
  if (!isMultiple(projects.length)) {
    //console.log("unspreadable num of projects, adding element")
    document.getElementsByClassName('flex-container')[0].innerHTML += `<div class="flex-item" id="portfolio-filler" style="background-image: url(img/Artstation.png)"> </div>`
    document.getElementById('portfolio-filler').onclick = toArtstation
  }
  for (project2 of projects) {
    var title2 = project2["title"]
    var href2 = `?portfolio-${title2.replace(/[^a-z0-9]/gmi, "-")}`
    var genFunc = function name() { };
    genFunc = onclickFunction(`${title2.replace(/[^a-z0-9]/gmi, "")}`, genFunc, href2)
    document.getElementById(`portfolio-${title2.replace(/[^a-z0-9]/gmi, "-")}`).onclick = genFunc
  }
  /*

  */
}

function disableScroll() {
  var sheet = window.document.styleSheets[0];
  sheet.insertRule('body {overflow-y: hidden !important;overflow-x: hidden !important;}', sheet.cssRules.length);
  sheet.insertRule(`::-webkit-scrollbar {width: 0 !important; height: 0 !important; display: none !important; }`, sheet.cssRules.length);


}
function toArtstation() {
  window.location.href = "https://sandercvonk.artstation.com"
}
function createLightbox() {
  disableScroll()
  document.getElementsByClassName('lightbox overlay')[0].style = "display: unset !important;"
  document.getElementsByClassName('lightbox-project')[0].style = "display: unset !important;"
  const element = document.getElementById(window.location.href.split(".html?")[1])
  featureImg = element.style['background-image'].replace('512', '')
  bottomText = element.children[0].children[0].textContent
  var description = ""



  //setup title and slideshow
  for (line of projects) {
    if (line["title"] == bottomText) {
      description = line["description"]
      //add slideshow dots
      //only add slideshow if needed
      if (line["slideshow"] != undefined) {
        dotParent = document.getElementById("slideDots")
        for (var i = 1; i < line["slideshow"].length + 1; i++) {
          dotParent.innerHTML += `<span class="dot" onclick="currentSlide(${i})"></span>`

        }
        var slideImgHTML = ``
        for (slideImg of line["slideshow"]) {
          var index = line["slideshow"].indexOf(slideImg)
          caption = ""
          if (typeof (slideImg) == "object") {
            caption = slideImg[1]
            slideImg = slideImg[0]
          }
          if (slideImg.includes(".png") || slideImg.includes(".jpg") || slideImg.includes(".webp") || slideImg.includes(".gif")) {
            slideImgHTML += `<div class="fade mySlides"><div class=numbertext>${index + 1} / ${line["slideshow"].length}</div><div style="background-image: url(${slideImg}) !important; width: 100%"></div><div class=text>${caption}</div></div>`
          } else {
            fileExtention = slideImg.split('.')[slideImg.split('.').length - 1]
            //console.log(`treating slide element as video of extention: ${fileExtention}`)
            //console.log(projects.indexOf(line["slideshow"]))
            slideImgHTML += `<div class="fade mySlides"><div class=numbertext>${index + 1} / ${line["slideshow"].length}</div><video autoplay loop controls disableVolume disablePictureInPicture controlsList="nodownload" width=100%><source src="${slideImg}" type="video/${fileExtention}">Sorry, your browser doesn't support embedded videos.</video><div class=text>${caption}</div></div>`
          }

        }
        document.getElementsByClassName("slideshow-container")[0].innerHTML = slideImgHTML + document.getElementsByClassName("slideshow-container")[0].innerHTML
      } else {
        document.getElementsByClassName("slideshow-container")[0].remove()
        document.getElementById("slideDots").remove()
      }
      if (line["slideshow"] === undefined || line["slideshow"].length < 2) {
        document.getElementsByClassName("img-comp-container")[0].remove()
        for (button of document.getElementsByTagName("button")) {
          button.remove()
        }
        document.getElementById("clean-button").remove()
      }
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
    //console.log("starting split process")
    for (const descriptionPart of description.split(splitString)) {
      //console.log("looping through element:")
      ////console.log(descriptionPart)
      if (descriptionPart != description.split(splitString)[0]) {
        //console.warn("Is NOT first part")
        //console.log("setting this element to this:")
        var lightboxDescriptionElement = `<div class="lightbox-description">${descriptionPart}</div>`
        document.getElementsByClassName('lightbox-description')[0].parentElement.innerHTML += lightboxDescriptionElement
        //console.log([document.getElementsByClassName('lightbox-description')[document.getElementsByClassName('lightbox-description').length - 1], `${descriptionPart}`])
      } else {
        //console.warn("Is first part")
        //console.log("setting this element to this:")
        //console.log([document.getElementsByClassName('lightbox-description')[0], descriptionPart])
        document.getElementsByClassName('lightbox-description')[0].textContent = descriptionPart

      }

    }

  }
  //console.log("found split ?")
  //console.log(foundSplit)
  if (!foundSplit) {
    var sheet = window.document.styleSheets[0];
    sheet.insertRule(`.lightbox-description {text-align: justify !important;}`);
  }
  for (line of projects) {
    if (line["title"] == bottomText) {
      document.getElementsByClassName("lightbox-project")[0].innerHTML += `<div class=sketchshow-container><a class=prev onclick=plusSketch(-1)>❮</a> <a class=next onclick=plusSketch(1)>❯</a></div><div id=sketchDots style=text-align:center></div>`
      //add slideshow dots
      //only add 'skech'show if needed
      if (line["sketchfab"] != undefined) {

        dotParent = document.getElementById("sketchDots")
        for (var i = 1; i < line["sketchfab"].length + 1; i++) {
          dotParent.innerHTML += `<span class="sketchDot" onclick="currentSketch(${i})"></span>`
        }
        var sketchHTML = ``
        for (sketch of line["sketchfab"]) {
          var index = line["sketchfab"].indexOf(sketch)
          caption = ""
          if (typeof (sketch) == "object") {
            caption = sketch[1]
            sketch = sketch[0]
          }
          //slideImgHTML += `<div class="fade mySketches"><div class=numbertext>${index + 1} / ${line["sketchfab"].length}</div><div style="background-image: url(${sketch}) !important; width: 100%"></div><div class=text>${caption}</div></div>`
          sketchHTML += `<div class="fade mySketches"><div class=numbertext>${index + 1} / ${line["sketchfab"].length}</div><iframe class="" width="640" height="360" src="https://sketchfab.com/models/${sketch}/embed?autostart=1;" frameborder="0" allow="autoplay; fullscreen;" allowvr="" mozallowfullscreen="true" webkitallowfullscreen="true" style="width: 100%;"></iframe><div class=text>${caption}</div></div>`


        }
        if (line["sketchfab"].length === 1) {
          document.getElementsByClassName("lightbox-project")[0].classList += " oneSketch"
        }
        document.getElementsByClassName("sketchshow-container")[0].innerHTML = sketchHTML + document.getElementsByClassName("sketchshow-container")[0].innerHTML
      } else {
        document.getElementsByClassName("sketchshow-container")[0].remove()
        document.getElementById("sketchDots").remove()
        //console.log("no sketchfab projects, removed 'sketchshow' elements")

      }

    }

  }
  //add attribution
  document.getElementsByClassName("lightbox-project")[0].innerHTML += `<div id=attribution style=font-size:12pt;font-family:Montserrat;color:#aaa>Copyright © 2020-2021 Sander Vonk; CC BY-NC-ND 4.0 <img src=https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Cc_by-nc-nd_euro_icon.svg/1280px-Cc_by-nc-nd_euro_icon.svg.png style=position:absolute;height:20px;margin-left:10px;margin-top:2.5px></div>`
}




function compare([first, last]) {
  if (first != 88) {
    firstImg = document.getElementsByClassName("slideshow-container")[0].children[first - 1].children[1].style["background-image"].replace(`url("`, "").replace(`")`, "")
  }
  if (last != 88) {
    lastImg = document.getElementsByClassName("slideshow-container")[0].children[last - 1].children[1].style["background-image"].replace(`url("`, "").replace(`")`, "")
  }
  //console.log([firstImg, lastImg])
  if (first === 88) {
    firstImg = "img/Compare1.png"
  }
  if (last === 88) {
    lastImg = "img/Compare2.png"
  }
  document.getElementsByClassName("img-comp-img")[0].children[0].src = firstImg
  document.getElementsByClassName("img-comp-img")[1].children[0].src = lastImg
  if (multiplyWireframe && lastImg.includes("Wire")) {
    document.getElementsByClassName("img-comp-overlay")[0].children[0].style["mix-blend-mode"] = "multiply"
  } else {
    document.getElementsByClassName("img-comp-overlay")[0].children[0].style["mix-blend-mode"] = "unset"
  }


}
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}
var lastclicked = [1, 88]
// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
  lastclicked = [lastclicked[1], n]
  compare(lastclicked)
}
function plusSketch(n) {
  showSketch(sketchIndex += n);
}

// Thumbnail image controls
function currentSketch(n) {
  showSketch(sketchIndex = n);
}


function showSlides(n) {
  if (arguments.length != 1) { n = 1 }
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  try {
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  } catch { }
}
function showSketch(n) {
  if (arguments.length != 1) { n = 1 }
  var i;
  var sketches = document.getElementsByClassName("mySketches");
  var dots = document.getElementsByClassName("sketchDot");
  //console.warn("running showSketch on group:")
  //console.log(sketches)
  if (n > sketches.length) { sketchIndex = 1 }
  if (n < 1) { sketchIndex = sketches.length }
  for (i = 0; i < sketches.length; i++) {
    sketches[i].style.display = "none";
    //console.log(["hid sketch num, content", i, sketches[i]])
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  try {
    sketches[sketchIndex - 1].style.display = "block";
    dots[sketchIndex - 1].className += " active";
  } catch { }
  //commit: comment above
}


