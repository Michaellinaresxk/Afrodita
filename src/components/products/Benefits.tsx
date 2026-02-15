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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
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

  const bubbles = Array.from({ length: 10 }).map((_, index) => ({
    id: `bubble-${index}`,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 40 + 10}px`,
    height: `${Math.random() * 40 + 10}px`,
    delay: Math.random() * 5,
    duration: Math.random() * 5 + 5,
  }));

  return (
    <section ref={ref} className='py-24 relative overflow-hidden bg-[#FBF9F5]'>
      {/* Background decorative elements */}
      <motion.div style={{ y, opacity }} className='absolute inset-0 z-0'>
        {/* Tropical organic blob shapes */}
        <div className='absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#C4D7A4]/30 to-[#C4D7A4]/10 blur-[120px] opacity-60 transform -translate-y-1/2' />
        <div className='absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#A8C5B8]/25 to-[#A8C5B8]/5 blur-[120px] opacity-50' />
        <div className='absolute bottom-0 left-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#E8C4A0]/25 to-[#E8C4A0]/5 blur-[120px] opacity-60 transform translate-y-1/2' />

        {/* Dot pattern */}
        <div
          className='absolute inset-0 opacity-[0.025]'
          style={{
            backgroundImage:
              'radial-gradient(#5C7A56 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
          }}
        />
      </motion.div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className='text-center mb-20'
        >
          <h2 className='font-serif text-4xl md:text-5xl font-bold text-[#2C3E2D] mb-6 relative inline-block'>
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
                  stroke='#C4D7A4'
                  strokeWidth='4'
                />
              </svg>
            </span>{' '}
            y el planeta
          </h2>

          <p className='text-[#5E6B5A] max-w-2xl mx-auto text-lg leading-relaxed'>
            Descubre por qué nuestros jabones artesanales son la elección
            perfecta para el cuidado diario de tu piel, combinando la tradición
            artesanal con ingredientes naturales de la más alta calidad.
          </p>
        </motion.div>

        {/* Benefits cards */}
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
              className={`relative overflow-hidden rounded-2xl border ${benefit.borderColor} ${benefit.color} p-1 shadow-sm hover:shadow-md transition-shadow duration-300 group`}
            >
              <div className='bg-white/80 backdrop-blur-sm rounded-xl p-6 h-full flex flex-col relative overflow-hidden'>
                {/* Decorative corner */}
                <div className='absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#C4D7A4]/15 to-transparent' />

                {/* Icon */}
                <div
                  className={`${benefit.iconBg} text-white w-14 h-14 rounded-xl shadow-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  {benefit.icon}
                </div>

                <h3 className='text-xl font-bold text-[#2C3E2D] mb-3'>
                  {benefit.title}
                </h3>

                <p className='text-[#5E6B5A] text-sm leading-relaxed flex-grow'>
                  {benefit.description}
                </p>

                <div className='mt-5 pt-3 border-t border-[#E8E3DA]'>
                  <button className='text-[#5C7A56] text-sm font-medium inline-flex items-center group/btn hover:text-[#4A6845] transition-colors'>
                    <span>Saber más</span>
                    <ArrowRight className='ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform' />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature highlight section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className='relative mb-24 rounded-3xl overflow-hidden bg-gradient-to-r from-[#F5F0E8] to-white border border-[#E8E3DA] shadow-lg'
        >
          <div className='grid grid-cols-1 md:grid-cols-2'>
            {/* Text content */}
            <div className='relative z-10 p-6 md:p-10 order-2 md:order-1'>
              <div className='inline-flex items-center px-3 py-1.5 rounded-full bg-white shadow-sm border border-[#E8E3DA] mb-4'>
                <span className='text-xs font-medium text-[#5C7A56]'>
                  Compromiso con la calidad
                </span>
              </div>

              <h3 className='text-xl md:text-2xl font-serif font-bold text-[#2C3E2D] mb-4'>
                Solo utilizamos ingredientes de la más alta calidad
              </h3>

              <p className='text-[#5E6B5A] mb-6 text-base md:text-lg leading-relaxed'>
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
                    <div className='flex-shrink-0 w-5 h-5 rounded-full bg-[#C4D7A4]/30 text-[#5C7A56] flex items-center justify-center mt-1 mr-3'>
                      <Check className='w-3 h-3' />
                    </div>
                    <span className='text-[#5E6B5A] text-base md:text-lg'>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className='mt-8'>
                <Link
                  href='/about'
                  className='inline-flex items-center text-[#5C7A56] font-medium text-base md:text-lg hover:text-[#4A6845] transition-colors'
                >
                  <span>Conoce nuestro proceso</span>
                  <ArrowRight className='ml-2 w-4 h-4' />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className='w-full h-64 sm:h-80 md:h-full overflow-hidden relative order-1 md:order-2'>
              <Image
                src='/img/productos/jabon-5.jpg'
                alt='Ingredientes naturales'
                width={600}
                height={500}
                className='object-cover object-center w-full h-full opacity-80'
              />
              <div className='absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-transparent via-transparent to-[#F5F0E8] md:to-[#F5F0E8]/90' />
            </div>
          </div>
        </motion.div>

        {/* Stats section */}
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
              className={`${stat.color} rounded-2xl p-8 shadow-sm border border-[#E8E3DA] overflow-hidden relative group hover:shadow-md transition-shadow duration-300`}
            >
              {/* Decorative elements */}
              <div className='absolute -top-12 -right-12 w-24 h-24 rounded-full bg-white/50 opacity-50 group-hover:scale-110 transition-transform duration-500' />
              <div className='absolute -bottom-16 -left-10 w-32 h-32 rounded-full bg-white/30 opacity-40 group-hover:scale-110 transition-transform duration-500' />

              <div className='relative'>
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.iconBg} ${stat.iconColor} mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>

                <div className='mb-2 flex items-baseline'>
                  <span className='text-4xl font-bold text-[#2C3E2D]'>
                    {stat.value}
                  </span>
                </div>

                <span className='text-[#5E6B5A]'>{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════
          CTA Section – Tropical dark green
      ═══════════════════════════════════════════ */}
      <div
        ref={ctaRef}
        className='mt-24 pt-16 pb-20 bg-[#2C3E2D] relative overflow-hidden'
      >
        {/* Top clip shape */}
        <div
          className='absolute top-0 left-0 w-full h-24 bg-[#FBF9F5]'
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 70%)' }}
        />

        {/* Decorative blobs */}
        <div className='absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#5C7A56]/20 blur-[100px]' />
        <div className='absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#C4D7A4]/10 blur-[100px]' />

        {/* Dot pattern */}
        <div
          className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage:
              'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className='mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCTAInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className='max-w-4xl mx-auto text-center'
          >
            <div className='inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm mb-6 border border-white/15'>
              <span className='text-sm font-medium text-white/85'>
                Calidad artesanal
              </span>
            </div>

            <h2 className='font-serif text-4xl md:text-5xl font-bold mb-6 text-white leading-tight'>
              Descubre la diferencia de
              <span className='relative whitespace-nowrap'>
                <span className='relative z-10 ml-2 text-[#C4D7A4]'>
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
                    stroke='rgba(255,255,255,0.2)'
                    strokeWidth='3'
                  />
                </svg>
              </span>
              <span className='text-[#C4D7A4]'> Jabones</span>
            </h2>

            <p className='text-base md:text-lg mb-10 max-w-3xl mx-auto text-white/65 leading-relaxed font-light'>
              Explora nuestra colección de jabones artesanales y productos para
              el cuidado de la piel, elaborados con ingredientes naturales
              seleccionados para nutrir tu piel y respetar el planeta.
            </p>

            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className='relative group'
              >
                <div className='absolute inset-0 bg-[#5C7A56]/30 blur-md opacity-80 group-hover:opacity-100 transition-opacity rounded-full' />
                <Link
                  href='/products'
                  className='relative inline-flex items-center gap-2 bg-[#5C7A56] hover:bg-[#7FA575] text-white font-medium py-3.5 px-8 rounded-full shadow-[0_4px_20px_rgba(92,122,86,0.3)] hover:shadow-[0_6px_28px_rgba(92,122,86,0.4)] transition-all text-sm'
                >
                  <span>Ver productos</span>
                  <ArrowRight className='w-4 h-4 group-hover:translate-x-0.5 transition-transform' />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href='/contact'
                  className='inline-flex items-center gap-2 bg-transparent text-white font-medium py-3.5 px-8 rounded-full transition-all border border-white/20 hover:border-white/40 hover:bg-white/5 text-sm'
                >
                  <span>Contáctanos</span>
                  <ArrowRight className='w-4 h-4' />
                </Link>
              </motion.div>
            </div>

            {/* Trust badges */}
            <div className='flex flex-wrap justify-center gap-4 mt-10 pt-6 border-t border-white/10'>
              <div className='flex items-center bg-white/8 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10'>
                <CreditCard className='w-4 h-4 mr-2 text-[#C4D7A4]' />
                <span className='text-sm text-white/80'>Pago 100% seguro</span>
              </div>

              <div className='flex items-center bg-white/8 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10'>
                <Check className='w-4 h-4 mr-2 text-[#C4D7A4]' />
                <span className='text-sm text-white/80'>
                  Envío gratis + RD$ 50
                </span>
              </div>

              <div className='flex items-center bg-white/8 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10'>
                <Clock className='w-4 h-4 mr-2 text-[#C4D7A4]' />
                <span className='text-sm text-white/80'>Entrega 24/48h</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative bubbles */}
      <div className='absolute bottom-0 left-0 right-0 h-40 overflow-hidden opacity-50 pointer-events-none'>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className='absolute bottom-0 rounded-full bg-gradient-to-r from-[#C4D7A4]/40 to-[#A8C5B8]/20 backdrop-blur-sm'
            style={{
              left: bubble.left,
              width: bubble.width,
              height: bubble.height,
            }}
            animate={{
              y: [200, -100],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 0.5, 0],
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
