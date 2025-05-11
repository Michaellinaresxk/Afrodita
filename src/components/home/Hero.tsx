'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  // Control del efecto parallax al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animaciones con Framer Motion
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    // @ts-expect-error Ignorar tipado implícito por compatibilidad
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1 + 0.6,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className='relative overflow-hidden min-h-screen flex items-center'>
      {/* Formas decorativas de fondo */}
      <div className='absolute top-20 right-10 md:right-40 w-64 h-64 rounded-full bg-gradient-to-br from-pink-100/20 to-pink-200/30 blur-3xl'></div>
      <div className='absolute bottom-20 left-10 md:left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-primary-100/30 to-primary-200/20 blur-3xl'></div>

      {/* Background Image con Parallax */}
      <motion.div
        className='absolute inset-0 z-0'
        style={{ y: scrollY * 0.2 }} // Efecto parallax suave
      >
        <Image
          src='/img/bg.jpg'
          alt='Jabones naturales de lujo'
          fill
          style={{ objectFit: 'cover' }}
          priority
          quality={100}
          className='filter brightness-75' // Oscurecemos un poco más la imagen
        />
        {/* Overlay con mayor opacidad para mejor contraste */}
        <div className='absolute inset-0 bg-gradient-to-r from-primary-900/70 to-primary-800/60 backdrop-blur-[1px]'></div>
      </motion.div>

      {/* Overlay con patrón sutil */}
      <div className="absolute inset-0 z-1 opacity-10 bg-[url('/img/pattern.png')]"></div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <div>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className='text-white'
            >
              {/* Mejora del contraste con un fondo semitransparente */}
              <div className='bg-primary-900/30 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl'>
                <motion.span
                  variants={textVariants}
                  className='inline-block mb-3 text-sm md:text-base font-medium tracking-wider text-white uppercase border-b border-secondary-300/60 pb-1'
                >
                  Belleza Natural Orgánica
                </motion.span>

                <motion.h1
                  variants={textVariants}
                  className='font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6'
                >
                  Cuida tu piel con <br />
                  <span className='text-secondary-200'>la esencia</span> de la
                  naturaleza
                </motion.h1>

                <motion.p
                  variants={textVariants}
                  className='text-lg md:text-xl mb-8 max-w-lg leading-relaxed text-white'
                >
                  Descubre nuestra exclusiva colección de jabones artesanales,
                  formulados con ingredientes 100% naturales y orgánicos para el
                  cuidado diario de tu piel.
                </motion.p>

                <div className='flex flex-col sm:flex-row gap-5'>
                  <motion.div
                    variants={buttonVariants}
                    custom={0}
                    whileHover='hover'
                  >
                    <Link
                      href='/productos'
                      className='bg-gradient-to-r from-primary-500 to-primary-400 hover:from-primary-400 hover:to-primary-300 text-white px-8 py-3.5 rounded-full transition-all duration-300 font-medium text-center shadow-lg shadow-primary-600/30 flex items-center justify-center group'
                    >
                      Ver Productos
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M14 5l7 7m0 0l-7 7m7-7H3'
                        />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className='hidden md:block'
          >
            <div className='relative h-[550px] w-full'>
              {/* Fondo del producto con mayor contraste */}
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md'></div>

              {/* Imagen principal con sombras y efectos */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: 'easeInOut',
                }}
                className='relative z-10'
              >
                <Image
                  src='/img/soap-product.png' // Reemplazar con imagen de jabón con fondo transparente
                  alt='Jabones naturales premium'
                  fill
                  style={{ objectFit: 'contain' }}
                  className='drop-shadow-2xl'
                />
              </motion.div>

              {/* Elementos decorativos flotantes con mejor contraste */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className='absolute top-[20%] right-[15%] w-16 h-16 rounded-full bg-white/80 backdrop-blur-md z-10 shadow-xl'
              >
                <div className='absolute inset-0 flex items-center justify-center'>
                  <span className='text-xs font-medium text-primary-800'>
                    100% Natural
                  </span>
                </div>
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
                  delay: 0.5,
                }}
                className='absolute bottom-[20%] left-[10%] w-20 h-20 rounded-full bg-white/80 backdrop-blur-md z-10 shadow-xl'
              >
                <div className='absolute inset-0 flex items-center justify-center'>
                  <span className='text-xs font-medium text-primary-800'>
                    Orgánico
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator con animación mejorada */}
      <motion.div
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10'
        animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <div className='flex flex-col items-center'>
          <span className='text-white text-sm mb-2 font-medium tracking-wider'>
            Explora
          </span>
          <svg
            className='w-8 h-8 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='M19 14l-7 7m0 0l-7-7m7 7V3'
            ></path>
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
