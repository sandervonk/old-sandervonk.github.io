const section_data = JSON.parse(`{
    "about-intro": {
        "title": "Introduction",
        "text": "Welcome! As you may have noticed so far, this is my site! Working on it has been a ongoing project for a couple months now, though my time/effort was by no means distributed equally among all the pages. Take a look at my portfolio page for my 3D/Art projects, the projects page for code-based projects, mostly extensions. The contact and code pages serve mainly as gateways to other resources. Enjoy and watch for bugs!"
    },
    "about-coding": {
        "title": "Coding",
        "text": "Though I've always been better at 3D modeling than coding, lately I've begun to spend a little more time on it, focusing mainly on CSS, JS, and HTML. That's one of the main reasons this site came to be. I've always lived in a household where computer science is a common topic, and thus did do some light C+ / Python projects when I was younger, but my knowledge of those languages is still minimal. I've really enjoyed being able to learn more about coding, and this past year + of quarantine was definitely a good, albeit unwanted, opportunity to actually apply that. I hope you enjoy skimming or reading this site as much as I enjoyed making it, but please keep in mind that there will most definitely be bugs."
    },
    "about-life": {
        "title": "My Life",
        "text": "Coming soon!"
    },
    "about-3D": {
        "title": "3D & Blender",
        "text": "I did a lot of Tinker cad and Sketch box modeling when I was in elementary school, but the past 2-4 years have been especially full of 3D projects, as I discovered Blender, an excellent 3D modeling and CAD tool that I've used mostly for art-type projects. No one project that I have posted over on my Portfolio is really my favorite, but each provided an opportunity to learn a new skill, especially those where I attempted to replicate a real product or animated feature. I really started working with Blender a lot when v2.8 was released, with a completely reworked interface that was a lot easier to use. To even get a mediocre sense of how to use Blender, I watched and worked along with numerous tutorials, especially those by Blender Guru (the donut series) and Ducky3D's abstract ones."
    },
    "about-why": {
        "title": "Why: this site and more",
        "text": "This site originally started as a way for me to learn more about practical uses for CSS and JS. While it certainly was helpful, the projects that I worked on while also developing this site were really what allowed me to be more flexible. If you head over to the Projects tab, you'll see some of the things that I've been working on in the past year. They're all in various stages of completion, and also range in usefulness. At this time, I'd say the one that's gotten the most support and time poured into it would be the Simplify Aeries extension, which I started developing before I even created this site! Though I am certainly biased, I strongly recommend checking it out, as all the features do help with day to day SIS use for students. Thanks for reading and enjoy your stay!"
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

