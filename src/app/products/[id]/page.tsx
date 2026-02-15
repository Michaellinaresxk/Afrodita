'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { productsService } from '@/lib/hygraph/productsService';
import Breadcrumb from '@/components/products/Breadcrumb';
import ProductGallery from '@/components/products/ProductGallery';
import ProductTabs from '@/components/products/ProductTabs';
import ProductInfo from '@/components/products/ProductInfo';
import RelatedProducts from '@/components/products/RelatedProducts';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !productId) return;

    async function loadProductData() {
      try {
        setLoading(true);

        // @ts-ignore
        const productData = await productsService.getProductById(productId);

        if (!productData) {
          // @ts-ignore
          setError('Producto no encontrado');
          setLoading(false);
          return;
        }

        // @ts-ignore
        setProduct(productData);

        try {
          const allProducts = await productsService.getAllProducts();
          const related = allProducts
            .filter((p) => p.id !== productId)
            .slice(0, 4);
          // @ts-ignore
          setRelatedProducts(related);
        } catch (relatedErr) {
          console.error('Error al cargar productos relacionados:', relatedErr);
        }
      } catch (err) {
        console.error('Error al cargar el producto:', err);
        // @ts-ignore
        setError('Error al cargar el detalle del producto');
      } finally {
        setLoading(false);
      }
    }

    loadProductData();
  }, [productId, isMounted]);

  // ── Pre-mount spinner ──
  if (!isMounted) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#FBF9F5]'>
        <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#5C7A56]' />
      </div>
    );
  }

  // ── Loading ──
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#FBF9F5]'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#5C7A56] mx-auto mb-4' />
          <p className='text-[#5E6B5A] text-sm'>Cargando producto...</p>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error || !product) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#FBF9F5]'>
        <div className='text-center p-8 max-w-md'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-400 mb-6'>
            <svg
              className='w-8 h-8'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-serif font-bold text-[#2C3E2D] mb-3'>
            {error || 'Producto no encontrado'}
          </h2>
          <p className='text-[#5E6B5A] mb-8 leading-relaxed'>
            Lo sentimos, no pudimos encontrar el producto que estás buscando.
          </p>
          <button
            onClick={() => router.push('/products')}
            className='inline-flex items-center gap-2 px-7 py-3.5 bg-[#5C7A56] hover:bg-[#4A6845] text-white rounded-full transition-all duration-300 font-medium text-sm shadow-[0_4px_20px_rgba(92,122,86,0.25)] hover:shadow-[0_6px_28px_rgba(92,122,86,0.35)]'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            Ver todos los productos
          </button>
        </div>
      </div>
    );
  }

  // ── Product loaded ──
  return (
    <>
      <WhatsAppButton />

      {product && <Breadcrumb product={product} />}

      {/* Main product section */}
      <section className='py-12 bg-[#FBF9F5]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <div className='lg:sticky lg:top-32 self-start'>
              <ProductGallery product={product} />
            </div>

            <div>
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <ProductTabs product={product} />

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </>
  );
}
