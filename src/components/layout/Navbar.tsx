'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Usar el contexto del carrito para obtener el contador y la función para abrir el carrito
  const { cartCount, setIsCartOpen } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Add event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links with active state
  const navLinks = [
    { title: 'Inicio', href: '/' },
    { title: 'Productos', href: '/products' },
    { title: 'Sobre Nosotros', href: '/about' },
    { title: 'Contacto', href: '/contact' },
  ];

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.07,
        delayChildren: 0.05,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const logoVariants = {
    initial: { opacity: 0, x: -10 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Dynamic styling based on scroll position
  const navbarClasses = scrolled
    ? 'py-3 bg-white/90 backdrop-blur-md shadow-lg'
    : 'py-5 bg-transparent';

  const textColorClass = scrolled ? 'text-gray-800' : 'text-white';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${navbarClasses}`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center'>
          {/* Logo with animation */}
          <motion.div
            initial='initial'
            animate='animate'
            variants={logoVariants}
          >
            <Link href='/' className='flex items-center'>
              <span
                className={`font-serif text-2xl font-bold ${textColorClass} transition-colors duration-300`}
              >
                Afrodita<span className='text-emerald-500'>.</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex space-x-1'>
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1, duration: 0.3 },
                  }}
                >
                  <Link
                    href={link.href}
                    className={`
                      relative px-4 py-2 rounded-full mx-1
                      ${
                        scrolled
                          ? isActive
                            ? 'text-emerald-600 font-medium'
                            : 'text-gray-600 hover:text-emerald-600'
                          : isActive
                          ? 'text-white font-medium'
                          : 'text-white/90 hover:text-white'
                      }
                      transition-colors duration-300 font-medium group
                    `}
                  >
                    {link.title}

                    {/* Animated underline indicator for active link */}
                    {isActive ? (
                      <motion.span
                        layoutId='activeIndicator'
                        className={`absolute bottom-0 left-0 right-0 h-0.5 mx-2 ${
                          scrolled ? 'bg-emerald-500' : 'bg-white'
                        }`}
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    ) : (
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-0.5 mx-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center ${
                          scrolled ? 'bg-emerald-500/40' : 'bg-white/40'
                        }`}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop Action Buttons */}
          <div className='hidden md:flex items-center space-x-3'>
            {/* Cart Button with Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className='relative'
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)} // Abre el SideCart al hacer clic
                className={`p-3 rounded-full ${
                  scrolled
                    ? 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/80'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                } transition-all`}
                aria-label='Carrito de compras'
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
                    d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                  ></path>
                </svg>

                {/* Cart count badge */}
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className='absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium'
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>

            {/* Login/Account Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`py-2 px-5 rounded-full text-sm font-medium ${
                  scrolled
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-emerald-500/20'
                    : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20'
                } transition-all duration-300`}
              >
                Mi Cuenta
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className='md:hidden flex items-center space-x-2'
          >
            {/* Mobile Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)} // Abre el SideCart en móvil también
              className={`p-2 relative rounded-full ${
                scrolled
                  ? 'text-gray-600 hover:text-emerald-600'
                  : 'text-white/90 hover:text-white'
              } transition-colors`}
              aria-label='Carrito de compras'
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
                  d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                ></path>
              </svg>

              {/* Mobile Cart Badge */}
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className='absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium'
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-3 rounded-lg ${
                scrolled
                  ? 'text-gray-600 hover:text-emerald-600 hover:bg-gray-100'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              } transition-all`}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
            >
              <div className='relative w-5 h-5'>
                <AnimatePresence mode='wait'>
                  {isOpen ? (
                    <motion.svg
                      key='close'
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                      className='w-5 h-5 absolute'
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
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key='menu'
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.3 }}
                      className='w-5 h-5 absolute'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M4 6h16M4 12h16m-7 6h7'
                      ></path>
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu with animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial='closed'
            animate='open'
            exit='closed'
            className='md:hidden overflow-hidden'
          >
            <div
              className={`px-4 py-3 space-y-1 shadow-lg ${
                scrolled
                  ? 'bg-white border-t border-gray-100'
                  : 'bg-gray-900/95 backdrop-blur-md'
              }`}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.title} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        block px-4 py-3 rounded-xl text-base font-medium transition-all
                        ${
                          scrolled
                            ? isActive
                              ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500'
                              : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 hover:border-l-4 hover:border-emerald-500/40'
                            : isActive
                            ? 'bg-white/10 text-white border-l-4 border-white'
                            : 'text-white/80 hover:text-white hover:bg-white/5 hover:border-l-4 hover:border-white/40'
                        }
                      `}
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile Account Button */}
              <motion.div
                variants={itemVariants}
                className='pt-3 mt-3 border-t border-gray-200/20'
              >
                <button
                  className={`w-full py-3 px-4 rounded-xl text-sm font-medium text-center transition-all ${
                    scrolled
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Mi Cuenta
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
