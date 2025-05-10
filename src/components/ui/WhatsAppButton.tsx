import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '+18496249869';
  const message = encodeURIComponent('Hola, tengo una consulta.');
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target='_blank'
      rel='noopener noreferrer'
      className='fixed bottom-6 right-6 bg-green-500 text-white rounded-full shadow-lg p-3 z-50 transition-transform hover:scale-105 flex items-center justify-center'
    >
      <FaWhatsapp className='w-6 h-6' />
    </a>
  );
};

export default WhatsAppButton;
