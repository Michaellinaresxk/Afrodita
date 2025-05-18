'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Añadimos Link de Next.js
import { Product } from '@/lib/graphql/types';

interface ProductCardProps {
  product: Product;
  variants?: any;
}

const ProductCard = ({ product, variants }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  // Función mejorada para extraer la URL de la imagen de manera segura
  const getImageUrl = () => {
    // Caso 1: product.image es una URL string directamente
    if (typeof product.image === 'string') {
      return product.image;
    }

    // Caso 2: product.image es un objeto con propiedad url
    if (
      product.image &&
      typeof product.image === 'object' &&
      'url' in product.image
    ) {
      return product.image.url;
    }

    // Fallback a imagen predeterminada
    return '/img/productos/2.jpg';
  };

  const imageUrl = getImageUrl();

  // Asegurarse de que tenemos un ID válido
  const hasValidId =
    product.id &&
    (typeof product.id === 'string' || typeof product.id === 'number');

  // Función para manejar el clic en todo el producto
  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasValidId) {
      const productId = String(product.id);
      console.log('Navegando a producto con ID:', productId);

      // SOLUCIÓN: Usamos la ruta correcta con el ID real del producto
      router.push(`/products/${productId}`);
    }
  };

  // Otra opción es usar Link directamente
  return (
    <Link href={hasValidId ? `/products/${product.id}` : '#'} passHref>
      <motion.div
        variants={variants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className='group relative bg-neutral-50 rounded-lg overflow-hidden shadow-sm transition-all duration-300 h-full flex flex-col cursor-pointer'
        data-product-id={product.id} // Agregar atributo de datos para depuración
      >
        {/* Imagen principal - Ocupa todo el espacio y es un enlace */}
        <div className='relative block h-64 sm:h-72 md:h-80'>
          <Image
            src={imageError ? '/img/productos/2.jpg' : imageUrl}
            alt={product.name}
            className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            style={{ objectFit: 'cover' }}
            priority
            onError={() => {
              console.warn(`Error loading image for product: ${product.id}`);
              setImageError(true);
            }}
          />
        </div>

        {/* Información del producto - Superpuesta ligeramente */}
        <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 md:p-8 text-white'>
          <h3 className='font-serif text-lg font-semibold mb-1 transition-colors group-hover:text-primary-300'>
            {product.name}
          </h3>
          <p className='text-sm opacity-70 line-clamp-2'>
            {product.description}
          </p>
          <div className='flex items-center justify-between mt-2'>
            <span className='text-xl font-bold'>
              RD$ {product.price.toFixed(2)}
            </span>
            {/* Botones de acción */}
            <div
              className='flex space-x-2'
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className='bg-primary-500 hover:bg-primary-600 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400'
                aria-label='Añadir al carrito'
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
                    d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                  ></path>
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className='bg-neutral-200 hover:bg-neutral-300 text-neutral-700 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-400'
                aria-label='Añadir a favoritos'
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
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  ></path>
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Borde inferior con colores dinámicos si están disponibles */}
        {product.colors && product.colors.length > 0 && (
          <div
            className='absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r'
            style={{
              backgroundImage: `linear-gradient(to right, ${
                product.colors[0]
              }, ${product.colors[1] || product.colors[0]})`,
            }}
          ></div>
        )}
      </motion.div>
    </Link>
  );
};

export default ProductCard;
