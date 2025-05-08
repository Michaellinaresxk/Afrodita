'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Componente de tarjeta de producto
const ProductCard = ({ product, variants }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={variants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className='group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col'
    >
      {/* Borde decorativo superior */}
      <div
        className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r'
        style={{
          backgroundImage: `linear-gradient(to right, ${product.colors[0]}, ${product.colors[1]})`,
        }}
      ></div>

      {/* Insignias */}
      <div className='absolute top-4 right-4 z-20 flex flex-col gap-2'>
        {product.isNew && (
          <div className='bg-secondary-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md'>
            Nuevo
          </div>
        )}
        {product.stock <= 5 && (
          <div className='bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md'>
            ¡Últimas unidades!
          </div>
        )}
      </div>

      {/* Imagen y capa de efecto */}
      <div className='relative overflow-hidden'>
        <Link href={`/productos/${product.id}`}>
          <div
            className={`relative h-64 ${product.bg} flex items-center justify-center p-6`}
          >
            <motion.div
              animate={{
                y: isHovered ? -8 : 0,
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className='h-auto w-auto object-contain drop-shadow-xl'
              />
            </motion.div>

            {/* Superposición en hover */}
            <motion.div
              className='absolute inset-0 bg-black/0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
              style={{
                background:
                  'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%)',
              }}
            >
              <span className='bg-white text-primary-700 px-4 py-2 rounded-full shadow-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                Ver detalles
              </span>
            </motion.div>
          </div>
        </Link>
      </div>

      {/* Información del producto */}
      <div className='p-5 flex-grow flex flex-col'>
        <div className='mb-2'>
          <div className='flex items-center'>
            <span
              className={`inline-block ${product.accent} text-xs font-medium px-2 py-1 rounded-full ${product.bg}`}
            >
              {product.badgeText}
            </span>

            {/* Valoraciones */}
            <div className='flex ml-auto'>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${
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
          </div>
        </div>

        <Link
          href={`/productos/${product.id}`}
          className='block group-hover:text-primary-700'
        >
          <h3 className='font-serif text-lg font-semibold mb-1.5 transition-colors'>
            {product.name}
          </h3>
        </Link>

        <p className='text-neutral-600 text-sm mb-4 line-clamp-2'>
          {product.description}
        </p>

        {/* Ingredientes principales en chips */}
        <div className='mt-auto'>
          <div className='flex flex-wrap gap-1 mb-4'>
            {product.ingredients.slice(0, 2).map((ingredient, idx) => (
              <span
                key={idx}
                className='text-xs bg-neutral-50 text-neutral-600 px-2 py-1 rounded-full'
              >
                {ingredient}
              </span>
            ))}
            {product.ingredients.length > 2 && (
              <span className='text-xs bg-neutral-50 text-neutral-600 px-2 py-1 rounded-full'>
                +{product.ingredients.length - 2}
              </span>
            )}
          </div>

          {/* Precio y Acciones */}
          <div className='flex items-center justify-between mt-auto'>
            <div className='flex flex-col'>
              <span className='text-xl font-bold text-primary-900'>
                {product.price.toFixed(2)}€
              </span>
              {product.stock <= 5 ? (
                <span className='text-xs text-red-500'>
                  Solo {product.stock} en stock
                </span>
              ) : (
                <span className='text-xs text-green-600'>En stock</span>
              )}
            </div>

            <div className='flex space-x-2'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-primary-600 hover:bg-primary-700 text-white p-2.5 rounded-full transition-colors shadow-md hover:shadow-lg flex items-center justify-center'
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

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-white hover:bg-neutral-50 text-primary-700 hover:text-primary-800 p-2.5 rounded-full transition-colors border border-neutral-200 hover:border-primary-200 shadow-md hover:shadow-lg flex items-center justify-center'
                aria-label='Añadir a favoritos'
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
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  ></path>
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
