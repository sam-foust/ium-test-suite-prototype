import { useEffect, useState } from 'react';
import { testSuiteApi } from '../services/api';
import TestSuiteList from '../components/TestSuiteList';
import type { TestSuiteListItem } from '../types';

const HomePage = () => {
  const [testSuites, setTestSuites] = useState<TestSuiteListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestSuites = async () => {
      try {
        const data = await testSuiteApi.getAllTestSuites();
        setTestSuites(data);
      } catch (err) {
        setError('Failed to load test suites. Please ensure the API is running.');
        console.error('Error fetching test suites:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestSuites();
  }, []);

  if (loading) {
    return <div className="loading">Loading test suites...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return <TestSuiteList testSuites={testSuites} />;
};

export default HomePage;

