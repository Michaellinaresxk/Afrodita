'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // debugin
  const isThisCardHovered = () => {
    setCartCount(cartCount);
  };

  console.log(isThisCardHovered);

  // Enlaces de navegación con su estado activo
  const navLinks = [
    { title: 'Inicio', href: '/' },
    { title: 'Productos', href: '/products' },
    { title: 'Sobre Nosotros', href: '/about' },
    // { title: 'Blog', href: '/blog' },
    { title: 'Contacto', href: '/contact' },
  ];

  // Animaciones para el menú móvil
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.4,
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

  // Variante para el logo
  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Cambios en el navbar al hacer scroll
  const navbarClasses = scrolled
    ? 'py-3 bg-white/90 backdrop-blur-md shadow-lg'
    : 'py-5 bg-transparent';

  const navbarBgColor = scrolled ? 'text-primary-800' : 'text-white';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${navbarClasses}`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center'>
          {/* Logo con animación */}
          <motion.div
            initial='initial'
            animate='animate'
            variants={logoVariants}
          >
            <Link href='/' className='flex items-center'>
              <div className='relative h-10 w-10 mr-2'>
                <Image
                  src='/img/logo.png' // Reemplazar con el logo real
                  alt='Afrodita'
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span
                className={`font-serif text-2xl font-bold ${navbarBgColor} transition-colors duration-300`}
              >
                Afrodita<span className='text-secondary-500'>-</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation con animación en hover y active */}
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
                            ? 'text-primary-600 font-medium'
                            : 'text-neutral-600 hover:text-primary-600'
                          : isActive
                          ? 'text-white font-medium'
                          : 'text-white/90 hover:text-white'
                      }
                      transition-colors duration-300 font-medium
                    `}
                  >
                    {link.title}
                    {isActive && (
                      <motion.span
                        layoutId='activeIndicator'
                        className={`absolute bottom-0 left-0 right-0 h-0.5 mx-2 ${
                          scrolled ? 'bg-primary-500' : 'bg-white'
                        }`}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Botones de Acción (Desktop) */}
          <div className='hidden md:flex items-center space-x-2'>
            {/* Botón Carrito con Animación */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className='relative'
            >
              <button
                className={`p-2 rounded-full ${
                  scrolled
                    ? 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
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
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className='absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </motion.div>

            {/* Botón de Usuario */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* <Link
                href='/cuenta'
                className={`py-2 px-4 rounded-full text-sm font-medium ${
                  scrolled
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20'
                } transition-colors duration-300`}
              >
                Mi Cuenta
              </Link> */}
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className='md:hidden flex items-center'
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${
                scrolled
                  ? 'text-neutral-600 hover:text-primary-600'
                  : 'text-white/90 hover:text-white'
              } transition-colors`}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <div className='relative w-6 h-6'>
                <AnimatePresence mode='wait'>
                  {isOpen ? (
                    <motion.svg
                      key='close'
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                      className='w-6 h-6 absolute'
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
                      className='w-6 h-6 absolute'
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
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu con animaciones */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial='closed'
            animate='open'
            exit='closed'
            className='md:hidden'
          >
            <div
              className={`px-4 py-2 space-y-1 ${
                scrolled ? 'bg-white' : 'bg-primary-900/95 backdrop-blur-md'
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
                        block px-4 py-3 rounded-lg text-base font-medium 
                        ${
                          scrolled
                            ? isActive
                              ? 'bg-primary-50 text-primary-600'
                              : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50/50'
                            : isActive
                            ? 'bg-white/10 text-white'
                            : 'text-white/80 hover:text-white hover:bg-white/5'
                        }
                        transition-colors
                      `}
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile Cart & Account */}
              <motion.div
                variants={itemVariants}
                className='pt-2 mt-2 border-t border-primary-200/20'
              >
                <div className='flex items-center space-x-2 px-4 py-3'>
                  <button
                    className={`p-2 rounded-full ${
                      scrolled
                        ? 'text-neutral-500 hover:text-primary-600 hover:bg-primary-50'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    } transition-colors`}
                  >
                    <svg
                      className='h-5 w-5'
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
                  </button>
                  <span
                    className={`${
                      scrolled ? 'text-neutral-600' : 'text-white/80'
                    } transition-colors`}
                  >
                    Carrito
                  </span>
                  {cartCount > 0 && (
                    <span className='ml-auto bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                      {cartCount}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
