'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

// Add proper TypeScript interface for props
interface ProductInfoProps {
  product: {
    id: number;
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
  };
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  // Verificar si product.sizes existe y tiene elementos
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Estándar'
  );
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Usar el contexto del carrito
  const { addToCart } = useCart();

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, selectedQuantity + value);
    setSelectedQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // Añadir el producto al carrito con la información seleccionada
    addToCart(
      {
        ...product,
        selectedSize,
      },
      selectedQuantity
    );
  };

  return (
    <div className='space-y-8'>
      {/* Etiquetas de estado (nuevo, oferta, etc.) */}
      <div className='flex flex-wrap gap-2'>
        {product.isNew && (
          <span className='bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded-full'>
            Nuevo
          </span>
        )}
        {product.isSale && (
          <span className='bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full'>
            Oferta
          </span>
        )}
        {product.stock < 5 && product.stock > 0 && (
          <span className='bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full'>
            ¡Últimas unidades!
          </span>
        )}
      </div>

      {/* Nombre e información básica */}
      <div>
        <h1 className='font-serif text-3xl md:text-4xl font-bold text-primary-900 mb-2'>
          {product.name}
        </h1>
        <div className='flex items-center gap-4 mb-4'>
          <div className='flex items-center'>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-neutral-300'
                }`}
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
              </svg>
            ))}
            <span className='ml-2 text-neutral-600'>
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className='text-neutral-400'>|</span>
          <span className='text-neutral-600'>
            {product.reviews} valoraciones
          </span>
        </div>

        <p className='text-lg text-neutral-600 mb-6'>{product.description}</p>

        {/* Precio con posible descuento */}
        <div className='flex items-center gap-3 mb-6'>
          <span className='text-3xl font-bold text-primary-800'>
            RD$ {product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className='text-xl text-neutral-400 line-through'>
              RD$ {product.oldPrice.toFixed(2)}
            </span>
          )}
          {product.oldPrice && (
            <span className='px-2 py-1 text-xs font-bold text-white bg-rose-500 rounded-md'>
              {Math.round(
                ((product.oldPrice - product.price) / product.oldPrice) * 100
              )}
              % DESCUENTO
            </span>
          )}
        </div>
      </div>

      {/* Información de ingredientes */}
      <div className='bg-neutral-50 p-4 rounded-lg'>
        <h3 className='font-medium text-primary-800 mb-2'>Ingredientes</h3>
        <div className='flex flex-wrap gap-2'>
          {product.ingredients.map((ingredient) => (
            <span
              key={ingredient}
              className='bg-white text-neutral-700 px-3 py-1 rounded-full text-sm border border-neutral-200'
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      {/* Selección de tamaño */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='font-medium text-primary-800'>Tamaño</h3>
            <Link
              href='#sizes'
              className='text-xs text-primary-600 hover:text-primary-700'
            >
              Guía de tamaños
            </Link>
          </div>
          <div className='flex flex-wrap gap-2'>
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                  selectedSize === size
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-neutral-300 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controles de cantidad y botón de agregar al carrito */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex items-center border border-neutral-300 rounded-lg w-fit'>
          <button
            onClick={() => handleQuantityChange(-1)}
            className='w-10 h-10 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded-l-lg'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M20 12H4'
              ></path>
            </svg>
          </button>
          <div className='w-12 h-10 flex items-center justify-center font-medium text-neutral-800'>
            {selectedQuantity}
          </div>
          <button
            onClick={() => handleQuantityChange(1)}
            className='w-10 h-10 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded-r-lg'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              ></path>
            </svg>
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className='relative flex-1 overflow-hidden bg-green-600 hover:bg-primary-700 text-white font-medium px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group'
        >
          <span className='relative z-10 flex items-center'>
            <svg
              className='w-5 h-5 mr-2'
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
            Comprar Ahora
          </span>
          <div className='absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine' />
        </motion.button>
      </div>

      {/* Mensajes informativos */}
      <div className='space-y-3 pt-4 border-t border-neutral-200'>
        <div className='flex items-center text-sm text-neutral-600'>
          <svg
            className='w-5 h-5 mr-2 text-green-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 13l4 4L19 7'
            ></path>
          </svg>
          <span>
            <span className='font-medium'>Envío gratuito</span> en pedidos
            superiores a RD$ 50
          </span>
        </div>

        <div className='flex items-center text-sm text-neutral-600'>
          <svg
            className='w-5 h-5 mr-2 text-green-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
          </svg>
          <span>
            <span className='font-medium'>Entrega en 24/48h</span> para pedidos
            realizados antes de las 13h
          </span>
        </div>

        <div className='flex items-center text-sm text-neutral-600'>
          <svg
            className='w-5 h-5 mr-2 text-green-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
            ></path>
          </svg>
          <span>
            <span className='font-medium'>Devoluciones sin coste</span> durante
            los primeros 30 días
          </span>
        </div>
      </div>

      {/* Estilos adicionales para animación de brillo */}
      <style jsx global>{`
        @keyframes shine {
          100% {
            right: 125%;
          }
        }

        .animate-shine {
          animation: shine 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProductInfo;
