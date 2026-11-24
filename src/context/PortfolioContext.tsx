'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { initialPortfolioData } from '@/data/portfolioData';

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: Partial<PortfolioData>) => void;
  updatePersonalInfo: (info: Partial<PortfolioData['personalInfo']>) => void;
  updateAvailability: (status: 'available' | 'busy' | 'selective', label: string) => void;
  resetToDefault: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: PortfolioData;
}) {
  const [data, setData] = useState<PortfolioData>(initialData || initialPortfolioData);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const updateData = (newData: Partial<PortfolioData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const updatePersonalInfo = (info: Partial<PortfolioData['personalInfo']>) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateAvailability = (status: 'available' | 'busy' | 'selective', label: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        availability: {
          ...prev.personalInfo.availability,
          status,
          label,
        },
      },
    }));
  };

  const resetToDefault = () => {
    setData(initialData || initialPortfolioData);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        updatePersonalInfo,
        updateAvailability,
        resetToDefault,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
