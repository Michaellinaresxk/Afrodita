'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProductGallery({ product }) {
  // Estado para la imagen principal seleccionada
  const [selectedImage, setSelectedImage] = useState(0);

  // En una app real, cada producto tendría múltiples imágenes
  // Para este ejemplo, creamos un array con variaciones
  const productImages = [
    product.image,
    product.image.replace('.jpg', '-2.jpg'),
    product.image.replace('.jpg', '-3.jpg'),
    product.image.replace('.jpg', '-4.jpg'),
  ];

  // Referencias para zoom
  const imageContainerRef = useRef(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  // Función para manejar el efecto de zoom
  const handleMouseMove = (e) => {
    if (imageContainerRef.current) {
      const { left, top, width, height } =
        imageContainerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;

      setZoomPosition({ x, y });
    }
  };

  return (
    <div className='space-y-4'>
      {/* Imagen principal con zoom */}
      <div
        ref={imageContainerRef}
        className='relative overflow-hidden rounded-xl aspect-square shadow-md'
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <div
          className='absolute inset-0 transition-all duration-300 cursor-zoom-in'
          style={{
            backgroundImage: `url(${productImages[selectedImage]})`,
            backgroundPosition: isZoomed
              ? `${zoomPosition.x}% ${zoomPosition.y}%`
              : 'center',
            backgroundSize: isZoomed ? '150%' : 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#f8f9fa', // Un color neutro de fondo
          }}
        ></div>
        <div className='relative aspect-square'>
          <Image
            src={productImages[selectedImage]}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            className={`transition-opacity duration-300 ${
              isZoomed ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>

        {/* Etiquetas de producto (nuevo, oferta, etc.) */}
        <div className='absolute top-4 left-4 z-10 flex flex-col gap-2'>
          {product.isNew && (
            <span className='bg-secondary-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md'>
              Nuevo
            </span>
          )}
          {product.discount && (
            <span className='bg-rose-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md'>
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* Galería horizontal de miniaturas */}
      <div className='flex items-center gap-2 overflow-x-auto py-2 scrollbar-hide'>
        {productImages.map((img, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-200 ${
              selectedImage === index
                ? 'border-primary-500 shadow-md'
                : 'border-neutral-200 hover:border-primary-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={img}
              alt={`${product.name} - Vista ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
