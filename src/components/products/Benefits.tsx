'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  return (
    <section ref={ref} className='py-24 relative overflow-hidden bg-primary-50'>
      {/* Elementos decorativos de fondo */}
      <motion.div style={{ y, opacity }} className='absolute inset-0 z-0'>
        <div className='absolute top-20 right-20 w-64 h-64 rounded-full bg-primary-200/40 blur-3xl'></div>
        <div className='absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-rose-200/30 blur-3xl'></div>
        <div className='absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-mint-200/30 blur-3xl'></div>

        {/* Patrón sutil */}
        <div className='absolute inset-0 pattern-dots opacity-20'></div>
      </motion.div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className='text-center mb-16'
        >
          <span className='inline-block text-sm font-medium text-primary-600 mb-2 tracking-wider uppercase bg-primary-100 px-3 py-1 rounded-full'>
            Jabones naturales
          </span>
          <h2 className='font-serif text-3xl md:text-4xl font-bold text-primary-800 mb-4'>
            Beneficios Para Tu Piel y el Planeta
          </h2>
          <p className='text-neutral-600 max-w-2xl mx-auto'>
            Descubre por qué nuestros jabones artesanales son la elección
            perfecta para el cuidado diario de tu piel, combinando la tradición
            artesanal con ingredientes naturales de la más alta calidad.
          </p>
        </motion.div>

        {/* Sección de estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className='mt-20 bg-white rounded-2xl shadow-soft p-8 md:p-12'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4'>
                <svg
                  className='w-8 h-8'
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
              </div>
              <span className='block text-4xl font-bold text-primary-800 mb-1'>
                100%
              </span>
              <span className='text-neutral-600'>Ingredientes naturales</span>
            </div>

            <div className='text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 text-secondary-600 mb-4'>
                <svg
                  className='w-8 h-8'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
              </div>
              <span className='block text-4xl font-bold text-primary-800 mb-1'>
                0%
              </span>
              <span className='text-neutral-600'>Químicos dañinos</span>
            </div>

            <div className='text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-mint-100 text-mint-600 mb-4'>
                <svg
                  className='w-8 h-8'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                  ></path>
                </svg>
              </div>
              <span className='block text-4xl font-bold text-primary-800 mb-1'>
                15+
              </span>
              <span className='text-neutral-600'>Variedades disponibles</span>
            </div>

            <div className='text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 text-rose-600 mb-4'>
                <svg
                  className='w-8 h-8'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
              </div>
              <span className='block text-4xl font-bold text-primary-800 mb-1'>
                10k+
              </span>
              <span className='text-neutral-600'>Clientes satisfechos</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animación decorativa: burbujas flotantes */}
      <div className='absolute bottom-0 left-0 right-0 h-40 overflow-hidden opacity-70 pointer-events-none'>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute bottom-0 rounded-full bg-white/50 backdrop-blur-sm'
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
            }}
            animate={{
              y: [200, -100],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* CTA Section */}
      <section className='py-16 bg-primary-900 relative overflow-hidden'>
        {/* Elementos decorativos */}
        <div className='absolute -top-10 -right-10 w-64 h-64 rounded-full bg-primary-800/50 blur-3xl'></div>
        <div className='absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-secondary-900/30 blur-3xl'></div>
        <div className='absolute inset-0 pattern-dots opacity-10'></div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='max-w-4xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className='font-serif text-3xl md:text-4xl font-bold mb-6'>
                Descubre la diferencia de NaturaSoap
              </h2>
              <p className=' text-lg mb-8 max-w-3xl mx-auto'>
                Explora nuestra colección de jabones artesanales y productos
                para el cuidado de la piel, elaborados con ingredientes
                naturales seleccionados para nutrir tu piel y respetar el
                planeta.
              </p>
              <Link
                href='/products'
                className='inline-flex items-center bg-white hover:bg-neutral-100 text-primary-800 font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all'
              >
                Ver productos
                <svg
                  className='ml-2 w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
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
      </section>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8'
      >
        <div className='bg-primary-50 rounded-xl p-6 text-center'>
          <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-100 text-primary-600 mb-4'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
          </div>
          <span className='block text-3xl font-bold text-primary-800 mb-1'>
            Satisfacción garantizada
          </span>
          <span className='text-neutral-600'>O te devolvemos tu dinero</span>
        </div>

        <div className='bg-secondary-50 rounded-xl p-6 text-center'>
          <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary-100 text-secondary-600 mb-4'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 10V3L4 14h7v7l9-11h-7z'
              ></path>
            </svg>
          </div>
          <span className='block text-3xl font-bold text-primary-800 mb-1'>
            Envío rápido
          </span>
          <span className='text-neutral-600'>En 24-48 horas en península</span>
        </div>

        <div className='bg-rose-50 rounded-xl p-6 text-center'>
          <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-100 text-rose-600 mb-4'>
            <svg
              className='w-6 h-6'
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
          </div>
          <span className='block text-3xl font-bold text-primary-800 mb-1'>
            Atención personalizada
          </span>
          <span className='text-neutral-600'>Estamos aquí para ayudarte</span>
        </div>
      </motion.div>
    </section>
  );
}
