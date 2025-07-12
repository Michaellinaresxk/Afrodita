'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/graphql/types';

interface ProductCardProps {
  product: Product;
  variants?: unknown;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Enhanced image URL extraction
  const getImageUrl = (): string => {
    if (typeof product.image === 'string') {
      return product.image;
    }

    if (
      product.image &&
      typeof product.image === 'object' &&
      'url' in product.image
    ) {
      return product.image.url || '/img/productos/2.jpg';
    }

    return '/img/productos/2.jpg';
  };

  const imageUrl = getImageUrl();

  const hasValidId =
    product.id &&
    (typeof product.id === 'string' || typeof product.id === 'number');

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1 
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative h-full"
    >
      <Link 
        href={hasValidId ? `/products/${product.id}` : '#'} 
        className="block h-full"
      >
        <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-emerald-200/30">
          
          {/* Image container with modern styling */}
          <div className="relative h-72 sm:h-80 overflow-hidden">
            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 animate-pulse" />
            )}
            
            <Image
              src={imageError ? '/img/productos/2.jpg' : imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 4}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                console.warn(`Error loading image for product: ${product.id}`);
                setImageError(true);
                setIsLoading(false);
              }}
            />

            {/* Modern gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Status badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                  className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg"
                >
                  Nuevo
                </motion.span>
              )}
              {product.isSale && product.oldPrice && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="px-3 py-1 bg-rose-500 text-white text-xs font-semibold rounded-full shadow-lg"
                >
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </motion.span>
              )}
            </div>

            {/* Quick action button */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              whileHover="visible"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Add to cart logic here
                }}
                className="w-10 h-10 bg-white/90 backdrop-blur-md hover:bg-white text-emerald-600 hover:text-emerald-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border border-emerald-200/50"
                aria-label="Añadir al carrito"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </motion.button>
            </motion.div>
          </div>

          {/* Product information with glassmorphism */}
          <div className="relative flex-1 p-6">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-50/50 to-transparent rounded-full blur-xl" />
            
            <div className="relative">
              {/* Product name */}
              <h3 className="font-medium text-xl text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Rating stars */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-200'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.rating.toFixed(1)})</span>
                </div>
              )}

              {/* Ingredients preview */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {product.ingredients.slice(0, 3).map((ingredient, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200/50"
                      >
                        {ingredient}
                      </span>
                    ))}
                    {product.ingredients.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full border border-gray-200">
                        +{product.ingredients.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Price section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-light text-gray-900">
                    RD$ {product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      RD$ {product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Stock indicator */}
                {product.stock !== undefined && (
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${
                      product.stock > 10 
                        ? 'bg-emerald-400' 
                        : product.stock > 0 
                        ? 'bg-amber-400' 
                        : 'bg-rose-400'
                    }`} />
                    <span className="text-xs text-gray-500">
                      {product.stock > 10 
                        ? 'En stock' 
                        : product.stock > 0 
                        ? 'Pocas unidades' 
                        : 'Agotado'
                      }
                    </span>
                  </div>
                )}
              </div>

              {/* Hover call-to-action */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100"
              >
                <div className="flex items-center justify-center text-emerald-600 font-medium text-sm">
                  <span>Ver detalles</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom gradient accent */}
          <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;