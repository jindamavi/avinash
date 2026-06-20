"use client";

import { useState } from "react";
import QuizQuestion from "@/app/components/QuizQuestion";
import QuizResults from "@/app/components/QuizResults";

type PersonalityType = "bold" | "sweet" | "social" | "artisan" | "pragmatist";

const questions = [
  {
    question: "It's Saturday morning. What's your perfect start?",
    options: [
      { emoji: "🏔️", text: "Early hike before anyone else is up", type: "bold" },
      { emoji: "📚", text: "Reading in bed with something warm", type: "sweet" },
      { emoji: "🥐", text: "Brunch with friends, the longer the better", type: "social" },
      { emoji: "🎨", text: "A slow morning doing something creative", type: "artisan" },
      { emoji: "✅", text: "Knocking out errands and inbox zero", type: "pragmatist" },
    ],
  },
  {
    question: "Pick a Netflix night:",
    options: [
      { emoji: "🌋", text: "High-stakes action or thriller", type: "bold" },
      { emoji: "🍿", text: "Comfort rewatch of an old favorite", type: "sweet" },
      { emoji: "👯", text: "Group watch with friends, lots of commentary", type: "social" },
      { emoji: "🎬", text: "An acclaimed indie film nobody's heard of", type: "artisan" },
      { emoji: "📺", text: "Whatever's trending, just pick something", type: "pragmatist" },
    ],
  },
  {
    question: "You're planning a trip. What does it look like?",
    options: [
      { emoji: "🧗", text: "Off-grid adventure, no itinerary", type: "bold" },
      { emoji: "🏖️", text: "All-inclusive resort with good food", type: "sweet" },
      { emoji: "🗺️", text: "Road trip with a big group", type: "social" },
      { emoji: "🏛️", text: "Solo through small towns and local spots", type: "artisan" },
      { emoji: "✈️", text: "Direct flight, hotel points, efficient", type: "pragmatist" },
    ],
  },
  {
    question: "What's your go-to order at a restaurant?",
    options: [
      { emoji: "🔥", text: "Whatever sounds most intense or unusual", type: "bold" },
      { emoji: "🧁", text: "Something indulgent, maybe dessert first", type: "sweet" },
      { emoji: "🍕", text: "Something shareable for the table", type: "social" },
      { emoji: "👨‍🍳", text: "The chef's special or tasting menu", type: "artisan" },
      { emoji: "🥗", text: "My usual — I know what I like", type: "pragmatist" },
    ],
  },
  {
    question: "How do you make a decision?",
    options: [
      { emoji: "⚡", text: "Go with the gut, decide fast", type: "bold" },
      { emoji: "💛", text: "Whatever feels most enjoyable", type: "sweet" },
      { emoji: "💬", text: "Talk it through with people I trust", type: "social" },
      { emoji: "🔍", text: "Research deeply before committing", type: "artisan" },
      { emoji: "📋", text: "Pros/cons list, most logical choice wins", type: "pragmatist" },
    ],
  },
  {
    question: "What's your ideal work environment?",
    options: [
      { emoji: "🚀", text: "Fast-paced, high pressure, always moving", type: "bold" },
      { emoji: "🛋️", text: "Comfortable and low-stress", type: "sweet" },
      { emoji: "🤝", text: "Collaborative, lots of team energy", type: "social" },
      { emoji: "🖥️", text: "Quiet, focused, doing deep work alone", type: "artisan" },
      { emoji: "🏢", text: "Structured, clear expectations, reliable", type: "pragmatist" },
    ],
  },
];

const initialAnswers: Record<PersonalityType, number> = {
  bold: 0,
  sweet: 0,
  social: 0,
  artisan: 0,
  pragmatist: 0,
};

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<PersonalityType, number>>(initialAnswers);
  const [phase, setPhase] = useState<"quiz" | "brewing" | "results">("quiz");

  function handleAnswer(type: string) {
    const t = type as PersonalityType;
    const updated = { ...answers, [t]: answers[t] + 1 };
    setAnswers(updated);

    if (currentQuestion + 1 >= questions.length) {
      setPhase("brewing");
      setTimeout(() => setPhase("results"), 2200);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function handleRetake() {
    setCurrentQuestion(0);
    setAnswers(initialAnswers);
    setPhase("quiz");
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #f472b6 0%, #fb923c 50%, #fbbf24 100%)" }}
    >
      <div
        className="bg-white w-full max-w-lg p-8 shadow-2xl"
        style={{ borderRadius: "32px" }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
            Basecamp Coffee
          </p>
          <h1 className="text-2xl font-extrabold text-gray-800">
            What&apos;s your coffee personality?
          </h1>
        </div>

        {phase === "quiz" && (
          <QuizQuestion
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        )}

        {phase === "brewing" && (
          <div className="flex flex-col items-center justify-center gap-6 py-12">
            <div className="animate-brew-bounce text-7xl">☕</div>
            <p className="text-2xl font-extrabold text-gray-800">Brewing your results...</p>
            <div className="dot-pulse flex gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-pink-400" />
              <span className="inline-block w-3 h-3 rounded-full bg-orange-400" />
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-400" />
            </div>
          </div>
        )}

        {phase === "results" && (
          <div className="animate-fade-slide-up">
            <QuizResults answers={answers} onRetake={handleRetake} />
          </div>
        )}
      </div>
    </main>
  );
}
