import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { testSuiteApi } from '../services/api';
import TestSuiteList from '../components/TestSuiteList';
import TestSuiteDetail from '../components/TestSuiteDetail';
import type { TestSuiteListItem, TestSuite } from '../types';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const suiteId = searchParams.get('suite');
  
  const [testSuites, setTestSuites] = useState<TestSuiteListItem[]>([]);
  const [selectedSuite, setSelectedSuite] = useState<TestSuite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch list of test suites
  useEffect(() => {
    const fetchTestSuites = async () => {
      try {
        console.log('HomePage: Fetching test suites...');
        const data = await testSuiteApi.getAllTestSuites();
        console.log('HomePage: Received test suites:', data);
        setTestSuites(data);
      } catch (err) {
        setError('Failed to load test suites. Error: ' + (err instanceof Error ? err.message : String(err)));
        console.error('Error fetching test suites:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestSuites();
  }, []);

  // Fetch specific suite if suiteId is in query string
  useEffect(() => {
    const fetchSuite = async () => {
      if (!suiteId) {
        setSelectedSuite(null);
        return;
      }

      try {
        setLoading(true);
        console.log('HomePage: Fetching suite:', suiteId);
        const data = await testSuiteApi.getTestSuiteById(suiteId);
        console.log('HomePage: Received suite:', data);
        setSelectedSuite(data);
        setError(null);
      } catch (err) {
        setError('Failed to load test suite. Error: ' + (err instanceof Error ? err.message : String(err)));
        console.error('Error fetching test suite:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuite();
  }, [suiteId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error && !selectedSuite && testSuites.length === 0) {
    return <div className="error">{error}</div>;
  }

  // Show detail view if suite is selected
  if (suiteId && selectedSuite) {
    return (
      <div>
        <div className="page-header">
          <Link to="/" className="back-link">← Back to Test Suites</Link>
        </div>
        <TestSuiteDetail testSuite={selectedSuite} />
      </div>
    );
  }

  // Show list view
  return <TestSuiteList testSuites={testSuites} />;
};

export default HomePage;

