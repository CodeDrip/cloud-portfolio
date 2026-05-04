"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}

export function SectionReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      delay,
    };

    if (direction === "up") {
      fromVars.y = 30;
    } else if (direction === "left") {
      fromVars.x = -20;
    } else if (direction === "right") {
      fromVars.x = 20;
    }

    gsap.from(ref.current, {
      ...fromVars,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
