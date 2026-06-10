import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPracticeTest, getPracticeTests } from "@/lib/lsat";
import PracticeExam from "@/components/PracticeExam";

type PageProps = {
  params: Promise<{
    testNumber: string;
  }>;
};

export function generateStaticParams() {
  return getPracticeTests().map((test) => ({
    testNumber: String(test.test_number)
  }));
}

export default async function LsatTestPage({ params }: PageProps) {
  const { testNumber } = await params;
  const test = getPracticeTest(Number(testNumber));

  if (!test) {
    notFound();
  }

  return (
    <main className="exam-shell">
      <div className="exam-topbar">
        <Link className="back-link" href="/">
          <ArrowLeft size={18} aria-hidden="true" />
          Tests
        </Link>
        <div>
          <p className="eyebrow">LSAT</p>
          <h1>Practice Test {test.test_number}</h1>
        </div>
      </div>
      <PracticeExam test={test} />
    </main>
  );
}
