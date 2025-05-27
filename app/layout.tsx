import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/custom-cursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Victor Torres - Developer',
  description: 'Portfólio de Victor Torres - Desenvolvedor especializado em criar experiências digitais incríveis',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
