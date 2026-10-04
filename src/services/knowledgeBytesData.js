// 50 Differences Between Google Sheets & Microsoft Excel: Knowledge Bytes
// SarlaYash OS Universe — Powered by Kapil
// Authoritative curriculum comparing cloud-native vs desktop-heritage spreadsheet engines

export const KNOWLEDGE_CATEGORIES = [
  { id: 'collaboration', name: 'Collaboration & Cloud Architecture', count: 5, color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10' },
  { id: 'scale', name: 'Capacity, Scale Limits & Engine', count: 5, color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/10' },
  { id: 'formulas', name: 'Unique Formulas & Query Architecture', count: 5, color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
  { id: 'dynamic_arrays', name: 'Dynamic Arrays & Lambda Calculation', count: 5, color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' },
  { id: 'scripting', name: 'Scripting: Apps Script vs VBA / Office Scripts', count: 5, color: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10' },
  { id: 'pivots', name: 'Data Modeling, Pivot Tables & Power Pivot', count: 5, color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-500/10' },
  { id: 'visualization', name: 'Charting, Graphics Depth & Slicers', count: 5, color: 'text-teal-400', border: 'border-teal-500/30', bg: 'bg-teal-500/10' },
  { id: 'architecture', name: 'Desktop Native vs Web-First Architecture', count: 5, color: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-500/10' },
  { id: 'extensibility', name: 'Integrations, Python & Ecosystem', count: 5, color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10' },
  { id: 'security', name: 'Governance, Security & Pricing Model', count: 5, color: 'text-pink-400', border: 'border-pink-500/30', bg: 'bg-pink-500/10' }
];

export const KNOWLEDGE_BYTES = [
  // ==========================================
  // Category 1: Collaboration & Cloud Architecture
  // ==========================================
  {
    id: 1,
    categoryId: 'collaboration',
    categoryName: 'Collaboration & Cloud Architecture',
    title: 'Real-Time Co-Authoring & Presence Synchronization',
    sheetsBehavior: 'Built ground-up as a real-time web socket application. Hundreds of users can co-edit the same cell range simultaneously with zero locking lag, color-coded live cursors, and instant character-by-character propagation.',
    excelBehavior: 'Originally desktop file-based (.xlsx). Excel Online and Microsoft 365 co-authoring sync through SharePoint/OneDrive delta sync. Desktop Excel can occasionally experience merge conflicts, locked ranges, or sync delays on slow networks.',
    verdict: 'Google Sheets wins on real-time friction-free collaboration speed; Excel 365 has caught up significantly but still relies on SharePoint sync protocols.',
    proTip: 'In Google Sheets, use "Filter Views" (Data > Filter views) so your custom filtering does not disrupt other active co-authors!'
  },
  {
    id: 2,
    categoryId: 'collaboration',
    categoryName: 'Collaboration & Cloud Architecture',
    title: 'Granular Version History vs File Autosave Backups',
    sheetsBehavior: 'Every single keystroke is logged automatically in the cloud. "Version history" (File > Version history) allows naming specific milestones, inspecting edits by specific collaborators with colored diffs, and instant one-click restores.',
    excelBehavior: 'Excel Desktop supports AutoSave when saved to OneDrive/SharePoint, but versioning relies on SharePoint document library versions. Offline local files rely on AutoRecover (.xar temp files) or traditional manual Save-As snapshots.',
    verdict: 'Google Sheets offers continuous micro-versioning with collaborator attribution; Excel requires cloud hosting for comparable version history.',
    proTip: 'In Sheets, you can right-click any single cell and select "Show edit history" to see every user who modified that exact cell!'
  },
  {
    id: 3,
    categoryId: 'collaboration',
    categoryName: 'Collaboration & Cloud Architecture',
    title: 'Sharing Permissions & Access Control Models',
    sheetsBehavior: 'Native Google Drive sharing model (Viewer, Commenter, Editor) via simple URL or email invites. Supports "Anyone with the link", temporary access expiration, and restricting viewers from downloading, printing, or copying.',
    excelBehavior: 'SharePoint and Azure Active Directory (Entra ID) permissions for cloud workbooks, or traditional file-level passwords (AES-128/256 encryption) and worksheet protection passwords for local files.',
    verdict: 'Sheets is simpler for rapid cross-organization sharing; Excel provides deeper Active Directory enterprise tenant governance.',
    proTip: 'Excel passwords for protecting worksheet structure can often be easily bypassed with ZIP archive XML editing; Google Drive permissions cannot be bypassed client-side.'
  },
  {
    id: 4,
    categoryId: 'collaboration',
    categoryName: 'Collaboration & Cloud Architecture',
    title: 'In-Cell Comments, Mentions (@) & Action Items',
    sheetsBehavior: 'First-class Google Workspace notifications: typing "@username" in a comment immediately assigns an actionable task, sends an email alert, and allows task completion without opening the spreadsheet.',
    excelBehavior: 'Modern Excel has "Threaded Comments" with @mentions for OneDrive workbooks, alongside legacy "Notes" (yellow sticky squares) for backward compatibility.',
    verdict: 'Sheets integrates seamlessly with Gmail/Google Workspace tasks; Excel separates Threaded Comments from legacy cell Notes.',
    proTip: 'In Excel, press Shift+F2 to insert a legacy Note, or right-click and select "New Comment" for modern threaded comments.'
  },
  {
    id: 5,
    categoryId: 'collaboration',
    categoryName: 'Collaboration & Cloud Architecture',
    title: 'Individual User Filter Views',
    sheetsBehavior: '"Filter Views" allow an editor to filter and sort a massive table for their own eyes only without altering what any other active user sees on the screen.',
    excelBehavior: 'Introduced "Sheet Views" in Excel Online and modern Excel 365, allowing personal temporary views, but older perpetual Excel versions (2019/2016) lack this feature entirely.',
    verdict: 'Google Sheets popularized independent filter views; Excel 365 adopted it as "Sheet View".',
    proTip: 'Always name your Filter Views in Sheets (e.g., "Kapil - North Region Only") so you can return to them with one click from the toolbar.'
  },

  // ==========================================
  // Category 2: Capacity, Scale Limits & Engine
  // ==========================================
  {
    id: 6,
    categoryId: 'scale',
    categoryName: 'Capacity, Scale Limits & Engine',
    title: 'Maximum Cell Capacity Limits',
    sheetsBehavior: 'Hard platform limit of 10 million cells (or 18,278 columns) across all tabs in a single workbook. Attempting to add cells beyond this ceiling results in an explicit platform error.',
    excelBehavior: 'Each single worksheet supports exactly 1,048,576 rows by 16,384 columns (17.18 billion cells per sheet). A workbook can contain thousands of sheets limited solely by system RAM (64-bit).',
    verdict: 'Excel is dramatically superior for ultra-large datasets; Google Sheets is capped at 10 million cells total per workbook.',
    proTip: 'If your dataset exceeds 500,000 rows, Google Sheets performance degrades; use Excel 64-bit or link Sheets to Google BigQuery via Connected Sheets.'
  },
  {
    id: 7,
    categoryId: 'scale',
    categoryName: 'Capacity, Scale Limits & Engine',
    title: 'Calculation Engine & Multi-Threading Performance',
    sheetsBehavior: 'Calculations execute on Google server cloud clusters and inside browser JavaScript (V8 engine). Heavily volatile models (hundreds of OFFSET, INDIRECT) can choke on browser memory.',
    excelBehavior: 'Desktop Excel runs compiled native C++ code utilizing multi-threaded calculation (MTC) across all CPU hardware cores. It calculates complex matrix operations orders of magnitude faster.',
    verdict: 'Excel is vastly faster for computationally demanding engineering, financial modeling, and Monte Carlo simulations.',
    proTip: 'In Excel, check File > Options > Advanced > Formulas to verify that "Enable multi-threaded calculation" is using all logical processors.'
  },
  {
    id: 8,
    categoryId: 'scale',
    categoryName: 'Capacity, Scale Limits & Engine',
    title: 'File Size Limits & Storage Footprint',
    sheetsBehavior: 'Native Google Sheets files consume zero Google Drive storage quota against your account. They are pure cloud database pointers, not standalone binary files.',
    excelBehavior: 'Local .xlsx, .xlsm, or .xlsb (binary format) files range from kilobytes to gigabytes. Excel Binary Workbook (.xlsb) drastically compresses file size and speeds up disk reads.',
    verdict: 'Sheets saves local disk space; Excel binary (.xlsb) is the gold standard for massive local model storage.',
    proTip: 'Save heavy Excel financial models as .xlsb (Binary Workbook) to cut file size by up to 60% and double workbook load speeds.'
  },
  {
    id: 9,
    categoryId: 'scale',
    categoryName: 'Capacity, Scale Limits & Engine',
    title: 'Volatile Functions & Recalculation Overhead',
    sheetsBehavior: 'Functions like `NOW()`, `TODAY()`, `RAND()`, and `RANDBETWEEN()` recalculate on edit, or can be set to recalculate "On change and every minute / every hour" in File > Settings > Calculation.',
    excelBehavior: 'Volatile functions (`INDIRECT`, `OFFSET`, `CELL`, `INFO`, `RAND`) trigger recalculation of all dependent trees every time ANY cell in the workbook changes. Excel provides "Manual Calculation" mode (F9).',
    verdict: 'Excel provides manual calculation controls (Shift+F9, F9); Sheets provides scheduled timer recalculations (every minute).',
    proTip: 'In massive Excel models, switch to Formulas > Calculation Options > "Manual" to prevent workbook freezing during data entry.'
  },
  {
    id: 10,
    categoryId: 'scale',
    categoryName: 'Capacity, Scale Limits & Engine',
    title: '64-Bit Memory Architecture vs Browser Tab Constraints',
    sheetsBehavior: 'Bound by the memory limit of a single browser tab (typically ~2 GB to 4 GB in Chrome V8 before the tab crashes with "Aw, Snap!").',
    excelBehavior: '64-bit Excel can address the entirety of system RAM (32 GB, 64 GB, 128 GB+), enabling processing of multi-gigabyte files and hundreds of millions of data points.',
    verdict: 'Excel 64-bit is the undisputed choice for Big Data analytics that exceed browser memory limits.',
    proTip: 'Verify you are running 64-bit Excel: File > Account > About Excel. If it says 32-bit, reinstall the 64-bit edition for vastly higher memory limits.'
  },

  // ==========================================
  // Category 3: Unique Formulas & Query Architecture
  // ==========================================
  {
    id: 11,
    categoryId: 'formulas',
    categoryName: 'Unique Formulas & Query Architecture',
    title: 'The Built-in QUERY() Function (SQL-like syntax)',
    sheetsBehavior: 'Google Sheets features `=QUERY(data, "SELECT A, SUM(B) WHERE C = \'Completed\' GROUP BY A ORDER BY SUM(B) DESC")`. It provides database-grade SQL querying directly inside a single cell.',
    excelBehavior: 'Excel does not have a native `QUERY()` formula. Users must achieve this through Power Query (Get & Transform) via UI dialogs, or combine modern formulas (`FILTER`, `SORT`, `CHOOSECOLS`, `PIVOTBY`).',
    verdict: 'Google Sheets `QUERY()` is famous for compact, powerful one-cell SQL analysis; Excel handles heavy data transformation through Power Query.',
    proTip: 'In Sheets QUERY, column letters must be capitalized in uppercase (`SELECT A, B`), or use `Col1, Col2` when querying array outputs!'
  },
  {
    id: 12,
    categoryId: 'formulas',
    categoryName: 'Unique Formulas & Query Architecture',
    title: 'Cross-Workbook Dynamic Linking: IMPORTRANGE() vs External Links',
    sheetsBehavior: '`=IMPORTRANGE("spreadsheet_url", "Sheet1!A1:Z100")` securely syncs live data from another Google Sheet across the internet with explicit access-grant permission authorization.',
    excelBehavior: 'Excel uses file-path formula links: `=\'C:\\Reports\\[Q1_Sales.xlsx]Sheet1\'!$A$1`. If linked files are moved, renamed, or on other machines, formulas break with `#REF!` or prompt for update links dialogs.',
    verdict: 'Google Sheets `IMPORTRANGE()` is far more resilient for live distributed cloud dashboards across independent workbooks.',
    proTip: 'Wrap `IMPORTRANGE()` inside a `QUERY()` in Sheets to import only matching rows rather than hauling all raw data across the wire.'
  },
  {
    id: 13,
    categoryId: 'formulas',
    categoryName: 'Unique Formulas & Query Architecture',
    title: 'Native Web & Translation APIs: GOOGLEFINANCE & GOOGLETRANSLATE',
    sheetsBehavior: 'Has built-in web functions: `=GOOGLEFINANCE("NASDAQ:GOOGL", "price")`, `=GOOGLETRANSLATE(A1, "en", "hi")`, and `=DETECTLANGUAGE(A1)` directly integrated without add-ons.',
    excelBehavior: 'Offers "Stocks" and "Geography" Linked Data Types (via Wolfram/Refinitiv), but requires selecting cells and clicking the ribbon. Live custom language translation requires VBA or Office Add-ins.',
    verdict: 'Google Sheets provides effortless formula-level financial tickers, currency exchange rates, and multi-lingual translation.',
    proTip: 'Use `=GOOGLEFINANCE("CURRENCY:USDINR")` in Sheets to get live real-time USD to INR exchange rates updated every 20 minutes!'
  },
  {
    id: 14,
    categoryId: 'formulas',
    categoryName: 'Unique Formulas & Query Architecture',
    title: 'Web Scraping Functions: IMPORTHTML, IMPORTXML, IMPORTFEED',
    sheetsBehavior: 'Native web scraping formulas: `=IMPORTHTML("url", "table", 1)` scrapes tables from live HTML; `=IMPORTXML(url, xpath)` extracts data from any XML/HTML XPath; `=IMPORTFEED(url)` parses RSS feeds.',
    excelBehavior: 'Excel accomplishes web scraping through Power Query (Data > From Web). It is exceptionally powerful and robust, but operates through a separate transformation window rather than an in-cell formula.',
    verdict: 'Sheets is faster for quick dynamic one-line scraping; Excel Power Query is superior for complex multi-step web scraping workflows.',
    proTip: 'In Sheets, use `=IMPORTHTML("https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)", "table", 1)` to ingest world economic tables in 2 seconds!'
  },
  {
    id: 15,
    categoryId: 'formulas',
    categoryName: 'Unique Formulas & Query Architecture',
    title: 'Regular Expression Native Functions',
    sheetsBehavior: 'Native regex formulas: `=REGEXEXTRACT(text, regular_expression)`, `=REGEXMATCH(text, regular_expression)`, and `=REGEXREPLACE(text, regular_expression, replacement)`.',
    excelBehavior: 'Historically required custom VBA RegExp scripts. Recently introduced `REGEXTEST`, `REGEXEXTRACT`, and `REGEXREPLACE` in Microsoft 365 Beta/Current Channel (2024), but absent in Excel 2016/2019/2021.',
    verdict: 'Google Sheets has had first-class Regular Expressions for over a decade; Excel is only now bringing them to M365.',
    proTip: 'In Sheets, extract emails with `=REGEXEXTRACT(A2, "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")`!'
  },

  // ==========================================
  // Category 4: Dynamic Arrays & Lambda Calculation
  // ==========================================
  {
    id: 16,
    categoryId: 'dynamic_arrays',
    categoryName: 'Dynamic Arrays & Lambda Calculation',
    title: 'Array Handling: ARRAYFORMULA() vs Automatic Dynamic Array Spilling',
    sheetsBehavior: 'Requires explicitly wrapping formulas in `=ARRAYFORMULA(...)` (or pressing Ctrl+Shift+Enter) to evaluate ranges iteratively down a column.',
    excelBehavior: 'Since the 2019 Dynamic Array Engine overhaul, ALL formulas in modern Excel are natively array-aware. Any formula returning multiple values spills automatically into adjacent cells with `#SPILL!` boundaries.',
    verdict: 'Excel Dynamic Arrays are more seamless and automatic; Sheets requires the explicit `ARRAYFORMULA` function wrapper.',
    proTip: 'In Excel, refer to an entire spilled dynamic array by suffixing a hash sign `#` (e.g. `=SUM(D2#)`).'
  },
  {
    id: 17,
    categoryId: 'dynamic_arrays',
    categoryName: 'Dynamic Arrays & Lambda Calculation',
    title: 'Custom Functional Programming: LAMBDA & Helper Functions',
    sheetsBehavior: 'Supports `LAMBDA`, `MAP`, `REDUCE`, `SCAN`, `MAKEARRAY`, `BYROW`, and `BYCOL`. Allows creating custom reusable functions via Named Functions manager.',
    excelBehavior: 'Pioneered `LAMBDA` in spreadsheets with the Advanced Formula Environment. Fully integrated with Excel Name Manager, enabling recursion and advanced algorithmic calculations.',
    verdict: 'Both now offer state-of-the-art LAMBDA engines; Excel provides deeper debugging tools.',
    proTip: 'Create a Named Function in Sheets (Data > Named functions) to turn complex nested logic into a reusable function like `CALCULATE_GST(amount, rate)`!'
  },
  {
    id: 18,
    categoryId: 'dynamic_arrays',
    categoryName: 'Dynamic Arrays & Lambda Calculation',
    title: 'Modern Grouping Formulas: PIVOTBY & GROUPBY',
    sheetsBehavior: 'Requires combining `QUERY()` or building Pivot Tables manually to group and aggregate data dynamically.',
    excelBehavior: 'Excel 365 introduced native `=GROUPBY(row_fields, values, function)` and `=PIVOTBY(row_fields, col_fields, values, function)` enabling formula-generated pivot tables in a single line.',
    verdict: 'Excel 365 `PIVOTBY` and `GROUPBY` are revolutionizing formula-based reporting without needing manual pivot setup.',
    proTip: 'Try `=PIVOTBY(A2:A100, B2:B100, C2:C100, SUM)` in Excel 365 to generate a full cross-tabulated matrix with subtotals in 1 second!'
  },
  {
    id: 19,
    categoryId: 'dynamic_arrays',
    categoryName: 'Dynamic Arrays & Lambda Calculation',
    title: 'Array Expansion: SPLIT() vs TEXTSPLIT()',
    sheetsBehavior: 'Has long featured `=SPLIT(text, delimiter)` which spills extracted tokens horizontally across columns.',
    excelBehavior: 'Introduced `=TEXTSPLIT(text, col_delimiter, [row_delimiter])`, which can split simultaneously into columns AND rows with powerful case-insensitivity flags.',
    verdict: 'Excel `TEXTSPLIT` is more versatile (2D splitting); Sheets `SPLIT` is simpler and has been available for years.',
    proTip: 'In Excel, `=TEXTSPLIT(A1, ",", ";")` can convert a semicolon-and-comma delimited string directly into a 2D table grid!'
  },
  {
    id: 20,
    categoryId: 'dynamic_arrays',
    categoryName: 'Dynamic Arrays & Lambda Calculation',
    title: 'Array Flattening: FLATTEN() vs TOCOL() & TOROW()',
    sheetsBehavior: 'Google Sheets introduced the undocumented `=FLATTEN(range)` to unpivot any 2D grid into a single vertical column.',
    excelBehavior: 'Excel introduced `=TOCOL(array, [ignore], [scan_by_column])` and `=TOROW(array)`, with rich options to ignore blanks (`ignore=1`) or ignore errors (`ignore=2`).',
    verdict: 'Excel `TOCOL` offers superior parameter control; Sheets `FLATTEN` is quick and simple.',
    proTip: 'In Excel, use `=TOCOL(A2:D20, 1)` to ignore blank cells when flattening a matrix into a clean list.'
  },

  // ==========================================
  // Category 5: Scripting: Apps Script vs VBA / Office Scripts
  // ==========================================
  {
    id: 21,
    categoryId: 'scripting',
    categoryName: 'Scripting: Apps Script vs VBA / Office Scripts',
    title: 'Language: JavaScript (Apps Script) vs Visual Basic for Applications (VBA)',
    sheetsBehavior: 'Google Apps Script is built on modern JavaScript (V8 engine). Uses ECMAScript 6 standards (classes, arrow functions, `const/let`, promises, JSON).',
    excelBehavior: 'Excel Desktop uses VBA (Visual Basic 6.0 derivative created in the 1990s). Procedural, COM-based, syntax uses `Sub / End Sub`, `Dim ... As String`, `Set`, and 1-based collections.',
    verdict: 'Apps Script is significantly more modern and accessible to web developers; VBA is a legacy language with 30 years of enterprise codebase history.',
    proTip: 'Developers fluent in JavaScript can start writing Google Apps Script in minutes without learning legacy Basic syntax!'
  },
  {
    id: 22,
    categoryId: 'scripting',
    categoryName: 'Scripting: Apps Script vs VBA / Office Scripts',
    title: 'Hosting & Execution Environment: Cloud Server vs Local Windows Process',
    sheetsBehavior: 'Apps Script executes on Google Cloud infrastructure. It can run 24/7 on timer triggers even when your computer is shut down and browser is closed.',
    excelBehavior: 'VBA runs strictly inside the active Excel Windows/Mac desktop process on the user machine. If Excel is closed or the computer is off, VBA cannot run.',
    verdict: 'Apps Script wins for cloud cron jobs and autonomous server automation; VBA wins for ultra-fast local memory operations.',
    proTip: 'Set up an Apps Script Time-driven trigger (Triggers > Add Trigger > Time-driven) to automatically run a report script every night at 2:00 AM!'
  },
  {
    id: 23,
    categoryId: 'scripting',
    categoryName: 'Scripting: Apps Script vs VBA / Office Scripts',
    title: 'OS & Local Hardware Access',
    sheetsBehavior: 'Sandboxed cloud environment. Cannot access the user local C: drive, Windows Registry, local COM DLLs, or local printer drivers directly.',
    excelBehavior: 'VBA has full unrestricted access to the Windows OS: Windows API calls, reading/writing local hard drive files, Shell commands, controlling Outlook/Word via COM Automation.',
    verdict: 'VBA has deep local hardware and Office suite integration; Apps Script is securely sandboxed.',
    proTip: 'VBA can automate Outlook to send emails through the user desktop email client; Apps Script automates `GmailApp.sendEmail()` directly from the cloud.'
  },
  {
    id: 24,
    categoryId: 'scripting',
    categoryName: 'Scripting: Apps Script vs VBA / Office Scripts',
    title: 'Office Scripts: Modern TypeScript in Excel for the Web',
    sheetsBehavior: 'Uses Apps Script across all platforms (web and mobile).',
    excelBehavior: 'Microsoft introduced "Office Scripts" for Excel on the web (and modern desktop). Uses TypeScript / JavaScript, runs in the cloud, and integrates with Power Automate.',
    verdict: 'Office Scripts is Microsoft modern answer to Google Apps Script, bridging the gap between legacy VBA and cloud automation.',
    proTip: 'Use Office Scripts if you want to trigger automated Excel updates from Power Automate flows!'
  },
  {
    id: 25,
    categoryId: 'scripting',
    categoryName: 'Scripting: Apps Script vs VBA / Office Scripts',
    title: 'Macro Recording Reliability & Generated Code',
    sheetsBehavior: 'The Macro Recorder generates Google Apps Script JavaScript functions stored in `macros.gs`. Easy to read and edit for web developers.',
    excelBehavior: 'The VBA Macro Recorder records every click, cursor selection (`Selection.Copy`), and scroll. The generated code is verbose but provides a full recording of native Windows UI actions.',
    verdict: 'Both macro recorders are great for beginners; Apps Script produces cleaner JS code while VBA recorder captures more granular formatting nuances.',
    proTip: 'Always clean up recorded VBA macros by removing unnecessary `.Select` and `.Activate` statements to speed up macro execution by 10x!'
  },

  // ==========================================
  // Category 6: Data Modeling, Pivot Tables & Power Pivot
  // ==========================================
  {
    id: 26,
    categoryId: 'pivots',
    categoryName: 'Data Modeling, Pivot Tables & Power Pivot',
    title: 'Power Pivot & The Data Model (DAX Engine)',
    sheetsBehavior: 'Does not have an internal relational data modeling engine. Pivot tables can only summarize flat 2D tabular ranges from the current sheet or BigQuery.',
    excelBehavior: 'Includes "Power Pivot" (built-in xVelocity columnar database engine). Can build relationships (star schema) between multiple tables without VLOOKUP, and calculate complex measures using DAX (Data Analysis Expressions).',
    verdict: 'Excel is infinitely superior for multi-table relational data modeling and enterprise BI; Google Sheets is limited to flat pivot tables.',
    proTip: 'In Excel, click Data > Data Tools > Manage Data Model to build multi-table star schemas and write DAX measures like `CALCULATE(SUM(Sales), ALL(Products))`!'
  },
  {
    id: 27,
    categoryId: 'pivots',
    categoryName: 'Data Modeling, Pivot Tables & Power Pivot',
    title: 'Pivot Table Calculation Memory: PivotCache vs Live Compute',
    sheetsBehavior: 'Pivot tables dynamically recalculate live from the sheet range. Changes in source data reflect in the pivot table almost instantaneously.',
    excelBehavior: 'Excel creates a snapshot memory structure called a "PivotCache". If you change source numbers, the Pivot Table does NOT update automatically until you click "Refresh" (Alt+F5).',
    verdict: 'Sheets pivots refresh live automatically; Excel PivotCache requires manual or scheduled refresh but allows huge speed optimization.',
    proTip: 'In Excel, right-click any Pivot Table and select "Refresh" (or press Alt+F5) to pull in updated source numbers.'
  },
  {
    id: 28,
    categoryId: 'pivots',
    categoryName: 'Data Modeling, Pivot Tables & Power Pivot',
    title: 'Calculated Fields & Items Syntax',
    sheetsBehavior: 'Supports Calculated Fields via simple formula editor inside the Pivot Table editor side panel, referencing existing column names directly.',
    excelBehavior: 'Supports both classic Pivot Calculated Fields/Items AND rich DAX Measures in the Data Model with time-intelligence functions (`SAMEPERIODLASTYEAR`, `YTD`).',
    verdict: 'Excel DAX measures offer vastly deeper statistical and time-intelligence power than Sheets calculated fields.',
    proTip: 'Never use Excel legacy Calculated Items on large pivot tables; they consume massive memory. Use DAX measures instead.'
  },
  {
    id: 29,
    categoryId: 'pivots',
    categoryName: 'Data Modeling, Pivot Tables & Power Pivot',
    title: 'Grouping Dates in Pivot Tables',
    sheetsBehavior: 'Right-click a date cell in a Sheets Pivot Table > "Create pivot date group" > choose Year, Quarter, Month, Year-Month, Day of Week.',
    excelBehavior: 'Right-click a date cell > "Group..." > select multiple intervals simultaneously (e.g. Years + Months + Quarters) to automatically generate hierarchical drilling fields.',
    verdict: 'Both handle date grouping smoothly; Excel hierarchical grouping is slightly more flexible for multi-level drilling.',
    proTip: 'In Excel, select both "Months" and "Years" in the Group dialog to avoid accidentally aggregating all January data from different years together!'
  },
  {
    id: 30,
    categoryId: 'pivots',
    categoryName: 'Data Modeling, Pivot Tables & Power Pivot',
    title: 'BigQuery Connected Sheets vs Power BI DirectQuery',
    sheetsBehavior: 'Enterprise Google Sheets connects to Google BigQuery via "Connected Sheets", allowing pivot tables over billions of rows calculated directly in BigQuery cloud warehouse.',
    excelBehavior: 'Excel connects natively to Microsoft Power BI datasets, SQL Server Analysis Services (SSAS), and Azure Synapse via DirectQuery and Analyze in Excel.',
    verdict: 'Sheets is deeply integrated with Google Cloud BigQuery; Excel is deeply integrated with Microsoft Power BI and Azure.',
    proTip: 'In Google Workspace Enterprise, go to Data > Data connectors > Connect to BigQuery to analyze petabytes of data without leaving Sheets!'
  },

  // ==========================================
  // Category 7: Charting, Graphics Depth & Slicers
  // ==========================================
  {
    id: 31,
    categoryId: 'visualization',
    categoryName: 'Charting, Graphics Depth & Slicers',
    title: 'Advanced Chart Types (Waterfall, Treemap, Sunburst, Box & Whisker)',
    sheetsBehavior: 'Supports core charts (Column, Bar, Line, Pie, Area, Scatter, Geo Map, Timeline, Candlestick, Org Chart, Radar).',
    excelBehavior: 'Extensive chart catalog including Treemap, Sunburst, Histogram, Box & Whisker, Waterfall, Funnel, 3D Surface, Stock charts, and 3D Maps (Power Map).',
    verdict: 'Excel has a richer library of advanced statistical and financial chart types; Sheets has great web interactive maps and timelines.',
    proTip: 'For financial variance analysis in Excel, the native Waterfall chart (Insert > Waterfall) creates floating bridge bars with one click.'
  },
  {
    id: 32,
    categoryId: 'visualization',
    categoryName: 'Charting, Graphics Depth & Slicers',
    title: 'Formatting Precision & Design Granularity',
    sheetsBehavior: 'Clean, modern web-style chart customizer. Easy to use with limited granular control over exact axis tick marks, error bars, and 3D perspective.',
    excelBehavior: 'Industry-standard graphical control: gradient fills, soft shadows, 3D bevels, exact point-by-point data label positioning, custom number formatting on axes, secondary axes, and error bars.',
    verdict: 'Excel is far superior for publication-grade, pixel-perfect financial report graphics and boardroom presentations.',
    proTip: 'In Excel, double-click any chart series to open the Format Data Series task pane for deep control over gap width, series overlap, and transparency.'
  },
  {
    id: 33,
    categoryId: 'visualization',
    categoryName: 'Charting, Graphics Depth & Slicers',
    title: 'Pivot Charts Integration & Behavior',
    sheetsBehavior: 'Charts created from Pivot Table ranges act as standard charts. You can insert Slicers (Data > Add a slicer) that filter both the sheet and chart.',
    excelBehavior: 'Dedicated "PivotChart" object with interactive Field Buttons directly embedded on the chart itself. Filtering a field button immediately recalculates the chart and pivot table in lockstep.',
    verdict: 'Excel PivotCharts provide native embedded field buttons; Sheets relies on standalone floating Slicers.',
    proTip: 'In Excel, click PivotChart Analyze > Insert Slicer to create sleek, touch-friendly filter buttons for your interactive dashboard!'
  },
  {
    id: 34,
    categoryId: 'visualization',
    categoryName: 'Charting, Graphics Depth & Slicers',
    title: 'In-Cell Visualizations: SPARKLINE Formula vs Sparklines UI',
    sheetsBehavior: 'Has the extraordinary `=SPARKLINE(data, {options})` formula, allowing customized line, bar, column, and winloss sparklines completely controlled via formula options.',
    excelBehavior: 'Sparklines are created via the ribbon (Insert > Sparklines > Line/Column/Win-Loss). They are managed through a UI group rather than an in-cell formula function.',
    verdict: 'Google Sheets `SPARKLINE()` formula is vastly more programmatic and customizable; Excel ribbon sparklines are easier for non-technical users.',
    proTip: 'In Sheets, `=SPARKLINE(B2:M2, {"charttype", "column"; "color", "teal"})` draws an elegant micro bar chart right inside the cell!'
  },
  {
    id: 35,
    categoryId: 'visualization',
    categoryName: 'Charting, Graphics Depth & Slicers',
    title: 'Web Embedding & Interactive Chart Publishing',
    sheetsBehavior: 'Publish any single chart as an interactive web widget or iframe via File > Share > Publish to web. It renders as a live vector SVG accessible on any website.',
    excelBehavior: 'Requires publishing to Power BI or hosting the workbook on OneDrive and embedding via Excel Online iframe viewer with heavier load overhead.',
    verdict: 'Sheets is much easier for embedding lightweight live charts directly into public blogs, portals, and web applications.',
    proTip: 'Use Google Sheets "Publish Chart" to get a clean SVG image link or HTML iframe for public school/business websites!'
  },

  // ==========================================
  // Category 8: Desktop Native vs Web-First Architecture
  // ==========================================
  {
    id: 36,
    categoryId: 'architecture',
    categoryName: 'Desktop Native vs Web-First Architecture',
    title: 'Offline Editing Capability & Reliability',
    sheetsBehavior: 'Browser-first. Offline mode requires Google Chrome with the "Google Docs Offline" extension installed, pre-syncing files before going offline.',
    excelBehavior: 'Desktop-first. Full native application installed on Windows or macOS. Works 100% offline indefinitely without internet, caching, or browser dependencies.',
    verdict: 'Excel is vastly superior for field work, remote flights, and air-gapped secure defense/financial environments without internet.',
    proTip: 'If traveling without internet, enable "Offline" in Google Drive settings beforehand so recent Google Sheets stay accessible in Chrome.'
  },
  {
    id: 37,
    categoryId: 'architecture',
    categoryName: 'Desktop Native vs Web-First Architecture',
    title: 'Keyboard Shortcuts: Windows Alt Keys vs Browser Interception',
    sheetsBehavior: 'Keyboard shortcuts can conflict with browser shortcuts (e.g., Ctrl+W closes the tab, Ctrl+N opens new window). Supports enabling "Compatible spreadsheet shortcuts" in Help menu.',
    excelBehavior: 'The legendary "Alt Key" access keys (e.g. `Alt + H + V + V` to paste values, `Alt + =` to AutoSum, `Alt + D + F + S` to filter). Built into muscle memory for financial analysts.',
    verdict: 'Excel desktop provides unmatched keyboard ergonomics for financial power users without browser shortcut collisions.',
    proTip: 'In Google Sheets, press `Ctrl + /` (or `Cmd + /` on Mac) to open the full interactive Keyboard Shortcuts cheat sheet!'
  },
  {
    id: 38,
    categoryId: 'architecture',
    categoryName: 'Desktop Native vs Web-First Architecture',
    title: 'Operating System Compatibility & Feature Parity',
    sheetsBehavior: '100% identical feature set across Windows, macOS, Linux, and ChromeOS because it runs in modern web browsers.',
    excelBehavior: 'Excel for Windows is the flagship edition with 100% features. Excel for Mac lacks some Power Pivot / COM add-in features. Excel for Web has a streamlined subset of features.',
    verdict: 'Google Sheets guarantees 100% cross-platform parity across all OS types; Excel Windows is superior to Excel Mac.',
    proTip: 'For Chromebook and Linux users, Google Sheets is often the daily driver, while Windows users frequently prefer Excel desktop.'
  },
  {
    id: 39,
    categoryId: 'architecture',
    categoryName: 'Desktop Native vs Web-First Architecture',
    title: 'Mobile App Experience (Android & iOS)',
    sheetsBehavior: 'Lightweight, rapid mobile app with clean touch controls, easy formula bar, and quick sharing.',
    excelBehavior: 'Feature-rich mobile app for tablets (iPad Pro, Surface, Samsung Galaxy Tab) with ribbon interface, but heavier resource footprint on entry-level phones.',
    verdict: 'Sheets is faster for quick mobile phone edits; Excel mobile tablet edition is powerful for larger touchscreens.',
    proTip: 'In Google Sheets mobile app, swipe down on any row header to quickly highlight and format entire records.'
  },
  {
    id: 40,
    categoryId: 'architecture',
    categoryName: 'Desktop Native vs Web-First Architecture',
    title: 'Print Setup & Page Break Previews',
    sheetsBehavior: 'Web-based print dialog (File > Print) with scaling options (Fit to width, Fit to page). No dedicated "Page Break Preview" interactive drag mode.',
    excelBehavior: 'Renowned "Page Break Preview" (View > Page Break Preview) where learners can drag blue dotted lines with precision to set exact printed page splits.',
    verdict: 'Excel is far superior for formal accounting print-ready workbooks and multi-page board packets.',
    proTip: 'In Excel, switch to View > Page Break Preview to visually adjust exactly what columns fit onto Page 1.'
  },

  // ==========================================
  // Category 9: Integrations, Python & Ecosystem
  // ==========================================
  {
    id: 41,
    categoryId: 'extensibility',
    categoryName: 'Integrations, Python & Ecosystem',
    title: 'Python Integration: Native Python in Excel vs Cloud Connectors',
    sheetsBehavior: 'Connects to Python via Google Colab, Apps Script webhooks, or Google Cloud Run microservices.',
    excelBehavior: 'Microsoft natively integrated Python into Excel (`=PY()`). Code executes in a secure Microsoft Azure container, returning pandas DataFrames, seaborn, and matplotlib charts directly into spreadsheet cells!',
    verdict: 'Excel native Python integration (`=PY`) is an extraordinary technological leap for data scientists and analysts.',
    proTip: 'In modern Excel 365, type `=PY` and press Tab to write Python pandas code directly inside an Excel cell!'
  },
  {
    id: 42,
    categoryId: 'extensibility',
    categoryName: 'Integrations, Python & Ecosystem',
    title: 'Google Forms Integration vs Microsoft Forms',
    sheetsBehavior: 'Iconic synergy with Google Forms (Tools > Create a form). Every form response instantly populates a dedicated sheet tab with zero setup delay.',
    excelBehavior: 'Microsoft Forms can sync to Excel for the web in SharePoint/OneDrive, but historical desktop files required manual exports or Power Automate flows.',
    verdict: 'Google Forms + Sheets is the most popular, seamless survey and test data collection pair in education and business.',
    proTip: 'In Google Sheets, go to Tools > Manage form > Edit form to modify survey questions directly from your response spreadsheet.'
  },
  {
    id: 43,
    categoryId: 'extensibility',
    categoryName: 'Integrations, Python & Ecosystem',
    title: 'Marketplace Add-ons: Google Workspace Marketplace vs Office Add-ins',
    sheetsBehavior: 'Google Workspace Marketplace offers thousands of lightweight cloud extensions (Mail Merge, Supermetrics, ChatGPT plugins, DocuSign) written in JavaScript.',
    excelBehavior: 'Supports modern Office Web Add-ins (HTML5/JS), legacy COM Add-ins (C++, C#, .NET), and legacy Excel Add-ins (.xlam). Allows deep custom desktop ribbon UI customization.',
    verdict: 'Sheets add-ons install in one click without admin permissions; Excel COM add-ins offer deepest desktop performance.',
    proTip: 'Popular add-ons like "Yet Another Mail Merge" (YAMM) turn Google Sheets into an automated personalized email sender via Gmail!'
  },
  {
    id: 44,
    categoryId: 'extensibility',
    categoryName: 'Integrations, Python & Ecosystem',
    title: 'Power Query (ETL Engine) vs Sheets Data Cleaning Tools',
    sheetsBehavior: 'Features Data > Data cleanup (Remove duplicates, Trim whitespace), and formula combinations (`UNIQUE`, `FILTER`, `QUERY`).',
    excelBehavior: 'Power Query (Data > Get Data) is an enterprise-grade ETL (Extract, Transform, Load) engine. Can merge, append, unpivot, scrape, and clean messy data from hundreds of sources with recorded repeatable M-code steps.',
    verdict: 'Excel Power Query is one of the most powerful business analytics tools ever created, far outstripping native Sheets cleanup tools.',
    proTip: 'In Excel, always use Power Query (Alt + A + P + T) when importing CSV files to automatically fix date formats, delimiters, and text encoding.'
  },
  {
    id: 45,
    categoryId: 'extensibility',
    categoryName: 'Integrations, Python & Ecosystem',
    title: 'Ecosystem Workflow: Workspace Suite vs Microsoft 365 Suite',
    sheetsBehavior: 'Tightly integrated with Google Docs, Google Slides, Google Drive, Gmail, Google Classroom, and Google Meet.',
    excelBehavior: 'Tightly integrated with Microsoft Word, PowerPoint, Outlook, Teams, SharePoint, Power BI, and OneDrive.',
    verdict: 'Your choice often depends on your organization core productivity suite: Google Workspace vs Microsoft 365.',
    proTip: 'You can paste a live Google Sheets table into Google Docs or Slides and click "Update" whenever spreadsheet numbers change!'
  },

  // ==========================================
  // Category 10: Governance, Security & Pricing Model
  // ==========================================
  {
    id: 46,
    categoryId: 'security',
    categoryName: 'Governance, Security & Pricing Model',
    title: 'File Encryption & Local Password Protection',
    sheetsBehavior: 'Protected by Google Account authentication (2-Factor Authentication, passkeys) and Google Drive permissions. You cannot set a separate independent file-open password on a Sheet.',
    excelBehavior: 'Supports strong military-grade file encryption (File > Info > Protect Workbook > Encrypt with Password using AES-256). The file cannot be opened without the password even if sent via thumb drive.',
    verdict: 'Excel encrypted workbooks can be securely emailed over unsecure channels; Sheets relies on Google account IAM.',
    proTip: 'Do not forget your Excel workbook encryption password; Microsoft does not have a master recovery backdoor to unlock AES-256 encrypted .xlsx files.'
  },
  {
    id: 47,
    categoryId: 'security',
    categoryName: 'Governance, Security & Pricing Model',
    title: 'Enterprise Information Rights Management (IRM) & Data Loss Prevention (DLP)',
    sheetsBehavior: 'Google Workspace Admin console allows defining DLP rules (detecting Credit Card numbers, Social Security numbers) and blocking external file sharing.',
    excelBehavior: 'Microsoft Purview Information Protection (Sensitivity labels: Public, General, Confidential, Highly Confidential) embeds cryptographic rights into the file that persist wherever the file travels.',
    verdict: 'Excel with Microsoft Purview offers industry-leading government and banking grade data loss prevention.',
    proTip: 'Banks and defense contractors often mandate Microsoft 365 Purview sensitivity labels to prevent sensitive financial files from leaving company hardware.'
  },
  {
    id: 48,
    categoryId: 'security',
    categoryName: 'Governance, Security & Pricing Model',
    title: 'Cost Structure & Licensing: Free Personal Tier vs Paid Subscriptions',
    sheetsBehavior: '100% completely free for personal use with any standard Google account (15 GB free shared across Drive/Gmail). Business tiers start at Google Workspace Business Starter.',
    excelBehavior: 'Perpetual licenses (Office Home 2024 / Professional) or monthly/annual Microsoft 365 subscriptions (Personal, Family, Business, Enterprise E3/E5). Free web version has limited features.',
    verdict: 'Google Sheets has zero barrier to entry for learners, students, and small startups; Excel requires a paid license for full desktop capabilities.',
    proTip: 'SarlaYash OS Universe teaches both so students master free accessible tools (Sheets) as well as corporate gold-standards (Excel)!'
  },
  {
    id: 49,
    categoryId: 'security',
    categoryName: 'Governance, Security & Pricing Model',
    title: 'Data Sovereignty & Local Storage Compliance',
    sheetsBehavior: 'Data resides on Google Cloud distributed data centers globally (with region selection available on enterprise tiers).',
    excelBehavior: 'Local .xlsx files can reside exclusively on an isolated on-premise hard drive, network share (NAS), or localized server with zero cloud exposure.',
    verdict: 'Excel meets strict regulatory environments where confidential client data is legally forbidden from touching third-party cloud servers.',
    proTip: 'If your organization is subject to strict local sovereignty laws (e.g. defense, healthcare HIPAA air-gapped data), local Excel files may be legally mandatory.'
  },
  {
    id: 50,
    categoryId: 'security',
    categoryName: 'Governance, Security & Pricing Model',
    title: 'Summary Verdict: Which Tool Should You Choose?',
    sheetsBehavior: 'Best for: Rapid teamwork, distributed teams, live multi-user dashboards, automated Google Forms intake, web scraping, and zero-cost cloud access across any mobile phone or computer.',
    excelBehavior: 'Best for: Heavy financial modeling, investment banking, datasets with over 500,000 rows, Power Pivot multi-table data modeling, DAX measures, native Python scripting, and offline execution.',
    verdict: 'Modern data professionals must master BOTH: Google Sheets for frictionless cloud collaboration and Excel for heavy computational analysis.',
    proTip: 'Knowing when to use Google Sheets and when to use Microsoft Excel is one of the highest-value workplace computing skills!'
  }
];
