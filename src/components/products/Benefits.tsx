'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  const benefits = [
    {
      id: 1,
      title: '100% Natural',
      description:
        'Todos nuestros ingredientes son de origen natural, cuidadosamente seleccionados para garantizar la máxima calidad y pureza.',
      icon: '/img/icons/leaf.svg',
      image: '/img/natural-ingredients.jpg',
      color: 'bg-primary-500',
      delay: 0,
    },
    {
      id: 2,
      title: 'Producción Sostenible',
      description:
        'Utilizamos procesos respetuosos con el medio ambiente y envases biodegradables para minimizar nuestra huella ecológica.',
      icon: '/img/icons/recycle.svg',
      image: '/img/sustainable-production.jpg',
      color: 'bg-mint-500',
      delay: 0.1,
    },
    {
      id: 3,
      title: 'Sin Químicos Dañinos',
      description:
        'Nuestros jabones están libres de parabenos, sulfatos, colorantes artificiales y fragancias sintéticas que pueden irritar la piel.',
      icon: '/img/icons/shield.svg',
      image: '/img/chemical-free.jpg',
      color: 'bg-secondary-500',
      delay: 0.2,
    },
    {
      id: 4,
      title: 'Para Toda la Familia',
      description:
        'Formulados para ser suaves con todo tipo de pieles, incluso las más sensibles, ideales para toda la familia.',
      icon: '/img/icons/heart.svg',
      image: '/img/family-friendly.jpg',
      color: 'bg-rose-500',
      delay: 0.3,
    },
  ];

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: delay,
      },
    }),
  };

  return (
    <section ref={ref} className='py-24 relative overflow-hidden bg-primary-50'>
      {/* Elementos decorativos de fondo */}
      <motion.div style={{ y, opacity }} className='absolute inset-0 z-0'>
        <div className='absolute top-20 right-20 w-64 h-64 rounded-full bg-primary-200/40 blur-3xl'></div>
        <div className='absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-rose-200/30 blur-3xl'></div>
        <div className='absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-mint-200/30 blur-3xl'></div>

        {/* Patrón sutil */}
        <div className='absolute inset-0 pattern-dots opacity-20'></div>
      </motion.div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className='text-center mb-16'
        >
          <span className='inline-block text-sm font-medium text-primary-600 mb-2 tracking-wider uppercase bg-primary-100 px-3 py-1 rounded-full'>
            Jabones naturales
          </span>
          <h2 className='font-serif text-3xl md:text-4xl font-bold text-primary-800 mb-4'>
            Beneficios Para Tu Piel y el Planeta
          </h2>
          <p className='text-neutral-600 max-w-2xl mx-auto'>
            Descubre por qué nuestros jabones artesanales son la elección
            perfecta para el cuidado diario de tu piel, combinando la tradición
            artesanal con ingredientes naturales de la más alta calidad.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              custom={benefit.delay}
              variants={itemVariants}
              className='bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-shadow duration-500 overflow-hidden group'
            >
              <div className='relative h-52 overflow-hidden'>
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                  style={{ objectFit: 'cover' }}
                  className='group-hover:scale-105 transition-transform duration-700'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>

                {/* Icono flotante */}
                <div className='absolute -bottom-6 left-6 transform transition-transform duration-500 group-hover:-translate-y-2'>
                  <div className={`${benefit.color} p-4 rounded-xl shadow-lg`}>
                    <Image
                      src={benefit.icon}
                      alt={`${benefit.title} icon`}
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>

              <div className='p-6 pt-10'>
                <h3 className='text-xl font-semibold text-primary-800 mb-3'>
                  {benefit.title}
                </h3>
                <p className='text-neutral-600 group-hover:text-neutral-700 transition-colors'>
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Sección de estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className='mt-20 bg-white rounded-2xl shadow-soft p-8 md:p-12'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4'>
                <svg
                  className='w-8 h-8'
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
              </div>
              <span className='block text-4xl font-bold text-primary-800 mb-1'>
                100%
              </span>
              <span className='text-neutral-600'>Ingredientes naturales</span>
            </div>

            <div className='text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 text-secondary-600 mb-4'>
                <svg
                  className='w-8 h-8'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
              </div>
              <span className='block text-4xl font-bold text-primary-800 mb-1'>
                0%
              </span>
              <span className='text-neutral-600'>Químicos dañinos</span>
            </div>

            <div className='text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-mint-100 text-mint-600 mb-4'>
                <svg
                  className='w-8 h-8'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                  ></path>
                </svg>
              </div>
              <span className='block text-4xl font-bold text-primary-800 mb-1'>
                15+
              </span>
              <span className='text-neutral-600'>Variedades disponibles</span>
            </div>

            <div className='text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 text-rose-600 mb-4'>
                <svg
                  className='w-8 h-8'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
              </div>
              <span className='block text-4xl font-bold text-primary-800 mb-1'>
                10k+
              </span>
              <span className='text-neutral-600'>Clientes satisfechos</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animación decorativa: burbujas flotantes */}
      <div className='absolute bottom-0 left-0 right-0 h-40 overflow-hidden opacity-70 pointer-events-none'>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute bottom-0 rounded-full bg-white/50 backdrop-blur-sm'
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
            }}
            animate={{
              y: [200, -100],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </section>
  );
}
