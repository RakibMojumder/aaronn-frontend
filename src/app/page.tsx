import { AboutSection } from "@/components/sections/About";
import { HeroSection } from "@/components/sections/Hero";
import { ProjectsSection } from "@/components/sections/Projects";
import { TestimonialSection } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TestimonialSection />
    </div>
  );
}
