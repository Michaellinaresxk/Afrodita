// components/products/ProductGallery.tsx - Versión mejorada
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/lib/graphql/types';

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  console.log('ProductGallery - Iniciando con producto:', product.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [imageErrors, setImageErrors] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  // Verificar que product y product.image existan
  useEffect(() => {
    console.log(
      'ProductGallery - URL de imagen:',
      typeof product.image === 'string'
        ? product.image
        : product.image && 'url' in product.image
        ? product.image.url
        : 'Imagen no disponible'
    );
  }, [product]);

  // Obtener la URL de la imagen principal de manera más segura
  const getMainImageUrl = () => {
    try {
      if (typeof product.image === 'string') {
        return product.image;
      } else if (
        product.image &&
        typeof product.image === 'object' &&
        'url' in product.image
      ) {
        return product.image.url;
      }
      return '/jabon.jpg'; // Imagen de placeholder genérica
    } catch (error) {
      console.error('Error al obtener URL de imagen principal:', error);
      return '/jabon.jpg';
    }
  };

  const mainImageUrl = getMainImageUrl();
  console.log('ProductGallery - mainImageUrl:', mainImageUrl);

  // En lugar de intentar generar variantes que podrían no existir,
  // simplemente usamos la misma imagen principal para todos los thumbnails
  const placeholderUrl = '/jabon.jpg';

  // Simplemente usamos la misma imagen principal repetida para todos los thumbnails
  const productImages = [
    mainImageUrl,
    mainImageUrl,
    mainImageUrl,
    mainImageUrl,
  ];

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageContainerRef.current && isZoomed) {
      const { left, top, width, height } =
        imageContainerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPosition({ x, y });
    }
  };

  const handleImageError = (index: number) => {
    console.error(
      `Error al cargar imagen ${index} para producto ${product.id}`
    );
    const newErrors = [...imageErrors];
    newErrors[index] = true;
    setImageErrors(newErrors);
  };

  // Get image URL with error handling
  const getImageUrl = (index: number) => {
    return imageErrors[index] ? placeholderUrl : productImages[index];
  };

  return (
    <div className='space-y-6'>
      {/* Imagen principal con zoom */}
      <div
        ref={imageContainerRef}
        className='relative overflow-hidden rounded-xl aspect-square shadow-lg cursor-zoom-in bg-gray-100'
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <motion.div
          className='absolute inset-0 transition-all duration-300'
          style={{
            backgroundImage: `url(${getImageUrl(selectedImage)})`,
            backgroundPosition: isZoomed
              ? `${zoomPosition.x}% ${zoomPosition.y}%`
              : 'center',
            backgroundSize: isZoomed ? 'cover' : 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#f8f9fa',
          }}
          animate={{ opacity: 1 }}
        />
      </div>

      {/* Galería horizontal de miniaturas */}
      <div className='flex items-center gap-3 overflow-x-auto py-2 scrollbar-hide'>
        {[0, 1, 2, 3].map((index) => (
          <motion.button
            key={`product-thumb-${product.id}-${index}`}
            onClick={() => setSelectedImage(index)}
            className={`relative h-20 w-20 rounded-md overflow-hidden border-3 flex-shrink-0 transition-all duration-200 ${
              selectedImage === index
                ? 'border-primary-500 shadow-md'
                : 'border-neutral-200 hover:border-primary-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className='relative w-full h-full bg-gray-200'>
              <Image
                src={getImageUrl(index)}
                alt={`${product.name} - Vista ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                onError={() => handleImageError(index)}
              />
            </div>
            {selectedImage === index && (
              <div className='absolute inset-0 bg-primary-500/20 rounded-md' />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
