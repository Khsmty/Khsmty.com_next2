import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import GA from '@/components/GA';

import './globals.scss';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: '%s - Khsmty',
    default: 'Khsmty',
  },
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main className="mx-auto mb-0 mt-24 max-w-4xl px-4 lg:px-0">
          {children}
        </main>
        <Footer />

        <GA />
      </body>
    </html>
  );
}
