import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Download, Settings, Trash2, ArrowUpDown, ChevronLeft, ChevronRight, Check, X, Star, ShieldAlert } from 'lucide-react';

export type DisplayTheme = 'amber' | 'green' | 'cyan' | 'red' | 'vfd-blue';
export type ChassisFinish = 'dark-steel' | 'brushed-aluminum' | 'cockpit-teal' | 'military-green';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'badge' | 'number' | 'currency' | 'rating' | 'actions';
}

export interface TableItem {
  id: string;
  name: string;
  category: string;
  supplier: string;
  status: 'In Stock' | 'Low Stock' | 'Critical' | 'Discontinued' | 'In Transit';
  quantity: number;
  price: number;
  rating: number;
  [key: string]: any;
}

export interface RetroAvionicsTableProps {
  title?: string;
  panelCode?: string;
  columns?: TableColumn[];
  data?: TableItem[];
  theme?: DisplayTheme;
  chassisFinish?: ChassisFinish;
  showSpeakerToolbar?: boolean;
  pageSize?: number;
  onRowSelect?: (selectedIds: string[]) => void;
  onAddRecord?: () => void;
  onExport?: () => void;
  className?: string;
}

const DEFAULT_COLUMNS: TableColumn[] = [
  { key: 'id', label: 'SYS_ID', width: 'w-24', sortable: true, align: 'center', type: 'text' },
  { key: 'name', label: 'PRODUCT / HARDWARE', width: 'w-48', sortable: true, align: 'left', type: 'text' },
  { key: 'category', label: 'CATEGORY', width: 'w-36', sortable: true, align: 'left', type: 'text' },
  { key: 'supplier', label: 'SUPPLIER', width: 'w-36', sortable: true, align: 'left', type: 'text' },
  { key: 'status', label: 'STATUS', width: 'w-32', sortable: true, align: 'center', type: 'badge' },
  { key: 'quantity', label: 'QTY', width: 'w-24', sortable: true, align: 'right', type: 'number' },
  { key: 'price', label: 'UNIT PRICE', width: 'w-28', sortable: true, align: 'right', type: 'currency' },
  { key: 'rating', label: 'SYS_RATING', width: 'w-28', sortable: true, align: 'center', type: 'rating' },
  { key: 'actions', label: 'ACTIONS', width: 'w-28', sortable: false, align: 'center', type: 'actions' },
];

const DEFAULT_DATA: TableItem[] = [
  { id: 'PRD-9001', name: 'PLASMA CONDUIT COIL', category: 'Propulsion', supplier: 'AeroDynamics Cyber', status: 'In Stock', quantity: 142, price: 1250.00, rating: 5 },
  { id: 'PRD-9002', name: 'HYPER-FLUX MATRIX', category: 'Avionics', supplier: 'Starlight Tech', status: 'Low Stock', quantity: 8, price: 4890.50, rating: 4 },
  { id: 'PRD-9003', name: 'SUB-LIGHT THRUSTER', category: 'Propulsion', supplier: 'Orbital Dynamics', status: 'In Stock', quantity: 64, price: 8900.00, rating: 5 },
  { id: 'PRD-9004', name: 'NEURAL LINK INTERFACE', category: 'Cybernetics', supplier: 'Biomimetic Systems', status: 'Critical', quantity: 2, price: 3400.00, rating: 3 },
  { id: 'PRD-9005', name: 'QUANTUM ENCRYPTION UNIT', category: 'Security', supplier: 'CipherCorp', status: 'In Stock', quantity: 89, price: 2150.75, rating: 5 },
  { id: 'PRD-9006', name: 'CHRONO DAMPENING SHIELD', category: 'Defense', supplier: 'Titan Tactical', status: 'In Transit', quantity: 15, price: 6200.00, rating: 4 },
  { id: 'PRD-9007', name: 'TACTICAL RADAR DISH', category: 'Avionics', supplier: 'AeroDynamics Cyber', status: 'Discontinued', quantity: 0, price: 1750.00, rating: 2 },
  { id: 'PRD-9008', name: 'ZERO-POINT BATTERY', category: 'Power', supplier: 'AeroDynamics Cyber', status: 'In Stock', quantity: 210, price: 950.00, rating: 5 },
];

export const RetroAvionicsTable: React.FC<RetroAvionicsTableProps> = ({
  title = 'SAP FIORI TELEMETRY & INVENTORY CONSOLE',
  panelCode = 'AVIONICS-SYS-1990',
  columns = DEFAULT_COLUMNS,
  data = DEFAULT_DATA,
  theme = 'amber',
  chassisFinish = 'dark-steel',
  showSpeakerToolbar = true,
  pageSize = 5,
  onRowSelect,
  onAddRecord,
  onExport,
  className = '',
}) => {
  const [tableData, setTableData] = useState<TableItem[]>(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [sortKey, setSortKey] = useState<string>('id');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [activeTheme, setActiveTheme] = useState<DisplayTheme>(theme);

  // Theme styling definitions for dot-matrix LCD cells
  const themeStyles = {
    amber: {
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.25)]',
      text: 'text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]',
      textDim: 'text-amber-600/70',
      border: 'border-amber-950/80',
      bg: 'bg-stone-950',
      dots: 'rgba(245,158,11,0.12)',
      badgeOk: 'bg-amber-950/80 text-amber-300 border-amber-600',
      badgeWarn: 'bg-amber-900/60 text-amber-400 border-amber-500',
      badgeErr: 'bg-rose-950/80 text-rose-400 border-rose-600',
      hdrBg: 'bg-gradient-to-b from-stone-900 via-stone-950 to-black',
      btnAccent: 'bg-amber-500 text-stone-950 hover:bg-amber-400',
    },
    green: {
      glow: 'shadow-[0_0_12px_rgba(16,185,129,0.25)]',
      text: 'text-emerald-400 drop-shadow-[0_0_4px_rgba(52,211,153,0.8)]',
      textDim: 'text-emerald-600/70',
      border: 'border-emerald-950/80',
      bg: 'bg-stone-950',
      dots: 'rgba(16,185,129,0.12)',
      badgeOk: 'bg-emerald-950/80 text-emerald-300 border-emerald-600',
      badgeWarn: 'bg-amber-950/80 text-amber-300 border-amber-600',
      badgeErr: 'bg-rose-950/80 text-rose-400 border-rose-600',
      hdrBg: 'bg-gradient-to-b from-stone-900 via-stone-950 to-black',
      btnAccent: 'bg-emerald-500 text-stone-950 hover:bg-emerald-400',
    },
    cyan: {
      glow: 'shadow-[0_0_12px_rgba(6,182,212,0.25)]',
      text: 'text-cyan-300 drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]',
      textDim: 'text-cyan-600/70',
      border: 'border-cyan-950/80',
      bg: 'bg-stone-950',
      dots: 'rgba(6,182,212,0.12)',
      badgeOk: 'bg-cyan-950/80 text-cyan-300 border-cyan-600',
      badgeWarn: 'bg-amber-950/80 text-amber-300 border-amber-600',
      badgeErr: 'bg-rose-950/80 text-rose-400 border-rose-600',
      hdrBg: 'bg-gradient-to-b from-stone-900 via-stone-950 to-black',
      btnAccent: 'bg-cyan-500 text-stone-950 hover:bg-cyan-400',
    },
    red: {
      glow: 'shadow-[0_0_12px_rgba(239,68,68,0.25)]',
      text: 'text-rose-400 drop-shadow-[0_0_4px_rgba(244,63,94,0.8)]',
      textDim: 'text-rose-600/70',
      border: 'border-rose-950/80',
      bg: 'bg-stone-950',
      dots: 'rgba(239,68,68,0.12)',
      badgeOk: 'bg-rose-950/80 text-rose-300 border-rose-600',
      badgeWarn: 'bg-amber-950/80 text-amber-300 border-amber-600',
      badgeErr: 'bg-red-950/90 text-red-300 border-red-500',
      hdrBg: 'bg-gradient-to-b from-stone-900 via-stone-950 to-black',
      btnAccent: 'bg-rose-500 text-stone-950 hover:bg-rose-400',
    },
    'vfd-blue': {
      glow: 'shadow-[0_0_12px_rgba(59,130,246,0.25)]',
      text: 'text-sky-300 drop-shadow-[0_0_4px_rgba(96,165,250,0.8)]',
      textDim: 'text-sky-600/70',
      border: 'border-blue-950/80',
      bg: 'bg-stone-950',
      dots: 'rgba(59,130,246,0.12)',
      badgeOk: 'bg-sky-950/80 text-sky-300 border-sky-600',
      badgeWarn: 'bg-amber-950/80 text-amber-300 border-amber-600',
      badgeErr: 'bg-rose-950/80 text-rose-400 border-rose-600',
      hdrBg: 'bg-gradient-to-b from-stone-900 via-stone-950 to-black',
      btnAccent: 'bg-sky-500 text-stone-950 hover:bg-sky-400',
    },
  }[activeTheme];

  const chassisStyles = {
    'dark-steel': 'bg-gradient-to-b from-stone-900 via-stone-950 to-black border-stone-700 shadow-[0_20px_40px_rgba(0,0,0,0.95)]',
    'brushed-aluminum': 'bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-slate-600 shadow-[0_20px_40px_rgba(0,0,0,0.85)]',
    'cockpit-teal': 'bg-gradient-to-b from-teal-950 via-stone-950 to-black border-teal-800 shadow-[0_20px_40px_rgba(0,0,0,0.95)]',
    'military-green': 'bg-gradient-to-b from-emerald-950 via-stone-950 to-black border-emerald-900 shadow-[0_20px_40px_rgba(0,0,0,0.95)]',
  }[chassisFinish];

  // Extract unique categories for filtering
  const categories = useMemo(() => {
    const set = new Set<string>();
    data.forEach((item) => set.add(item.category));
    return ['ALL', ...Array.from(set)];
  }, [data]);

  // Filter & Search Logic
  const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [tableData, searchQuery, categoryFilter]);

  // Sorting Logic
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = (valB || '').toString().toLowerCase();
      }
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortAsc]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Handle Select All Toggle
  const isAllSelected = paginatedData.length > 0 && paginatedData.every((item) => selectedIds.has(item.id));
  const toggleSelectAll = () => {
    const next = new Set(selectedIds);
    if (isAllSelected) {
      paginatedData.forEach((item) => next.delete(item.id));
    } else {
      paginatedData.forEach((item) => next.add(item.id));
    }
    setSelectedIds(next);
    if (onRowSelect) onRowSelect(Array.from(next));
  };

  // Toggle single row selection
  const toggleRowSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
    if (onRowSelect) onRowSelect(Array.from(next));
  };

  // Delete selected items
  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;
    setTableData((prev) => prev.filter((item) => !selectedIds.has(item.id)));
    setSelectedIds(new Set());
  };

  // Handle single item deletion
  const handleDeleteRow = (id: string) => {
    setTableData((prev) => prev.filter((item) => item.id !== id));
    const next = new Set(selectedIds);
    next.delete(id);
    setSelectedIds(next);
  };

  // Render Status Badge
  const renderStatusBadge = (status: TableItem['status']) => {
    let badgeClass = themeStyles.badgeOk;
    if (status === 'Low Stock' || status === 'In Transit') badgeClass = themeStyles.badgeWarn;
    if (status === 'Critical' || status === 'Discontinued') badgeClass = themeStyles.badgeErr;

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border text-[10px] font-mono font-bold uppercase tracking-wider ${badgeClass}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
        {status}
      </span>
    );
  };

  // Render Star Rating
  const renderRating = (rating: number) => (
    <div className="flex items-center justify-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < rating
              ? `${themeStyles.text} fill-current`
              : 'text-stone-800 fill-stone-900 border-stone-800'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className={`relative inline-block w-full max-w-6xl mx-auto font-sans select-none ${className}`}>
      {/* Heavy Mechanical Frame / Chassis */}
      <div className={`relative rounded-2xl p-4 sm:p-6 border-2 ${chassisStyles} overflow-hidden`}>
        {/* Chassis Corner Rivets / Screws */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-stone-700 border border-stone-900 shadow-inner flex items-center justify-center">
          <div className="w-1 h-0.5 bg-stone-950 rotate-45" />
        </div>
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-stone-700 border border-stone-900 shadow-inner flex items-center justify-center">
          <div className="w-1 h-0.5 bg-stone-950 -rotate-45" />
        </div>
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-stone-700 border border-stone-900 shadow-inner flex items-center justify-center">
          <div className="w-1 h-0.5 bg-stone-950 rotate-12" />
        </div>
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-stone-700 border border-stone-900 shadow-inner flex items-center justify-center">
          <div className="w-1 h-0.5 bg-stone-950 -rotate-12" />
        </div>

        {/* Console Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#ef4444]" />
            </div>
            <div>
              <h2 className={`text-sm sm:text-base font-mono font-black tracking-widest uppercase ${themeStyles.text}`}>
                {title}
              </h2>
              <p className="text-[10px] font-mono font-bold tracking-wider text-stone-500 uppercase">
                SAP FIORI ENGINE // {panelCode} // 1990 SCI-CAR COCKPIT INTERFACE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-300 text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-md active:translate-y-0.5"
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              COLOR THEME
            </button>
            <div className="px-2.5 py-1 rounded bg-stone-950 border border-stone-800 text-[10px] font-mono font-bold text-stone-400">
              RECORDS: <span className={themeStyles.text}>{filteredData.length}</span> / {data.length}
            </div>
          </div>
        </div>

        {/* 1. SPEAKER MESH TOOLBAR WITH TACTILE PUSH BUTTONS & DOT-MATRIX SEARCH */}
        {showSpeakerToolbar && (
          <div className="relative mb-5 p-3 rounded-xl bg-stone-950 border-2 border-stone-800 shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* Speaker Mesh Vent Pattern Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#1c1917_2.5px,transparent_2.5px)] [background-size:8px_8px] opacity-80 pointer-events-none" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              {/* Left Action Cluster: Tactile Push Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Search Field LCD Display Box */}
                <div className="relative flex items-center min-w-[220px] sm:min-w-[280px]">
                  <div className={`w-full relative flex items-center px-3 py-1.5 rounded-md bg-stone-950 border ${themeStyles.border} ${themeStyles.glow}`}>
                    <Search className={`w-4 h-4 mr-2 ${themeStyles.text} shrink-0`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="SEARCH PRODUCT / ID..."
                      className={`w-full bg-transparent font-mono text-xs font-bold ${themeStyles.text} placeholder:${themeStyles.textDim} focus:outline-none tracking-wider`}
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="p-0.5 hover:opacity-80">
                        <X className={`w-3.5 h-3.5 ${themeStyles.text}`} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Category Filter Selector */}
                <div className="relative flex items-center">
                  <div className={`px-2 py-1.5 rounded-md bg-stone-950 border ${themeStyles.border} flex items-center gap-1.5`}>
                    <Filter className={`w-3.5 h-3.5 ${themeStyles.text}`} />
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className={`bg-transparent font-mono text-xs font-bold ${themeStyles.text} focus:outline-none cursor-pointer tracking-wider`}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-stone-900 text-amber-400">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Action Cluster: Tactile Push Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={onAddRecord || (() => alert('ADD RECORD FUNCTION TRIGGERED'))}
                  className="px-3 py-1.5 rounded-md bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 font-mono text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-[0_4px_0_0_#1c1917] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  ADD ITEM
                </button>

                <button
                  onClick={onExport || (() => alert('EXPORT TELEMETRY DATA STARTED'))}
                  className="px-3 py-1.5 rounded-md bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 font-mono text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-[0_4px_0_0_#1c1917] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-sky-400" />
                  EXPORT
                </button>

                {selectedIds.size > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="px-3 py-1.5 rounded-md bg-rose-950 hover:bg-rose-900 border border-rose-700 text-rose-200 font-mono text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-[0_4px_0_0_#450a0a] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    PURGE ({selectedIds.size})
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. MAIN TABLE CONTAINING DOT-MATRIX DISPLAY CELLS & 3D LIGHT SELECTORS */}
        <div className="w-full overflow-x-auto rounded-xl border border-stone-800 shadow-2xl bg-stone-950">
          <table className="w-full border-collapse text-left min-w-[850px]">
            {/* Table Header */}
            <thead>
              <tr className={`border-b-2 border-stone-800 ${themeStyles.hdrBg}`}>
                {/* Selector Header Column */}
                <th className="py-3 px-3 w-14 text-center border-r border-stone-800">
                  <button
                    onClick={toggleSelectAll}
                    title="Select All Rows"
                    className="group flex flex-col items-center justify-center mx-auto cursor-pointer focus:outline-none"
                  >
                    {/* 3D Circular Indicator Light Toggle Button */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                        isAllSelected
                          ? 'bg-amber-500 border-amber-300 shadow-[0_0_10px_#f59e0b]'
                          : 'bg-stone-900 border-stone-700 shadow-inner group-hover:border-stone-500'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isAllSelected ? 'bg-amber-100 shadow-[0_0_4px_#fff]' : 'bg-stone-800'
                        }`}
                      />
                    </div>
                  </button>
                </th>

                {/* Data Columns Header */}
                {columns.map((col) => {
                  const isSorted = sortKey === col.key;
                  return (
                    <th
                      key={col.key}
                      className={`py-3 px-3 border-r border-stone-800/80 font-mono text-[11px] font-bold tracking-widest text-stone-400 uppercase ${
                        col.width || ''
                      }`}
                    >
                      {col.sortable ? (
                        <button
                          onClick={() => {
                            if (sortKey === col.key) {
                              setSortAsc(!sortAsc);
                            } else {
                              setSortKey(col.key);
                              setSortAsc(true);
                            }
                          }}
                          className={`flex items-center gap-1.5 w-full hover:text-stone-200 transition-colors ${
                            col.align === 'center'
                              ? 'justify-center'
                              : col.align === 'right'
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          <span>{col.label}</span>
                          <ArrowUpDown
                            className={`w-3 h-3 ${
                              isSorted ? themeStyles.text : 'text-stone-600'
                            }`}
                          />
                        </button>
                      ) : (
                        <div
                          className={`w-full ${
                            col.align === 'center'
                              ? 'text-center'
                              : col.align === 'right'
                              ? 'text-right'
                              : 'text-left'
                          }`}
                        >
                          {col.label}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-stone-900">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <ShieldAlert className="w-8 h-8 text-amber-500 animate-bounce" />
                      <span className={`font-mono text-sm font-bold tracking-widest uppercase ${themeStyles.text}`}>
                        NO TELEMETRY MATCHES FOUND
                      </span>
                      <span className="font-mono text-xs text-stone-500">
                        Try adjusting search parameters or clearing filters.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => {
                  const isSelected = selectedIds.has(item.id);

                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors duration-150 ${
                        isSelected ? 'bg-stone-900/90' : 'hover:bg-stone-900/50'
                      }`}
                    >
                      {/* Leftmost Column: 3D Tactile Circular Light Indicator Selector */}
                      <td className="py-3 px-3 text-center border-r border-stone-800/80">
                        <button
                          onClick={() => toggleRowSelect(item.id)}
                          className="group flex items-center justify-center mx-auto cursor-pointer focus:outline-none"
                        >
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                              isSelected
                                ? 'bg-amber-400 border-amber-200 shadow-[0_0_12px_#fbbf24]'
                                : 'bg-stone-900 border-stone-700 shadow-inner group-hover:border-stone-500'
                            }`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                isSelected ? 'bg-stone-950 shadow-[0_0_4px_#fff]' : 'bg-stone-800'
                              }`}
                            />
                          </div>
                        </button>
                      </td>

                      {/* Row Data Cells: Stylized as Dot-Matrix LCD Display Monitors */}
                      {columns.map((col) => {
                        const cellValue = item[col.key];

                        return (
                          <td
                            key={col.key}
                            className="py-2.5 px-3 border-r border-stone-800/80 align-middle"
                          >
                            {/* Dot Matrix Screen Box */}
                            <div
                              className={`relative p-2 rounded-md ${themeStyles.bg} border ${
                                isSelected ? themeStyles.border : 'border-stone-800/80'
                              } ${isSelected ? themeStyles.glow : ''} overflow-hidden min-h-[38px] flex items-center ${
                                col.align === 'center'
                                  ? 'justify-center'
                                  : col.align === 'right'
                                  ? 'justify-end'
                                  : 'justify-start'
                              }`}
                            >
                              {/* Scanlines Overlay */}
                              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_bottom,transparent_1px,rgba(0,0,0,0.9)_1px)] [background-size:100%_3px] pointer-events-none z-10" />

                              {/* LED Grid Overlay */}
                              <div
                                className="absolute inset-0 opacity-15 pointer-events-none z-10"
                                style={{
                                  backgroundImage: `radial-gradient(${themeStyles.dots} 1.5px, transparent 1.5px)`,
                                  backgroundSize: '5px 5px',
                                }}
                              />

                              {/* Cell Content Renderer */}
                              <div className="relative z-0 font-mono text-xs tracking-wider font-bold truncate">
                                {col.type === 'badge' ? (
                                  renderStatusBadge(cellValue)
                                ) : col.type === 'rating' ? (
                                  renderRating(cellValue)
                                ) : col.type === 'currency' ? (
                                  <span className={themeStyles.text}>
                                    ${Number(cellValue).toFixed(2)}
                                  </span>
                                ) : col.type === 'number' ? (
                                  <span className={themeStyles.text}>{cellValue}</span>
                                ) : col.type === 'actions' ? (
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      onClick={() => alert(`EDIT RECORD: ${item.id}`)}
                                      className="p-1 rounded bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 text-[10px] font-mono"
                                      title="Edit Record"
                                    >
                                      EDIT
                                    </button>
                                    <button
                                      onClick={() => handleDeleteRow(item.id)}
                                      className="p-1 rounded bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 text-[10px] font-mono"
                                      title="Delete Record"
                                    >
                                      PURGE
                                    </button>
                                  </div>
                                ) : (
                                  <span className={themeStyles.text}>{cellValue}</span>
                                )}
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 3. COCKPIT TELEMETRY STATUS & PAGINATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-stone-800">
          {/* Status Telemetry LED Bar */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded bg-stone-950 border border-stone-800 text-[10px] font-mono font-bold text-stone-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              STATUS: <span className="text-emerald-400 uppercase">ONLINE / ONLINE_1990</span>
            </div>
            {selectedIds.size > 0 && (
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                SELECTED: {selectedIds.size} ITEMS
              </span>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-stone-400 mr-1">
              PAGE <span className={themeStyles.text}>{currentPage}</span> OF {totalPages}
            </span>

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="p-1.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              className="p-1.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* COLOR THEME SELECTION MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-stone-900 border-2 border-stone-700 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-mono font-bold text-amber-400 tracking-widest uppercase mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              SELECT LCD MONITOR THEME
            </h3>

            <div className="space-y-3 mb-6">
              {(['amber', 'green', 'cyan', 'red', 'vfd-blue'] as DisplayTheme[]).map((thm) => (
                <button
                  key={thm}
                  onClick={() => {
                    setActiveTheme(thm);
                    setShowSettingsModal(false);
                  }}
                  className={`w-full p-3 rounded-lg border text-left font-mono text-xs font-bold uppercase flex items-center justify-between transition-all ${
                    activeTheme === thm
                      ? 'bg-stone-950 border-amber-400 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        thm === 'amber'
                          ? 'bg-amber-400'
                          : thm === 'green'
                          ? 'bg-emerald-400'
                          : thm === 'cyan'
                          ? 'bg-cyan-400'
                          : thm === 'red'
                          ? 'bg-rose-400'
                          : 'bg-blue-400'
                      }`}
                    />
                    {thm} MONITOR MONOCHROME
                  </span>
                  {activeTheme === thm && <Check className="w-4 h-4 text-amber-400" />}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full py-2 bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 rounded font-mono text-xs font-bold tracking-widest uppercase"
            >
              CLOSE SETTINGS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
