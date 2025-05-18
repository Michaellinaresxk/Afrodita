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
  // Estados para manejar la carga de datos
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Para manejo de rutas
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  // Estado de montaje para evitar problemas de hidratación
  const [isMounted, setIsMounted] = useState(false);

  // Efecto para manejar la hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Cargar datos del producto
  useEffect(() => {
    if (!isMounted) return;
    if (!productId) return;

    async function loadProductData() {
      try {
        setLoading(true);
        console.log('Cargando producto con ID:', productId);

        // @ts-ignore
        const productData = await productsService.getProductById(productId);

        if (!productData) {
          // @ts-ignore
          setError('Producto no encontrado');
          setLoading(false);
          return;
        }

        console.log('Producto cargado:', productData);
        // @ts-ignore
        setProduct(productData);

        // Cargar productos relacionados
        try {
          const allProducts = await productsService.getAllProducts();
          const related = allProducts
            .filter((p) => p.id !== productId)
            .slice(0, 4);
          // @ts-ignore
          setRelatedProducts(related);
        } catch (relatedErr) {
          console.error('Error al cargar productos relacionados:', relatedErr);
          // No establecemos error general, solo fallaron los productos relacionados
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

  // Si aún no está montado, mostrar un spinner básico
  if (!isMounted) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500'></div>
      </div>
    );
  }

  // Estado de carga
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4'></div>
          <p className='text-neutral-600'>Cargando producto...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error || !product) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='text-center p-8 max-w-md'>
          <div className='text-red-500 mb-4'>
            <svg
              className='w-12 h-12 mx-auto'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>
            {error || 'Producto no encontrado'}
          </h2>
          <p className='text-gray-600 mb-6'>
            Lo sentimos, no pudimos encontrar el producto que estás buscando.
          </p>
          <button
            onClick={() => router.push('/products')}
            className='px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors'
          >
            Ver todos los productos
          </button>
        </div>
      </div>
    );
  }

  // Producto cargado correctamente
  return (
    <>
      <WhatsAppButton />

      {/* Migas de pan */}
      {product && <Breadcrumb product={product} />}

      {/* Sección principal del producto */}
      <section className='py-12 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Columna izquierda - Galería de imágenes */}
            <div className='lg:sticky lg:top-32 self-start'>
              <ProductGallery product={product} />
            </div>

            {/* Columna derecha - Información del producto */}
            <div>
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs con información detallada */}
      <ProductTabs product={product} />

      {/* Productos relacionados */}
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </>
  );
}
