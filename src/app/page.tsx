import FeaturedProducts from '@/components/home/FeaturedProducts';
import Hero from '@/components/home/Hero';
import Benefits from '@/components/products/Benefits';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function Home() {
  return (
    <>
      <Hero />
      <WhatsAppButton />
      <FeaturedProducts />
      <Benefits />
    </>
  );
}
