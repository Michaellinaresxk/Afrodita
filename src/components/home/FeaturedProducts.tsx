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

  // Usamos 'featured' como parámetro para obtener productos destacados
  const {
    products: featuredProducts,
    loading,
    error,
  } = useProducts('featured');

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

  // Renderizar estado de carga
  if (loading) {
    return (
      <section
        ref={ref}
        className='py-24 bg-neutral-50 relative overflow-hidden'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500'></div>
          </div>
        </div>
      </section>
    );
  }

  // Renderizar estado de error
  if (error) {
    return (
      <section
        ref={ref}
        className='py-24 bg-neutral-50 relative overflow-hidden'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center py-20'>
            <div className='text-red-500 mb-4'>
              <svg
                className='w-12 h-12 mx-auto'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <h3 className='text-xl font-medium text-gray-900 mb-2'>
              No se pudieron cargar los productos
            </h3>
            <p className='text-gray-600 mb-6'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700'
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Si no hay productos para mostrar
  if (featuredProducts.length === 0) {
    return (
      <section
        ref={ref}
        className='py-24 bg-neutral-50 relative overflow-hidden'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center py-20'>
            <p className='text-lg text-gray-600'>
              No hay productos destacados disponibles actualmente.
            </p>
          </div>
        </div>
      </section>
    );
  }

  console.log('Productos destacados:', featuredProducts);

  return (
    <section ref={ref} className='py-24 bg-neutral-50 relative overflow-hidden'>
      {/* Elementos decorativos */}
      <div className='absolute inset-0 pattern-dots opacity-20'></div>
      <div className='absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary-100/30 blur-3xl'></div>
      <div className='absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-rose-100/20 blur-3xl'></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Título y descripción */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className='relative py-16 px-4'
        >
          {/* Línea decorativa superior */}
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent'></div>

          <div className='text-center max-w-4xl mx-auto'>
            <h2 className='font-serif text-4xl md:text-5xl lg:text-6xl font-light text-primary-900 mb-6 tracking-wide'>
              Nuestros Productos
              <span className='block mt-2 font-normal'>Destacados</span>
            </h2>

            <p className='text-neutral-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto px-4'>
              Descubre nuestra selecta colección de jabones artesanales,
              <span className='block mt-1'>
                elaborados con los más finos ingredientes naturales para
                sublimar el cuidado de tu piel.
              </span>
            </p>
          </div>
        </motion.div>

        {/* Grid de productos - Versión unificada para todos los dispositivos */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='relative px-4 sm:px-0'
        >
          {/* Versión responsive unificada - similar a tu ejemplo de referencia */}
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

          {/* Versión Swiper para dispositivos muy pequeños (opcional) */}
          {featuredProducts.length > 3 && (
            <div className='mt-8 block sm:hidden'>
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
                {featuredProducts.slice(3).map((product, index) => (
                  <SwiperSlide
                    key={`featured-mobile-extra-${
                      product.id || index
                    }-${Date.now()}`}
                  >
                    <ProductCard product={product} variants={undefined} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </motion.div>

        {/* Botón "Ver toda la colección" */}
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
