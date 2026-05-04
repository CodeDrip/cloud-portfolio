import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { Navbar } from "@/components/sections/Navbar";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { GlassCard } from "@/components/ui/GlassCard";


export default function Home() {
  return (
    <div className="">
      <main className="">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
      </main>
    </div>
  );
}
