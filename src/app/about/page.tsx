'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { timelineEvents } from '@/constants/timeline';
import { TimelineEvent } from '@/components/ui/TimeLineEvents';
import { brandValues } from '@/constants/brand';
import ValueCard from '@/components/ui/ValueCard';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function AboutUsPage() {
  const heroRef = useRef(null);
  // const missionRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 });
  // const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.3 });
  const isValuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <>
      {/* Hero Section - Reimagined with a more modern aesthetic */}
      <section
        ref={heroRef}
        className='relative min-h-[90vh] flex items-center bg-gradient-to-br from-slate-900 to-indigo-900 overflow-hidden'
      >
        {/* Background with modern blur effect */}
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900/90 to-indigo-900/90 z-0'></div>

        {/* Modern geometric decorative elements */}
        <div className='absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl'></div>
        <div className='absolute bottom-10 right-10 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl'></div>

        {/* Image with parallax */}
        <motion.div
          className='absolute inset-0 z-0 opacity-20'
          style={{ y, opacity }}
        >
          <Image
            src='/img/jabon.jpg'
            alt='Afrodita Jabones - Sobre nosotros'
            fill
            style={{ objectFit: 'cover' }}
            priority
            quality={90}
          />
        </motion.div>
        <WhatsAppButton />
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
              <span className='inline-block text-sm font-medium text-indigo-200 mb-4 tracking-wider uppercase bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full'>
                Nuestra historia
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.1 }}
              className='font-serif text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-8 leading-tight'
            >
              Cuidado natural para tu piel, respeto por el planeta
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.2 }}
              className='text-indigo-100 text-xl md:text-2xl mb-10 max-w-2xl leading-relaxed'
            >
              Descubre nuestra pasión por los ingredientes naturales y el
              compromiso con la sostenibilidad que han guiado nuestra marca.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.3 }}
              className='flex flex-wrap gap-4'
            >
              <Link
                href='#nuestra-historia'
                className='bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full transition-all font-medium inline-flex items-center shadow-lg hover:shadow-emerald-500/20 group'
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

              <Link
                href='/products'
                className='bg-transparent border-2 border-white/30 hover:border-white/70 text-white px-8 py-3.5 rounded-full transition-all font-medium inline-flex items-center backdrop-blur-sm'
              >
                Ver productos
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Modern scroll indicator */}
        <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2'>
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className='flex flex-col items-center text-white/70'
          >
            <span className='text-sm font-light mb-2'>Scroll</span>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Nuestra Historia Section - Modernized Timeline */}
      <section
        id='nuestra-historia'
        ref={storyRef}
        className='py-24 bg-gray-50 relative overflow-hidden'
      >
        {/* Modern decorative elements */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl opacity-70'></div>
        <div className='absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/30 rounded-full blur-3xl'></div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <motion.div
            variants={fadeInUpVariants}
            initial='hidden'
            animate={isStoryInView ? 'visible' : 'hidden'}
            className='text-center max-w-3xl mx-auto mb-20'
          >
            <span className='inline-block text-sm font-medium text-emerald-600 mb-3 tracking-wider uppercase bg-emerald-50 px-4 py-1.5 rounded-full'>
              Conoce nuestra trayectoria
            </span>
            <h2 className='font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-6'>
              Nuestra Historia
            </h2>
            <p className='text-gray-600 text-lg leading-relaxed'>
              Desde nuestros humildes inicios hasta convertirnos en referentes
              en el cuidado natural de la piel, cada paso ha estado guiado por
              nuestra pasión por lo natural y sostenible.
            </p>
          </motion.div>

          {/* Modern Timeline */}
          <div className='max-w-4xl mx-auto relative'>
            {/* Línea central con gradiente */}
            <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-200 via-indigo-200 to-rose-200'></div>

            {/* Eventos del timeline */}
            <motion.div
              variants={containerVariants}
              initial='hidden'
              animate={isStoryInView ? 'visible' : 'hidden'}
              className='space-y-20'
            >
              {timelineEvents.map((event, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <TimelineEvent
                    year={event.year}
                    title={event.title}
                    description={event.description}
                    // @ts-ignore
                    position={event.position}
                    isActive={event.isActive}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores Section - With modern cards */}
      <section
        ref={valuesRef}
        className='py-24 bg-white relative overflow-hidden'
      >
        {/* Modern decorative elements */}
        <div className='absolute top-0 left-0 w-full h-40 bg-gray-50'></div>
        <div className='absolute top-40 left-0 w-full h-40 bg-gradient-to-b from-gray-50 to-transparent'></div>
        <div className='absolute -top-20 right-0 w-96 h-96 rounded-full bg-indigo-50 blur-3xl'></div>
        <div className='absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-emerald-50 blur-3xl'></div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <motion.div
            variants={fadeInUpVariants}
            initial='hidden'
            animate={isValuesInView ? 'visible' : 'hidden'}
            className='text-center max-w-3xl mx-auto mb-20'
          >
            <span className='inline-block text-sm font-medium text-indigo-600 mb-3 tracking-wider uppercase bg-indigo-50 px-4 py-1.5 rounded-full'>
              Lo que nos define
            </span>
            <h2 className='font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-6'>
              Nuestros Valores
            </h2>
            <p className='text-gray-600 text-lg leading-relaxed'>
              Estos son los principios que guían cada decisión que tomamos,
              desde la selección de ingredientes hasta el diseño de nuestros
              envases.
            </p>
          </motion.div>

          <motion.div
            variants={staggerVariants}
            initial='hidden'
            animate={isValuesInView ? 'visible' : 'hidden'}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
          >
            {brandValues.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ValueCard
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  color={value.color}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Modern gradient background */}
      <section className='py-20 bg-gradient-to-r from-emerald-500 to-purple-500 relative overflow-hidden'>
        {/* Modern decorative elements */}
        <div className='absolute -top-10 right-10 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl'></div>
        <div className='absolute -bottom-10 left-10 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl'></div>

        {/* Modern animated gradient border */}
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='max-w-4xl mx-auto relative rounded-3xl overflow-hidden backdrop-blur-lg'
          >
            <div className='relative p-12 text-center'>
              <h2 className='font-serif text-4xl md:text-5xl font-bold mb-6 text-white'>
                Descubre la diferencia de Jabones Afrodita
              </h2>
              <p className='text-lg mb-10 max-w-3xl mx-auto text-indigo-50/90 leading-relaxed'>
                Explora nuestra colección de jabones artesanales y productos
                para el cuidado de la piel, elaborados con ingredientes
                naturales seleccionados para nutrir tu piel y respetar el
                planeta.
              </p>

              <div className='flex flex-wrap justify-center gap-4'>
                <Link
                  href='/products'
                  className='bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-4 px-8 rounded-full shadow-lg hover:shadow-emerald-500/20 transition-all inline-flex items-center'
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

                <Link
                  href='/contact'
                  className='border border-white/30 hover:border-white/60 text-white font-medium py-4 px-8 rounded-full transition-all inline-flex items-center'
                >
                  Contáctanos
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
