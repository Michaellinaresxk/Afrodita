import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'Natura Soap | Jabones naturales para el cuidado de tu piel',
  description:
    'Descubre nuestra colección de jabones artesanales elaborados con ingredientes naturales para el cuidado y bienestar de tu piel.',
};
// @ts-expect-error Ignorar tipado implícito por compatibilidad
export default function RootLayout({ children }) {
  return (
    <html lang='es' className={`${inter.variable} ${playfair.variable}`}>
      <body className='min-h-screen flex flex-col bg-primary-50'>
        <Navbar />
        <main className='flex-grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
