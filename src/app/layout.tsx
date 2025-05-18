// import { Montserrat, Cormorant_Garamond } from 'next/font';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartProvider from '@/context/CartContext';

// const montserrat = Montserrat({
//   subsets: ['latin'],
//   variable: '--font-montserrat',
//   display: 'swap',
//   weight: ['300', '400', '500', '600', '700'],
// });

// // Cormorant Garamond - Una fuente serif elegante y sofisticada para títulos
// const cormorant = Cormorant_Garamond({
//   subsets: ['latin'],
//   variable: '--font-cormorant',
//   display: 'swap',
//   weight: ['400', '500', '600', '700'],
// });

export const metadata = {
  title: 'Afrodita | Jabones naturales para el cuidado de tu piel',
  description:
    'Descubre nuestra colección de jabones artesanales elaborados con ingredientes naturales para el cuidado y bienestar de tu piel.',
};

// @ts-expect-error Ignorar tipado implícito por compatibilidad
export default function RootLayout({ children }) {
  return (
    // <html lang='es' className={`${montserrat.variable} ${cormorant.variable}`}>
    <html lang='es'>
      <body className='min-h-screen flex flex-col bg-primary-50 font-sans'>
        <CartProvider>
          <Navbar />
          <main className='flex-grow'>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
