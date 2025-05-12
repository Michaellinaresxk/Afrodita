'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { faqs } from '@/constants/faqs';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { contactInfo } from '@/components/ui/ContactInfo';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });

  // @ts-expect-error Ignorar tipado implícito por compatibilidad
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulamos el envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reseteamos el formulario después de 3 segundos
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }, 3000);
    }, 1500);
  };

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
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      {/* Header con imagen de fondo */}
      <div className='relative h-80 bg-primary-900 overflow-hidden'>
        <Image
          src='/img/productos/jabon-6.jpg'
          alt='Contáctanos - Afrodita Jabones'
          fill
          style={{ objectFit: 'cover' }}
          priority
          quality={90}
          className='opacity-70'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-primary-900/60 to-primary-800/70'></div>

        <div className='relative h-full flex items-center justify-center text-center z-10'>
          <div className='max-w-3xl px-4'>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className='font-serif text-4xl md:text-5xl text-white font-bold mb-4'
            >
              Contáctanos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className='text-white/90 text-lg max-w-2xl mx-auto'
            >
              Estamos aquí para responder tus preguntas y ayudarte a encontrar
              el producto perfecto para el cuidado de tu piel.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Navegación por pestañas */}
      <div className='bg-white border-b border-neutral-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex overflow-x-auto scrollbar-hide'>
            <button
              onClick={() => setActiveTab('contact')}
              className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'contact'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-neutral-600 hover:text-primary-600'
              }`}
            >
              Formulario de Contacto
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'faq'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-neutral-600 hover:text-primary-600'
              }`}
            >
              Preguntas Frecuentes
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'location'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-neutral-600 hover:text-primary-600'
              }`}
            >
              Nuestra Ubicación
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className='bg-neutral-50 py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Formulario de contacto */}
          {activeTab === 'contact' && (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
              {/* Información de contacto */}
              <div className='lg:col-span-1'>
                <motion.div
                  variants={containerVariants}
                  initial='hidden'
                  animate='visible'
                  className='bg-white rounded-xl shadow-soft p-6 h-full'
                >
                  <h2 className='font-serif text-2xl font-bold text-primary-800 mb-6'>
                    Información de Contacto
                  </h2>

                  <div className='space-y-6'>
                    {contactInfo.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className='flex items-start'
                      >
                        <div className='flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-4'>
                          {item.icon}
                        </div>
                        <div>
                          <h3 className='text-lg font-medium text-primary-800'>
                            {item.title}
                          </h3>
                          <a
                            href={item.link}
                            className='text-neutral-600 hover:text-primary-600 transition-colors'
                          >
                            {item.info}
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className='mt-8 pt-6 border-t border-neutral-200'>
                    <h3 className='text-lg font-medium text-primary-800 mb-4'>
                      Síguenos
                    </h3>
                    <div className='flex space-x-4'>
                      <a
                        href='#'
                        className='w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors'
                      >
                        <span className='sr-only'>Facebook</span>
                        <svg
                          className='h-5 w-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                          aria-hidden='true'
                        >
                          <path
                            fillRule='evenodd'
                            d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </a>
                      <a
                        href='#'
                        className='w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors'
                      >
                        <span className='sr-only'>Instagram</span>
                        <svg
                          className='h-5 w-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                          aria-hidden='true'
                        >
                          <path
                            fillRule='evenodd'
                            d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </a>
                      <a
                        href='#'
                        className='w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors'
                      >
                        <span className='sr-only'>Twitter</span>
                        <svg
                          className='h-5 w-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                          aria-hidden='true'
                        >
                          <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Horario de atención */}
                  <div className='mt-8 pt-6 border-t border-neutral-200'>
                    <h3 className='text-lg font-medium text-primary-800 mb-4'>
                      Horario de Atención
                    </h3>
                    <ul className='space-y-2 text-neutral-600'>
                      <li className='flex justify-between'>
                        <span>Lunes - Viernes:</span>
                        <span className='font-medium'>9:00 - 19:00</span>
                      </li>
                      <li className='flex justify-between'>
                        <span>Sábado:</span>
                        <span className='font-medium'>10:00 - 14:00</span>
                      </li>
                      <li className='flex justify-between'>
                        <span>Domingo:</span>
                        <span className='font-medium'>Cerrado</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Formulario */}
              <div className='lg:col-span-2'>
                <motion.div
                  ref={formRef}
                  variants={fadeInUpVariants}
                  initial='hidden'
                  animate={isInView ? 'visible' : 'hidden'}
                  className='bg-white rounded-xl shadow-soft p-6 lg:p-8'
                >
                  <h2 className='font-serif text-2xl font-bold text-primary-800 mb-6'>
                    Envíanos un Mensaje
                  </h2>

                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className='space-y-6'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                          <label
                            htmlFor='name'
                            className='block text-sm font-medium text-neutral-700 mb-1'
                          >
                            Nombre completo
                          </label>
                          <input
                            type='text'
                            id='name'
                            name='name'
                            required
                            value={formState.name}
                            // onChange={handleChange}
                            className='w-full px-4 py-3 rounded-lg border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
                            placeholder='Tu nombre'
                          />
                        </div>
                        <div>
                          <label
                            htmlFor='email'
                            className='block text-sm font-medium text-neutral-700 mb-1'
                          >
                            Correo electrónico
                          </label>
                          <input
                            type='email'
                            id='email'
                            name='email'
                            required
                            value={formState.email}
                            // onChange={handleChange}
                            className='w-full px-4 py-3 rounded-lg border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
                            placeholder='tu@email.com'
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor='subject'
                          className='block text-sm font-medium text-neutral-700 mb-1'
                        >
                          Asunto
                        </label>
                        <input
                          type='text'
                          id='subject'
                          name='subject'
                          required
                          value={formState.subject}
                          // onChange={handleChange}
                          className='w-full px-4 py-3 rounded-lg border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
                          placeholder='¿En qué podemos ayudarte?'
                        />
                      </div>

                      <div>
                        <label
                          htmlFor='message'
                          className='block text-sm font-medium text-neutral-700 mb-1'
                        >
                          Mensaje
                        </label>
                        <textarea
                          id='message'
                          name='message'
                          rows={5}
                          required
                          value={formState.message}
                          // onChange={handleChange}
                          className='w-full px-4 py-3 rounded-lg border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
                          placeholder='Escribe tu mensaje aquí...'
                        ></textarea>
                      </div>

                      <div className='flex items-start'>
                        <div className='flex items-center h-5'>
                          <input
                            id='privacy'
                            name='privacy'
                            type='checkbox'
                            required
                            className='h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500'
                          />
                        </div>
                        <div className='ml-3 text-sm'>
                          <label htmlFor='privacy' className='text-neutral-600'>
                            He leído y acepto la{' '}
                            <Link
                              href='/privacidad'
                              className='text-primary-600 hover:text-primary-700 underline'
                            >
                              política de privacidad
                            </Link>
                          </label>
                        </div>
                      </div>

                      <div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type='submit'
                          disabled={isSubmitting}
                          className='w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex justify-center items-center'
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className='animate-spin -ml-1 mr-2 h-5 w-5 text-white'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                              >
                                <circle
                                  className='opacity-25'
                                  cx='12'
                                  cy='12'
                                  r='10'
                                  stroke='currentColor'
                                  strokeWidth='4'
                                ></circle>
                                <path
                                  className='opacity-75'
                                  fill='currentColor'
                                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                ></path>
                              </svg>
                              Enviando...
                            </>
                          ) : (
                            'Enviar mensaje'
                          )}
                        </motion.button>
                      </div>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className='text-center py-8'
                    >
                      <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6'>
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
                            strokeWidth={2}
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                      </div>
                      <h3 className='text-2xl font-bold text-primary-800 mb-2'>
                        ¡Mensaje enviado!
                      </h3>
                      <p className='text-neutral-600 mb-6'>
                        Gracias por contactarnos. Te responderemos lo antes
                        posible.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          )}

          {/* Preguntas Frecuentes */}
          {activeTab === 'faq' && (
            <motion.div
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              className='max-w-4xl mx-auto'
            >
              <div className='text-center mb-12'>
                <h2 className='font-serif text-3xl font-bold text-primary-800 mb-4'>
                  Preguntas Frecuentes
                </h2>
                <p className='text-neutral-600'>
                  Encuentra respuestas a las preguntas más comunes sobre
                  nuestros productos y servicios.
                </p>
              </div>

              <div className='space-y-6'>
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className='bg-white rounded-xl shadow-soft overflow-hidden'
                  >
                    <details className='group'>
                      <summary className='flex items-center justify-between cursor-pointer p-6'>
                        <h3 className='text-lg font-medium text-primary-800'>
                          {faq.question}
                        </h3>
                        <span className='ml-6 flex-shrink-0 text-primary-600 group-open:rotate-180'>
                          <svg
                            className='h-6 w-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 9l-7 7-7-7'
                            />
                          </svg>
                        </span>
                      </summary>
                      <div className='px-6 pb-6 pt-2 text-neutral-600'>
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={fadeInUpVariants}
                className='mt-12 bg-primary-50 rounded-xl p-8 text-center'
              >
                <h3 className='font-serif text-xl font-bold text-primary-800 mb-3'>
                  ¿No encuentras la respuesta que buscas?
                </h3>
                <p className='text-neutral-600 mb-6'>
                  Nuestro equipo de atención al cliente está disponible para
                  ayudarte con cualquier duda o consulta que tengas.
                </p>
                <button
                  onClick={() => setActiveTab('contact')}
                  className='inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all'
                >
                  Contáctanos
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
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Ubicación */}
          {activeTab === 'location' && (
            <motion.div
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              className='max-w-5xl mx-auto'
            >
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                <motion.div
                  variants={itemVariants}
                  className='bg-white rounded-xl shadow-soft overflow-hidden'
                >
                  <div className='aspect-video relative'>
                    {/* Aquí iría un mapa real usando Google Maps, Mapbox, etc. */}
                    <div className='absolute inset-0 bg-neutral-200 flex items-center justify-center'>
                      <div className='text-center p-4'>
                        <svg
                          className='mx-auto h-16 w-16 text-neutral-400'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={1.5}
                            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={1.5}
                            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                        <p className='mt-2 text-neutral-500'>
                          Mapa interactivo
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className='bg-white rounded-xl shadow-soft p-6'
                >
                  <h2 className='font-serif text-2xl font-bold text-primary-800 mb-6'>
                    Visita Nuestra Tienda
                  </h2>

                  <div className='space-y-6'>
                    <div>
                      <h3 className='text-lg font-medium text-primary-700 mb-2'>
                        Dirección
                      </h3>
                      <p className='text-neutral-600'>
                        Calle Botánica 123
                        <br />
                        28012 Madrid, España
                      </p>
                    </div>

                    <div>
                      <h3 className='text-lg font-medium text-primary-700 mb-2'>
                        Horario de Apertura
                      </h3>
                      <ul className='space-y-2 text-neutral-600'>
                        <li className='flex justify-between'>
                          <span>Lunes - Viernes:</span>
                          <span className='font-medium'>9:00 - 19:00</span>
                        </li>
                        <li className='flex justify-between'>
                          <span>Sábado:</span>
                          <span className='font-medium'>10:00 - 14:00</span>
                        </li>
                        <li className='flex justify-between'>
                          <span>Domingo:</span>
                          <span className='font-medium'>Cerrado</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className='text-lg font-medium text-primary-700 mb-2'>
                        Transporte
                      </h3>
                      <ul className='space-y-2 text-neutral-600'>
                        <li className='flex items-center'>
                          <svg
                            className='w-5 h-5 text-primary-600 mr-2'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                            />
                          </svg>
                          <span>
                            Metro: Línea 1 - Estación Botánica (5 min a pie)
                          </span>
                        </li>
                        <li className='flex items-center'>
                          <svg
                            className='w-5 h-5 text-primary-600 mr-2'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                            />
                          </svg>
                          <span>
                            Autobús: Líneas 14, 27 y 45 (parada Botánica)
                          </span>
                        </li>
                        <li className='flex items-center'>
                          <svg
                            className='w-5 h-5 text-primary-600 mr-2'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                            />
                          </svg>
                          <span>Parking público a 100m (Plaza Botánica)</span>
                        </li>
                      </ul>
                    </div>

                    <div className='pt-4 border-t border-neutral-200'>
                      <a
                        href='https://goo.gl/maps/XXX'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center text-primary-600 hover:text-primary-700 font-medium'
                      >
                        <svg
                          className='w-5 h-5 mr-2'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                        Cómo llegar
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <WhatsAppButton />
    </>
  );
}
