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

const ProductsContent = () => {
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
    categoryFromUrl || 'todos',
  );
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

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
          productData =
            await productsService.getProductsByCategory(activeCategory);
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
      `Filtrando productos: búsqueda=${searchQuery}, orden=${sortBy}`,
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
                ingredient.toLowerCase().includes(query),
            )),
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
        break;
    }

    setFilteredProducts(result);
  }, [products, searchQuery, sortBy]);

  const handleCategoryClick = (categorySlug: string) => {
    setActiveCategory(categorySlug);
  };

  return (
    <>
      <WhatsAppButton />

      {/* Header de la página */}
      <div className='bg-[#FBF9F5] pt-24 pb-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center'
          >
            <h1 className='text-4xl md:text-5xl font-bold text-[#2C3E2D] mb-4'>
              Nuestros Productos
            </h1>
            <p className='text-lg text-[#5C7A56] max-w-2xl mx-auto'>
              Descubre nuestra colección de jabones artesanales elaborados con
              ingredientes naturales
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filtros y productos */}
      <div className='bg-[#FBF9F5] min-h-screen pb-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Barra de filtros */}
          <div
            ref={headerRef}
            className={`py-4 ${
              isSticky
                ? 'sticky top-16 z-30 bg-[#FBF9F5]/95 backdrop-blur-sm shadow-sm'
                : ''
            }`}
          >
            {/* Categorías - Desktop */}
            <div className='hidden md:block mb-4'>
              <div className='flex flex-wrap gap-2'>
                <button
                  onClick={() => handleCategoryClick('todos')}
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeCategory === 'todos'
                      ? 'bg-[#5C7A56] text-white font-medium'
                      : 'bg-[#F5F0E8] text-[#2C3E2D] hover:bg-[#E8C4A0]/30'
                  } transition-colors`}
                >
                  Todos
                </button>
                {categories &&
                  categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.slug)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        activeCategory === category.slug
                          ? 'bg-[#5C7A56] text-white font-medium'
                          : 'bg-[#F5F0E8] text-[#2C3E2D] hover:bg-[#E8C4A0]/30'
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
                  className='w-full pl-10 pr-4 py-2 border border-[#A8C5B8] rounded-full text-[#2C3E2D] focus:outline-none focus:ring-2 focus:ring-[#5C7A56] focus:border-transparent bg-white'
                />
                <svg
                  className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A8C5B8]'
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
                  className='pl-4 pr-8 py-2 border border-[#A8C5B8] rounded-full text-[#2C3E2D] focus:outline-none focus:ring-2 focus:ring-[#5C7A56] focus:border-transparent bg-white appearance-none cursor-pointer'
                >
                  <option value='popular'>Más populares</option>
                  <option value='newest'>Más nuevos</option>
                  <option value='price-low'>Precio: menor a mayor</option>
                  <option value='price-high'>Precio: mayor a menor</option>
                </select>
              </div>

              {/* Botón filtros móvil */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className='ml-2 md:hidden p-2 border border-[#A8C5B8] rounded-full text-[#5C7A56]'
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
                    d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                  ></path>
                </svg>
              </button>
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
                        ? 'bg-[#5C7A56] text-white font-medium'
                        : 'bg-[#F5F0E8] text-[#2C3E2D] hover:bg-[#E8C4A0]/30'
                    } transition-colors`}
                  >
                    Todos
                  </button>
                  {categories &&
                    categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.slug)}
                        className={`px-4 py-2 rounded-full text-sm ${
                          activeCategory === category.slug
                            ? 'bg-[#5C7A56] text-white font-medium'
                            : 'bg-[#F5F0E8] text-[#2C3E2D] hover:bg-[#E8C4A0]/30'
                        } transition-colors`}
                      >
                        {category.name}
                      </button>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid de productos */}
          {loading ? (
            <div className='flex justify-center items-center py-20'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5C7A56]'></div>
            </div>
          ) : error ? (
            <div className='text-center py-20'>
              <p className='text-red-500 mb-4'>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className='px-6 py-2 bg-[#5C7A56] text-white rounded-full hover:bg-[#2C3E2D] transition-colors'
              >
                Reintentar
              </button>
            </div>
          ) : (
            <>
              <div ref={productsSectionRef} className='pt-6'>
                <p className='text-sm text-[#5C7A56] mb-6'>
                  {filteredProducts.length}{' '}
                  {filteredProducts.length === 1 ? 'producto' : 'productos'}{' '}
                  encontrados
                </p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5 }}
                  className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {filteredProducts.length === 0 && !loading && (
                <div className='text-center py-20'>
                  <p className='text-[#5C7A56] text-lg mb-4'>
                    No se encontraron productos con los filtros seleccionados.
                  </p>
                  <button
                    onClick={() => {
                      handleCategoryClick('todos');
                      setSearchQuery('');
                    }}
                    className='inline-flex items-center text-[#5C7A56] hover:text-[#2C3E2D] font-medium'
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

export default ProductsContent;
