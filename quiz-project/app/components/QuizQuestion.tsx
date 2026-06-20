"use client";

interface Option {
  emoji: string;
  text: string;
  type: string;
}

interface QuizQuestionProps {
  question: string;
  options: Option[];
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (type: string) => void;
}

export default function QuizQuestion({
  question,
  options,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuizQuestionProps) {
  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Dot progress indicator */}
      <div className="flex gap-2">
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i < questionNumber
                ? "scale-110"
                : "bg-gray-200"
            }`}
            style={
              i < questionNumber
                ? { background: "linear-gradient(135deg, #f472b6, #fb923c)" }
                : {}
            }
          />
        ))}
      </div>

      {/* Question counter badge */}
      <span
        className="px-4 py-1.5 rounded-full text-white text-sm font-bold"
        style={{ background: "linear-gradient(90deg, #f472b6, #fb923c)" }}
      >
        Question {questionNumber} of {totalQuestions}
      </span>

      {/* Question text */}
      <h2 className="text-2xl font-extrabold text-center text-gray-800 leading-snug px-2">
        {question}
      </h2>

      {/* Answer options */}
      <div className="flex flex-col gap-3 w-full">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => onAnswer(option.type)}
            className="flex items-center gap-4 w-full bg-white border-2 border-gray-100 rounded-2xl px-5 py-4 text-left font-semibold text-gray-700 hover:scale-105 hover:shadow-md hover:border-pink-200 transition-all duration-150 cursor-pointer"
          >
            <span className="text-2xl">{option.emoji}</span>
            <span>{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
