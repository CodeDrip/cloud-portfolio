"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2, Braces, Server, Terminal, Share2, Database,
  Cloud, Box, Layers, GitBranch, Activity,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionReveal } from "@/components/ui/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

const CORE_COMPETENCIES = [
  { label: "React & Next.js", icon: Code2 },
  { label: "TypeScript & JavaScript", icon: Braces },
  { label: "Node.js", icon: Server },
  { label: "Python & Django", icon: Terminal },
  { label: "REST APIs", icon: Share2 },
  { label: "PostgreSQL & MongoDB", icon: Database },
];

const TOOLS_TECHNOLOGIES = [
  { label: "AWS (EC2, S3, Lambda, RDS)", icon: Cloud },
  { label: "Docker & Kubernetes", icon: Box },
  { label: "Terraform & CloudFormation", icon: Layers },
  { label: "CI/CD (GitHub Actions, Jenkins)", icon: GitBranch },
  { label: "Linux & Bash Scripting", icon: Terminal },
  { label: "Monitoring (Prometheus, Grafana)", icon: Activity },
];

const SKILL_BARS = [
  { skill: "React / Next.js", percentage: 95 },
  { skill: "TypeScript", percentage: 92 },
  { skill: "Node.js", percentage: 90 },
  { skill: "Python", percentage: 85 },
  { skill: "AWS Cloud Services", percentage: 88 },
  { skill: "Docker & Kubernetes", percentage: 82 },
  { skill: "Terraform / IaC", percentage: 80 },
  { skill: "PostgreSQL", percentage: 87 },
];

function SkillBar({ skill, percentage, index }: { skill: string; percentage: number; index: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!barRef.current) return;
    gsap.from(barRef.current.querySelector(".bar-fill"), {
      width: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: index * 0.1,
      scrollTrigger: {
        trigger: barRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: barRef });

  return (
    <div ref={barRef} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium uppercase tracking-wide text-white">{skill}</span>
        <span className="text-xs font-medium tracking-[0.05em] text-[#ec4899]">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-[#27272a] rounded-full overflow-hidden">
        <div
          className="bar-fill h-full rounded-full"
          style={{ width: `${percentage}%`, background: "linear-gradient(90deg, #be185d, #ec4899)" }}
        />
      </div>
    </div>
  );
}

function SkillIcon({ label, icon: Icon }: { label: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-[#171717] border border-[#27272a] flex items-center justify-center shrink-0">
        <Icon size={20} className="text-[#ec4899]" />
      </div>
      <span className="text-sm text-white leading-tight">{label}</span>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-[clamp(80px,10vh,120px)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-0.5 bg-[#ec4899]" />
                <h3 className="text-lg font-normal uppercase tracking-wide text-white">Core Competencies</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CORE_COMPETENCIES.map((item) => (
                  <SkillIcon key={item.label} {...item} />
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-0.5 bg-[#ec4899]" />
                <h3 className="text-lg font-normal uppercase tracking-wide text-white">Tools & Technologies</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TOOLS_TECHNOLOGIES.map((item) => (
                  <SkillIcon key={item.label} {...item} />
                ))}
              </div>
            </GlassCard>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-16">
            <h3 className="text-lg font-normal uppercase tracking-wide text-white mb-8">Proficiency Levels</h3>
            <div className="space-y-6">
              {SKILL_BARS.map((item, index) => (
                <SkillBar key={item.skill} {...item} index={index} />
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
