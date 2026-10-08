import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, ZoomIn, ZoomOut, Maximize2, Minimize2, Sun, Moon, Sparkles, RefreshCw } from 'lucide-react';

export const Furniture3DViewer = ({ 
  initialColor = '#FAF8F5',
  colors = [
    { name: 'Ivory Bouclé', hex: '#FAF8F5' },
    { name: 'Warm Beige', hex: '#E8DED1' },
    { name: 'Cognac Leather', hex: '#96552B' },
    { name: 'Charcoal Velvet', hex: '#242424' },
    { name: 'Forest Green', hex: '#1B4D3E' }
  ],
  modelType = 'chair'
}) => {
  const mountRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightingMode, setLightingMode] = useState('studio'); // 'studio' | 'dramatic' | 'warm'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);

  // Three.js internal references
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const furnitureGroupRef = useRef(null);
  const fabricMaterialsRef = useRef([]);
  const frameMaterialsRef = useRef([]);
  const lightsRef = useRef({});
  const animationFrameIdRef = useRef(null);

  // Interaction tracking
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(lightingMode === 'dramatic' ? 0x181818 : 0xF7F4EE);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.8, 2.2, 3.6);
    camera.lookAt(0, 0.6, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    // Clean any prior canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xfff6e8, 1.8);
    mainKeyLight.position.set(4, 6, 4);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 2048;
    mainKeyLight.shadow.mapSize.height = 2048;
    mainKeyLight.shadow.bias = -0.0001;
    scene.add(mainKeyLight);

    const fillLight = new THREE.DirectionalLight(0xdde9ff, 0.9);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffe2b8, 1.2);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    lightsRef.current = { ambientLight, mainKeyLight, fillLight, rimLight };

    // 5. Floor with soft shadow circle
    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // Subtle pedestal ring
    const ringGeo = new THREE.RingGeometry(1.3, 1.34, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xC6A77B, opacity: 0.25, transparent: true, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.005;
    scene.add(ring);

    // 6. Build Luxury Sculptural Furniture Model
    const furnitureGroup = new THREE.Group();
    furnitureGroupRef.current = furnitureGroup;

    fabricMaterialsRef.current = [];
    frameMaterialsRef.current = [];

    // Main Upholstery Material
    const fabricMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedColor),
      roughness: 0.75,
      metalness: 0.08,
      bumpScale: 0.05
    });
    fabricMaterialsRef.current.push(fabricMat);

    // Solid Walnut Wood Material
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x654832,
      roughness: 0.45,
      metalness: 0.1
    });
    frameMaterialsRef.current.push(woodMat);

    // Brushed Champagne Gold Plinth Material
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xC6A77B,
      roughness: 0.25,
      metalness: 0.85
    });

    // --- Procedural Luxury Armchair Mesh Hierarchy ---
    // A. Main Curved Seat Cushion
    const seatGeo = new THREE.CylinderGeometry(0.72, 0.68, 0.28, 36);
    const seat = new THREE.Mesh(seatGeo, fabricMat);
    seat.position.y = 0.46;
    seat.castShadow = true;
    seat.receiveShadow = true;
    furnitureGroup.add(seat);

    // B. Soft Topper Tufted Cushion
    const topperGeo = new THREE.CylinderGeometry(0.66, 0.7, 0.14, 36);
    const topper = new THREE.Mesh(topperGeo, fabricMat);
    topper.position.y = 0.62;
    topper.castShadow = true;
    furnitureGroup.add(topper);

    // C. Sculptural Enveloping Curved Barrel Backrest
    const backOuterGeo = new THREE.CylinderGeometry(0.74, 0.74, 0.8, 36, 1, true, 0, Math.PI * 1.25);
    const backOuterMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedColor),
      roughness: 0.7,
      side: THREE.DoubleSide
    });
    fabricMaterialsRef.current.push(backOuterMat);
    const backOuter = new THREE.Mesh(backOuterGeo, backOuterMat);
    backOuter.position.set(0, 0.9, -0.05);
    backOuter.rotation.y = -Math.PI * 0.625;
    backOuter.castShadow = true;
    furnitureGroup.add(backOuter);

    // Deep Lumbar Pillow
    const pillowGeo = new THREE.BoxGeometry(0.6, 0.35, 0.16);
    const pillow = new THREE.Mesh(pillowGeo, fabricMat);
    pillow.position.set(0, 0.78, -0.32);
    pillow.rotation.x = 0.2;
    pillow.castShadow = true;
    furnitureGroup.add(pillow);

    // Walnut Wooden Base Cradle
    const baseDiscGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.08, 36);
    const baseDisc = new THREE.Mesh(baseDiscGeo, woodMat);
    baseDisc.position.y = 0.30;
    baseDisc.castShadow = true;
    baseDisc.receiveShadow = true;
    furnitureGroup.add(baseDisc);

    // 4 Splayed Walnut Tapered Legs with Brass Tips
    const legPositions = [
      { x: 0.45, z: 0.45, rotX: -0.15, rotZ: 0.15 },
      { x: -0.45, z: 0.45, rotX: -0.15, rotZ: -0.15 },
      { x: 0.45, z: -0.45, rotX: 0.15, rotZ: 0.15 },
      { x: -0.45, z: -0.45, rotX: 0.15, rotZ: -0.15 }
    ];

    legPositions.forEach(pos => {
      const legGroup = new THREE.Group();
      legGroup.position.set(pos.x, 0.26, pos.z);
      legGroup.rotation.x = pos.rotX;
      legGroup.rotation.z = pos.rotZ;

      // Wooden Upper Leg
      const legGeo = new THREE.CylinderGeometry(0.035, 0.022, 0.28, 16);
      const leg = new THREE.Mesh(legGeo, woodMat);
      leg.position.y = -0.14;
      leg.castShadow = true;
      legGroup.add(leg);

      // Brass Ferrule Cap
      const ferruleGeo = new THREE.CylinderGeometry(0.023, 0.021, 0.08, 16);
      const ferrule = new THREE.Mesh(ferruleGeo, goldMat);
      ferrule.position.y = -0.25;
      legGroup.add(ferrule);

      furnitureGroup.add(legGroup);
    });

    scene.add(furnitureGroup);

    // 7. Mouse / Touch Orbit Controls (Clean custom implementation)
    const dom = renderer.domElement;

    const handlePointerDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = {
        x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0
      };
    };

    const handlePointerMove = (e) => {
      if (!isDraggingRef.current || !furnitureGroupRef.current) return;

      const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      const deltaX = currentX - previousMousePositionRef.current.x;
      const deltaY = currentY - previousMousePositionRef.current.y;

      furnitureGroupRef.current.rotation.y += deltaX * 0.01;
      
      // Tilt camera pitch slightly
      if (cameraRef.current) {
        cameraRef.current.position.y = THREE.MathUtils.clamp(
          cameraRef.current.position.y + deltaY * 0.005,
          0.8,
          4.5
        );
        cameraRef.current.lookAt(0, 0.6, 0);
      }

      previousMousePositionRef.current = { x: currentX, y: currentY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const zoomFactor = e.deltaY * 0.002;
      const currentDistance = cameraRef.current.position.length();
      const newDistance = THREE.MathUtils.clamp(currentDistance + zoomFactor, 2.0, 6.0);
      cameraRef.current.position.setLength(newDistance);
    };

    dom.addEventListener('mousedown', handlePointerDown);
    dom.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    // 8. Render Animation Loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (autoRotate && !isDraggingRef.current && furnitureGroupRef.current) {
        furnitureGroupRef.current.rotation.y += 0.006;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 480;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handlePointerDown);
      dom.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
      dom.removeEventListener('wheel', handleWheel);

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [lightingMode]);

  // Update Color in real-time
  const handleColorChange = (hex) => {
    setSelectedColor(hex);
    fabricMaterialsRef.current.forEach(mat => {
      mat.color.set(hex);
    });
  };

  // Zoom controls
  const handleZoom = (direction) => {
    if (!cameraRef.current) return;
    const currentDistance = cameraRef.current.position.length();
    const factor = direction === 'in' ? -0.4 : 0.4;
    const newDistance = THREE.MathUtils.clamp(currentDistance + factor, 2.0, 6.0);
    cameraRef.current.position.setLength(newDistance);
  };

  const handleReset = () => {
    if (!furnitureGroupRef.current || !cameraRef.current) return;
    furnitureGroupRef.current.rotation.set(0, 0, 0);
    cameraRef.current.position.set(2.8, 2.2, 3.6);
    cameraRef.current.lookAt(0, 0.6, 0);
  };

  return (
    <div className={`relative bg-[#FAF8F5] rounded-2xl sm:rounded-3xl overflow-hidden border border-gold/30 shadow-luxury transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'w-full h-[360px] sm:h-[480px] lg:h-[520px]'}`}>
      {/* 3D Canvas Mount Point */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      />

      {/* Top Overlay Badge & Header */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-charcoal/85 text-ivory text-[10px] sm:text-xs font-medium backdrop-blur-md border border-gold/40 shadow-md">
          <Rotate3d className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold animate-spin" style={{ animationDuration: '8s' }} />
          <span>Interactive 360° Studio</span>
        </div>
        <span className="hidden sm:inline-block text-xs text-charcoal/70 bg-white/70 px-3 py-1.5 rounded-full backdrop-blur-sm border border-charcoal/10">
          Drag to rotate • Pinch to zoom
        </span>
      </div>

      {/* Top Right Controls (Fullscreen, Reset, Lighting) */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => setLightingMode(prev => prev === 'studio' ? 'dramatic' : 'studio')}
          title="Toggle Studio Lighting"
          className="p-1.5 sm:p-2.5 rounded-full bg-white/80 hover:bg-white text-charcoal shadow-md border border-charcoal/10 transition-transform active:scale-95"
        >
          {lightingMode === 'studio' ? <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-walnut" /> : <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" />}
        </button>
        <button
          onClick={handleReset}
          title="Reset Camera Angle"
          className="p-1.5 sm:p-2.5 rounded-full bg-white/80 hover:bg-white text-charcoal shadow-md border border-charcoal/10 transition-transform active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-charcoal" />
        </button>
        <button
          onClick={() => setIsFullscreen(prev => !prev)}
          title="Toggle Fullscreen"
          className="p-1.5 sm:p-2.5 rounded-full bg-white/80 hover:bg-white text-charcoal shadow-md border border-charcoal/10 transition-transform active:scale-95"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </button>
      </div>

      {/* Dimension Overlay Badge */}
      {showDimensions && (
        <div className="absolute top-14 left-3 sm:top-16 sm:left-4 z-10 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-gold/30 text-[10px] sm:text-xs text-charcoal space-y-0.5 sm:space-y-1 shadow-lg pointer-events-none">
          <p className="font-semibold text-walnut">Architectural Specs</p>
          <p>Width: <span className="font-medium">88 cm</span></p>
          <p>Depth: <span className="font-medium">92 cm</span></p>
          <p>Height: <span className="font-medium">82 cm</span></p>
          <p>Seat Height: <span className="font-medium">41 cm</span></p>
        </div>
      )}

      {/* Bottom Floating Toolbar: Color Swatches & Zoom */}
      <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex flex-wrap items-center justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md border border-gold/30 shadow-lg">
        {/* Color Palette Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] sm:text-xs font-medium text-charcoal/80 mr-1 hidden sm:inline">Fabric & Finish:</span>
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => handleColorChange(c.hex)}
              className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full transition-all duration-200 border-2 flex items-center justify-center ${selectedColor === c.hex ? 'border-charcoal scale-110 shadow-md ring-1 sm:ring-2 ring-gold/50' : 'border-white/80 hover:scale-105'}`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            >
              {selectedColor === c.hex && (
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-charcoal"></span>
              )}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2 ml-auto">
          <button
            onClick={() => setAutoRotate(prev => !prev)}
            className={`px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs rounded-lg transition-colors border ${autoRotate ? 'bg-walnut text-ivory border-walnut' : 'bg-white text-charcoal border-charcoal/20'}`}
          >
            {autoRotate ? '360° On' : '360° Off'}
          </button>
          <button
            onClick={() => setShowDimensions(prev => !prev)}
            className={`px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs rounded-lg transition-colors border ${showDimensions ? 'bg-gold text-charcoal-900 font-semibold border-gold' : 'bg-white text-charcoal border-charcoal/20'}`}
          >
            {showDimensions ? 'Hide' : 'Specs'}
          </button>
          <button
            onClick={() => handleZoom('in')}
            title="Zoom In"
            className="p-1 sm:p-1.5 rounded-lg bg-white hover:bg-beige-100 text-charcoal border border-charcoal/20 active:scale-95"
          >
            <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            title="Zoom Out"
            className="p-1 sm:p-1.5 rounded-lg bg-white hover:bg-beige-100 text-charcoal border border-charcoal/20 active:scale-95"
          >
            <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
