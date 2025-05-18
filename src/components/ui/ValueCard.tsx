import { motion } from 'framer-motion';
// @ts-ignore
const ValueCard = ({ icon, title, description, color }) => (
  <motion.div
    whileHover={{
      y: -5,
      boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    }}
    className='bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300'
  >
    <div className={`h-2 ${color}`}></div>
    <div className='p-8'>
      <div
        className={`w-12 h-12 ${color} bg-opacity-10 rounded-xl flex items-center justify-center mb-6`}
      >
        {icon}
      </div>
      <h3 className='text-xl font-bold text-gray-800 mb-3'>{title}</h3>
      <p className='text-gray-600 leading-relaxed'>{description}</p>
    </div>
  </motion.div>
);
export default ValueCard;
