import './App.css';
import {ContactShadows, useGLTF} from "@react-three/drei";
import {Suspense, useDeferredValue} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

const MyMesh = () => {

  const deferred = useDeferredValue('/bird_orange.glb');
  const { scene, animations } = useGLTF(deferred);

  let mixer = null;
  mixer = new THREE.AnimationMixer(scene);
  void mixer.clipAction(animations[0]).play();
  useFrame((state, delta) => {
    mixer.update(delta);
  });


  return (<primitive object={scene} position={[0, 0, 0]}/>);
}

function App() {

  return (
          <group  position={[2, -2, 0]}>
            <Suspense fallback={<mesh>..loading</mesh>}>
              <MyMesh />
            </Suspense>
            <ContactShadows scale={20} blur={10} far={20}/>
          </group>
  );
}

export default App;
