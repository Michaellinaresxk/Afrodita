'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCoverflow,
} from 'swiper/modules';

// Datos de ejemplo
const testimonials = [
  {
    id: 1,
    content:
      'Desde que descubrí estos jabones naturales, mi piel ha cambiado completamente. Sufría de sequedad y ahora está hidratada y radiante. ¡No volveré a usar otra cosa!',
    author: 'María García',
    location: 'Madrid',
    avatar: '/img/testimonials/avatar-1.jpg',
    rating: 5,
    product: 'Jabón de Lavanda',
  },
  {
    id: 2,
    content:
      'Como persona con piel sensible y propensa a alergias, estos jabones son un regalo del cielo. Sin irritaciones y con un aroma delicado que perdura. Totalmente recomendados.',
    author: 'Laura Martínez',
    location: 'Barcelona',
    avatar: '/img/testimonials/avatar-2.jpg',
    rating: 5,
    product: 'Jabón de Aloe Vera',
  },
  {
    id: 3,
    content:
      'Los compré como regalo para mi madre y ahora toda la familia los usa. El jabón de avena y miel es perfecto para mis hijos, muy suave y nutritivo para su piel delicada.',
    author: 'Carlos Rodríguez',
    location: 'Valencia',
    avatar: '/img/testimonials/avatar-3.jpg',
    rating: 4,
    product: 'Jabón de Avena y Miel',
  },
  {
    id: 4,
    content:
      'Como dermatóloga, recomiendo estos jabones a mis pacientes con problemas de piel. Los ingredientes naturales ayudan a calmar irritaciones y restaurar la barrera cutánea.',
    author: 'Dra. Ana Vázquez',
    location: 'Sevilla',
    avatar: '/img/testimonials/avatar-4.jpg',
    rating: 5,
    product: 'Jabón de Caléndula',
  },
  {
    id: 5,
    content:
      'Increíble lo que un buen jabón natural puede hacer. Mi piel luce más joven y luminosa, y me encanta saber que estoy usando productos sin químicos dañinos.',
    author: 'Elena Moreno',
    location: 'Bilbao',
    avatar: '/img/testimonials/avatar-5.jpg',
    rating: 5,
    product: 'Jabón de Rosas',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <section ref={ref} className='py-24 bg-white relative overflow-hidden'>
      {/* Elementos decorativos */}
      <div className='absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-primary-50 to-transparent'></div>
      <div className='absolute -top-10 -right-10 w-64 h-64 rounded-full bg-primary-100/50 blur-3xl'></div>
      <div className='absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-secondary-100/30 blur-3xl'></div>

      {/* Comillas decorativas grandes */}
      <div className='absolute top-20 left-10 opacity-5'>
        <svg
          width='120'
          height='120'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='text-primary-900'
        >
          <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
        </svg>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className='text-center mb-16'
        >
          <span className='inline-block text-sm font-medium text-primary-600 mb-2 tracking-wider uppercase bg-primary-50 px-3 py-1 rounded-full'>
            Opiniones de clientes
          </span>
          <h2 className='font-serif text-3xl md:text-4xl font-bold text-primary-800 mb-4'>
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className='text-neutral-600 max-w-2xl mx-auto'>
            Descubre las experiencias de quienes ya han incorporado nuestros
            jabones naturales a su rutina diaria de cuidado personal.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='relative'
        >
          {/* Slider de testimonios */}
          <Swiper
            modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            effect='coverflow'
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
              },
              1024: {
                slidesPerView: 1.5,
              },
              1280: {
                slidesPerView: 1.8,
              },
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className='testimonials-swiper pb-16'
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8'
        >
          <div className='bg-primary-50 rounded-xl p-6 text-center'>
            <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-100 text-primary-600 mb-4'>
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
                  strokeWidth='2'
                  d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </div>
            <span className='block text-3xl font-bold text-primary-800 mb-1'>
              Satisfacción garantizada
            </span>
            <span className='text-neutral-600'>O te devolvemos tu dinero</span>
          </div>

          <div className='bg-secondary-50 rounded-xl p-6 text-center'>
            <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary-100 text-secondary-600 mb-4'>
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
                  strokeWidth='2'
                  d='M13 10V3L4 14h7v7l9-11h-7z'
                ></path>
              </svg>
            </div>
            <span className='block text-3xl font-bold text-primary-800 mb-1'>
              Envío rápido
            </span>
            <span className='text-neutral-600'>
              En 24-48 horas en península
            </span>
          </div>

          <div className='bg-rose-50 rounded-xl p-6 text-center'>
            <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-100 text-rose-600 mb-4'>
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
                  strokeWidth='2'
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </div>
            <span className='block text-3xl font-bold text-primary-800 mb-1'>
              Atención personalizada
            </span>
            <span className='text-neutral-600'>Estamos aquí para ayudarte</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      }}
      className='bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 p-2'
    >
      <div className='bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-lg p-8 relative'>
        {/* Comillas decorativas */}
        <div className='absolute top-6 left-6 opacity-20'>
          <svg
            width='40'
            height='40'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='text-primary-900'
          >
            <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
          </svg>
        </div>

        {/* Estrellas de valoración */}
        <div className='flex mb-4 justify-center'>
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < testimonial.rating ? 'text-amber-400' : 'text-neutral-300'
              }`}
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>
          ))}
        </div>

        {/* Contenido del testimonio */}
        <blockquote className='text-center'>
          <p className='text-lg text-neutral-700 italic mb-6'>
            "{testimonial.content}"
          </p>

          <div className='flex items-center justify-center mb-4'>
            <div className='relative h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-md'>
              <Image
                src={testimonial.avatar}
                alt={testimonial.author}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className='text-center'>
            <h4 className='font-medium text-primary-800 text-lg'>
              {testimonial.author}
            </h4>
            <p className='text-sm text-neutral-500'>{testimonial.location}</p>
            <div className='mt-2'>
              <span className='inline-block bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full'>
                {testimonial.product}
              </span>
            </div>
          </div>
        </blockquote>
      </div>
    </motion.div>
  );
}
