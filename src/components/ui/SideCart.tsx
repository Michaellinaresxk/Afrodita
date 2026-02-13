'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type SideCartProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: {
    id: string;
    name: string;
    price: number;
    imageSrc?: string;
    selectedSize?: string;
    quantity: number;
  }[];
  removeFromCart: (id: string, size?: string) => void;
  updateQuantity: (id: string, size?: string, quantity?: number) => void;
  subtotal: number;
};

const SideCart = ({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  updateQuantity,
  subtotal,
}: SideCartProps) => {
  const router = useRouter();

  // ─────────────────────────────────────────────────────
  // FIX: No need for handleClose/setTimeout/isClosing.
  // AnimatePresence handles exit animations automatically.
  // We just call onClose() → sets isCartOpen=false →
  // AnimatePresence plays exit variants → DOM unmounts.
  // ─────────────────────────────────────────────────────

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // FIX #1: Escape key — was commented out
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, handleClose]);

  // Lock body scroll when open
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

  // Animation variants
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
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const goToCheckout = () => {
    handleClose();
    router.push('/payment');
  };

  const shipping = subtotal > 50 ? 0 : 3.99;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* FIX #2: Backdrop — onClick was commented out */}
          <motion.div
            className='fixed inset-0 bg-black/50 z-40'
            variants={backdropVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={handleClose}
          />

          {/* Side Cart panel */}
          <motion.div
            className='fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col'
            variants={sidebarVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            {/* Header */}
            <div className='p-4 border-b border-[#E8E3DA] flex items-center justify-between'>
              <h2 className='font-serif text-lg font-bold text-[#2C3E2D]'>
                Tu Carrito
              </h2>

              {/* FIX #3: X button — onClick was commented out */}
              <button
                onClick={handleClose}
                className='p-1.5 rounded-full hover:bg-[#F5F0E8] text-[#5E6B5A] transition-colors'
                aria-label='Cerrar carrito'
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
                  />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className='flex-1 overflow-y-auto p-4'>
              {cartItems.length === 0 ? (
                <div className='text-center py-10'>
                  <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F5F0E8] text-[#5E6B5A] mb-4'>
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
                      />
                    </svg>
                  </div>
                  <h3 className='text-lg font-medium text-[#2C3E2D] mb-2'>
                    Tu carrito está vacío
                  </h3>
                  <p className='text-[#5E6B5A] mb-6'>
                    ¡Descubre nuestra colección de productos naturales!
                  </p>

                  {/* FIX #4: "Ver productos" link — onClick was commented out */}
                  <Link
                    href='/products'
                    onClick={handleClose}
                    className='inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full text-white bg-[#5C7A56] hover:bg-[#4A6845] transition-colors shadow-sm'
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
                        className='flex gap-3 pb-4 border-b border-[#E8E3DA]'
                      >
                        {/* Image */}
                        <div className='h-20 w-20 rounded-lg overflow-hidden bg-[#F5F0E8] relative flex-shrink-0'>
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
                            <h3 className='text-sm font-medium text-[#2C3E2D]'>
                              {item.name}
                            </h3>
                            <button
                              onClick={() =>
                                removeFromCart(item.id, item.selectedSize)
                              }
                              className='text-[#5E6B5A]/50 hover:text-red-400 transition-colors'
                              aria-label={`Eliminar ${item.name}`}
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
                                />
                              </svg>
                            </button>
                          </div>

                          {item.selectedSize && (
                            <p className='text-xs text-[#6B7B66] mt-0.5'>
                              Tamaño: {item.selectedSize}
                            </p>
                          )}

                          <div className='flex justify-between items-center mt-2'>
                            <div className='flex items-center border border-[#E8E3DA] rounded-md'>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.selectedSize,
                                    item.quantity - 1,
                                  )
                                }
                                disabled={item.quantity <= 1}
                                className={`w-7 h-7 flex items-center justify-center rounded-l-md transition-colors ${
                                  item.quantity <= 1
                                    ? 'text-[#E8E3DA]'
                                    : 'text-[#5E6B5A] hover:bg-[#F5F0E8]'
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
                                  />
                                </svg>
                              </button>
                              <span className='w-8 text-center text-sm text-[#2C3E2D] font-medium'>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.selectedSize,
                                    item.quantity + 1,
                                  )
                                }
                                className='w-7 h-7 flex items-center justify-center text-[#5E6B5A] hover:bg-[#F5F0E8] rounded-r-md transition-colors'
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
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className='text-right'>
                              <p className='text-sm font-medium text-[#2C3E2D]'>
                                RD$ {(item.price * item.quantity).toFixed(2)}
                              </p>
                              {item.quantity > 1 && (
                                <p className='text-xs text-[#6B7B66]'>
                                  RD$ {item.price.toFixed(2)} unidad
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
              <div className='border-t border-[#E8E3DA] p-4 bg-white'>
                {/* Summary */}
                <div className='space-y-2 mb-4'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-[#5E6B5A]'>Subtotal</span>
                    <span className='font-medium text-[#2C3E2D]'>
                      RD$ {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-[#5E6B5A]'>Envío</span>
                    <span className='font-medium text-[#2C3E2D]'>
                      {shipping === 0 ? 'Gratis' : `RD$ ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <div className='flex items-center justify-end text-xs text-[#5C7A56]'>
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
                        />
                      </svg>
                      <span>Envío gratuito aplicado</span>
                    </div>
                  )}
                  <div className='flex justify-between text-base pt-2 border-t border-[#E8E3DA]'>
                    <span className='font-medium text-[#2C3E2D]'>Total</span>
                    <span className='font-bold text-[#2C3E2D]'>
                      RD$ {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className='space-y-2'>
                  <button
                    onClick={goToCheckout}
                    className='w-full py-3 px-4 bg-[#5C7A56] hover:bg-[#4A6845] text-white font-medium rounded-lg transition-colors shadow-[0_4px_12px_rgba(92,122,86,0.2)] hover:shadow-[0_6px_20px_rgba(92,122,86,0.3)] flex items-center justify-center text-sm'
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
                      />
                    </svg>
                  </button>

                  {/* FIX #5: "Seguir comprando" — onClick was commented out */}
                  <button
                    onClick={handleClose}
                    className='w-full py-2.5 px-4 bg-white border border-[#E8E3DA] hover:bg-[#F5F0E8] text-[#2C3E2D] font-medium rounded-lg transition-colors text-sm'
                  >
                    Seguir comprando
                  </button>
                </div>

                {/* Free shipping incentive */}
                {subtotal < 50 && (
                  <div className='mt-4 bg-[#C4D7A4]/10 border border-[#C4D7A4]/20 p-3 rounded-lg'>
                    <div className='flex items-start'>
                      <svg
                        className='w-4 h-4 text-[#5C7A56] mr-2 flex-shrink-0 mt-0.5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                      <p className='text-xs text-[#5E6B5A]'>
                        ¡Añade{' '}
                        <span className='font-bold text-[#2C3E2D]'>
                          RD$ {(50 - subtotal).toFixed(2)}
                        </span>{' '}
                        más a tu compra para obtener envío gratuito!
                      </p>
                    </div>
                    <div className='w-full bg-[#E8E3DA] rounded-full h-1.5 mt-2'>
                      <div
                        className='bg-[#5C7A56] h-1.5 rounded-full transition-all duration-300'
                        style={{
                          width: `${Math.min(100, (subtotal / 50) * 100)}%`,
                        }}
                      />
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
