import {Environment, Html, OrbitControls, Preload} from "@react-three/drei";
import React, {Suspense, useRef, useState} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";
import {Euler, Vector3} from "three";
import {Box} from "@mui/material";
import HtmlScreen from "./HtmlScreen";

function PatternBox({position, rotate, move}: { position: Vector3, rotate: boolean, move: boolean }) {
    const group = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (rotate) {
            if (group.current) {
                group.current.rotation.y = group.current.rotation.y + 0.01;
                if (move) {
                    if (group.current.position.x < 0)
                        group.current.position.x -= 0.014;
                    else
                        group.current.position.x += 0.014;

                    if (group.current.position.y < 0)
                        group.current.position.y -= 0.0051;
                    else
                        group.current.position.y += 0.0051;
                    group.current.position.z += 0.0714;
                    if (group.current.position.z > 100)
                        group.current.position.set(position.x, position.y, position.z - 100)
                }
            }
        }
    });
    return (
        <group ref={group} rotation={[0, 0, Math.PI / 4]} position={position} scale={1.5}>
            <group>
                <PatternSquare rotation={new Euler(0, 0, 0)} position={new Vector3(0, 0, 1)}></PatternSquare>
                <PatternSquare rotation={new Euler(0, 0, 0)} position={new Vector3(0, 0, -1)}></PatternSquare>
                <PatternSquare rotation={new Euler(0, Math.PI / 2, 0)} position={new Vector3(1, 0, 0)}></PatternSquare>
                <PatternSquare rotation={new Euler(0, Math.PI / 2, 0)} position={new Vector3(-1, 0, 0)}></PatternSquare>
            </group>
        </group>
    )
}

function PatternSquare({rotation, position}: { rotation: Euler, position: Vector3 }) {

    return (
        <group rotation={rotation} position={position}>
            <group>
                <mesh position={[0, 1, 0]}>
                    <boxGeometry args={[2.2, 0.2, 0.2]}/>
                    <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={1}/>
                </mesh>
                <mesh position={[1, 0, 0]}>
                    <boxGeometry args={[0.2, 2.2, 0.2]}/>
                    <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={1}/>
                </mesh>
                <mesh position={[-1, 0, 0]}>
                    <boxGeometry args={[0.2, 2.2, 0.2]}/>
                    <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={1}/>
                </mesh>
                <mesh position={[0, -1, 0]}>
                    <boxGeometry args={[2.2, 0.2, 0.2]}/>
                    <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={1}/>
                </mesh>

            </group>

            <Environment preset="dawn" background backgroundBlurriness={0.6}/>
        </group>
    )
}

function Pattern() {

    return (<group scale={2}>
            <group position={new Vector3(0, 0, 0)} scale={20}>

                <PatternBox position={new Vector3(0, 0, 0)} rotate={true} move={false}></PatternBox>
                <mesh position={[0, 0, 0]}>

                    <sphereGeometry args={[1]}/>
                    <meshPhysicalMaterial color={'black'} roughness={0.5} metalness={1}/>
                </mesh>

            </group>
            <group>
                {Array.from(Array(7), (e, j) => {
                    return (Array.from(Array(20), (e, i) => {
                        return <PatternBox position={new Vector3(i, -(30 - Math.exp(i / j)), i * 5)} rotate={true}
                                           move={true}></PatternBox>
                    }))
                })}
                {Array.from(Array(7), (e, j) => {
                    return (Array.from(Array(20), (e, i) => {
                        return <PatternBox position={new Vector3(-i, (30 - Math.exp(i / j)), i * 5)} rotate={true}
                                           move={true}></PatternBox>
                    }))
                })}
            </group>
        </group>
    )
}

const CanvasBanner = () => {
    return (
        <Suspense fallback={<mesh>..loading</mesh>}>
            <Pattern/>
            <Preload/>
        </Suspense>);
}


function Geo3Banner() {

    return (
        <Box component="div" width={'100%'} height={'100vh'}>
            <Canvas camera={{position: [0, 0, 200]}}>
                <ambientLight intensity={1}/>
                <Model></Model>
                <OrbitControls enableDamping dampingFactor={0.1} zoomSpeed={0.5} enableRotate={false}/>
            </Canvas>
        </Box>

    );
}

const Model = () => {
    const [currentScene, setCurrentScene] = useState('geometry');
    const divRef = useRef<THREE.Group>(null);
    const {camera} = useThree();
    useFrame(() => {
        if (camera.position.z >= 200) {
            camera.position.z = 200;
        }
        if (camera.position.z <= 50) {
            setCurrentScene('quote');
            if (divRef.current) {
                divRef.current.position.y = -((camera.position.z.valueOf()) + 20);
            }
        } else {
            setCurrentScene('geometry');
        }
    });

    return (
        <group>
            <mesh>
                <boxGeometry args={[5000, 5000, -1000]}/>
                <meshStandardMaterial color="black"/>
                {currentScene === 'geometry' ?
                    <CanvasBanner/>
                    :
                    <group position={[0, 0, 0]}>
                        <mesh position={[0, 0, -600]}>
                            <sphereGeometry args={[550]}/>
                            <meshPhysicalMaterial color={'black'} roughness={0.5} metalness={1}/>
                        </mesh>
                        <group ref={divRef}>
                            <mesh position={[0, 0, -50]}>
                                <Html><HtmlScreen></HtmlScreen></Html>
                            </mesh>
                        </group>
                    </group>
                }
            </mesh>
        </group>
    );
}

export default Geo3Banner;
