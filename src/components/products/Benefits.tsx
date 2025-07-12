'use client';

import React from 'react';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { benefits, stats } from '@/constants/benefitsItems';

export default function Benefits() {
  const ref = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isCTAInView = useInView(ctaRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section 
      ref={ref} 
      className="py-24 relative overflow-hidden bg-gradient-to-br from-stone-50 via-white to-emerald-50/30"
    >
      {/* Organic background elements */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-100/30 to-transparent blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-teal-100/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-50/40 to-transparent blur-3xl" />
        
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Modern header section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-emerald-200/30 shadow-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-emerald-800 tracking-wide">
              Cuidado natural
            </span>
          </div>

          <h2 className="font-light text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
            Beneficios para{" "}
            <span className="relative">
              <span className="font-medium bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                tu piel
              </span>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-emerald-400/60 to-transparent"
              />
            </span>
            <br />
            y el planeta
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Descubre por qué nuestros jabones artesanales son la elección perfecta 
            para el cuidado diario, combinando tradición y{" "}
            <span className="text-emerald-700 font-medium">ingredientes puros</span>.
          </p>
        </motion.div>

        {/* Modern benefits grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              variants={itemVariants}
              whileHover="hover"
              className="group cursor-pointer"
            >
              <motion.div
                variants={cardHoverVariants}
                className="relative h-full rounded-3xl bg-white/70 backdrop-blur-sm border border-emerald-200/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-8 h-full flex flex-col">
                  {/* Icon with modern styling */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      {benefit.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-medium text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed flex-grow">
                    {benefit.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-6 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-emerald-600 font-medium">
                      <span className="text-sm">Descubrir más</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature highlight with modern design */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-24 rounded-3xl overflow-hidden bg-white/70 backdrop-blur-sm border border-emerald-200/30 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content */}
            <div className="relative z-10 p-8 lg:p-12 order-2 lg:order-1 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200/50 shadow-sm mb-6 w-fit">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-emerald-800">
                  Calidad artesanal
                </span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6 leading-tight">
                Solo utilizamos{" "}
                <span className="font-medium text-emerald-700">
                  ingredientes puros
                </span>{" "}
                de la más alta calidad
              </h3>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Cada jabón está elaborado cuidadosamente en pequeños lotes,
                utilizando el método tradicional de saponificación en frío para
                preservar todas las propiedades beneficiosas de los aceites
                esenciales y extractos botánicos.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Aceites vegetales prensados en frío',
                  'Hierbas y plantas cultivadas orgánicamente',
                  'Arcillas minerales purificantes',
                  'Extractos botánicos puros',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-lg group transition-colors w-fit"
              >
                <span>Conoce nuestro proceso</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Image */}
            <div className="relative h-80 lg:h-full order-1 lg:order-2">
              <Image
                src="/img/productos/jabon-5.jpg"
                alt="Ingredientes naturales"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-l from-transparent via-transparent to-emerald-50/30" />
            </div>
          </div>
        </motion.div>

        {/* Stats with modern cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.1 * index + 0.7 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-emerald-200/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className="text-4xl font-light text-gray-900">
                      {stat.value}
                    </span>
                  </div>

                  <span className="text-gray-600 font-medium">{stat.label}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modern CTA section */}
      <div
        ref={ctaRef}
        className="mt-24 pt-20 pb-24 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 relative overflow-hidden"
      >
        {/* Organic separator */}
        <div className="absolute top-0 left-0 w-full h-20">
          <svg
            className="absolute bottom-0 w-full h-20 text-white"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Background elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
        
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isCTAInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-medium text-white/90">
                Calidad artesanal
              </span>
            </div>

            <h2 className="font-light text-5xl md:text-6xl font-bold mb-8 text-white leading-tight">
              Descubre la diferencia de{" "}
              <span className="relative">
                <span className="font-medium text-emerald-300">
                  Afrodita
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isCTAInView ? { width: "100%" } : { width: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-emerald-400/60 to-transparent"
                />
              </span>
            </h2>

            <p className="text-xl mb-12 max-w-3xl mx-auto text-white/80 leading-relaxed font-light">
              Explora nuestra colección de jabones artesanales y productos para
              el cuidado de la piel, elaborados con ingredientes naturales
              seleccionados para nutrir tu piel y respetar el planeta.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/products"
                  className="inline-flex items-center bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <span>Explorar productos</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-transparent text-white font-semibold py-4 px-8 rounded-full border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  <span>Contactanos</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  ),
                  text: "Pago 100% seguro"
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ),
                  text: "Envío gratis + RD$ 50"
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  text: "Entrega 24/48h"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCTAInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20"
                >
                  <div className="text-emerald-300">
                    {item.icon}
                  </div>
                  <span className="text-sm text-white/90 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}