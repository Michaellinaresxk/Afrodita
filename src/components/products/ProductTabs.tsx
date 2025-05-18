import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ReviewStars from './ReviewStars';
import { descriptions } from '@/constants/products';
import { Product } from '@/lib/graphql/types';

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  // Función mejorada para obtener descripción de ingredientes
  const getIngredientDescription = (ingredient: string): string => {
    // Asegurarse de que el ingrediente es un string
    if (typeof ingredient !== 'string') return 'Ingrediente natural';

    // Buscar en el objeto descriptions
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
        </div>

        {/* Contenido de las pestañas */}
        <div className='bg-white rounded-xl shadow-sm p-6 md:p-8'>
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
                      {Array.isArray(product.ingredients) &&
                        product.ingredients.map((ingredient, index) => (
                          <li
                            key={`ingredient-${index}-${String(
                              ingredient
                            ).substring(0, 10)}`}
                            className='text-neutral-600'
                          >
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
                      {Array.isArray(product.ingredients)
                        ? product.ingredients.join(', ')
                        : 'Ingredientes naturales'}
                      , Glycerin, Sodium Citrate, Citric Acid.
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
