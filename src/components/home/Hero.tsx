'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

// ── Leaf SVG decoration (inline for zero-dependency) ──
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

// ── Monstera-style leaf ──
const MonsteraLeaf = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox='0 0 200 240'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M100 230C100 230 20 180 15 100C10 20 80 5 100 5C120 5 190 20 185 100C180 180 100 230 100 230Z'
      fill='currentColor'
      fillOpacity='0.04'
    />
    <path
      d='M100 230C100 180 100 5 100 5'
      stroke='currentColor'
      strokeOpacity='0.07'
      strokeWidth='1.5'
    />
    <ellipse cx='65' cy='80' rx='18' ry='25' fill='white' fillOpacity='0.03' />
    <ellipse
      cx='140'
      cy='120'
      rx='16'
      ry='22'
      fill='white'
      fillOpacity='0.03'
    />
  </svg>
);

// ── Animation variants ──
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

// ── Trust badges data ──
const trustBadges = [
  { icon: '🌿', label: '100% Natural' },
  { icon: '🧴', label: 'Artesanal' },
  { icon: '🚚', label: 'Envío Express' },
];

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden min-h-[100svh] flex items-center bg-[#FBF9F5]'
    >
      {/* ── Background layer ── */}
      <div className='absolute inset-0 z-0'>
        {/* Warm gradient base */}
        <div className='absolute inset-0 bg-gradient-to-br from-[#FBF9F5] via-[#F5F0E8] to-[#EDE7DB]' />

        {/* Subtle tropical color blobs */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className='absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-[#C4D7A4]/30 blur-[100px]'
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: 'easeInOut',
            delay: 2,
          }}
          className='absolute bottom-0 -left-20 w-[350px] h-[350px] rounded-full bg-[#E8C4A0]/25 blur-[100px]'
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: 'easeInOut',
            delay: 4,
          }}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#A8C5B8]/20 blur-[80px]'
        />

        {/* Dot pattern overlay */}
        <div
          className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage:
              'radial-gradient(circle, #5C7A56 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* ── Botanical decorations ── */}
      <LeafDecoration className='absolute top-10 right-8 w-20 h-28 text-[#5C7A56] opacity-60 md:w-28 md:h-40 md:right-16 md:top-16 rotate-12' />
      <MonsteraLeaf className='absolute bottom-10 left-4 w-24 h-32 text-[#5C7A56] opacity-40 md:w-36 md:h-44 md:left-12 -rotate-12' />
      <LeafDecoration className='hidden lg:block absolute top-1/3 left-8 w-16 h-24 text-[#5C7A56] opacity-30 -rotate-[25deg]' />

      {/* ── Main content ── */}
      <div className='container mx-auto px-5 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center'>
          {/* ── Text column ── */}
          <motion.div
            initial='hidden'
            animate='visible'
            variants={stagger}
            className='text-center lg:text-left pt-20 lg:pt-0'
          >
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              className='inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[#5C7A56]/8 border border-[#5C7A56]/12'
            >
              <span className='w-1.5 h-1.5 rounded-full bg-[#7FA575] animate-pulse' />
              <span className='text-xs tracking-[0.15em] uppercase text-[#5C7A56] font-medium'>
                Belleza Natural Orgánica
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              custom={0.15}
              variants={fadeUp}
              className='font-serif text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold text-[#2C3E2D] mb-6'
            >
              Cuida tu piel <br className='hidden sm:block' />
              con la{' '}
              <span className='relative inline-block text-[#5C7A56]'>
                esencia
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 1.2,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className='absolute -bottom-1 left-0 w-full h-[6px] bg-[#C4D7A4]/50 rounded-full origin-left'
                />
              </span>{' '}
              <br className='hidden sm:block' />
              de la naturaleza
            </motion.h1>

            {/* Description */}
            <motion.p
              custom={0.3}
              variants={fadeUp}
              className='text-base sm:text-lg text-[#5E6B5A] leading-relaxed max-w-md mx-auto lg:mx-0 mb-8 font-light'
            >
              Descubre nuestra colección de jabones artesanales, formulados con
              ingredientes 100% naturales y orgánicos para el cuidado diario de
              tu piel.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              custom={0.45}
              variants={fadeUp}
              className='flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10'
            >
              <Link
                href='/products'
                className='group relative inline-flex items-center justify-center gap-2 bg-[#5C7A56] hover:bg-[#4A6845] text-white px-7 py-3.5 rounded-full transition-all duration-300 font-medium text-sm overflow-hidden shadow-[0_4px_20px_rgba(92,122,86,0.25)] hover:shadow-[0_6px_28px_rgba(92,122,86,0.35)]'
              >
                <span className='relative z-10'>Ver Productos</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  />
                </svg>
              </Link>

              <Link
                href='/about'
                className='inline-flex items-center justify-center gap-2 bg-transparent text-[#5C7A56] px-7 py-3.5 rounded-full transition-all duration-300 font-medium text-sm border border-[#5C7A56]/25 hover:border-[#5C7A56]/50 hover:bg-[#5C7A56]/5'
              >
                <span>Nuestra Historia</span>
                <span className='text-[#5C7A56]/50'>→</span>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              custom={0.6}
              variants={fadeUp}
              className='flex items-center gap-5 justify-center lg:justify-start'
            >
              {trustBadges.map((badge) => (
                <div key={badge.label} className='flex items-center gap-2'>
                  <span className='text-base'>{badge.icon}</span>
                  <span className='text-xs text-[#6B7B66] font-medium'>
                    {badge.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Image column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className='relative flex justify-center lg:justify-end'
          >
            <div className='relative w-[300px] h-[380px] sm:w-[360px] sm:h-[450px] lg:w-[420px] lg:h-[530px]'>
              {/* Organic shape background */}
              <div className='absolute inset-0 -m-6 rounded-[60%_40%_50%_50%/50%_55%_45%_50%] bg-gradient-to-br from-[#C4D7A4]/30 via-[#D4C5A0]/20 to-[#E8C4A0]/25 rotate-3' />

              {/* Secondary organic shape */}
              <div className='absolute -top-4 -right-4 w-32 h-32 rounded-[40%_60%_50%_50%/55%_45%_55%_45%] bg-[#A8C5B8]/15 blur-sm' />

              {/* Main image container */}
              <div className='relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(44,62,45,0.12)]'>
                <Image
                  src='/img/jabon.jpg'
                  alt='Jabones naturales artesanales Afrodita'
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  quality={90}
                  className='rounded-[2rem]'
                />

                {/* Light overlay for cohesion */}
                <div className='absolute inset-0 bg-gradient-to-t from-[#2C3E2D]/10 via-transparent to-[#FBF9F5]/10' />
              </div>

              {/* ── Floating accent cards ── */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: 'easeInOut',
                }}
                className='absolute -top-3 -left-3 sm:-top-4 sm:-left-6 z-20'
              >
                <div className='flex items-center gap-2 py-2 px-3.5 rounded-xl bg-white/90 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-white/60'>
                  <div className='w-2 h-2 rounded-full bg-[#7FA575] animate-pulse' />
                  <span className='text-xs font-medium text-[#2C3E2D]'>
                    100% Natural
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className='absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-5 z-20'
              >
                <div className='flex items-center gap-2 py-2 px-3.5 rounded-xl bg-white/90 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-white/60'>
                  <span className='text-xs'>✨</span>
                  <span className='text-xs font-medium text-[#2C3E2D]'>
                    Orgánico Certificado
                  </span>
                </div>
              </motion.div>

              {/* Price tag */}
              <motion.div
                animate={{ y: [0, 6, 0], rotate: [0, -1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: 'easeInOut',
                  delay: 2,
                }}
                className='absolute bottom-16 -left-4 sm:bottom-20 sm:-left-8 z-20'
              >
                <div className='py-2.5 px-4 rounded-2xl bg-[#5C7A56] text-white shadow-[0_6px_24px_rgba(92,122,86,0.3)]'>
                  <span className='block text-[10px] uppercase tracking-wider opacity-80'>
                    Desde
                  </span>
                  <span className='block text-lg font-bold leading-tight'>
                    $9.95
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className='absolute bottom-6 left-1/2 -translate-x-1/2 z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className='flex flex-col items-center cursor-pointer'
          animate={{ y: [0, 6, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          <span className='text-[#5C7A56] text-xs mb-2 font-light tracking-[0.2em] uppercase'>
            Explora
          </span>
          <div className='w-6 h-10 rounded-full border-[1.5px] border-[#5C7A56]/30 flex items-start justify-center p-1'>
            <motion.div
              className='w-1 h-2 bg-[#5C7A56]/50 rounded-full'
              animate={{ y: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
