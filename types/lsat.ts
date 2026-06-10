export type Choice = {
  label: string;
  text: string;
};

export type Passage = {
  id?: string;
  title?: string;
  text?: string;
  content?: string;
  passage?: string;
  body?: string;
  [key: string]: unknown;
};

export type Question = {
  id: string;
  number: number;
  stimulus?: string;
  stem: string;
  choices: Choice[];
  answer: string;
  explanation?: string;
  passage_id?: string;
  passageId?: string;
  [key: string]: unknown;
};

export type Section = {
  section_number: number;
  section_label?: string;
  title: string;
  type: string;
  time_minutes: number;
  status?: string;
  directions?: string;
  passages?: Passage[];
  questions: Question[];
  question_count_actual?: number;
  question_count_expected?: number;
  answer_key?: Record<string, string | undefined>;
};

export type PracticeTest = {
  test_number: number;
  sections: Section[];
  question_count_actual: number;
};

export type LsatPack = {
  schema_version: string;
  title: string;
  description?: string;
  source_document?: string;
  official_status_note?: string;
  exam_format?: unknown;
  section_overview?: unknown;
  tests: PracticeTest[];
  validation?: unknown;
};
