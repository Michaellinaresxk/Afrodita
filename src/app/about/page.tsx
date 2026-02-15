'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { timelineEvents } from '@/constants/timeline';
import { TimelineEvent } from '@/components/ui/TimeLineEvents';
import { brandValues } from '@/constants/brand';
import ValueCard from '@/components/ui/ValueCard';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

// ── Leaf SVG decoration (consistent with Hero) ──
const LeafDecoration = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox='0 0 120 180'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M60 170C60 170 10 130 10 70C10 10 60 5 60 5C60 5 110 10 110 70C110 130 60 170 60 170Z'
      fill='currentColor'
      fillOpacity='0.06'
    />
    <path
      d='M60 170C60 170 60 5 60 5'
      stroke='currentColor'
      strokeOpacity='0.1'
      strokeWidth='1.5'
    />
    <path
      d='M60 40C75 50 85 55 95 55'
      stroke='currentColor'
      strokeOpacity='0.08'
      strokeWidth='1'
    />
    <path
      d='M60 70C45 80 30 82 20 80'
      stroke='currentColor'
      strokeOpacity='0.08'
      strokeWidth='1'
    />
    <path
      d='M60 100C75 108 88 108 98 105'
      stroke='currentColor'
      strokeOpacity='0.08'
      strokeWidth='1'
    />
    <path
      d='M60 130C42 138 28 136 18 130'
      stroke='currentColor'
      strokeOpacity='0.08'
      strokeWidth='1'
    />
  </svg>
);

// ── Shared animation variants ──
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutUsPage() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.3 });
  const isValuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO SECTION – Tropical About 
      ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className='relative min-h-[90vh] flex items-center bg-[#FBF9F5] overflow-hidden'
      >
        {/* Background gradient */}
        <div className='absolute inset-0 bg-gradient-to-br from-[#FBF9F5] via-[#F5F0E8] to-[#EDE7DB]' />

        {/* Background image with parallax (warm tint) */}
        <motion.div
          className='absolute inset-0 z-0 opacity-15'
          style={{ y, opacity: heroOpacity }}
        >
          <Image
            src='/img/jabon.jpg'
            alt='Afrodita Jabones - Sobre nosotros'
            fill
            style={{ objectFit: 'cover' }}
            priority
            quality={90}
          />
        </motion.div>

        {/* Tropical blobs */}
        <div className='absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-[#C4D7A4]/25 blur-[100px]' />
        <div className='absolute bottom-0 -left-20 w-[350px] h-[350px] rounded-full bg-[#E8C4A0]/20 blur-[100px]' />
        <div className='absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-[#A8C5B8]/15 blur-[80px]' />

        {/* Dot pattern */}
        <div
          className='absolute inset-0 opacity-[0.025]'
          style={{
            backgroundImage:
              'radial-gradient(circle, #5C7A56 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Botanical decorations */}
        <LeafDecoration className='absolute top-16 right-8 w-20 h-28 text-[#5C7A56] opacity-50 rotate-12 md:w-28 md:h-40 md:right-20' />
        <LeafDecoration className='absolute bottom-20 left-6 w-24 h-32 text-[#5C7A56] opacity-35 -rotate-12 md:w-32 md:h-44 md:left-16' />
        <LeafDecoration className='hidden lg:block absolute top-1/2 left-10 w-16 h-24 text-[#5C7A56] opacity-25 -rotate-[30deg]' />

        <WhatsAppButton />

        <div className='container mx-auto px-5 sm:px-6 lg:px-8 relative z-10'>
          <div className='max-w-3xl'>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }
              }
              transition={{ duration: 0.6 }}
              className='mb-6'
            >
              <span className='inline-flex items-center gap-2 text-xs font-medium text-[#5C7A56] tracking-[0.15em] uppercase bg-[#5C7A56]/8 border border-[#5C7A56]/12 backdrop-blur-sm px-4 py-2 rounded-full'>
                <span className='w-1.5 h-1.5 rounded-full bg-[#7FA575] animate-pulse' />
                Nuestra historia
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.1 }}
              className='font-serif text-[2.75rem] md:text-6xl lg:text-7xl text-[#2C3E2D] font-bold mb-8 leading-[1.08]'
            >
              Cuidado natural para tu piel,{' '}
              <span className='relative inline-block text-[#5C7A56]'>
                respeto
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isHeroInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    delay: 1,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className='absolute -bottom-1 left-0 w-full h-[6px] bg-[#C4D7A4]/50 rounded-full origin-left'
                />
              </span>{' '}
              por el planeta
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.2 }}
              className='text-[#5E6B5A] text-lg md:text-xl mb-10 max-w-2xl leading-relaxed font-light'
            >
              Descubre nuestra pasión por los ingredientes naturales y el
              compromiso con la sostenibilidad que han guiado nuestra marca.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.3 }}
              className='flex flex-wrap gap-3'
            >
              <Link
                href='#nuestra-historia'
                className='group inline-flex items-center gap-2 bg-[#5C7A56] hover:bg-[#4A6845] text-white px-7 py-3.5 rounded-full transition-all duration-300 font-medium text-sm shadow-[0_4px_20px_rgba(92,122,86,0.25)] hover:shadow-[0_6px_28px_rgba(92,122,86,0.35)]'
              >
                Descubre más
                <svg
                  className='w-4 h-4 group-hover:translate-y-0.5 transition-transform'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 14l-7 7m0 0l-7-7m7 7V3'
                  />
                </svg>
              </Link>

              <Link
                href='/products'
                className='inline-flex items-center gap-2 bg-transparent border border-[#5C7A56]/25 hover:border-[#5C7A56]/50 text-[#5C7A56] px-7 py-3.5 rounded-full transition-all duration-300 font-medium text-sm hover:bg-[#5C7A56]/5'
              >
                Ver productos
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className='flex flex-col items-center cursor-pointer'
            animate={{ y: [0, 6, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >
            <span className='text-[#5C7A56] text-xs mb-2 font-light tracking-[0.2em] uppercase'>
              Scroll
            </span>
            <svg
              className='w-5 h-5 text-[#5C7A56]/50'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          NUESTRA HISTORIA – Timeline Section
      ═══════════════════════════════════════════ */}
      <section
        id='nuestra-historia'
        ref={storyRef}
        className='py-24 bg-[#FAFAF7] relative overflow-hidden'
      >
        {/* Decorative blobs */}
        <div className='absolute top-0 right-0 w-80 h-80 bg-[#C4D7A4]/15 rounded-full blur-[100px]' />
        <div className='absolute bottom-0 left-0 w-64 h-64 bg-[#A8C5B8]/10 rounded-full blur-[80px]' />

        <div className='container mx-auto px-5 sm:px-6 lg:px-8 relative z-10'>
          <motion.div
            variants={fadeUp}
            initial='hidden'
            animate={isStoryInView ? 'visible' : 'hidden'}
            className='text-center max-w-3xl mx-auto mb-20'
          >
            <span className='inline-flex items-center gap-2 text-xs font-medium text-[#5C7A56] mb-4 tracking-[0.15em] uppercase bg-[#5C7A56]/8 px-4 py-2 rounded-full'>
              Conoce nuestra trayectoria
            </span>
            <h2 className='font-serif text-4xl md:text-5xl font-bold text-[#2C3E2D] mb-6'>
              Nuestra Historia
            </h2>
            <p className='text-[#5E6B5A] text-lg leading-relaxed'>
              Desde nuestros humildes inicios hasta convertirnos en referentes
              en el cuidado natural de la piel, cada paso ha estado guiado por
              nuestra pasión por lo natural y sostenible.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className='max-w-4xl mx-auto relative'>
            {/* Center line with tropical gradient */}
            <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#C4D7A4] via-[#A8C5B8] to-[#E8C4A0]' />

            <motion.div
              variants={stagger}
              initial='hidden'
              animate={isStoryInView ? 'visible' : 'hidden'}
              className='space-y-20'
            >
              {timelineEvents.map((event, index) => (
                <motion.div key={index} variants={itemFade}>
                  <TimelineEvent
                    year={event.year}
                    title={event.title}
                    description={event.description}
                    // @ts-ignore
                    position={event.position}
                    isActive={event.isActive}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VALORES Section
      ═══════════════════════════════════════════ */}
      <section
        ref={valuesRef}
        className='py-24 bg-white relative overflow-hidden'
      >
        {/* Decorative top fade from previous section */}
        <div className='absolute top-0 left-0 w-full h-40 bg-[#FAFAF7]' />
        <div className='absolute top-40 left-0 w-full h-32 bg-gradient-to-b from-[#FAFAF7] to-transparent' />

        {/* Decorative blobs */}
        <div className='absolute -top-20 right-0 w-80 h-80 rounded-full bg-[#C4D7A4]/10 blur-[100px]' />
        <div className='absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#E8C4A0]/10 blur-[80px]' />

        <div className='container mx-auto px-5 sm:px-6 lg:px-8 relative z-10'>
          <motion.div
            variants={fadeUp}
            initial='hidden'
            animate={isValuesInView ? 'visible' : 'hidden'}
            className='text-center max-w-3xl mx-auto mb-20'
          >
            <span className='inline-flex items-center gap-2 text-xs font-medium text-[#5C7A56] mb-4 tracking-[0.15em] uppercase bg-[#5C7A56]/8 px-4 py-2 rounded-full'>
              Lo que nos define
            </span>
            <h2 className='font-serif text-4xl md:text-5xl font-bold text-[#2C3E2D] mb-6'>
              Nuestros Valores
            </h2>
            <p className='text-[#5E6B5A] text-lg leading-relaxed'>
              Estos son los principios que guían cada decisión que tomamos,
              desde la selección de ingredientes hasta el diseño de nuestros
              envases.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial='hidden'
            animate={isValuesInView ? 'visible' : 'hidden'}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
          >
            {brandValues.map((value, index) => (
              <motion.div key={index} variants={itemFade}>
                <ValueCard
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  color={value.color}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA Section – Tropical
      ═══════════════════════════════════════════ */}
      <section className='py-20 bg-[#2C3E2D] relative overflow-hidden'>
        {/* Decorative elements */}
        <div className='absolute -top-10 right-10 w-64 h-64 rounded-full bg-[#5C7A56]/15 blur-[80px]' />
        <div className='absolute -bottom-10 left-10 w-64 h-64 rounded-full bg-[#C4D7A4]/10 blur-[80px]' />

        {/* Dot pattern */}
        <div
          className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage:
              'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Botanical decoration */}
        <LeafDecoration className='absolute top-8 right-12 w-20 h-28 text-white opacity-10 rotate-12' />
        <LeafDecoration className='absolute bottom-8 left-12 w-16 h-24 text-white opacity-8 -rotate-[20deg]' />

        <div className='container mx-auto px-5 sm:px-6 lg:px-8 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className='max-w-3xl mx-auto text-center'
          >
            <h2 className='font-serif text-3xl md:text-5xl font-bold mb-6 text-white leading-tight'>
              Descubre la diferencia de{' '}
              <span className='text-[#C4D7A4]'>Jabones Afrodita</span>
            </h2>
            <p className='text-base md:text-lg mb-10 max-w-2xl mx-auto text-white/70 leading-relaxed font-light'>
              Explora nuestra colección de jabones artesanales y productos para
              el cuidado de la piel, elaborados con ingredientes naturales
              seleccionados para nutrir tu piel y respetar el planeta.
            </p>

            <div className='flex flex-wrap justify-center gap-3'>
              <Link
                href='/products'
                className='group inline-flex items-center gap-2 bg-[#5C7A56] hover:bg-[#7FA575] text-white font-medium py-3.5 px-7 rounded-full shadow-[0_4px_20px_rgba(92,122,86,0.3)] hover:shadow-[0_6px_28px_rgba(92,122,86,0.4)] transition-all text-sm'
              >
                Ver productos
                <svg
                  className='w-4 h-4 group-hover:translate-x-0.5 transition-transform'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  />
                </svg>
              </Link>

              <Link
                href='/contact'
                className='inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium py-3.5 px-7 rounded-full transition-all text-sm hover:bg-white/5'
              >
                Contáctanos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
