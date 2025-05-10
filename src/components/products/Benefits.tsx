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
    <section ref={ref} className='py-24 relative overflow-hidden bg-white'>
      {/* Background Shapes */}
      <motion.div
        style={{ y, opacity }}
        className='absolute inset-0 z-0 flex items-center justify-center'
      >
        <div className='absolute top-1/4 left-1/4 w-40 h-40 bg-primary-100 rounded-full blur-2xl opacity-40'></div>
        <div className='absolute top-1/3 right-1/4 w-64 h-64 bg-secondary-100 rounded-full blur-3xl opacity-50'></div>
        <div className='absolute bottom-1/4 left-1/3 w-80 h-80 bg-rose-100 rounded-full blur-3xl opacity-60'></div>
      </motion.div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Title and Description */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className='text-center mb-12'
        >
          <span className='inline-block text-sm font-medium text-primary-600 mb-2 tracking-wider uppercase bg-primary-50 px-3 py-1 rounded-full'>
            Jabones naturales
          </span>
          <h2 className='font-serif text-3xl md:text-4xl font-bold text-primary-900 mb-4'>
            Beneficios para tu piel y el planeta
          </h2>
          <p className='text-neutral-600 max-w-2xl mx-auto'>
            Descubre por qué nuestros jabones artesanales son la elección
            perfecta para el cuidado diario de tu piel, combinando la tradición
            artesanal con ingredientes naturales de la más alta calidad.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-neutral-50 rounded-2xl shadow-md p-8 md:p-12'
        >
          {/* Benefit 1 */}
          <div className='flex items-start'>
            <div className='w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-4'>
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
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-primary-800 mb-1'>
                100% Natural
              </h3>
              <p className='text-neutral-600 text-sm'>
                Sin químicos ni fragancias artificiales.
              </p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className='flex items-start'>
            <div className='w-12 h-12 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center mr-4'>
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
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-primary-800 mb-1'>
                Producción Sostenible
              </h3>
              <p className='text-neutral-600 text-sm'>
                Respetuoso con el medio ambiente.
              </p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className='flex items-start'>
            <div className='w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mr-4'>
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
                  d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                />
              </svg>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-primary-800 mb-1'>
                Dermatológicamente Testado
              </h3>
              <p className='text-neutral-600 text-sm'>
                Suave con todo tipo de pieles.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bubbles */}
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
      <section className='py-16 bg-primary-900 relative overflow-hidden CTA-bg'>
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
              <h2 className='font-serif text-3xl md:text-4xl font-bold mb-6 text-white'>
                Descubre la diferencia de Afrodita Jabones
              </h2>
              <p className=' text-lg mb-8 max-w-3xl mx-auto text-neutral-200'>
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

      {/* Additional Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8'
      >
        {/* Info 1 */}
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
              />
            </svg>
          </div>
          <span className='block text-3xl font-bold text-primary-800 mb-1'>
            Satisfacción garantizada
          </span>
          <span className='text-neutral-600'>O te devolvemos tu dinero</span>
        </div>

        {/* Info 2 */}
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
              />
            </svg>
          </div>
          <span className='block text-3xl font-bold text-primary-800 mb-1'>
            Envío rápido
          </span>
          <span className='text-neutral-600'>En 24-48 horas en península</span>
        </div>

        {/* Info 3 */}
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
              />
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
