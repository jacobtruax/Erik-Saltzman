function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM ";
    var zone = "NYC";

    if(h == 0){
        h = 12;
    }

    if(h > 12){
        h = h - 12;
        session = "PM ";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session + zone;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;

    setTimeout(showTime, 1000);

}

showTime();

// Portfolio

const cursor = document.querySelector("div#imageFollow")

document.addEventListener("mousemove", function(event) {
  const x = event.pageX + 50
  const y = event.pageY + 50

  cursor.style.left = x + "px"
  cursor.style.top = y + "px"
})

const videoTag = document.querySelector("section.videoPage")
const closeTag = document.querySelector("section.videoPage > p")

var mq1 = window.matchMedia( "(max-width: 900px)" );
if (mq1.matches) {
  // Buttons ================================
  const buttons = document.querySelectorAll("div.button")
  // const divImage = document.querySelector("div.imageMain")

  buttons.forEach(button => {
    button.addEventListener("mouseover", function(event){
      document.body.style.cursor = "pointer";
      // cursor.style.display = "block"
      cursor.style.opacity = "0"

      const bg = button.getAttribute("data-img")
      cursor.style.backgroundImage = 'url('+bg+')'
    })

    button.addEventListener("mouseout", function(){
      document.body.style.cursor = "default ";
      // cursor.style.display = "none"
      cursor.style.opacity = "0"
    })
  })


  buttons.forEach(button => {
    button.addEventListener("click", function(event){
      videoTag.classList.add("open")
      const bg = button.getAttribute("data-vid")
      videoTag.style.width = "375px"
      videoTag.style.height = "325px"
      var video = document.getElementById('videoPage');
      video.style.opacity = "1"
      video.src = bg;

    })

  })

  closeTag.addEventListener("click", function() {
    if(videoTag.classList.contains("open")){
      videoTag.classList.remove("open")
    }
    var video = document.getElementById('videoPage');
    video.style.opacity = "0"
    videoTag.style.width = "375px"
    videoTag.style.height = "325px"
    video.src = null;
  })
}else{
  // Buttons ================================
  const buttons = document.querySelectorAll("div.button")
  // const divImage = document.querySelector("div.imageMain")

  buttons.forEach(button => {
    button.addEventListener("mouseover", function(event){
      document.body.style.cursor = "pointer";
      // cursor.style.display = "block"
      cursor.style.opacity = "1"

      const bg = button.getAttribute("data-img")
      cursor.style.backgroundImage = 'url('+bg+')'
    })

    button.addEventListener("mouseout", function(){
      document.body.style.cursor = "default ";
      // cursor.style.display = "none"
      cursor.style.opacity = "0"
    })
  })

  // Fixing issue with three.js and cursor ==========
  const hoverFix = document.getElementById("hoverFix")

  hoverFix.addEventListener("mouseover", function(event){
    document.body.style.cursor = "default";
  })


  // Videos ===============================
  const videoTag = document.querySelector("section.videoPage")
  const closeTag = document.querySelector("section.videoPage > p")


  buttons.forEach(button => {
    button.addEventListener("click", function(event){
      videoTag.classList.add("open")
      const bg = button.getAttribute("data-vid")
      var video = document.getElementById('videoPage');
      videoTag.style.width = "960px"
      videoTag.style.height = "625px"
      video.style.opacity = "1"
      video.src = bg;

    })

  })

  closeTag.addEventListener("click", function() {
    if(videoTag.classList.contains("open")){
      videoTag.classList.remove("open")
    }
    var video = document.getElementById('videoPage');
    video.style.opacity = "0"
    videoTag.style.width = "960px"
    videoTag.style.height = "10px"
    video.src = null;
  })
}
