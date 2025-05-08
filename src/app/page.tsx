import FeaturedProducts from '@/components/home/FeaturedProducts';
import Hero from '@/components/home/Hero';
import Newsletter from '@/components/home/Newsletter';
import Testimonials from '@/components/home/Testimonials';
import Benefits from '@/components/products/Benefits';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Benefits />
      <Testimonials />
      <Newsletter />
    </>
  );
}
