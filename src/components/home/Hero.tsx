'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Smooth mouse tracking
  const smoothMousePosition = useSpring({ x: 0, y: 0 }, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
        smoothMousePosition.set({ x: x - 0.5, y: y - 0.5 });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [smoothMousePosition]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-50 via-primary-50/20 to-neutral-100 pt-20 md:pt-24"
      style={{ opacity, scale }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(79, 70, 229, 0.1) 0%, 
              rgba(79, 70, 229, 0.05) 25%, 
              transparent 50%)`
          }}
        />
        
        {/* Floating Soap Bubbles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/30 backdrop-blur-sm"
            style={{
              width: Math.random() * 40 + 15,
              height: Math.random() * 40 + 15,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-15, -30, -15],
              x: [-8, 8, -8],
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Interactive Light Rays */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `conic-gradient(from ${mousePosition.x * 360}deg at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
            transparent 0deg, 
            rgba(79, 70, 229, 0.08) 60deg, 
            rgba(79, 70, 229, 0.06) 120deg, 
            transparent 180deg)`
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex items-center py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 lg:space-y-8 order-2 lg:order-1"
          >
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-gradient-to-r from-primary-100/80 to-primary-200/60 backdrop-blur-xl border border-primary-200/50 shadow-lg">
                <motion.div
                  className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs lg:text-sm font-semibold text-primary-800 tracking-wide">
                  ✨ Hecho a Mano con Amor
                </span>
              </div>
            </motion.div>

            {/* Dynamic Title */}
            <div className="space-y-2 lg:space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight lg:leading-none"
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800">
                  Jabones
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary-600 via-secondary-700 to-secondary-800">
                  Artesanales
                </span>
                <motion.span
                  className="block text-neutral-800 relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  Premium
                  <motion.div
                    className="absolute -bottom-1 lg:-bottom-2 left-0 h-2 lg:h-3 bg-gradient-to-r from-primary-300/60 to-secondary-300/60 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.5, duration: 1.2 }}
                  />
                </motion.span>
              </motion.h1>
            </div>

            {/* Animated Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="space-y-4 lg:space-y-6"
            >
              <p className="text-lg lg:text-xl text-neutral-700 leading-relaxed max-w-lg">
                Descubre la <span className="font-semibold text-primary-700">pureza natural</span> en cada barra. 
                Nuestros jabones artesanales combinan <span className="font-semibold text-secondary-700">ingredientes orgánicos</span> 
                con técnicas tradicionales para crear una experiencia de lujo para tu piel.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {[
                  { icon: "🌿", text: "100% Natural", color: "from-primary-500 to-primary-600" },
                  { icon: "🏺", text: "Hecho a Mano", color: "from-secondary-500 to-secondary-600" },
                  { icon: "🌍", text: "Eco-Friendly", color: "from-neutral-500 to-neutral-600" },
                  { icon: "💎", text: "Premium", color: "from-primary-600 to-secondary-600" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-gradient-to-r ${feature.color} text-white font-medium text-xs lg:text-sm shadow-lg flex items-center gap-2`}
                  >
                    <span>{feature.icon}</span>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2 lg:pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/60 to-secondary-500/60 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                <Link
                  href="/products"
                  className="relative bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-2xl font-semibold text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 lg:gap-3 group"
                >
                  <span>Explorar Colección</span>
                  <motion.svg
                    className="w-4 h-4 lg:w-5 lg:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/about"
                  className="px-6 py-3 lg:px-8 lg:py-4 rounded-2xl font-semibold text-base lg:text-lg border-2 border-primary-500 text-primary-600 hover:bg-primary-50 transition-all duration-300 flex items-center justify-center gap-2 lg:gap-3"
                >
                  <span>Nuestro Proceso</span>
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-64 sm:h-80 lg:h-full flex items-center justify-center order-1 lg:order-2"
          >
            {/* Main Product Circle */}
            <div className="relative w-[500px] h-[500px]">
              
              {/* Rotating Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-amber-300/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Central Product Container */}
              <motion.div
                className="absolute inset-16 rounded-full bg-gradient-to-br from-white/80 to-amber-50/80 backdrop-blur-xl shadow-2xl border border-white/50 overflow-hidden"
                style={{
                  transform: useTransform(
                    smoothMousePosition,
                    ({ x, y }) => `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
                  ),
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-orange-100/30" />
                
                {/* Main Product Image */}
                <motion.div
                  className="relative w-full h-full flex items-center justify-center"
                  animate={{
                    y: [0, -10, 0],
                    rotateY: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/img/jabon.jpg"
                    alt="Jabón artesanal premium"
                    width={300}
                    height={300}
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>

              {/* Orbiting Product Variants */}
              {[
                { angle: 0, image: "/img/jabon.jpg", label: "Lavanda", color: "from-purple-400 to-purple-600" },
                { angle: 120, image: "/img/jabon.jpg", label: "Miel", color: "from-yellow-400 to-amber-500" },
                { angle: 240, image: "/img/jabon.jpg", label: "Coco", color: "from-cyan-400 to-blue-500" },
              ].map((product, index) => (
                <motion.div
                  key={product.label}
                  className="absolute w-20 h-20 rounded-full bg-white/90 backdrop-blur-xl shadow-xl border border-white/50 overflow-hidden cursor-pointer"
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: "-40px",
                    marginTop: "-40px",
                  }}
                  animate={{
                    rotate: [product.angle, product.angle + 360],
                    x: [0, 0],
                    y: [0, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                >
                  <motion.div
                    className="w-full h-full flex items-center justify-center relative"
                    animate={{
                      rotate: [0, -360],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      transform: `translateX(${200 * Math.cos((product.angle * Math.PI) / 180)}px) translateY(${200 * Math.sin((product.angle * Math.PI) / 180)}px)`,
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.label}
                      width={60}
                      height={60}
                      className="object-contain rounded-full"
                    />
                    
                    {/* Product Label */}
                    <motion.div
                      className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r ${product.color} text-white text-xs font-semibold shadow-lg whitespace-nowrap`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {product.label}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Info Cards */}
            <motion.div
              className="absolute top-16 -right-4 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800">Ingredientes Naturales</p>
                  <p className="text-xs text-neutral-600">Sin químicos dañinos</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-16 -left-4 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">★</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800">Calidad Premium</p>
                  <p className="text-xs text-neutral-600">Hecho con amor</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-sm text-neutral-600 font-medium">Descubre Más</span>
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 bg-amber-400 rounded-full"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}