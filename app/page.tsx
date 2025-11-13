import GoogleGeminiEffectDemo from '@/components/google-gemini-effect-demo';
import FeaturedList from '@/components/featured/FeaturedList';
import AboutSection from '@/components/sections/AboutSection';

export default function HomePage() {
  return (
    <>
      {/* Hero with Google Gemini Effect - Scroll Animation */}
      <GoogleGeminiEffectDemo />

      {/* Featured Projects Section */}
      <FeaturedList />

      {/* About Section Shell */}
      <AboutSection />
    </>
  );
}