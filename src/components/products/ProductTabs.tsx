import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ReviewStars from './ReviewStars';
import { productReviews } from '@/constants/products';

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <section className='py-12 bg-neutral-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Navegación de pestañas */}
        <div className='flex border-b border-neutral-200 mb-8 overflow-x-auto scrollbar-hide'>
          <button
            onClick={() => setActiveTab('description')}
            className={`whitespace-nowrap py-4 px-6 font-medium border-b-2 transition-colors ${
              activeTab === 'description'
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-neutral-500 hover:text-primary-600'
            }`}
          >
            Descripción
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`whitespace-nowrap py-4 px-6 font-medium border-b-2 transition-colors ${
              activeTab === 'ingredients'
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-neutral-500 hover:text-primary-600'
            }`}
          >
            Ingredientes
          </button>
          <button
            onClick={() => setActiveTab('how_to_use')}
            className={`whitespace-nowrap py-4 px-6 font-medium border-b-2 transition-colors ${
              activeTab === 'how_to_use'
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-neutral-500 hover:text-primary-600'
            }`}
          >
            Modo de uso
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`whitespace-nowrap py-4 px-6 font-medium border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-neutral-500 hover:text-primary-600'
            }`}
          >
            Valoraciones ({productReviews.length})
          </button>
        </div>

        {/* Contenido de las pestañas */}
        <div className='bg-white rounded-xl shadow-soft p-6 md:p-8'>
          <AnimatePresence mode='wait'>
            {activeTab === 'description' && (
              <motion.div
                key='description'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
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
                    {product.ingredients[0]} y {product.ingredients[1]} ayuda a
                    mantener la piel nutrida e hidratada. El aroma natural de{' '}
                    {product.ingredients[2]} proporciona una experiencia
                    sensorial única durante el baño, ayudando a calmar la mente
                    y renovar el espíritu.
                  </p>
                  <p>
                    Este jabón es ideal para todo tipo de pieles, incluso las
                    más sensibles, gracias a su pH equilibrado y su composición
                    100% natural. No contiene parabenos, sulfatos, colorantes
                    artificiales ni fragancias sintéticas.
                  </p>
                </div>

                {/* Propiedades y beneficios */}
                <div className='mt-8'>
                  <h4 className='text-lg font-bold text-primary-800 mb-4'>
                    Propiedades y beneficios
                  </h4>
                  <ul className='list-disc pl-5 text-neutral-600 space-y-2'>
                    <li>Limpia profundamente sin resecar la piel</li>
                    <li>
                      Hidrata y nutre gracias a su contenido de aceites
                      naturales
                    </li>
                    <li>Calma y suaviza la piel irritada</li>
                    <li>Ayuda a mantener el pH natural de la piel</li>
                    <li>Aroma natural relajante</li>
                    <li>Sostenible y respetuoso con el medio ambiente</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'ingredients' && (
              <motion.div
                key='ingredients'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
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
                    <h4 className='text-lg font-medium text-primary-700 mb-2'>
                      Ingredientes principales
                    </h4>
                    <ul className='list-disc pl-5 space-y-2'>
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index} className='text-neutral-600'>
                          <span className='font-medium'>{ingredient}</span>:{' '}
                          {getIngredientDescription(ingredient)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className='text-lg font-medium text-primary-700 mb-2'>
                      Ingredientes completos (INCI)
                    </h4>
                    <p className='p-4 bg-neutral-50 rounded-lg text-sm'>
                      Sodium Olivate (Aceite de Oliva Saponificado), Sodium
                      Cocoate (Aceite de Coco Saponificado), Aqua,{' '}
                      {product.ingredients.join(', ')}, Glycerin, Sodium
                      Citrate, Citric Acid.
                    </p>
                    <p className='mt-3 text-sm italic'>
                      * Todos los ingredientes de origen natural. Sin
                      colorantes, fragancias sintéticas, parabenos ni sulfatos.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'how_to_use' && (
              <motion.div
                key='how_to_use'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className='text-xl font-bold text-primary-800 mb-4'>
                  Modo de uso
                </h3>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                  <div className='bg-neutral-50 p-4 rounded-lg'>
                    <div className='flex items-center mb-3'>
                      <div className='w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3'>
                        <span className='font-medium'>1</span>
                      </div>
                      <h4 className='font-medium text-primary-800'>
                        Humedecer
                      </h4>
                    </div>
                    <p className='text-neutral-600 text-sm'>
                      Humedece tu piel y el jabón con agua tibia. Para mejores
                      resultados, utiliza agua filtrada para evitar la dureza
                      que puede afectar la espuma.
                    </p>
                  </div>

                  <div className='bg-neutral-50 p-4 rounded-lg'>
                    <div className='flex items-center mb-3'>
                      <div className='w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3'>
                        <span className='font-medium'>2</span>
                      </div>
                      <h4 className='font-medium text-primary-800'>Aplicar</h4>
                    </div>
                    <p className='text-neutral-600 text-sm'>
                      Frota el jabón entre tus manos para crear una rica espuma
                      o utiliza directamente sobre la piel con movimientos
                      circulares suaves.
                    </p>
                  </div>

                  <div className='bg-neutral-50 p-4 rounded-lg'>
                    <div className='flex items-center mb-3'>
                      <div className='w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3'>
                        <span className='font-medium'>3</span>
                      </div>
                      <h4 className='font-medium text-primary-800'>Enjuagar</h4>
                    </div>
                    <p className='text-neutral-600 text-sm'>
                      Enjuaga completamente con agua tibia hasta eliminar todos
                      los residuos de jabón. Termina con agua fresca para cerrar
                      los poros.
                    </p>
                  </div>
                </div>

                <div className='text-neutral-600 space-y-4'>
                  <h4 className='text-lg font-medium text-primary-700'>
                    Consejos para prolongar la vida útil
                  </h4>
                  <ul className='list-disc pl-5 space-y-2'>
                    <li>
                      Mantén el jabón en una jabonera que permita el drenaje del
                      agua después de cada uso.
                    </li>
                    <li>
                      Evita dejar el jabón en contacto directo con el agua o en
                      zonas muy húmedas.
                    </li>
                    <li>
                      Para maximizar su duración, permite que el jabón se seque
                      completamente entre usos.
                    </li>
                    <li>
                      Corta la pastilla en trozos más pequeños para extender su
                      uso si lo prefieres.
                    </li>
                  </ul>

                  <div className='mt-4 p-4 bg-primary-50 rounded-lg border-l-4 border-primary-500'>
                    <h5 className='font-medium text-primary-800 mb-2'>
                      Consejo profesional
                    </h5>
                    <p className='text-sm'>
                      Para una experiencia de spa en casa, crea una bolsita de
                      algodón o sisal y coloca dentro trozos de jabón. Utilízala
                      como esponja natural para exfoliar suavemente mientras te
                      beneficias de las propiedades del jabón.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key='reviews'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-xl font-bold text-primary-800'>
                    Valoraciones de clientes
                  </h3>
                  <button className='bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors'>
                    Escribir valoración
                  </button>
                </div>

                {/* Resumen de valoraciones */}
                <div className='bg-neutral-50 p-4 rounded-lg mb-8'>
                  <div className='flex flex-col md:flex-row items-start gap-6'>
                    <div className='text-center'>
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

                    <div className='flex-1 space-y-2'>
                      {[5, 4, 3, 2, 1].map((star) => {
                        // Calculamos un porcentaje ficticio para esta demo
                        const percentage = calculateStarPercentage(
                          star,
                          product.rating
                        );
                        return (
                          <div key={star} className='flex items-center'>
                            <div className='text-sm text-neutral-600 w-8'>
                              {star}
                            </div>
                            <svg
                              className='w-4 h-4 text-amber-400 mx-1'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                            </svg>
                            <div className='flex-1 h-2 mx-2 bg-neutral-200 rounded-full overflow-hidden'>
                              <div
                                className='h-full bg-amber-400 rounded-full'
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className='text-sm text-neutral-500 w-10'>
                              {percentage}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// Función para obtener una descripción de ingrediente ficticia
function getIngredientDescription(ingredient) {
  const descriptions = {
    'Aceite de Oliva':
      'Rico en antioxidantes y vitamina E, hidrata profundamente y protege la piel.',
    'Aceite de Coco':
      'Nutritivo y antibacteriano, limpia suavemente sin resecar.',
    Lavanda:
      'Calmante y relajante, ayuda a equilibrar la piel y tiene propiedades antisépticas.',
    Miel: 'Hidratante y antibacteriana, ideal para pieles sensibles.',
    Avena:
      'Exfoliante suave que calma irritaciones y es perfecta para pieles sensibles.',
    'Aloe Vera': 'Hidratante, calmante y regenerador para todo tipo de pieles.',
    Caléndula:
      'Antiinflamatoria y calmante, perfecta para pieles irritadas o sensibles.',
    'Arcilla Verde':
      'Detoxificante y purificante, ideal para pieles grasas o con impurezas.',
    'Carbón Activado':
      'Desintoxicante potente que elimina impurezas y exceso de grasa.',
    Café: 'Exfoliante natural y antioxidante que mejora la circulación y la apariencia de la piel.',
    Menta:
      'Refrescante y estimulante, con propiedades antibacterianas y calmantes.',
    'Rosa Mosqueta':
      'Rica en ácidos grasos y antioxidantes, regenera y nutre la piel.',
    Romero:
      'Estimulante y tonificante, mejora la circulación y tiene propiedades antibacterianas.',
  };

  return (
    descriptions[ingredient] ||
    'Ingrediente natural seleccionado por sus propiedades beneficiosas para la piel.'
  );
}

// Función para calcular el porcentaje de estrellas (simulado para esta demo)
function calculateStarPercentage(star, rating) {
  if (star === Math.round(rating)) {
    return 65;
  } else if (star === 5 && rating >= 4.5) {
    return 80;
  } else if (star === 4 && rating >= 4 && rating < 4.5) {
    return 50;
  } else if (star > rating) {
    return 5 + Math.floor(Math.random() * 10);
  } else {
    return 15 + Math.floor(Math.random() * 20);
  }
}
