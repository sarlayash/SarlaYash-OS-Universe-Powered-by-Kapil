// Spreadsheet & Business Analytics Suite: Charts, Pivot Tables, Pivot Charts & Macros Simulator
// SarlaYash OS Universe — Powered by Kapil

import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  LineChart as LineIcon, 
  TrendingUp, 
  Table, 
  Layers, 
  Play, 
  RotateCw, 
  Check, 
  CheckCircle2, 
  X, 
  Sliders, 
  Sparkles, 
  FileCode, 
  Cpu, 
  Download, 
  Copy, 
  Filter, 
  Plus, 
  Eye, 
  HelpCircle,
  Award
} from 'lucide-react';
import { SAMPLE_DATASETS, computePivotTable, MACRO_TEMPLATES } from '../../services/spreadsheetDataService';
import { useLearner } from '../../context/LearnerContext';
import { audioService } from '../../services/audioService';

export const SpreadsheetSuiteModal = ({ isOpen, onClose, initialTab = 'charts' }) => {
  const { isModuleComplete, toggleModuleComplete } = useLearner();
  const [activeTab, setActiveTab] = useState(initialTab); // 'charts' | 'pivots' | 'pivotcharts' | 'macros'

  // ==========================================
  // TAB 1: CHARTS SIMULATOR STATE
  // ==========================================
  const [selectedDatasetKey, setSelectedDatasetKey] = useState('sales');
  const [chartType, setChartType] = useState('column'); // 'column' | 'bar' | 'line' | 'pie' | 'area'
  const [chartColorPalette, setChartColorPalette] = useState('excel_blue');
  const [showDataLabels, setShowDataLabels] = useState(true);
  const [showGridlines, setShowGridlines] = useState(true);
  const [chartTitle, setChartTitle] = useState('Quarterly Revenue by Region ($)');

  // Selected dataset
  const activeDataset = SAMPLE_DATASETS[selectedDatasetKey];

  // Aggregate data for Charting (e.g. Revenue by Region)
  const chartData = useMemo(() => {
    const map = {};
    activeDataset.rows.forEach(r => {
      const key = r.Region || r.Department || 'Total';
      const val = Number(r.Revenue || r.Actual || 0);
      map[key] = (map[key] || 0) + val;
    });
    return Object.entries(map).map(([label, value]) => ({ label, value }));
  }, [activeDataset]);

  const maxChartVal = useMemo(() => Math.max(...chartData.map(d => d.value), 1), [chartData]);

  // Color Palettes
  const PALETTES = {
    excel_blue: ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#1D4ED8'],
    emerald: ['#059669', '#10B981', '#34D399', '#6EE7B7', '#047857'],
    purple: ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD', '#6D28D9'],
    sunset: ['#F59E0B', '#EF4444', '#EC4899', '#8B5CF6', '#3B82F6']
  };
  const activeColors = PALETTES[chartColorPalette] || PALETTES.excel_blue;

  // ==========================================
  // TAB 2 & 3: PIVOT TABLES & PIVOT CHARTS STATE
  // ==========================================
  const [pivotRowField, setPivotRowField] = useState('Region');
  const [pivotColField, setPivotColField] = useState('Category');
  const [pivotValField, setPivotValField] = useState('Revenue');
  const [pivotAgg, setPivotAgg] = useState('SUM'); // 'SUM' | 'AVERAGE' | 'COUNT' | 'MAX'
  const [pivotFilterVal, setPivotFilterVal] = useState('All');
  const [pivotChartType, setPivotChartType] = useState('clustered_column');

  // Compute live pivot matrix
  const pivotResults = useMemo(() => {
    return computePivotTable({
      rows: SAMPLE_DATASETS.sales.rows,
      rowField: pivotRowField,
      colField: pivotColField,
      valField: pivotValField,
      aggFunction: pivotAgg,
      filterField: 'Region',
      filterValue: pivotFilterVal
    });
  }, [pivotRowField, pivotColField, pivotValField, pivotAgg, pivotFilterVal]);

  // ==========================================
  // TAB 4: MACROS SIMULATOR STATE
  // ==========================================
  const [macroMode, setMacroMode] = useState('runner'); // 'runner' | 'recorder'
  const [selectedMacroId, setSelectedMacroId] = useState('format_financials');
  const [codeLanguage, setCodeLanguage] = useState('vba'); // 'vba' | 'apps_script'
  const [isExecutingMacro, setIsExecutingMacro] = useState(false);
  const [macroExecutedSuccess, setMacroExecutedSuccess] = useState(false);

  // Recorder state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedMacroName, setRecordedMacroName] = useState('Format_Monthly_Report');
  const [recordedActions, setRecordedActions] = useState([]);
  const [recordingFinished, setRecordingFinished] = useState(false);

  const selectedMacro = MACRO_TEMPLATES.find(m => m.id === selectedMacroId) || MACRO_TEMPLATES[0];

  const handleRunMacro = () => {
    audioService.playClick();
    setIsExecutingMacro(true);
    setMacroExecutedSuccess(false);

    setTimeout(() => {
      setIsExecutingMacro(false);
      setMacroExecutedSuccess(true);
      audioService.playSuccess();
    }, 1200);
  };

  const handleStartRecording = () => {
    audioService.playClick();
    setIsRecording(true);
    setRecordedActions([]);
    setRecordingFinished(false);
  };

  const handleAddRecordAction = (actionTitle) => {
    if (!isRecording) return;
    audioService.playClick();
    setRecordedActions(prev => [...prev, { id: Date.now(), title: actionTitle, timestamp: new Date().toLocaleTimeString() }]);
  };

  const handleStopRecording = () => {
    audioService.playSuccess();
    setIsRecording(false);
    setRecordingFinished(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9980] flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md select-none overflow-y-auto">
      <div className="relative w-full max-w-6xl h-[92vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col text-slate-100 overflow-hidden my-auto animate-window">
        {/* Header Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg">
              <Table className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Spreadsheet & Business Analytics Lab
                </h2>
                <span className="hidden sm:inline px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Excel & Sheets Simulator
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Interactive Charts, Dynamic Pivot Tables, Pivot Charts & VBA / Apps Script Macros
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Module Completion Bar */}
        <div className="px-3 sm:px-6 py-2.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('charts')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'charts' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-blue-300" />
              <span>1. Charts Simulator</span>
              {isModuleComplete('data_charts') && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 ml-0.5" />}
            </button>

            <button
              onClick={() => setActiveTab('pivots')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'pivots' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Layers className="w-4 h-4 text-purple-300" />
              <span>2. Pivot Tables Builder</span>
              {isModuleComplete('data_pivottables') && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 ml-0.5" />}
            </button>

            <button
              onClick={() => setActiveTab('pivotcharts')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'pivotcharts' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-indigo-300" />
              <span>3. Pivot Charts & Slicers</span>
              {isModuleComplete('data_pivotcharts') && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 ml-0.5" />}
            </button>

            <button
              onClick={() => setActiveTab('macros')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'macros' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Cpu className="w-4 h-4 text-emerald-300" />
              <span>4. Macros & VBA Simulator</span>
              {isModuleComplete('data_macros') && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 ml-0.5" />}
            </button>
          </div>

          {/* Mark Module as Complete Toggle */}
          <div className="flex items-center gap-2">
            {activeTab === 'charts' && (
              <button
                onClick={() => toggleModuleComplete('data_charts')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  isModuleComplete('data_charts')
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                {isModuleComplete('data_charts') ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Award className="w-3.5 h-3.5" />}
                <span>{isModuleComplete('data_charts') ? 'Charts Completed ✓' : 'Mark Charts as Complete'}</span>
              </button>
            )}

            {activeTab === 'pivots' && (
              <button
                onClick={() => toggleModuleComplete('data_pivottables')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  isModuleComplete('data_pivottables')
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                {isModuleComplete('data_pivottables') ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Award className="w-3.5 h-3.5" />}
                <span>{isModuleComplete('data_pivottables') ? 'Pivot Tables Completed ✓' : 'Mark Pivot Tables as Complete'}</span>
              </button>
            )}

            {activeTab === 'pivotcharts' && (
              <button
                onClick={() => toggleModuleComplete('data_pivotcharts')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  isModuleComplete('data_pivotcharts')
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                {isModuleComplete('data_pivotcharts') ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Award className="w-3.5 h-3.5" />}
                <span>{isModuleComplete('data_pivotcharts') ? 'Pivot Charts Completed ✓' : 'Mark Pivot Charts as Complete'}</span>
              </button>
            )}

            {activeTab === 'macros' && (
              <button
                onClick={() => toggleModuleComplete('data_macros')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  isModuleComplete('data_macros')
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                {isModuleComplete('data_macros') ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Award className="w-3.5 h-3.5" />}
                <span>{isModuleComplete('data_macros') ? 'Macros Completed ✓' : 'Mark Macros as Complete'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">

          {/* ======================================================== */}
          {/* TAB 1: CHARTS SIMULATOR                                  */}
          {/* ======================================================== */}
          {activeTab === 'charts' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Left Column: Interactive Chart Controls */}
              <div className="space-y-4 lg:col-span-1">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-blue-400" />
                    <span>Chart Configuration</span>
                  </h3>

                  {/* Chart Title */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 font-semibold">Chart Title</label>
                    <input
                      type="text"
                      value={chartTitle}
                      onChange={(e) => setChartTitle(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Chart Type Selector */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 font-semibold">Chart Type</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'column', name: 'Column', icon: BarChart3 },
                        { id: 'bar', name: 'Bar', icon: BarChart3 },
                        { id: 'line', name: 'Line', icon: LineIcon },
                        { id: 'pie', name: 'Pie', icon: PieIcon },
                        { id: 'area', name: 'Area', icon: TrendingUp }
                      ].map(type => (
                        <button
                          key={type.id}
                          onClick={() => setChartType(type.id)}
                          className={`p-2 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                            chartType === type.id
                              ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <type.icon className="w-4 h-4" />
                          <span className="text-[10px]">{type.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Palette Selector */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 font-semibold">Theme Palette</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { id: 'excel_blue', name: 'Excel Modern Blue' },
                        { id: 'emerald', name: 'Sheets Emerald' },
                        { id: 'purple', name: 'Executive Violet' },
                        { id: 'sunset', name: 'Multi-Color Heatmap' }
                      ].map(pal => (
                        <button
                          key={pal.id}
                          onClick={() => setChartColorPalette(pal.id)}
                          className={`p-2 rounded-xl border text-left text-[11px] font-semibold transition-all ${
                            chartColorPalette === pal.id
                              ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {pal.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Options Toggles */}
                  <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-slate-300 text-[11px]">Show Data Labels</span>
                      <input
                        type="checkbox"
                        checked={showDataLabels}
                        onChange={(e) => setShowDataLabels(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-slate-300 text-[11px]">Show Major Gridlines</span>
                      <input
                        type="checkbox"
                        checked={showGridlines}
                        onChange={(e) => setShowGridlines(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600"
                      />
                    </label>
                  </div>
                </div>

                {/* Raw Dataset Grid Preview */}
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                    Aggregated Data Source
                  </div>
                  <div className="space-y-1">
                    {chartData.map((d, i) => (
                      <div key={d.label} className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-slate-900/60 font-mono">
                        <span className="text-slate-300 font-sans">{d.label}</span>
                        <span className="text-emerald-400 font-bold">${d.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Chart Canvas */}
              <div className="lg:col-span-2 space-y-4">
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6 flex flex-col justify-between min-h-[460px]">
                  {/* Chart Title & Subtitle */}
                  <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white">{chartTitle}</h4>
                      <p className="text-xs text-slate-400">Interactive live render • Multi-OS compatible vector SVG engine</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-bold">
                      {chartType.toUpperCase()}
                    </span>
                  </div>

                  {/* Render Visual Chart based on selection */}
                  <div className="flex-1 flex items-center justify-center py-4">
                    {/* 1. COLUMN CHART */}
                    {chartType === 'column' && (
                      <div className="w-full h-64 flex items-end justify-around gap-4 px-4 pb-2 border-b border-slate-800 relative">
                        {showGridlines && (
                          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-15">
                            <div className="border-b border-slate-400 w-full" />
                            <div className="border-b border-slate-400 w-full" />
                            <div className="border-b border-slate-400 w-full" />
                          </div>
                        )}
                        {chartData.map((d, i) => {
                          const heightPct = Math.max(12, Math.round((d.value / maxChartVal) * 100));
                          const color = activeColors[i % activeColors.length];
                          return (
                            <div key={d.label} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                              {showDataLabels && (
                                <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-300">
                                  ${Math.round(d.value / 1000)}k
                                </span>
                              )}
                              <div
                                style={{ height: `${heightPct}%`, backgroundColor: color }}
                                className="w-full max-w-[64px] rounded-t-xl transition-all duration-500 shadow-lg group-hover:brightness-110"
                              />
                              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 truncate max-w-[70px]">
                                {d.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* 2. BAR CHART */}
                    {chartType === 'bar' && (
                      <div className="w-full space-y-3 px-2">
                        {chartData.map((d, i) => {
                          const widthPct = Math.max(10, Math.round((d.value / maxChartVal) * 100));
                          const color = activeColors[i % activeColors.length];
                          return (
                            <div key={d.label} className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-slate-300">{d.label}</span>
                                {showDataLabels && <span className="font-mono text-emerald-400 font-bold">${d.value.toLocaleString()}</span>}
                              </div>
                              <div className="w-full h-6 bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                                <div
                                  style={{ width: `${widthPct}%`, backgroundColor: color }}
                                  className="h-full rounded-lg transition-all duration-500"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* 3. LINE / AREA CHART */}
                    {(chartType === 'line' || chartType === 'area') && (
                      <div className="w-full h-64 flex flex-col justify-between px-2">
                        <svg viewBox="0 0 500 200" className="w-full h-48 overflow-visible">
                          {/* SVG Gridlines */}
                          {showGridlines && (
                            <>
                              <line x1="0" y1="40" x2="500" y2="40" stroke="#334155" strokeDasharray="3 3" />
                              <line x1="0" y1="100" x2="500" y2="100" stroke="#334155" strokeDasharray="3 3" />
                              <line x1="0" y1="160" x2="500" y2="160" stroke="#334155" strokeDasharray="3 3" />
                            </>
                          )}
                          {/* Dynamic SVG Path Coordinates */}
                          {(() => {
                            const points = chartData.map((d, idx) => {
                              const x = 50 + idx * (400 / Math.max(chartData.length - 1, 1));
                              const y = 180 - (d.value / maxChartVal) * 140;
                              return { x, y, label: d.label, val: d.value };
                            });
                            const pathStr = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                            const areaStr = `${pathStr} L ${points[points.length - 1].x} 190 L ${points[0].x} 190 Z`;

                            return (
                              <>
                                {chartType === 'area' && (
                                  <path d={areaStr} fill={activeColors[0]} fillOpacity="0.25" />
                                )}
                                <path d={pathStr} fill="none" stroke={activeColors[0]} strokeWidth="4" strokeLinecap="round" />
                                {points.map((p, idx) => (
                                  <g key={idx}>
                                    <circle cx={p.x} cy={p.y} r="6" fill="#0F172A" stroke={activeColors[idx % activeColors.length]} strokeWidth="3" />
                                    {showDataLabels && (
                                      <text x={p.x} y={p.y - 12} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold">
                                        ${Math.round(p.val / 1000)}k
                                      </text>
                                    )}
                                  </g>
                                ))}
                              </>
                            );
                          })()}
                        </svg>
                        <div className="flex items-center justify-around border-t border-slate-800 pt-2 text-xs text-slate-400 font-semibold">
                          {chartData.map(d => (
                            <span key={d.label}>{d.label}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. PIE CHART */}
                    {chartType === 'pie' && (
                      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 w-full">
                        <div className="relative w-48 h-48 rounded-full border-4 border-slate-800 flex items-center justify-center shadow-2xl">
                          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                            {(() => {
                              const total = chartData.reduce((a, b) => a + b.value, 0) || 1;
                              let accumulated = 0;
                              return chartData.map((d, i) => {
                                const strokeDasharray = `${(d.value / total) * 314.15} 314.15`;
                                const strokeDashoffset = -accumulated * 3.1415;
                                accumulated += (d.value / total) * 100;
                                return (
                                  <circle
                                    key={d.label}
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke={activeColors[i % activeColors.length]}
                                    strokeWidth="20"
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                  />
                                );
                              });
                            })()}
                          </svg>
                        </div>
                        {/* Legend */}
                        <div className="space-y-2 text-xs">
                          {chartData.map((d, i) => (
                            <div key={d.label} className="flex items-center gap-2">
                              <span
                                style={{ backgroundColor: activeColors[i % activeColors.length] }}
                                className="w-3.5 h-3.5 rounded-full"
                              />
                              <span className="text-slate-300 font-medium">{d.label}:</span>
                              <strong className="text-white font-mono">${d.value.toLocaleString()}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pro Tip Box */}
                  <div className="p-3 rounded-2xl bg-blue-950/20 border border-blue-500/30 text-xs text-blue-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>In both Excel and Sheets, choose Column charts for discrete comparisons, Line charts for trends over time, and Pie charts strictly when parts equal 100%.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: PIVOT TABLES BUILDER                              */}
          {/* ======================================================== */}
          {activeTab === 'pivots' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
              {/* Field List & Pivot Drop Zones Panel */}
              <div className="lg:col-span-1 p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>Pivot Table Fields</span>
                  </h3>
                  <span className="text-[10px] text-purple-400 font-mono font-bold">Field List</span>
                </div>

                {/* Available Fields Pills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400 font-semibold block">Available Dimensions:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Region', 'Category', 'Rep', 'Product', 'Revenue', 'Profit', 'Units'].map(field => (
                      <span key={field} className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-medium text-slate-300">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Drop Zones */}
                <div className="space-y-3 pt-2">
                  {/* Rows Selection */}
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <label className="text-[11px] font-bold text-purple-300 block">Rows (Grouping)</label>
                    <select
                      value={pivotRowField}
                      onChange={(e) => setPivotRowField(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none"
                    >
                      <option value="Region">Region</option>
                      <option value="Category">Category</option>
                      <option value="Rep">Sales Rep</option>
                      <option value="Product">Product</option>
                    </select>
                  </div>

                  {/* Columns Selection */}
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <label className="text-[11px] font-bold text-blue-300 block">Columns (Breakout)</label>
                    <select
                      value={pivotColField}
                      onChange={(e) => setPivotColField(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none"
                    >
                      <option value="Category">Category</option>
                      <option value="Region">Region</option>
                      <option value="None">None (Single Column)</option>
                    </select>
                  </div>

                  {/* Values & Aggregation */}
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <label className="text-[11px] font-bold text-emerald-300 block">Values & Calculation</label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={pivotValField}
                        onChange={(e) => setPivotValField(e.target.value)}
                        className="px-2 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none"
                      >
                        <option value="Revenue">Revenue ($)</option>
                        <option value="Profit">Profit ($)</option>
                        <option value="Units">Units Sold</option>
                      </select>
                      <select
                        value={pivotAgg}
                        onChange={(e) => setPivotAgg(e.target.value)}
                        className="px-2 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none font-bold text-emerald-400"
                      >
                        <option value="SUM">SUM</option>
                        <option value="AVERAGE">AVERAGE</option>
                        <option value="COUNT">COUNT</option>
                        <option value="MAX">MAX</option>
                      </select>
                    </div>
                  </div>

                  {/* Interactive Slicer Filter */}
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <label className="text-[11px] font-bold text-amber-300 block">Region Slicer Filter</label>
                    <div className="grid grid-cols-3 gap-1">
                      {['All', 'North', 'South', 'East', 'West'].map(reg => (
                        <button
                          key={reg}
                          onClick={() => setPivotFilterVal(reg)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            pivotFilterVal === reg ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                          }`}
                        >
                          {reg}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pivot Table Output Grid */}
              <div className="lg:col-span-3 space-y-4">
                <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-4 overflow-x-auto">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <span>Dynamic Multi-Dimensional Pivot Matrix</span>
                        <span className="text-xs text-purple-400 font-mono font-normal">({pivotAgg} of {pivotValField})</span>
                      </h4>
                      <p className="text-xs text-slate-400">Rows: {pivotRowField} • Columns: {pivotColField} • Filter: {pivotFilterVal}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                      Grand Total: ${pivotResults.grandTotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Excel/Sheets Pivot Table View */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-800">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-900/90 text-slate-300 font-bold border-b border-slate-800">
                          <th className="p-3 border-r border-slate-800 text-purple-300">{pivotRowField} \ {pivotColField}</th>
                          {pivotResults.colHeaders.map(ch => (
                            <th key={ch} className="p-3 border-r border-slate-800 text-center font-mono text-blue-300">{ch}</th>
                          ))}
                          <th className="p-3 text-right font-mono text-emerald-300 bg-slate-850">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pivotResults.rowHeaders.map((rh, rIdx) => (
                          <tr key={rh} className={`border-b border-slate-800/60 ${rIdx % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/40'} hover:bg-slate-800/40`}>
                            <td className="p-3 font-semibold text-white border-r border-slate-800">{rh}</td>
                            {pivotResults.colHeaders.map(ch => {
                              const val = pivotResults.matrix[rh]?.[ch] || 0;
                              return (
                                <td key={ch} className="p-3 text-center font-mono text-slate-200 border-r border-slate-800">
                                  {val > 0 ? (pivotValField === 'Units' ? val : `$${val.toLocaleString()}`) : '-'}
                                </td>
                              );
                            })}
                            <td className="p-3 text-right font-mono font-bold text-emerald-400 bg-slate-900/50">
                              {pivotValField === 'Units' ? pivotResults.rowTotals[rh] : `$${pivotResults.rowTotals[rh].toLocaleString()}`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-purple-950/30 text-white font-bold border-t-2 border-purple-500/40">
                          <td className="p-3 uppercase tracking-wider text-purple-300 border-r border-slate-800">Grand Total</td>
                          {pivotResults.colHeaders.map(ch => (
                            <td key={ch} className="p-3 text-center font-mono text-blue-300 border-r border-slate-800">
                              {pivotValField === 'Units' ? pivotResults.colTotals[ch] : `$${pivotResults.colTotals[ch].toLocaleString()}`}
                            </td>
                          ))}
                          <td className="p-3 text-right font-mono text-emerald-300 text-sm font-black bg-purple-950/60">
                            {pivotValField === 'Units' ? pivotResults.grandTotal : `$${pivotResults.grandTotal.toLocaleString()}`}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* Summary Metric Pills */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 uppercase">Filtered Records</div>
                      <div className="text-base font-bold text-white font-mono">{pivotResults.dataCount} transactions</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 uppercase">Rows Grouped</div>
                      <div className="text-base font-bold text-purple-400 font-mono">{pivotResults.rowHeaders.length} categories</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 uppercase">Aggregation Function</div>
                      <div className="text-base font-bold text-emerald-400 font-mono">{pivotAgg} ({pivotValField})</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: PIVOT CHARTS SIMULATOR                            */}
          {/* ======================================================== */}
          {activeTab === 'pivotcharts' && (
            <div className="space-y-4">
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-5">
                {/* Header & Slicers Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-400" />
                      <span>Interactive Pivot Chart with Dynamic Slicers</span>
                    </h3>
                    <p className="text-xs text-slate-400">Live graphical representation dynamically linked to Pivot Table aggregation</p>
                  </div>

                  {/* Interactive Slicer Buttons */}
                  <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400 px-2 flex items-center gap-1">
                      <Filter className="w-3 h-3 text-indigo-400" /> Slicer:
                    </span>
                    {['All', 'North', 'South', 'East', 'West'].map(reg => (
                      <button
                        key={reg}
                        onClick={() => setPivotFilterVal(reg)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          pivotFilterVal === reg ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {reg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pivot Chart Dynamic Rendering */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 min-h-[300px] flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-2 text-xs">
                    <span className="font-bold text-slate-300">
                      Chart Series: {pivotRowField} vs {pivotValField} ({pivotAgg})
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">
                      Grand Total: ${pivotResults.grandTotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Clustered Column Bars */}
                  <div className="h-60 flex items-end justify-around gap-6 px-4 pb-2 border-b border-slate-800">
                    {pivotResults.rowHeaders.map((rh, idx) => {
                      const totalVal = pivotResults.rowTotals[rh] || 0;
                      const maxVal = Math.max(...Object.values(pivotResults.rowTotals), 1);
                      const heightPct = Math.max(14, Math.round((totalVal / maxVal) * 100));
                      const colors = ['#6366F1', '#8B5CF6', '#EC4899', '#3B82F6', '#10B981'];
                      const barColor = colors[idx % colors.length];

                      return (
                        <div key={rh} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                          <span className="text-xs font-mono font-bold text-white">
                            ${Math.round(totalVal / 1000)}k
                          </span>
                          <div
                            style={{ height: `${heightPct}%`, backgroundColor: barColor }}
                            className="w-full max-w-[72px] rounded-t-xl transition-all duration-500 shadow-lg group-hover:brightness-110 flex items-end justify-center pb-2"
                          >
                            <span className="text-[10px] text-white/80 font-mono font-bold hidden sm:inline">{heightPct}%</span>
                          </div>
                          <span className="text-xs font-bold text-slate-300 truncate max-w-[80px]">
                            {rh}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Synchronized Table Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                  {pivotResults.rowHeaders.map(rh => (
                    <div key={rh} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-slate-400 font-medium">{rh}</div>
                        <div className="text-sm font-bold text-white font-mono">${(pivotResults.rowTotals[rh] || 0).toLocaleString()}</div>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: MACROS & SIMULATORS                               */}
          {/* ======================================================== */}
          {activeTab === 'macros' && (
            <div className="space-y-4">
              {/* Macro Submode Bar */}
              <div className="flex items-center justify-between bg-slate-950 p-2 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMacroMode('runner')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      macroMode === 'runner' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Macro Runner & Library
                  </button>
                  <button
                    onClick={() => setMacroMode('recorder')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      macroMode === 'recorder' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Macro Recorder Simulator
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">Language View:</span>
                  <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
                    <button
                      onClick={() => setCodeLanguage('vba')}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                        codeLanguage === 'vba' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      MS Excel VBA
                    </button>
                    <button
                      onClick={() => setCodeLanguage('apps_script')}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                        codeLanguage === 'apps_script' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Google Apps Script (JS)
                    </button>
                  </div>
                </div>
              </div>

              {/* MODE 1: MACRO RUNNER */}
              {macroMode === 'runner' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* Macro Selection Catalog */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Macro Library Catalog
                    </h4>
                    {MACRO_TEMPLATES.map(mac => (
                      <div
                        key={mac.id}
                        onClick={() => {
                          setSelectedMacroId(mac.id);
                          setMacroExecutedSuccess(false);
                        }}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                          selectedMacroId === mac.id
                            ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-white">{mac.name}</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 font-mono text-[10px] text-emerald-400">
                            {mac.shortcut}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{mac.description}</p>
                      </div>
                    ))}

                    <div className="pt-2">
                      <button
                        disabled={isExecutingMacro}
                        onClick={handleRunMacro}
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-xs text-white shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                      >
                        {isExecutingMacro ? <RotateCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                        <span>{isExecutingMacro ? 'Executing Macro Script...' : `Run "${selectedMacro.name}"`}</span>
                      </button>
                    </div>

                    {macroExecutedSuccess && (
                      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-window">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Macro executed with 0 errors! Active sheet formatted.</span>
                      </div>
                    )}
                  </div>

                  {/* Code Inspector (VBA vs Apps Script) */}
                  <div className="lg:col-span-2 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <FileCode className="w-4 h-4 text-emerald-400" />
                        <span>Source Code: {codeLanguage === 'vba' ? 'Visual Basic for Applications (.bas)' : 'Google Apps Script (.gs)'}</span>
                      </span>
                      <button
                        onClick={() => {
                          const code = codeLanguage === 'vba' ? selectedMacro.vbaCode : selectedMacro.appsScriptCode;
                          navigator.clipboard?.writeText(code);
                          audioService.playClick();
                        }}
                        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </button>
                    </div>

                    <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner max-h-[380px]">
                      <code>{codeLanguage === 'vba' ? selectedMacro.vbaCode : selectedMacro.appsScriptCode}</code>
                    </pre>

                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                      <strong className="text-white">Architecture Insight:</strong>
                      <p className="text-[11px] text-slate-400">
                        {codeLanguage === 'vba' 
                          ? 'Excel VBA runs locally inside the Excel Windows/macOS desktop application. It can access local hard drives, Windows APIs, and COM automation.' 
                          : 'Google Apps Script executes on Google Cloud V8 JavaScript engine. It runs 24/7 in the cloud without needing your computer powered on.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* MODE 2: MACRO RECORDER SIMULATOR */}
              {macroMode === 'recorder' && (
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-slate-600'}`} />
                        <span>Macro Recorder Simulator</span>
                      </h4>
                      <p className="text-xs text-slate-400">Simulate recording spreadsheet keystrokes and generate dual VBA / Apps Script code</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isRecording ? (
                        <button
                          onClick={handleStartRecording}
                          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg flex items-center gap-1.5 transition-all"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-white" />
                          <span>Start Recording Macro</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleStopRecording}
                          className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-white text-slate-950 font-bold text-xs shadow-lg flex items-center gap-1.5 transition-all"
                        >
                          <span className="w-2.5 h-2.5 rounded-sm bg-red-600" />
                          <span>Stop Recording</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Actions to perform during recording */}
                  {isRecording && (
                    <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-3">
                      <div className="text-xs font-bold text-red-300">
                        Recording in Progress... Click actions below to record steps:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Apply Bold & Center to Headers (A1:I1)',
                          'Format Revenue Column to Currency ($#,##0)',
                          'Sort Data by Revenue Descending',
                          'Apply Emerald Fill to High Profit Deals',
                          'Append Grand Total =SUM() Formula Row',
                          'Auto-Fit Column Widths'
                        ].map((act) => (
                          <button
                            key={act}
                            onClick={() => handleAddRecordAction(act)}
                            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-red-500/40 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all"
                          >
                            <Plus className="w-3.5 h-3.5 text-red-400" />
                            <span>{act}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recorded Steps Timeline */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Recorded Actions Stream ({recordedActions.length} steps)
                    </span>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 min-h-[120px] max-h-48 overflow-y-auto space-y-1.5">
                      {recordedActions.length === 0 ? (
                        <div className="text-center text-xs text-slate-500 py-6">
                          {isRecording ? 'Click action buttons above to record steps...' : 'Click "Start Recording Macro" to begin.'}
                        </div>
                      ) : (
                        recordedActions.map((act, idx) => (
                          <div key={act.id} className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] flex items-center justify-center font-bold">
                                {idx + 1}
                              </span>
                              <span className="text-white font-medium">{act.title}</span>
                            </div>
                            <span className="text-slate-500 text-[10px] font-mono">{act.timestamp}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {recordingFinished && (
                    <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-2 animate-window">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Recording Complete! Generated Macro Script:</span>
                      </div>
                      <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                        <code>{`Sub ${recordedMacroName}()\n    ' Generated by SarlaYash Macro Studio\n${recordedActions.map(a => `    ' Step: ${a.title}\n    Call ExecuteStep("${a.title}")`).join('\n')}\nEnd Sub`}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-400">
            SarlaYash Data Suite • Designed for mobile phones, tablets, and desktops
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            Close Lab
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetSuiteModal;
