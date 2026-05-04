"use client";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

export function GlassCard({ children, className, padding = "md" }: GlassCardProps) {
  const paddingClass = {
    sm: "p-4",
    md: "p-6",
    lg: "p-10",
  }[padding];

  return (
    <div className={cn("glass-card", paddingClass, className)}>
      {children}
    </div>
  );
}
