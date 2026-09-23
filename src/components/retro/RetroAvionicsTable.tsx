import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  Download,
  Trash2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Star,
  ShieldAlert,
  SlidersHorizontal,
  Eye,
  EyeOff,
  Zap,
  Grid,
} from 'lucide-react';

export type DisplayTheme = 'amber' | 'green' | 'cyan' | 'red' | 'vfd-blue';
export type ChassisFinish = 'dark-steel' | 'brushed-aluminum' | 'cockpit-teal' | 'military-green';
export type TableDensity = 'compact' | 'normal';

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
  density?: TableDensity;
  onRowSelect?: (selectedIds: string[]) => void;
  onAddRecord?: () => void;
  onExport?: () => void;
  className?: string;
}

const DEFAULT_COLUMNS: TableColumn[] = [
  { key: 'id', label: 'SYS_ID', width: 'w-24', sortable: true, align: 'center', type: 'text' },
  { key: 'name', label: 'PRODUCT / HARDWARE', width: 'w-48', sortable: true, align: 'left', type: 'text' },
  { key: 'category', label: 'CATEGORY', width: 'w-32', sortable: true, align: 'left', type: 'text' },
  { key: 'supplier', label: 'SUPPLIER', width: 'w-32', sortable: true, align: 'left', type: 'text' },
  { key: 'status', label: 'STATUS', width: 'w-28', sortable: true, align: 'center', type: 'badge' },
  { key: 'quantity', label: 'QTY', width: 'w-20', sortable: true, align: 'right', type: 'number' },
  { key: 'price', label: 'UNIT PRICE', width: 'w-24', sortable: true, align: 'right', type: 'currency' },
  { key: 'rating', label: 'SYS_RATING', width: 'w-24', sortable: true, align: 'center', type: 'rating' },
  { key: 'actions', label: 'ACTIONS', width: 'w-24', sortable: false, align: 'center', type: 'actions' },
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
  chassisFinish: initialChassisFinish = 'dark-steel',
  showSpeakerToolbar = true,
  pageSize: initialPageSize = 5,
  density: initialDensity = 'compact',
  onRowSelect,
  onAddRecord,
  onExport,
  className = '',
}) => {
  const [tableData, setTableData] = useState<TableItem[]>(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [smartFilter, setSmartFilter] = useState<string>('ALL');
  const [sortKey, setSortKey] = useState<string>('id');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = initialPageSize;
  const [showPersonalisationModal, setShowPersonalisationModal] = useState<boolean>(false);

  // Customization preferences state
  const [activeTheme, setActiveTheme] = useState<DisplayTheme>(theme);
  const [chassisFinish, setChassisFinish] = useState<ChassisFinish>(initialChassisFinish);
  const [density, setDensity] = useState<TableDensity>(initialDensity);
  const [showCellGrid, setShowCellGrid] = useState<boolean>(true);
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<Set<string>>(
    new Set(columns.map((c) => c.key))
  );

  // Theme styling definitions for dot-matrix LCD cells
  const themeStyles = {
    amber: {
      glow: 'shadow-[0_0_8px_rgba(245,158,11,0.2)]',
      text: 'text-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.8)]',
      textDim: 'text-amber-600/70',
      border: 'border-amber-950/60',
      bg: 'bg-stone-950',
      dots: 'rgba(245,158,11,0.08)',
      badgeOk: 'bg-amber-950/80 text-amber-300 border-amber-600',
      badgeWarn: 'bg-amber-900/60 text-amber-400 border-amber-500',
      badgeErr: 'bg-rose-950/80 text-rose-400 border-rose-600',
      hdrBg: 'bg-gradient-to-b from-stone-900 via-stone-950 to-black',
      btnAccent: 'bg-amber-500 text-stone-950 hover:bg-amber-400',
      chipActive: 'bg-amber-500/20 text-amber-300 border-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.3)]',
    },
    green: {
      glow: 'shadow-[0_0_8px_rgba(16,185,129,0.2)]',
      text: 'text-emerald-400 drop-shadow-[0_0_3px_rgba(52,211,153,0.8)]',
      textDim: 'text-emerald-600/70',
      border: 'border-emerald-950/60',
      bg: 'bg-stone-950',
      dots: 'rgba(16,185,129,0.08)',
      badgeOk: 'bg-emerald-950/80 text-emerald-300 border-emerald-600',
      badgeWarn: 'bg-amber-950/80 text-amber-300 border-amber-600',
      badgeErr: 'bg-rose-950/80 text-rose-400 border-rose-600',
      hdrBg: 'bg-gradient-to-b from-stone-900 via-stone-950 to-black',
      btnAccent: 'bg-emerald-500 text-stone-950 hover:bg-emerald-400',
      chipActive: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.3)]',
    },
    cyan: {
      glow: 'shadow-[0_0_8px_rgba(6,182,212,0.2)]',
      text: 'text-cyan-300 drop-shadow-[0_0_3px_rgba(34,211,238,0.8)]',
      textDim: 'text-cyan-600/70',
      border: 'border-cyan-950/60',
      bg: 'bg-stone-950',
      dots: 'rgba(6,182,212,0.08)',
      badgeOk: 'bg-cyan-950/80 text-cyan-300 border-cyan-600',
      badgeWarn: 'bg-amber-950/80 text-amber-300 border-amber-600',
      badgeErr: 'bg-rose-950/80 text-rose-400 border-rose-600',
      hdrBg: 'bg-gradient-to-b from-stone-900 via-stone-950 to-black',
      btnAccent: 'bg-cyan-500 text-stone-950 hover:bg-cyan-400',
      chipActive: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/80 shadow-[0_0_8px_rgba(6,182,212,0.3)]',
    },
    red: {
      glow: 'shadow-[0_0_8px_rgba(239,68,68,0.2)]',
      text: 'text-rose-400 drop-shadow-[0_0_3px_rgba(244,63,94,0.8)]',
      textDim: 'text-rose-600/70',
      border: 'border-rose-950/60',
      bg: 'bg-stone-950',
      dots: 'rgba(239,68,68,0.08)',
      badgeOk: 'bg-rose-950/80 text-rose-300 border-rose-600',
      badgeWarn: 'bg-amber-950/80 text-amber-300 border-amber-600',
      badgeErr: 'bg-red-950/90 text-red-300 border-red-500',
      hdrBg: 'bg-gradient-to-b from-stone-900 via-stone-950 to-black',
      btnAccent: 'bg-rose-500 text-stone-950 hover:bg-rose-400',
      chipActive: 'bg-rose-500/20 text-rose-300 border-rose-500/80 shadow-[0_0_8px_rgba(239,68,68,0.3)]',
    },
    'vfd-blue': {
      glow: 'shadow-[0_0_8px_rgba(59,130,246,0.2)]',
      text: 'text-sky-300 drop-shadow-[0_0_3px_rgba(96,165,250,0.8)]',
      textDim: 'text-sky-600/70',
      border: 'border-blue-950/60',
      bg: 'bg-stone-950',
      dots: 'rgba(59,130,246,0.08)',
      badgeOk: 'bg-sky-950/80 text-sky-300 border-sky-600',
      badgeWarn: 'bg-amber-950/80 text-amber-300 border-amber-600',
      badgeErr: 'bg-rose-950/80 text-rose-400 border-rose-600',
      hdrBg: 'bg-gradient-to-b from-stone-900 via-stone-950 to-black',
      btnAccent: 'bg-sky-500 text-stone-950 hover:bg-sky-400',
      chipActive: 'bg-sky-500/20 text-sky-300 border-sky-500/80 shadow-[0_0_8px_rgba(59,130,246,0.3)]',
    },
  }[activeTheme];

  const chassisStyles = {
    'dark-steel': 'bg-gradient-to-b from-stone-900 via-stone-950 to-black border-stone-700 shadow-[0_20px_40px_rgba(0,0,0,0.95)]',
    'brushed-aluminum': 'bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-slate-600 shadow-[0_20px_40px_rgba(0,0,0,0.85)]',
    'cockpit-teal': 'bg-gradient-to-b from-teal-950 via-stone-950 to-black border-teal-800 shadow-[0_20px_40px_rgba(0,0,0,0.95)]',
    'military-green': 'bg-gradient-to-b from-emerald-950 via-stone-950 to-black border-emerald-900 shadow-[0_20px_40px_rgba(0,0,0,0.95)]',
  }[chassisFinish];

  // Active columns based on user visibility settings
  const activeColumns = useMemo(() => {
    return columns.filter((col) => visibleColumnKeys.has(col.key));
  }, [columns, visibleColumnKeys]);

  // Extract unique categories for dropdown
  const categories = useMemo(() => {
    const set = new Set<string>();
    data.forEach((item) => set.add(item.category));
    return ['ALL', ...Array.from(set)];
  }, [data]);

  // Smart Filter Chips definition
  const smartFilterChips = [
    { id: 'ALL', label: 'ALL SYSTEMS' },
    { id: 'PROPULSION', label: 'PROPULSION' },
    { id: 'AVIONICS', label: 'AVIONICS' },
    { id: 'WARNING', label: 'STOCK WARNING' },
    { id: 'HIGH_VALUE', label: 'HIGH VALUE (>$3K)' },
  ];

  // Filter & Search Logic
  const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;

      let matchesSmart = true;
      if (smartFilter === 'PROPULSION') matchesSmart = item.category === 'Propulsion';
      if (smartFilter === 'AVIONICS') matchesSmart = item.category === 'Avionics';
      if (smartFilter === 'WARNING') matchesSmart = item.status === 'Low Stock' || item.status === 'Critical';
      if (smartFilter === 'HIGH_VALUE') matchesSmart = item.price >= 3000;

      return matchesSearch && matchesCategory && matchesSmart;
    });
  }, [tableData, searchQuery, categoryFilter, smartFilter]);

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

  // Toggle Column Visibility
  const toggleColumnVisibility = (key: string) => {
    const next = new Set(visibleColumnKeys);
    if (next.has(key)) {
      if (next.size > 1) next.delete(key);
    } else {
      next.add(key);
    }
    setVisibleColumnKeys(next);
  };

  // Render Status Badge
  const renderStatusBadge = (status: TableItem['status']) => {
    let badgeClass = themeStyles.badgeOk;
    if (status === 'Low Stock' || status === 'In Transit') badgeClass = themeStyles.badgeWarn;
    if (status === 'Critical' || status === 'Discontinued') badgeClass = themeStyles.badgeErr;

    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded border text-[9px] font-mono font-bold uppercase tracking-wider ${badgeClass}`}>
        <span className="w-1 h-1 rounded-full bg-current animate-pulse shrink-0" />
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
          className={`w-2.5 h-2.5 ${
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
      <div className={`relative rounded-2xl p-3 sm:p-5 border-2 ${chassisStyles} overflow-hidden`}>
        {/* Chassis Corner Rivets / Screws */}
        <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-stone-700 border border-stone-900 shadow-inner flex items-center justify-center">
          <div className="w-1 h-0.5 bg-stone-950 rotate-45" />
        </div>
        <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-stone-700 border border-stone-900 shadow-inner flex items-center justify-center">
          <div className="w-1 h-0.5 bg-stone-950 -rotate-45" />
        </div>
        <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-stone-700 border border-stone-900 shadow-inner flex items-center justify-center">
          <div className="w-1 h-0.5 bg-stone-950 rotate-12" />
        </div>
        <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-stone-700 border border-stone-900 shadow-inner flex items-center justify-center">
          <div className="w-1 h-0.5 bg-stone-950 -rotate-12" />
        </div>

        {/* Console Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-800/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#ef4444]" />
            </div>
            <div>
              <h2 className={`text-xs sm:text-sm font-mono font-black tracking-widest uppercase ${themeStyles.text}`}>
                {title}
              </h2>
              <p className="text-[9px] font-mono font-bold tracking-wider text-stone-500 uppercase">
                SAP FIORI ENGINE // {panelCode} // COCKPIT INTERFACE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowPersonalisationModal(true)}
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 text-[11px] font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-md active:translate-y-0.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              PERSONALISATION
            </button>
            <div className="px-2 py-1 rounded bg-stone-950 border border-stone-800 text-[10px] font-mono font-bold text-stone-400">
              RECORDS: <span className={themeStyles.text}>{filteredData.length}</span> / {data.length}
            </div>
          </div>
        </div>

        {/* 1. SPEAKER MESH TOOLBAR WITH TACTILE PUSH BUTTONS & DOT-MATRIX SEARCH */}
        {showSpeakerToolbar && (
          <div className="relative mb-3 p-2.5 rounded-xl bg-stone-950 border border-stone-800 shadow-[inset_0_3px_8px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* Speaker Mesh Vent Pattern Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#1c1917_2.5px,transparent_2.5px)] [background-size:8px_8px] opacity-80 pointer-events-none" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5">
              {/* Left Action Cluster: Search & Category */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Search Field LCD Display Box */}
                <div className="relative flex items-center min-w-[200px] sm:min-w-[240px]">
                  <div className={`w-full relative flex items-center px-2.5 py-1 rounded-md bg-stone-950 border ${themeStyles.border} ${themeStyles.glow}`}>
                    <Search className={`w-3.5 h-3.5 mr-2 ${themeStyles.text} shrink-0`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="SEARCH PRODUCT / ID..."
                      className={`w-full bg-transparent font-mono text-[11px] font-bold ${themeStyles.text} placeholder:${themeStyles.textDim} focus:outline-none tracking-wider`}
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="p-0.5 hover:opacity-80">
                        <X className={`w-3 h-3 ${themeStyles.text}`} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Category Filter Selector */}
                <div className="relative flex items-center">
                  <div className={`px-2 py-1 rounded-md bg-stone-950 border ${themeStyles.border} flex items-center gap-1`}>
                    <Filter className={`w-3 h-3 ${themeStyles.text}`} />
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className={`bg-transparent font-mono text-[11px] font-bold ${themeStyles.text} focus:outline-none cursor-pointer tracking-wider`}
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
                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 font-mono text-[11px] font-bold tracking-wider flex items-center gap-1 shadow-[0_3px_0_0_#1c1917] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  ADD ITEM
                </button>

                <button
                  onClick={onExport || (() => alert('EXPORT TELEMETRY DATA STARTED'))}
                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 font-mono text-[11px] font-bold tracking-wider flex items-center gap-1 shadow-[0_3px_0_0_#1c1917] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-sky-400" />
                  EXPORT
                </button>

                {selectedIds.size > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="px-2.5 py-1 rounded bg-rose-950 hover:bg-rose-900 border border-rose-700 text-rose-200 font-mono text-[11px] font-bold tracking-wider flex items-center gap-1 shadow-[0_3px_0_0_#450a0a] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    PURGE ({selectedIds.size})
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. SMART FILTER PRESETS BAR ABOVE TABLE */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 no-scrollbar">
          <span className="text-[9px] font-mono font-bold text-stone-500 uppercase tracking-widest mr-1 shrink-0 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" />
            SMART FILTERS:
          </span>
          {smartFilterChips.map((chip) => {
            const isActive = smartFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setSmartFilter(chip.id)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? themeStyles.chipActive
                    : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:border-stone-700 hover:text-stone-300'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* 3. MAIN SEAMLESS COMPACT TABLE WITH DOT-MATRIX DISPLAY CELLS & 3D LIGHT SELECTORS */}
        <div className="w-full overflow-x-auto rounded-xl border border-stone-800/90 shadow-2xl bg-stone-950">
          <table className="w-full border-collapse text-left min-w-[750px]">
            {/* Table Header */}
            <thead>
              <tr className={`border-b border-stone-800/90 ${themeStyles.hdrBg}`}>
                {/* Selector Header Column */}
                <th className="py-2 px-2.5 w-12 text-center border-r border-stone-800/60">
                  <button
                    onClick={toggleSelectAll}
                    title="Select All Rows"
                    className="group flex flex-col items-center justify-center mx-auto cursor-pointer focus:outline-none"
                  >
                    {/* 3D Circular Indicator Light Toggle Button */}
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-150 ${
                        isAllSelected
                          ? 'bg-amber-500 border-amber-300 shadow-[0_0_8px_#f59e0b]'
                          : 'bg-stone-900 border-stone-700 shadow-inner group-hover:border-stone-500'
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          isAllSelected ? 'bg-amber-100 shadow-[0_0_3px_#fff]' : 'bg-stone-800'
                        }`}
                      />
                    </div>
                  </button>
                </th>

                {/* Data Columns Header */}
                {activeColumns.map((col) => {
                  const isSorted = sortKey === col.key;
                  return (
                    <th
                      key={col.key}
                      className={`py-2 px-2.5 border-r border-stone-800/60 font-mono text-[10px] font-bold tracking-widest text-stone-400 uppercase ${
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
                          className={`flex items-center gap-1 w-full hover:text-stone-200 transition-colors ${
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
            <tbody className="divide-y divide-stone-900/60">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={activeColumns.length + 1} className="py-10 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <ShieldAlert className="w-7 h-7 text-amber-500 animate-bounce" />
                      <span className={`font-mono text-xs font-bold tracking-widest uppercase ${themeStyles.text}`}>
                        NO TELEMETRY MATCHES FOUND
                      </span>
                      <span className="font-mono text-[10px] text-stone-500">
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
                        isSelected ? 'bg-amber-950/20' : 'hover:bg-stone-900/40'
                      }`}
                    >
                      {/* Leftmost Column: 3D Tactile Circular Light Indicator Selector */}
                      <td className="py-1 px-2.5 text-center border-r border-stone-900/80">
                        <button
                          onClick={() => toggleRowSelect(item.id)}
                          className="group flex items-center justify-center mx-auto cursor-pointer focus:outline-none"
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-150 ${
                              isSelected
                                ? 'bg-amber-400 border-amber-200 shadow-[0_0_10px_#fbbf24]'
                                : 'bg-stone-900 border-stone-700 shadow-inner group-hover:border-stone-500'
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSelected ? 'bg-stone-950 shadow-[0_0_3px_#fff]' : 'bg-stone-800'
                              }`}
                            />
                          </div>
                        </button>
                      </td>

                      {/* Row Data Cells: Compact Dot-Matrix LCD Cells without Heavy Borders */}
                      {activeColumns.map((col) => {
                        const cellValue = item[col.key];

                        return (
                          <td
                            key={col.key}
                            className={`px-2.5 align-middle border-r border-stone-900/60 ${
                              density === 'compact' ? 'py-1' : 'py-2'
                            }`}
                          >
                            {/* Dot Matrix Screen Micro-Box */}
                            <div
                              className={`relative px-2 py-0.5 rounded ${themeStyles.bg} ${
                                isSelected ? `${themeStyles.border} border ${themeStyles.glow}` : 'border-transparent'
                              } overflow-hidden ${density === 'compact' ? 'min-h-[26px]' : 'min-h-[34px]'} flex items-center ${
                                col.align === 'center'
                                  ? 'justify-center'
                                  : col.align === 'right'
                                  ? 'justify-end'
                                  : 'justify-start'
                              }`}
                            >
                              {/* Optional Scanlines Overlay */}
                              {showCellGrid && (
                                <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_bottom,transparent_1px,rgba(0,0,0,0.9)_1px)] [background-size:100%_3px] pointer-events-none z-10" />
                              )}

                              {/* Optional LED Grid Overlay */}
                              {showCellGrid && (
                                <div
                                  className="absolute inset-0 opacity-10 pointer-events-none z-10"
                                  style={{
                                    backgroundImage: `radial-gradient(${themeStyles.dots} 1.5px, transparent 1.5px)`,
                                    backgroundSize: '5px 5px',
                                  }}
                                />
                              )}

                              {/* Cell Content Renderer */}
                              <div className="relative z-0 font-mono text-[11px] tracking-wider font-bold truncate">
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
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => alert(`EDIT RECORD: ${item.id}`)}
                                      className="px-1.5 py-0.5 rounded bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 text-[9px] font-mono"
                                      title="Edit Record"
                                    >
                                      EDIT
                                    </button>
                                    <button
                                      onClick={() => handleDeleteRow(item.id)}
                                      className="px-1.5 py-0.5 rounded bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 text-[9px] font-mono"
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

        {/* 4. COCKPIT TELEMETRY STATUS & PAGINATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 mt-3 pt-3 border-t border-stone-800/80">
          {/* Status Telemetry LED Bar */}
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-0.5 rounded bg-stone-950 border border-stone-800 text-[10px] font-mono font-bold text-stone-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              STATUS: <span className="text-emerald-400 uppercase">ONLINE_1990</span>
            </div>
            {selectedIds.size > 0 && (
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                SELECTED: {selectedIds.size}
              </span>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-stone-400 mr-1">
              PAGE <span className={themeStyles.text}>{currentPage}</span> OF {totalPages}
            </span>

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="p-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              className="p-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. AVIONICS PERSONALISATION CONSOLE POPUP MODAL */}
      {showPersonalisationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-stone-900 border-2 border-stone-700 rounded-2xl p-5 max-w-lg w-full shadow-2xl relative overflow-hidden">
            {/* Specular Gloss Header Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500" />

            <button
              onClick={() => setShowPersonalisationModal(false)}
              className="absolute top-3 right-3 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-sm font-mono font-black text-amber-400 tracking-widest uppercase mb-1 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              AVIONICS PERSONALISATION CONSOLE
            </h3>
            <p className="text-[10px] font-mono text-stone-400 mb-4 uppercase">
              Configure cockpit display themes, column layout, cell density, and screen grid effects.
            </p>

            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
              {/* Section 1: Column Visibility Toggle */}
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <span className="text-[10px] font-mono font-bold text-stone-300 uppercase tracking-wider block mb-2 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-emerald-400" />
                  VISIBLE COLUMNS
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {columns.map((col) => {
                    const isVisible = visibleColumnKeys.has(col.key);
                    return (
                      <button
                        key={col.key}
                        onClick={() => toggleColumnVisibility(col.key)}
                        className={`p-1.5 rounded text-[10px] font-mono font-bold uppercase flex items-center justify-between border transition-all ${
                          isVisible
                            ? 'bg-stone-900 border-stone-600 text-amber-300'
                            : 'bg-stone-950 border-stone-800 text-stone-600'
                        }`}
                      >
                        <span>{col.label}</span>
                        {isVisible ? <Eye className="w-3 h-3 text-amber-400" /> : <EyeOff className="w-3 h-3 text-stone-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Table Layout Density */}
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <span className="text-[10px] font-mono font-bold text-stone-300 uppercase tracking-wider block mb-2">
                  LAYOUT DENSITY MODE
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDensity('compact')}
                    className={`flex-1 py-1.5 rounded text-[11px] font-mono font-bold uppercase border transition-all ${
                      density === 'compact'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                        : 'bg-stone-900 text-stone-400 border-stone-800'
                    }`}
                  >
                    COMPACT (RECOMMENDED)
                  </button>
                  <button
                    onClick={() => setDensity('normal')}
                    className={`flex-1 py-1.5 rounded text-[11px] font-mono font-bold uppercase border transition-all ${
                      density === 'normal'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                        : 'bg-stone-900 text-stone-400 border-stone-800'
                    }`}
                  >
                    SPACIOUS / NORMAL
                  </button>
                </div>
              </div>

              {/* Section 3: LCD Screen Glow Theme */}
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <span className="text-[10px] font-mono font-bold text-stone-300 uppercase tracking-wider block mb-2">
                  DOT-MATRIX LCD MONITOR COLOR
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['amber', 'green', 'cyan', 'red', 'vfd-blue'] as DisplayTheme[]).map((thm) => (
                    <button
                      key={thm}
                      onClick={() => setActiveTheme(thm)}
                      className={`p-2 rounded border text-left font-mono text-[10px] font-bold uppercase flex items-center justify-between transition-all ${
                        activeTheme === thm
                          ? 'bg-stone-900 border-amber-400 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
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
                        {thm}
                      </span>
                      {activeTheme === thm && <Check className="w-3 h-3 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 4: Chassis Metallic Finish & Grid Overlay */}
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-stone-300 uppercase tracking-wider block mb-1">
                    CHASSIS METALLIC FINISH
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {(['dark-steel', 'brushed-aluminum', 'cockpit-teal', 'military-green'] as ChassisFinish[]).map((fin) => (
                      <button
                        key={fin}
                        onClick={() => setChassisFinish(fin)}
                        className={`p-1.5 rounded border text-[10px] font-mono font-bold uppercase ${
                          chassisFinish === fin
                            ? 'bg-stone-900 border-amber-400 text-amber-300'
                            : 'bg-stone-900/40 border-stone-800 text-stone-400'
                        }`}
                      >
                        {fin.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                  <span className="text-[10px] font-mono font-bold text-stone-300 uppercase flex items-center gap-1">
                    <Grid className="w-3 h-3 text-amber-400" />
                    SHOW CRT CELL DOT-GRID PATTERN
                  </span>
                  <input
                    type="checkbox"
                    checked={showCellGrid}
                    onChange={(e) => setShowCellGrid(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPersonalisationModal(false)}
              className="w-full mt-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded font-mono text-xs font-black tracking-widest uppercase shadow-md cursor-pointer"
            >
              APPLY & CLOSE CONSOLE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
