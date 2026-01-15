import React, { useRef, useEffect } from 'react';
// We are using the global THREE variable from the CDN script in index.html
// In a real build environment, we would import * as THREE from 'three';

const ThreeDTire: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Check if THREE is available (loaded from CDN)
    const THREE = (window as any).THREE;
    if (!THREE) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    mountRef.current.appendChild(renderer.domElement);

    // Geometry (Torus to represent a tire shape)
    const geometry = new THREE.TorusGeometry(1, 0.4, 32, 100);
    
    // Material (Black rubber-like)
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a, 
      roughness: 0.6,
      metalness: 0.1
    });
    
    // Add "treads" texture simulation via simple wireframe overlay or bumps
    // keeping it simple for code generation without assets
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true, transparent: true, opacity: 0.1 });
    const tire = new THREE.Mesh(geometry, material);
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    
    tire.add(wireframe);
    scene.add(tire);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff4444, 0.5); // Red accent light
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      tire.rotation.x += 0.005;
      tire.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-[300px] h-[300px] flex items-center justify-center pointer-events-none opacity-90 transition-opacity duration-700 hover:opacity-100"
      title="Vista 3D Interactiva"
    />
  );
};

export default ThreeDTire;