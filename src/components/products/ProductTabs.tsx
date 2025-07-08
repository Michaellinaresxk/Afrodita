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

  const getIngredientDescription = (ingredient: string): string => {
    if (typeof ingredient !== 'string') return 'Ingrediente natural';

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
    { 
      id: 'description', 
      label: 'Descripción',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      id: 'ingredients', 
      label: 'Ingredientes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    { 
      id: 'how_to_use', 
      label: 'Modo de uso',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      id: 'reviews', 
      label: 'Valoraciones',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
  ];

  return (
    <section className='relative py-8 md:py-12 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-neutral-100 overflow-hidden'>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-300/15 rounded-full blur-3xl"></div>
      </div>
      
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Navegación de pestañas mejorada */}
        <div className="mb-8">
          <motion.div
            ref={tabsRef}
            className='flex bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 overflow-x-auto scrollbar-hide'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label='Pestañas de información del producto'
            role='tablist'
          >
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                data-tab={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative whitespace-nowrap py-3 md:py-4 px-4 md:px-6 font-medium rounded-xl transition-all duration-300 flex-shrink-0 flex items-center gap-2 group ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50/50'
                }`}
                role='tab'
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className={`transition-transform duration-300 ${
                    activeTab === tab.id ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                >
                  {tab.icon}
                </motion.div>
                <span className="hidden sm:inline">{tab.label}</span>
                
                {/* Active indicator */}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl -z-10"
                    layoutId="activeTab"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Contenido de las pestañas con diseño mejorado */}
        <motion.div 
          className='relative'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Glassmorphism container */}
          <div className='bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-10 relative overflow-hidden'>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100/50 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-50/50 to-transparent rounded-tr-full"></div>

            <AnimatePresence mode='wait'>
              {activeTab === 'description' && (
                <motion.div
                  key='description'
                  id='panel-description'
                  role='tabpanel'
                  aria-labelledby='tab-description'
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className='focus:outline-none relative z-10'
                  tabIndex={0}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent'>
                      Descripción del producto
                    </h3>
                  </div>

                  <div className='text-neutral-700 space-y-6 leading-relaxed'>
                    <motion.div 
                      className="relative p-6 bg-gradient-to-r from-primary-50/50 to-white/50 rounded-2xl border border-primary-100/50"
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-lg">
                        Nuestro <span className="font-semibold text-primary-700">{product.name}</span> es un jabón artesanal de lujo
                        elaborado con los mejores ingredientes naturales para
                        proporcionar una experiencia de limpieza excepcional
                        mientras cuida y nutre tu piel.
                      </p>
                    </motion.div>

                    {[
                      "Elaborado mediante el método tradicional de saponificación en frío, este jabón conserva todas las propiedades beneficiosas de sus aceites esenciales y extractos botánicos, ofreciendo una limpieza profunda pero suave que respeta el equilibrio natural de tu piel.",
                      `Su fórmula rica en ingredientes hidratantes como ${product.ingredients && product.ingredients.length > 0 ? product.ingredients[0] : 'aceites naturales'} y ${product.ingredients && product.ingredients.length > 1 ? product.ingredients[1] : 'extractos botánicos'} ayuda a mantener la piel nutrida e hidratada.${product.ingredients && product.ingredients.length > 2 ? ` El aroma natural de ${product.ingredients[2]} proporciona una experiencia sensorial única durante el baño, ayudando a calmar la mente y renovar el espíritu.` : ''}`,
                      "Este jabón es ideal para todo tipo de pieles, incluso las más sensibles, gracias a su pH equilibrado y su composición 100% natural. No contiene parabenos, sulfatos, colorantes artificiales ni fragancias sintéticas."
                    ].map((text, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {text}
                      </motion.p>
                    ))}
                  </div>

                  {/* Propiedades y beneficios mejorados */}
                  <motion.div 
                    className='mt-10'
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h4 className='text-xl md:text-2xl font-bold text-primary-800 mb-6 flex items-center gap-3'>
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Propiedades y beneficios
                    </h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {[
                        { text: 'Limpia profundamente sin resecar la piel', color: 'from-blue-400 to-blue-500' },
                        { text: 'Hidrata y nutre gracias a su contenido de aceites naturales', color: 'from-green-400 to-green-500' },
                        { text: 'Calma y suaviza la piel irritada', color: 'from-purple-400 to-purple-500' },
                        { text: 'Ayuda a mantener el pH natural de la piel', color: 'from-pink-400 to-pink-500' },
                        { text: 'Aroma natural relajante', color: 'from-yellow-400 to-orange-500' },
                        { text: 'Sostenible y respetuoso con el medio ambiente', color: 'from-emerald-400 to-emerald-500' },
                      ].map((benefit, index) => (
                        <motion.div 
                          key={index} 
                          className='group flex items-start p-4 bg-white/60 rounded-xl border border-white/40 hover:shadow-lg transition-all duration-300 hover:bg-white/80'
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className={`w-10 h-10 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className='text-neutral-700 font-medium leading-relaxed'>{benefit.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 'ingredients' && (
                <motion.div
                  key='ingredients'
                  id='panel-ingredients'
                  role='tabpanel'
                  aria-labelledby='tab-ingredients'
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className='focus:outline-none relative z-10'
                  tabIndex={0}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent'>
                      Ingredientes
                    </h3>
                  </div>

                  <div className='text-neutral-700'>
                    <motion.div 
                      className="relative p-6 bg-gradient-to-r from-green-50/50 to-white/50 rounded-2xl border border-green-100/50 mb-8"
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className='text-lg leading-relaxed'>
                        Todos nuestros ingredientes son seleccionados cuidadosamente
                        por su calidad, pureza y propiedades beneficiosas para la
                        piel. Utilizamos exclusivamente ingredientes de origen
                        natural, biodegradables y sostenibles.
                      </p>
                    </motion.div>

                    <div className='mb-8'>
                      <h4 className='text-xl font-bold text-green-800 mb-6 flex items-center gap-2'>
                        <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full"></div>
                        Ingredientes principales
                      </h4>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {Array.isArray(product.ingredients) &&
                          product.ingredients.map((ingredient, index) => (
                            <motion.div
                              key={`ingredient-${index}-${String(ingredient).substring(0, 10)}`}
                              className='group relative overflow-hidden bg-gradient-to-br from-white/80 to-green-50/40 p-6 rounded-2xl border border-green-100/50 shadow-sm hover:shadow-xl transition-all duration-300'
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                            >
                              {/* Decorative gradient */}
                              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-200/30 to-transparent rounded-bl-full"></div>
                              
                              <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                  </div>
                                  <h5 className='font-bold text-green-800 text-lg'>
                                    {ingredient}
                                  </h5>
                                </div>
                                <p className='text-neutral-600 leading-relaxed'>
                                  {getIngredientDescription(ingredient)}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h4 className='text-xl font-bold text-green-800 mb-6 flex items-center gap-2'>
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full"></div>
                        Ingredientes completos (INCI)
                      </h4>
                      <div className='p-6 bg-gradient-to-r from-neutral-50/80 to-white/60 rounded-2xl text-sm border border-neutral-100/50 shadow-inner'>
                        <p className='leading-relaxed font-mono text-neutral-700'>
                          Sodium Olivate (Aceite de Oliva Saponificado), Sodium
                          Cocoate (Aceite de Coco Saponificado), Aqua,{' '}
                          {Array.isArray(product.ingredients)
                            ? product.ingredients.join(', ')
                            : 'Ingredientes naturales'}
                          , Glycerin, Sodium Citrate, Citric Acid.
                        </p>
                      </div>
                      <div className='mt-4 text-sm bg-gradient-to-r from-green-50/80 to-emerald-50/60 p-5 rounded-2xl border-l-4 border-green-400 shadow-sm'>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-green-800 font-medium leading-relaxed">
                            Todos los ingredientes son de origen natural. Sin
                            colorantes, fragancias sintéticas, parabenos ni
                            sulfatos.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'how_to_use' && (
                <motion.div
                  key='how_to_use'
                  id='panel-how_to_use'
                  role='tabpanel'
                  aria-labelledby='tab-how_to_use'
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className='focus:outline-none relative z-10'
                  tabIndex={0}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-800 to-cyan-600 bg-clip-text text-transparent'>
                      Modo de uso
                    </h3>
                  </div>

                  {/* Pasos de uso con diseño moderno */}
                  <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10'>
                    {[
                      {
                        step: 1,
                        title: 'Humedecer',
                        description: 'Humedece tu piel y el jabón con agua tibia. Para mejores resultados, utiliza agua filtrada para evitar la dureza que puede afectar la espuma.',
                        icon: (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14c0 5-5 5-5 5s-5 0-5-5 5-5 5-5 5 0 5 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v8" />
                          </svg>
                        ),
                        gradient: 'from-blue-400 to-cyan-500'
                      },
                      {
                        step: 2,
                        title: 'Aplicar',
                        description: 'Frota el jabón entre tus manos para crear una rica espuma o utiliza directamente sobre la piel con movimientos circulares suaves.',
                        icon: (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                          </svg>
                        ),
                        gradient: 'from-purple-400 to-pink-500'
                      },
                      {
                        step: 3,
                        title: 'Enjuagar',
                        description: 'Enjuaga completamente con agua tibia hasta eliminar todos los residuos de jabón. Termina con agua fresca para cerrar los poros.',
                        icon: (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ),
                        gradient: 'from-green-400 to-emerald-500'
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.step}
                        className='group relative overflow-hidden bg-gradient-to-br from-white/80 to-blue-50/40 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50'
                        initial={{ opacity: 0, y: 50, rotateY: -15 }}
                        animate={{ opacity: 1, y: 0, rotateY: 0 }}
                        transition={{ 
                          delay: 0.2 + index * 0.2,
                          duration: 0.6,
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{ 
                          scale: 1.05, 
                          rotateY: 5,
                          transition: { duration: 0.3 }
                        }}
                      >
                        {/* Background gradient effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                        
                        {/* Step number with enhanced design */}
                        <div className="relative z-10">
                          <div className="flex items-center mb-4">
                            <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mr-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                              <div className="text-white">
                                {item.icon}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                                Paso {item.step}
                              </div>
                              <h4 className='font-bold text-xl text-neutral-800'>
                                {item.title}
                              </h4>
                            </div>
                          </div>
                          <p className='text-neutral-600 leading-relaxed'>
                            {item.description}
                          </p>
                        </div>

                        {/* Decorative corner */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-full"></div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div 
                    className='text-neutral-700 space-y-6'
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className='text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'>
                        Consejos para prolongar la vida útil
                      </h4>
                    </div>

                    <div className='bg-gradient-to-r from-white/80 to-orange-50/40 rounded-3xl shadow-lg p-6 border border-orange-100/50'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {[
                          {
                            tip: 'Mantén el jabón en una jabonera que permita el drenaje del agua después de cada uso.',
                            icon: '🧼'
                          },
                          {
                            tip: 'Evita dejar el jabón en contacto directo con el agua o en zonas muy húmedas.',
                            icon: '💧'
                          },
                          {
                            tip: 'Para maximizar su duración, permite que el jabón se seque completamente entre usos.',
                            icon: '⏰'
                          },
                          {
                            tip: 'Corta la pastilla en trozos más pequeños para extender su uso si lo prefieres.',
                            icon: '✂️'
                          },
                        ].map((item, index) => (
                          <motion.div 
                            key={index} 
                            className='group flex items-start p-4 bg-white/60 rounded-2xl border border-white/40 hover:shadow-lg transition-all duration-300'
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 + index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                              {item.icon}
                            </div>
                            <p className='text-sm leading-relaxed text-neutral-700'>
                              {item.tip}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <motion.div 
                      className='mt-8 p-6 bg-gradient-to-r from-blue-50/80 to-purple-50/60 rounded-3xl border border-blue-200/50 shadow-lg relative overflow-hidden'
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      {/* Decorative background */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-200/30 to-transparent rounded-bl-full"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/30 to-transparent rounded-tr-full"></div>
                      
                      <div className='flex items-start relative z-10'>
                        <div className='bg-gradient-to-br from-purple-500 to-blue-600 p-3 rounded-2xl mr-4 shadow-lg'>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className='font-bold text-lg text-purple-800 mb-3'>
                            Consejo profesional
                          </h5>
                          <p className='text-neutral-700 leading-relaxed'>
                            Para una experiencia de spa en casa, crea una bolsita
                            de algodón o sisal y coloca dentro trozos de jabón.
                            Utilízala como esponja natural para exfoliar
                            suavemente mientras te beneficias de las propiedades
                            del jabón.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key='reviews'
                  id='panel-reviews'
                  role='tabpanel'
                  aria-labelledby='tab-reviews'
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className='focus:outline-none relative z-10'
                  tabIndex={0}
                >
                  <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6'>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                      <h3 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent'>
                        Valoraciones de clientes
                      </h3>
                    </div>
                    <motion.button 
                      className='group bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex-shrink-0 flex items-center gap-2'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Escribir valoración
                    </motion.button>
                  </div>

                  {/* Resumen de valoraciones mejorado */}
                  <motion.div 
                    className='bg-gradient-to-r from-yellow-50/80 to-orange-50/60 p-8 rounded-3xl mb-8 shadow-xl border border-yellow-200/50 relative overflow-hidden'
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-yellow-200/20 to-transparent rounded-bl-full"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-200/20 to-transparent rounded-tr-full"></div>

                    <div className='flex flex-col lg:flex-row items-center lg:items-start gap-8 relative z-10'>
                      <motion.div 
                        className='text-center lg:border-r lg:border-yellow-200/50 lg:pr-8'
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className='text-6xl font-bold bg-gradient-to-br from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2'>
                          {product.rating.toFixed(1)}
                        </div>
                        <div className='flex justify-center mb-3'>
                          <ReviewStars rating={product.rating} size='large' />
                        </div>
                        <div className='text-sm text-neutral-600 font-medium'>
                          Basado en <span className="font-bold text-orange-600">{product.reviews}</span> valoraciones
                        </div>
                      </motion.div>

                      <div className='w-full max-w-md'>
                        {[5, 4, 3, 2, 1].map((stars, index) => {
                          const percentage =
                            stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1;
                          return (
                            <motion.div 
                              key={stars} 
                              className='flex items-center mb-3'
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                            >
                              <div className='flex items-center mr-3'>
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < stars ? 'text-yellow-400' : 'text-neutral-300'
                                    }`}
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                  >
                                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                  </svg>
                                ))}
                              </div>
                              <div className='w-full bg-neutral-200 rounded-full h-3 relative overflow-hidden'>
                                <motion.div
                                  className='bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full'
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                                ></motion.div>
                              </div>
                              <span className='ml-3 text-sm text-neutral-600 font-medium w-10'>
                                {percentage}%
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>

                  {/* Lista de valoraciones mejorada */}
                  <div className='space-y-6'>
                    {[
                      {
                        name: 'Marina S.',
                        date: '15/04/2025',
                        rating: 5,
                        comment: '¡Increíble producto! El aroma es maravilloso y mi piel se siente muy suave después de usarlo. Sin duda repetiré.',
                        avatar: '👩‍🦰'
                      },
                      {
                        name: 'Carlos P.',
                        date: '02/04/2025',
                        rating: 4,
                        comment: 'Muy buen jabón, la piel queda hidratada y no reseca como otros. El envío fue rápido y bien empaquetado.',
                        avatar: '👨‍💼'
                      },
                      {
                        name: 'Laura M.',
                        date: '28/03/2025',
                        rating: 5,
                        comment: 'Lo compré como regalo y a mi madre le encantó. Dice que el aroma es muy natural y agradable, y que nota la piel más suave.',
                        avatar: '👩‍🎨'
                      },
                    ].map((review, index) => (
                      <motion.div
                        key={index}
                        className='group bg-gradient-to-r from-white/80 to-neutral-50/40 p-6 rounded-3xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden'
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.2 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {/* Decorative gradient */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-100/30 to-transparent rounded-bl-full"></div>

                        <div className='flex justify-between items-start mb-4 relative z-10'>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                              {review.avatar}
                            </div>
                            <div>
                              <h4 className='font-bold text-lg text-neutral-800'>
                                {review.name}
                              </h4>
                              <div className='flex items-center gap-3'>
                                <ReviewStars rating={review.rating} size='small' />
                                <span className='text-xs text-neutral-500 font-medium'>
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          {review.rating === 5 && (
                            <div className='bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-3 py-2 rounded-full flex items-center gap-1 shadow-lg'>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Compra verificada
                            </div>
                          )}
                        </div>
                        <p className='text-neutral-700 leading-relaxed relative z-10 pl-16'>
                          "{review.comment}"
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Botón para cargar más mejorado */}
                  <motion.div 
                    className='mt-8 text-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    <motion.button 
                      className='group bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 text-primary-700 font-semibold border-2 border-primary-200 hover:border-primary-300 rounded-2xl px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Ver más valoraciones
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}