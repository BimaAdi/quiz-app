"use client";
import React, { ReactNode } from 'react';
import TrpcProvider from './TrpcProvider';

export function Provider({ children }: { children: ReactNode }) {
  return (
    <TrpcProvider>{children}</TrpcProvider>
  );
}

