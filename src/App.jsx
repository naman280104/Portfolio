import { useEffect, useState, useRef } from 'react'
import './App.css'
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';




const TypingEffect = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const fullText = "H.i, I'm Naman, a S.oftware Engineer who crafts i.nnovative solutions. Explore my w.ork and let's build s.omething amazing together!";

  useEffect(() => {
    let charIndex = 0;
    let wordIndex = 0;
    const words = fullText.split(' ');
    const chunkSize = 4; // Number of words to type at a time
    const typingInterval = 50; // Adjust typing speed
    const cursorBlinkInterval = 500; // Cursor blink interval

    const typeChunk = () => {
      if (wordIndex < words.length) {
        const chunk = words.slice(wordIndex, wordIndex + chunkSize).join(' ') + ' ';
        setDisplayedText(prev => prev + chunk.slice(0, charIndex)); // Initialize displayedText with the current chunk
        const interval = setInterval(() => {
          if (charIndex < chunk.length-1) {
            setDisplayedText(prev => prev + chunk[charIndex]);
            charIndex++;
          } else {
            clearInterval(interval);
            wordIndex += chunkSize;
            charIndex = 0;
            setTimeout(typeChunk, 1000); // Delay before typing the next chunk
          }
        }, typingInterval);
      }
      else {
        console.log("fed")
      }
    };

    const blinkCursor = setInterval(() => {
        setIsCursorVisible(prev => !prev);
      }, cursorBlinkInterval);


    typeChunk();
    // blinkCursor();

    return () => {
      // setIsCursorVisible(false);
      clearInterval(typeChunk);
      clearInterval(blinkCursor);
      setIsCursorVisible(false);
    };
  }, [fullText]);

  return (
    <div className="typing-container">
      {displayedText}
      <span className={`cursor ${isCursorVisible ? 'visible' : 'hidden'}`}>|</span>
    </div>
  );
};


function App() {
  let container, stats;

  let camera, scene, renderer;
  let controls;
  
  const clock = new THREE.Clock();
  
  const init=()=>{
    container = document.createElement( 'div' );
    container.style.zIndex=1;
    document.body.appendChild( container );

    // camera

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 15000 );
    camera.position.z = 250;

    // scene

    scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL( 0.51, 0.4, 0.01, THREE.SRGBColorSpace );
    scene.fog = new THREE.Fog( scene.background, 3500, 15000 );

    // world

    const s = 250;

    const geometry = new THREE.BoxGeometry( s, s, s );
    const material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 50 } );

    for ( let i = 0; i < 3000; i ++ ) {

      const mesh = new THREE.Mesh( geometry, material );

      mesh.position.x = 8000 * ( 2.0 * Math.random() - 1.0 );
      mesh.position.y = 8000 * ( 2.0 * Math.random() - 1.0 );
      mesh.position.z = 8000 * ( 2.0 * Math.random() - 1.0 );

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;

      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();

      scene.add( mesh );

    }


    // lights

    const dirLight = new THREE.DirectionalLight( 0xffffff, 0.15 );
    dirLight.position.set( 0, - 1, 0 ).normalize();
    dirLight.color.setHSL( 0.1, 0.7, 0.5 );
    scene.add( dirLight );

    // lensflares
    const textureLoader = new THREE.TextureLoader();

    const textureFlare0 = textureLoader.load( 'textures/lensflare/lensflare0.png' );
    const textureFlare3 = textureLoader.load( 'textures/lensflare/lensflare3.png' );

    addLight( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
    addLight( 0.08, 0.8, 0.5, 0, 0, - 1000 );
    addLight( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );

    function addLight( h, s, l, x, y, z ) {

      const light = new THREE.PointLight( 0xffffff, 1.5, 2000, 0 );
      light.color.setHSL( h, s, l );
      light.position.set( x, y, z );
      scene.add( light );

      const lensflare = new Lensflare();
      lensflare.addElement( new LensflareElement( textureFlare0, 700, 0, light.color ) );
      lensflare.addElement( new LensflareElement( textureFlare3, 60, 0.6 ) );
      lensflare.addElement( new LensflareElement( textureFlare3, 70, 0.7 ) );
      lensflare.addElement( new LensflareElement( textureFlare3, 120, 0.9 ) );
      lensflare.addElement( new LensflareElement( textureFlare3, 70, 1 ) );
      light.add( lensflare );

    }

    // renderer

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );
    container.appendChild( renderer.domElement );

    //

    controls = new FlyControls( camera, renderer.domElement );

    controls.movementSpeed = 500;
    controls.domElement = container;
    controls.rollSpeed = Math.PI / 6;
    controls.autoForward = false;
    controls.dragToLook = false;

    // stats

    stats = new Stats();
    // container.appendChild( stats.dom );

    // events

    window.addEventListener( 'resize', onWindowResize );

  }

  function onWindowResize() {

    renderer.setSize( window.innerWidth, window.innerHeight );

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

  }


  function animate() {

    render();
    stats.update();

  }

  function render() {

    const delta = clock.getDelta();

    controls.update( delta );
    renderer.render( scene, camera );

  }
  init()
  return (
    <div>
        <div className="home-name" style={{zIndex:2}}>
          <TypingEffect/>
        </div>
    </div>
  )
}

export default App
