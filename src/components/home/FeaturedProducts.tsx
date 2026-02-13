'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import ProductCard from '../products/ProductCard';
import { useProducts } from '@/hooks/useHygraphData';

export default function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const {
    products: featuredProducts,
    loading,
    error,
  } = useProducts('featured');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  // ── Loading ──
  if (loading) {
    return (
      <section
        ref={ref}
        className='py-24 bg-[#FAFAF7] relative overflow-hidden'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#5C7A56]' />
          </div>
        </div>
      </section>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <section
        ref={ref}
        className='py-24 bg-[#FAFAF7] relative overflow-hidden'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center py-20'>
            <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-red-400 mb-5'>
              <svg
                className='w-7 h-7'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <h3 className='text-lg font-serif font-bold text-[#2C3E2D] mb-2'>
              No se pudieron cargar los productos
            </h3>
            <p className='text-[#5E6B5A] mb-6 text-sm'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-[#5C7A56] hover:bg-[#4A6845] transition-colors shadow-sm'
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── Empty ──
  if (featuredProducts.length === 0) {
    return (
      <section
        ref={ref}
        className='py-24 bg-[#FAFAF7] relative overflow-hidden'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center py-20'>
            <p className='text-[#5E6B5A]'>
              No hay productos destacados disponibles actualmente.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className='py-24 bg-[#FAFAF7] relative overflow-hidden'>
      {/* Tropical decorative elements */}
      <div
        className='absolute inset-0 opacity-[0.02]'
        style={{
          backgroundImage:
            'radial-gradient(circle, #5C7A56 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className='absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#C4D7A4]/20 blur-[100px]' />
      <div className='absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#E8C4A0]/15 blur-[100px]' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className='relative py-16 px-4'
        >
          {/* Decorative top line */}
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#C4D7A4] to-transparent' />

          <div className='text-center max-w-4xl mx-auto'>
            <h2 className='font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#2C3E2D] mb-6 tracking-wide'>
              Nuestros Productos
              <span className='block mt-2 font-normal'>Destacados</span>
            </h2>

            <p className='text-[#5E6B5A] text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto px-4'>
              Descubre nuestra selecta colección de jabones artesanales,
              <span className='block mt-1'>
                elaborados con los más finos ingredientes naturales para
                sublimar el cuidado de tu piel.
              </span>
            </p>
          </div>
        </motion.div>

        {/* Products grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='relative px-4 sm:px-0'
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {featuredProducts.slice(0, 3).map((product, index) => (
              <motion.div
                key={`featured-product-${product.id || index}-${Date.now()}`}
                className='h-full'
              >
                <ProductCard product={product} variants={undefined} />
              </motion.div>
            ))}
          </div>

          {/* Mobile swiper for extra products */}
          {featuredProducts.length > 3 && (
            <div className='mt-8 block sm:hidden'>
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={16}
                slidesPerView={1.2}
                centeredSlides={false}
                pagination={{ clickable: true, dynamicBullets: true }}
                className='products-swiper overflow-visible pb-12'
              >
                {featuredProducts.slice(3).map((product, index) => (
                  <SwiperSlide
                    key={`featured-mobile-extra-${product.id || index}-${Date.now()}`}
                  >
                    <ProductCard product={product} variants={undefined} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className='text-center mt-12'
        >
          <Link
            href='/products'
            className='group inline-flex items-center gap-2 bg-white text-[#5C7A56] hover:text-[#4A6845] py-3 px-6 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-300 border border-[#E8E3DA] text-sm'
          >
            <span>Ver toda la colección</span>
            <svg
              className='w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
