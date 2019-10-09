var keyboard = new THREEx.KeyboardState();

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x000000, 0)

const sectionTag = document.getElementById('8-ball')
sectionTag.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const ambientLight = new THREE.AmbientLight(0x777777, 10, 0)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.05  , 0)
pointLight.position.set(1000, 1000, -2000)
scene.add(pointLight)

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000 )
camera.position.z = -2500


// Loader =================
const loader = new THREE.TextureLoader()
// Make the 8-ball =================
const erikVideo = document.getElementById("erikVid");


const makeBall = function(video) {

  video.addEventListener('canplaythrough', function() {
    video.play();
  }, false);
  video.load();

  videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;
  videoTexture.generateMipmaps = false;


  // const texture = loader.load("lib/8-ball.png")
  const material = new THREE.MeshPhongMaterial({
    map: videoTexture,
    color: 0x494949,
    // 5c5c5c
    emissive: 0x000000,
    specular: 0x111111,
    shininess: 0
  })

  const geometry = new THREE.TetrahedronGeometry(1000, 0)

  const mesh = new THREE.Mesh(geometry, material)
  mesh.userData = {
    URL: "videos/SALTZMAN_GIFS_REEL_092319a.mp4"
  }
  scene.add(mesh)
  return mesh
}

const ball = makeBall(erikVideo)
ball.position.y = -50
ball.rotateX(0.2)
ball.rotateZ(0.2)

const group = new THREE.Group()
group.add(ball)
scene.add(group)

// hold the camera positions
let currentX = 0
let currentY = 0
let aimX = 0
let aimY = 0
let isMouseDown = false

// Animation loop
var mq1 = window.matchMedia( "(max-width: 900px)" );
if (mq1.matches) {
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000 )
  camera.position.z = -3500
  renderer.setAnimationLoop(animate);

  function animate() {
    const diffX = aimX - currentX
    const diffY = aimY - currentY

    currentX = currentX + diffX * 0.05
    currentY = currentY + diffY * 0.05

    ball.position.x = currentX
    ball.position.y = currentY

    camera.lookAt(scene.position)

    ball.rotateY(0.008)

    renderer.render(scene, camera)

    videoTexture.needsUpdate = true;

  }

  let mouse = new THREE.Vector2();
  let raycaster = new THREE.Raycaster(),INTERSECTED;
  let move = false
  var objects = [ball]
  const sectionThree = document.getElementById("8-ball")


  window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  sectionThree.addEventListener("click", onDocumentMouseDown, false);

  function onDocumentMouseDown(event) {
      // event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersections = raycaster.intersectObjects(objects)

      if (intersections[0].object == ball ) {
        const videoTag = document.querySelector("section.videoPage")
        const closeTag = document.querySelector("section.videoPage > p")

        videoTag.classList.add("open")
        const bg = intersections[0].object.userData.URL
        var video = document.getElementById('videoPage');
        video.src = bg;
      }
    }

  //   document.addEventListener("touchstart", function () {
  //   isMouseDown = true
  //   startX = event.pageX
  //   startY = event.pageY
  // })
  //
  // document.addEventListener("touchend", function () {
  //   isMouseDown = false
  // })
  //
  //   document.addEventListener("touchmove", function (event) {
  //     if(isMouseDown) {
  //       let currentRotation = new THREE.Matrix4();
  //               currentRotation.makeRotationFromEuler(ball.rotation);
  //
  //               let newEuler = new THREE.Euler((event.pageY - startY) / 100, (event.pageX - startX) / 100, 0);
  //               let newRotation = new THREE.Matrix4();
  //               newRotation.makeRotationFromEuler(newEuler);
  //
  //               let finalRotation = new THREE.Matrix4();
  //               finalRotation.multiplyMatrices(newRotation, currentRotation);
  //
  //               ball.rotation.setFromRotationMatrix(finalRotation);
  //
  //               startX = event.pageX;
  //               startY = event.pageY;
  //     }
  //   })
}else{
  // LARGE ===================================
  renderer.setAnimationLoop(animate);

  function animate() {
    const diffX = aimX - currentX
    const diffY = aimY - currentY

    currentX = currentX + diffX * 0.05
    currentY = currentY + diffY * 0.05

    ball.position.x = currentX
    ball.position.y = currentY

    camera.lookAt(scene.position)

    ball.rotateY(0.008)

    renderer.render(scene, camera)

    videoTexture.needsUpdate = true;

  }

  let mouse = new THREE.Vector2();
  let raycaster = new THREE.Raycaster(),INTERSECTED;
  let move = false
  var objects = [ball]
  const sectionThree = document.getElementById("8-ball")

  window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  document.addEventListener("mousemove", function (event) {
      aimX = ((window.innerWidth / 2) - event.pageX) * 2
    	aimY = ((window.innerHeight / 2) - event.pageY) * 2
      // aimX = aimX + ((event.pageX - startX) * 8)
      // aimY = aimY + ((event.pageY - startY) * 8)
      // startX = event.pageX
      // startY = event.pageY

      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      raycaster.setFromCamera(mouse, camera)

      const intersections = raycaster.intersectObjects(group.children)


      if (intersections.length > 0) {
          if (INTERSECTED != intersections[0].object) {
              if (INTERSECTED)
              INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
              INTERSECTED = intersections[0].object;
              INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
              let interU = intersections[0].object.uuid
              //setting up new material on hover
              INTERSECTED.material.color.setHex( 0x494949 );
              if (INTERSECTED){
                  document.body.style.cursor = "pointer"
              }
          }

        } else {
            if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            // document.body.style.cursor = "default";
            INTERSECTED = null;
        }
  })

  sectionThree.addEventListener("click", onDocumentMouseDown, false);

  function onDocumentMouseDown(event) {
      // event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersections = raycaster.intersectObjects(objects)

      if (intersections[0].object == ball ) {
        const videoTag = document.querySelector("section.videoPage")
        const closeTag = document.querySelector("section.videoPage > p")

        videoTag.classList.add("open")
        const bg = intersections[0].object.userData.URL
        var video = document.getElementById('videoPage');
        video.src = bg;
      }
    }
}
