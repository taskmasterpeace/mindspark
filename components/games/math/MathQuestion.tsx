import React from 'react';

interface QuestionData {
  question: string;
  choices: number[];
  answer: number;
}

interface MathQuestionProps {
  currentQuestion: QuestionData | null;
  feedback: { type: string; message: string } | null;
  handleAnswer: (choice: number) => void;
}

const MathQuestion: React.FC<MathQuestionProps> = ({ 
  currentQuestion, 
  feedback, 
  handleAnswer 
}) => {
  if (feedback) {
    return (
      <div className={`text-center text-xl font-bold p-4 rounded ${
        feedback.type === 'correct' 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-100 text-red-700'
      }`}>
        {feedback.message}
      </div>
    );
  }

  if (!currentQuestion) {
    return <div className="text-center text-xl">Loading question...</div>;
  }

  return (
    <div>
      <div className="text-2xl font-bold text-center mb-4">{currentQuestion.question}</div>
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(choice)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-xl transition"
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MathQuestion; 