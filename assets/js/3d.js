document.addEventListener('DOMContentLoaded', function() {

/**
* Generate a scene object with a background color
**/

function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0xF7C544);
  return scene;
}

/**
* Generate the camera to be used in the scene. Camera args:
*   [0] field of view: identifies the portion of the scene
*     visible at any time (in degrees)
*   [1] aspect ratio: identifies the aspect ratio of the
*     scene in width/height
*   [2] near clipping plane: objects closer than the near
*     clipping plane are culled from the scene
*   [3] far clipping plane: objects farther than the far
*     clipping plane are culled from the scene
**/

function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 1000);
  camera.position.set(0, 0, 6);
  return camera;
}

/**
* Generate the light to be used in the scene. Light args:
*   [0]: Hexadecimal color of the light
*   [1]: Numeric value of the light's strength/intensity
*   [2]: The distance from the light where the intensity is 0
* @param {obj} scene: the current scene object
**/

function getLight(scene) {
  var light = new THREE.PointLight(0xF5E7C0, .8, 10);
  light.position.set(1, 1, 1);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0x3D2D06);
  ambientLight.position.set(0, 1, 1);
  scene.add(ambientLight);
  return light;
}

/**
* Generate the renderer to be used in the scene
**/

function getRenderer() {
  // Create the canvas with a renderer
  var renderer = new THREE.WebGLRenderer({antialias: true});
  // Add support for retina displays
  renderer.setPixelRatio(window.devicePixelRatio);
  // Specify the size of the canvas
  renderer.setSize(window.innerWidth/2, window.innerHeight/2);
  // Add the canvas to the DOM
  document.getElementById('three-container').appendChild(renderer.domElement);
  // document.body.appendChild(renderer.domElement);
  return renderer;
}

/**
* Generate the controls to be used in the scene
* @param {obj} camera: the three.js camera for the scene
* @param {obj} renderer: the three.js renderer for the scene
**/

function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  // controls.zoomSpeed = 0.4;
  // controls.panSpeed = 0.4;
  controls.noPan = true;
  controls.noZoom = true;
  return controls;
}

/**
* Load Nimrud model
**/

function loadModel() {
  var loader = new THREE.OBJLoader();
  loader.load( 'assets/3d/b_c.obj', function ( object ) {
    // object.rotation.z = Math.PI;
    scene.add( object );
    // document.querySelector('h1').style.display = 'none';
  } );
}

/**
* Render!
**/

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
};

var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();
var controls = getControls(camera, renderer);

loadModel()

render();
});