import rawPack from "@/data/lsat-practice-exams.json";
import type { LsatPack, PracticeTest } from "@/types/lsat";

export const lsatPack = rawPack as unknown as LsatPack;

export function getPracticeTests(): PracticeTest[] {
  return lsatPack.tests;
}

export function getPracticeTest(testNumber: number): PracticeTest | undefined {
  return lsatPack.tests.find((test) => test.test_number === testNumber);
}

export function getTotalMinutes(test: PracticeTest): number {
  return test.sections.reduce((sum, section) => sum + section.time_minutes, 0);
}

export function getSectionTypeLabel(type: string): string {
  return type
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
