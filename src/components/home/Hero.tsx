'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function OptimizedSoapHero() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const breathingAnimation = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Image Optimizado con Next.js */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: isMounted ? scrollY * 0.1 : 0 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=2070&auto=format&fit=crop"
          alt="Ingredientes naturales para jabones orgánicos"
          fill
          priority
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          className="scale-105" // Ligero zoom para evitar bordes en parallax
        />
        
        {/* Overlays adaptativos según la imagen */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/75 to-emerald-900/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-50/40 via-transparent to-white/50" />
        
        {/* Overlay adicional para móvil (más legibilidad) */}
        <div className="absolute inset-0 bg-white/20 sm:bg-transparent" />
      </motion.div>

      {/* Formas orgánicas sutiles */}
      <motion.div 
        animate={breathingAnimation}
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-white/25 to-transparent blur-3xl z-10"
      />
      <motion.div 
        animate={{ ...breathingAnimation, transition: { ...breathingAnimation.transition, delay: 4 } }}
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-emerald-50/35 to-transparent blur-3xl z-10"
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-20">
        {/* Resto del contenido igual que antes... */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-screen py-20"
        >
          <div className="space-y-10">
            {/* Badge con mejor contraste sobre foto */}
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-emerald-200/50 shadow-lg"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-emerald-800 tracking-wide">
                Cosmética consciente
              </span>
            </motion.div>

            {/* Título con mejor legibilidad */}
            <div className="space-y-6">
              <h1 className="font-light text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-gray-900 drop-shadow-sm">
                <span className="block">Cuidado que</span>
                <span className="block font-medium bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  respeta tu piel
                </span>
                <span className="block">y el planeta</span>
              </h1>
            </div>

            {/* Descripción con fondo sutil para mejor legibilidad */}
            <div className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/30">
              <p className="text-xl text-gray-700 leading-relaxed font-light">
                Jabones artesanales creados con amor y respeto por la naturaleza. 
                Cada barra es una promesa de{" "}
                <span className="text-emerald-700 font-medium">pureza</span> para tu piel 
                y{" "}
                <span className="text-teal-700 font-medium">cuidado</span> para nuestro hogar común.
              </p>
            </div>

            {/* CTAs con mejor contraste */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center justify-center gap-2">
                  Explorar colección
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.button>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 text-gray-800 font-medium rounded-full bg-white/70 backdrop-blur-sm border border-white/50 hover:bg-white/80 transition-all duration-300 shadow-lg"
              >
                Nuestra historia
              </motion.button>
            </div>
          </div>

          {/* Columna visual simplificada para no competir con la foto */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="relative w-full h-[500px] rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl"
            >
              {/* Contenido minimalista que complementa la foto de fondo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 text-white">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium tracking-wide">Pureza Natural</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}