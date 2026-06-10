"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Bookmark,
  BookmarkCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  RotateCcw
} from "lucide-react";
import type { Passage, PracticeTest, Question, Section } from "@/types/lsat";
import { getSectionTypeLabel } from "@/lib/lsat";

type Answers = Record<string, string>;

type PracticeExamProps = {
  test: PracticeTest;
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(Math.max(totalSeconds, 0) / 60);
  const seconds = Math.max(totalSeconds, 0) % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getPassageText(passage: Passage) {
  const candidate = passage.text ?? passage.content ?? passage.passage ?? passage.body;
  if (typeof candidate === "string") {
    return candidate;
  }

  return Object.entries(passage)
    .filter(([key, value]) => !["id", "title"].includes(key) && typeof value === "string")
    .map(([, value]) => value)
    .join("\n\n");
}

function isAnswered(question: Question, answers: Answers) {
  return Boolean(answers[question.id]);
}

function getAllQuestions(test: PracticeTest) {
  return test.sections.flatMap((section) => section.questions);
}

function getScore(test: PracticeTest, answers: Answers) {
  return getAllQuestions(test).reduce(
    (score, question) => score + (answers[question.id] === question.answer ? 1 : 0),
    0
  );
}

export default function PracticeExam({ test }: PracticeExamProps) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [remainingBySection, setRemainingBySection] = useState<Record<number, number>>(() =>
    Object.fromEntries(
      test.sections.map((section, index) => [index, Math.max(section.time_minutes, 0) * 60])
    )
  );

  const section = test.sections[sectionIndex];
  const question = section.questions[questionIndex];
  const allQuestions = useMemo(() => getAllQuestions(test), [test]);
  const answeredCount = allQuestions.filter((item) => isAnswered(item, answers)).length;
  const score = submitted ? getScore(test, answers) : 0;
  const percentage = submitted ? Math.round((score / allQuestions.length) * 100) : 0;

  useEffect(() => {
    if (submitted) {
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingBySection((current) => {
        const currentRemaining = current[sectionIndex] ?? 0;
        if (currentRemaining <= 0) {
          return current;
        }

        return {
          ...current,
          [sectionIndex]: currentRemaining - 1
        };
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [sectionIndex, submitted]);

  function chooseSection(nextIndex: number) {
    setSectionIndex(nextIndex);
    setQuestionIndex(0);
  }

  function chooseAnswer(label: string) {
    if (submitted) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [question.id]: label
    }));
  }

  function toggleFlag() {
    setFlagged((current) => ({
      ...current,
      [question.id]: !current[question.id]
    }));
  }

  function resetAttempt() {
    setAnswers({});
    setFlagged({});
    setSubmitted(false);
    setSectionIndex(0);
    setQuestionIndex(0);
    setRemainingBySection(
      Object.fromEntries(
        test.sections.map((item, index) => [index, Math.max(item.time_minutes, 0) * 60])
      )
    );
  }

  return (
    <div className="exam-layout">
      <aside className="exam-sidebar" aria-label="Test navigation">
        <div className="timer-box">
          <span>
            <Clock3 size={18} aria-hidden="true" />
            Section time
          </span>
          <strong>{formatTime(remainingBySection[sectionIndex] ?? 0)}</strong>
        </div>

        <div className="progress-box">
          <div>
            <p className="eyebrow">Progress</p>
            <strong>
              {answeredCount}/{allQuestions.length}
            </strong>
          </div>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${(answeredCount / allQuestions.length) * 100}%` }} />
          </div>
        </div>

        <nav className="section-list" aria-label="Sections">
          {test.sections.map((item, index) => (
            <button
              className={index === sectionIndex ? "section-tab active" : "section-tab"}
              key={item.section_number}
              onClick={() => chooseSection(index)}
              type="button"
            >
              <span>Section {item.section_number}</span>
              <small>{getSectionTypeLabel(item.type)}</small>
            </button>
          ))}
        </nav>

        <div className="submit-panel">
          {submitted ? (
            <>
              <div className="score-box">
                <span>Score</span>
                <strong>
                  {score}/{allQuestions.length}
                </strong>
                <small>{percentage}% correct</small>
              </div>
              <button className="secondary-button" onClick={resetAttempt} type="button">
                <RotateCcw size={16} aria-hidden="true" />
                New attempt
              </button>
            </>
          ) : (
            <>
              {answeredCount < allQuestions.length ? (
                <p className="submit-note">
                  <AlertTriangle size={16} aria-hidden="true" />
                  {allQuestions.length - answeredCount} unanswered
                </p>
              ) : null}
              <button className="primary-button" onClick={() => setSubmitted(true)} type="button">
                <Check size={16} aria-hidden="true" />
                Submit test
              </button>
            </>
          )}
        </div>
      </aside>

      <section className="question-workspace" aria-label="Question workspace">
        <div className="question-header">
          <div>
            <p className="eyebrow">
              Section {section.section_number} · {section.title}
            </p>
            <h2>Question {question.number}</h2>
          </div>
          <button
            className={flagged[question.id] ? "icon-button active" : "icon-button"}
            onClick={toggleFlag}
            type="button"
            title={flagged[question.id] ? "Remove flag" : "Flag question"}
          >
            {flagged[question.id] ? (
              <BookmarkCheck size={19} aria-hidden="true" />
            ) : (
              <Bookmark size={19} aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="question-grid">
          <div className="prompt-panel">
            {section.directions ? (
              <details className="directions">
                <summary>Section directions</summary>
                <p>{section.directions}</p>
              </details>
            ) : null}

            {section.passages && section.passages.length > 0 ? (
              <PassagePanel section={section} />
            ) : null}

            {question.stimulus ? <p className="stimulus">{question.stimulus}</p> : null}
            <p className="stem">{question.stem}</p>
          </div>

          <div className="answer-panel">
            {question.choices.map((choice) => {
              const selected = answers[question.id] === choice.label;
              const correct = submitted && question.answer === choice.label;
              const incorrectSelection = submitted && selected && !correct;

              return (
                <button
                  className={[
                    "choice-button",
                    selected ? "selected" : "",
                    correct ? "correct" : "",
                    incorrectSelection ? "incorrect" : ""
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={choice.label}
                  onClick={() => chooseAnswer(choice.label)}
                  type="button"
                >
                  <span className="choice-label">{choice.label}</span>
                  <span>{choice.text}</span>
                </button>
              );
            })}

            {submitted ? (
              <div className="explanation-box">
                <p className="eyebrow">Explanation</p>
                <p>{question.explanation || "No explanation provided for this question."}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="question-footer">
          <button
            className="secondary-button"
            disabled={questionIndex === 0}
            onClick={() => setQuestionIndex((current) => Math.max(current - 1, 0))}
            type="button"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            Previous
          </button>

          <div className="question-dots" aria-label="Questions in current section">
            {section.questions.map((item, index) => (
              <button
                aria-label={`Go to question ${item.number}`}
                className={[
                  "question-dot",
                  index === questionIndex ? "active" : "",
                  answers[item.id] ? "answered" : "",
                  flagged[item.id] ? "flagged" : ""
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={item.id}
                onClick={() => setQuestionIndex(index)}
                type="button"
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            className="secondary-button"
            disabled={questionIndex === section.questions.length - 1}
            onClick={() =>
              setQuestionIndex((current) => Math.min(current + 1, section.questions.length - 1))
            }
            type="button"
          >
            Next
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}

function PassagePanel({ section }: { section: Section }) {
  return (
    <div className="passage-stack">
      {section.passages?.map((passage, index) => (
        <article className="passage" key={passage.id ?? index}>
          {passage.title ? <h3>{passage.title}</h3> : <h3>Passage {index + 1}</h3>}
          <p>{getPassageText(passage)}</p>
        </article>
      ))}
    </div>
  );
}
