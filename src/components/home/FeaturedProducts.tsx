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

// Componente de tarjeta de producto luxury
function LuxuryProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className='group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 h-full flex flex-col'
    >
      {/* Borde decorativo superior */}
      <div
        className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r'
        style={{
          backgroundImage: `linear-gradient(to right, ${product.colors[0]}, ${product.colors[1]})`,
        }}
      ></div>

      {/* Badge de Nuevo */}
      {product.isNew && (
        <div className='absolute top-4 right-4 z-20'>
          <div className='bg-secondary-500 text-white text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full shadow-md'>
            Nuevo
          </div>
        </div>
      )}

      {/* Parte superior con imagen y gradiente */}
      <div className={`relative p-6 h-64 overflow-hidden ${product.bg}`}>
        <div className='absolute inset-0 opacity-30 pattern-dots'></div>

        {/* Círculos decorativos */}
        <div className='absolute top-4 left-4 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm'></div>
        <div className='absolute bottom-10 right-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm'></div>

        {/* Etiqueta de categoría */}
        <div className='absolute top-4 left-4 z-10'>
          <span
            className={`inline-block ${product.accent} ${product.bg} border ${product.border} text-xs font-medium px-3 py-1 rounded-full`}
          >
            {product.badgeText}
          </span>
        </div>

        {/* Imagen del producto con animación */}
        <motion.div
          animate={{
            y: isHovered ? -8 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
          className='absolute inset-0 flex items-center justify-center z-10'
        >
          <div className='relative h-48 w-48 mx-auto'>
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
              className='drop-shadow-2xl'
            />
          </div>
        </motion.div>
      </div>

      {/* Información del producto */}
      <div className='p-6 bg-white flex-grow flex flex-col relative'>
        {/* Decoración de línea con círculo */}
        <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-neutral-50 flex items-center justify-center'>
          <div
            className='w-2 h-2 rounded-full'
            style={{ backgroundColor: product.colors[1] }}
          ></div>
        </div>

        {/* Nombre y detalles */}
        <h3
          className={`font-serif text-xl font-bold mb-2 group-hover:${product.accent} transition-colors duration-300`}
        >
          {product.name}
        </h3>

        <p className='text-neutral-600 text-sm mb-4 line-clamp-2'>
          {product.description}
        </p>

        {/* Ingredientes principales */}
        <div className='mb-4'>
          <p className='text-xs text-neutral-500 mb-1'>
            Ingredientes principales:
          </p>
          <div className='flex flex-wrap gap-1'>
            {product.ingredients.slice(0, 3).map((ingredient, idx) => (
              <span
                key={idx}
                className='text-xs bg-neutral-50 text-neutral-600 px-2 py-1 rounded-full'
              >
                {ingredient}
              </span>
            ))}
            {product.ingredients.length > 3 && (
              <span className='text-xs bg-neutral-50 text-neutral-600 px-2 py-1 rounded-full'>
                +{product.ingredients.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Valoraciones */}
        <div className='flex items-center mt-auto mb-4'>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-amber-400'
                    : 'text-neutral-200'
                }`}
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
              </svg>
            ))}
          </div>
          <span className='text-xs text-neutral-500 ml-2'>
            ({product.reviews})
          </span>
        </div>

        {/* Precio y botones */}
        <div className='flex items-center justify-between mt-auto'>
          <div>
            <span className='text-sm text-neutral-500 line-through mr-2'>
              {(product.price * 1.2).toFixed(2)}€
            </span>
            <span className='text-xl font-bold text-primary-900'>
              {product.price.toFixed(2)}€
            </span>
          </div>

          <div className='flex space-x-2'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full transition-colors shadow-md hover:shadow-lg'
              aria-label='Añadir al carrito'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                ></path>
              </svg>
            </motion.button>

            <Link
              href={`/productos/${product.id}`}
              className='bg-white hover:bg-neutral-50 text-primary-700 hover:text-primary-800 p-3 rounded-full transition-colors border border-neutral-200 hover:border-primary-200 shadow-md hover:shadow-lg'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                ></path>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
