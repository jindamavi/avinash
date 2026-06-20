"use client";

import Image from "next/image";

type PersonalityType = "bold" | "sweet" | "social" | "artisan" | "pragmatist";

interface PersonalityInfo {
  name: string;
  coffee: string;
  tagline: string;
  image: string;
  color: string;
}

const personalities: Record<PersonalityType, PersonalityInfo> = {
  bold: {
    name: "Bold Adventurer",
    coffee: "Double Espresso",
    tagline: "You live for intensity",
    image: "/espresso.jpg",
    color: "#ef4444",
  },
  sweet: {
    name: "Sweet Enthusiast",
    coffee: "Caramel Latte",
    tagline: "Life's too short for bitter",
    image: "/caramel-latte.jpg",
    color: "#f59e0b",
  },
  social: {
    name: "Social Butterfly",
    coffee: "Cappuccino",
    tagline: "Coffee is better with company",
    image: "/cappuccino.jpg",
    color: "#8b5cf6",
  },
  artisan: {
    name: "Artisan Snob",
    coffee: "Pour-Over, Single Origin",
    tagline: "You know what you like",
    image: "/pour-over.jpg",
    color: "#059669",
  },
  pragmatist: {
    name: "Practical Pragmatist",
    coffee: "Large Drip, Whatever's Fresh",
    tagline: "Just make it work",
    image: "/drip-coffee.jpg",
    color: "#3b82f6",
  },
};

interface QuizResultsProps {
  answers: Record<PersonalityType, number>;
  onRetake: () => void;
}

export default function QuizResults({ answers, onRetake }: QuizResultsProps) {
  const total = Object.values(answers).reduce((a, b) => a + b, 0);

  const sorted = (Object.entries(answers) as [PersonalityType, number][])
    .map(([type, count]) => ({
      type,
      pct: Math.round((count / total) * 100),
      info: personalities[type],
    }))
    .filter((r) => r.pct > 0)
    .sort((a, b) => b.pct - a.pct);

  const top = sorted[0];

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <h2 className="text-3xl font-extrabold text-center text-gray-800">
        Your Coffee Personality
      </h2>

      {/* Top result with image */}
      <div className="w-full rounded-2xl overflow-hidden shadow-md">
        <div className="relative h-48 w-full">
          <Image
            src={top.info.image}
            alt={top.info.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-2xl font-extrabold">{top.pct}% {top.info.name}</p>
            <p className="text-sm opacity-90">Your drink: {top.info.coffee}</p>
          </div>
        </div>
        <div className="bg-white px-5 py-3">
          <p className="text-gray-500 italic text-sm">"{top.info.tagline}"</p>
        </div>
      </div>

      {/* Full breakdown */}
      <div className="w-full">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
          Your Full Breakdown
        </p>
        <div className="flex flex-col gap-3">
          {sorted.map(({ type, pct, info }) => (
            <div key={type} className="flex flex-col gap-1">
              <div className="flex justify-between text-sm font-semibold text-gray-700">
                <span>{info.name}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: info.color }}
                />
              </div>
              <p className="text-xs text-gray-400">{info.coffee}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Retake button */}
      <button
        onClick={onRetake}
        className="mt-2 px-8 py-3 rounded-full text-white font-bold hover:scale-105 transition-transform"
        style={{ background: "linear-gradient(90deg, #f472b6, #fb923c)" }}
      >
        Take it again <span className="text-xl">↺</span>
      </button>
    </div>
  );
}
