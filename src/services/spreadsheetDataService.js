// Spreadsheet & Business Analytics Data Engine
// SarlaYash OS Universe — Powered by Kapil
// Supports Charts, Pivot Tables, Pivot Charts, and Macro Automation

export const SAMPLE_DATASETS = {
  sales: {
    id: 'sales',
    name: 'Global Enterprise Tech Sales (2024)',
    headers: ['Date', 'Region', 'Rep', 'Category', 'Product', 'Units', 'Unit Price', 'Revenue', 'Profit'],
    rows: [
      { id: 1, Date: '2024-01-05', Region: 'North', Rep: 'Aarav Sharma', Category: 'Hardware', Product: 'Cloud Server X', Units: 12, 'Unit Price': 1200, Revenue: 14400, Profit: 3600 },
      { id: 2, Date: '2024-01-08', Region: 'West', Rep: 'Priya Patel', Category: 'Software', Product: 'SaaS Suite Pro', Units: 45, 'Unit Price': 250, Revenue: 11250, Profit: 7800 },
      { id: 3, Date: '2024-01-12', Region: 'South', Rep: 'Rohan Verma', Category: 'Services', Product: 'DevOps Audit', Units: 4, 'Unit Price': 3500, Revenue: 14000, Profit: 5200 },
      { id: 4, Date: '2024-01-15', Region: 'East', Rep: 'Ananya Roy', Category: 'Hardware', Product: 'Workstation Ultra', Units: 18, 'Unit Price': 850, Revenue: 15300, Profit: 4100 },
      { id: 5, Date: '2024-01-20', Region: 'North', Rep: 'Aarav Sharma', Category: 'Software', Product: 'AI Analytics Addon', Units: 30, 'Unit Price': 400, Revenue: 12000, Profit: 8400 },
      { id: 6, Date: '2024-01-22', Region: 'West', Rep: 'Priya Patel', Category: 'Hardware', Product: 'Cloud Server X', Units: 8, 'Unit Price': 1200, Revenue: 9600, Profit: 2400 },
      { id: 7, Date: '2024-02-02', Region: 'South', Rep: 'Rohan Verma', Category: 'Software', Product: 'SaaS Suite Pro', Units: 55, 'Unit Price': 250, Revenue: 13750, Profit: 9600 },
      { id: 8, Date: '2024-02-05', Region: 'East', Rep: 'Ananya Roy', Category: 'Services', Product: 'Cybersecurity Setup', Units: 5, 'Unit Price': 4200, Revenue: 21000, Profit: 9800 },
      { id: 9, Date: '2024-02-10', Region: 'North', Rep: 'Aarav Sharma', Category: 'Services', Product: 'DevOps Audit', Units: 6, 'Unit Price': 3500, Revenue: 21000, Profit: 7800 },
      { id: 10, Date: '2024-02-14', Region: 'West', Rep: 'Priya Patel', Category: 'Hardware', Product: 'Workstation Ultra', Units: 22, 'Unit Price': 850, Revenue: 18700, Profit: 5100 },
      { id: 11, Date: '2024-02-18', Region: 'South', Rep: 'Rohan Verma', Category: 'Hardware', Product: 'Cloud Server X', Units: 15, 'Unit Price': 1200, Revenue: 18000, Profit: 4500 },
      { id: 12, Date: '2024-02-25', Region: 'East', Rep: 'Ananya Roy', Category: 'Software', Product: 'AI Analytics Addon', Units: 40, 'Unit Price': 400, Revenue: 16000, Profit: 11200 },
      { id: 13, Date: '2024-03-02', Region: 'North', Rep: 'Aarav Sharma', Category: 'Hardware', Product: 'Workstation Ultra', Units: 25, 'Unit Price': 850, Revenue: 21250, Profit: 5800 },
      { id: 14, Date: '2024-03-08', Region: 'West', Rep: 'Priya Patel', Category: 'Services', Product: 'Cybersecurity Setup', Units: 7, 'Unit Price': 4200, Revenue: 29400, Profit: 13800 },
      { id: 15, Date: '2024-03-12', Region: 'South', Rep: 'Rohan Verma', Category: 'Services', Product: 'DevOps Audit', Units: 8, 'Unit Price': 3500, Revenue: 28000, Profit: 10400 },
      { id: 16, Date: '2024-03-19', Region: 'East', Rep: 'Ananya Roy', Category: 'Software', Product: 'SaaS Suite Pro', Units: 60, 'Unit Price': 250, Revenue: 15000, Profit: 10500 }
    ]
  },
  expenses: {
    id: 'expenses',
    name: 'Quarterly Operating Budget & Expenditures',
    headers: ['Quarter', 'Department', 'Category', 'Budget', 'Actual', 'Variance'],
    rows: [
      { id: 1, Quarter: 'Q1', Department: 'Engineering', Category: 'Cloud Servers', Budget: 45000, Actual: 41200, Variance: 3800 },
      { id: 2, Quarter: 'Q1', Department: 'Marketing', Category: 'Digital Campaigns', Budget: 32000, Actual: 34500, Variance: -2500 },
      { id: 3, Quarter: 'Q1', Department: 'Operations', Category: 'Facilities & Power', Budget: 18000, Actual: 17600, Variance: 400 },
      { id: 4, Quarter: 'Q1', Department: 'Human Resources', Category: 'Training & Labs', Budget: 12000, Actual: 9800, Variance: 2200 },
      { id: 5, Quarter: 'Q2', Department: 'Engineering', Category: 'Cloud Servers', Budget: 50000, Actual: 48900, Variance: 1100 },
      { id: 6, Quarter: 'Q2', Department: 'Marketing', Category: 'Digital Campaigns', Budget: 35000, Actual: 38200, Variance: -3200 },
      { id: 7, Quarter: 'Q2', Department: 'Operations', Category: 'Facilities & Power', Budget: 19000, Actual: 18400, Variance: 600 },
      { id: 8, Quarter: 'Q2', Department: 'Human Resources', Category: 'Training & Labs', Budget: 14000, Actual: 13100, Variance: 900 }
    ]
  }
};

// Compute Dynamic Pivot Table
export const computePivotTable = ({
  rows,
  rowField = 'Region',
  colField = 'Category',
  valField = 'Revenue',
  aggFunction = 'SUM',
  filterField = 'All',
  filterValue = 'All'
}) => {
  if (!rows || rows.length === 0) return { rowHeaders: [], colHeaders: [], matrix: {}, grandTotal: 0 };

  // Apply Filter if active
  const filteredData = (filterField !== 'All' && filterValue !== 'All')
    ? rows.filter(r => String(r[filterField]) === String(filterValue))
    : rows;

  // Extract distinct row categories and col categories
  const rowHeaders = Array.from(new Set(filteredData.map(r => String(r[rowField] || '(Blank)')))).sort();
  const colHeaders = colField && colField !== 'None' 
    ? Array.from(new Set(filteredData.map(r => String(r[colField] || '(Blank)')))).sort()
    : ['Total'];

  const matrix = {};
  const rowTotals = {};
  const colTotals = {};
  let overallSum = 0;
  let overallCount = 0;

  // Initialize
  rowHeaders.forEach(rh => {
    matrix[rh] = {};
    rowTotals[rh] = 0;
    colHeaders.forEach(ch => {
      matrix[rh][ch] = [];
    });
  });
  colHeaders.forEach(ch => {
    colTotals[ch] = 0;
  });

  // Group items
  filteredData.forEach(item => {
    const rh = String(item[rowField] || '(Blank)');
    const ch = colField && colField !== 'None' ? String(item[colField] || '(Blank)') : 'Total';
    const val = Number(item[valField]) || 0;

    if (matrix[rh] && matrix[rh][ch]) {
      matrix[rh][ch].push(val);
    }
  });

  // Aggregate matrix
  const aggregateList = (list) => {
    if (!list || list.length === 0) return 0;
    if (aggFunction === 'SUM') return list.reduce((a, b) => a + b, 0);
    if (aggFunction === 'AVERAGE') return Math.round(list.reduce((a, b) => a + b, 0) / list.length);
    if (aggFunction === 'COUNT') return list.length;
    if (aggFunction === 'MAX') return Math.max(...list);
    if (aggFunction === 'MIN') return Math.min(...list);
    return list.reduce((a, b) => a + b, 0);
  };

  const finalMatrix = {};
  rowHeaders.forEach(rh => {
    finalMatrix[rh] = {};
    let rowAcc = [];
    colHeaders.forEach(ch => {
      const cellValues = matrix[rh][ch] || [];
      const aggregated = aggregateList(cellValues);
      finalMatrix[rh][ch] = aggregated;
      rowAcc = rowAcc.concat(cellValues);
    });
    rowTotals[rh] = aggregateList(rowAcc);
  });

  // Compute column totals
  colHeaders.forEach(ch => {
    let colAcc = [];
    rowHeaders.forEach(rh => {
      const cellValues = matrix[rh][ch] || [];
      colAcc = colAcc.concat(cellValues);
    });
    colTotals[ch] = aggregateList(colAcc);
  });

  const allVals = filteredData.map(r => Number(r[valField]) || 0);
  const grandTotal = aggregateList(allVals);

  return {
    rowHeaders,
    colHeaders,
    matrix: finalMatrix,
    rowTotals,
    colTotals,
    grandTotal,
    valField,
    aggFunction,
    dataCount: filteredData.length
  };
};

// Macro Library & Generator
export const MACRO_TEMPLATES = [
  {
    id: 'format_financials',
    name: 'Auto-Format Financial Accounting Style',
    shortcut: 'Ctrl+Shift+F',
    description: 'Bolds table headers, applies navy blue fill, formats Revenue/Profit as Currency ($#,##0), and adds double accounting underline to totals.',
    vbaCode: `Sub AutoFormatFinancials()
    Dim ws As Worksheet
    Set ws = ActiveSheet
    
    ' 1. Header Styling
    With ws.Range("A1:I1")
        .Font.Bold = True
        .Font.Color = RGB(255, 255, 255)
        .Interior.Color = RGB(24, 43, 73) ' Deep Navy
        .HorizontalAlignment = xlCenter
    End With
    
    ' 2. Currency Formatting
    ws.Range("G2:I20").NumberFormat = "$#,##0"
    
    ' 3. Auto-Fit Column Widths
    ws.Columns("A:I").AutoFit
    
    MsgBox "Accounting formatting applied successfully!", vbInformation, "SarlaYash Macro Engine"
End Sub`,
    appsScriptCode: `function autoFormatFinancials() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 1. Header Styling
  const headerRange = sheet.getRange("A1:I1");
  headerRange.setFontWeight("bold")
             .setFontColor("#FFFFFF")
             .setBackground("#182B49")
             .setHorizontalAlignment("center");
             
  // 2. Currency Formatting
  const currencyRange = sheet.getRange("G2:I20");
  currencyRange.setNumberFormat("$#,##0");
  
  // 3. Auto-fit column widths
  sheet.autoResizeColumns(1, 9);
  
  SpreadsheetApp.getActiveSpreadsheet().toast("Financial formatting applied!", "SarlaYash Macros");
}`
  },
  {
    id: 'highlight_top_profit',
    name: 'Conditional Highlight: High-Margin Deals',
    shortcut: 'Ctrl+Shift+H',
    description: 'Scans Profit column and applies light emerald green fill with dark green text to any deal earning over $8,000 profit.',
    vbaCode: `Sub HighlightHighMarginDeals()
    Dim ws As Worksheet
    Dim rng As Range, cell As Range
    Set ws = ActiveSheet
    Set rng = ws.Range("I2:I20")
    
    For Each cell In rng
        If IsNumeric(cell.Value) And cell.Value >= 8000 Then
            cell.Interior.Color = RGB(209, 250, 229) ' Emerald 100
            cell.Font.Color = RGB(6, 95, 70)       ' Emerald 800
            cell.Font.Bold = True
        End If
    Next cell
End Sub`,
    appsScriptCode: `function highlightHighMarginDeals() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("I2:I20");
  const values = range.getValues();
  
  for (let i = 0; i < values.length; i++) {
    if (typeof values[i][0] === "number" && values[i][0] >= 8000) {
      sheet.getRange(i + 2, 9)
           .setBackground("#D1FAE5")
           .setFontColor("#065F46")
           .setFontWeight("bold");
    }
  }
}`
  },
  {
    id: 'insert_summary_row',
    name: 'Insert Grand Total Row with Dynamic Formulas',
    shortcut: 'Ctrl+Shift+T',
    description: 'Appends a summary row calculating =SUM(F2:F17) for Units, =SUM(H2:H17) for Revenue, and =SUM(I2:I17) for Profit.',
    vbaCode: `Sub InsertGrandTotalRow()
    Dim ws As Worksheet
    Dim lastRow As Long
    Set ws = ActiveSheet
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row + 1
    
    ws.Cells(lastRow, 1).Value = "Grand Total"
    ws.Cells(lastRow, 1).Font.Bold = True
    
    ' Inject native SUM formulas
    ws.Cells(lastRow, 6).Formula = "=SUM(F2:F" & (lastRow - 1) & ")"
    ws.Cells(lastRow, 8).Formula = "=SUM(H2:H" & (lastRow - 1) & ")"
    ws.Cells(lastRow, 9).Formula = "=SUM(I2:I" & (lastRow - 1) & ")"
    
    ' Top thin border, bottom double accounting line
    With ws.Range(ws.Cells(lastRow, 1), ws.Cells(lastRow, 9)).Borders(xlEdgeBottom)
        .LineStyle = xlDouble
        .Weight = xlThick
    End With
End Sub`,
    appsScriptCode: `function insertGrandTotalRow() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow() + 1;
  
  sheet.getRange(lastRow, 1).setValue("Grand Total").setFontWeight("bold");
  sheet.getRange(lastRow, 6).setFormula(\`=SUM(F2:F\${lastRow - 1})\`);
  sheet.getRange(lastRow, 8).setFormula(\`=SUM(H2:H\${lastRow - 1})\`);
  sheet.getRange(lastRow, 9).setFormula(\`=SUM(I2:I\${lastRow - 1})\`);
  
  sheet.getRange(lastRow, 1, 1, 9).setFontWeight("bold").setBackground("#F1F5F9");
}`
  }
];
