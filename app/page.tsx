import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  LibraryBig,
  Lock,
  Megaphone,
  Scale,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { getPracticeTests, getTotalMinutes, lsatPack } from "@/lib/lsat";

const futureExams = [
  {
    name: "GRE",
    description: "Graduate admissions drills and timed quantitative-verbal sets."
  },
  {
    name: "GMAT",
    description: "Business-school reasoning practice with adaptive review support."
  },
  {
    name: "MCAT",
    description: "Structured science and reasoning review for professional programs."
  }
];

const learnerBenefits = [
  "Timed sections built for focused practice",
  "Original LSAT-style questions with explanations",
  "Simple progress and score review after each attempt"
];

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "Unofficial by design",
    description:
      "Apta Tests uses original practice material and clearly labels its non-affiliation with official test makers."
  },
  {
    icon: LibraryBig,
    title: "Built for disciplined study",
    description:
      "Question navigation, timers, answer review, and section structure keep learners inside a serious prep rhythm."
  },
  {
    icon: BriefcaseBusiness,
    title: "Ready to grow",
    description:
      "The site is positioned as a broader graduate-test practice brand, with LSAT live and other exams planned."
  }
];

export default function Home() {
  const tests = getPracticeTests();
  const totalQuestions = tests.reduce((sum, test) => sum + test.question_count_actual, 0);
  const totalMinutes = tests.reduce((sum, test) => sum + getTotalMinutes(test), 0);

  return (
    <>
      <header className="site-header">
        <Link className="brand-link" href="/" aria-label="Apta Tests home">
          <span className="brand-mark">A</span>
          <span>Apta Tests</span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#learners">
            For Learners
            <ChevronDown size={14} aria-hidden="true" />
          </a>
          <a href="#programs">
            Practice Programs
            <ChevronDown size={14} aria-hidden="true" />
          </a>
          <a href="#resources">
            Resources
            <ChevronDown size={14} aria-hidden="true" />
          </a>
          <a href="#legal">
            Legal
            <ChevronDown size={14} aria-hidden="true" />
          </a>
        </nav>

        <Link className="header-action" href="#contact">
          Contact Us
        </Link>
      </header>

      <main>
        <section className="journey-strip" aria-label="Service position">
          <p>Purpose-built practice for ambitious legal learners</p>
          <a href="#programs">View LSAT practice</a>
        </section>

        <section className="hero-landing" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow">Admissions practice, made disciplined</p>
            <h1 id="hero-title">Apta Tests</h1>
            <p className="hero-lede">
              A modern preparation workspace for timed LSAT-style practice, answer review, and the
              steady habits that make exam day feel less abstract.
            </p>

            <div className="hero-actions">
              <Link className="primary-button hero-button" href="#practice-tests">
                <BookOpenCheck size={18} aria-hidden="true" />
                Start LSAT Practice
              </Link>
              <a className="secondary-button hero-button" href="#legal">
                <Scale size={18} aria-hidden="true" />
                Read Disclaimer
              </a>
            </div>

            <ul className="hero-proof" aria-label="Current LSAT practice coverage">
              <li>
                <strong>{tests.length}</strong>
                <span>practice tests</span>
              </li>
              <li>
                <strong>{totalQuestions}</strong>
                <span>questions loaded</span>
              </li>
              <li>
                <strong>{totalMinutes}</strong>
                <span>timed minutes</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="announcement-band" aria-label="Product notice">
          <Megaphone size={28} aria-hidden="true" />
          <p>
            Apta Tests is launching with original LSAT-style practice material while broader graduate
            and professional exam suites are prepared.
          </p>
          <a href="#future-exams">Upcoming exams</a>
        </section>

        <section className="content-section" id="learners" aria-labelledby="learners-heading">
          <div className="section-intro">
            <p className="eyebrow">For individual learners</p>
            <h2 id="learners-heading">Focused practice without the clutter</h2>
            <p>
              Start with timed sections, move question by question, flag what needs review, and
              submit when you are ready to see score and explanation feedback.
            </p>
          </div>

          <div className="benefit-list">
            {learnerBenefits.map((benefit) => (
              <div className="benefit-item" key={benefit}>
                <CheckCircle2 size={20} aria-hidden="true" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section section-tint" id="programs" aria-labelledby="programs-heading">
          <div className="section-intro">
            <p className="eyebrow">Active program</p>
            <h2 id="programs-heading">{lsatPack.title}</h2>
            <p>{lsatPack.description}</p>
          </div>

          <div className="program-metrics" aria-label="LSAT program summary">
            <div>
              <GraduationCap size={24} aria-hidden="true" />
              <span>{tests.length} tests</span>
            </div>
            <div>
              <Clock3 size={24} aria-hidden="true" />
              <span>{totalMinutes} timed minutes</span>
            </div>
            <div>
              <Sparkles size={24} aria-hidden="true" />
              <span>Original explanations</span>
            </div>
          </div>

          <div className="test-grid" id="practice-tests">
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

        <section className="content-section" id="resources" aria-labelledby="resources-heading">
          <div className="section-intro">
            <p className="eyebrow">Practice standards</p>
            <h2 id="resources-heading">Clear boundaries, serious study</h2>
          </div>

          <div className="feature-grid">
            {trustFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article className="feature-card" key={feature.title}>
                  <Icon size={26} aria-hidden="true" />
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="content-section section-tint" id="future-exams" aria-labelledby="future-exams-heading">
          <div className="section-intro">
            <p className="eyebrow">Coming later</p>
            <h2 id="future-exams-heading">A broader test-prep platform</h2>
            <p>
              Apta Tests is being shaped as a multi-exam practice home. LSAT is live today; more
              graduate and professional tracks are planned.
            </p>
          </div>

          <div className="future-grid">
            {futureExams.map((exam) => (
              <article className="future-card" key={exam.name}>
                <div>
                  <p className="eyebrow">{exam.name}</p>
                  <h3>Planned</h3>
                  <p>{exam.description}</p>
                </div>
                <Lock size={18} aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="legal-band" id="legal" aria-labelledby="legal-heading">
          <div>
            <p className="eyebrow">Legal notice</p>
            <h2 id="legal-heading">Independent, unofficial practice</h2>
          </div>
          <p>
            Apta Tests is not affiliated with, endorsed by, approved by, or sponsored by the Law
            School Admission Council (LSAC), ETS, GMAC, AAMC, NCBE, BARBRI, Kaplan, Themis, UWorld,
            or any other testing service, publisher, or preparation provider. LSAT, GRE, GMAT, MCAT,
            bar exam, and related names are trademarks of their respective owners. All current
            practice content is original, unofficial material for educational study only and is not
            legal advice, official exam content, or a substitute for materials published by the
            applicable test owner.
          </p>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <Link className="brand-link" href="/" aria-label="Apta Tests home">
          <span className="brand-mark">A</span>
          <span>Apta Tests</span>
        </Link>
        <p>Legal exam preparation, built with calm structure and transparent boundaries.</p>
        <a href="mailto:hello@aptatests.com">hello@aptatests.com</a>
      </footer>
    </>
  );
}
