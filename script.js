let scene, camera, renderer, room, object3D;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

init();
animate();

function init() {
    // Create the scene and set the scene size
    scene = new THREE.Scene();
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;

    // Create a renderer and add it to the DOM
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    // Create a camera, zoom it out from the model a bit, and add it to the scene
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(0, 50, 150);
    scene.add(camera);

    // Create a light, set its position, and add it to the scene
    const light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 50, 150);
    scene.add(light);

    // Create a room
    const roomSize = 100;
    const roomGeometry = new THREE.BoxGeometry(roomSize, roomSize, roomSize);
    const roomMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, wireframe: true });
    const roomMesh = new THREE.Mesh(roomGeometry, roomMaterial);
    scene.add(roomMesh);

    // Create a movable object
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshNormalMaterial();
    object3D = new THREE.Mesh(geometry, material);
    object3D.position.set(0, 0, 0); // Position it in the center
    scene.add(object3D);

    // Add event listeners for keyboard input
    document.addEventListener('keydown', onDocumentKeyDown, false);
    document.addEventListener('keyup', onDocumentKeyUp, false);

    // Handle window resizes
    window.addEventListener('resize', onWindowResize, false);
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 87: // W key
            moveForward = true;
            break;
        case 83: // S key
            moveBackward = true;
            break;
        case 65: // A key
            moveLeft = true;
            break;
        case 68: // D key
            moveRight = true;
            break;
    }
}

function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 87: // W key
            moveForward = false;
            break;
        case 83: // S key
            moveBackward = false;
            break;
        case 65: // A key
            moveLeft = false;
            break;
        case 68: // D key
            moveRight = false;
            break;
    }
}

function onWindowResize() {
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
    renderer.setSize(WIDTH, HEIGHT);
}

function animate() {
    requestAnimationFrame(animate);

    // Update object position based on input
    if (moveForward) object3D.position.z -= 1;
    if (moveBackward) object3D.position.z += 1;
    if (moveLeft) object3D.position.x -= 1;
    if (moveRight) object3D.position.x += 1;

    renderer.render(scene, camera);
}
