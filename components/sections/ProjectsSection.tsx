"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "S3 Cloud Deployment",
    description: "Deloyed my 2022  portfolio to S3",
    tech: ["React", "AWS S3", "IAM"],
    image: "/assets/project-thumb-1.jpg",
    link: "https://cloud-22-portfolio-deployment.s3.us-east-1.amazonaws.com/index.html",
  },
  {
    title: "AI Trading Bot",
    description: "An automated cryptocurrency trading platform with real-time market analysis, custom strategy builder, and portfolio tracking dashboard.",
    tech: ["Python", "FastAPI", "WebSockets", "Docker"],
    image: "/assets/project-thumb-2.jpg",
    link: "",
  },
  {
    title: "Incident Tracking System",
    description: "A full-featured incident management system for enterprise IT operations with role-based access, SLA monitoring, and automated escalation workflows.",
    tech: ["Next.js", "PostgreSQL", "AWS Lambda"],
    image: "/assets/project-thumb-3.jpg",
    link: "",
  },
  {
    title: "Interactive Resume",
    description: "A personal portfolio and resume website with dynamic content loading, print-friendly layout, and contact form integration.",
    tech: ["React", "Framer Motion", "Vercel"],
    image: "/assets/project-thumb-4.jpg",
    link: "",
  },
];

function ArrowDecoration() {
  return (
    <svg width="200" height="80" viewBox="0 0 200 80" fill="none" className="hidden lg:block">
      <path
        d="M10 10 C 60 10, 100 30, 140 50 C 160 60, 175 65, 190 68"
        stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
      />
      <polygon points="190,63 196,68 190,73 184,68" fill="#a1a1aa" />
    </svg>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <div className="project-card glass-card p-0 overflow-hidden group">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={project.image} alt={project.title} fill className="project-image object-cover" />
        <div className="project-overlay">
          <h4 className="text-xl font-medium text-white text-center mb-2">{project.title}</h4>
          <p className="text-sm text-[#a1a1aa] text-center mb-4 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{ background: "rgba(236, 72, 153, 0.15)", color: "#ec4899" }}
              >
                {t}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-sm text-[#ec4899] hover:underline cursor-pointer">
            <ExternalLink size={14} />
              <a href={project.link}
              target="_blank" 
              rel="noopener noreferrer">
                 View Project
              </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".project-card");
    gsap.from(cards, {
      opacity: 0, y: 30, duration: 0.6, ease: "power3.out", stagger: 0.15,
      scrollTrigger: { trigger: gridRef.current, start: "top 80%", toggleActions: "play none none none" },
    });
  }, { scope: gridRef });

  return (
    <section id="projects" className="relative py-[clamp(80px,10vh,120px)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="flex items-start justify-between mb-12">
            <div>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.2] tracking-[-0.01em] uppercase text-white">
                Notable Projects
              </h2>
            </div>
            <ArrowDecoration />
          </div>
        </SectionReveal>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
