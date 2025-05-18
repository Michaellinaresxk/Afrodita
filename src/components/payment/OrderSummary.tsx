'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface CartItem {
  name: string;
  quantity: number;
  price: number;
  // Add other properties of a cart item here
}

interface OrderSummaryProps {
  cartItems: CartItem[]; // Now 'cartItems' is an array of 'CartItem' objects
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currentStep: number;
}

const OrderSummary = ({
  cartItems,
  subtotal,
  shipping,
  tax,
  total,
  currentStep,
}: OrderSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className='bg-white rounded-2xl shadow-sm sticky top-24'
    >
      <div className='p-6'>
        <h2 className='text-xl font-serif font-bold text-primary-900 mb-4'>
          Resumen del pedido
        </h2>

        {/* Productos en el carrito */}
        <div className='max-h-80 overflow-y-auto mb-4 pr-2 space-y-4'>
          {cartItems.map((item) => (
            <div
              // @ts-ignore
              key={`${item.id}-${item.selectedSize}`}
              className='flex gap-3 pb-3 border-b border-neutral-100'
            >
              {/* Miniatura */}
              <div className='h-16 w-16 rounded-md overflow-hidden relative flex-shrink-0 bg-neutral-50'>
                <Image
                  // @ts-ignore
                  src={item.imageSrc || '/img/productos/jabon-6.jpg'}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              {/* Info del producto */}
              <div className='flex-1'>
                <h3 className='text-sm font-medium text-neutral-800 line-clamp-1'>
                  {item.name}
                </h3>
                {/* @ts-ignore */}
                {item.selectedSize && (
                  <p className='text-xs text-neutral-500 mt-0.5'>
                    {/* @ts-ignore */}
                    Tamaño: {item.selectedSize}
                  </p>
                )}
                <div className='flex justify-between mt-1 text-sm'>
                  <span className='text-neutral-600'>
                    {item.quantity} x {item.price.toFixed(2)}RD
                  </span>
                  <span className='font-medium text-neutral-800'>
                    {(item.price * item.quantity).toFixed(2)}RD
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen de costos */}
        <div className='space-y-2 pt-2 border-t border-neutral-200'>
          <div className='flex justify-between text-sm'>
            <span className='text-neutral-600'>Subtotal</span>
            <span className='font-medium text-neutral-800'>
              RD$ {subtotal.toFixed(2)}
            </span>
          </div>
          <div className='flex justify-between text-sm'>
            <span className='text-neutral-600'>Envío</span>
            <span className='font-medium text-neutral-800'>
              {shipping === 0 ? 'Gratis' : `RD$ ${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className='flex justify-between text-sm'>
            <span className='text-neutral-600'>IVA (21%)</span>
            <span className='font-medium text-neutral-800'>
              RD$ {tax.toFixed(2)}
            </span>
          </div>
          {shipping === 0 && (
            <div className='flex items-center text-xs text-green-600 justify-end'>
              <svg
                className='w-3 h-3 mr-1'
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
              <span>Envío gratuito aplicado</span>
            </div>
          )}
          <div className='flex justify-between text-base pt-3 border-t border-neutral-200 mt-2'>
            <span className='font-medium text-neutral-800'>Total</span>
            <span className='font-bold text-primary-800'>
              RD$ {total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Información adicional en el paso 2 */}
        {currentStep === 2 && (
          <div className='mt-6 pt-4 border-t border-neutral-200'>
            <div className='bg-primary-50 p-3 rounded-lg text-sm text-primary-800'>
              <div className='flex items-start'>
                <svg
                  className='w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5'
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
                <p>
                  Todas las transacciones son seguras y están cifradas. Los
                  datos de tu tarjeta no se guardarán después de procesar el
                  pago.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sellos de confianza */}
      <div className='p-4 bg-neutral-50 rounded-b-2xl border-t border-neutral-100'>
        <div className='flex justify-center space-x-4'>
          <div className='flex items-center'>
            <svg
              className='w-5 h-5 text-neutral-400 mr-1.5'
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
            <span className='text-xs text-neutral-500'>Pago seguro</span>
          </div>
          <div className='flex items-center'>
            <svg
              className='w-5 h-5 text-neutral-400 mr-1.5'
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
            <span className='text-xs text-neutral-500'>100% Natural</span>
          </div>
          <div className='flex items-center'>
            <svg
              className='w-5 h-5 text-neutral-400 mr-1.5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
              ></path>
            </svg>
            <span className='text-xs text-neutral-500'>Garantía 30d</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
