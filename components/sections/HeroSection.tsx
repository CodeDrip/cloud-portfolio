"use client";

import Image from "next/image";
import { StarfieldCanvas } from "../../components/ui/StarfieldCanvas";
import { CardCarousel } from "../../components/ui/CardCarousel";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <StarfieldCanvas />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
          <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="text-xs font-medium tracking-[0.05em] uppercase text-[#a1a1aa] mb-4">
              Full Stack Web Developer & Cloud Engineer
            </p>

            <h1 className="glowing-name text-[clamp(3rem,8vw,6rem)] font-extralight leading-[1.1] tracking-[-0.02em] uppercase text-white">
              Dhaesha
              <br />
              Myers
            </h1>

            <div className="mt-6 lg:mt-4 w-[200px] h-[200px] lg:w-[280px] lg:h-[280px] relative">
              <Image
                src="/assets/profile-portrait.png"
                alt="Dhaesha Myers portrait illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="hidden lg:block w-[55%] h-[500px]">
            <CardCarousel />
          </div>

          <div className="lg:hidden flex flex-wrap justify-center gap-2 mt-4">
            {[
              "REACT", "TYPESCRIPT", "NODE.JS", "PYTHON", "AWS",
              "DOCKER", "KUBERNETES", "TERRAFORM", "GRAPHQL", "POSTGRESQL", "LINUX", "CI/CD",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-[#171717] border border-[#27272a] rounded-full text-[0.65rem] font-medium tracking-wider uppercase text-[#a1a1aa]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
