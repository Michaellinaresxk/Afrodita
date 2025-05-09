import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ReviewStars from './ReviewStars';

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || null
  );
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Beneficios del producto
  const productBenefits = [
    {
      title: '100% Natural',
      description: 'Sin químicos ni fragancias artificiales',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 13l4 4L19 7'
          ></path>
        </svg>
      ),
    },
    {
      title: 'Producción Sostenible',
      description: 'Respetuoso con el medio ambiente',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
          ></path>
        </svg>
      ),
    },
    {
      title: 'Dermatológicamente Testado',
      description: 'Suave con todo tipo de pieles',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
          ></path>
        </svg>
      ),
    },
  ];

  // Incrementar/decrementar cantidad
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Toggle wishlist
  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  return (
    <div>
      {/* Badge de categoría */}
      <div className='mb-4'>
        <span
          className={`inline-block ${product.accent} text-xs font-medium px-3 py-1 rounded-full ${product.bg}`}
        >
          {product.badgeText}
        </span>
      </div>

      {/* Nombre y valoraciones */}
      <h1 className='font-serif text-3xl md:text-4xl font-bold text-primary-900 mb-4'>
        {product.name}
      </h1>

      <div className='flex items-center mb-6'>
        <div className='flex mr-2'>
          <ReviewStars rating={product.rating} size='large' />
        </div>
        <span className='text-neutral-500 text-sm'>
          {product.rating.toFixed(1)} ({product.reviews} valoraciones)
        </span>
        <span className='mx-2 text-neutral-300'>|</span>
        <span
          className={`text-sm ${
            product.stock > 5
              ? 'text-green-600'
              : product.stock > 0
              ? 'text-amber-600'
              : 'text-red-600'
          }`}
        >
          {product.stock > 5
            ? 'En stock'
            : product.stock > 0
            ? `Solo ${product.stock} disponibles`
            : 'Agotado'}
        </span>
      </div>

      {/* Precio */}
      <div className='mb-6'>
        {product.discount > 0 ? (
          <div className='flex items-center'>
            <span className='text-3xl font-bold text-primary-900 mr-3'>
              {(product.price * (1 - product.discount / 100)).toFixed(2)}€
            </span>
            <span className='text-xl text-neutral-500 line-through'>
              {product.price.toFixed(2)}€
            </span>
            <span className='ml-3 bg-rose-100 text-rose-700 text-sm font-medium px-2 py-1 rounded'>
              Ahorra {((product.price * product.discount) / 100).toFixed(2)}€
            </span>
          </div>
        ) : (
          <span className='text-3xl font-bold text-primary-900'>
            {product.price.toFixed(2)}€
          </span>
        )}
      </div>

      {/* Descripción breve */}
      <div className='mb-8'>
        <p className='text-neutral-600 mb-4'>{product.description}</p>
        <div className='space-y-2'>
          {productBenefits.map((benefit, index) => (
            <div key={index} className='flex items-start'>
              <div className='flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3 mt-0.5'>
                {benefit.icon}
              </div>
              <div>
                <span className='block text-primary-800 font-medium'>
                  {benefit.title}
                </span>
                <span className='text-sm text-neutral-500'>
                  {benefit.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Variantes (tamaño, peso, etc.) si existen */}
      {product.variants && product.variants.length > 0 && (
        <div className='mb-8'>
          <h3 className='text-sm font-medium text-neutral-700 mb-3'>Tamaño:</h3>
          <div className='flex flex-wrap gap-3'>
            {product.variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                  selectedVariant === variant
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-neutral-300 text-neutral-700 hover:border-primary-300'
                } transition-colors`}
              >
                {variant.size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selección de cantidad */}
      <div className='mb-8'>
        <h3 className='text-sm font-medium text-neutral-700 mb-3'>Cantidad:</h3>
        <div className='flex items-center w-36 h-12'>
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className='w-12 h-full bg-neutral-100 rounded-l-lg flex items-center justify-center text-neutral-600 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
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
                strokeWidth={2}
                d='M20 12H4'
              />
            </svg>
          </button>
          <div className='flex-1 h-full flex items-center justify-center border-y border-neutral-200 bg-white'>
            <span className='font-medium text-neutral-800'>{quantity}</span>
          </div>
          <button
            onClick={incrementQuantity}
            disabled={quantity >= product.stock}
            className='w-12 h-full bg-neutral-100 rounded-r-lg flex items-center justify-center text-neutral-600 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
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
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Botones de acción */}
      <div className='flex flex-col sm:flex-row gap-4 mb-8'>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-full font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center'
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
              strokeWidth={2}
              d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
            />
          </svg>
          Añadir al carrito
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleWishlist}
          className={`sm:w-14 h-14 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all ${
            isInWishlist
              ? 'bg-rose-100 text-rose-600 hover:bg-rose-200'
              : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
          }`}
        >
          <svg
            className='w-6 h-6'
            fill={isInWishlist ? 'currentColor' : 'none'}
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={isInWishlist ? 1 : 2}
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            />
          </svg>
        </motion.button>
      </div>

      {/* Detalles adicionales */}
      <div className='border-t border-neutral-200 pt-6 space-y-4'>
        {/* Ingredientes */}
        <div>
          <h3 className='text-sm font-medium text-neutral-700 mb-2'>
            Ingredientes principales:
          </h3>
          <div className='flex flex-wrap gap-2'>
            {product.ingredients.map((ingredient, idx) => (
              <span
                key={idx}
                className='text-xs bg-neutral-50 text-neutral-600 px-3 py-1.5 rounded-full border border-neutral-200'
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        {/* Código y categoría */}
        <div className='flex flex-wrap gap-x-8 gap-y-2 text-sm text-neutral-500'>
          <div>
            <span className='font-medium text-neutral-700'>SKU:</span>{' '}
            {product.id.toString().padStart(6, '0')}
          </div>
          <div>
            <span className='font-medium text-neutral-700'>Categoría:</span>{' '}
            <Link
              href={`/productos?categoria=${product.category}`}
              className='text-primary-600 hover:underline'
            >
              {product.category}
            </Link>
          </div>
        </div>

        {/* Compartir */}
        <div className='pt-2'>
          <h3 className='text-sm font-medium text-neutral-700 mb-2'>
            Compartir:
          </h3>
          <div className='flex space-x-2'>
            <a
              href='#'
              className='w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors'
            >
              <span className='sr-only'>Facebook</span>
              <svg
                className='h-4 w-4'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
            <a
              href='#'
              className='w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors'
            >
              <span className='sr-only'>Instagram</span>
              <svg
                className='h-4 w-4'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
            <a
              href='#'
              className='w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors'
            >
              <span className='sr-only'>Twitter</span>
              <svg
                className='h-4 w-4'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
              </svg>
            </a>
            <a
              href='#'
              className='w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors'
            >
              <span className='sr-only'>Pinterest</span>
              <svg
                className='h-4 w-4'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z' />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Envío y devoluciones */}
      <div className='mt-6 pt-6 border-t border-neutral-200'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='flex items-start'>
            <div className='flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div>
              <h4 className='text-sm font-medium text-primary-800'>
                Envío rápido
              </h4>
              <p className='text-xs text-neutral-500'>24-48h en península</p>
            </div>
          </div>

          <div className='flex items-start'>
            <div className='flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
            </div>
            <div>
              <h4 className='text-sm font-medium text-primary-800'>
                Devoluciones gratuitas
              </h4>
              <p className='text-xs text-neutral-500'>30 días de garantía</p>
            </div>
          </div>

          <div className='flex items-start'>
            <div className='flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                />
              </svg>
            </div>
            <div>
              <h4 className='text-sm font-medium text-primary-800'>
                Pago seguro
              </h4>
              <p className='text-xs text-neutral-500'>
                Múltiples métodos de pago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
