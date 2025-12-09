import * as yaml from 'js-yaml';
import type { TestSuite, TestSuiteListItem } from '../types';

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
 * Fetch and parse a YAML file
 */
async function fetchYaml<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  const text = await response.text();
  return yaml.load(text) as T;
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
        const suite = await fetchYaml<TestSuite>(`${TEST_SUITES_PATH}${entry.file}`);
        return {
          id: entry.id,
          title: suite.metadata.title,
          feature: suite.metadata.feature,
          status: suite.metadata.status,
          lastUpdated: suite.metadata.lastUpdated,
          category: entry.category,
        };
      })
    );
    
    return suites;
  },

  /**
   * Get a specific test suite by ID
   */
  getTestSuiteById: async (id: string): Promise<TestSuite> => {
    const manifest = await getManifest();
    const entry = manifest.testSuites.find((e) => e.id === id);
    
    if (!entry) {
      throw new Error(`Test suite with ID '${id}' not found`);
    }
    
    const suite = await fetchYaml<TestSuite>(`${TEST_SUITES_PATH}${entry.file}`);
    suite.id = id; // Ensure ID is set
    return suite;
  },
};

