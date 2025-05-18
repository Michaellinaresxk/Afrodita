import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ReviewStars from './ReviewStars';
import { descriptions } from '@/constants/products';
import { Product } from '@/lib/graphql/types';

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');
  const tabsRef = useRef<HTMLDivElement>(null);

  // Efecto para scroll automático para mostrar pestaña activa en móvil
  useEffect(() => {
    if (tabsRef.current) {
      const activeButton = tabsRef.current.querySelector(
        `[data-tab="${activeTab}"]`
      );
      if (activeButton) {
        const tabsRect = tabsRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        // Calcula la posición de scroll para centrar el botón
        const scrollLeft =
          buttonRect.left -
          tabsRect.left -
          tabsRect.width / 2 +
          buttonRect.width / 2;

        tabsRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        });
      }
    }
  }, [activeTab]);

  // Función mejorada para obtener descripción de ingredientes
  const getIngredientDescription = (ingredient: string): string => {
    // Validación de entrada
    if (typeof ingredient !== 'string') return 'Ingrediente natural';

    // Buscar en el objeto descriptions (insensible a mayúsculas/minúsculas)
    const descriptionKey = Object.keys(descriptions).find(
      (key) => key.toLowerCase() === ingredient.toLowerCase()
    );

    if (
      descriptionKey &&
      descriptions[descriptionKey as keyof typeof descriptions]
    ) {
      return descriptions[descriptionKey as keyof typeof descriptions];
    }

    return 'Ingrediente natural seleccionado por sus propiedades beneficiosas para la piel.';
  };

  const tabs = [
    { id: 'description', label: 'Descripción' },
    { id: 'ingredients', label: 'Ingredientes' },
    { id: 'how_to_use', label: 'Modo de uso' },
    { id: 'reviews', label: 'Valoraciones' },
  ];

  return (
    <section className='py-8 md:py-12 bg-neutral-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Navegación de pestañas - con scroll mejorado */}
        <div
          ref={tabsRef}
          className='flex border-b border-neutral-200 mb-6 md:mb-8 overflow-x-auto scrollbar-hide'
          aria-label='Pestañas de información del producto'
          role='tablist'
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-3 md:py-4 px-4 md:px-6 font-medium border-b-2 transition-colors flex-shrink-0 ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-neutral-500 hover:text-primary-600 hover:border-primary-200'
              }`}
              role='tab'
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido de las pestañas - con contenedor mejorado */}
        <div className='bg-white rounded-xl shadow-sm p-5 md:p-8'>
          <AnimatePresence mode='wait'>
            {activeTab === 'description' && (
              <motion.div
                key='description'
                id='panel-description'
                role='tabpanel'
                aria-labelledby='tab-description'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className='focus:outline-none'
                tabIndex={0}
              >
                <h3 className='text-xl font-bold text-primary-800 mb-4'>
                  Descripción del producto
                </h3>
                <div className='text-neutral-600 space-y-4'>
                  <p>
                    Nuestro {product.name} es un jabón artesanal de lujo
                    elaborado con los mejores ingredientes naturales para
                    proporcionar una experiencia de limpieza excepcional
                    mientras cuida y nutre tu piel.
                  </p>
                  <p>
                    Elaborado mediante el método tradicional de saponificación
                    en frío, este jabón conserva todas las propiedades
                    beneficiosas de sus aceites esenciales y extractos
                    botánicos, ofreciendo una limpieza profunda pero suave que
                    respeta el equilibrio natural de tu piel.
                  </p>
                  <p>
                    Su fórmula rica en ingredientes hidratantes como{' '}
                    {product.ingredients && product.ingredients.length > 0
                      ? product.ingredients[0]
                      : 'aceites naturales'}{' '}
                    y{' '}
                    {product.ingredients && product.ingredients.length > 1
                      ? product.ingredients[1]
                      : 'extractos botánicos'}{' '}
                    ayuda a mantener la piel nutrida e hidratada.
                    {product.ingredients &&
                      product.ingredients.length > 2 &&
                      ` El aroma natural de ${product.ingredients[2]} proporciona una experiencia
                    sensorial única durante el baño, ayudando a calmar la mente
                    y renovar el espíritu.`}
                  </p>
                  <p>
                    Este jabón es ideal para todo tipo de pieles, incluso las
                    más sensibles, gracias a su pH equilibrado y su composición
                    100% natural. No contiene parabenos, sulfatos, colorantes
                    artificiales ni fragancias sintéticas.
                  </p>
                </div>

                {/* Propiedades y beneficios - con visualización mejorada */}
                <div className='mt-8'>
                  <h4 className='text-lg font-bold text-primary-800 mb-4'>
                    Propiedades y beneficios
                  </h4>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
                    {[
                      'Limpia profundamente sin resecar la piel',
                      'Hidrata y nutre gracias a su contenido de aceites naturales',
                      'Calma y suaviza la piel irritada',
                      'Ayuda a mantener el pH natural de la piel',
                      'Aroma natural relajante',
                      'Sostenible y respetuoso con el medio ambiente',
                    ].map((benefit, index) => (
                      <div key={index} className='flex items-start'>
                        <div className='text-primary-600 mt-1 mr-2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='M20 6L9 17l-5-5' />
                          </svg>
                        </div>
                        <span className='text-neutral-600'>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'ingredients' && (
              <motion.div
                key='ingredients'
                id='panel-ingredients'
                role='tabpanel'
                aria-labelledby='tab-ingredients'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className='focus:outline-none'
                tabIndex={0}
              >
                <h3 className='text-xl font-bold text-primary-800 mb-4'>
                  Ingredientes
                </h3>
                <div className='text-neutral-600'>
                  <p className='mb-6'>
                    Todos nuestros ingredientes son seleccionados cuidadosamente
                    por su calidad, pureza y propiedades beneficiosas para la
                    piel. Utilizamos exclusivamente ingredientes de origen
                    natural, biodegradables y sostenibles.
                  </p>

                  <div className='mb-6'>
                    <h4 className='text-lg font-medium text-primary-700 mb-3'>
                      Ingredientes principales
                    </h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {Array.isArray(product.ingredients) &&
                        product.ingredients.map((ingredient, index) => (
                          <div
                            key={`ingredient-${index}-${String(
                              ingredient
                            ).substring(0, 10)}`}
                            className='bg-neutral-50 p-4 rounded-lg'
                          >
                            <h5 className='font-medium text-primary-800 mb-2'>
                              {ingredient}
                            </h5>
                            <p className='text-sm text-neutral-600'>
                              {getIngredientDescription(ingredient)}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className='text-lg font-medium text-primary-700 mb-3'>
                      Ingredientes completos (INCI)
                    </h4>
                    <div className='p-4 bg-neutral-50 rounded-lg text-sm'>
                      <p className='leading-relaxed'>
                        Sodium Olivate (Aceite de Oliva Saponificado), Sodium
                        Cocoate (Aceite de Coco Saponificado), Aqua,{' '}
                        {Array.isArray(product.ingredients)
                          ? product.ingredients.join(', ')
                          : 'Ingredientes naturales'}
                        , Glycerin, Sodium Citrate, Citric Acid.
                      </p>
                    </div>
                    <div className='mt-3 text-sm italic bg-primary-50 p-3 rounded-lg border-l-3 border-primary-200'>
                      <p>
                        * Todos los ingredientes son de origen natural. Sin
                        colorantes, fragancias sintéticas, parabenos ni
                        sulfatos.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'how_to_use' && (
              <motion.div
                key='how_to_use'
                id='panel-how_to_use'
                role='tabpanel'
                aria-labelledby='tab-how_to_use'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className='focus:outline-none'
                tabIndex={0}
              >
                <h3 className='text-xl font-bold text-primary-800 mb-4'>
                  Modo de uso
                </h3>

                {/* Pasos de uso - con diseño mejorado */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8'>
                  {[
                    {
                      step: 1,
                      title: 'Humedecer',
                      description:
                        'Humedece tu piel y el jabón con agua tibia. Para mejores resultados, utiliza agua filtrada para evitar la dureza que puede afectar la espuma.',
                    },
                    {
                      step: 2,
                      title: 'Aplicar',
                      description:
                        'Frota el jabón entre tus manos para crear una rica espuma o utiliza directamente sobre la piel con movimientos circulares suaves.',
                    },
                    {
                      step: 3,
                      title: 'Enjuagar',
                      description:
                        'Enjuaga completamente con agua tibia hasta eliminar todos los residuos de jabón. Termina con agua fresca para cerrar los poros.',
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className='bg-neutral-50 p-4 rounded-lg shadow-sm hover:shadow transition-shadow'
                    >
                      <div className='flex items-center mb-3'>
                        <div className='w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3 shadow-sm'>
                          <span className='font-medium'>{item.step}</span>
                        </div>
                        <h4 className='font-medium text-primary-800'>
                          {item.title}
                        </h4>
                      </div>
                      <p className='text-neutral-600 text-sm'>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className='text-neutral-600 space-y-4'>
                  <h4 className='text-lg font-medium text-primary-700 mb-3'>
                    Consejos para prolongar la vida útil
                  </h4>

                  <div className='bg-white rounded-lg shadow-sm p-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                      {[
                        'Mantén el jabón en una jabonera que permita el drenaje del agua después de cada uso.',
                        'Evita dejar el jabón en contacto directo con el agua o en zonas muy húmedas.',
                        'Para maximizar su duración, permite que el jabón se seque completamente entre usos.',
                        'Corta la pastilla en trozos más pequeños para extender su uso si lo prefieres.',
                      ].map((tip, index) => (
                        <div key={index} className='flex items-start'>
                          <div className='text-primary-500 mr-2 mt-1'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='14'
                              height='14'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <circle cx='12' cy='12' r='10'></circle>
                              <polyline points='12 6 12 12 16 14'></polyline>
                            </svg>
                          </div>
                          <p className='text-sm'>{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='mt-6 p-4 bg-primary-50 rounded-lg border-l-4 border-primary-500 shadow-sm'>
                    <div className='flex items-start'>
                      <div className='text-primary-600 mr-3 mt-1'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <circle cx='12' cy='12' r='10'></circle>
                          <line x1='12' y1='16' x2='12' y2='12'></line>
                          <line x1='12' y1='8' x2='12.01' y2='8'></line>
                        </svg>
                      </div>
                      <div>
                        <h5 className='font-medium text-primary-800 mb-2'>
                          Consejo profesional
                        </h5>
                        <p className='text-sm'>
                          Para una experiencia de spa en casa, crea una bolsita
                          de algodón o sisal y coloca dentro trozos de jabón.
                          Utilízala como esponja natural para exfoliar
                          suavemente mientras te beneficias de las propiedades
                          del jabón.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key='reviews'
                id='panel-reviews'
                role='tabpanel'
                aria-labelledby='tab-reviews'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className='focus:outline-none'
                tabIndex={0}
              >
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4'>
                  <h3 className='text-xl font-bold text-primary-800'>
                    Valoraciones de clientes
                  </h3>
                  <button className='bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex-shrink-0'>
                    <span className='flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='mr-1'
                      >
                        <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                      </svg>
                      Escribir valoración
                    </span>
                  </button>
                </div>

                {/* Resumen de valoraciones - mejorado y completo */}
                <div className='bg-neutral-50 p-5 rounded-lg mb-6 shadow-sm'>
                  <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
                    <div className='text-center md:border-r md:border-neutral-200 md:pr-6'>
                      <div className='text-4xl font-bold text-primary-800 mb-1'>
                        {product.rating.toFixed(1)}
                      </div>
                      <div className='flex justify-center mb-2'>
                        <ReviewStars rating={product.rating} size='large' />
                      </div>
                      <div className='text-sm text-neutral-500'>
                        Basado en {product.reviews} valoraciones
                      </div>
                    </div>

                    <div className='w-full max-w-md'>
                      {[5, 4, 3, 2, 1].map((stars) => {
                        // Simulamos distribución de valoraciones
                        const percentage =
                          stars === 5
                            ? 70
                            : stars === 4
                            ? 20
                            : stars === 3
                            ? 7
                            : stars === 2
                            ? 2
                            : 1;
                        return (
                          <div key={stars} className='flex items-center mb-2'>
                            <div className='flex items-center mr-2'>
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < stars
                                      ? 'text-yellow-400'
                                      : 'text-neutral-300'
                                  }`}
                                  fill='currentColor'
                                  viewBox='0 0 20 20'
                                >
                                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>
                              ))}
                            </div>
                            <div className='w-full bg-neutral-200 rounded-full h-2.5'>
                              <div
                                className='bg-primary-600 h-2.5 rounded-full'
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className='ml-2 text-xs text-neutral-500 w-8'>
                              {percentage}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Lista de valoraciones */}
                <div className='space-y-4'>
                  {/* Simulamos algunas valoraciones */}
                  {[
                    {
                      name: 'Marina S.',
                      date: '15/04/2025',
                      rating: 5,
                      comment:
                        '¡Increíble producto! El aroma es maravilloso y mi piel se siente muy suave después de usarlo. Sin duda repetiré.',
                    },
                    {
                      name: 'Carlos P.',
                      date: '02/04/2025',
                      rating: 4,
                      comment:
                        'Muy buen jabón, la piel queda hidratada y no reseca como otros. El envío fue rápido y bien empaquetado.',
                    },
                    {
                      name: 'Laura M.',
                      date: '28/03/2025',
                      rating: 5,
                      comment:
                        'Lo compré como regalo y a mi madre le encantó. Dice que el aroma es muy natural y agradable, y que nota la piel más suave.',
                    },
                  ].map((review, index) => (
                    <div
                      key={index}
                      className='border-b border-neutral-100 pb-4 last:border-0'
                    >
                      <div className='flex justify-between items-start mb-2'>
                        <div>
                          <h4 className='font-medium text-neutral-800'>
                            {review.name}
                          </h4>
                          <div className='flex items-center'>
                            <ReviewStars rating={review.rating} size='small' />
                            <span className='ml-2 text-xs text-neutral-500'>
                              {review.date}
                            </span>
                          </div>
                        </div>
                        {review.rating === 5 && (
                          <div className='bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full flex items-center'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='12'
                              height='12'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='mr-1'
                            >
                              <path d='M20 6L9 17l-5-5' />
                            </svg>
                            Compra verificada
                          </div>
                        )}
                      </div>
                      <p className='text-sm text-neutral-600 mt-2'>
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Botón para cargar más */}
                <div className='mt-6 text-center'>
                  <button className='text-primary-600 hover:text-primary-800 font-medium text-sm border border-primary-200 rounded-lg px-4 py-2 hover:bg-primary-50 transition-colors'>
                    Ver más valoraciones
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
