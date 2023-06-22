import Header from '@/components/Header';
import Footer from '@/components/Footer';

import './globals.css';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: 'Simple Blog',
  description: 'A simple blog presented by microCMS',
  openGraph: {
    title: 'Simple Blog',
    description: 'A simple blog presented by microCMS',
    images: '/ogp.png',
  },
  alternates: {
    canonical: '/',
  },
};

type Props = {
  children: React.ReactNode;
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
      </body>
    </html>
  );
}
