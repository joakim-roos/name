'use client';

import React from 'react';

import { AnalyticsProvider } from './analytics-provider';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AnalyticsProvider />
    </>
  );
}
export { Providers };
