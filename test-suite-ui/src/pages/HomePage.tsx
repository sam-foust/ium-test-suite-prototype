import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { testSuiteApi } from '../services/api';
import TestSuiteList from '../components/TestSuiteList';
import GherkinFeatureViewer from '../components/GherkinFeatureViewer';
import type { TestSuiteListItem } from '../types';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const suiteId = searchParams.get('suite');
  
  const [testSuites, setTestSuites] = useState<TestSuiteListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch list of test features
  useEffect(() => {
    const fetchTestSuites = async () => {
      try {
        console.log('HomePage: Fetching test features...');
        const data = await testSuiteApi.getAllTestSuites();
        console.log('HomePage: Received test features:', data);
        setTestSuites(data);
      } catch (err) {
        setError('Failed to load test features. Error: ' + (err instanceof Error ? err.message : String(err)));
        console.error('Error fetching test features:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestSuites();
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  if (loading && !suiteId) {
    return <div className="loading">Loading...</div>;
  }

  if (error && !suiteId && testSuites.length === 0) {
    return <div className="error">{error}</div>;
  }

  // Show detail view if suite is selected
  if (suiteId) {
    return <GherkinFeatureViewer suiteId={suiteId} onBack={handleBack} />;
  }

  // Show list view
  return <TestSuiteList testSuites={testSuites} />;
};

export default HomePage;
