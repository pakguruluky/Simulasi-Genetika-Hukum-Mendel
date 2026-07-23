import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quiz';
import { HelpCircle, X, CheckCircle, XCircle, Award, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(QUIZ_QUESTIONS.length).fill(null)
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const q = QUIZ_QUESTIONS[currentIndex];
  const selectedOption = selectedAnswers[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    const updated = [...selectedAnswers];
    updated[currentIndex] = idx;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);

    // Calculate score
    let score = 0;
    selectedAnswers.forEach((ans, idx) => {
      if (ans === QUIZ_QUESTIONS[idx].correctIndex) {
        score += 20;
      }
    });

    if (score >= 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers(new Array(QUIZ_QUESTIONS.length).fill(null));
    setIsSubmitted(false);
  };

  // Score calculation
  const correctCount = selectedAnswers.reduce((acc, ans, idx) => {
    return ans === QUIZ_QUESTIONS[idx].correctIndex ? acc + 1 : acc;
  }, 0);
  const totalScore = correctCount * 20;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative text-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">Kuis Pemahaman Genetika Mendel</h2>
              <p className="text-xs text-slate-400">Latihan Soal Biologi SMA (Hukum Mendel I & II)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Summary Banner if submitted */}
        {isSubmitted && (
          <div className="bg-gradient-to-r from-slate-800 to-indigo-950/60 p-4 rounded-xl border border-indigo-500/30 mb-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8 text-indigo-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-indigo-300">Hasil Kuis Anda:</div>
                <div className="text-xl font-black text-white">
                  Skor: {totalScore} / 100 ({correctCount} dari {QUIZ_QUESTIONS.length} Benar)
                </div>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Coba Lagi</span>
            </button>
          </div>
        )}

        {/* Question Counter Header */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-3">
          <span>Soal {currentIndex + 1} dari {QUIZ_QUESTIONS.length}</span>
          <span className="px-2 py-0.5 bg-slate-800 text-teal-300 rounded border border-slate-700">
            Tingkat: {q.difficulty}
          </span>
        </div>

        {/* Question Box */}
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 mb-4">
          <p className="text-sm font-semibold text-white leading-relaxed">{q.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-2.5 mb-5">
          {q.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = q.correctIndex === idx;

            let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-indigo-500/50';

            if (isSubmitted) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
              }
            } else if (isSelected) {
              btnStyle = 'bg-indigo-950/80 border-indigo-500 text-indigo-200 font-bold';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isSubmitted}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-slate-300 text-[11px]">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {isSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Explanation when submitted */}
        {isSubmitted && (
          <div className="bg-slate-800/90 p-3.5 rounded-xl border border-indigo-500/30 text-xs text-slate-300 mb-5">
            <span className="font-bold text-indigo-400 block mb-1">Pembahasan:</span>
            <p className="leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Sebelumnya
          </button>

          <div className="flex items-center gap-2">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswers.includes(null)}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-950/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Kirim & Selesai
              </button>
            ) : null}

            {currentIndex < QUIZ_QUESTIONS.length - 1 && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1"
              >
                <span>Selanjutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
