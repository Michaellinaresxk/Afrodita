'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutUsPage() {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.3 });
  const isValuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  // Variantes para animaciones
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Valores de la marca
  const brandValues = [
    {
      title: 'Naturalidad',
      description:
        'Todos nuestros productos contienen exclusivamente ingredientes naturales, libres de químicos dañinos, colorantes artificiales y fragancias sintéticas.',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
          />
        </svg>
      ),
      color: 'bg-primary-100 text-primary-600',
    },
    {
      title: 'Sostenibilidad',
      description:
        'Nos comprometemos con procesos de producción respetuosos con el entorno y envases eco-friendly que minimizan nuestro impacto ambiental.',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
          />
        </svg>
      ),
      color: 'bg-mint-100 text-mint-600',
    },
    {
      title: 'Artesanía',
      description:
        'Cada jabón es elaborado a mano utilizando técnicas tradicionales que preservan las propiedades de los ingredientes y aportan un carácter único a cada pieza.',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11'
          />
        </svg>
      ),
      color: 'bg-secondary-100 text-secondary-600',
    },
    {
      title: 'Transparencia',
      description:
        'Creemos en la honestidad y la claridad. Detallamos todos los ingredientes de nuestros productos y compartimos abiertamente nuestros procesos de fabricación.',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
      color: 'bg-rose-100 text-rose-600',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className='relative min-h-[80vh] flex items-center bg-primary-900 overflow-hidden'
      >
        {/* Background Image with Parallax */}
        <motion.div className='absolute inset-0 z-0' style={{ y, opacity }}>
          <Image
            src='/img/jabon.jpg'
            alt='Afrodita Jabones - Sobre nosotros'
            fill
            style={{ objectFit: 'cover' }}
            priority
            quality={90}
            className='filter'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/70'></div>
        </motion.div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='max-w-3xl'>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
              }
              transition={{ duration: 0.7 }}
              className='mb-6'
            >
              <span className='inline-block text-sm font-medium text-white mb-2 tracking-wider uppercase bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full'>
                Nuestra historia
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.1 }}
              className='font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6'
            >
              Cuidado natural para tu piel, respeto por el planeta
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.2 }}
              className='text-white/90 text-xl mb-8 max-w-2xl'
            >
              Descubre nuestra pasión por los ingredientes naturales y el
              compromiso con la sostenibilidad que han guiado nuestra marca
              desde el primer día.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link
                href='#nuestra-historia'
                className='bg-white hover:bg-neutral-100 text-primary-800 px-6 py-3 rounded-full transition-colors font-medium inline-flex items-center shadow-lg group'
              >
                Descubre más
                <svg
                  className='ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 14l-7 7m0 0l-7-7m7 7V3'
                  ></path>
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary-50 to-transparent'></div>
      </section>

      {/* Nuestra Historia Section */}
      <section
        id='nuestra-historia'
        ref={storyRef}
        className='py-20 bg-white relative overflow-hidden'
      >
        <div className='absolute inset-0 pattern-dots opacity-10'></div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <motion.div
            variants={fadeInUpVariants}
            initial='hidden'
            animate={isStoryInView ? 'visible' : 'hidden'}
            className='text-center max-w-3xl mx-auto mb-16'
          >
            <span className='inline-block text-sm font-medium text-primary-600 mb-2 tracking-wider uppercase bg-primary-50 px-3 py-1 rounded-full'>
              Conoce nuestra trayectoria
            </span>
            <h2 className='font-serif text-3xl md:text-4xl font-bold text-primary-800 mb-6'>
              Nuestra Historia
            </h2>
            <p className='text-neutral-600 mb-6'>
              Desde nuestros humildes inicios hasta convertirnos en referentes
              en el cuidado natural de la piel, cada paso ha estado guiado por
              nuestra pasión por lo natural y sostenible.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className='max-w-4xl mx-auto relative'>
            {/* Línea central */}
            <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-100'></div>

            {/* Eventos */}
            <motion.div
              variants={containerVariants}
              initial='hidden'
              animate={isStoryInView ? 'visible' : 'hidden'}
              className='space-y-12'
            >
              {/* Evento 1 */}
              <motion.div variants={itemVariants} className='relative'>
                <div className='flex items-center justify-center'>
                  <div className='absolute z-10 w-8 h-8 rounded-full bg-primary-500 border-4 border-white shadow-md'></div>
                </div>
                <div className='flex flex-col md:flex-row items-center'>
                  <div className='md:w-1/2 md:pr-8 mb-4 md:mb-0 md:text-right'>
                    <div className='bg-white p-6 rounded-xl shadow-soft hover:shadow-soft-lg transition-shadow'>
                      <span className='inline-block text-primary-600 font-bold mb-2'>
                        2015
                      </span>
                      <h3 className='text-xl font-bold text-primary-800 mb-3'>
                        Los inicios
                      </h3>
                      <p className='text-neutral-600'>
                        María González, nuestra fundadora, comenzó a elaborar
                        jabones artesanales en la cocina de su casa, inspirada
                        por las recetas tradicionales de su abuela y motivada
                        por encontrar alternativas naturales a los productos
                        comerciales.
                      </p>
                    </div>
                  </div>
                  <div className='md:w-1/2'></div>
                </div>
              </motion.div>

              {/* Evento actual */}
              <motion.div variants={itemVariants} className='relative'>
                <div className='flex items-center justify-center'>
                  <div className='absolute z-10 w-10 h-10 rounded-full bg-secondary-500 border-4 border-white shadow-md flex items-center justify-center'>
                    <div className='w-4 h-4 bg-white rounded-full animate-ping absolute'></div>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                </div>
                <div className='flex flex-col md:flex-row items-center'>
                  <div className='md:w-1/2'></div>
                  <div className='md:w-1/2 md:pl-8'>
                    <div className='bg-secondary-50 p-6 rounded-xl shadow-soft border border-secondary-100'>
                      <span className='inline-block text-secondary-600 font-bold mb-2'>
                        Hoy
                      </span>
                      <h3 className='text-xl font-bold text-primary-800 mb-3'>
                        Mirando al futuro
                      </h3>
                      <p className='text-neutral-600'>
                        Seguimos innovando y expandiendo nuestra visión de
                        belleza natural y sostenible, manteniendo siempre
                        nuestros valores fundacionales: calidad, sostenibilidad
                        y transparencia.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section
        ref={valuesRef}
        className='py-20 bg-primary-50 relative overflow-hidden'
      >
        {/* Elementos decorativos */}
        <div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent'></div>
        <div className='absolute -top-10 -right-10 w-64 h-64 rounded-full bg-primary-100/50 blur-3xl'></div>
        <div className='absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-secondary-100/30 blur-3xl'></div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <motion.div
            variants={fadeInUpVariants}
            initial='hidden'
            animate={isValuesInView ? 'visible' : 'hidden'}
            className='text-center max-w-3xl mx-auto mb-16'
          >
            <span className='inline-block text-sm font-medium text-primary-600 mb-2 tracking-wider uppercase bg-primary-50 px-3 py-1 rounded-full'>
              Lo que nos define
            </span>
            <h2 className='font-serif text-3xl md:text-4xl font-bold text-primary-800 mb-6'>
              Nuestros Valores
            </h2>
            <p className='text-neutral-600'>
              Estos son los principios que guían cada decisión que tomamos,
              desde la selección de ingredientes hasta el diseño de nuestros
              envases.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isValuesInView ? 'visible' : 'hidden'}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
          >
            {brandValues.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className='bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 p-6'
              >
                <div
                  className={`w-12 h-12 ${value.color} rounded-full flex items-center justify-center mb-6`}
                >
                  {value.icon}
                </div>
                <h3 className='text-xl font-bold text-primary-800 mb-3'>
                  {value.title}
                </h3>
                <p className='text-neutral-600'>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-primary-900 relative overflow-hidden'>
        {/* Elementos decorativos */}
        <div className='absolute -top-10 -right-10 w-64 h-64 rounded-full bg-primary-800/50 blur-3xl'></div>
        <div className='absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-secondary-900/30 blur-3xl'></div>
        <div className='absolute inset-0 pattern-dots opacity-10'></div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='max-w-4xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className='font-serif text-3xl md:text-4xl font-bold mb-6'>
                Descubre la diferencia de Jabones Afrodita
              </h2>
              <p className='text-lg mb-8 max-w-3xl mx-auto'>
                Explora nuestra colección de jabones artesanales y productos
                para el cuidado de la piel, elaborados con ingredientes
                naturales seleccionados para nutrir tu piel y respetar el
                planeta.
              </p>
              <Link
                href='/products'
                className='inline-flex items-center hover:bg-neutral-100 text-primary-800 font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all'
              >
                Ver productos
                <svg
                  className='ml-2 w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
