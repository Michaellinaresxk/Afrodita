import Link from 'next/link';
// @ts-expect-error Ignorar tipado implícito por compatibilidad
export default function Breadcrumb({ product }) {
  return (
    <div className='bg-neutral-50 py-3 border-b border-neutral-200'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <nav className='flex text-sm'>
          <Link
            href='/'
            className='text-neutral-500 hover:text-primary-600 transition-colors'
          >
            Inicio
          </Link>
          <span className='mx-2 text-neutral-400'>/</span>
          <Link
            href='/productos'
            className='text-neutral-500 hover:text-primary-600 transition-colors'
          >
            Productos
          </Link>
          <span className='mx-2 text-neutral-400'>/</span>
          <span className='text-primary-600 font-medium'>{product.name}</span>
        </nav>
      </div>
    </div>
  );
}
