import './App.css';
import {Image as ImageImpl, Preload, Scroll, ScrollControls, useScroll} from "@react-three/drei";
import {Suspense, useEffect, useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";
import {Vector3} from "three";

function Image({position, scale1, url}: { position: Vector3, scale1: number, url: string }) {
    const ref = useRef<THREE.Mesh>(null);
    const group = useRef<THREE.Group>(null);
    const data = useScroll();

    useFrame((state, delta) => {
        if (group.current && ref.current) {
            group.current.position.z = THREE.MathUtils.damp(group.current.position.z, Math.max(0, data.delta * 50), 4, delta);
        }
    });
    const scale2 = scale1.valueOf();
    return (
        <group ref={group}>
            <ImageImpl ref={ref} position={position} scale={[scale2, 5]} url={url}/>
        </group>
    )
}

function Page({position, urls}: { position: Vector3, urls: string[] }) {
    const m = 0.4;
    const {width} = useThree((state) => state.viewport)
    const w = width < 10 ? 1.5 / 3 : 1 / 3
    const scale = width * w - m * 2;
    return (
        <group position={position}>
            <Image position={new Vector3(-width * w, 0, -1)} scale1={scale} url={urls[0]}/>
            <Image position={new Vector3(0, 0, 0)} scale1={scale} url={urls[1]}/>
            <Image position={new Vector3(width * w, 0, 1)} scale1={scale} url={urls[2]}/>
        </group>
    )
}

function Pages() {
    const {width} = useThree((state) => state.viewport);
    const data = useScroll();
    useEffect(() => {
        const interval = setInterval(() => {
            data.el.scrollLeft = data.el.scrollLeft + 1;
        }, 10);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <mesh>
            <Page position={new Vector3(-width, 0, 0)}
                  urls={['/carosel/F1.jpg', '/carosel/F2.jpg', '/carosel/F3.jpg']}/>
            <Page position={new Vector3(0, 0, 0)}
                  urls={['/carosel/F1.jpg', '/carosel/F2.jpg', '/carosel/F3.jpg']}/>
            <Page position={new Vector3(width, 0, 0)}
                  urls={['/carosel/F5.jpg', '/carosel/F6.jpg', '/carosel/F7.jpg']}/>
            <Page position={new Vector3(width * 2, 0, 0)}
                  urls={['/carosel/F5.jpg', '/carosel/F6.jpg', '/carosel/F7.jpg']}/>
            <Page position={new Vector3(width * 3, 0, 0)}
                  urls={['/carosel/F1.jpg', '/carosel/F2.jpg', '/carosel/F3.jpg']}/>
            <Page position={new Vector3(width * 4, 0, 0)}
                  urls={['/carosel/F4.jpg', '/carosel/F5.jpg', '/carosel/F6.jpg']}/>
        </mesh>
    )
}

const MyMesh = () => {
    return (
        <Suspense fallback={<mesh>..loading</mesh>}>
            <ScrollControls eps={1} infinite horizontal damping={4} pages={4} distance={1}>
                <Scroll>
                    <Pages/>
                </Scroll>
            </ScrollControls>

            <Preload/>
        </Suspense>);
}

function App() {

    return (
        <group>

            <MyMesh/>


        </group>
    );
}

export default App;
