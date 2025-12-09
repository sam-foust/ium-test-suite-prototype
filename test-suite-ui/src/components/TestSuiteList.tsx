import { Link } from 'react-router-dom';
import { TestSuiteListItem } from '../types';

interface TestSuiteListProps {
  testSuites: TestSuiteListItem[];
}

const TestSuiteList = ({ testSuites }: TestSuiteListProps) => {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft':
        return 'status-draft';
      case 'review':
        return 'status-review';
      case 'approved':
        return 'status-approved';
      case 'executed':
        return 'status-executed';
      default:
        return '';
    }
  };

  return (
    <div className="test-suite-list">
      <h1>Test Suite Library</h1>
      <p className="subtitle">View and manage your manual test suites</p>
      
      {testSuites.length === 0 ? (
        <div className="empty-state">
          <p>No test suites found. Add YAML files to the test-suites folder.</p>
        </div>
      ) : (
        <div className="test-suite-cards">
          {testSuites.map((suite) => (
            <Link 
              key={suite.id} 
              to={`/?suite=${suite.id}`}
              className="test-suite-card"
            >
              <div className="card-header">
                <h2>{suite.title}</h2>
                <span className={`status-badge ${getStatusClass(suite.status)}`}>
                  {suite.status}
                </span>
              </div>
              <div className="card-body">
                <p className="feature">{suite.feature}</p>
                <p className="last-updated">Last updated: {suite.lastUpdated}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestSuiteList;

