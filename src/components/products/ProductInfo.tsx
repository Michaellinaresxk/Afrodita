'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { Product as GraphQLProduct } from '@/lib/graphql/types';

// Enhanced TypeScript interface for props
interface ProductInfoProps {
  product:
    | GraphQLProduct
    | {
        id: number | string;
        name: string;
        description: string;
        price: number;
        oldPrice?: number;
        rating: number;
        reviews: number;
        isNew?: boolean;
        isSale?: boolean;
        stock: number;
        sizes?: string[];
        ingredients: string[];
        image?: { url?: string } | string;
        category?: { id: string; name: string } | string;
      };
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Estándar'
  );
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  // @ts-ignore - Cart context typing
  const { addToCart } = useCart();

  const handleQuantityChange = (value: number): void => {
    const newQuantity = Math.max(1, Math.min(product.stock, selectedQuantity + value));
    setSelectedQuantity(newQuantity);
  };

  const handleAddToCart = async (): Promise<void> => {
    setIsAddingToCart(true);
    
    // Simulate loading state
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addToCart(
      {
        ...product,
        selectedSize,
      },
      selectedQuantity
    );
    
    setIsAddingToCart(false);
  };

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8"
    >
      {/* Status badges with modern design */}
      <motion.div variants={itemVariant} className="flex flex-wrap gap-3">
        {product.isNew && (
          <span className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-xs font-semibold px-4 py-2 rounded-full border border-emerald-200/50 shadow-sm">
            ✨ Nuevo
          </span>
        )}
        {product.isSale && (
          <span className="bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 text-xs font-semibold px-4 py-2 rounded-full border border-rose-200/50 shadow-sm">
            🔥 Oferta
          </span>
        )}
        {product.stock < 5 && product.stock > 0 && (
          <span className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-xs font-semibold px-4 py-2 rounded-full border border-amber-200/50 shadow-sm animate-pulse">
            ⚡ Últimas unidades
          </span>
        )}
        {product.stock === 0 && (
          <span className="bg-gradient-to-r from-gray-100 to-slate-100 text-gray-600 text-xs font-semibold px-4 py-2 rounded-full border border-gray-200/50">
            Agotado
          </span>
        )}
      </motion.div>

      {/* Product name and basic info */}
      <motion.div variants={itemVariant}>
        <h1 className="font-light text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">
          {product.name}
        </h1>
        
        {/* Rating and reviews with modern styling */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.svg
                  key={`star-${i}`}
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-200'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </div>
            <span className="font-medium text-gray-800">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <Link 
            href="#reviews" 
            className="text-gray-600 hover:text-emerald-600 transition-colors text-sm font-medium"
          >
            {product.reviews} valoraciones
          </Link>
        </div>

        <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
          {product.description}
        </p>

        {/* Price section with enhanced styling */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-4xl font-light text-gray-900">
            RD$ {product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <>
              <span className="text-xl text-gray-400 line-through">
                RD$ {product.oldPrice.toFixed(2)}
              </span>
              <div className="px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg">
                {Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100
                )}% OFF
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Ingredients with modern card design */}
      <motion.div variants={itemVariant}>
        <div className="bg-gradient-to-br from-white/80 to-emerald-50/30 backdrop-blur-sm p-6 rounded-2xl border border-emerald-200/30 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <h3 className="font-semibold text-gray-900">Ingredientes naturales</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(product.ingredients) &&
              product.ingredients.map((ingredient, index) => (
                <motion.span
                  key={`ingredient-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/70 backdrop-blur-sm text-gray-700 px-3 py-2 rounded-xl text-sm border border-emerald-200/50 hover:bg-emerald-50/50 transition-colors cursor-pointer shadow-sm"
                >
                  {ingredient}
                </motion.span>
              ))}
          </div>
        </div>
      </motion.div>

      {/* Size selection with enhanced design */}
      {product.sizes && product.sizes.length > 0 && (
        <motion.div variants={itemVariant}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M11 7.343V10a2 2 0 002 2h2.657" />
              </svg>
              Tamaño
            </h3>
            <Link
              href="#sizes"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              Guía de tamaños
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size, index) => (
              <motion.button
                key={`size-${index}-${size}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-3 rounded-xl font-medium border-2 transition-all duration-300 ${
                  selectedSize === size
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md'
                    : 'border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/30'
                }`}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quantity and add to cart with modern controls */}
      <motion.div variants={itemVariant} className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10l1 8H6l1-8zM9 9v1a1 1 0 002 0V9m4 0v1a1 1 0 002 0V9" />
          </svg>
          <h3 className="font-semibold text-gray-900">Cantidad</h3>
          {product.stock > 0 && (
            <span className="text-sm text-gray-500">
              ({product.stock} disponibles)
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Quantity selector */}
          <div className="flex items-center bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <motion.button
              whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuantityChange(-1)}
              disabled={selectedQuantity <= 1}
              className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </motion.button>
            <div className="w-16 h-12 flex items-center justify-center font-semibold text-gray-900 bg-gray-50">
              {selectedQuantity}
            </div>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuantityChange(1)}
              disabled={selectedQuantity >= product.stock}
              className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </motion.button>
          </div>

          {/* Add to cart button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAddingToCart}
            className="relative flex-1 overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group min-h-[48px]"
          >
            {isAddingToCart ? (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Agregando...
              </div>
            ) : product.stock === 0 ? (
              <span>Producto agotado</span>
            ) : (
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Agregar al carrito
                <motion.svg 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </span>
            )}
            
            {/* Shine effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
          </motion.button>
        </div>
      </motion.div>

      {/* Service information with modern icons */}
      <motion.div variants={itemVariant}>
        <div className="space-y-4 pt-8 border-t border-gray-200">
          {[
            {
              icon: (
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                </svg>
              ),
              title: "Envío gratuito",
              description: "en pedidos superiores a RD$ 50"
            },
            {
              icon: (
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Entrega rápida",
              description: "24-48h para pedidos antes de las 13h"
            },
            {
              icon: (
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ),
              title: "Devoluciones gratuitas",
              description: "durante los primeros 30 días"
            },
            {
              icon: (
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Compra segura",
              description: "protección de datos garantizada"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-50/50 to-teal-50/30 border border-emerald-200/30 hover:bg-emerald-50/70 transition-colors group"
            >
              <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <span className="font-semibold text-gray-900 mr-1">{item.title}</span>
                <span className="text-gray-600">{item.description}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Custom styles for animations */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            right: -150%;
          }
          100% {
            right: 125%;
          }
        }

        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }
      `}</style>
    </motion.div>
  );
};

export default ProductInfo;