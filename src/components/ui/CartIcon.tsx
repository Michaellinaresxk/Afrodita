'use client';

import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

const CartIcon = () => {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className='relative p-2 text-neutral-600 hover:text-primary-600 transition-colors'
      aria-label='Ver carrito'
    >
      <svg
        className='w-6 h-6'
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

      {cartCount > 0 && (
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className='absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'
        >
          {cartCount}
        </motion.span>
      )}
    </button>
  );
};

export default CartIcon;
