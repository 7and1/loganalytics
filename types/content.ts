export interface LogFormat {
  slug: string;
  name: string;
  description: string;
  category: string;
  fileExtension: string;
  regex: string;
  duckdb_schema: string;
  sample_line: string;
  common_errors: string[];
  meta_title: string;
  meta_desc: string;
  defaultSqlQuery?: string;
  relatedErrors?: string[];
}

export interface ErrorGuide {
  code: string;
  platform: string;
  slug: string;
  title: string;
  symptom: string;
  sql_query: string;
  solution_steps: string[];
}

export interface SampleAsset {
  slug: string;
  name: string;
  description: string;
  file: string;
  format: string;
  size_kb: number;
}
