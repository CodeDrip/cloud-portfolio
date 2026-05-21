"use client";

import { Download } from "lucide-react";
// import { SectionReveal } from "@/components/ui/SectionReveal";
import { SectionReveal } from "@/components/ui/SectionReveal";


function WaveUnderline() {
  return (
    <svg width="120" height="12" viewBox="0 0 120 12" className="mt-2">
      <path
        d="M0 6 Q 15 0, 30 6 T 60 6 T 90 6 T 120 6"
        fill="none"
        stroke="#ec4899"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ComputerIllustration() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[400px] animate-float"
    >
      <rect
        x="60" y="40" width="280" height="200" rx="12"
        stroke="#a1a1aa" strokeWidth="2" fill="#171717"
      />
      <rect
        x="75" y="55" width="250" height="170" rx="6"
        fill="url(#screenGradient)" opacity="0.3"
      />
      <text
        x="200" y="150" textAnchor="middle"
        fill="#ec4899" fontSize="48" fontFamily="monospace" fontWeight="300"
      >
        {"</>"}
      </text>
      <path
        d="M170 240 L230 240 L220 280 L180 280 Z"
        stroke="#a1a1aa" strokeWidth="2" fill="#27272a"
      />
      <rect
        x="140" y="280" width="120" height="12" rx="6"
        stroke="#a1a1aa" strokeWidth="2" fill="#27272a"
      />
      <rect
        x="80" y="320" width="240" height="50" rx="8"
        stroke="#a1a1aa" strokeWidth="2" fill="#171717"
      />
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={92 + col * 22} y={330 + row * 8}
            width="16" height="5" rx="2"
            fill="#27272a"
          />
        ))
      )}
      <defs>
        <linearGradient id="screenGradient" x1="75" y1="55" x2="325" y2="225" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ec4899" stopOpacity="0.2" />
          <stop offset="1" stopColor="#be185d" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative py-[clamp(80px,10vh,120px)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            <div className="w-full lg:w-[55%]">
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.2] tracking-[-0.01em] uppercase text-white">
                About Me
              </h2>
              <WaveUnderline />

              <div className="mt-8 space-y-6">
                <p className="text-base leading-[1.7] text-[#a1a1aa]">
                  I am a passionate Full Stack Developer and Cloud Engineer with extensive
                  experience supporting applications and scalable cloud
                  infrastructure.
                </p>
                <p className="text-base leading-[1.7] text-[#a1a1aa]">
                  With a strong foundation in both development and operations, I bridge the gap
                  between code and infrastructure, ensuring that applications are not only
                  well-built but also resilient, secure, and cost-optimized in production
                  environments.
                </p>
              </div>

              <div className="mt-8">
                  <a className="cta-button" href="/1_Dhaesha_Myers_Resume.pdf" download>
                  <Download size={16} />
                  View My Resume
                </a>
              </div>
            </div>

            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
              <ComputerIllustration />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
