'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SideCart = ({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  updateQuantity,
  subtotal,
}) => {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  // Manejar cierre con animación
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  // Cierre con tecla Escape
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen]);

  // Impedir scroll en el body cuando el sideCart está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Variantes para animaciones
  const sidebarVariants = {
    hidden: { x: '100%', opacity: 1 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      x: '100%',
      opacity: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  // Ir a la página de checkout
  const goToCheckout = () => {
    router.push('/payment');
    onClose();
  };

  // Calcular el total con envío
  const shipping = subtotal > 50 ? 0 : 3.99;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className='fixed inset-0 bg-black/50 z-40'
            variants={backdropVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={handleClose}
          />

          {/* Side Cart */}
          <motion.div
            className='fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col'
            variants={sidebarVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            {/* Header */}
            <div className='p-4 border-b border-neutral-200 flex items-center justify-between'>
              <h2 className='font-serif text-lg font-bold text-primary-800'>
                Tu Carrito
              </h2>
              <button
                onClick={handleClose}
                className='p-1 rounded-full hover:bg-neutral-100 text-neutral-500'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
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

            {/* Cart Items */}
            <div className='flex-1 overflow-y-auto p-4'>
              {cartItems.length === 0 ? (
                <div className='text-center py-10'>
                  <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 mb-4'>
                    <svg
                      className='w-8 h-8'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                      ></path>
                    </svg>
                  </div>
                  <h3 className='text-lg font-medium text-neutral-800 mb-2'>
                    Tu carrito está vacío
                  </h3>
                  <p className='text-neutral-600 mb-6'>
                    ¡Descubre nuestra colección de productos naturales!
                  </p>
                  <Link
                    href='/products'
                    onClick={handleClose}
                    className='inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700'
                  >
                    Ver productos
                  </Link>
                </div>
              ) : (
                <div className='space-y-4'>
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.selectedSize}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3 }}
                        className='flex gap-3 pb-4 border-b border-neutral-200'
                      >
                        {/* Imagen */}
                        <div className='h-20 w-20 rounded-md overflow-hidden bg-neutral-100 relative flex-shrink-0'>
                          <Image
                            src={item.imageSrc || '/img/productos/jabon-6.jpg'}
                            alt={item.name}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>

                        {/* Info */}
                        <div className='flex-1'>
                          <div className='flex justify-between'>
                            <h3 className='text-sm font-medium text-neutral-800'>
                              {item.name}
                            </h3>
                            <button
                              onClick={() =>
                                removeFromCart(item.id, item.selectedSize)
                              }
                              className='text-neutral-400 hover:text-neutral-600'
                            >
                              <svg
                                className='w-4 h-4'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
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

                          {item.selectedSize && (
                            <p className='text-xs text-neutral-500 mt-0.5'>
                              Tamaño: {item.selectedSize}
                            </p>
                          )}

                          <div className='flex justify-between items-center mt-2'>
                            <div className='flex items-center border border-neutral-200 rounded-md'>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.selectedSize,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity <= 1}
                                className={`w-6 h-6 flex items-center justify-center ${
                                  item.quantity <= 1
                                    ? 'text-neutral-300'
                                    : 'text-neutral-600 hover:bg-neutral-100'
                                }`}
                              >
                                <svg
                                  className='w-3 h-3'
                                  fill='none'
                                  stroke='currentColor'
                                  viewBox='0 0 24 24'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M20 12H4'
                                  ></path>
                                </svg>
                              </button>
                              <span className='w-8 text-center text-sm text-neutral-800'>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.selectedSize,
                                    item.quantity + 1
                                  )
                                }
                                className='w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-100'
                              >
                                <svg
                                  className='w-3 h-3'
                                  fill='none'
                                  stroke='currentColor'
                                  viewBox='0 0 24 24'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                                  ></path>
                                </svg>
                              </button>
                            </div>
                            <div className='text-right'>
                              <p className='text-sm font-medium text-neutral-800'>
                                {(item.price * item.quantity).toFixed(2)}€
                              </p>
                              {item.quantity > 1 && (
                                <p className='text-xs text-neutral-500'>
                                  {item.price.toFixed(2)}€ unidad
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className='border-t border-neutral-200 p-4 bg-white'>
                {/* Resumen */}
                <div className='space-y-2 mb-4'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-neutral-600'>Subtotal</span>
                    <span className='font-medium text-neutral-800'>
                      {subtotal.toFixed(2)}€
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-neutral-600'>Envío</span>
                    <span className='font-medium text-neutral-800'>
                      {shipping === 0 ? 'Gratis' : `${shipping.toFixed(2)}€`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <div className='flex items-center justify-end text-xs text-green-600'>
                      <svg
                        className='w-3 h-3 mr-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                      <span>Envío gratuito aplicado</span>
                    </div>
                  )}
                  <div className='flex justify-between text-base pt-2 border-t border-neutral-200'>
                    <span className='font-medium text-neutral-800'>Total</span>
                    <span className='font-bold text-primary-800'>
                      {total.toFixed(2)}€
                    </span>
                  </div>
                </div>

                {/* Botones */}
                <div className='space-y-2'>
                  <button
                    onClick={goToCheckout}
                    className='w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center'
                  >
                    Finalizar compra
                    <svg
                      className='ml-2 w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M14 5l7 7m0 0l-7 7m7-7H3'
                      ></path>
                    </svg>
                  </button>
                  <button
                    onClick={handleClose}
                    className='w-full py-2 px-4 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-medium rounded-lg transition-colors text-sm'
                  >
                    Seguir comprando
                  </button>
                </div>

                {/* Envío gratuito incentivo */}
                {subtotal < 50 && (
                  <div className='mt-4 bg-primary-50 p-3 rounded-lg'>
                    <div className='flex items-start'>
                      <svg
                        className='w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        ></path>
                      </svg>
                      <p className='text-xs text-primary-700'>
                        ¡Añade{' '}
                        <span className='font-bold'>
                          {(50 - subtotal).toFixed(2)}€
                        </span>{' '}
                        más a tu compra para obtener envío gratuito!
                      </p>
                    </div>
                    <div className='w-full bg-neutral-200 rounded-full h-1.5 mt-2'>
                      <div
                        className='bg-primary-500 h-1.5 rounded-full'
                        style={{
                          width: `${Math.min(100, (subtotal / 50) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideCart;
