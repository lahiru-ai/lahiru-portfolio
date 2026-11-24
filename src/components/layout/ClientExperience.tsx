'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const GlobalBackground3D = dynamic(
  () => import('@/components/3d/GlobalBackground3D'),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import('@/components/ui/CustomCursor'),
  { ssr: false }
);

export default function ClientExperience() {
  return (
    <>
      <GlobalBackground3D />
      <CustomCursor />
    </>
  );
}
