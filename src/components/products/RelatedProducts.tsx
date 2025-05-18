'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { Product } from '@/lib/graphql/types';

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  if (!products || products.length === 0) return null;

  return (
    <section ref={ref} className='py-16 bg-primary-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className='text-center mb-10'
        >
          <h2 className='font-serif text-3xl font-bold text-primary-800 mb-4'>
            También te puede interesar
          </h2>
          <p className='text-neutral-600 max-w-2xl mx-auto'>
            Otros productos similares que podrían complementar tu rutina de
            cuidado natural
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
        >
          {products.map((product, index) => (
            <motion.div
              key={`related-product-${product.id || index}-${Date.now()}`}
              variants={itemVariants}
            >
              <ProductCard product={product} variants={undefined} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className='text-center mt-10'
        >
          <Link
            href='/products'
            className='inline-flex items-center bg-white text-primary-700 hover:text-primary-800 py-3 px-6 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-primary-100 group'
          >
            <span>Ver todos los productos</span>
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
