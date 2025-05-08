'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Newsletter() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className='py-20 bg-primary-900 text-white' ref={ref}>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className='max-w-2xl mx-auto text-center'
        >
          <h2 className='font-serif text-3xl md:text-4xl font-bold mb-4'>
            Únete a Nuestra Comunidad
          </h2>
          <p className='text-primary-100 mb-8'>
            Suscríbete para recibir noticias, consejos de belleza natural y
            ofertas exclusivas.
          </p>

          <form className='flex flex-col sm:flex-row gap-3'>
            <input
              type='email'
              placeholder='Tu dirección de email'
              className='flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary-400 text-neutral-800'
              required
            />
            <button
              type='submit'
              className='bg-secondary-500 hover:bg-secondary-600 px-6 py-3 rounded-full transition-colors font-medium whitespace-nowrap'
            >
              Suscribirme
            </button>
          </form>

          <p className='text-xs text-primary-300 mt-4'>
            Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
