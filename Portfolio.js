
//assign projects list and their info here. To add multiple descriptions, just seperate them with the string " | " or "[NEWLINE] (in progress), everything is done automatically!!
/*template:
,
        {
            "title": "title",
            "image": "image.png",
            "description": "description[NEWLINE]description part 2"
            "slideshow": [
              ["path/to.img", "caption"],
              ["path/to/other.img", "caption"]
            ]
            "sketchfab": [
              ["model id for embed", "caption"]
            ]
        }
*/

//setup some needed variables
var multiplyWireframe = false
var screenOverlay = false
var slideIndex = 1;
var sketchIndex = 1;
function toPortfolio() {
  window.location.href = "Portfolio.html"
  console.log("ran toPortfolio")
}

//function that disables the scroll when the lightbox shows
function disableScroll() {
  var sheet = window.document.styleSheets[0];
  sheet.insertRule('body {overflow-y: hidden !important;overflow-x: hidden !important;}', sheet.cssRules.length);
  sheet.insertRule(`::-webkit-scrollbar {width: 0 !important; height: 0 !important; display: none !important; }`, sheet.cssRules.length);
}

//variable used to create functions for onclick, see createProjects() below
var onclickFunction = function (name, fn, href3) {
  return (new Function("return function (call) { return function " + name +
    ` () {  window.location.href = "${href3}"  }; };`)())(Function.apply.bind(fn));
};

//quick function to avoid using an href for the filler link
function toArtstation() {
  window.location.href = "https://artstation.com"
}

//small function used to see if a filler is needed on the projects grid
const isMultiple = num => {
  const byThree = parseInt(num / 3);
  const byFour = parseInt(num / 4);
  if (num === byThree * 3 && num === byFour * 4) {
    return true
  } else { return false }
};

//pull the projects.json file using ajax
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

//functions used by the compare section, buttons can be found on the .html

//code needed for remove button
function addCompare() {
  document.getElementById("compare-button").remove()
  document.getElementsByClassName("img-comp-container")[0].style.display = ""
  for (button of document.getElementsByTagName("button")) {
    button.style.display = ""
  }
  document.getElementById("clean-button").style.display = ""
}
function removeCompare() {
  var addStr = ""
  if (document.getElementsByClassName("video-false").length < 2) {
    addStr = "compare-hide"
  }
  document.getElementById("slideDots").innerHTML += `<span class="dot solid ${addStr}" id="compare-button" onclick="addCompare()" style="
  width: max-content;
  border-radius: 14px;
  padding-left: 5px;
  padding-right: 5px;
  ">Show Compare Window</span>`
  document.getElementsByClassName("img-comp-container")[0].style.display = "none"
  for (button of document.getElementsByTagName("button")) {
    button.style.display = "none"
  }
  document.getElementById("clean-button").style.display = "none"
}
//code needed for the reset button, resets settings then applies
function resetCompare() {
  lastclicked = [88, 88]
  compare([88, 88])
  multiplyWireframe = false
  screenOverlay = false
  document.getElementById("overlay-button").classList = "";
  document.getElementsByClassName("img-comp-overlay")[0].children[0].style["mix-blend-mode"] = "unset"
  document.getElementsByClassName("img-comp-overlay")[0].children[0].style["filter"] = ""
}
//code needed for the overlay toggle button
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
function toggleScreen() {
  if (document.getElementById("screen-button").classList[0] === "active") {
    document.getElementById("screen-button").classList = "";
    screenOverlay = false
    compare(lastclicked)
  } else {
    document.getElementById("screen-button").classList = "active"
    screenOverlay = true
    compare(lastclicked)
  }
}
//things that need to be setup for the lightbox to work, in a function so they can be called once json is able to load
function setupPage() {
  if (window.location.href.includes(`?portfolio-`)) {
    setTimeout(createLightbox, 200);
    setTimeout(showSlides, 210);
    setTimeout(showSketch, 210);
    setTimeout(removeCompare, 310);
  }
  //things that are always needed, but still require the json file
  setTimeout(createProjects, 100)
}

//function to create the projects page
function createProjects() {

  //loops through projects, giving each its own tile 
  for (project of projects) {
    var title = project["title"]
    //makes the cover image for each project the 512x512 copy instead of the full size for quicker loading, the second only loads in the lightbox
    var image = project["image"].split(".")[0] + "512." + project["image"].split(".")[1]
    //this title is turned into a url-allowable string that becomes the element's ID, used later for the .html?portfolio-...etc link
    var elementForAdd = `<div class="flex-item" id="portfolio-${title.replace(/[^a-z0-9]/gmi, "-")}" style="background-image: url(projects/${image})"><div><div class="bottomText">${title}</div></div></div>`
    document.getElementsByClassName('flex-container')[0].innerHTML += elementForAdd

  }

  //if there is a number of elements that could distribute unevenly, a filler element will be added
  if (!isMultiple(projects.length)) {
    //console.log("unspreadable num of projects, adding element")
    document.getElementsByClassName('flex-container')[0].innerHTML += `<div class="flex-item" id="portfolio-filler" style="background-image: url(img/Artstation.png)"> </div>`
    document.getElementById('portfolio-filler').onclick = toArtstation
  }

  //yet another function to setup the onclick events for each project by looping through
  for (project2 of projects) {
    var title2 = project2["title"]
    var href2 = `?portfolio-${title2.replace(/[^a-z0-9]/gmi, "-")}`
    var genFunc = function name() { };
    genFunc = onclickFunction(`${title2.replace(/[^a-z0-9]/gmi, "")}`, genFunc, href2)
    document.getElementById(`portfolio-${title2.replace(/[^a-z0-9]/gmi, "-")}`).onclick = genFunc
  }
}

//prehaps the longest function here, this sets up the lightbox
function createLightbox() {

  //starts by disabling scrolling and showing the previously hidden lightbox elements
  disableScroll()
  document.getElementsByClassName('lightbox overlay')[0].style = "display: unset !important;"
  document.getElementsByClassName('lightbox-project')[0].style = "display: unset !important;"

  //next, the link is seached to find the name of the project, or rather the ID that got assigned to it by title earlier
  const element = document.getElementById(window.location.href.split(".html?")[1])

  //takes the easy route and takes the background image from when you initially clicked on a project, then finds the full-size version of it
  featureImg = element.style['background-image'].replace('512', '')

  //same as previous, steals the title text from the preview you clicked on
  bottomText = element.children[0].children[0].textContent

  //initally, the description is set to be empty, also initializes it as a string
  var description = ""

  //probably not the best way of doing it, but this quickly loops through the list of projects and finds the line/array element for this project
  for (line of projects) {

    //check if the line we have is actually the right one:
    if (line["title"] == bottomText) {

      //if it is, continue on and set the description based on the one set in the JSON
      description = line["description"]

      //if it is specified/defined, set up the slideshow
      if (line["slideshow"] != undefined) {

        //grab the empty parent element for the slide-dots from the html and add the correct number of children
        dotParent = document.getElementById("slideDots")
        for (var i = 1; i < line["slideshow"].length + 1; i++) {
          var renderType = "O"
          var renderTypeLong = "other"
          try {
            if (line["slideshow"][i - 1][0].includes("render") || line["slideshow"][i - 1][0].includes("Combined") || ((line["slideshow"][i - 1][0].includes(".jpg") || line["slideshow"][i - 1][0].includes(".png")) && (line["slideshow"][i - 1][0].includes("Eve") || line["slideshow"][i - 1][0].includes("Xbox")))) {
              renderType = "R"
              renderTypeLong = "render"
            }
            if (line["slideshow"][i - 1][0].includes("Diffuse")) {
              renderType = "D"
              renderTypeLong = "diffuse"
            }
            if (line["slideshow"][i - 1][0].includes("AO")) {
              renderType = "AO"
              renderTypeLong = "ambient-occlusion"
            }
            if (line["slideshow"][i - 1][0].includes("Solid")) {
              renderType = "S"
              renderTypeLong = "solid"
            }
            if (line["slideshow"][i - 1][0].includes("Wire")) {
              renderType = "W"
              renderTypeLong = "wireframe"
            }
            if (line["slideshow"][i - 1][0].includes(".mp4")) {
              renderType = "V"
              renderTypeLong = "video"
            }
            if (line["slideshow"][i - 1][0].includes(".gif")) {
              renderType = "G"
              renderTypeLong = "gif"
            }
          } catch { }
          //some experimental stuff to make the type show up on the dot
          dotParent.innerHTML += `<span class="dot ${renderTypeLong} video-${renderTypeLong === "video"}" onclick="currentSlide(${i})">${renderType}</span>`
        }

        //at this point we know that there is at least one image, so we can start to set up the actual elements in the parent container
        var slideImgHTML = ``

        //for each image specified in the json:
        for (slideImg of line["slideshow"]) {

          //first (rather messily,) we find of what number the image we're working with is, will be used to create the # / ## tag shown in the top left
          var index = line["slideshow"].indexOf(slideImg)
          //initialize an empty caption variable
          caption = ""

          //if what we assumed was an image was actually an array containing an image and caption, reassign values as needed
          if (typeof (slideImg) == "object") {
            caption = slideImg[1]
            slideImg = slideImg[0]
          }

          //make sure that the image actually is well... an image, else, treat it as a video
          if (slideImg.includes(".png") || slideImg.includes(".jpg") || slideImg.includes(".webp") || slideImg.includes(".gif")) {
            //setup the element that needs to be added to the slideshow and add it
            slideImgHTML += `<div class="fade mySlides"><div class=numbertext>${index + 1} / ${line["slideshow"].length}</div><div style="background-image: url(${slideImg}) !important; width: 100%"></div><div class=text>${caption}</div></div>`
          } else {
            //set the needed info for a video and create element
            fileExtention = slideImg.split('.')[slideImg.split('.').length - 1]
            slideImgHTML += `<div class="fade mySlides"><div class=numbertext>${index + 1} / ${line["slideshow"].length}</div><video autoplay loop controls disableVolume disablePictureInPicture controlsList="nodownload" width=100%><source src="${slideImg}" type="video/${fileExtention}">Sorry, your browser doesn't support embedded videos.</video><div class=text>${caption}</div></div>`
          }
        }
        //add in the iamge(s) that we created *before* the content that was already there
        document.getElementsByClassName("slideshow-container")[0].innerHTML = slideImgHTML + document.getElementsByClassName("slideshow-container")[0].innerHTML
      } else {
        //if there were not actually any images for the slideshow, remove the unneeded elements
        document.getElementsByClassName("slideshow-container")[0].remove()
        document.getElementById("slideDots").remove()
      }

      //if there are not at least 2 images, we can remove the compare element and its function
      if (line["slideshow"] === undefined || line["slideshow"].length < 2) {
        document.getElementsByClassName("img-comp-container")[0].remove()
        for (button of document.getElementsByTagName("button")) {
          button.remove()
        }
        document.getElementById("clean-button").remove()
      }
    }

  }


  document.getElementsByClassName("close-mobile")[0].onclick = toPortfolio
  //set the background of the lightbox to link back to the main page
  document.getElementById('lightbox-overlay').onclick = toPortfolio
  //setup the actual parts of the lightbox itself, starting with the background and title
  document.getElementsByClassName('topImg')[0].style["background"] = featureImg
  document.getElementsByClassName('topImg')[0].innerHTML = bottomText
  //next me add the description we got earlier
  document.getElementsByClassName('lightbox-description')[0].innerHTML = description
  var foundSplit = false
  //we loop through the split characters and see if they appear anywhere in the description
  splitStrings = [" | ", "[NEWLINE]"]
  for (splitString of splitStrings) { }
  if (description.split(splitString).length > 1) {
    foundSplit = true
    for (const descriptionPart of description.split(splitString)) {
      if (descriptionPart != description.split(splitString)[0]) {
        //function goes here if this is NOT the first part, add the secondary parts
        var lightboxDescriptionElement = `<div class="lightbox-description">${descriptionPart}</div>`
        document.getElementsByClassName('lightbox-description')[0].parentElement.innerHTML += lightboxDescriptionElement
      } else {
        //this is the first part, set the description as needed
        document.getElementsByClassName('lightbox-description')[0].textContent = descriptionPart
      }
    }
  }
  //if there was not a split, we just make the text spread accross, but still retain the stripe on the left
  if (!foundSplit) {
    var sheet = window.document.styleSheets[0];
    sheet.insertRule(`.lightbox-description {text-align: justify !important;}`);
  }

  //now we loop through the projects again, this part will be placed after the description (or at least the first one)
  //as previously, we loop through and find the correct line, but this time we take the 'sketchfab' data instead to make its own mini-slideshow
  for (line of projects) {

    //continues here if we're on the correct line
    if (line["title"] == bottomText) {
      document.getElementsByClassName("lightbox-project")[0].innerHTML += `<div class=sketchshow-container><a class=prev onclick=plusSketch(-1)>❮</a> <a class=next onclick=plusSketch(1)>❯</a></div><div id=sketchDots style=text-align:center></div>`
      //check to see it it's actually defined, if it is, we loop through to add the dots
      if (line["sketchfab"] != undefined) {
        dotParent = document.getElementById("sketchDots")
        for (var i = 1; i < line["sketchfab"].length + 1; i++) {
          dotParent.innerHTML += `<span class="sketchDot" onclick="currentSketch(${i})"></span>`
        }
        //after doing so, we start to set up the HTML element for each slide
        var sketchHTML = ``
        for (sketch of line["sketchfab"]) {
          //set element and similar
          var index = line["sketchfab"].indexOf(sketch)
          caption = ""


          if (typeof (sketch) == "object") {
            //again, if there are multiple objects in what we thought was the ID of the embed, we take the second as the caption
            caption = sketch[1]
            sketch = sketch[0]
          }
          //this long string is used to add the new line for each embed
          sketchHTML += `<div class="fade mySketches"><div class=numbertext>${index + 1} / ${line["sketchfab"].length}</div><iframe class="" width="640" height="360" src="https://sketchfab.com/models/${sketch}/embed?autostart=1;" frameborder="0" allow="autoplay; fullscreen;" allowvr="" mozallowfullscreen="true" webkitallowfullscreen="true" style="width: 100%;"></iframe><div class=text>${caption}</div></div>`
        }

        //setup things that are needed if there is only one embed, this line will add a class that impacts how styles are interpreted, if i remember correctly, it straight out hides them
        if (line["sketchfab"].length === 1) {
          document.getElementsByClassName("lightbox-project")[0].classList += " oneSketch"
        }
        //after this, we add the HTML we created before the previous contents of the slideshow
        document.getElementsByClassName("sketchshow-container")[0].innerHTML = sketchHTML + document.getElementsByClassName("sketchshow-container")[0].innerHTML
      } else {
        //if there were no embeds, we remove the unused elements
        document.getElementsByClassName("sketchshow-container")[0].remove()
        document.getElementById("sketchDots").remove()
      }

    }

  }
  //this line adds a tad of attribution on the bottom of the lightboxes
  document.getElementsByClassName("lightbox-project")[0].innerHTML += `<div id="attribution" style="font-size:12pt;font-family:Montserrat;color:#aaa;position:relative!important;bottom: 4px;width: 100%;left: 0px;">Copyright © 2020-2021 Sander Vonk; CC BY-NC-ND 4.0 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Cc_by-nc-nd_euro_icon.svg/1280px-Cc_by-nc-nd_euro_icon.svg.png" style="position:relative;height:20px;margin-left:10px;margin-top:2.5px"></div>`
}

//this function sets up the images that are 'compared' in the 
function compare([first, last]) {

  //first we find the image urls from the slideshow elements themselves, given the number of the dot
  if (first != 88) {
    firstImg = document.getElementsByClassName("slideshow-container")[0].children[first - 1].children[1].style["background-image"].replace(`url("`, "").replace(`")`, "")
  }
  if (last != 88) {
    lastImg = document.getElementsByClassName("slideshow-container")[0].children[last - 1].children[1].style["background-image"].replace(`url("`, "").replace(`")`, "")
  }

  //if the lines are at their defaults, we set them back to the default images, used by the reset function
  if (first === 88) {
    firstImg = "img/Compare1.png"
    try {
      document.getElementsByClassName("last")[0].className = document.getElementsByClassName("last")[0].className.replace(' last', '')
    } catch { }
  }
  if (last === 88) {
    lastImg = "img/Compare2.png"
  }

  //after this, we set the src image of the comparison elements to the paths we found
  document.getElementsByClassName("img-comp-img")[0].children[0].src = firstImg
  document.getElementsByClassName("img-comp-img")[1].children[0].src = lastImg

  //this function checks if the 'overlay' is enabled, and if it is, if the overlay image is actually a wireframe that could actually be overlayed correctly
  if (multiplyWireframe && lastImg.includes("Wire")) {

    //if it is, we set the blend mode of the overlayed image to 'multiply,' which lets the black and white wireframe always show, well as long as the bg isn't black
    if (!screenOverlay) {
      document.getElementsByClassName("img-comp-overlay")[0].children[0].style["mix-blend-mode"] = "multiply"
      document.getElementsByClassName("img-comp-overlay")[0].children[0].style["filter"] = ""
    } else {
      document.getElementsByClassName("img-comp-overlay")[0].children[0].style["mix-blend-mode"] = "screen"
      document.getElementsByClassName("img-comp-overlay")[0].children[0].style["filter"] = "invert(1)"
    }

  } else {
    //if it wasnt a wireframe image, or if the option isn't enabled, we just set the blend mode back to 'unset'
    document.getElementsByClassName("img-comp-overlay")[0].children[0].style["mix-blend-mode"] = "unset"
    console.log("set to unset")
  }
}

//the next couple functions are used to control the various types of slideshows

//set default images for compare
var lastclicked = [88, 88]

//this function is called by the next/previous buttons
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls, the compare setup also piggybacks off of this function
function currentSlide(n) {
  showSlides(slideIndex = n);
  //emergency bypass for if the slide is a video
  if (document.getElementsByClassName("dot")[n - 1].innerHTML.includes("V")) { n = 88 }
  lastclicked = [lastclicked[1], n]
  compare(lastclicked)
}
function plusSketch(n) {
  showSketch(sketchIndex += n);
}

// Thumbnail image controls for sketchfab embeds
function currentSketch(n) {
  showSketch(sketchIndex = n);
}

//function called by the previous
function showSlides(n) {

  //first we check if the function was not called with anything, this is used when the page is first opened
  if (arguments.length != 1) { n = 1 }
  //initialize the variables and grab HTML elements
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");

  //this peice makes sure that the arrows do not force the slide number out of the applicable range
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  //does the opposite of next for old slide
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" last", "");
    dots[i].className = dots[i].className.replace(" active", " last");
  }

  //this part makes the current slide's dot highlighted/darker than others and makes sure that the slide shows correctly; 
  //in try so it will not error if the slides were already deleted but this was still called
  try {
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  } catch { }
}

//preforms the same function as the showSlide function, only for the sketchfab embes, should they exist
function showSketch(n) {
  //setup defaults in case called without (used in setTimeout())
  if (arguments.length != 1) { n = 1 }
  //initialize vars and grab HTML elements
  var i;
  var sketches = document.getElementsByClassName("mySketches");
  var dots = document.getElementsByClassName("sketchDot");

  //prevent out of domain errors
  if (n > sketches.length) { sketchIndex = 1 }
  if (n < 1) { sketchIndex = sketches.length }

  //hide other embeds should there be more than 1
  for (i = 0; i < sketches.length; i++) {
    sketches[i].style.display = "none";
  }

  //de-bold the unactive dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  //bold the active dot and try to make the current show
  //in try so it will not error if the embeds were already deleted but this was still called
  try {
    sketches[sketchIndex - 1].style.display = "block";
    dots[sketchIndex - 1].className += " active";
  } catch { }
}


