import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ReviewStars from './ReviewStars';
import { descriptions } from '@/constants/products';
import { Product } from '@/lib/graphql/types';

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<string>('description');
  const tabsRef = useRef<HTMLDivElement>(null);

  // Efecto para scroll automático optimizado
  useEffect(() => {
    if (!tabsRef.current) return;
    
    const activeButton = tabsRef.current.querySelector(
      `[data-tab="${activeTab}"]`
    ) as HTMLElement;
    
    if (activeButton) {
      const tabsRect = tabsRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

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
  }, [activeTab]);

  // Función mejorada para obtener descripción de ingredientes
  const getIngredientDescription = (ingredient: string): string => {
    if (typeof ingredient !== 'string') return 'Ingrediente natural';

    const descriptionKey = Object.keys(descriptions).find(
      (key) => key.toLowerCase() === ingredient.toLowerCase()
    );

    if (descriptionKey && descriptions[descriptionKey as keyof typeof descriptions]) {
      return descriptions[descriptionKey as keyof typeof descriptions];
    }

    return 'Ingrediente natural seleccionado por sus propiedades beneficiosas para la piel.';
  };

  // Configuración de pestañas modernizada
  const tabs = [
    { 
      id: 'description', 
      label: 'Descripción',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      id: 'ingredients', 
      label: 'Ingredientes',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    { 
      id: 'how_to_use', 
      label: 'Uso',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      id: 'reviews', 
      label: 'Valoraciones',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    },
  ];

  // Animaciones naturales
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-stone-50 via-white to-emerald-50/30">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Navegación de pestañas modernizada */}
        <div className="mb-12">
          <div
            ref={tabsRef}
            className="flex bg-white/60 backdrop-blur-sm rounded-2xl p-2 overflow-x-auto scrollbar-hide border border-white/40 shadow-lg"
            role="tablist"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                data-tab={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex items-center gap-2 py-3 px-6 font-medium rounded-xl transition-all duration-300 flex-shrink-0 min-w-max ${
                  activeTab === tab.id
                    ? 'bg-white text-emerald-700 shadow-md'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-white/50'
                }`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
              >
                <span className={`transition-colors ${
                  activeTab === tab.id ? 'text-emerald-600' : 'text-gray-400 group-hover:text-emerald-500'
                }`}>
                  {tab.icon}
                </span>
                <span className="text-sm">{tab.label}</span>
                
                {/* Indicador activo */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-md -z-10"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido de las pestañas con diseño limpio */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/40 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <motion.div
                key="description"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-8 lg:p-12"
              >
                <div className="max-w-4xl">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light text-gray-900">
                      Descripción del producto
                    </h3>
                  </div>

                  <div className="prose prose-lg text-gray-600 space-y-6 mb-12">
                    <p className="lead">
                      Nuestro <span className="font-medium text-emerald-700">{product.name}</span> es un jabón artesanal de lujo
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
                  </div>

                  {/* Beneficios con iconografía moderna */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
                    <h4 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Beneficios naturales
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { icon: '🌿', text: 'Limpia profundamente sin resecar' },
                        { icon: '💧', text: 'Hidrata con aceites naturales' },
                        { icon: '✨', text: 'Calma y suaviza la piel' },
                        { icon: '⚖️', text: 'Mantiene el pH natural' },
                        { icon: '🌸', text: 'Aroma natural relajante' },
                        { icon: '🌍', text: 'Sostenible y eco-friendly' },
                      ].map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm"
                        >
                          <span className="text-lg">{benefit.icon}</span>
                          <span className="text-gray-700 font-medium">{benefit.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'ingredients' && (
              <motion.div
                key="ingredients"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-8 lg:p-12"
              >
                <div className="max-w-4xl">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light text-gray-900">
                      Ingredientes naturales
                    </h3>
                  </div>

                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Todos nuestros ingredientes son seleccionados cuidadosamente
                    por su calidad, pureza y propiedades beneficiosas para la
                    piel. Utilizamos exclusivamente ingredientes de origen
                    natural, biodegradables y sostenibles.
                  </p>

                  {/* Grid de ingredientes modernizado */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {Array.isArray(product.ingredients) &&
                      product.ingredients.map((ingredient, index) => (
                        <motion.div
                          key={`ingredient-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group p-6 rounded-2xl bg-gradient-to-br from-white/80 to-emerald-50/50 border border-emerald-200/30 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2 text-lg">
                                {ingredient}
                              </h5>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {getIngredientDescription(ingredient)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>

                  {/* Listado INCI mejorado */}
                  <div className="bg-gradient-to-r from-gray-50 to-emerald-50/30 rounded-2xl p-6 border border-gray-200/50">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Listado completo INCI
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-mono bg-white/60 p-4 rounded-xl">
                      Sodium Olivate, Sodium Cocoate, Aqua,{' '}
                      {Array.isArray(product.ingredients)
                        ? product.ingredients.join(', ')
                        : 'Ingredientes naturales'}
                      , Glycerin, Sodium Citrate, Citric Acid.
                    </p>
                    <div className="mt-4 flex items-start gap-2 text-sm text-emerald-700 bg-emerald-50/50 p-3 rounded-xl">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Sin colorantes, fragancias sintéticas, parabenos ni sulfatos</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'how_to_use' && (
              <motion.div
                key="how_to_use"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-8 lg:p-12"
              >
                <div className="max-w-4xl">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light text-gray-900">
                      Modo de uso
                    </h3>
                  </div>

                  {/* Pasos con diseño paso a paso */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {[
                      {
                        step: 1,
                        title: 'Humedecer',
                        description: 'Humedece tu piel y el jabón con agua tibia. Para mejores resultados, utiliza agua filtrada.',
                        icon: (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          </svg>
                        )
                      },
                      {
                        step: 2,
                        title: 'Aplicar',
                        description: 'Frota suavemente entre las manos o directamente sobre la piel con movimientos circulares.',
                        icon: (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M11 7.343V10a2 2 0 002 2h2.657" />
                          </svg>
                        )
                      },
                      {
                        step: 3,
                        title: 'Enjuagar',
                        description: 'Enjuaga completamente con agua tibia y termina con agua fresca para cerrar los poros.',
                        icon: (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        )
                      },
                    ].map((item) => (
                      <motion.div
                        key={item.step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: item.step * 0.2 }}
                        className="relative group"
                      >
                        <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl p-6 border border-emerald-200/30 group-hover:shadow-lg transition-all duration-300 h-full">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-200 transition-colors">
                              {item.icon}
                            </div>
                            <div>
                              <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
                                Paso {item.step}
                              </span>
                              <h4 className="font-semibold text-gray-900 text-lg">
                                {item.title}
                              </h4>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        
                        {/* Conector entre pasos */}
                        {item.step < 3 && (
                          <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-200 to-transparent transform -translate-y-1/2 z-10" />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Consejos adicionales */}
                  <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 border border-teal-200/50">
                    <h4 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Consejos para optimizar tu experiencia
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'Usa una jabonera con drenaje para prolongar la vida útil',
                        'Permite que se seque completamente entre usos',
                        'Corta en piezas más pequeñas para uso práctico',
                        'Guarda en lugar seco alejado de la humedad directa'
                      ].map((tip, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/60">
                          <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-8 lg:p-12"
              >
                <div className="max-w-4xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-light text-gray-900">
                        Valoraciones de clientes
                      </h3>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Escribir valoración
                    </motion.button>
                  </div>

                  {/* Resumen de valoraciones modernizado */}
                  <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl p-8 mb-8 border border-emerald-200/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="text-center md:text-left">
                        <div className="text-5xl font-light text-emerald-600 mb-2">
                          {product.rating.toFixed(1)}
                        </div>
                        <div className="flex justify-center md:justify-start mb-3">
                          <ReviewStars rating={product.rating} size="large" />
                        </div>
                        <div className="text-gray-600">
                          Basado en <span className="font-medium">{product.reviews}</span> valoraciones verificadas
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((stars) => {
                          const percentage = stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1;
                          return (
                            <div key={stars} className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-gray-600 w-2">{stars}</span>
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ delay: stars * 0.1, duration: 0.8 }}
                                  className="bg-emerald-500 h-full rounded-full"
                                />
                              </div>
                              <span className="text-xs text-gray-500 w-8">{percentage}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Lista de valoraciones con diseño mejorado */}
                  <div className="space-y-6">
                    {[
                      {
                        name: 'Marina S.',
                        date: '15/04/2025',
                        rating: 5,
                        comment: '¡Increíble producto! El aroma es maravilloso y mi piel se siente muy suave después de usarlo. Sin duda repetiré.',
                        verified: true
                      },
                      {
                        name: 'Carlos P.',
                        date: '02/04/2025',
                        rating: 4,
                        comment: 'Muy buen jabón, la piel queda hidratada y no reseca como otros. El envío fue rápido y bien empaquetado.',
                        verified: true
                      },
                      {
                        name: 'Laura M.',
                        date: '28/03/2025',
                        rating: 5,
                        comment: 'Lo compré como regalo y a mi madre le encantó. Dice que el aroma es muy natural y agradable.',
                        verified: false
                      },
                    ].map((review, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                              <span className="text-emerald-600 font-medium">
                                {review.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{review.name}</h4>
                              <div className="flex items-center gap-2">
                                <ReviewStars rating={review.rating} size="small" />
                                <span className="text-xs text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          {review.verified && (
                            <div className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Verificada
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <button className="text-emerald-600 hover:text-emerald-800 font-medium border border-emerald-200 rounded-xl px-6 py-3 hover:bg-emerald-50 transition-all duration-300">
                      Ver todas las valoraciones
                    </button>
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