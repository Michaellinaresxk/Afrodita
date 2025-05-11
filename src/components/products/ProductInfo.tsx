'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ReviewStars from './ReviewStars';
// @ts-expect-error Ignorar tipado implícito por compatibilidad
export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || null
  );
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Beneficios del producto (reducidos para minimalismo)
  const productBenefits = [
    product.benefits?.[0] && {
      title: product.benefits[0].title,
      description: product.benefits[0].description,
      icon: (
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          {product.benefits[0].icon}
        </svg>
      ),
    },
    product.benefits?.[1] && {
      title: product.benefits[1].title,
      description: product.benefits[1].description,
      icon: (
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          {product.benefits[1].icon}
        </svg>
      ),
    },
  ].filter(Boolean); // Filtra beneficios nulos

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  return (
    <div className='space-y-6'>
      {/* Badge de categoría (más sutil) */}
      {product.badgeText && (
        <div className='mb-2'>
          <span
            className={`inline-block text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full`}
          >
            {product.badgeText}
          </span>
        </div>
      )}

      {/* Nombre */}
      <h1 className='font-serif text-3xl font-semibold text-primary-900 tracking-tight'>
        {product.name}
      </h1>

      {/* Valoraciones y Stock */}
      <div className='flex items-center text-sm text-neutral-500'>
        <div className='flex mr-3'>
          <ReviewStars rating={product.rating} size='small' />
        </div>
        <span>{product.rating.toFixed(1)}</span>
        <span className='mx-1'>·</span>
        <span
          className={`font-medium ${
            product.stock > 5
              ? 'text-green-600'
              : product.stock > 0
              ? 'text-amber-600'
              : 'text-red-600'
          }`}
        >
          {product.stock > 5
            ? 'En stock'
            : product.stock > 0
            ? `Solo ${product.stock}`
            : 'Agotado'}
        </span>
      </div>

      {/* Precio */}
      <div className='mb-4'>
        {product.discount > 0 ? (
          <div className='flex items-center'>
            <span className='text-2xl font-bold text-primary-900 mr-2'>
              {(product.price * (1 - product.discount / 100)).toFixed(2)}€
            </span>
            <span className='text-lg text-neutral-500 line-through'>
              {product.price.toFixed(2)}€
            </span>
            {/* <span className='ml-2 bg-rose-100 text-rose-700 text-xs font-medium px-2 py-0.5 rounded'>
              Ahorra {((product.price * product.discount) / 100).toFixed(2)}€
            </span> */}
          </div>
        ) : (
          <span className='text-2xl font-bold text-primary-900'>
            {product.price.toFixed(2)}€
          </span>
        )}
      </div>

      {/* Descripción breve (más compacta) */}
      <p className='text-neutral-600 text-sm line-clamp-3'>
        {product.description}
      </p>

      {/* Variantes (más sutil) */}
      {product.variants && product.variants.length > 0 && (
        <div className='mb-4'>
          <h3 className='text-xs font-medium text-neutral-700 mb-2 uppercase tracking-wider'>
            Opciones:
          </h3>
          <div className='flex flex-wrap gap-2'>
            {product.variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(variant)}
                className={`px-3 py-1 rounded-md border text-xs font-medium ${
                  selectedVariant === variant
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-neutral-300 text-neutral-700 hover:border-primary-300'
                } transition-colors`}
              >
                {variant.size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selección de cantidad (moderno) */}
      <div className='mb-6'>
        <h3 className='text-xs font-medium text-neutral-700 mb-2 uppercase tracking-wider'>
          Cantidad:
        </h3>
        <div className='flex items-center w-32 h-10 border border-neutral-300 rounded-md overflow-hidden'>
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className='w-10 h-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            <svg className='w-4 h-4' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          <span className='flex-1 text-center font-medium text-neutral-800'>
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            disabled={quantity >= product.stock}
            className='w-10 h-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            <svg className='w-4 h-4' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Botones de acción (más minimalista) */}
      <div className='flex gap-3'>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='bg-primary-600 hover:bg-primary-700 text-white py-2.5 px-5 rounded-md font-medium shadow-sm transition-all flex items-center justify-center text-sm'
        >
          <svg
            className='w-4 h-4 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
            />
          </svg>
          Añadir
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleWishlist}
          className={`h-10 w-10 rounded-md flex items-center justify-center shadow-sm transition-all border border-neutral-300 hover:border-primary-300 ${
            isInWishlist
              ? 'bg-rose-100 text-rose-600'
              : 'bg-white text-neutral-700'
          }`}
        >
          <svg
            className='w-5 h-5'
            fill={isInWishlist ? 'currentColor' : 'none'}
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={isInWishlist ? 1 : 2}
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            />
          </svg>
        </motion.button>
      </div>

      {/* Beneficios sutiles */}
      {productBenefits.length > 0 && (
        <div className='border-t border-neutral-200 pt-4'>
          <h3 className='text-xs font-medium text-neutral-700 mb-2 uppercase tracking-wider'>
            Beneficios clave:
          </h3>
          <div className='flex items-center gap-4 text-sm text-neutral-600'>
            {productBenefits.map((benefit, index) => (
              <div key={index} className='flex items-center'>
                {benefit.icon && <div className='mr-2'>{benefit.icon}</div>}
                <span>{benefit.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detalles adicionales (reducidos) */}
      <div className='border-t border-neutral-200 pt-4 text-sm text-neutral-500 space-y-2'>
        <div>
          <span className='font-medium text-neutral-700'>SKU:</span>{' '}
          {product.id.toString().padStart(6, '0')}
        </div>
        <div>
          <span className='font-medium text-neutral-700'>Categoría:</span>{' '}
          <Link
            href={`/productos?categoria=${product.category}`}
            className='text-primary-600 hover:underline'
          >
            {product.category}
          </Link>
        </div>
        {product.ingredients && product.ingredients.length > 0 && (
          <div>
            <span className='font-medium text-neutral-700'>Ingredientes:</span>{' '}
            {product.ingredients.slice(0, 3).join(', ')}
            {product.ingredients.length > 3 && (
              <span className='ml-1'>+ {product.ingredients.length - 3}</span>
            )}
          </div>
        )}
      </div>

      {/* Envío y devoluciones (iconos más simples) */}
      <div className='mt-6 pt-4 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-600'>
        <div className='flex items-center'>
          <svg
            className='w-5 h-5 mr-2 text-primary-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>Envío rápido</span>
        </div>
        <div className='flex items-center'>
          <svg
            className='w-5 h-5 mr-2 text-primary-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12h6m-6 4h6m2-2H9m2-2h2'
            />
          </svg>
          <span>Devoluciones fáciles</span>
        </div>
        <div className='flex items-center'>
          <svg
            className='w-5 h-5 mr-2 text-primary-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
            />
          </svg>
          <span>Pago seguro</span>
        </div>
      </div>
    </div>
  );
}
