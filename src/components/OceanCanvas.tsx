import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface OceanCanvasProps {
  depth?: number; // 0 to 11000 meters
  className?: string;
  interactive?: boolean;
}

export const OceanCanvas: React.FC<OceanCanvasProps> = ({
  depth = 0,
  className = '',
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const depthRef = useRef(depth);
  depthRef.current = depth;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Initial fog
    const initialFogColor = new THREE.Color(0x033b6a);
    scene.fog = new THREE.FogExp2(initialFogColor, 0.02);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0x00e5ff, 1.2);
    scene.add(ambientLight);

    const sunbeamLight = new THREE.DirectionalLight(0xeafbff, 2.5);
    sunbeamLight.position.set(10, 40, 20);
    scene.add(sunbeamLight);

    const abyssPointLight = new THREE.PointLight(0x00e5ff, 2, 50);
    abyssPointLight.position.set(0, -5, 10);
    scene.add(abyssPointLight);

    // 1. Bubbles Particle System
    const bubbleCount = 450;
    const bubbleGeo = new THREE.BufferGeometry();
    const bubblePositions = new Float32Array(bubbleCount * 3);
    const bubbleSpeeds = new Float32Array(bubbleCount);
    const bubbleSizes = new Float32Array(bubbleCount);

    for (let i = 0; i < bubbleCount; i++) {
      bubblePositions[i * 3] = (Math.random() - 0.5) * 80;
      bubblePositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      bubblePositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      bubbleSpeeds[i] = 0.04 + Math.random() * 0.08;
      bubbleSizes[i] = 0.5 + Math.random() * 1.5;
    }
    bubbleGeo.setAttribute('position', new THREE.BufferAttribute(bubblePositions, 3));

    // Custom circle particle texture for bubbles
    const bubbleCanvas = document.createElement('canvas');
    bubbleCanvas.width = 32;
    bubbleCanvas.height = 32;
    const bCtx = bubbleCanvas.getContext('2d')!;
    bCtx.beginPath();
    bCtx.arc(16, 16, 14, 0, Math.PI * 2);
    bCtx.fillStyle = 'rgba(0, 229, 255, 0.8)';
    bCtx.fill();
    bCtx.lineWidth = 2;
    bCtx.strokeStyle = 'rgba(234, 251, 255, 0.9)';
    bCtx.stroke();
    const bubbleTexture = new THREE.CanvasTexture(bubbleCanvas);

    const bubbleMat = new THREE.PointsMaterial({
      size: 1.2,
      map: bubbleTexture,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const bubbles = new THREE.Points(bubbleGeo, bubbleMat);
    scene.add(bubbles);

    // 2. Bioluminescent deep particles
    const biolumCount = 300;
    const biolumGeo = new THREE.BufferGeometry();
    const biolumPositions = new Float32Array(biolumCount * 3);
    for (let i = 0; i < biolumCount; i++) {
      biolumPositions[i * 3] = (Math.random() - 0.5) * 70;
      biolumPositions[i * 3 + 1] = (Math.random() - 0.5) * 70;
      biolumPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    biolumGeo.setAttribute('position', new THREE.BufferAttribute(biolumPositions, 3));
    const biolumMat = new THREE.PointsMaterial({
      size: 0.8,
      color: 0x865dff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const biolumParticles = new THREE.Points(biolumGeo, biolumMat);
    scene.add(biolumParticles);

    // 3. Volumetric Sunbeams Mesh (Cone with gradient opacity)
    const sunbeamGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const beamGeo = new THREE.ConeGeometry(8 + i * 2, 45, 16, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.08 - i * 0.012,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const beamMesh = new THREE.Mesh(beamGeo, beamMat);
      beamMesh.rotation.z = -0.3 + (i - 2) * 0.15;
      beamMesh.position.set(-15 + i * 8, 20, -10 + i * 2);
      sunbeamGroup.add(beamMesh);
    }
    scene.add(sunbeamGroup);

    // 4. Elegant Whale 3D Geometry
    const whaleGroup = new THREE.Group();
    
    // Body - organic stretched ellipsoid
    const whaleBodyGeo = new THREE.SphereGeometry(3.5, 32, 16);
    whaleBodyGeo.scale(2.4, 0.9, 0.75);
    const whaleMat = new THREE.MeshStandardMaterial({
      color: 0x072d4b,
      roughness: 0.4,
      metalness: 0.2,
      bumpScale: 0.05,
    });
    const whaleBody = new THREE.Mesh(whaleBodyGeo, whaleMat);
    whaleGroup.add(whaleBody);

    // Whale Head Curve
    const whaleHeadGeo = new THREE.SphereGeometry(2.8, 24, 16);
    whaleHeadGeo.scale(1.2, 0.8, 0.7);
    const whaleHead = new THREE.Mesh(whaleHeadGeo, whaleMat);
    whaleHead.position.set(7.5, -0.2, 0);
    whaleGroup.add(whaleHead);

    // Tail Fin group for swimming articulation
    const whaleTailGroup = new THREE.Group();
    whaleTailGroup.position.set(-8.5, 0, 0);

    const tailGeo = new THREE.ConeGeometry(1.6, 6, 16);
    tailGeo.rotateZ(Math.PI / 2);
    tailGeo.scale(1, 0.4, 0.6);
    const tailShaft = new THREE.Mesh(tailGeo, whaleMat);
    tailShaft.position.set(-3, 0, 0);
    whaleTailGroup.add(tailShaft);

    // Fluke (dual fins)
    const flukeShape = new THREE.Shape();
    flukeShape.moveTo(0, 0);
    flukeShape.quadraticCurveTo(2, 4, 0, 5);
    flukeShape.quadraticCurveTo(-1.5, 2, -3.5, 0);
    flukeShape.quadraticCurveTo(-1.5, -2, 0, -5);
    flukeShape.quadraticCurveTo(2, -4, 0, 0);

    const flukeGeo = new THREE.ShapeGeometry(flukeShape);
    flukeGeo.scale(0.8, 0.8, 0.8);
    const flukeMat = new THREE.MeshStandardMaterial({
      color: 0x05233c,
      side: THREE.DoubleSide,
      roughness: 0.5,
    });
    const flukeMesh = new THREE.Mesh(flukeGeo, flukeMat);
    flukeMesh.rotation.y = Math.PI / 2;
    flukeMesh.rotation.x = Math.PI / 2;
    flukeMesh.position.set(-6, 0, 0);
    whaleTailGroup.add(flukeMesh);

    whaleGroup.add(whaleTailGroup);

    // Pectoral flippers (left and right)
    const flipperGeo = new THREE.BoxGeometry(0.3, 0.8, 4.5);
    flipperGeo.rotateX(0.2);
    const leftFlipper = new THREE.Mesh(flipperGeo, whaleMat);
    leftFlipper.position.set(2, -1.2, 3.2);
    leftFlipper.rotation.y = 0.5;
    leftFlipper.rotation.z = -0.3;
    whaleGroup.add(leftFlipper);

    const rightFlipper = new THREE.Mesh(flipperGeo, whaleMat);
    rightFlipper.position.set(2, -1.2, -3.2);
    rightFlipper.rotation.y = -0.5;
    rightFlipper.rotation.z = -0.3;
    whaleGroup.add(rightFlipper);

    whaleGroup.position.set(12, 2, -12);
    whaleGroup.scale.set(0.9, 0.9, 0.9);
    scene.add(whaleGroup);

    // 5. School of Fish (Instanced or Mesh swarm)
    const fishCount = 60;
    const fishGroup = new THREE.Group();
    const fishGeo = new THREE.ConeGeometry(0.35, 1.4, 8);
    fishGeo.rotateZ(Math.PI / 2);
    const fishMat = new THREE.MeshStandardMaterial({
      color: 0x28f0d4,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.3,
      roughness: 0.2,
    });

    const fishInstances: { mesh: THREE.Mesh; angle: number; speed: number; radius: number; y: number }[] = [];
    for (let i = 0; i < fishCount; i++) {
      const fish = new THREE.Mesh(fishGeo, fishMat);
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 12;
      const y = -6 + Math.random() * 14;
      fish.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      fishGroup.add(fish);
      fishInstances.push({
        mesh: fish,
        angle,
        speed: 0.012 + Math.random() * 0.008,
        radius,
        y,
      });
    }
    fishGroup.position.set(-6, 0, -8);
    scene.add(fishGroup);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Handle Window Resize
    const handleResize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const currentDepth = depthRef.current; // 0 to 11000m

      // Normalize depth: 0 is surface, 1 is abyss (11000m)
      const depthRatio = Math.min(1, Math.max(0, currentDepth / 6000));

      // 1. Interpolate Fog & Background based on depth
      // 0m: Vibrant Turquoise (0x033b6a) -> 1000m: Navy (0x021733) -> 4000m+: Pitch Abyss (0x01050e)
      const targetFogColor = new THREE.Color().lerpColors(
        new THREE.Color(0x033b6a),
        new THREE.Color(0x01050e),
        depthRatio
      );
      if (scene.fog) {
        (scene.fog as THREE.FogExp2).color.copy(targetFogColor);
        (scene.fog as THREE.FogExp2).density = 0.02 + depthRatio * 0.025;
      }

      // Sunbeams fade out by 800m
      const sunbeamOpacity = Math.max(0, 1 - currentDepth / 800);
      sunbeamGroup.visible = sunbeamOpacity > 0.01;
      sunbeamLight.intensity = Math.max(0.1, 2.5 * sunbeamOpacity);
      sunbeamGroup.children.forEach((child, i) => {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = (0.08 - i * 0.012) * sunbeamOpacity;
      });

      // Bioluminescence increases with depth
      const biolumIntensity = Math.min(1, depthRatio * 1.5);
      biolumMat.opacity = 0.2 + biolumIntensity * 0.7;
      abyssPointLight.intensity = biolumIntensity * 2.5;

      // 2. Animate Bubbles rising
      const posAttr = bubbleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < bubbleCount; i++) {
        posArray[i * 3 + 1] += bubbleSpeeds[i];
        posArray[i * 3] += Math.sin(elapsedTime * 2 + i) * 0.02; // gentle wobble
        if (posArray[i * 3 + 1] > 35) {
          posArray[i * 3 + 1] = -35;
          posArray[i * 3] = (Math.random() - 0.5) * 80;
        }
      }
      posAttr.needsUpdate = true;

      // 3. Animate Bioluminescent Particles drifting
      const bioAttr = biolumGeo.attributes.position as THREE.BufferAttribute;
      const bioArray = bioAttr.array as Float32Array;
      for (let i = 0; i < biolumCount; i++) {
        bioArray[i * 3] += Math.sin(elapsedTime * 0.8 + i) * 0.015;
        bioArray[i * 3 + 1] += Math.cos(elapsedTime * 0.5 + i) * 0.015;
      }
      bioAttr.needsUpdate = true;

      // 4. Animate Whale swimming along smooth curve
      const whaleCycle = elapsedTime * 0.25;
      whaleGroup.position.x = Math.sin(whaleCycle) * 16;
      whaleGroup.position.z = Math.cos(whaleCycle) * 12 - 10;
      whaleGroup.position.y = Math.sin(whaleCycle * 1.5) * 3 - (depthRatio * 8);
      // Orient whale along velocity tangent
      whaleGroup.rotation.y = Math.atan2(-Math.sin(whaleCycle) * 12, Math.cos(whaleCycle) * 16) + Math.PI / 2;
      whaleGroup.rotation.z = Math.sin(whaleCycle * 2) * 0.08;

      // Articulate tail and fins
      whaleTailGroup.rotation.y = Math.sin(elapsedTime * 1.8) * 0.25;
      leftFlipper.rotation.x = Math.sin(elapsedTime * 1.2) * 0.15;
      rightFlipper.rotation.x = Math.sin(elapsedTime * 1.2 + 0.3) * 0.15;

      // 5. Animate School of Fish
      fishInstances.forEach((f) => {
        f.angle += f.speed;
        f.mesh.position.x = Math.cos(f.angle) * f.radius;
        f.mesh.position.z = Math.sin(f.angle) * f.radius;
        f.mesh.position.y = f.y + Math.sin(elapsedTime * 3 + f.angle) * 0.6;
        f.mesh.rotation.y = -f.angle;
      });

      // 6. Camera Parallax & Depth Descent
      const targetCamX = mouseX * 3.5;
      const targetCamY = mouseY * 2.5 - depthRatio * 6;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, -depthRatio * 5, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bubbleGeo.dispose();
      bubbleMat.dispose();
      biolumGeo.dispose();
      biolumMat.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
};
