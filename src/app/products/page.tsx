'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { useCategories } from '@/hooks/useHygraphData';
import { Product } from '@/lib/graphql/types';
import { productsService } from '@/lib/hygraph/productsService';
import PageBanner from '@/components/layout/PageBanner';

const ProductsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
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

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError(null);
        const productData =
          activeCategory === 'todos'
            ? await productsService.getAllProducts()
            : await productsService.getProductsByCategory(activeCategory);
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

  useEffect(() => {
    if (categoryFromUrl) setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    if (activeCategory === 'todos') {
      router.push('/products');
    } else {
      router.push(`/products?category=${activeCategory}`);
    }
  }, [activeCategory, router]);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const header = headerRef.current as HTMLElement;
        setIsSticky(window.scrollY > header.offsetTop);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!products || products.length === 0) return;

    let result = [...products];

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
      default:
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(result);
  }, [sortBy, searchQuery, products]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
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

  const handleCategoryClick = (categoryId: string) =>
    setActiveCategory(categoryId);

  // ── Shared pill classes ──
  const pillActive = 'bg-[#5C7A56] text-white font-medium shadow-sm';
  const pillInactive = 'bg-[#F5F0E8] text-[#5E6B5A] hover:bg-[#EDE7DB]';

  return (
    <>
      <WhatsAppButton />

      <PageBanner
        title='Descubre Nuestra Colección'
        description='Jabones artesanales elaborados con ingredientes 100% naturales y técnicas tradicionales para el cuidado completo y sublime de tu piel.'
        imageSrc='/img/productos/jabon-6.jpg'
        imageAlt='Colección de jabones naturales'
      />

      {/* ── Filter bar ── */}
      <div
        ref={headerRef}
        className={`bg-white py-4 border-b border-[#E8E3DA] z-30 transition-all duration-300 ${
          isSticky ? 'fixed top-0 left-0 right-0 shadow-md' : ''
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row justify-between gap-4'>
            <div className='flex items-center'>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className='md:hidden flex items-center mr-4 text-[#5C7A56] font-medium text-sm'
              >
                <svg
                  className='w-5 h-5 mr-1'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                  />
                </svg>
                {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
              </button>

              <div className='hidden md:flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-hide'>
                {!categoriesLoading &&
                  categories.map((category) => (
                    <button
                      key={`cat-btn-${category.id}`}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${activeCategory === category.id ? pillActive : pillInactive}`}
                    >
                      {category.name}
                    </button>
                  ))}
              </div>
            </div>

            <div className='flex items-center'>
              <div className='relative flex-1'>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Buscar productos...'
                  className='w-full pl-10 pr-4 py-2 border border-[#E8E3DA] rounded-full text-[#2C3E2D] placeholder:text-[#5E6B5A]/50 focus:outline-none focus:ring-2 focus:ring-[#5C7A56]/25 focus:border-[#5C7A56]/40 bg-white text-sm'
                />
                <svg
                  className='w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5E6B5A]/40'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className='pl-4 pr-8 py-2 border border-[#E8E3DA] rounded-full text-[#2C3E2D] focus:outline-none focus:ring-2 focus:ring-[#5C7A56]/25 focus:border-[#5C7A56]/40 bg-white appearance-none cursor-pointer text-sm'
                >
                  <option value='popular'>Más populares</option>
                  <option value='newest'>Más nuevos</option>
                  <option value='price-low'>Precio: menor a mayor</option>
                  <option value='price-high'>Precio: mayor a menor</option>
                </select>
              </div>
            </div>
          </div>

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
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${activeCategory === 'todos' ? pillActive : pillInactive}`}
                  >
                    Todos
                  </button>
                  {!categoriesLoading &&
                    categories.map((category) => (
                      <button
                        key={`mobile-cat-${category.id}`}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${activeCategory === category.id ? pillActive : pillInactive}`}
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

      {/* ── Products section ── */}
      <div ref={productsSectionRef} className='bg-[#FAFAF7] py-12 min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-wrap items-center justify-between mb-8'>
            <div>
              <h2 className='text-2xl font-serif font-bold text-[#2C3E2D]'>
                Nuestros Jabones Artesanales
              </h2>
              {!loading && !error && (
                <p className='text-[#5E6B5A] text-sm mt-1'>
                  Mostrando {filteredProducts.length} de {products?.length || 0}{' '}
                  productos
                </p>
              )}
            </div>
            {!loading && !error && activeCategory !== 'todos' && (
              <div className='flex items-center mt-2 md:mt-0'>
                <span className='text-sm text-[#6B7B66] mr-2'>Filtros:</span>
                <div className='bg-[#C4D7A4]/20 text-[#2C3E2D] text-sm px-3 py-1 rounded-full flex items-center border border-[#C4D7A4]/30'>
                  {categories.find((c) => c.id === activeCategory)?.name ||
                    activeCategory}
                  <button
                    onClick={() => handleCategoryClick('todos')}
                    className='ml-1.5 text-[#5C7A56] hover:text-[#2C3E2D]'
                  >
                    <svg
                      className='w-3.5 h-3.5'
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
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <div className='flex flex-col justify-center items-center py-20'>
              <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#5C7A56] mb-4' />
              <p className='text-[#5E6B5A] text-sm'>Cargando productos...</p>
            </div>
          ) : error ? (
            <div className='bg-white rounded-2xl shadow-sm p-12 text-center border border-[#E8E3DA]'>
              <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-red-400 mb-5'>
                <svg
                  className='w-7 h-7'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-serif font-bold text-[#2C3E2D] mb-2'>
                Error al cargar productos
              </h3>
              <p className='text-[#5E6B5A] mb-6 text-sm'>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-[#5C7A56] hover:bg-[#4A6845] transition-colors shadow-sm'
              >
                Intentar de nuevo
              </button>
            </div>
          ) : filteredProducts.length > 0 ? (
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
            <div className='bg-white rounded-2xl shadow-sm p-12 text-center border border-[#E8E3DA]'>
              <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F5F0E8] text-[#5E6B5A] mb-5'>
                <svg
                  className='w-7 h-7'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-serif font-bold text-[#2C3E2D] mb-2'>
                No se encontraron productos
              </h3>
              <p className='text-[#5E6B5A] mb-6 text-sm'>
                No hay productos que coincidan con tus criterios de búsqueda.
              </p>
              <button
                onClick={() => {
                  handleCategoryClick('todos');
                  setSearchQuery('');
                }}
                className='inline-flex items-center gap-2 text-[#5C7A56] hover:text-[#4A6845] font-medium text-sm'
              >
                Restablecer filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
