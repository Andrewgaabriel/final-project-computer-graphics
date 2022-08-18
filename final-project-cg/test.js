let scene,
  camera,
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane,
  renderer,
  container,
  rocket,
  HEIGHT,
  WIDTH;


  let loader = new THREE.GLTFLoader();
  loader.load( "https://www.stivaliserna.com/assets/rocket/rocket.gltf",
    (gltf) => {
      rocket = gltf.scene;
      rocket.position.y = 50;
      scene.add(rocket);
    }
  );
};

const handleWindowResize = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
};

const createLights = () => {
  const ambientLight = new THREE.HemisphereLight(0x404040, 0x404040, 1);

  const directionalLight = new THREE.DirectionalLight(0xdfebff, 1);
  directionalLight.position.set(-300, 0, 600);

  const pointLight = new THREE.PointLight(0xa11148, 2, 1000, 2);
  pointLight.position.set(200, -100, 50);

  scene.add(ambientLight, directionalLight, pointLight);
};

const targetRocketPosition = 40;
const animationDuration = 2000;

const loop = () => {
  const t = (Date.now() % animationDuration) / animationDuration;

  renderer.render(scene, camera);

  const delta = targetRocketPosition * Math.sin(Math.PI * 2 * t);
  if (rocket) {
    rocket.rotation.y += 0.1;
    rocket.position.y = delta;
  }

  requestAnimationFrame(loop);
};

const main = () => {
  createScene();
  createLights();

  renderer.render(scene, camera);
  loop();
};

main();