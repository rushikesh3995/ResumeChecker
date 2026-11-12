
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MockInterview.module.css";

// Python FastAPI backend deployed on Render
const API_BASE = (
  import.meta.env.VITE_AI_INTERVIEW_API_URL ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

const DOMAINS = [
  "Java Developer",
  "Full Stack Developer",
  "React Developer",
  "Frontend Developer",
  "Backend Developer",
  "Python Developer",
  "Data Analyst",
  "Software Developer"
];

const LEVELS = [
  "Fresher",
  "0–1 years",
  "1–3 years",
  "3+ years"
];

function MockInterview() {
  const navigate = useNavigate();

  const [stage, setStage] = useState("setup");
  const [domain, setDomain] = useState("Java Developer");
  const [experienceLevel, setExperienceLevel] = useState("Fresher");
  const [questionCount, setQuestionCount] = useState(5);

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  const [evaluations, setEvaluations] = useState([]);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentQuestion = questions[questionIndex];

  const averageScore = useMemo(() => {
    if (!evaluations.length) return 0;

    return Math.round(
      evaluations.reduce(
        (sum, item) => sum + Number(item.score || 0),
        0
      ) / evaluations.length * 10
    );
  }, [evaluations]);

  // Generate interview questions
  const startInterview = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE}/interview/generate-questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            domain,
            experience_level: experienceLevel,
            question_count: questionCount
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to generate interview questions."
        );
      }

      if (
        !Array.isArray(data.questions) ||
        data.questions.length === 0
      ) {
        throw new Error(
          "The AI did not return any questions. Please try again."
        );
      }

      setQuestions(data.questions);
      setQuestionIndex(0);
      setEvaluations([]);
      setCurrentEvaluation(null);
      setAnswer("");
      setStage("interview");

    } catch (err) {
      console.error("Question generation error:", err);

      setError(
        err.message ||
        "Could not connect to the Python interview server."
      );
    } finally {
      setLoading(false);
    }
  };

  // Evaluate candidate answer
  const submitAnswer = async (event) => {
    event.preventDefault();

    if (answer.trim().length < 2) {
      setError("Please enter your answer before submitting.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE}/interview/evaluate-answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            domain,
            experience_level: experienceLevel,
            question: currentQuestion.question,
            answer: answer.trim()
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to evaluate this answer."
        );
      }

      if (!data.evaluation) {
        throw new Error("Invalid evaluation received from AI.");
      }

      setCurrentEvaluation(data.evaluation);

      setEvaluations((previous) => [
        ...previous,
        data.evaluation
      ]);

    } catch (err) {
      console.error("Answer evaluation error:", err);

      setError(
        err.message ||
        "Could not connect to the Python interview server."
      );
    } finally {
      setLoading(false);
    }
  };

  // Move to next question
  const moveToNextQuestion = () => {
    if (questionIndex === questions.length - 1) {
      setStage("complete");
      return;
    }

    setQuestionIndex((index) => index + 1);
    setAnswer("");
    setCurrentEvaluation(null);
    setError("");
  };

  // Restart interview
  const restart = () => {
    setStage("setup");
    setQuestions([]);
    setEvaluations([]);
    setCurrentEvaluation(null);
    setQuestionIndex(0);
    setAnswer("");
    setError("");
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>

        <button
          className={styles.backLink}
          onClick={() => navigate("/dashboard")}
        >
          ← Back to dashboard
        </button>

        {/* SETUP STAGE */}
        {stage === "setup" && (
          <section className={styles.setupLayout}>

            <div className={styles.intro}>
              <span className={styles.eyebrow}>
                RESUMECHECKER • AI INTERVIEW STUDIO
              </span>

              <h1>
                Practice with confidence.
                <br />
                <span>Get interview-ready.</span>
              </h1>

              <p>
                Prepare for role-specific technical interviews
                with AI-generated questions and practical
                feedback on every answer.
              </p>

              <div className={styles.featureList}>

                <div>
                  <span>✓</span>
                  <p>
                    <strong>Domain-specific questions</strong>
                    <small>Practice for the role you want.</small>
                  </p>
                </div>

                <div>
                  <span>✓</span>
                  <p>
                    <strong>Personalized AI feedback</strong>
                    <small>
                      Understand what you did well and
                      what to improve.
                    </small>
                  </p>
                </div>

                <div>
                  <span>✓</span>
                  <p>
                    <strong>Performance summary</strong>
                    <small>
                      Review your scores after the interview.
                    </small>
                  </p>
                </div>

              </div>
            </div>

            <form
              className={styles.setupCard}
              onSubmit={startInterview}
            >
              <div className={styles.cardIcon}>✦</div>

              <span className={styles.eyebrow}>
                START A NEW SESSION
              </span>

              <h2>Set up your interview</h2>

              <p className={styles.muted}>
                Choose your target role and experience level
                to personalize your questions.
              </p>

              <label htmlFor="domain">
                Interview domain
              </label>

              <select
                id="domain"
                value={domain}
                onChange={(event) =>
                  setDomain(event.target.value)
                }
              >
                {DOMAINS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <label htmlFor="experience">
                Experience level
              </label>

              <select
                id="experience"
                value={experienceLevel}
                onChange={(event) =>
                  setExperienceLevel(event.target.value)
                }
              >
                {LEVELS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <label htmlFor="questionCount">
                Number of questions
              </label>

              <select
                id="questionCount"
                value={questionCount}
                onChange={(event) =>
                  setQuestionCount(Number(event.target.value))
                }
              >
                <option value={3}>
                  3 questions · Quick practice
                </option>

                <option value={5}>
                  5 questions · Standard session
                </option>

                <option value={8}>
                  8 questions · Deep practice
                </option>

                <option value={10}>
                  10 questions · Full practice
                </option>
              </select>

              {error && (
                <div className={styles.error}>
                  {error}
                </div>
              )}

              <button
                className={styles.primaryButton}
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Generating your questions…"
                  : "Start AI interview →"}
              </button>

              <small className={styles.secureNote}>
                Your interview questions are generated
                by the ResumeChecker AI service.
              </small>
            </form>

          </section>
        )}

        {/* INTERVIEW STAGE */}
        {stage === "interview" && currentQuestion && (
          <section className={styles.interviewLayout}>

            <header className={styles.sessionHeader}>
              <div>
                <span className={styles.eyebrow}>
                  LIVE PRACTICE SESSION
                </span>

                <h1>{domain} interview</h1>

                <p>
                  {experienceLevel} · AI-powered practice
                </p>
              </div>

              <button
                className={styles.exitButton}
                onClick={restart}
              >
                End session
              </button>
            </header>

            <div className={styles.progressTrack}>
              <span
                style={{
                  width: `${
                    ((questionIndex + 1) / questions.length) * 100
                  }%`
                }}
              />
            </div>

            <div className={styles.progressMeta}>
              <span>
                Question {questionIndex + 1} of {questions.length}
              </span>

              <span>
                {Math.round(
                  ((questionIndex + 1) / questions.length) * 100
                )}% completed
              </span>
            </div>

            <article className={styles.questionCard}>

              <div className={styles.questionMeta}>
                <span>
                  QUESTION{" "}
                  {String(questionIndex + 1).padStart(2, "0")}
                </span>

                <div>
                  <span>
                    {currentQuestion.category || "Technical"}
                  </span>

                  <span>
                    {currentQuestion.difficulty || "Mixed"}
                  </span>
                </div>
              </div>

              <h2>{currentQuestion.question}</h2>

              {!currentEvaluation ? (

                <form onSubmit={submitAnswer}>

                  <label htmlFor="candidateAnswer">
                    Your answer
                  </label>

                  <textarea
                    id="candidateAnswer"
                    value={answer}
                    onChange={(event) =>
                      setAnswer(event.target.value)
                    }
                    placeholder="Write your answer here. Explain your thinking and include examples where possible…"
                    rows={8}
                    maxLength={5000}
                  />

                  <div className={styles.answerFooter}>
                    <span>
                      {answer.length}/5000 characters
                    </span>

                    <span>Text answer mode</span>
                  </div>

                  {error && (
                    <div className={styles.error}>
                      {error}
                    </div>
                  )}

                  <button
                    className={styles.primaryButton}
                    type="submit"
                    disabled={loading}
                  >
                    {loading
                      ? "Evaluating your answer…"
                      : "Submit answer for AI feedback →"}
                  </button>

                </form>

              ) : (

                <div className={styles.evaluation}>

                  <div className={styles.scoreBanner}>
                    <div>
                      <span>YOUR SCORE</span>

                      <strong>
                        {currentEvaluation.score}
                        <small>/10</small>
                      </strong>
                    </div>

                    <p>{currentEvaluation.feedback}</p>
                  </div>

                  <div className={styles.evaluationGrid}>

                    <section>
                      <h3>✓ Strengths</h3>

                      <ul>
                        {(currentEvaluation.strengths || []).map(
                          (item, index) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </section>

                    <section>
                      <h3>↗ Areas to improve</h3>

                      <ul>
                        {(currentEvaluation.improvements || []).map(
                          (item, index) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </section>

                  </div>

                  <section className={styles.idealAnswer}>
                    <h3>Suggested answer</h3>

                    <p>{currentEvaluation.ideal_answer}</p>
                  </section>

                  <button
                    className={styles.primaryButton}
                    onClick={moveToNextQuestion}
                  >
                    {questionIndex === questions.length - 1
                      ? "View interview summary →"
                      : "Next question →"}
                  </button>

                </div>
              )}

            </article>

          </section>
        )}

        {/* COMPLETION STAGE */}
        {stage === "complete" && (
          <section className={styles.completeCard}>

            <div className={styles.completeIcon}>✓</div>

            <span className={styles.eyebrow}>
              SESSION COMPLETED
            </span>

            <h1>Good work. Keep improving.</h1>

            <p>
              You completed your {domain} practice interview.
            </p>

            <div className={styles.finalScore}>
              <strong>{averageScore}%</strong>
              <span>Average answer score</span>
            </div>

            <div className={styles.summaryStats}>

              <div>
                <strong>{evaluations.length}</strong>
                <span>Answers evaluated</span>
              </div>

              <div>
                <strong>{domain}</strong>
                <span>Interview domain</span>
              </div>

              <div>
                <strong>{experienceLevel}</strong>
                <span>Experience level</span>
              </div>

            </div>

            <div className={styles.finalList}>
              {evaluations.map((item, index) => (
                <div key={index}>
                  <span>Question {index + 1}</span>
                  <strong>{item.score}/10</strong>
                </div>
              ))}
            </div>

            <button
              className={styles.primaryButton}
              onClick={restart}
            >
              Start another interview
            </button>

            <button
              className={styles.secondaryButton}
              onClick={() => navigate("/dashboard")}
            >
              Back to dashboard
            </button>

          </section>
        )}

      </div>
    </main>
  );
}

export default MockInterview;
