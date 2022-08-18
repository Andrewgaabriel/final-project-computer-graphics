import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene = new THREE.Scene()
/*                         (<FIELD OF VIEW> , <ASPECT RATIO> , <VIEW FRUSTUM> , <VIEW FRUSTUM>*/
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

let renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);



// BACKGROUND TEXTURE AND CONFIG
let spaceTexture = new THREE.TextureLoader().load('awesomesky.jpg');
scene.background = spaceTexture;
/* -------------------------------------------------------------------*/


// FORMAS:::::::::::

let g1 = new THREE.Group();
let loader = new FontLoader();
let textMesh1;

loader.load( 'Roboto_Regular.json', function ( font ) {

	let geometry = new TextGeometry( 'Andrew', {
		font: font,
		size: 100,
		height: 0.1,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 4,
		bevelOffset: 0,
		bevelSegments: 2
	} );
  let materials = [
    new THREE.MeshPhongMaterial( { color: 0xff00ff, flatShading: true } ), // front
    new THREE.MeshPhongMaterial( { color: 0xffff00 } ) // side
  ];
  textMesh1 = new THREE.Mesh( geometry, materials );
  g1.add(textMesh1);
} );


let torusTexture = new THREE.TextureLoader().load('earth1.jpg');
let torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
let torusMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: torusTexture });
let torus = new THREE.Mesh(torusGeometry, torusMaterial);




function addStar() {

  let geometry = new THREE.TetrahedronGeometry(0.25, 1);
  let material = new THREE.MeshStandardMaterial({color: 0xffffff});
  let star = new THREE.Mesh( geometry , material );
  let [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 500 ));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(1500).fill().forEach(addStar);



let personTexture = new THREE.TextureLoader().load('andrew2.png');
let person = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: personTexture })
);



let moonTexture = new THREE.TextureLoader().load('moon.jpg');
let normalTexture = new THREE.TextureLoader().load('normal.jpg');
let moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);


let pythonTexture = new THREE.TextureLoader().load('python2.png');
let python = new THREE.Mesh(
  new THREE.SphereGeometry(2,32,32),
  new THREE.MeshStandardMaterial({
    map: pythonTexture,
  })
);



g1.add(person);
g1.add(moon);
g1.add(torus);
scene.add(g1);



// LUZES::::::::::::
let pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
let ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);




// HELPERS::::::::::
/* 
let lightHelper = new THREE.PointLightHelper(pointLight);
let gridHelper = new THREE.GridHelper(500, 100);
let axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper, lightHelper, gridHelper);
*/



//CAMERA CONTROLS::::::::::::::
let controls = new OrbitControls(camera, renderer.domElement)




/* STATIC INITIAL POSITIONS */

camera.position.z = 0;

moon.position.z = 10;
moon.position.x = -15;

person.position.x = 3

python.position.x = 3;
python.position.y = 1.547;
python.position.z = 25.25;



function moveCamera() {


  let t = document.body.getBoundingClientRect().top;


  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  python.rotation.x += 0.05;
  python.rotation.y += 0.075;
  python.rotation.z += 0.05;

  person.rotation.y += 0.01;
  person.rotation.z += 0.01;
  person.rotation.x += 0.01;

  textMesh1.rotation.y += 0.01;
  textMesh1.rotation.z += 0.01;
  textMesh1.rotation.x += 0.01;

  /* CRIA UM ORBITA CIRCULAR */
  moon.position.x = Math.sin(t/200) * 20;
  moon.position.y = Math.cos(t/200) * 20;
  moon.position.z = Math.sin(t/200) * 20;


  g1.position.z = t * 0.1;
  
  //person.position.z = t * 0.01;
  //torus.position.z = t * 0.01;
  
  
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

  console.log('person :', person.position.x, person.position.y, person.position.z);
  console.log('camera :', camera.position.x, camera.position.y, camera.position.z);
  console.log('moon :', moon.position.x, moon.position.y, moon.position.z);

}

document.body.onscroll = moveCamera;



function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;


  controls.update();

  renderer.render(scene, camera);
}

animate();