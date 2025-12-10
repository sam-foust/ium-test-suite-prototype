// Gherkin Test Suite Types
export interface GherkinFeature {
  id: string;
  name: string;
  description: string;
  tags: string[];
  language: string;
  background?: GherkinBackground;
  rules: GherkinRule[];
  scenarios: GherkinScenario[];
}

export interface GherkinRule {
  id: string;
  name: string;
  description: string;
  tags: string[];
  background?: GherkinBackground;
  scenarios: GherkinScenario[];
}

export interface GherkinBackground {
  name: string;
  steps: GherkinStep[];
}

export interface GherkinScenario {
  id: string;
  name: string;
  tags: string[];
  steps: GherkinStep[];
  examples?: GherkinExamples[];
}

export interface GherkinStep {
  keyword: string; // Given, When, Then, And, But
  text: string;
  docString?: string;
  dataTable?: string[][];
}

export interface GherkinExamples {
  name: string;
  tableHeader: string[];
  tableRows: string[][];
}

// Test Suite List Item for homepage
export interface TestSuiteListItem {
  id: string;
  title: string;
  feature: string;
  status: string;
  lastUpdated: string;
  category?: string;
}

export interface TestSuiteCategory {
  name: string;
  suites: TestSuiteListItem[];
}
