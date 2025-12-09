import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { testSuiteApi } from '../services/api';
import TestSuiteDetail from '../components/TestSuiteDetail';
import type { TestSuite } from '../types';

const TestSuitePage = () => {
  const { id } = useParams<{ id: string }>();
  const [testSuite, setTestSuite] = useState<TestSuite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestSuite = async () => {
      if (!id) {
        setError('No test suite ID provided');
        setLoading(false);
        return;
      }

      try {
        const data = await testSuiteApi.getTestSuiteById(id);
        setTestSuite(data);
      } catch (err) {
        setError('Failed to load test suite. Please ensure the API is running.');
        console.error('Error fetching test suite:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestSuite();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading test suite...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
        <Link to="/" className="back-link">← Back to Test Suites</Link>
      </div>
    );
  }

  if (!testSuite) {
    return (
      <div className="error-container">
        <div className="error">Test suite not found</div>
        <Link to="/" className="back-link">← Back to Test Suites</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <Link to="/" className="back-link">← Back to Test Suites</Link>
      </div>
      <TestSuiteDetail testSuite={testSuite} />
    </div>
  );
};

export default TestSuitePage;

