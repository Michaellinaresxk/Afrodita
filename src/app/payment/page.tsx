'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CheckoutSteps from '@/components/payment/CheckoutSteps';
import AddressForm from '@/components/payment/AddressForm';
import OrderSummary from '@/components/payment/OrderSummary';
import PaymentForm from '@/components/payment/PaymentForm';

export default function PaymentPage() {
  const router = useRouter();
  const { cartItems, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Republica Dominicana',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Calcular costos
  const shipping = subtotal > 50 ? 0 : 3.99;
  const tax = subtotal * 0.21; // 21% IVA
  const total = subtotal + shipping + tax;

  // Verificar si hay items en el carrito
  useEffect(() => {
    if (cartItems.length === 0 && !orderComplete) {
      router.push('/products');
    }
  }, [cartItems, router, orderComplete]);

  // Manejo de cambio de paso
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  // Manejar cambios en formulario de envío
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  // Manejar el envío del pago
  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulación de procesamiento de pago
    setTimeout(() => {
      // Generar un ID de pedido aleatorio
      const generatedOrderId =
        'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setOrderId(generatedOrderId);
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart(); // Limpiar el carrito después de completar el pedido
      nextStep();
    }, 2000);
  };

  return (
    <>
      <WhatsAppButton />
      <div className='min-h-screen bg-neutral-50 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Pasos del checkout */}
          <CheckoutSteps currentStep={currentStep} />

          <div className='mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10'>
            {/* Columna principal - Formularios */}
            <div className='lg:col-span-8'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Paso 1: Información de envío */}
                {currentStep === 1 && (
                  <div className='bg-white rounded-2xl shadow-sm p-6 md:p-8'>
                    <h2 className='text-2xl font-serif font-bold text-primary-900 mb-6'>
                      Información de envío
                    </h2>
                    <AddressForm
                      shippingInfo={shippingInfo}
                      handleChange={handleShippingChange}
                      onSubmit={nextStep}
                    />
                  </div>
                )}

                {/* Paso 2: Método de pago */}
                {currentStep === 2 && (
                  <div className='bg-white rounded-2xl shadow-sm p-6 md:p-8'>
                    <h2 className='text-2xl font-serif font-bold text-primary-900 mb-6'>
                      Método de pago
                    </h2>
                    <PaymentForm
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                      onSubmit={handlePayment}
                      onBack={prevStep}
                      isProcessing={isProcessing}
                    />
                  </div>
                )}

                {/* Paso 3: Confirmación de pedido */}
                {currentStep === 3 && (
                  <div className='bg-white rounded-2xl shadow-sm p-6 md:p-8 text-center'>
                    <div className='flex flex-col items-center'>
                      <div className='w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6'>
                        <svg
                          className='w-10 h-10 text-primary-600'
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
                      <h2 className='text-2xl font-serif font-bold text-primary-900 mb-2'>
                        ¡Pedido completado!
                      </h2>
                      <p className='text-neutral-600 mb-4'>
                        Tu pedido #{orderId} ha sido procesado correctamente.
                      </p>
                      <div className='bg-primary-50 p-4 rounded-lg mb-6 inline-block'>
                        <p className='text-sm text-primary-800'>
                          Hemos enviado un correo de confirmación a{' '}
                          <span className='font-medium'>
                            {shippingInfo.email}
                          </span>
                        </p>
                      </div>
                      <div className='border-t border-neutral-200 w-full pt-6 mt-6'>
                        <h3 className='font-medium text-lg mb-4 text-primary-800'>
                          ¿Qué ocurre ahora?
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                          <div className='bg-neutral-50 p-4 rounded-lg'>
                            <div className='bg-white w-10 h-10 rounded-full flex items-center justify-center mb-2 text-primary-600'>
                              <span className='font-bold'>1</span>
                            </div>
                            <h4 className='font-medium text-primary-800 mb-1'>
                              Procesamiento
                            </h4>
                            <p className='text-sm text-neutral-600'>
                              Prepararemos tu pedido en las próximas 24h.
                            </p>
                          </div>
                          <div className='bg-neutral-50 p-4 rounded-lg'>
                            <div className='bg-white w-10 h-10 rounded-full flex items-center justify-center mb-2 text-primary-600'>
                              <span className='font-bold'>2</span>
                            </div>
                            <h4 className='font-medium text-primary-800 mb-1'>
                              Envío
                            </h4>
                            <p className='text-sm text-neutral-600'>
                              Recibirás un correo con el seguimiento de tu
                              pedido.
                            </p>
                          </div>
                          <div className='bg-neutral-50 p-4 rounded-lg'>
                            <div className='bg-white w-10 h-10 rounded-full flex items-center justify-center mb-2 text-primary-600'>
                              <span className='font-bold'>3</span>
                            </div>
                            <h4 className='font-medium text-primary-800 mb-1'>
                              Entrega
                            </h4>
                            <p className='text-sm text-neutral-600'>
                              Tu pedido llegará en 24-48h laborables.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='mt-8'>
                        <Link
                          href='/products'
                          className='bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors'
                        >
                          Seguir comprando
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Columna lateral - Resumen de pedido */}
            <div className='lg:col-span-4'>
              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                currentStep={currentStep}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
