'use client';

import React from 'react';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { faqs } from '@/constants/faqs';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { contactInfo } from '@/components/ui/ContactInfo';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'faq'>('contact');

  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }, 3000);
    }, 1500);
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      {/* Modern hero header */}
      <div className="relative h-96 overflow-hidden bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900">
        <Image
          src="/img/productos/jabon-6.jpg"
          alt="Contáctanos - Afrodita Jabones"
          fill
          style={{ objectFit: 'cover' }}
          priority
          quality={90}
          className="opacity-40"
        />
        
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-emerald-900/40 to-gray-900/70" />
        
        {/* Organic separator at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-20">
          <svg
            className="absolute bottom-0 w-full h-20 text-stone-50"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="relative h-full flex items-center justify-center text-center z-10">
          <div className="max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-medium text-white/90">
                Estamos aquí para ayudarte
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-light text-5xl md:text-6xl text-white mb-6 leading-tight"
            >
              Contáctanos
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed font-light"
            >
              Estamos aquí para responder tus preguntas y ayudarte a encontrar
              el producto perfecto para el cuidado de tu piel.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Modern tab navigation */}
      <div className="bg-gradient-to-r from-stone-50 to-emerald-50/30 border-b border-emerald-200/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex bg-white/60 backdrop-blur-sm rounded-2xl p-2 my-4 border border-emerald-200/30 shadow-lg">
              <button
                onClick={() => setActiveTab('contact')}
                className={`relative flex items-center gap-2 py-3 px-6 font-medium text-sm rounded-xl transition-all duration-300 ${
                  activeTab === 'contact'
                    ? 'bg-white text-emerald-700 shadow-md'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-white/50'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Formulario de Contacto</span>
                {activeTab === 'contact' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-md -z-10"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('faq')}
                className={`relative flex items-center gap-2 py-3 px-6 font-medium text-sm rounded-xl transition-all duration-300 ${
                  activeTab === 'faq'
                    ? 'bg-white text-emerald-700 shadow-md'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-white/50'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Preguntas Frecuentes</span>
                {activeTab === 'faq' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-md -z-10"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-gradient-to-br from-stone-50 via-white to-emerald-50/30 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Contact form tab */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Contact information */}
              <div className="lg:col-span-1">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-emerald-200/30 p-8 h-full"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-light text-gray-900">
                      Información de Contacto
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50/50 to-teal-50/30 border border-emerald-200/30 hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-200 transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {item.title}
                          </h3>
                          <a
                            href={item.link}
                            className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
                          >
                            {item.info}
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Social media */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Síguenos
                    </h3>
                    <div className="flex gap-3">
                      {[
                        {
                          name: 'Facebook',
                          icon: (
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                          )
                        },
                        {
                          name: 'Instagram',
                          icon: (
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                          )
                        },
                        {
                          name: 'Twitter',
                          icon: (
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          )
                        }
                      ].map((social, idx) => (
                        <motion.a
                          key={social.name}
                          href="#"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-12 h-12 rounded-xl bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center text-emerald-600 hover:text-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                          <span className="sr-only">{social.name}</span>
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            {social.icon}
                          </svg>
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Business hours */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Horario de Atención
                    </h3>
                    <div className="space-y-3">
                      {[
                        { days: 'Lunes - Viernes', hours: '9:00 - 19:00' },
                        { days: 'Sábado', hours: '10:00 - 14:00' },
                        { days: 'Domingo', hours: 'Cerrado' }
                      ].map((schedule, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50/30">
                          <span className="text-gray-700">{schedule.days}:</span>
                          <span className="font-medium text-gray-900">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Contact form */}
              <div className="lg:col-span-2">
                <motion.div
                  ref={formRef}
                  variants={fadeInUpVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-emerald-200/30 p-8 lg:p-12"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-light text-gray-900">
                      Envíanos un Mensaje
                    </h2>
                  </div>

                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre completo
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            className="w-full px-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formState.email}
                            onChange={handleChange}
                            className="w-full px-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Asunto
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          value={formState.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
                          placeholder="¿En qué podemos ayudarte?"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Mensaje
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          value={formState.message}
                          onChange={handleChange}
                          className="w-full px-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
                          placeholder="Escribe tu mensaje aquí..."
                        />
                      </div>

                      <div className="flex items-start gap-3">
                        <input
                          id="privacy"
                          name="privacy"
                          type="checkbox"
                          required
                          className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <label htmlFor="privacy" className="text-sm text-gray-600">
                          He leído y acepto la{' '}
                          <Link
                            href="/privacidad"
                            className="text-emerald-600 hover:text-emerald-700 underline font-medium"
                          >
                            política de privacidad
                          </Link>
                        </label>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex justify-center items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Enviando mensaje...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Enviar mensaje
                          </>
                        )}
                      </motion.button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-light text-gray-900 mb-4">
                        ¡Mensaje enviado!
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Gracias por contactarnos. Te responderemos lo antes posible.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          )}

          {/* FAQ tab */}
          {activeTab === 'faq' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-16">
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-emerald-200/30 shadow-sm mb-6"
                >
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-emerald-800">
                    Dudas comunes
                  </span>
                </motion.div>

                <motion.h2 
                  variants={itemVariants}
                  className="font-light text-4xl md:text-5xl text-gray-900 mb-6"
                >
                  Preguntas Frecuentes
                </motion.h2>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-xl text-gray-600 leading-relaxed"
                >
                  Encuentra respuestas a las preguntas más comunes sobre
                  nuestros productos y servicios.
                </motion.p>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-200/30 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-8 hover:bg-emerald-50/30 transition-colors">
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-open:rotate-180 transition-transform duration-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </summary>
                      <div className="px-8 pb-8 text-gray-600 leading-relaxed text-lg">
                        {faq.answer}
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={fadeInUpVariants}
                className="mt-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-12 text-center border border-emerald-200/30"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  ¿No encuentras la respuesta que buscas?
                </h3>
                
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Nuestro equipo de atención al cliente está disponible para
                  ayudarte con cualquier duda o consulta que tengas.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('contact')}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contáctanos
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
      
      <WhatsAppButton />
    </>
  );
}