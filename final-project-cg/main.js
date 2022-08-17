import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene()


/*                         (<FIELD OF VIEW> , <ASPECT RATIO> , <VIEW FRUSTUM> , <VIEW FRUSTUM>*/
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;


/* RENDER ==== DRAW */
renderer.render(scene, camera);


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);

const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper);



const controls = new OrbitControls(camera, renderer.domElement)



/* LÓGICA DE ADICIONAR E CRIAR ESTRELAS À CENA */

function addStar() {
  const geometry = new THREE.TetrahedronGeometry(0.25, 1);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh( geometry, material );

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 200 ));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(400).fill().forEach(addStar);


/* -------------------------------------------------- */

/* TEXTURA DO ESPAÇO */

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

/* --------------------------------------------------------------- */



/* AVATAR DA PESSOA */
const jeffTexture = new THREE.TextureLoader().load('jeff.png');

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: jeffTexture })
);

scene.add(jeff)

/* ----------------------------------- */


/* MOON */

const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

scene.add(moon);



function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;


  controls.update();

  renderer.render(scene, camera);
}

animate();