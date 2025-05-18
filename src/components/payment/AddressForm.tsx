'use client';

import { motion } from 'framer-motion';
// @ts-ignore
const AddressForm = ({ shippingInfo, handleChange, onSubmit }) => {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
        <div>
          <label
            htmlFor='firstName'
            className='block text-sm font-medium text-neutral-700 mb-1'
          >
            Nombre
          </label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={shippingInfo.firstName}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500'
            required
          />
        </div>
        <div>
          <label
            htmlFor='lastName'
            className='block text-sm font-medium text-neutral-700 mb-1'
          >
            Apellidos
          </label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={shippingInfo.lastName}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500'
            required
          />
        </div>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-neutral-700 mb-1'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={shippingInfo.email}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500'
            required
          />
        </div>
        <div>
          <label
            htmlFor='phone'
            className='block text-sm font-medium text-neutral-700 mb-1'
          >
            Teléfono
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={shippingInfo.phone}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500'
            required
          />
        </div>
        <div className='md:col-span-2'>
          <label
            htmlFor='address'
            className='block text-sm font-medium text-neutral-700 mb-1'
          >
            Dirección
          </label>
          <input
            type='text'
            id='address'
            name='address'
            value={shippingInfo.address}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500'
            required
          />
        </div>
        <div>
          <label
            htmlFor='city'
            className='block text-sm font-medium text-neutral-700 mb-1'
          >
            Ciudad
          </label>
          <input
            type='text'
            id='city'
            name='city'
            value={shippingInfo.city}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500'
            required
          />
        </div>
        <div>
          <label
            htmlFor='postalCode'
            className='block text-sm font-medium text-neutral-700 mb-1'
          >
            Código Postal
          </label>
          <input
            type='text'
            id='postalCode'
            name='postalCode'
            value={shippingInfo.postalCode}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500'
            required
          />
        </div>
        <div>
          <label
            htmlFor='country'
            className='block text-sm font-medium text-neutral-700 mb-1'
          >
            Provincia
          </label>
          <select
            id='country'
            name='country'
            value={shippingInfo.country}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500'
            required
          >
            <option value='Santo Domingo'>Santo Domingo</option>
            <option value='Santiago'>Santiago</option>
            <option value='Higuey'>Higuey</option>
          </select>
        </div>
      </div>

      {/* Opciones de envío */}
      <div className='mb-8'>
        <h3 className='text-lg font-medium text-primary-800 mb-3'>
          Método de envío
        </h3>
        <div className='space-y-3'>
          <label className='flex items-center p-4 border border-primary-200 rounded-lg bg-primary-50 cursor-pointer'>
            <input
              type='radio'
              name='shipping'
              value='standard'
              defaultChecked
              className='h-4 w-4 text-primary-600 border-neutral-300 focus:ring-primary-500'
            />
            <span className='ml-3 flex flex-1 justify-between'>
              <span>
                <span className='block text-sm font-medium text-primary-800'>
                  Estándar (24-48h)
                </span>
                <span className='block text-xs text-neutral-500'>
                  Entrega en 1-2 días laborables
                </span>
              </span>
              <span className='text-sm font-medium text-primary-800'>
                Gratis
              </span>
            </span>
          </label>
          <label className='flex items-center p-4 border border-neutral-200 rounded-lg bg-white cursor-pointer'>
            <input
              type='radio'
              name='shipping'
              value='express'
              className='h-4 w-4 text-primary-600 border-neutral-300 focus:ring-primary-500'
            />
            <span className='ml-3 flex flex-1 justify-between'>
              <span>
                <span className='block text-sm font-medium text-neutral-800'>
                  Express (24h)
                </span>
                <span className='block text-xs text-neutral-500'>
                  Entrega garantizada al día siguiente
                </span>
              </span>
              <span className='text-sm font-medium text-neutral-800'>5,99</span>
            </span>
          </label>
        </div>
      </div>

      <div className='flex justify-end'>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type='submit'
          className='bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center'
        >
          <span>Continuar al pago</span>
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
        </motion.button>
      </div>
    </form>
  );
};

export default AddressForm;
