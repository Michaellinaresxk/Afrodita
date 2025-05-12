import { motion } from 'framer-motion';

export const TimelineEvent = ({
  year,
  title,
  description,
  position = 'left',
  isActive = false,
}) => {
  const isLeft = position === 'left';

  return (
    <motion.div className='relative'>
      <div className='flex items-center justify-center'>
        <div
          className={`absolute z-10 w-8 h-8 rounded-full ${
            isActive ? 'bg-secondary-500' : 'bg-primary-500'
          } 
          border-4 border-white shadow-lg flex items-center justify-center`}
        >
          {isActive && (
            <>
              <div className='w-3 h-3 bg-white rounded-full animate-ping absolute opacity-75'></div>
              <div className='w-2 h-2 bg-white rounded-full'></div>
            </>
          )}
        </div>
      </div>
      <div className='flex flex-col md:flex-row items-center'>
        <div
          className={`md:w-1/2 ${
            isLeft ? 'md:pr-8 md:text-right' : 'md:order-last md:pl-8'
          } mb-4 md:mb-0`}
        >
          <div
            className={`
            ${
              isActive
                ? 'bg-secondary-50 border border-secondary-100'
                : 'bg-white'
            } 
            p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow
          `}
          >
            <span
              className={`inline-block ${
                isActive ? 'text-secondary-600' : 'text-primary-600'
              } font-bold mb-2`}
            >
              {year}
            </span>
            <h3 className='text-xl font-bold text-gray-800 mb-3'>{title}</h3>
            <p className='text-gray-600 leading-relaxed'>{description}</p>
          </div>
        </div>
        <div className='md:w-1/2'></div>
      </div>
    </motion.div>
  );
};
