import React, { useEffect, useState } from 'react';
import { testSuiteApi } from '../services/api';
import type { GherkinFeature, GherkinScenario, GherkinBackground, GherkinRule } from '../types';
import './GherkinFeatureViewer.css';

interface GherkinFeatureViewerProps {
  suiteId: string;
  onBack: () => void;
}

const GherkinFeatureViewer: React.FC<GherkinFeatureViewerProps> = ({ suiteId, onBack }) => {
  const [feature, setFeature] = useState<GherkinFeature | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedScenarios, setExpandedScenarios] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        setLoading(true);
        const fetchedFeature = await testSuiteApi.getTestSuiteById(suiteId);
        setFeature(fetchedFeature);
        // Scenarios collapsed by default
        setExpandedScenarios(new Set());
      } catch (err) {
        console.error('Failed to fetch feature:', err);
        setError('Failed to load feature. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeature();
  }, [suiteId]);

  const toggleScenario = (scenarioId: string) => {
    setExpandedScenarios(prev => {
      const newSet = new Set(prev);
      if (newSet.has(scenarioId)) {
        newSet.delete(scenarioId);
      } else {
        newSet.add(scenarioId);
      }
      return newSet;
    });
  };

  const renderBackground = (background: GherkinBackground) => (
    <div className="background-section">
      <h3 className="background-title">
        <span className="keyword">Background:</span>
      </h3>
      <div className="steps">
        {background.steps.map((step, index) => (
          <div key={index} className={`step step-${step.keyword.toLowerCase()}`}>
            <span className="step-keyword">{step.keyword}</span>
            <span className="step-text">{step.text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScenario = (scenario: GherkinScenario) => (
    <div key={scenario.id} className="scenario-card">
      <div 
        className="scenario-header"
        onClick={() => toggleScenario(scenario.id)}
      >
        <div className="scenario-header-content">
          <div className="scenario-tags">
            {scenario.tags.map((tag, index) => (
              <span key={index} className={`tag tag-${tag}`}>@{tag}</span>
            ))}
          </div>
          <h4 className="scenario-title">
            <span className="keyword">Scenario:</span> {scenario.name}
          </h4>
        </div>
        <span className="expand-icon">
          {expandedScenarios.has(scenario.id) ? '▼' : '▶'}
        </span>
      </div>

      {expandedScenarios.has(scenario.id) && (
        <div className="scenario-content">
          <div className="steps">
            {scenario.steps.map((step, index) => (
              <div key={index} className={`step step-${step.keyword.toLowerCase()}`}>
                <span className="step-keyword">{step.keyword}</span>
                <span className="step-text">{step.text}</span>
                {step.docString && (
                  <pre className="doc-string">{step.docString}</pre>
                )}
                {step.dataTable && (
                  <table className="data-table">
                    <tbody>
                      {step.dataTable.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>

          {scenario.examples && scenario.examples.length > 0 && (
            <div className="examples-section">
              {scenario.examples.map((examples, index) => (
                <div key={index} className="examples">
                  <h5 className="examples-title">
                    <span className="keyword">Examples:</span> {examples.name}
                  </h5>
                  <table className="examples-table">
                    <thead>
                      <tr>
                        {examples.tableHeader.map((header, hIndex) => (
                          <th key={hIndex}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {examples.tableRows.map((row, rIndex) => (
                        <tr key={rIndex}>
                          {row.map((cell, cIndex) => (
                            <td key={cIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderRule = (rule: GherkinRule) => (
    <div key={rule.id} className="rule-section">
      <div className="rule-header">
        <div className="rule-tags">
          {rule.tags.map((tag, index) => (
            <span key={index} className={`tag tag-${tag}`}>@{tag}</span>
          ))}
        </div>
        <h2 className="rule-title">
          <span className="keyword">Rule:</span> {rule.name}
        </h2>
        {rule.description && (
          <p className="rule-description">{rule.description}</p>
        )}
      </div>

      {rule.background && renderBackground(rule.background)}

      <div className="scenarios-section">
        {rule.scenarios.map(renderScenario)}
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading feature...</div>;
  }

  if (error || !feature) {
    return (
      <div className="error-container">
        <div className="error-message">{error || 'Feature not found'}</div>
        <button onClick={onBack} className="back-button">Back to Test Suites</button>
      </div>
    );
  }

  return (
    <div className="gherkin-feature-viewer">
      <div className="feature-header">
        <button onClick={onBack} className="back-button">← Back to Test Suites</button>
        
        <div className="feature-tags">
          {feature.tags.map((tag, index) => (
            <span key={index} className={`tag tag-${tag}`}>@{tag}</span>
          ))}
        </div>
        
        <h1 className="feature-title">
          <span className="keyword">Feature:</span> {feature.name}
        </h1>
        
        {feature.description && (
          <p className="feature-description">{feature.description}</p>
        )}
      </div>

      {feature.background && renderBackground(feature.background)}

      {/* Render Rules */}
      {feature.rules.length > 0 && (
        <div className="rules-container">
          {feature.rules.map(renderRule)}
        </div>
      )}

      {/* Render scenarios that are not in rules */}
      {feature.scenarios.length > 0 && (
        <div className="scenarios-section">
          {feature.scenarios.map(renderScenario)}
        </div>
      )}
    </div>
  );
};

export default GherkinFeatureViewer;
