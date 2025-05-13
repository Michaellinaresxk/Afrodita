import {
  Check,
  Leaf,
  Recycle,
  ShieldCheck,
  Clock,
  HeartHandshake,
} from 'lucide-react';

export const benefits = [
  {
    id: 1,
    icon: <Leaf className='w-6 h-6' />,
    title: '100% Natural',
    description:
      'Elaborados exclusivamente con ingredientes de origen natural, sin químicos ni fragancias artificiales.',
    color: 'bg-gradient-to-br from-emerald-50 to-green-100',
    iconBg: 'bg-gradient-to-br from-emerald-400 to-green-500',
    borderColor: 'border-emerald-200',
  },
  {
    id: 2,
    icon: <Recycle className='w-6 h-6' />,
    title: 'Producción Sostenible',
    description:
      'Comprometidos con el medio ambiente utilizando procesos y envases ecológicos que minimizan nuestra huella.',
    color: 'bg-gradient-to-br from-blue-50 to-cyan-100',
    iconBg: 'bg-gradient-to-br from-blue-400 to-cyan-500',
    borderColor: 'border-blue-200',
  },
  {
    id: 3,
    icon: <ShieldCheck className='w-6 h-6' />,
    title: 'Dermatológicamente Testado',
    description:
      'Formulados para ser suaves y seguros con todo tipo de pieles, incluso las más sensibles.',
    color: 'bg-gradient-to-br from-rose-50 to-pink-100',
    iconBg: 'bg-gradient-to-br from-rose-400 to-pink-500',
    borderColor: 'border-rose-200',
  },
];

// Stats data
export const stats = [
  {
    icon: <Check className='w-6 h-6' />,
    value: '100%',
    label: 'Ingredientes naturales',
    color: 'bg-primary-50',
    iconColor: 'text-primary-600',
    iconBg: 'bg-primary-100',
  },
  {
    icon: <Clock className='w-6 h-6' />,
    value: '24/48h',
    label: 'Entrega en península',
    color: 'bg-secondary-50',
    iconColor: 'text-secondary-600',
    iconBg: 'bg-secondary-100',
  },
  {
    icon: <HeartHandshake className='w-6 h-6' />,
    value: '10k+',
    label: 'Clientes satisfechos',
    color: 'bg-rose-50',
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-100',
  },
];
