import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import ProjectsGallery from '@/components/projects-gallery';
import StatsSection from '@/components/stats-section';
import Testimonials from '@/components/testimonials';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import WaveDivider from '@/components/wave-divider';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      <WaveDivider fromColor="#f9fafb" toColor="#111827" />
      <About />
      <WaveDivider fromColor="#f9fafb" toColor="#111827" flip={true} />

      <ProjectsGallery />

      <WaveDivider fromColor="#f9fafb" toColor="#111827" />
      <StatsSection />
      <WaveDivider fromColor="#f9fafb" toColor="#111827" flip={true} />

      <WaveDivider fromColor="#000000" toColor="#f9fafb" flip={true} />
      <Testimonials />
      <WaveDivider fromColor="#f9fafb" toColor="#111827" />

      <Contact />
      <Footer />
    </main>
  );
}
