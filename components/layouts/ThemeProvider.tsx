'use client';

import React from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

interface Props {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  return (
    <NextThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </NextThemeProvider>
  );
}
