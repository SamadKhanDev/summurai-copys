'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

interface CurvedPlaneProps {
  width?: number;
  height?: number;
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  children?: React.ReactNode;
  [key: string]: any;
}

export default function CurvedPlane({
  width = 3.2,
  height = 2,
  radius = 3,
  widthSegments = 32,
  heightSegments = 1,
  children,
  ...props
}: CurvedPlaneProps) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    const pos = geo.attributes.position;
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      // Map flat x coordinate to cylindrical angle
      const angle = x / radius;
      // Map to cylinder coords, centered locally at (0, 0, 0)
      const newX = Math.sin(angle) * radius;
      const newZ = (Math.cos(angle) - 1) * radius;
      
      pos.setX(i, newX);
      pos.setZ(i, newZ);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, [width, height, radius, widthSegments, heightSegments]);

  return (
    <mesh geometry={geometry} {...props}>
      {children}
    </mesh>
  );
}
