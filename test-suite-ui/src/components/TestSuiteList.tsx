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

  // Group test suites by category
  const groupedSuites = testSuites.reduce((acc, suite) => {
    const category = suite.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(suite);
    return acc;
  }, {} as Record<string, TestSuiteListItem[]>);

  const categories = Object.keys(groupedSuites).sort();

  return (
    <div className="test-suite-list">
      <h1>Test Suite Library</h1>
      <p className="subtitle">View and manage your manual test suites</p>
      
      {testSuites.length === 0 ? (
        <div className="empty-state">
          <p>No test suites found. Add YAML files to the test-suites folder.</p>
        </div>
      ) : (
        <>
          {categories.map((category) => (
            <div key={category} className="category-section">
              <h2 className="category-title">{category}</h2>
              <div className="test-suite-cards">
                {groupedSuites[category].map((suite) => (
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
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TestSuiteList;

