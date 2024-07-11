import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/main.scss';
import { IBasicLayout } from '@/src/types/types';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Currency Converter',
  description: 'Welcome to Currency Converter',
};

const RootLayout = ({ children }: Readonly<IBasicLayout>) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
