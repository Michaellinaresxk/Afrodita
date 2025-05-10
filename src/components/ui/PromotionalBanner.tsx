'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Banner Promocional Flotante
export function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Solo mostrar si no ha sido cerrado previamente
      const bannerDismissed = localStorage.getItem('bannerDismissed');
      if (!bannerDismissed) {
        setIsVisible(true);
      }
    }, 3000); // Mostrar después de 3 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // Guardar el estado en localStorage para no mostrarlo de nuevo
    localStorage.setItem('bannerDismissed', 'true');
  };

  // Si ya fue cerrado, no renderizar el componente
  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className='fixed bottom-5 right-5 z-50 max-w-md'
        >
          <div className='bg-white rounded-xl shadow-elegant p-4 glass-effect backdrop-blur-md bg-white/70 border border-white/10'>
            <div className='flex items-start'>
              <div className='flex-1'>
                <div className='flex items-center mb-2'>
                  <span className='inline-block text-xs font-bold text-white bg-secondary-500 px-2 py-1 rounded-full mr-2'>
                    OFERTA
                  </span>
                  <h3 className='font-medium text-primary-800'>
                    ¡Envío gratis en tu primer pedido!
                  </h3>
                </div>
                <p className='text-sm text-neutral-600 mb-3'>
                  Usa el código{' '}
                  <span className='font-bold text-secondary-600'>
                    NATURAL10
                  </span>{' '}
                  y recibe un 10% de descuento adicional.
                </p>
                <div className='flex space-x-2'>
                  <Link
                    href='/productos'
                    className='text-sm bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors font-medium'
                  >
                    Ver productos
                  </Link>
                  <button
                    onClick={handleDismiss}
                    className='text-sm text-neutral-500 hover:text-neutral-700 px-2 py-2 transition-colors'
                  >
                    Ahora no
                  </button>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className='text-neutral-400 hover:text-neutral-600 p-1'
                aria-label='Cerrar'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Sección de Llamada a la Acción (CTA)
export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className='py-20 relative overflow-hidden bg-gradient-to-r from-primary-900 to-primary-800 text-white'
    >
      {/* Elementos decorativos */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-full pattern-dots opacity-10'></div>
        <div className='absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary-700/50 blur-3xl'></div>
        <div className='absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-primary-700/30 blur-3xl'></div>

        {/* Formas flotantes */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className='absolute top-20 right-[20%] w-24 h-24 rounded-full bg-secondary-500/10 backdrop-blur-sm'
        ></motion.div>

        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: 'easeInOut',
            delay: 1,
          }}
          className='absolute bottom-20 left-[20%] w-16 h-16 rounded-full bg-secondary-500/10 backdrop-blur-sm'
        ></motion.div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className='font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6'>
              Transforma tu rutina de cuidado con jabones 100% naturales
            </h2>
            <p className='text-white/90 text-lg mb-8 max-w-xl'>
              Tu piel merece lo mejor. Descubre nuestra colección de jabones
              artesanales elaborados con ingredientes orgánicos y técnicas
              tradicionales para una experiencia única.
            </p>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                href='/productos'
                className='btn-primary bg-white hover:bg-neutral-100 text-primary-800 rounded-full text-center py-4 px-8 shadow-lg hover:shadow-xl transition-all duration-300 font-medium'
              >
                Ver catálogo
              </Link>
              <Link
                href='/sobre-nosotros'
                className='btn-outline border border-white/30 hover:bg-white/10 text-white rounded-full text-center py-4 px-8 transition-colors font-medium'
              >
                Conocer más
              </Link>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap gap-3 mt-8'>
              <div className='flex items-center bg-white/10 rounded-full px-3 py-2'>
                <svg
                  className='w-4 h-4 mr-2 text-secondary-300'
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
                <span className='text-sm'>Envío gratis +50€</span>
              </div>
              <div className='flex items-center bg-white/10 rounded-full px-3 py-2'>
                <svg
                  className='w-4 h-4 mr-2 text-secondary-300'
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
                <span className='text-sm'>Entrega 24/48h</span>
              </div>
              <div className='flex items-center bg-white/10 rounded-full px-3 py-2'>
                <svg
                  className='w-4 h-4 mr-2 text-secondary-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  ></path>
                </svg>
                <span className='text-sm'>Pago seguro</span>
              </div>
            </div>
          </motion.div>

          {/* Imagen/Producto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className='relative h-[500px]'
          >
            <div className='absolute inset-0 flex items-center justify-center'>
              {/* Círculo decorativo grande */}
              <div className='absolute w-[350px] h-[350px] rounded-full bg-gradient-to-br from-white/10 to-white/5'></div>

              {/* Imagen central con efecto flotante */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: 'easeInOut',
                }}
                className='relative z-10'
              >
                <Image
                  src='/img/product-bundle.png' // Imagen del paquete de jabones con fondo transparente
                  alt='Kit de jabones naturales'
                  width={400}
                  height={400}
                  className='drop-shadow-2xl'
                />
              </motion.div>

              {/* Elementos flotantes alrededor */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className='absolute top-[20%] right-[15%] w-16 h-16 rounded-full bg-secondary-500/20 backdrop-blur-md flex items-center justify-center shadow-lg'
              >
                <span className='text-xs font-medium'>Premium</span>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  x: [0, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 7,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className='absolute bottom-[20%] left-[10%] w-20 h-20 rounded-full bg-primary-400/20 backdrop-blur-md flex items-center justify-center shadow-lg'
              >
                <span className='text-xs font-medium'>Natural</span>
              </motion.div>

              {/* Tarjeta de oferta flotante */}
              <motion.div
                animate={{
                  y: [10, -10, 10],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: 'easeInOut',
                  delay: 2,
                }}
                className='absolute bottom-[5%] right-[5%] bg-white rounded-lg shadow-xl p-3 text-primary-800'
              >
                <div className='text-center'>
                  <span className='text-xs text-neutral-500'>Descuento</span>
                  <div className='text-xl font-bold text-secondary-600'>
                    -15%
                  </div>
                  <span className='text-xs'>¡Primera compra!</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Separador ondulado */}
      <div className='absolute bottom-0 left-0 w-full overflow-hidden'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
          className='w-full h-12 text-white'
        >
          <path
            d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,66,56.44,321.39,56.44z'
            fill='currentColor'
          ></path>
        </svg>
      </div>
    </section>
  );
}

// Componente de Newsletter mejorado
export function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de envío exitoso
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section ref={ref} className='py-16 bg-primary-50 relative overflow-hidden'>
      {/* Elementos decorativos */}
      <div className='absolute inset-0 pattern-dots opacity-25'></div>
      <div className='absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-100/50 blur-3xl'></div>
      <div className='absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-secondary-100/30 blur-3xl'></div>

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className='bg-white rounded-2xl shadow-soft p-8 md:p-12'
        >
          <div className='text-center mb-8'>
            <span className='inline-block text-sm font-medium text-primary-600 mb-2 tracking-wider uppercase'>
              Newsletter
            </span>
            <h2 className='font-serif text-2xl md:text-3xl font-bold text-primary-800 mb-4'>
              Únete a Nuestra Comunidad Natural
            </h2>
            <p className='text-neutral-600 max-w-lg mx-auto'>
              Suscríbete para recibir consejos de belleza natural, noticias
              sobre nuestros productos y ofertas exclusivas directamente en tu
              correo.
            </p>
          </div>

          {/* Formulario de Newsletter con animación */}
          <AnimatePresence mode='wait'>
            {!submitted ? (
              <motion.form
                key='form'
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className='max-w-md mx-auto'
              >
                <div className='flex flex-col sm:flex-row gap-3 mb-3'>
                  <input
                    type='email'
                    placeholder='Tu dirección de email'
                    className='flex-grow px-4 py-3 rounded-lg border-neutral-300 focus:ring-primary-500 focus:border-primary-500 shadow-sm'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type='submit'
                    className='bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors font-medium whitespace-nowrap shadow-md hover:shadow-lg'
                  >
                    Suscribirme
                  </button>
                </div>
                <p className='text-xs text-neutral-500 text-center mt-2'>
                  Respetamos tu privacidad. Puedes darte de baja en cualquier
                  momento.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key='success'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='text-center'
              >
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
                <h3 className='text-xl font-semibold text-primary-800 mb-2'>
                  ¡Gracias por suscribirte!
                </h3>
                <p className='text-neutral-600'>
                  Te hemos enviado un correo de confirmación a{' '}
                  <span className='font-medium'>{email}</span>.
                  <br />
                  Revisa tu bandeja de entrada para completar tu suscripción.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Iconos de ventajas */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10'>
            <div className='flex items-center'>
              <div className='flex-shrink-0 mr-3'>
                <div className='bg-primary-100 p-2 rounded-full'>
                  <svg
                    className='w-5 h-5 text-primary-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <h4 className='text-sm font-medium text-primary-800'>
                  Novedades exclusivas
                </h4>
                <p className='text-xs text-neutral-500'>
                  Sé el primero en conocer nuestros lanzamientos
                </p>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='flex-shrink-0 mr-3'>
                <div className='bg-secondary-100 p-2 rounded-full'>
                  <svg
                    className='w-5 h-5 text-secondary-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <h4 className='text-sm font-medium text-primary-800'>
                  Descuentos especiales
                </h4>
                <p className='text-xs text-neutral-500'>
                  Ofertas exclusivas para suscriptores
                </p>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='flex-shrink-0 mr-3'>
                <div className='bg-rose-100 p-2 rounded-full'>
                  <svg
                    className='w-5 h-5 text-rose-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <h4 className='text-sm font-medium text-primary-800'>
                  Consejos de belleza
                </h4>
                <p className='text-xs text-neutral-500'>
                  Tips y trucos para el cuidado natural
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
