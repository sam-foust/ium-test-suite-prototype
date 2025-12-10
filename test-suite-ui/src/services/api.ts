import * as Gherkin from '@cucumber/gherkin';
import * as Messages from '@cucumber/messages';
import type { GherkinFeature, TestSuiteListItem, GherkinScenario, GherkinStep, GherkinExamples } from '../types';

const BASE_PATH = import.meta.env.BASE_URL || '/';
const TEST_SUITES_PATH = `${BASE_PATH}test-suites/`;

console.log('BASE_PATH:', BASE_PATH);
console.log('TEST_SUITES_PATH:', TEST_SUITES_PATH);

interface ManifestEntry {
  id: string;
  file: string;
  category?: string;
}

interface Manifest {
  testSuites: ManifestEntry[];
}

/**
 * Fetch and parse a Gherkin feature file
 */
async function fetchGherkin(url: string, id: string): Promise<GherkinFeature> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  const text = await response.text();
  
  // Parse with Gherkin parser
  const uuidFn = Messages.IdGenerator.uuid();
  const builder = new Gherkin.AstBuilder(uuidFn);
  const matcher = new Gherkin.GherkinClassicTokenMatcher();
  const parser = new Gherkin.Parser(builder, matcher);
  
  const gherkinDocument = parser.parse(text);
  const feature = gherkinDocument.feature;
  
  if (!feature) {
    throw new Error(`No feature found in ${url}`);
  }
  
  // Transform to our format
  const transformedFeature: GherkinFeature = {
    id,
    name: feature.name || '',
    description: feature.description || '',
    tags: feature.tags?.map((tag) => tag.name.replace('@', '')) || [],
    language: feature.language || 'en',
    background: undefined,
    rules: [],
    scenarios: [],
  };
  
  // Process children (Background, Rules, and Scenarios)
  for (const child of feature.children) {
    if (child.background) {
      transformedFeature.background = {
        name: child.background.name || 'Background',
        steps: child.background.steps.map(transformStep),
      };
    } else if (child.rule) {
      const rule = child.rule;
      const transformedRule: any = {
        id: rule.id || '',
        name: rule.name || '',
        description: rule.description || '',
        tags: rule.tags?.map((tag: any) => tag.name.replace('@', '')) || [],
        background: undefined,
        scenarios: [],
      };
      
      // Process rule children (Background and Scenarios within the rule)
      for (const ruleChild of rule.children) {
        if (ruleChild.background) {
          transformedRule.background = {
            name: ruleChild.background.name || 'Background',
            steps: ruleChild.background.steps.map(transformStep),
          };
        } else if (ruleChild.scenario) {
          const scenario = ruleChild.scenario;
          const transformedScenario: GherkinScenario = {
            id: scenario.id || '',
            name: scenario.name || '',
            tags: scenario.tags?.map((tag) => tag.name.replace('@', '')) || [],
            steps: scenario.steps.map(transformStep),
            examples: scenario.examples?.map(transformExamples),
          };
          transformedRule.scenarios.push(transformedScenario);
        }
      }
      
      transformedFeature.rules.push(transformedRule);
    } else if (child.scenario) {
      const scenario = child.scenario;
      const transformedScenario: GherkinScenario = {
        id: scenario.id || '',
        name: scenario.name || '',
        tags: scenario.tags?.map((tag) => tag.name.replace('@', '')) || [],
        steps: scenario.steps.map(transformStep),
        examples: scenario.examples?.map(transformExamples),
      };
      transformedFeature.scenarios.push(transformedScenario);
    }
  }
  
  return transformedFeature;
}

function transformStep(step: Messages.Step): GherkinStep {
  return {
    keyword: step.keyword.trim(),
    text: step.text || '',
    docString: step.docString?.content,
    dataTable: step.dataTable?.rows?.map(row => row.cells.map(cell => cell.value)),
  };
}

function transformExamples(examples: Messages.Examples): GherkinExamples {
  const tableHeader = examples.tableHeader?.cells.map(cell => cell.value) || [];
  const tableRows = examples.tableBody?.map(row => row.cells.map(cell => cell.value)) || [];
  
  return {
    name: examples.name || 'Examples',
    tableHeader,
    tableRows,
  };
}

/**
 * Extract metadata from Gherkin tags and description for list view
 */
function extractMetadata(feature: GherkinFeature) {
  // Extract status from tags if present (e.g., @draft, @active, @completed)
  const statusTag = feature.tags.find(tag => 
    ['draft', 'active', 'completed', 'deprecated'].includes(tag.toLowerCase())
  );
  const status = statusTag ? statusTag.charAt(0).toUpperCase() + statusTag.slice(1) : 'Active';
  
  // Use feature name as title
  const title = feature.name;
  
  // Extract feature category from tags or use name
  const featureTag = feature.tags.find(tag => !['draft', 'active', 'completed', 'deprecated', 'critical', 'smoke'].includes(tag.toLowerCase()));
  const featureName = featureTag ? featureTag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'General';
  
  // Use current date as lastUpdated (in real scenario, this would come from git or file metadata)
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return {
    title,
    feature: featureName,
    status,
    lastUpdated,
  };
}

/**
 * Fetch the manifest file listing all test suites
 */
async function getManifest(): Promise<Manifest> {
  const url = `${TEST_SUITES_PATH}manifest.json`;
  console.log('Fetching manifest from:', url);
  const response = await fetch(url);
  console.log('Manifest response:', response.status, response.statusText);
  if (!response.ok) {
    throw new Error(`Failed to fetch manifest: ${response.statusText}`);
  }
  return response.json();
}

export const testSuiteApi = {
  /**
   * Get all test suites
   */
  getAllTestSuites: async (): Promise<TestSuiteListItem[]> => {
    const manifest = await getManifest();
    
    // Fetch basic info from each test suite
    const suites = await Promise.all(
      manifest.testSuites.map(async (entry) => {
        const feature = await fetchGherkin(`${TEST_SUITES_PATH}${entry.file}`, entry.id);
        const metadata = extractMetadata(feature);
        
        return {
          id: entry.id,
          title: metadata.title,
          feature: metadata.feature,
          status: metadata.status,
          lastUpdated: metadata.lastUpdated,
          category: entry.category,
        };
      })
    );
    
    return suites;
  },

  /**
   * Get a specific test suite by ID
   */
  getTestSuiteById: async (id: string): Promise<GherkinFeature> => {
    const manifest = await getManifest();
    const entry = manifest.testSuites.find((e) => e.id === id);
    
    if (!entry) {
      throw new Error(`Test suite with ID '${id}' not found`);
    }
    
    const feature = await fetchGherkin(`${TEST_SUITES_PATH}${entry.file}`, id);
    return feature;
  },
};
