'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Control del efecto parallax al hacer scroll
  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animaciones con Framer Motion
  const fadeInUp = {
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    // @ts-ignore
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1 + 0.5,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hover: {
      scale: 1.03,
      boxShadow:
        '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 },
    },
  };

  // Efecto para animar las letras individualmente
  const title = 'Cuida tu piel con la esencia de la naturaleza';
  const titleWords = title.split(' ');

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden min-h-screen flex items-center'
    >
      {/* Formas decorativas avanzadas */}
      <div className='absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-pink-100/20 to-pink-200/30 blur-3xl animate-pulse-slow'></div>
      <div className='absolute top-1/2 left-[5%] w-72 h-72 rounded-full bg-gradient-to-tr from-primary-100/20 to-primary-200/30 blur-3xl animate-float-slow'></div>
      <div className='absolute bottom-1/4 right-[20%] w-48 h-48 rounded-full bg-gradient-to-bl from-secondary-100/20 to-secondary-200/20 blur-3xl animate-float-slow'></div>

      {/* Patrón de puntos decorativo */}
      <div className='absolute inset-0 z-0 opacity-5'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage:
              'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        ></div>
      </div>

      {/* Background Image con Parallax mejorado */}
      <motion.div
        className='absolute inset-0 z-0'
        style={{ y: isMounted ? scrollY * 0.15 : 0 }}
      >
        <Image
          src='/img/bg.jpg'
          alt='Jabones naturales de lujo'
          fill
          style={{ objectFit: 'cover' }}
          priority
          quality={100}
          className='filter brightness-[0.7] contrast-[1.05]'
        />

        {/* Overlay con gradiente moderno */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-primary-900/75 backdrop-blur-[2px]'></div>

        {/* Texturas adicionales */}
        <div className='absolute inset-0 mix-blend-overlay opacity-10'></div>
      </motion.div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-12 items-center'>
          <div className='md:col-span-3'>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={staggerContainer}
              className='text-white'
            >
              {/* Card con glassmorphism moderno */}
              <div className='relative overflow-hidden backdrop-blur-md p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)]'>
                {/* Detalles decorativos */}
                <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent'></div>
                <div className='absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent'></div>

                {/* Badge moderna */}
                <motion.div
                  variants={fadeInUp}
                  className='inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border-l border-t border-white/20'
                >
                  <span className='w-2 h-2 rounded-full bg-secondary-300 animate-pulse'></span>
                  <span className='text-sm tracking-wider uppercase text-white/90 font-medium'>
                    Belleza Natural Orgánica
                  </span>
                </motion.div>

                {/* Título con animación de palabras */}
                <div className='mb-6'>
                  {titleWords.map((word, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: (i) => ({
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: i * 0.08,
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        }),
                      }}
                      className={`inline-block font-serif text-4xl md:text-5xl lg:text-6xl font-bold 
                        ${
                          word === 'esencia'
                            ? 'text-secondary-200 relative'
                            : ''
                        } mr-3 md:mr-4`}
                    >
                      {word}
                      {word === 'esencia' && (
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ delay: 1.5, duration: 0.8 }}
                          className='absolute bottom-1 left-0 h-[6px] bg-secondary-400/30 -z-10 rounded-full'
                        ></motion.div>
                      )}
                    </motion.span>
                  ))}
                </div>

                {/* Descripción con mejor estilización */}
                <motion.p
                  variants={fadeInUp}
                  className='text-lg md:text-xl mb-10 max-w-xl leading-relaxed text-white/90 font-light'
                >
                  Descubre nuestra exclusiva colección de jabones artesanales,
                  formulados con ingredientes 100% naturales y orgánicos para el
                  <span className='relative mx-1'>
                    <span className='relative z-10 font-normal'>
                      cuidado diario
                    </span>
                    <span className='absolute bottom-0 left-0 w-full h-[5px] bg-primary-400/20 rounded-full -z-10'></span>
                  </span>
                  de tu piel.
                </motion.p>

                {/* Botones con diseño moderno */}
                <div className='flex flex-col sm:flex-row gap-4'>
                  <motion.div
                    variants={buttonVariants}
                    custom={0}
                    whileHover='hover'
                    className='relative group'
                  >
                    <div className='absolute inset-0 bg-gradient-to-r from-secondary-500/60 to-primary-500/60 rounded-full blur-md opacity-80 group-hover:opacity-100 transition-opacity'></div>
                    <Link
                      href='/products'
                      className='relative bg-gradient-to-r from-primary-500 to-primary-400 hover:from-primary-400 hover:to-primary-300 text-white px-8 py-4 rounded-full transition-all duration-300 font-medium text-center flex items-center justify-center group overflow-hidden'
                    >
                      <span className='relative z-10'>Ver Productos</span>
                      <span className='relative z-10 ml-2 group-hover:translate-x-1 transition-transform duration-300'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5'
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
                      </span>
                      <div className='absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine'></div>
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={buttonVariants}
                    custom={1}
                    whileHover='hover'
                  >
                    <Link
                      href='/sobre-nosotros'
                      className='bg-transparent text-white px-8 py-4 rounded-full transition-all duration-300 font-medium text-center border border-white/20 hover:bg-white/5 flex items-center justify-center'
                    >
                      <span>Nuestra Historia</span>
                      <span className='ml-2 opacity-60'>→</span>
                    </Link>
                  </motion.div>
                </div>

                {/* Indicadores de confianza */}
                <motion.div
                  variants={fadeInUp}
                  className='flex items-center gap-4 mt-8 pt-6 border-t border-white/10'
                >
                  <div className='flex items-center gap-1.5'>
                    <div className='w-4 h-4 rounded-full bg-green-400/80 flex items-center justify-center'>
                      <svg
                        className='w-2.5 h-2.5 text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'></path>
                      </svg>
                    </div>
                    <span className='text-xs text-white/80'>100% Natural</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <div className='w-4 h-4 rounded-full bg-green-400/80 flex items-center justify-center'>
                      <svg
                        className='w-2.5 h-2.5 text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'></path>
                      </svg>
                    </div>
                    <span className='text-xs text-white/80'>Envío Express</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <div className='w-4 h-4 rounded-full bg-green-400/80 flex items-center justify-center'>
                      <svg
                        className='w-2.5 h-2.5 text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'></path>
                      </svg>
                    </div>
                    <span className='text-xs text-white/80'>Sin Químicos</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Columna de imagen mejorada */}
          <div className='md:col-span-2 hidden md:block'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className='relative'
            >
              <div className='relative h-[600px] w-full'>
                {/* Círculo decorativo con efecto de cristal */}
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/20 overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.15)]'>
                  {/* Reflejos en el círculo */}
                  <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent'></div>
                  <div className='absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-300/10 blur-xl'></div>
                  <div className='absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-secondary-300/10 blur-xl'></div>
                </div>

                {/* Imagen principal con efectos mejorados */}
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 1, 0],
                    filter: [
                      'drop-shadow(0 25px 25px rgba(0,0,0,0.15))',
                      'drop-shadow(0 35px 35px rgba(0,0,0,0.2))',
                      'drop-shadow(0 25px 25px rgba(0,0,0,0.15))',
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: 'easeInOut',
                  }}
                  className='relative z-10'
                >
                  <Image
                    src='/img/jabon.jpg'
                    alt='Jabones naturales premium'
                    fill
                    style={{ objectFit: 'contain' }}
                    className='drop-shadow-2xl'
                  />
                </motion.div>

                {/* Elementos decorativos flotantes modernos */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                    rotate: [0, -3, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  className='absolute top-[15%] right-[10%] z-10'
                >
                  <div className='py-2 px-3 rounded-xl bg-white/90 backdrop-blur-xl shadow-lg border border-white/40 flex items-center gap-2'>
                    <div className='w-3 h-3 rounded-full bg-green-400 animate-pulse'></div>
                    <span className='text-xs font-medium text-primary-800'>
                      100% Natural
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 20, 0],
                    x: [0, -5, 0],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 7,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                  className='absolute bottom-[20%] left-[5%] z-10'
                >
                  <div className='py-2 px-4 rounded-xl bg-white/90 backdrop-blur-xl shadow-lg border border-white/40'>
                    <span className='text-xs font-medium text-primary-800'>
                      Orgánico Certificado
                    </span>
                  </div>
                </motion.div>

                {/* Etiqueta de precio flotante */}
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    x: [0, 3, 0],
                    rotate: [0, -1, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: 'easeInOut',
                    delay: 2,
                  }}
                  className='absolute bottom-[30%] right-[10%] z-10'
                >
                  <div className='py-3 px-4 rounded-full bg-secondary-500/90 text-white shadow-lg flex items-center'>
                    <div className='text-center'>
                      <span className='block text-xs mb-0.5'>Desde</span>
                      <span className='block text-lg font-bold'>9.95</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator modernizado */}
      <motion.div
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className='flex flex-col items-center cursor-pointer'
          animate={{ y: [0, 10, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          <span className='text-white text-sm mb-2 font-light tracking-wider'>
            Explora
          </span>
          <div className='w-8 h-14 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5'>
            <motion.div
              className='w-1.5 h-3 bg-white rounded-full'
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'easeInOut',
              }}
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Estilos adicionales para animaciones */}
      <style jsx global>{`
        @keyframes shine {
          100% {
            right: 125%;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-shine {
          animation: shine 1.2s linear forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
