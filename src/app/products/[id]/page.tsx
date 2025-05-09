'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { luxuryProducts } from '@/constants/products';
import Breadcrumb from '@/components/products/Breadcrumb';
import ProductGallery from '@/components/products/ProductGallery';
import ProductTabs from '@/components/products/ProductTabs';
import ProductInfo from '@/components/products/ProductInfo';
import RelatedProducts from '@/components/products/RelatedProducts';

export default function ProductDetailsPage({ params }) {
  // En una aplicación real, obtendríamos los datos del producto desde una API basándose en el ID
  const productId = params.id;

  // Simulamos la búsqueda del producto por ID
  const product =
    luxuryProducts.find((p) => p.id.toString() === productId) ||
    luxuryProducts[0];

  // Simulamos productos relacionados
  const relatedProducts = luxuryProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const productRef = useRef(null);
  const isProductInView = useInView(productRef, { once: true, amount: 0.2 });

  // Variantes para animaciones
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      {/* Navegación de migas de pan */}
      <Breadcrumb product={product} />

      {/* Detalles del producto - Layout principal con imagen y texto lado a lado */}
      <section ref={productRef} className='py-12 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Columna izquierda - Imagen principal del producto */}
            <motion.div
              variants={fadeInUpVariants}
              initial='hidden'
              animate={isProductInView ? 'visible' : 'hidden'}
              className='lg:sticky lg:top-32 self-start'
            >
              <ProductGallery product={product} />
            </motion.div>

            {/* Columna derecha - Información del producto */}
            <motion.div
              variants={fadeInUpVariants}
              initial='hidden'
              animate={isProductInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.2 }}
            >
              <ProductInfo product={product} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pestañas de información detallada */}
      <ProductTabs product={product} />

      {/* Productos relacionados */}
      <RelatedProducts products={relatedProducts} />
    </>
  );
}
