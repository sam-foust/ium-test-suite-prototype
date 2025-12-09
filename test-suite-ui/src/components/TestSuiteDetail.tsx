import { TestSuite } from '../types';

interface TestSuiteDetailProps {
  testSuite: TestSuite;
}

const TestSuiteDetail = ({ testSuite }: TestSuiteDetailProps) => {
  return (
    <div className="test-suite-detail">
      {/* Metadata */}
      <div className="section metadata-section">
        <h1>{testSuite.metadata.title}</h1>
        <div className="metadata-grid">
          <div className="metadata-item">
            <span className="label">Feature:</span>
            <span>{testSuite.metadata.feature}</span>
          </div>
          <div className="metadata-item">
            <span className="label">Created By:</span>
            <span>{testSuite.metadata.createdBy}</span>
          </div>
          <div className="metadata-item">
            <span className="label">Date Created:</span>
            <span>{testSuite.metadata.dateCreated}</span>
          </div>
          <div className="metadata-item">
            <span className="label">Last Updated:</span>
            <span>{testSuite.metadata.lastUpdated}</span>
          </div>
          <div className="metadata-item">
            <span className="label">Status:</span>
            <span className={`status-badge status-${testSuite.metadata.status.toLowerCase()}`}>
              {testSuite.metadata.status}
            </span>
          </div>
        </div>
      </div>

      {/* Feature Information */}
      <div className="section">
        <h2>Feature Information</h2>
        <p className="feature-description">{testSuite.featureInformation.feature}</p>
        <ul className="details-list">
          {testSuite.featureInformation.details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
      </div>

      {/* Pre-Setup */}
      <div className="section">
        <h2>Power Tester Pre-Setup</h2>
        <p className="purpose">{testSuite.preSetup.purpose}</p>
        
        <h3>Tenant Setup</h3>
        <ul>
          {testSuite.preSetup.tenantSetup.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h3>User Accounts to Create</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Prerequisite</th>
              <th>Quantity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {testSuite.preSetup.userAccounts.map((account, idx) => (
              <tr key={idx}>
                <td>{account.prerequisite}</td>
                <td>{account.quantity}</td>
                <td>{account.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Setup Completion Checklist</h3>
        <ul className="checklist">
          {testSuite.preSetup.checklistItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Execution Matrix */}
      <div className="section">
        <h2>Test Execution Matrix</h2>
        {testSuite.executionMatrix.important && (
          <div className="important-note">
            <strong>Important:</strong> {testSuite.executionMatrix.important}
          </div>
        )}
        
        <table className="data-table">
          <thead>
            <tr>
              <th>User Type</th>
              <th>Platform</th>
              <th>Variable Set</th>
              <th>Execution Status</th>
            </tr>
          </thead>
          <tbody>
            {testSuite.executionMatrix.matrix.map((row, idx) => (
              <tr key={idx}>
                <td>{row.userType}</td>
                <td>{row.platform}</td>
                <td>{row.variableSet}</td>
                <td>{row.executionStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Testing Instructions</h3>
        <ol>
          {testSuite.executionMatrix.instructions.map((instruction, idx) => (
            <li key={idx}>{instruction}</li>
          ))}
        </ol>

        <h3>Execution Flow</h3>
        <ol>
          {testSuite.executionMatrix.executionFlow.map((flow, idx) => (
            <li key={idx}>{flow}</li>
          ))}
        </ol>
      </div>

      {/* Prerequisites Library */}
      <div className="section">
        <h2>Prerequisites Library (Setup Data)</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Data Object</th>
              <th>Steps to Create</th>
            </tr>
          </thead>
          <tbody>
            {testSuite.prerequisites.map((prereq) => (
              <tr key={prereq.id}>
                <td><strong>{prereq.id}</strong></td>
                <td>{prereq.dataObject}</td>
                <td>
                  <ol>
                    {prereq.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Test Variables */}
      <div className="section">
        <h2>Test Variables Tracker</h2>
        {testSuite.testVariables.map((category) => (
          <div key={category.category} className="variable-category">
            <h3>{category.category}</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Actual Value</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {category.variables.map((variable, idx) => (
                  <tr key={idx}>
                    <td><code>{variable.name}</code></td>
                    <td>{variable.actualValue || '-'}</td>
                    <td>{variable.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Test Scenarios */}
      <div className="section">
        <h2>Test Scenarios</h2>
        {testSuite.testScenarios.map((scenario) => (
          <div key={scenario.id} className="test-scenario">
            <h3>
              {scenario.id}: {scenario.title}
            </h3>
            <p className="scenario-description">{scenario.description}</p>
            
            <table className="data-table test-cases-table">
              <thead>
                <tr>
                  <th>Test ID</th>
                  <th>Title</th>
                  <th>Prerequisite Reference</th>
                  <th>Action Steps</th>
                  <th>Expected Result</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {scenario.testCases.map((testCase) => (
                  <tr key={testCase.testId}>
                    <td><strong>{testCase.testId}</strong></td>
                    <td>{testCase.title}</td>
                    <td>{testCase.prerequisiteReference}</td>
                    <td>
                      <ol>
                        {testCase.actionSteps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </td>
                    <td>
                      <ul>
                        {testCase.expectedResult.map((result, idx) => (
                          <li key={idx}>{result}</li>
                        ))}
                      </ul>
                    </td>
                    <td>{testCase.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestSuiteDetail;

