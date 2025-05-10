'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import ProductCard from '../products/ProductCard';
import { luxuryProducts } from '@/constants/products';

export default function LuxuryProductSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Variantes para animaciones
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

  return (
    <section ref={ref} className='py-24 bg-neutral-50 relative overflow-hidden'>
      {/* Elementos decorativos de fondo */}
      <div className='absolute inset-0 pattern-dots opacity-20'></div>
      <div className='absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary-100/30 blur-3xl'></div>
      <div className='absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-rose-100/20 blur-3xl'></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className='text-center mb-16'
        >
          <span className='inline-block text-sm font-medium text-primary-600 mb-2 tracking-wider uppercase bg-primary-50 px-4 py-1 rounded-full border border-primary-100'>
            Colección premium
          </span>
          <h2 className='font-serif text-3xl md:text-4xl font-bold text-primary-900 mb-5'>
            Jabones Artesanales de Lujo
          </h2>
          <p className='text-neutral-600 max-w-2xl mx-auto'>
            Descubre nuestra exquisita colección de jabones premium elaborados
            con los ingredientes más selectos y técnicas artesanales para el
            cuidado sublime de tu piel.
          </p>
        </motion.div>

        {/* Productos destacados en formato de carrusel para asegurar que se muestren en fila */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='relative'
        >
          {/* Desktop view - Grilla que asegura disposición horizontal */}
          <div className='hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {luxuryProducts
              .filter((product) => product.featured === true)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          {/* Mobile view - Swiper para asegurar scroll horizontal */}
          <div className='md:hidden'>
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={false}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className='products-swiper overflow-visible pb-12'
            >
              {luxuryProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className='text-center mt-12'
        >
          <Link
            href='/products'
            className='inline-flex items-center bg-white text-primary-700 hover:text-primary-800 py-3 px-6 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-primary-100 group'
          >
            <span>Ver toda la colección</span>
            <svg
              className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              ></path>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
