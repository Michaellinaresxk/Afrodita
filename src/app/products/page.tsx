import { Suspense } from 'react';
import ProductsContent from './ProductContent';

function ProductsLoading() {
  return (
    <div className='min-h-screen bg-[#FBF9F5] flex items-center justify-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5C7A56] mb-4 mx-auto'></div>
        <p className='text-[#5C7A56]'>Cargando productos...</p>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent />
    </Suspense>
  );
}
