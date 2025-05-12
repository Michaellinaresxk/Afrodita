'use client';

import { motion } from 'framer-motion';

const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Envío' },
    { id: 2, name: 'Pago' },
    { id: 3, name: 'Confirmación' },
  ];

  return (
    <div className='hidden md:block'>
      <div className='flex justify-between'>
        {steps.map((step) => (
          <div key={step.id} className='flex-1 relative'>
            <div
              className={`flex items-center ${
                step.id !== steps.length
                  ? 'after:content-[""] after:absolute after:w-full after:h-0.5 after:top-5 after:left-1/2 after:bg-neutral-200'
                  : ''
              }`}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  backgroundColor:
                    currentStep >= step.id
                      ? 'var(--primary-600)'
                      : 'var(--neutral-300)',
                }}
                transition={{ duration: 0.3, delay: step.id * 0.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 ${
                  currentStep >= step.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-300 text-neutral-500'
                }`}
              >
                {currentStep > step.id ? (
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
                      d='M5 13l4 4L19 7'
                    ></path>
                  </svg>
                ) : (
                  <span>{step.id}</span>
                )}
              </motion.div>
            </div>
            <div className='mt-2 text-center'>
              <span
                className={`text-sm font-medium ${
                  currentStep >= step.id
                    ? 'text-primary-700'
                    : 'text-neutral-500'
                }`}
              >
                {step.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;
