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
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Optional localStorage sync for local draft editing without backend complexity
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lahiru_portfolio_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.personalInfo) {
          setData(parsed);
        }
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  const updateData = (newData: Partial<PortfolioData>) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      try {
        localStorage.setItem('lahiru_portfolio_draft', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updatePersonalInfo = (info: Partial<PortfolioData['personalInfo']>) => {
    setData((prev) => {
      const updated = {
        ...prev,
        personalInfo: { ...prev.personalInfo, ...info },
      };
      try {
        localStorage.setItem('lahiru_portfolio_draft', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateAvailability = (status: 'available' | 'busy' | 'selective', label: string) => {
    setData((prev) => {
      const updated = {
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          availability: {
            ...prev.personalInfo.availability,
            status,
            label,
          },
        },
      };
      try {
        localStorage.setItem('lahiru_portfolio_draft', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const resetToDefault = () => {
    setData(initialPortfolioData);
    try {
      localStorage.removeItem('lahiru_portfolio_draft');
    } catch {}
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        updatePersonalInfo,
        updateAvailability,
        resetToDefault,
        isAdminOpen,
        setIsAdminOpen,
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
