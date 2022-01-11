let WIDTH = window.innerWidth
let HEIGHT = window.innerHeight
let cameraCenter = new THREE.Vector3()
const cameraHorzLimit = 50
const cameraVertLimit = 50
let mouse = new THREE.Vector2()

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 1, 1000)
camera.position.y = 160
camera.position.z = 400
camera.lookAt(new THREE.Vector3(0, 0, 0))
cameraCenter.x = camera.position.x
cameraCenter.y = camera.position.y

const renderer = new THREE.WebGLRenderer()
renderer.setSize(WIDTH, HEIGHT)
document.body.appendChild(renderer.domElement)


const geo = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geo, material)
cube.position.set(0, 0, 0)
scene.add(cube)

document.addEventListener('mousemove', onDocumentMouseMove, false)
window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    WIDTH = window.innerWidth
    HEIGHT = window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
    updateCamera()
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
}

animate()


function updateCamera() {
    camera.position.x = cameraCenter.x + (cameraHorzLimit * mouse.x)
    camera.position.y = cameraCenter.y + (cameraVertLimit * mouse.y)
}

function onDocumentMouseMove(event) {
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2
    mouse.y = (event.clientY / window.innerHeight) * 2
}
