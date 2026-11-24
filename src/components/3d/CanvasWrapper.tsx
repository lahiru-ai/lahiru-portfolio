'use client';

import React, { Suspense, useEffect, useState, Component, ErrorInfo } from 'react';
import { isWebGLAvailable } from '@/lib/webgl';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ThreeErrorBoundary extends Component<{ children: React.ReactNode; fallback: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('3D Canvas encountered an error, falling back gracefully:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function CanvasWrapper({
  children,
  fallback,
  className = '',
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setMounted(true);
    setWebGLSupported(isWebGLAvailable());
  }, []);

  const defaultFallback = (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      {/* Ambient static gradient fallback */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-purple-950/20 pointer-events-none" />
      <div className="w-48 h-48 rounded-full bg-blue-600/10 blur-[80px] pointer-events-none" />
    </div>
  );

  if (!mounted || !webGLSupported) {
    return <>{fallback || defaultFallback}</>;
  }

  return (
    <ThreeErrorBoundary fallback={fallback || defaultFallback}>
      <Suspense fallback={fallback || defaultFallback}>
        <div className={`relative ${className}`}>
          {children}
        </div>
      </Suspense>
    </ThreeErrorBoundary>
  );
}
