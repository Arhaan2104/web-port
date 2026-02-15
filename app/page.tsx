import GoogleGeminiEffectDemo from '@/components/google-gemini-effect-demo';
import FeaturedList from '@/components/featured/FeaturedList';
import AboutSection from '@/components/sections/AboutSection';
import SectionDots from '@/components/ui/SectionDots';

export default function HomePage() {
  return (
    <>
      {/* Section progress dots — fixed left side */}
      <SectionDots />

      {/* Hero with Google Gemini Effect - Scroll Animation */}
      <GoogleGeminiEffectDemo />

      {/* Featured Projects Section */}
      <FeaturedList />

      {/* About Section Shell */}
      <AboutSection />
    </>
  );
}