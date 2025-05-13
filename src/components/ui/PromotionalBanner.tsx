'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Banner Promocional Flotante
export function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Solo mostrar si no ha sido cerrado previamente
      const bannerDismissed = localStorage.getItem('bannerDismissed');
      if (!bannerDismissed) {
        setIsVisible(true);
      }
    }, 3000); // Mostrar después de 3 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // Guardar el estado en localStorage para no mostrarlo de nuevo
    localStorage.setItem('bannerDismissed', 'true');
  };

  // Si ya fue cerrado, no renderizar el componente
  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className='fixed bottom-5 right-5 z-50 max-w-md'
        >
          <div className='bg-white rounded-xl shadow-elegant p-4 glass-effect backdrop-blur-md bg-white/70 border border-white/10'>
            <div className='flex items-start'>
              <div className='flex-1'>
                <div className='flex items-center mb-2'>
                  <span className='inline-block text-xs font-bold text-white bg-secondary-500 px-2 py-1 rounded-full mr-2'>
                    OFERTA
                  </span>
                  <h3 className='font-medium text-primary-800'>
                    ¡Envío gratis en tu primer pedido!
                  </h3>
                </div>
                <p className='text-sm text-neutral-600 mb-3'>
                  Usa el código{' '}
                  <span className='font-bold text-secondary-600'>
                    NATURAL10
                  </span>{' '}
                  y recibe un 10% de descuento adicional.
                </p>
                <div className='flex space-x-2'>
                  <Link
                    href='/products'
                    className='text-sm bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors font-medium'
                  >
                    Ver productos
                  </Link>
                  <button
                    onClick={handleDismiss}
                    className='text-sm text-neutral-500 hover:text-neutral-700 px-2 py-2 transition-colors'
                  >
                    Ahora no
                  </button>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className='text-neutral-400 hover:text-neutral-600 p-1'
                aria-label='Cerrar'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Sección de Llamada a la Acción (CTA)
export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className='py-20 relative overflow-hidden bg-gradient-to-r from-primary-900 to-primary-800 text-white'
    >
      {/* Elementos decorativos */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-full pattern-dots opacity-10'></div>
        <div className='absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary-700/50 blur-3xl'></div>
        <div className='absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-primary-700/30 blur-3xl'></div>

        {/* Formas flotantes */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className='absolute top-20 right-[20%] w-24 h-24 rounded-full bg-secondary-500/10 backdrop-blur-sm'
        ></motion.div>

        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: 'easeInOut',
            delay: 1,
          }}
          className='absolute bottom-20 left-[20%] w-16 h-16 rounded-full bg-secondary-500/10 backdrop-blur-sm'
        ></motion.div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className='font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6'>
              Transforma tu rutina de cuidado con jabones 100% naturales
            </h2>
            <p className='text-white/90 text-lg mb-8 max-w-xl'>
              Tu piel merece lo mejor. Descubre nuestra colección de jabones
              artesanales elaborados con ingredientes orgánicos y técnicas
              tradicionales para una experiencia única.
            </p>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                href='/productos'
                className='btn-primary bg-white hover:bg-neutral-100 text-primary-800 rounded-full text-center py-4 px-8 shadow-lg hover:shadow-xl transition-all duration-300 font-medium'
              >
                Ver catálogo
              </Link>
              <Link
                href='/sobre-nosotros'
                className='btn-outline border border-white/30 hover:bg-white/10 text-white rounded-full text-center py-4 px-8 transition-colors font-medium'
              >
                Conocer más
              </Link>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap gap-3 mt-8'>
              <div className='flex items-center bg-white/10 rounded-full px-3 py-2'>
                <svg
                  className='w-4 h-4 mr-2 text-secondary-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  ></path>
                </svg>
                <span className='text-sm'>Envío gratis + RD$ 50</span>
              </div>
              <div className='flex items-center bg-white/10 rounded-full px-3 py-2'>
                <svg
                  className='w-4 h-4 mr-2 text-secondary-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
                <span className='text-sm'>Entrega 24/48h</span>
              </div>
              <div className='flex items-center bg-white/10 rounded-full px-3 py-2'>
                <svg
                  className='w-4 h-4 mr-2 text-secondary-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  ></path>
                </svg>
                <span className='text-sm'>Pago seguro</span>
              </div>
            </div>
          </motion.div>

          {/* Imagen/Producto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className='relative h-[500px]'
          >
            <div className='absolute inset-0 flex items-center justify-center'>
              {/* Círculo decorativo grande */}
              <div className='absolute w-[350px] h-[350px] rounded-full bg-gradient-to-br from-white/10 to-white/5'></div>

              {/* Imagen central con efecto flotante */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: 'easeInOut',
                }}
                className='relative z-10'
              >
                <Image
                  src='/img/product-bundle.png' // Imagen del paquete de jabones con fondo transparente
                  alt='Kit de jabones naturales'
                  width={400}
                  height={400}
                  className='drop-shadow-2xl'
                />
              </motion.div>

              {/* Elementos flotantes alrededor */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className='absolute top-[20%] right-[15%] w-16 h-16 rounded-full bg-secondary-500/20 backdrop-blur-md flex items-center justify-center shadow-lg'
              >
                <span className='text-xs font-medium'>Premium</span>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  x: [0, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 7,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className='absolute bottom-[20%] left-[10%] w-20 h-20 rounded-full bg-primary-400/20 backdrop-blur-md flex items-center justify-center shadow-lg'
              >
                <span className='text-xs font-medium'>Natural</span>
              </motion.div>

              {/* Tarjeta de oferta flotante */}
              <motion.div
                animate={{
                  y: [10, -10, 10],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: 'easeInOut',
                  delay: 2,
                }}
                className='absolute bottom-[5%] right-[5%] bg-white rounded-lg shadow-xl p-3 text-primary-800'
              >
                <div className='text-center'>
                  <span className='text-xs text-neutral-500'>Descuento</span>
                  <div className='text-xl font-bold text-secondary-600'>
                    -15%
                  </div>
                  <span className='text-xs'>¡Primera compra!</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Separador ondulado */}
      <div className='absolute bottom-0 left-0 w-full overflow-hidden'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
          className='w-full h-12 text-white'
        >
          <path
            d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,66,56.44,321.39,56.44z'
            fill='currentColor'
          ></path>
        </svg>
      </div>
    </section>
  );
}
