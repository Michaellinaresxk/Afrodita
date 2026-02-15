'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// ── Leaf SVG decoration (consistent with Hero) ──
const LeafAccent = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox='0 0 120 180'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M60 170C60 170 10 130 10 70C10 10 60 5 60 5C60 5 110 10 110 70C110 130 60 170 60 170Z'
      fill='currentColor'
      fillOpacity='0.05'
    />
    <path
      d='M60 170C60 170 60 5 60 5'
      stroke='currentColor'
      strokeOpacity='0.08'
      strokeWidth='1.5'
    />
    <path
      d='M60 40C75 50 85 55 95 55'
      stroke='currentColor'
      strokeOpacity='0.06'
      strokeWidth='1'
    />
    <path
      d='M60 70C45 80 30 82 20 80'
      stroke='currentColor'
      strokeOpacity='0.06'
      strokeWidth='1'
    />
    <path
      d='M60 100C75 108 88 108 98 105'
      stroke='currentColor'
      strokeOpacity='0.06'
      strokeWidth='1'
    />
  </svg>
);

type PageBannerProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export default function PageBanner({
  title,
  description,
  imageSrc,
  imageAlt,
}: PageBannerProps) {
  return (
    <div className='relative h-80 sm:h-96 overflow-hidden bg-[#FBF9F5]'>
      {/* Background image with warm overlay */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        style={{ objectFit: 'cover' }}
        priority
        quality={90}
        className='opacity-30'
      />

      {/* Warm gradient overlay instead of dark */}
      <div className='absolute inset-0 bg-gradient-to-b from-[#FBF9F5]/70 via-[#F5F0E8]/60 to-[#EDE7DB]/80' />

      {/* Subtle tropical color blobs */}
      <div className='absolute -top-20 -right-16 w-64 h-64 rounded-full bg-[#C4D7A4]/20 blur-[80px]' />
      <div className='absolute -bottom-10 -left-16 w-56 h-56 rounded-full bg-[#E8C4A0]/15 blur-[80px]' />

      {/* Dot pattern */}
      <div
        className='absolute inset-0 opacity-[0.02]'
        style={{
          backgroundImage:
            'radial-gradient(circle, #5C7A56 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Botanical decorations */}
      <LeafAccent className='absolute top-6 right-6 w-16 h-24 text-[#5C7A56] opacity-40 rotate-12 sm:w-20 sm:h-28 sm:right-12' />
      <LeafAccent className='absolute bottom-4 left-4 w-14 h-20 text-[#5C7A56] opacity-30 -rotate-[20deg] sm:w-18 sm:left-10' />

      {/* Content */}
      <div className='relative h-full flex items-center justify-center text-center z-10'>
        <div className='max-w-3xl px-5'>
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className='font-serif text-4xl md:text-5xl text-[#2C3E2D] font-bold mb-4'
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className='text-[#5E6B5A] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed'
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Bottom fade to page bg */}
      <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAFAF7] to-transparent' />
    </div>
  );
}
