'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { categories, luxuryProducts, sortOptions } from '@/constants/products';
import ProductCard from '@/components/products/ProductCard';

const ProductsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [products, setProducts] = useState(luxuryProducts);
  const [filteredProducts, setFilteredProducts] = useState(luxuryProducts);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSticky, setIsSticky] = useState(false);

  const headerRef = useRef(null);
  const productsSectionRef = useRef(null);
  const isInView = useInView(productsSectionRef, { once: true, amount: 0.1 });

  // Efecto para filtrar y ordenar productos
  useEffect(() => {
    let result = [...luxuryProducts];

    // Filtrar por categoría
    if (activeCategory !== 'todos') {
      result = result.filter(
        (product) => product.category.toLowerCase() === activeCategory
      );
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(query)
          )
      );
    }

    // Ordenar productos
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(result);
  }, [activeCategory, sortBy, searchQuery]);

  // Variantes de animación para Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      {/* Header con imagen de fondo */}
      <div className='relative h-80 bg-primary-900 overflow-hidden'>
        <Image
          src='/img/productos/jabon-6.jpg'
          alt='Colección de jabones naturales'
          fill
          style={{ objectFit: 'cover' }}
          priority
          quality={90}
          className='opacity-70'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-primary-900/60 to-primary-800/70'></div>

        <div className='relative h-full flex items-center justify-center text-center z-10'>
          <div className='max-w-3xl px-4'>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className='font-serif text-4xl md:text-5xl text-white font-bold mb-4'
            >
              Descubre Nuestra Colección
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className='text-white/90 text-lg max-w-2xl mx-auto'
            >
              Jabones artesanales elaborados con ingredientes 100% naturales y
              técnicas tradicionales para el cuidado completo y sublime de tu
              piel.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Barra de filtros y búsqueda */}
      <div
        ref={headerRef}
        className={`bg-white py-4 border-b border-neutral-200 z-30 transition-all duration-300 ${
          isSticky ? 'fixed top-0 left-0 right-0 shadow-md' : ''
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row justify-between gap-4'>
            <div className='flex items-center'>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className='md:hidden flex items-center mr-4 text-primary-700'
              >
                <svg
                  className='w-5 h-5 mr-1'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                  ></path>
                </svg>
                {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
              </button>

              <div className='hidden md:flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-hide'>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'bg-primary-600 text-white font-medium'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    } transition-colors`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='relative flex-grow max-w-xs'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg
                    className='h-5 w-5 text-neutral-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    ></path>
                  </svg>
                </div>
                <input
                  type='text'
                  placeholder='Buscar productos...'
                  className='pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-400'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className='flex-shrink-0'>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className='bg-white border border-neutral-300 text-neutral-700 py-2 pl-3 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm'
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Filtros móviles */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='md:hidden overflow-hidden'
              >
                <div className='pt-4 pb-2 flex flex-wrap gap-2'>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        activeCategory === category.id
                          ? 'bg-primary-600 text-white font-medium'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      } transition-colors`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sección principal de productos */}
      <div
        ref={productsSectionRef}
        className='bg-neutral-50 py-12 min-h-screen'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Resultados e información */}
          <div className='flex flex-wrap items-center justify-between mb-8'>
            <div>
              <h2 className='text-2xl font-serif font-bold text-primary-900'>
                Nuestros Jabones Artesanales
              </h2>
              <p className='text-neutral-600'>
                Mostrando {filteredProducts.length} de {luxuryProducts.length}{' '}
                productos
              </p>
            </div>

            {/* Tags de filtros activos */}
            {activeCategory !== 'todos' && (
              <div className='flex items-center mt-2 md:mt-0'>
                <span className='text-sm text-neutral-500 mr-2'>Filtros:</span>
                <div className='flex flex-wrap gap-2'>
                  <div className='bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full flex items-center'>
                    {categories.find((c) => c.id === activeCategory)?.name}
                    <button
                      onClick={() => setActiveCategory('todos')}
                      className='ml-1 text-primary-600 hover:text-primary-800'
                    >
                      <svg
                        className='w-4 h-4'
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
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Grid de productos */}
          {filteredProducts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8'
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variants={cardVariants}
                />
              ))}
            </motion.div>
          ) : (
            <div className='bg-white rounded-xl shadow-md p-12 text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 mb-6'>
                <svg
                  className='w-8 h-8'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
              </div>
              <h3 className='text-xl font-medium text-neutral-800 mb-2'>
                No se encontraron productos
              </h3>
              <p className='text-neutral-600 mb-6'>
                No hay productos que coincidan con tus criterios de búsqueda.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('todos');
                  setSearchQuery('');
                }}
                className='inline-flex items-center text-primary-600 hover:text-primary-800 font-medium'
              >
                <svg
                  className='w-5 h-5 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                  ></path>
                </svg>
                Restablecer filtros
              </button>
            </div>
          )}

          {/* Paginación (simulada) */}
          {/* {filteredProducts.length > 0 && (
            <div className='mt-12 flex justify-center'>
              <nav
                className='inline-flex rounded-md shadow-sm -space-x-px'
                aria-label='Pagination'
              >
                <a
                  href='#'
                  className='relative inline-flex items-center px-3 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50'
                >
                  <span className='sr-only'>Anterior</span>
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
                      d='M15 19l-7-7 7-7'
                    ></path>
                  </svg>
                </a>
                <a
                  href='#'
                  aria-current='page'
                  className='relative inline-flex items-center px-4 py-2 border border-primary-500 bg-primary-50 text-sm font-medium text-primary-600'
                >
                  1
                </a>
                <a
                  href='#'
                  className='relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50'
                >
                  2
                </a>
                <a
                  href='#'
                  className='relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50'
                >
                  3
                </a>
                <a
                  href='#'
                  className='relative inline-flex items-center px-3 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50'
                >
                  <span className='sr-only'>Siguiente</span>
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
                      d='M9 5l7 7-7 7'
                    ></path>
                  </svg>
                </a>
              </nav>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
