'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PaymentForm = ({
  paymentMethod,
  setPaymentMethod,
  onSubmit,
  onBack,
  isProcessing,
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // Formatear número de tarjeta con espacios cada 4 dígitos
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (value.length <= 16) {
      const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
      setCardNumber(formattedValue);
    }
  };

  // Formatear fecha de expiración (MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 4) {
      if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      setExpiry(value);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Opciones de método de pago */}
      <div className='mb-6'>
        <h3 className='text-lg font-medium text-primary-800 mb-3'>
          Método de pago
        </h3>
        <div className='grid grid-cols-3 gap-3'>
          <label
            className={`
            flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all
            ${
              paymentMethod === 'card'
                ? 'border-primary-600 bg-primary-50'
                : 'border-neutral-200 bg-white hover:bg-neutral-50'
            }
          `}
          >
            <input
              type='radio'
              name='paymentMethod'
              value='card'
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              className='sr-only'
            />
            <svg
              className={`w-8 h-8 mb-2 ${
                paymentMethod === 'card'
                  ? 'text-primary-600'
                  : 'text-neutral-500'
              }`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
              ></path>
            </svg>
            <span
              className={`text-sm font-medium ${
                paymentMethod === 'card'
                  ? 'text-primary-700'
                  : 'text-neutral-700'
              }`}
            >
              Tarjeta
            </span>
          </label>

          <label
            className={`
            flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all
            ${
              paymentMethod === 'paypal'
                ? 'border-primary-600 bg-primary-50'
                : 'border-neutral-200 bg-white hover:bg-neutral-50'
            }
          `}
          >
            <input
              type='radio'
              name='paymentMethod'
              value='paypal'
              checked={paymentMethod === 'paypal'}
              onChange={() => setPaymentMethod('paypal')}
              className='sr-only'
            />
            <Image
              src='/img/payment/paypal.png'
              alt='PayPal'
              width={60}
              height={36}
              className='mb-2'
            />
            <span
              className={`text-sm font-medium ${
                paymentMethod === 'paypal'
                  ? 'text-primary-700'
                  : 'text-neutral-700'
              }`}
            >
              PayPal
            </span>
          </label>

          <label
            className={`
            flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all
            ${
              paymentMethod === 'bizum'
                ? 'border-primary-600 bg-primary-50'
                : 'border-neutral-200 bg-white hover:bg-neutral-50'
            }
          `}
          >
            <input
              type='radio'
              name='paymentMethod'
              value='bizum'
              checked={paymentMethod === 'bizum'}
              onChange={() => setPaymentMethod('bizum')}
              className='sr-only'
            />
            <Image
              src='/img/payment/bizum.png'
              alt='Bizum'
              width={60}
              height={36}
              className='mb-2'
            />
            <span
              className={`text-sm font-medium ${
                paymentMethod === 'bizum'
                  ? 'text-primary-700'
                  : 'text-neutral-700'
              }`}
            >
              Bizum
            </span>
          </label>
        </div>
      </div>

      {/* Formulario para tarjeta de crédito */}
      {paymentMethod === 'card' && (
        <div className='space-y-4 mb-8'>
          <div>
            <label
              htmlFor='cardNumber'
              className='block text-sm font-medium text-neutral-700 mb-1'
            >
              Número de tarjeta
            </label>
            <div className='relative'>
              <input
                type='text'
                id='cardNumber'
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder='1234 5678 9012 3456'
                className='w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500'
                required
              />
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <svg
                  className='w-5 h-5 text-neutral-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor='cardName'
              className='block text-sm font-medium text-neutral-700 mb-1'
            >
              Nombre en la tarjeta
            </label>
            <input
              type='text'
              id='cardName'
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder='NOMBRE APELLIDOS'
              className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500'
              required
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label
                htmlFor='expiry'
                className='block text-sm font-medium text-neutral-700 mb-1'
              >
                Fecha de expiración
              </label>
              <input
                type='text'
                id='expiry'
                value={expiry}
                onChange={handleExpiryChange}
                placeholder='MM/YY'
                className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500'
                required
              />
            </div>

            <div>
              <label
                htmlFor='cvc'
                className='block text-sm font-medium text-neutral-700 mb-1'
              >
                CVC / CVV
              </label>
              <div className='relative'>
                <input
                  type='text'
                  id='cvc'
                  value={cvc}
                  onChange={(e) =>
                    setCvc(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))
                  }
                  placeholder='123'
                  className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500'
                  required
                  maxLength={3}
                />
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                  <svg
                    className='w-5 h-5 text-neutral-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className='flex items-center mt-4'>
            <input
              id='saveCard'
              name='saveCard'
              type='checkbox'
              className='h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500'
            />
            <label
              htmlFor='saveCard'
              className='ml-2 block text-sm text-neutral-600'
            >
              Guardar tarjeta para futuras compras
            </label>
          </div>
        </div>
      )}

      {/* Formulario para PayPal */}
      {paymentMethod === 'paypal' && (
        <div className='bg-neutral-50 p-6 rounded-lg mb-8'>
          <p className='text-neutral-600 text-sm mb-4'>
            Al hacer clic en "Completar pedido", serás redirigido a PayPal para
            completar tu compra de forma segura.
          </p>
          <div className='flex items-center justify-center'>
            <Image
              src='/img/payment/paypal-checkout.png'
              alt='PayPal Checkout'
              width={200}
              height={80}
            />
          </div>
        </div>
      )}

      {/* Formulario para Bizum */}
      {paymentMethod === 'bizum' && (
        <div className='bg-neutral-50 p-6 rounded-lg mb-8'>
          <p className='text-neutral-600 text-sm mb-4'>
            Al hacer clic en "Completar pedido", recibirás una notificación en
            tu móvil para autorizar el pago con Bizum.
          </p>
          <div className='flex flex-col items-center justify-center'>
            <Image
              src='/img/payment/bizum-checkout.png'
              alt='Bizum Checkout'
              width={120}
              height={80}
            />
            <p className='text-sm text-neutral-500 mt-2'>
              Paga con tu móvil de forma rápida y segura
            </p>
          </div>
        </div>
      )}

      {/* Aceptar términos */}
      <div className='mb-6'>
        <div className='flex items-start'>
          <div className='flex items-center h-5'>
            <input
              id='terms'
              name='terms'
              type='checkbox'
              className='h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500'
              required
            />
          </div>
          <label
            htmlFor='terms'
            className='ml-2 block text-sm text-neutral-600'
          >
            Acepto los{' '}
            <a
              href='/terms'
              className='text-primary-600 hover:text-primary-800 underline'
            >
              Términos y Condiciones
            </a>{' '}
            y la{' '}
            <a
              href='/privacy'
              className='text-primary-600 hover:text-primary-800 underline'
            >
              Política de Privacidad
            </a>
          </label>
        </div>
      </div>

      {/* Botones de navegación */}
      <div className='flex justify-between'>
        <button
          type='button'
          onClick={onBack}
          className='text-primary-600 hover:text-primary-800 font-medium flex items-center'
        >
          <svg
            className='mr-2 w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            ></path>
          </svg>
          Volver a envío
        </button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type='submit'
          className='bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center'
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <svg
                className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
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
              Procesando...
            </>
          ) : (
            <>
              <span>Completar pedido</span>
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
                  strokeWidth='2'
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                ></path>
              </svg>
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
};

export default PaymentForm;
