export interface TestSuiteListItem {
  id: string;
  title: string;
  feature: string;
  status: string;
  lastUpdated: string;
  category?: string;
}

export interface TestSuite {
  id: string;
  metadata: Metadata;
  featureInformation: FeatureInformation;
  preSetup: PreSetup;
  executionMatrix: ExecutionMatrix;
  prerequisites: Prerequisite[];
  testVariables: TestVariableCategory[];
  testScenarios: TestScenario[];
}

export interface Metadata {
  title: string;
  feature: string;
  createdBy: string;
  dateCreated: string;
  lastUpdated: string;
  status: string;
}

export interface FeatureInformation {
  feature: string;
  details: string[];
}

export interface PreSetup {
  purpose: string;
  tenantSetup: string[];
  userAccounts: UserAccount[];
  checklistItems: string[];
}

export interface UserAccount {
  prerequisite: string;
  quantity: number;
  notes: string;
}

export interface ExecutionMatrix {
  important: string;
  matrix: MatrixRow[];
  instructions: string[];
  executionFlow: string[];
}

export interface MatrixRow {
  userType: string;
  platform: string;
  variableSet: string;
  executionStatus: string;
}

export interface Prerequisite {
  id: string;
  dataObject: string;
  steps: string[];
}

export interface TestVariableCategory {
  category: string;
  variables: TestVariable[];
}

export interface TestVariable {
  name: string;
  actualValue: string;
  notes: string;
}

export interface TestScenario {
  id: string;
  title: string;
  description: string;
  testCases: TestCase[];
}

export interface TestCase {
  testId: string;
  title: string;
  prerequisiteReference: string;
  actionSteps: string[];
  expectedResult: string[];
  notes: string;
}

