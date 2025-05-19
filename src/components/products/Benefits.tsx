'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Clock, CreditCard } from 'lucide-react';
import { benefits, stats } from '@/constants/benefitsItems';

export default function Benefits() {
  const ref = useRef(null);
  const ctaRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isCTAInView = useInView(ctaRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Crear un array de 10 elementos para las burbujas decorativas
  const bubbles = Array.from({ length: 10 }).map((_, index) => ({
    id: `bubble-${index}`,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 40 + 10}px`,
    height: `${Math.random() * 40 + 10}px`,
    delay: Math.random() * 5,
    duration: Math.random() * 5 + 5,
  }));

  return (
    <section ref={ref} className='py-24 relative overflow-hidden'>
      {/* Modern glass morphism background elements */}
      <motion.div style={{ y, opacity }} className='absolute inset-0 z-0'>
        {/* Organic blob shapes with gradients */}
        <div className='absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary-100/40 to-primary-200/20 blur-3xl opacity-60 transform -translate-y-1/2'></div>
        <div className='absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-secondary-100/30 to-secondary-200/10 blur-3xl opacity-50'></div>
        <div className='absolute bottom-0 left-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-rose-100/30 to-rose-200/10 blur-3xl opacity-60 transform translate-y-1/2'></div>

        {/* Subtle pattern overlay */}
        <div
          className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage:
              'radial-gradient(#000 0.5px, transparent 0.5px), radial-gradient(#000 0.5px, transparent 0.5px)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }}
        ></div>
      </motion.div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header section with modern typography */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className='text-center mb-20'
        >
          {/* Heading with decorative elements */}
          <h2 className='font-serif text-4xl md:text-5xl font-bold text-primary-900 mb-6 relative inline-block'>
            Beneficios para
            <span className='relative whitespace-nowrap'>
              <span className='relative z-10'> tu piel</span>
              <svg
                className='absolute -bottom-2 left-0 w-full z-0'
                viewBox='0 0 200 10'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M0,5 Q50,9 100,5 T200,5'
                  fill='none'
                  stroke='#F9D4DD'
                  strokeWidth='4'
                />
              </svg>
            </span>{' '}
            y el planeta
          </h2>

          <p className='text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed'>
            Descubre por qué nuestros jabones artesanales son la elección
            perfecta para el cuidado diario de tu piel, combinando la tradición
            artesanal con ingredientes naturales de la más alta calidad.
          </p>
        </motion.div>

        {/* Modern Benefits Cards */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-24'
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-2xl border ${benefit.borderColor} ${benefit.color} p-1 shadow-md hover:shadow-lg transition-shadow duration-300 group`}
            >
              {/* Card inner with glass effect */}
              <div className='bg-white/80 backdrop-blur-sm rounded-xl p-6 h-full flex flex-col relative overflow-hidden'>
                {/* Decorative corner */}
                <div className='absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br from-white/80 to-white/20 border-b border-r border-white/10'></div>

                {/* Icon */}
                <div
                  className={`${benefit.iconBg} text-white w-14 h-14 rounded-xl shadow-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  {benefit.icon}
                </div>

                <h3 className='text-xl font-bold text-primary-900 mb-3'>
                  {benefit.title}
                </h3>

                <p className='text-neutral-600 text-sm leading-relaxed flex-grow'>
                  {benefit.description}
                </p>

                {/* Learn more button */}
                <div className='mt-5 pt-3 border-t border-neutral-100'>
                  <button className='text-primary-600 text-sm font-medium inline-flex items-center group/btn'>
                    <span>Saber más</span>
                    <ArrowRight className='ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform' />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modern feature highlight section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className='relative mb-24 rounded-3xl overflow-hidden bg-gradient-to-r from-primary-50 to-white border border-primary-100 shadow-xl'
        >
          {/* Contenedor principal con grid para control preciso en desktop */}
          <div className='grid grid-cols-1 md:grid-cols-2'>
            {/* Columna izquierda - contenido de texto (siempre visible) */}
            <div className='relative z-10 p-6 md:p-10 order-2 md:order-1'>
              <div className='inline-flex items-center px-3 py-1 rounded-full bg-white shadow-sm border border-primary-100 mb-4'>
                <span className='text-xs font-medium text-primary-700'>
                  Compromiso con la calidad
                </span>
              </div>

              <h3 className='text-xl md:text-2xl font-serif font-bold text-primary-900 mb-4'>
                Solo utilizamos ingredientes de la más alta calidad
              </h3>

              <p className='text-neutral-600 mb-6 text-base md:text-lg'>
                Cada jabón está elaborado cuidadosamente en pequeños lotes,
                utilizando el método tradicional de saponificación en frío para
                preservar todas las propiedades beneficiosas de los aceites
                esenciales y extractos botánicos.
              </p>

              <ul className='space-y-3'>
                {[
                  'Aceites vegetales prensados en frío',
                  'Hierbas y plantas cultivadas orgánicamente',
                  'Arcillas minerales purificantes',
                  'Extractos botánicos puros',
                ].map((item, index) => (
                  <li
                    key={`quality-item-${index}`}
                    className='flex items-start'
                  >
                    <div className='flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mt-1 mr-3'>
                      <Check className='w-3 h-3' />
                    </div>
                    <span className='text-neutral-700 text-base md:text-lg'>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className='mt-8'>
                <Link
                  href='/about'
                  className='inline-flex items-center text-primary-700 font-medium text-base md:text-lg hover:text-primary-800 transition-colors'
                >
                  <span>Conoce nuestro proceso</span>
                  <ArrowRight className='ml-2 w-4 h-4' />
                </Link>
              </div>
            </div>

            {/* Columna derecha - imagen (arriba en móvil, derecha en desktop) */}
            <div className='w-full h-64 sm:h-80 md:h-full overflow-hidden relative order-1 md:order-2'>
              <Image
                src='/img/productos/jabon-5.jpg'
                alt='Ingredientes naturales'
                width={600}
                height={500}
                className='object-cover object-center w-full h-full opacity-80'
              />
              {/* Gradiente que cambia dirección según el dispositivo */}
              <div className='absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-transparent via-transparent to-primary-50 md:to-primary-50/90'></div>
            </div>
          </div>
        </motion.div>

        {/* Stats section with neumorphic design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className='grid grid-cols-1 md:grid-cols-3 gap-6'
        >
          {stats.map((stat, index) => (
            <motion.div
              key={`stat-item-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index + 0.6 }}
              className={`${stat.color} rounded-2xl p-8 shadow-sm border border-neutral-100 overflow-hidden relative group hover:shadow-md transition-shadow duration-300`}
            >
              {/* Decorative elements */}
              <div className='absolute -top-12 -right-12 w-24 h-24 rounded-full bg-white/50 opacity-50 group-hover:scale-110 transition-transform duration-500'></div>
              <div className='absolute -bottom-16 -left-10 w-32 h-32 rounded-full bg-white/30 opacity-40 group-hover:scale-110 transition-transform duration-500'></div>

              <div className='relative'>
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.iconBg} ${stat.iconColor} mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>

                <div className='mb-2 flex items-baseline'>
                  <span className='text-4xl font-bold text-primary-900'>
                    {stat.value}
                  </span>
                </div>

                <span className='text-neutral-600'>{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modern CTA Section with glass morphism */}
      <div
        ref={ctaRef}
        className='mt-24 pt-16 pb-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden'
      >
        {/* Decorative elements */}
        <div
          className='absolute top-0 left-0 w-full h-24 bg-white'
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 70%)',
          }}
        ></div>

        <div className='absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary-700/50 blur-3xl'></div>
        <div className='absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-secondary-800/30 blur-3xl'></div>

        {/* Subtle pattern */}
        <div
          className='absolute inset-0 opacity-10'
          style={{
            backgroundImage:
              'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        ></div>

        <div className=' mx-auto px-4 sm:px-6 lg:px-8 relative z-10 CTA-bg'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCTAInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className='max-w-4xl mx-auto text-center'
          >
            <div className='inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm mb-6 border border-white/20'>
              <span className='text-sm font-medium text-white/90'>
                Calidad artesanal
              </span>
            </div>

            <h2 className='font-serif text-4xl md:text-5xl font-bold mb-6 text-white leading-tight'>
              Descubre la diferencia de
              <span className='relative whitespace-nowrap'>
                <span className='relative z-10 ml-2 text-secondary-200'>
                  Afrodita
                </span>
                <svg
                  className='absolute -bottom-1 left-0 w-full z-0'
                  viewBox='0 0 200 10'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M0,5 Q50,9 100,5 T200,5'
                    fill='none'
                    stroke='rgba(255,255,255,0.3)'
                    strokeWidth='3'
                  />
                </svg>
              </span>
              <span className='text-secondary-200'> Jabones</span>
            </h2>

            <p className='text-lg mb-10 max-w-3xl mx-auto text-white/80 leading-relaxed'>
              Explora nuestra colección de jabones artesanales y productos para
              el cuidado de la piel, elaborados con ingredientes naturales
              seleccionados para nutrir tu piel y respetar el planeta.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className='relative group'
              >
                <div className='absolute inset-0 bg-white/20 blur-md opacity-80 group-hover:opacity-100 transition-opacity rounded-full'></div>
                <Link
                  href='/products'
                  className='relative inline-flex items-center bg-white hover:bg-neutral-50 text-primary-800 font-medium py-3.5 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all'
                >
                  <span>Ver productos</span>
                  <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href='/contact'
                  className='inline-flex items-center bg-transparent text-white font-medium py-3.5 px-8 rounded-full transition-all border border-white/30 hover:bg-white/10'
                >
                  <span>Contactanos</span>
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Link>
              </motion.div>
            </div>

            {/* Trust badges */}
            <div className='flex flex-wrap justify-center gap-6 mt-10 pt-6 border-t border-white/10'>
              <div className='flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
                <CreditCard className='w-4 h-4 mr-2 text-secondary-200' />
                <span className='text-sm text-white/90'>Pago 100% seguro</span>
              </div>

              <div className='flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
                <Check className='w-4 h-4 mr-2 text-secondary-200' />
                <span className='text-sm text-white/90'>
                  Envío gratis + RD$ 50
                </span>
              </div>

              <div className='flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
                <Clock className='w-4 h-4 mr-2 text-secondary-200' />
                <span className='text-sm text-white/90'>Entrega 24/48h</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bubbles - CORREGIDO: cada burbuja tiene un key único y estable */}
      <div className='absolute bottom-0 left-0 right-0 h-40 overflow-hidden opacity-70 pointer-events-none'>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className='absolute bottom-0 rounded-full bg-gradient-to-r from-white/60 to-white/30 backdrop-blur-sm'
            style={{
              left: bubble.left,
              width: bubble.width,
              height: bubble.height,
            }}
            animate={{
              y: [200, -100],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 0.7, 0],
              scale: [0.8, 1.2, 1],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </section>
  );
}
