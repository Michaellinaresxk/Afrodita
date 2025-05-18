import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/graphql/types';

interface BreadcrumbProps {
  product: Product;
}

export default function Breadcrumb({ product }: BreadcrumbProps) {
  const router = useRouter();

  // Obtener la categoría del producto de manera segura
  const getCategoryName = () => {
    if (typeof product.category === 'string') {
      return product.category;
    } else if (
      product.category &&
      typeof product.category === 'object' &&
      'name' in product.category
    ) {
      return product.category.name;
    }
    return 'Productos';
  };

  const getCategoryId = () => {
    if (typeof product.category === 'string') {
      return product.category;
    } else if (
      product.category &&
      typeof product.category === 'object' &&
      'id' in product.category
    ) {
      return product.category.id;
    } else if (product.categories && product.categories.length > 0) {
      return product.categories[0]; // Usar la primera categoría si existe
    }
    return 'todos';
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const categoryId = getCategoryId();
    router.push(`/products?category=${categoryId}`);
  };

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
            href='/products'
            className='text-neutral-500 hover:text-primary-600 transition-colors'
          >
            Productos
          </Link>
          <span className='mx-2 text-neutral-400'>/</span>
          <a
            href='#'
            onClick={handleCategoryClick}
            className='text-neutral-500 hover:text-primary-600 transition-colors cursor-pointer'
          >
            {getCategoryName()}
          </a>
          <span className='mx-2 text-neutral-400'>/</span>
          <span className='text-primary-600 font-medium'>{product.name}</span>
        </nav>
      </div>
    </div>
  );
}
