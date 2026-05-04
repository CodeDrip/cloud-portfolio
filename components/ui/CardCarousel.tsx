"use client";

import { useRef, useEffect, useState } from "react";

const CARD_LABELS = [
  "REACT",
  "TYPESCRIPT",
  "NODE.JS",
  "PYTHON",
  "AWS",
  "DOCKER",
  "KUBERNETES",
  "TERRAFORM",
  "GRAPHQL",
  "POSTGRESQL",
  "LINUX",
  "CI/CD",
];

interface CardData {
  label: string;
  phase: number;
}

export function CardCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const baseAngleRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [frontLabel, setFrontLabel] = useState(CARD_LABELS[0]);
  const frontLabelRef = useRef(CARD_LABELS[0]);

  const cards: CardData[] = CARD_LABELS.map((label, i) => ({
    label,
    phase: (i / CARD_LABELS.length) * Math.PI * 2,
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const RADIUS_X = 260;
    const RADIUS_Y = 160;
    const SPEED = 0.006;

    const animate = () => {
      baseAngleRef.current += SPEED;
      const baseAngle = baseAngleRef.current;

      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;

      const cardPositions: { index: number; y: number; scale: number; zIndex: number }[] = [];

      cards.forEach((card, i) => {
        const angle = baseAngle + card.phase;
        const x = centerX + Math.cos(angle) * RADIUS_X;
        const y = centerY + Math.sin(angle) * RADIUS_Y * 0.6;

        const normalizedY = (y - (centerY - RADIUS_Y * 0.6)) / (RADIUS_Y * 1.2);
        const scale = 0.85 + normalizedY * 0.25;
        const rotation = Math.sin(angle) * 8;

        cardPositions.push({ index: i, y, scale, zIndex: Math.round(normalizedY * 100) });

        const el = cardsRef.current[i];
        if (el) {
          el.style.transform = `translate(${x - 60}px, ${y - 22}px) scale(${scale}) rotateZ(${rotation}deg)`;
          el.style.zIndex = `${Math.round(normalizedY * 100)}`;
          el.style.opacity = `${0.5 + normalizedY * 0.5}`;
        }
      });

      const frontCard = cardPositions.reduce((prev, curr) =>
        curr.zIndex > prev.zIndex ? curr : prev
      );

      const newFrontLabel = cards[frontCard.index].label;
      if (newFrontLabel !== frontLabelRef.current) {
        frontLabelRef.current = newFrontLabel;
        setFrontLabel(newFrontLabel);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [cards]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-center">
          <p
            key={frontLabel}
            className="text-sm font-medium tracking-[0.15em] uppercase text-[#ec4899]"
            style={{
              textShadow: "0 0 20px rgba(236, 72, 153, 0.5)",
              animation: "fadeIn 0.3s ease-out",
            }}
          >
            {frontLabel}
          </p>
        </div>
      </div>

      {cards.map((card, i) => (
        <div
          key={card.label}
          ref={(el) => { cardsRef.current[i] = el; }}
          className="absolute top-0 left-0"
          style={{ width: 120, height: 44, willChange: "transform" }}
        >
          <div className="w-full h-full bg-[#171717] border border-[#27272a] rounded-lg flex items-center justify-center">
            <span className="text-[0.65rem] font-medium tracking-wider uppercase text-[#a1a1aa]">
              {card.label}
            </span>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
