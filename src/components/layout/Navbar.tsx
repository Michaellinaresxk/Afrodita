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
  // @ts-ignore
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Inicio', href: '/' },
    { title: 'Productos', href: '/products' },
    { title: 'Sobre Nosotros', href: '/about' },
    { title: 'Contacto', href: '/contact' },
  ];

  // ── Animation variants ──
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
    closed: { opacity: 0, y: -5, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const logoVariants = {
    initial: { opacity: 0, x: -10 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // ══════════════════════════════════════════════════════
  // KEY FIX: Color logic inverted for light backgrounds
  // ══════════════════════════════════════════════════════
  //
  // NOT scrolled (top) → transparent bg, DARK text (cream bg is light)
  // Scrolled           → white bg with blur, DARK text (same)

  const navbarClasses = scrolled
    ? 'py-3 bg-white/90 backdrop-blur-md shadow-lg'
    : 'py-5 bg-transparent';

  // Both states now use dark text since backgrounds are always light
  const logoColor = 'text-[#2C3E2D]';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${navbarClasses}`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <motion.div
            initial='initial'
            animate='animate'
            variants={logoVariants}
          >
            <Link href='/' className='flex items-center'>
              <span
                className={`font-serif text-2xl font-bold ${logoColor} transition-colors duration-300`}
              >
                Afrodita<span className='text-[#5C7A56]'>.</span>
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
                        isActive
                          ? 'text-[#5C7A56] font-medium'
                          : scrolled
                            ? 'text-[#5E6B5A] hover:text-[#5C7A56]'
                            : 'text-[#2C3E2D]/80 hover:text-[#2C3E2D]'
                      }
                      transition-colors duration-300 font-medium group
                    `}
                  >
                    {link.title}

                    {/* Active underline indicator */}
                    {isActive ? (
                      <motion.span
                        layoutId='activeIndicator'
                        className='absolute bottom-0 left-0 right-0 h-0.5 mx-2 bg-[#5C7A56]'
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    ) : (
                      <span className='absolute bottom-0 left-0 right-0 h-0.5 mx-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center bg-[#5C7A56]/30' />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop Cart Button */}
          <div className='hidden md:flex items-center space-x-3'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className='relative'
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className={`p-3 rounded-full transition-all ${
                  scrolled
                    ? 'text-[#5E6B5A] hover:text-[#5C7A56] hover:bg-[#C4D7A4]/15'
                    : 'text-[#2C3E2D]/70 hover:text-[#2C3E2D] hover:bg-[#2C3E2D]/5'
                }`}
                aria-label='Carrito de compras'
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
                    d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                  />
                </svg>

                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className='absolute -top-1 -right-1 bg-[#5C7A56] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium'
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile: Cart + Menu toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className='md:hidden flex items-center space-x-2'
          >
            {/* Mobile Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className={`p-2 relative rounded-full transition-colors ${
                scrolled
                  ? 'text-[#5E6B5A] hover:text-[#5C7A56]'
                  : 'text-[#2C3E2D]/70 hover:text-[#2C3E2D]'
              }`}
              aria-label='Carrito de compras'
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
                  d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                />
              </svg>

              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className='absolute -top-1 -right-1 bg-[#5C7A56] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium'
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-3 rounded-lg transition-all ${
                scrolled
                  ? 'text-[#5E6B5A] hover:text-[#5C7A56] hover:bg-[#F5F0E8]'
                  : 'text-[#2C3E2D]/70 hover:text-[#2C3E2D] hover:bg-[#2C3E2D]/5'
              }`}
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
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'
                      />
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
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M4 6h16M4 12h16m-7 6h7'
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial='closed'
            animate='open'
            exit='closed'
            className='md:hidden overflow-hidden'
          >
            <div className='px-4 py-3 space-y-1 shadow-lg bg-white/95 backdrop-blur-md border-t border-[#E8E3DA]'>
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
                          isActive
                            ? 'bg-[#C4D7A4]/15 text-[#5C7A56] border-l-4 border-[#5C7A56]'
                            : 'text-[#5E6B5A] hover:text-[#5C7A56] hover:bg-[#C4D7A4]/10 hover:border-l-4 hover:border-[#5C7A56]/30'
                        }
                      `}
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile CTA */}
              <motion.div
                variants={itemVariants}
                className='pt-3 mt-3 border-t border-[#E8E3DA]'
              >
                <button className='w-full py-3 px-4 rounded-xl text-sm font-medium text-center transition-all bg-[#5C7A56] text-white hover:bg-[#4A6845]'>
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
