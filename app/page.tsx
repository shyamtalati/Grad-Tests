import Link from "next/link";
import { ArrowRight, BookOpenCheck, Clock3, GraduationCap, Lock } from "lucide-react";
import { getPracticeTests, getTotalMinutes, lsatPack } from "@/lib/lsat";

const futureExams = ["GRE", "GMAT", "MCAT"];

export default function Home() {
  const tests = getPracticeTests();
  const totalQuestions = tests.reduce((sum, test) => sum + test.question_count_actual, 0);

  return (
    <main className="shell">
      <section className="topbar" aria-label="Service overview">
        <div>
          <p className="eyebrow">Standardized Practice</p>
          <h1>LSAT practice workspace</h1>
        </div>
        <div className="status-pill">
          <BookOpenCheck size={18} aria-hidden="true" />
          {totalQuestions} LSAT questions loaded
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel primary-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Active exam</p>
              <h2>{lsatPack.title}</h2>
            </div>
            <GraduationCap size={28} aria-hidden="true" />
          </div>
          <p className="muted">{lsatPack.description}</p>
          {lsatPack.official_status_note ? (
            <p className="notice">{lsatPack.official_status_note}</p>
          ) : null}
        </div>

        <div className="panel compact-panel">
          <p className="eyebrow">Format</p>
          <h2>{tests.length} practice tests</h2>
          <p className="muted">Each test is organized by timed LSAT sections with answer review.</p>
        </div>
      </section>

      <section className="section-block" aria-labelledby="practice-tests">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Start practicing</p>
            <h2 id="practice-tests">Choose a test</h2>
          </div>
        </div>

        <div className="test-grid">
          {tests.map((test) => (
            <Link className="test-card" href={`/lsat/${test.test_number}`} key={test.test_number}>
              <div>
                <p className="eyebrow">Practice Test {test.test_number}</p>
                <h3>{test.question_count_actual} questions</h3>
              </div>
              <div className="card-meta">
                <span>
                  <Clock3 size={16} aria-hidden="true" />
                  {getTotalMinutes(test)} min
                </span>
                <span>{test.sections.length} sections</span>
              </div>
              <span className="card-action" aria-label={`Open Practice Test ${test.test_number}`}>
                <ArrowRight size={18} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="future-exams">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Coming later</p>
            <h2 id="future-exams">Additional exams</h2>
          </div>
        </div>

        <div className="future-grid">
          {futureExams.map((exam) => (
            <div className="future-card" key={exam}>
              <div>
                <p className="eyebrow">{exam}</p>
                <h3>Planned</h3>
              </div>
              <Lock size={18} aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
