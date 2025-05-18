// app/products/page.tsx - versión corregida y completa
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { useCategories } from '@/hooks/useHygraphData';
import { Product } from '@/lib/graphql/types';
import { productsService } from '@/lib/hygraph/productsService';

const ProductsPage = () => {
  const router = useRouter();

  // Obtener parámetros de búsqueda de la URL
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  // Estado local para productos y filtrado
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  // Estado local para filtrado y ordenamiento
  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl || 'todos'
  );
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Obtenemos categorías usando nuestro hook personalizado
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  // Cargar productos directamente usando productsService
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError(null);

        console.log(`Cargando productos con categoría: ${activeCategory}`);
        let productData: Product[];

        if (activeCategory === 'todos') {
          productData = await productsService.getAllProducts();
        } else {
          productData = await productsService.getProductsByCategory(
            activeCategory
          );
        }

        console.log(`Cargados ${productData.length} productos`);
        setProducts(productData);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setProductsError('No se pudieron cargar los productos');
      } finally {
        setProductsLoading(false);
      }
    };

    loadProducts();
  }, [activeCategory]);

  // Combinamos los estados de carga y error
  const loading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

  const headerRef = useRef(null);
  const productsSectionRef = useRef(null);
  const isInView = useInView(productsSectionRef, { once: true, amount: 0.1 });

  // Efecto para inicializar la categoría desde la URL
  useEffect(() => {
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
      console.log(`Categoría establecida desde URL: ${categoryFromUrl}`);
    }
  }, [categoryFromUrl]);

  // Efecto para actualizar la URL cuando cambia la categoría
  useEffect(() => {
    if (activeCategory === 'todos') {
      router.push('/products');
    } else {
      router.push(`/products?category=${activeCategory}`);
    }
  }, [activeCategory, router]);

  // Efecto para gestionar scroll y filtros sticky
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const header = headerRef.current as HTMLElement;
        const headerOffset = header.offsetTop;
        setIsSticky(window.scrollY > headerOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Efecto para filtrar y ordenar productos
  useEffect(() => {
    if (!products || products.length === 0) return;

    console.log(
      `Filtrando productos: búsqueda=${searchQuery}, orden=${sortBy}`
    );

    let result = [...products];

    // Filtrar por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (Array.isArray(product.ingredients) &&
            product.ingredients.some(
              (ingredient) =>
                typeof ingredient === 'string' &&
                ingredient.toLowerCase().includes(query)
            ))
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

    console.log(`Productos filtrados: ${result.length} encontrados`);
    setFilteredProducts(result);
  }, [sortBy, searchQuery, products]);

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

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    console.log(`Cambiando a categoría: ${categoryId}`);
  };

  return (
    <>
      <WhatsAppButton />
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
                <button
                  onClick={() => handleCategoryClick('todos')}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    activeCategory === 'todos'
                      ? 'bg-primary-600 text-white font-medium'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  } transition-colors`}
                >
                  Todos los productos
                </button>

                {!categoriesLoading &&
                  categories.map((category) => (
                    <button
                      key={`cat-btn-${category.id}`}
                      onClick={() => handleCategoryClick(category.id)}
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

            {/* Input de búsqueda */}
            <div className='flex items-center'>
              <div className='relative flex-1'>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Buscar productos...'
                  className='w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-full text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                />
                <svg
                  className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400'
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

              {/* Selector de orden */}
              <div className='ml-4'>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className='pl-4 pr-8 py-2 border border-neutral-300 rounded-full text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white appearance-none cursor-pointer'
                >
                  <option value='popular'>Más populares</option>
                  <option value='newest'>Más nuevos</option>
                  <option value='price-low'>Precio: menor a mayor</option>
                  <option value='price-high'>Precio: mayor a menor</option>
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
                  <button
                    onClick={() => handleCategoryClick('todos')}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeCategory === 'todos'
                        ? 'bg-primary-600 text-white font-medium'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    } transition-colors`}
                  >
                    Todos
                  </button>

                  {!categoriesLoading &&
                    categories.map((category) => (
                      <button
                        key={`mobile-cat-${category.id}`}
                        onClick={() => handleCategoryClick(category.id)}
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
              {!loading && !error && (
                <p className='text-neutral-600'>
                  Mostrando {filteredProducts.length} de {products?.length || 0}{' '}
                  productos
                </p>
              )}
            </div>

            {/* Tags de filtros activos */}
            {!loading && !error && activeCategory !== 'todos' && (
              <div className='flex items-center mt-2 md:mt-0'>
                <span className='text-sm text-neutral-500 mr-2'>Filtros:</span>
                <div className='flex flex-wrap gap-2'>
                  <div className='bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full flex items-center'>
                    {categories.find((c) => c.id === activeCategory)?.name ||
                      activeCategory}
                    <button
                      onClick={() => handleCategoryClick('todos')}
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

          {/* Estado de carga */}
          {loading ? (
            <div className='flex flex-col justify-center items-center py-20'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4'></div>
              <p className='text-neutral-600'>Cargando productos...</p>
            </div>
          ) : error ? (
            <div className='bg-white rounded-xl shadow-md p-12 text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-6'>
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
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  ></path>
                </svg>
              </div>
              <h3 className='text-xl font-medium text-neutral-800 mb-2'>
                Error al cargar productos
              </h3>
              <p className='text-neutral-600 mb-6'>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
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
                Intentar de nuevo
              </button>
            </div>
          ) : (
            <>
              {/* Grid de productos */}
              {filteredProducts.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial='hidden'
                  animate={isInView ? 'visible' : 'hidden'}
                  className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8'
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={`product-grid-${product.id}`}
                      variants={cardVariants}
                    >
                      <ProductCard product={product} variants={undefined} />
                    </motion.div>
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
                    No hay productos que coincidan con tus criterios de
                    búsqueda.
                  </p>
                  <button
                    onClick={() => {
                      handleCategoryClick('todos');
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
