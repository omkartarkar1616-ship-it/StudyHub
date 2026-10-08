import { useState } from "react";
import { useStudyHub } from "../context/StudyHubContext";

const questions = [
  {
    question: "Which hook is used to manage state in a React component?",
    options: ["useEffect", "useState", "useContext", "useRef"],
    answer: "useState",
  },
  {
    question: "Which language is primarily used to style web pages?",
    options: ["HTML", "Python", "CSS", "Java"],
    answer: "CSS",
  },
  {
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Simple Query Language",
      "System Query Logic",
      "Structured Question Language",
    ],
    answer: "Structured Query Language",
  },
  {
    question: "Which method converts a JavaScript object into JSON?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.object()"],
    answer: "JSON.stringify()",
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<href>", "<a>", "<url>"],
    answer: "<a>",
  },
];

function Quizzes() {
  const { saveQuizResult } = useStudyHub();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = questions[currentQuestion];

  function selectAnswer(answer) {
    setSelectedAnswer(answer);
    setShowFeedback(true);
  }

  function nextQuestion() {
    if (!selectedAnswer) {
      return;
    }

    if (selectedAnswer === question.answer) {
      setScore(score + 1);
    }

    if (currentQuestion === questions.length - 1) {
  const finalScore =
    score + (selectedAnswer === question.answer ? 1 : 0);

  saveQuizResult(finalScore, questions.length);

  setShowResult(true);
}
    else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowFeedback(false);
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowFeedback(false);
    setScore(0);
    setShowResult(false);
  }

  if (showResult) {
    const finalScore =
      score + (selectedAnswer === question.answer ? 1 : 0);

    const percentage = Math.round(
      (finalScore / questions.length) * 100
    );

    return (
      <div className="page">
        <div className="quiz-result">
          <div className="result-icon">🏆</div>

          <h1>Quiz Completed!</h1>

          <p className="result-score">
            {finalScore} / {questions.length}
          </p>

          <p className="result-percentage">
            You scored {percentage}%
          </p>

          <p className="result-message">
            {percentage >= 80
              ? "Excellent work! 🎉"
              : percentage >= 50
              ? "Good job! Keep practicing. 💪"
              : "Keep learning and try again! 📚"}
          </p>

          <button className="restart-button" onClick={restartQuiz}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Quiz</h1>
          <p>Test your knowledge and improve your skills.</p>
        </div>
      </div>

      <div className="quiz-card">
        <div className="quiz-progress">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>

          <span>
            Score: {score}
          </span>
        </div>

        <div className="quiz-progress-bar">
          <div
            className="quiz-progress-fill"
            style={{
              width: `${
                ((currentQuestion + 1) / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>

        <h2>{question.question}</h2>

        <div className="quiz-options">
          {question.options.map((option) => (
            <button
              key={option}
              className={
                selectedAnswer === option
                  ? "quiz-option selected"
                  : "quiz-option"
              }
              onClick={() => selectAnswer(option)}
              disabled={showFeedback}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && (
          <p
            className={
              selectedAnswer === question.answer
                ? "quiz-feedback correct"
                : "quiz-feedback incorrect"
            }
          >
            {selectedAnswer === question.answer
              ? "Correct! 🎉"
              : `Incorrect. Correct answer: ${question.answer}`}
          </p>
        )}

        <button
          className="next-button"
          onClick={nextQuestion}
          disabled={!selectedAnswer}
        >
          {currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default Quizzes;