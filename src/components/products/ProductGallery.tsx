'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const productImages = [
    product.image,
    product.image.replace('.jpg', '-2.jpg'),
    product.image.replace('.jpg', '-3.jpg'),
    product.image.replace('.jpg', '-4.jpg'),
  ];

  const imageContainerRef = useRef(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e) => {
    if (imageContainerRef.current && isZoomed) {
      const { left, top, width, height } =
        imageContainerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPosition({ x, y });
    }
  };

  return (
    <div className='space-y-6'>
      {/* Imagen principal con zoom */}
      <div
        ref={imageContainerRef}
        className='relative overflow-hidden rounded-xl aspect-square shadow-lg cursor-zoom-in'
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <motion.div
          className='absolute inset-0 transition-all duration-300'
          style={{
            backgroundImage: `url(${productImages[selectedImage]})`,
            backgroundPosition: isZoomed
              ? `${zoomPosition.x}% ${zoomPosition.y}%`
              : 'center',
            backgroundSize: isZoomed ? 'cover' : 'contain', // Cambiado a 'cover' para ocupar todo el espacio
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#f8f9fa',
          }}
          animate={{ opacity: 1 }}
        />
        {/* Eliminamos la capa Image con opacidad para evitar el salto */}
      </div>

      {/* Galería horizontal de miniaturas */}
      <div className='flex items-center gap-3 overflow-x-auto py-2 scrollbar-hide'>
        {productImages.map((img, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative h-20 w-20 rounded-md overflow-hidden border-3 flex-shrink-0 transition-all duration-200 ${
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
              style={{ objectFit: 'cover' }} // Aseguramos que la miniatura también cubra
            />
            {selectedImage === index && (
              <div className='absolute inset-0 bg-primary-500/20 rounded-md' />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
