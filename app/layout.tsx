import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/main.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Currency Converter',
  description: 'Welcome to Currency Converter',
};

interface IRootLayout {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<IRootLayout>) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
