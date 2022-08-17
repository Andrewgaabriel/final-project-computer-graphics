import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const scene = new THREE.Scene()


/*                         (<FIELD OF VIEW> , <ASPECT RATIO> , <VIEW FRUSTUM> , <VIEW FRUSTUM>*/
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);



/* RENDER ==== DRAW */
//renderer.render(scene, camera);






const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xf0556b });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);




// TENTATIVA DE MOSTRAR UM TEXTO ! FALHOU
/*   const loader = new FontLoader();
	const font = loader.load( 'Roboto_Regular.json');

  const textGeometry = new TextGeometry('Andrew World', {
    font: font,
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelOffset: 0,
    bevelSegments: 5
  });
  const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  text.position.set(2, 2, 2);
  //scene.add(text); */




//LIGHTS
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);



/* HELPERS */
/* 
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(500, 100);
scene.add(lightHelper, gridHelper);
 */



//CAMERA CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)







/* LÓGICA DE ADICIONAR E CRIAR ESTRELAS À CENA */
function addStar() {
  
  const geometry = new THREE.TetrahedronGeometry(0.25, 1);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh( geometry, material );

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 500 ));

  star.position.set(x,y,z);
  scene.add(star);
}
Array(1500).fill().forEach(addStar);
/* -------------------------------------------------- */






/* TEXTURA DO ESPAÇO */
const spaceTexture = new THREE.TextureLoader().load('awesomesky.jpg');
scene.background = spaceTexture;
/* --------------------------------------------------------------- */





/* AVATAR DA PESSOA */
const andrewTexture = new THREE.TextureLoader().load('andrew2.png');

const andrew = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: andrewTexture })
);

scene.add(andrew)


/* ----------------------------------- */


/* MOON */

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);

/* POSITIONS */

camera.position.z = 0;

moon.position.z = 10;
moon.position.x = -10;

andrew.position.x = 3



function moveCamera() {


  const t = document.body.getBoundingClientRect().top;


  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;


  /* CRIA UM ORBITA CIRCULAR */
  /* andrew.position.x = Math.sin(t/100) * 10;
  andrew.position.y = Math.cos(t/100) * 10;
  andrew.position.z = Math.sin(t/100) * 10;
   */

  //andrew.position.x = t * -0.01;
  
  andrew.rotation.y += 0.01;
  andrew.rotation.z += 0.01;
  andrew.rotation.x += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

  console.log('andrew :', andrew.position.x, andrew.position.y, andrew.position.z);
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