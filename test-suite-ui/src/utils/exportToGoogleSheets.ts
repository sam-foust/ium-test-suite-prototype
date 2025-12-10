import * as XLSX from 'xlsx-js-style';
import type { GherkinFeature, GherkinRule, GherkinScenario } from '../types';

interface ExportOptions {
  feature: GherkinFeature;
  url: string;
}

export function exportFeatureToExcel(options: ExportOptions): void {
  const { feature, url } = options;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const wsData: any[][] = [];

  // Nice card-style header
  wsData.push(['MANUAL TEST FEATURE RECORD', '', '', '']);
  wsData.push(['', '', '', '']);
  wsData.push(['Feature Name:', feature.name, '', '']);
  wsData.push(['Test Date:', currentDate, '', '']);
  wsData.push(['Feature Link:', url, '', '']);
  wsData.push(['Feature Tags:', feature.tags.map(t => `@${t}`).join(', '), '', '']);
  wsData.push(['', '', '', '']);
  
  if (feature.description) {
    wsData.push(['Description:', '', '', '']);
    wsData.push([feature.description, '', '', '']);
    wsData.push(['', '', '', '']);
  }

  // Feature-level background
  if (feature.background) {
    wsData.push(['═══ FEATURE BACKGROUND ═══', '', '', '']);
    wsData.push(['These steps apply to all scenarios below', '', '', '']);
    wsData.push(['', '', '', '']);
    feature.background.steps.forEach(step => {
      wsData.push([`${step.keyword} ${step.text}`, '', '', '']);
    });
    wsData.push(['', '', '', '']);
  }

  // Track merges
  const mergeRanges: any[] = [];
  
  // Merge header cells
  mergeRanges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }); // Title
  mergeRanges.push({ s: { r: 2, c: 1 }, e: { r: 2, c: 3 } }); // Feature name
  mergeRanges.push({ s: { r: 3, c: 1 }, e: { r: 3, c: 3 } }); // Date
  mergeRanges.push({ s: { r: 4, c: 1 }, e: { r: 4, c: 3 } }); // Link
  mergeRanges.push({ s: { r: 5, c: 1 }, e: { r: 5, c: 3 } }); // Tags

  // Process rules
  if (feature.rules.length > 0) {
    feature.rules.forEach((rule, ruleIndex) => {
      addRuleToData(wsData, rule, ruleIndex + 1, mergeRanges);
    });
  }

  // Process standalone scenarios
  if (feature.scenarios.length > 0) {
    wsData.push(['', '', '', '']);
    wsData.push(['═══ SCENARIOS (NOT IN RULES) ═══', '', '', '']);
    mergeRanges.push({ s: { r: wsData.length - 1, c: 0 }, e: { r: wsData.length - 1, c: 3 } });
    wsData.push(['', '', '', '']);
    
    feature.scenarios.forEach((scenario, index) => {
      addScenarioToData(wsData, scenario, null, index + 1, mergeRanges);
    });
  }

  // Instructions
  wsData.push(['', '', '', '']);
  wsData.push(['═══ TESTING INSTRUCTIONS ═══', '', '', '']);
  mergeRanges.push({ s: { r: wsData.length - 1, c: 0 }, e: { r: wsData.length - 1, c: 3 } });
  wsData.push(['• Check Pass or Fail checkbox for each step as you test', '', '', '']);
  mergeRanges.push({ s: { r: wsData.length - 1, c: 0 }, e: { r: wsData.length - 1, c: 3 } });
  wsData.push(['• Add observations or issues in the Notes column', '', '', '']);
  mergeRanges.push({ s: { r: wsData.length - 1, c: 0 }, e: { r: wsData.length - 1, c: 3 } });
  wsData.push(['• Fill out Scenario Notes section after each scenario', '', '', '']);
  mergeRanges.push({ s: { r: wsData.length - 1, c: 0 }, e: { r: wsData.length - 1, c: 3 } });
  wsData.push(['• Color coding: Blue=Given (setup), Green=When (action), Orange=Then (verify), Purple=And/But', '', '', '']);
  mergeRanges.push({ s: { r: wsData.length - 1, c: 0 }, e: { r: wsData.length - 1, c: 3 } });

  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  ws['!merges'] = mergeRanges;

  // Column widths
  ws['!cols'] = [
    { wch: 100 }, // Step
    { wch: 8 },   // Pass
    { wch: 8 },   // Fail
    { wch: 50 },  // Notes
  ];

  // Add checkboxes to Pass and Fail columns
  // Find all rows that are step rows (have Pass/Fail columns)
  const checkboxRows: number[] = [];
  for (let R = 0; R < wsData.length; R++) {
    const cellA = wsData[R][0];
    const cellB = wsData[R][1];
    const cellC = wsData[R][2];
    // If this is a step row (has empty Pass/Fail cells and a step in column A)
    if (cellA && typeof cellA === 'string' && 
        (cellA.startsWith('Given ') || cellA.startsWith('When ') || 
         cellA.startsWith('Then ') || cellA.startsWith('And ') || cellA.startsWith('But ')) &&
        cellB === '' && cellC === '') {
      checkboxRows.push(R);
    }
  }

  // Add data validation (checkboxes) to Pass and Fail columns for step rows
  if (!ws['!dataValidation']) {
    ws['!dataValidation'] = [];
  }

  checkboxRows.forEach(R => {
    // Pass column (B)
    const passCell = XLSX.utils.encode_cell({ r: R, c: 1 });
    ws['!dataValidation'].push({
      type: 'list',
      sqref: passCell,
      formulas: ['TRUE,FALSE'],
      showDropDown: false,
    });

    // Fail column (C)
    const failCell = XLSX.utils.encode_cell({ r: R, c: 2 });
    ws['!dataValidation'].push({
      type: 'list',
      sqref: failCell,
      formulas: ['TRUE,FALSE'],
      showDropDown: false,
    });
  });

  // Row heights
  ws['!rows'] = [];
  for (let i = 0; i < wsData.length; i++) {
    ws['!rows'][i] = { hpt: 20 };
  }
  ws['!rows'][0] = { hpt: 32 }; // Title

  // Styling
  const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
  
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
      if (!ws[cellAddress]) continue;
      
      const cell = ws[cellAddress];
      const value = String(cell.v || '');
      
      // Header section (rows 0-9)
      if (R === 0) {
        // Title
        cell.s = {
          font: { bold: true, sz: 16, color: { rgb: "FFFFFF" }, name: "Arial" },
          fill: { fgColor: { rgb: "2C3E50" } },
          alignment: { horizontal: "center", vertical: "center" }
        };
      } else if (R >= 2 && R <= 5 && C === 0) {
        // Labels (Feature Name, Generated Date, etc)
        cell.s = {
          font: { bold: true, sz: 11, name: "Arial" },
          fill: { fgColor: { rgb: "ECF0F1" } },
          alignment: { horizontal: "right", vertical: "center" }
        };
      } else if (R >= 2 && R <= 5 && C === 1) {
        // Values
        cell.s = {
          font: { sz: 10, name: "Arial" },
          fill: { fgColor: { rgb: "FFFFFF" } },
          alignment: { horizontal: "left", vertical: "center", wrapText: true },
          border: {
            top: { style: "thin", color: { rgb: "BDC3C7" } },
            bottom: { style: "thin", color: { rgb: "BDC3C7" } },
            left: { style: "thin", color: { rgb: "BDC3C7" } },
            right: { style: "thin", color: { rgb: "BDC3C7" } }
          }
        };
      }
      // Description label
      else if (value === 'Description:' && C === 0) {
        cell.s = {
          font: { bold: true, sz: 10, name: "Arial" },
          fill: { fgColor: { rgb: "ECF0F1" } },
          alignment: { horizontal: "left", vertical: "center" }
        };
      }
      // Description text
      else if (value === feature.description) {
        cell.s = {
          font: { italic: true, sz: 10, name: "Arial" },
          fill: { fgColor: { rgb: "FDFEFE" } },
          alignment: { horizontal: "left", vertical: "top", wrapText: true },
          border: {
            top: { style: "thin", color: { rgb: "D5DBDB" } },
            bottom: { style: "thin", color: { rgb: "D5DBDB" } }
          }
        };
      }
      // Section dividers (═══ headers)
      else if (value.includes('═══')) {
        let color = "34495E";
        if (value.includes('FEATURE BACKGROUND')) color = "E67E22";
        if (value.includes('RULE')) color = "8E44AD";
        if (value.includes('TESTING INSTRUCTIONS')) color = "16A085";
        
        cell.s = {
          font: { bold: true, sz: 12, color: { rgb: "FFFFFF" }, name: "Arial" },
          fill: { fgColor: { rgb: color } },
          alignment: { horizontal: "center", vertical: "center" }
        };
      }
      // Helper text (These steps apply, Standard password management, etc)
      else if ((value.includes('These steps apply') || value.includes('Standard password') || 
                value.includes('Administrative') || value.includes('Password management')) && C === 0) {
        cell.s = {
          font: { italic: true, sz: 9, name: "Arial", color: { rgb: "7F8C8D" } },
          fill: { fgColor: { rgb: "F8F9F9" } },
          alignment: { horizontal: "left", vertical: "center" }
        };
      }
      // Tags
      else if (value.startsWith('Tags: @')) {
        cell.s = {
          font: { sz: 9, name: "Arial", italic: true, color: { rgb: "95A5A6" } },
          fill: { fgColor: { rgb: "FAFAFA" } },
          alignment: { horizontal: "left", vertical: "center" }
        };
      }
      // Step headers
      else if (value === 'Step' || value === 'Pass' || value === 'Fail' || value === 'Notes') {
        cell.s = {
          font: { bold: true, sz: 10, color: { rgb: "FFFFFF" }, name: "Arial" },
          fill: { fgColor: { rgb: "34495E" } },
          alignment: { horizontal: "center", vertical: "center" },
          border: {
            top: { style: "medium", color: { rgb: "2C3E50" } },
            bottom: { style: "medium", color: { rgb: "2C3E50" } }
          }
        };
      }
      // Given steps - very light blue tint
      else if (value.startsWith('Given ')) {
        cell.s = {
          font: { sz: 10, name: "Consolas", bold: true, color: { rgb: "2E86AB" } },
          fill: { fgColor: { rgb: "EBF5FB" } },
          alignment: { horizontal: "left", vertical: "top", wrapText: true },
          border: {
            top: { style: "thin", color: { rgb: "D6EAF8" } },
            bottom: { style: "thin", color: { rgb: "D6EAF8" } },
            left: { style: "thin", color: { rgb: "D6EAF8" } },
            right: { style: "thin", color: { rgb: "D6EAF8" } }
          }
        };
      }
      // When steps - very light green tint
      else if (value.startsWith('When ')) {
        cell.s = {
          font: { sz: 10, name: "Consolas", bold: true, color: { rgb: "229954" } },
          fill: { fgColor: { rgb: "EAFAF1" } },
          alignment: { horizontal: "left", vertical: "top", wrapText: true },
          border: {
            top: { style: "thin", color: { rgb: "D5F4E6" } },
            bottom: { style: "thin", color: { rgb: "D5F4E6" } },
            left: { style: "thin", color: { rgb: "D5F4E6" } },
            right: { style: "thin", color: { rgb: "D5F4E6" } }
          }
        };
      }
      // Then steps - very light orange tint
      else if (value.startsWith('Then ')) {
        cell.s = {
          font: { sz: 10, name: "Consolas", bold: true, color: { rgb: "D68910" } },
          fill: { fgColor: { rgb: "FEF5E7" } },
          alignment: { horizontal: "left", vertical: "top", wrapText: true },
          border: {
            top: { style: "thin", color: { rgb: "FCF3CF" } },
            bottom: { style: "thin", color: { rgb: "FCF3CF" } },
            left: { style: "thin", color: { rgb: "FCF3CF" } },
            right: { style: "thin", color: { rgb: "FCF3CF" } }
          }
        };
      }
      // And/But steps - very light purple tint
      else if (value.startsWith('And ') || value.startsWith('But ')) {
        cell.s = {
          font: { sz: 10, name: "Consolas", bold: true, color: { rgb: "7D3C98" } },
          fill: { fgColor: { rgb: "F4ECF7" } },
          alignment: { horizontal: "left", vertical: "top", wrapText: true },
          border: {
            top: { style: "thin", color: { rgb: "E8DAEF" } },
            bottom: { style: "thin", color: { rgb: "E8DAEF" } },
            left: { style: "thin", color: { rgb: "E8DAEF" } },
            right: { style: "thin", color: { rgb: "E8DAEF" } }
          }
        };
      }
      // SCENARIO NOTES
      else if (value === 'SCENARIO NOTES') {
        cell.s = {
          font: { bold: true, sz: 11, color: { rgb: "FFFFFF" }, name: "Arial" },
          fill: { fgColor: { rgb: "D68910" } },
          alignment: { horizontal: "left", vertical: "center" }
        };
      }
      // Scenario notes fields
      else if (value.match(/^(Status|Tester Name|Test Date|Additional Comments):/) && C === 0) {
        cell.s = {
          font: { bold: true, sz: 10, name: "Arial" },
          fill: { fgColor: { rgb: "FEF9E7" } },
          alignment: { horizontal: "left", vertical: "center" }
        };
      }
      // Instruction bullets
      else if (value.startsWith('•') && C === 0) {
        cell.s = {
          font: { sz: 10, name: "Arial" },
          fill: { fgColor: { rgb: "EBF5FB" } },
          alignment: { horizontal: "left", vertical: "center", wrapText: true }
        };
      }
      // Pass/Fail empty cells
      else if ((C === 1 || C === 2) && value === '') {
        cell.s = {
          fill: { fgColor: { rgb: "FFFFFF" } },
          alignment: { horizontal: "center", vertical: "center" },
          border: {
            top: { style: "thin", color: { rgb: "E5E8E8" } },
            bottom: { style: "thin", color: { rgb: "E5E8E8" } },
            left: { style: "thin", color: { rgb: "E5E8E8" } },
            right: { style: "thin", color: { rgb: "E5E8E8" } }
          }
        };
      }
      // Notes empty cells
      else if (C === 3 && value === '') {
        cell.s = {
          fill: { fgColor: { rgb: "F8F9F9" } },
          alignment: { horizontal: "left", vertical: "top", wrapText: true },
          border: {
            top: { style: "thin", color: { rgb: "E5E8E8" } },
            bottom: { style: "thin", color: { rgb: "E5E8E8" } },
            left: { style: "thin", color: { rgb: "E5E8E8" } },
            right: { style: "thin", color: { rgb: "E5E8E8" } }
          }
        };
      }
    }
  }

  XLSX.utils.book_append_sheet(wb, ws, 'Test Execution');
  
  // Generate filename: feature-name-test-record-YYYY-MM-DD.xlsx
  const dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const featureName = feature.name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  const filename = `${featureName}-test-record-${dateStr}.xlsx`;
  
  XLSX.writeFile(wb, filename);
}

function addRuleToData(
  data: any[][], 
  rule: GherkinRule, 
  ruleNumber: number,
  mergeRanges: any[]
): void {
  data.push(['', '', '', '']);
  const ruleRow = data.length;
  data.push([`═══ RULE ${ruleNumber}: ${rule.name} ═══`, '', '', '']);
  mergeRanges.push({ s: { r: ruleRow, c: 0 }, e: { r: ruleRow, c: 3 } });
  
  if (rule.description) {
    const descRow = data.length;
    data.push([rule.description, '', '', '']);
    mergeRanges.push({ s: { r: descRow, c: 0 }, e: { r: descRow, c: 3 } });
  }
  
  if (rule.tags.length > 0) {
    const tagRow = data.length;
    data.push([`Tags: ${rule.tags.map(t => `@${t}`).join(', ')}`, '', '', '']);
    mergeRanges.push({ s: { r: tagRow, c: 0 }, e: { r: tagRow, c: 3 } });
  }
  
  data.push(['', '', '', '']);

  if (rule.background) {
    const bgRow = data.length;
    data.push(['Rule Background - These steps apply to all scenarios in this rule', '', '', '']);
    mergeRanges.push({ s: { r: bgRow, c: 0 }, e: { r: bgRow, c: 3 } });
    data.push(['', '', '', '']);
    rule.background.steps.forEach(step => {
      const stepRow = data.length;
      data.push([`${step.keyword} ${step.text}`, '', '', '']);
      mergeRanges.push({ s: { r: stepRow, c: 0 }, e: { r: stepRow, c: 3 } });
    });
    data.push(['', '', '', '']);
  }

  rule.scenarios.forEach((scenario, index) => {
    addScenarioToData(data, scenario, ruleNumber, index + 1, mergeRanges);
  });
}

function addScenarioToData(
  data: any[][], 
  scenario: GherkinScenario, 
  ruleNumber: number | null,
  scenarioNumber: number,
  mergeRanges: any[]
): void {
  const scenarioLabel = ruleNumber 
    ? `Rule ${ruleNumber} - Scenario ${scenarioNumber}` 
    : `Scenario ${scenarioNumber}`;

  data.push(['', '', '', '']);
  const scenarioRow = data.length;
  data.push([`▸ ${scenarioLabel}: ${scenario.name}`, '', '', '']);
  mergeRanges.push({ s: { r: scenarioRow, c: 0 }, e: { r: scenarioRow, c: 3 } });
  
  if (scenario.tags.length > 0) {
    const tagRow = data.length;
    data.push([`Tags: ${scenario.tags.map(t => `@${t}`).join(', ')}`, '', '', '']);
    mergeRanges.push({ s: { r: tagRow, c: 0 }, e: { r: tagRow, c: 3 } });
  }
  
  data.push(['', '', '', '']);
  data.push(['Step', 'Pass', 'Fail', 'Notes']);
  
  scenario.steps.forEach(step => {
    data.push([
      `${step.keyword} ${step.text}`,
      '',
      '',
      '',
    ]);
  });
  
  data.push(['', '', '', '']);
  const notesRow = data.length;
  data.push(['SCENARIO NOTES', '', '', '']);
  mergeRanges.push({ s: { r: notesRow, c: 0 }, e: { r: notesRow, c: 3 } });
  
  ['Status (Pass/Fail):', 'Tester Name:', 'Test Date:', 'Additional Comments:'].forEach(label => {
    const row = data.length;
    data.push([label, '', '', '']);
    mergeRanges.push({ s: { r: row, c: 0 }, e: { r: row, c: 3 } });
  });
  
  data.push(['', '', '', '']);
}

export { exportFeatureToExcel as exportFeatureToCSV };
