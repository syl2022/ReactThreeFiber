import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Canvas} from "@react-three/fiber";
import {Box, Container} from "@mui/material";
import {OrbitControls} from "@react-three/drei";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <React.Fragment>
          <Container maxWidth="xl" className={'threejs-bg'}>
              <Box component="div" height="100vh" width="100%" className={"threejs-container"}>
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                      <hemisphereLight color="white" groundColor="blue" intensity={0.75}/>
                      <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1}/>
              <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1}/>
          <App />
                      <OrbitControls/>
                  </Canvas>
              </Box>
          </Container>
      </React.Fragment>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
