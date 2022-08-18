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
let letter = new THREE.Group();
let loader = new FontLoader();

/* let materials = [
  new THREE.MeshPhongMaterial( { color: 0xff00ff, map: spaceTexture} ), // front
  new THREE.MeshPhongMaterial( { color: 0x000000 } ) // side
];
let font;
loader.load('Roboto_Regular.json', function (response) {
  font = response;
});
let geometryText = new TextGeometry('Andrew', {
  font: font,
  size: 1,
  height: 0.1,
  curveSegments: 12,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.1,
  bevelSegments: 12
})

let textMesh1 = new THREE.Mesh( geometryText, materials );
g1.add(textMesh1); */

/* var textMesh1; */

/* loader.load( 'Roboto_Regular.json', function ( font ) {

	var geometry = new TextGeometry( 'python', {
		font: font,
		size: 0.5,
		height: 0.01,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0.05, 
		bevelSize: 0.05,
		bevelOffset: 0,
		bevelSegments: 2
	} );
  var materials = [
    new THREE.MeshPhongMaterial( { color: 0xffffff, map: pythonTexture} ), // front
    new THREE.MeshPhongMaterial( { color: 0x000000 } ) // side
  ];
  textMesh1 = new THREE.Mesh( geometry, materials );
  letter.add(textMesh1);
} ); */


function addStar() {
  let geometry = new THREE.TetrahedronGeometry(0.55, 1);
  let material = new THREE.MeshStandardMaterial({color: 0xffffff});
  let star = new THREE.Mesh( geometry , material );
  let [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 500 ));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(1000).fill().forEach(addStar);


function addText(text) {
  loader.load( 'Roboto_Regular.json', function ( font ) {
    var geometry = new TextGeometry( text, {
      font: font,
      size: 1.5,
      height: 0.01,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.05, 
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 2
    } );
    var materials = [
      new THREE.MeshPhongMaterial( { color: 0xffffff} ), // front
      new THREE.MeshPhongMaterial( { color: 0x000000 } ) // side
    ];

    let textMesh = new THREE.Mesh( geometry , materials );
  } );
  return textMesh;
}




function addzeros() {
  loader.load( 'Roboto_Regular.json', function ( font ) {
    var geometry = new TextGeometry( '0', {
      font: font,
      size: 1.5,
      height: 0.01,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.05, 
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 2
    } );
    var materials = [
      new THREE.MeshPhongMaterial( { color: 0xffffff} ), // front
      new THREE.MeshPhongMaterial( { color: 0x000000 } ) // side
    ];

    let zeros = new THREE.Mesh( geometry , materials );
    let [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 400 ));
    zeros.position.set(x,y,z);
    scene.add(zeros);
  });
}
Array(1000).fill().forEach(addzeros);









function adduns() {
  loader.load( 'Roboto_Regular.json', function ( font ) {
    var geometry = new TextGeometry( '1', {
      font: font,
      size: 1.5,
      height: 0.01,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.05, 
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 2
    } );
    var materials = [
      new THREE.MeshPhongMaterial( { color: 0xffffff} ), // front
      new THREE.MeshPhongMaterial( { color: 0x000000 } ) // side
    ];

    let uns = new THREE.Mesh( geometry , materials );
    let [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 400 ));
    uns.position.set(x,y,z);
    scene.add(uns);
  });
}
Array(1000).fill().forEach(adduns);



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


var rocket;
let loader2 = new GLTFLoader();
  loader2.load( "https://www.stivaliserna.com/assets/rocket/rocket.gltf",
    (gltf) => {
      rocket = gltf.scene;
      rocket.scale.set(0.31,0.31,0.31);
      rocket.position.z = -315.6;
      rocket.position.x = -14.5;
      rocket.rotation.z = -1;
      rocket.rotation.y = -0.9;
      rocket.rotation.x = 0.5;
      
      scene.add(rocket);
    }
  );



  function createLanguageBox(pic){
    let languageTexture = new THREE.TextureLoader().load(pic);
    let language = new THREE.Mesh(
      new THREE.BoxGeometry(3,3,3),
      new THREE.MeshBasicMaterial( { map: languageTexture })
    );
    return language;
  }
  
  
  let python = createLanguageBox('pythonpadrao.png');
  let html = createLanguageBox('htmlpadrao.png');
  let css = createLanguageBox('csspadrao.png');
  let javascript = createLanguageBox('jspadrao.png');
  let java = createLanguageBox('javapadrao.png');
  let c = createLanguageBox('cpadrao.png');
  let php = createLanguageBox('phppadrao.png');

  let languages = [python, html, css, javascript, java, c, php];

  let languagesGroup = new THREE.Group();
  languagesGroup.position.set(0,0,0);
  scene.add(languagesGroup);
  languages.forEach(language => { languagesGroup.add(language); });
  languagesGroup.rotation.y = -0.5;
  languagesGroup.rotation.x = -0.5;
  languagesGroup.rotation.z = -0.5;


  languages.forEach(language => { language.position.set(THREE.MathUtils.randFloatSpread(100),THREE.MathUtils.randFloatSpread(100),THREE.MathUtils.randFloatSpread(100)); });









g1.add(person);
g1.add(moon);
//g1.add(torus);
scene.add(g1, letter, python);



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

camera.position.z = 1;

moon.position.z = 10;
moon.position.x = -15;

person.position.x = 3

python.position.x = 3;
python.position.y = 1.547;
python.position.z = 25.25;

//textMesh1.setPosition(0.055,1.72,2.77);

/* letter.position.x = 0.55;
letter.position.y = 1.55;
letter.position.z = 15; */




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



  letter.rotateX(t/20000);


  /* CRIA UM ORBITA CIRCULAR */
  moon.position.x = Math.sin(t/200) * 20;
  moon.position.y = Math.cos(t/200) * 20;
  moon.position.z = Math.sin(t/200) * 20;




  g1.position.z = t * 0.05;

  rocket.position.z = -315 + t * -0.05;
  rocket.position.x = -14.5 + t * -0.007;
  rocket.rotation.y += 0.001;
  


  
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

  

  //console.log('person :', person.position.x, person.position.y, person.position.z);
  console.log('camera :', camera.position.x, camera.position.y, camera.position.z);
  //console.log('moon :', moon.position.x, moon.position.y, moon.position.z);
  console.log('python :', python.position.x, python.position.y, python.position.z);
  //console.log('letter :', letter.position.x, letter.position.y, letter.position.z);
  //console.log('rocket :', rocket.position.x, rocket.position.y, rocket.position.z);

}

document.body.onscroll = moveCamera;



function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();