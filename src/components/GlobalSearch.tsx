"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Users, FileText, ShoppingCart, Building2, X, Clock } from "lucide-react";

interface SearchResult {
  id: string;
  type: 'drug' | 'customer' | 'prescription' | 'invoice' | 'supplier';
  title: string;
  subtitle: string;
  url: string;
  meta?: string;
}

// Mock search data
const searchData: SearchResult[] = [
  // Drugs
  { id: 'd1', type: 'drug', title: 'Amoxicillin 500mg', subtitle: 'Antibiotic | Stock: 450 units', url: '/inventory', meta: 'Batch: AMX-2024-001' },
  { id: 'd2', type: 'drug', title: 'Ibuprofen 400mg', subtitle: 'Pain Relief | Stock: 1200 units', url: '/inventory', meta: 'Batch: IBU-2024-089' },
  { id: 'd3', type: 'drug', title: 'Paracetamol 500mg', subtitle: 'Analgesic | Stock: 850 units', url: '/inventory', meta: 'Batch: PAR-2024-123' },
  { id: 'd4', type: 'drug', title: 'Metformin 1000mg', subtitle: 'Diabetes | Stock: 320 units', url: '/inventory', meta: 'Batch: MET-2024-234' },
  
  // Customers
  { id: 'c1', type: 'customer', title: 'John Smith', subtitle: 'Regular Customer | ID: C001', url: '/customer', meta: 'john.smith@email.com' },
  { id: 'c2', type: 'customer', title: 'Maria Garcia', subtitle: 'VIP Customer | ID: C002', url: '/customer', meta: 'maria.garcia@email.com' },
  { id: 'c3', type: 'customer', title: 'David Wilson', subtitle: 'New Customer | ID: C003', url: '/customer', meta: 'david.wilson@email.com' },
  
  // Prescriptions
  { id: 'p1', type: 'prescription', title: 'RX001', subtitle: 'John Smith | Dr. Anderson', url: '/prescription', meta: 'Verified - 2024-11-14' },
  { id: 'p2', type: 'prescription', title: 'RX002', subtitle: 'Maria Garcia | Dr. Chen', url: '/prescription', meta: 'Pending - 2024-11-13' },
  { id: 'p3', type: 'prescription', title: 'RX003', subtitle: 'David Wilson | Dr. Anderson', url: '/prescription', meta: 'Completed - 2024-11-12' },
  
  // Invoices
  { id: 'i1', type: 'invoice', title: 'INV-2024-001', subtitle: 'John Smith | $125.50', url: '/invoices', meta: 'Paid - Nov 14, 2024' },
  { id: 'i2', type: 'invoice', title: 'INV-2024-002', subtitle: 'Maria Garcia | $89.99', url: '/invoices', meta: 'Pending - Nov 13, 2024' },
  { id: 'i3', type: 'invoice', title: 'INV-2024-003', subtitle: 'David Wilson | $210.00', url: '/invoices', meta: 'Paid - Nov 12, 2024' },
  
  // Suppliers
  { id: 's1', type: 'supplier', title: 'PharmaCorp Ltd', subtitle: 'Premium Supplier | 45 Products', url: '/supplier', meta: 'Active since 2020' },
  { id: 's2', type: 'supplier', title: 'MediSupply Inc', subtitle: 'Standard Supplier | 32 Products', url: '/supplier', meta: 'Active since 2021' },
  { id: 's3', type: 'supplier', title: 'Global Pharma', subtitle: 'International Supplier | 78 Products', url: '/supplier', meta: 'Active since 2019' },
];

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        // Focus input after a brief delay
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        setQuery('');
        setResults([]);
        setSelectedIndex(0);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search functionality
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const filtered = searchData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.meta?.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  // Arrow key navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (results.length > 0 ? Math.min(prev + 1, results.length - 1) : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results.length > 0 && results[selectedIndex]) {
      e.preventDefault();
      handleSelectResult(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [results, selectedIndex]);

  const handleSelectResult = (result: SearchResult) => {
    // Save to recent searches
    const updated = [result.title, ...recentSearches.filter(s => s !== result.title)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));

    // Navigate
    router.push(result.url);
    
    // Close modal and reset state
    setIsOpen(false);
    setQuery('');
    setResults([]);
    setSelectedIndex(0);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'drug': return <Package className="h-4 w-4 text-blue-500" />;
      case 'customer': return <Users className="h-4 w-4 text-green-500" />;
      case 'prescription': return <FileText className="h-4 w-4 text-purple-500" />;
      case 'invoice': return <ShoppingCart className="h-4 w-4 text-orange-500" />;
      case 'supplier': return <Building2 className="h-4 w-4 text-indigo-500" />;
    }
  };

  const getTypeBadge = (type: SearchResult['type']) => {
    const colors = {
      drug: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      customer: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      prescription: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      invoice: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
      supplier: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
    };

    return (
      <Badge variant="secondary" className={`text-xs ${colors[type]}`}>
        {type}
      </Badge>
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          // Focus input after opening
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors bg-white dark:bg-gray-800 text-sm text-muted-foreground w-full"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="ml-auto px-2 py-0.5 text-xs border rounded bg-gray-100 dark:bg-gray-700">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => {
          setIsOpen(false);
          setQuery('');
          setResults([]);
          setSelectedIndex(0);
        }}
      />

      {/* Search Modal */}
      <div className="fixed top-[10%] left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search drugs, customers, prescriptions, invoices, suppliers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
            />
            <button
              onClick={() => {
                setIsOpen(false);
                setQuery('');
                setResults([]);
                setSelectedIndex(0);
              }}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {results.length > 0 ? (
              <div className="p-2">
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelectResult(result)}
                    className={`w-full flex items-start gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                      index === selectedIndex
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="mt-1">{getIcon(result.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">{result.title}</p>
                        {getTypeBadge(result.type)}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {result.subtitle}
                      </p>
                      {result.meta && (
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {result.meta}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : query.trim() !== '' ? (
              <div className="p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-lg font-medium">No results found</p>
                <p className="text-sm text-muted-foreground">
                  Try searching for drugs, customers, prescriptions, or suppliers
                </p>
              </div>
            ) : recentSearches.length > 0 ? (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Recent Searches
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(search)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left transition-colors"
                    >
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-lg font-medium">Start searching</p>
                <p className="text-sm text-muted-foreground">
                  Find drugs, customers, prescriptions, invoices, and suppliers
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center gap-4 text-xs text-muted-foreground bg-gray-50 dark:bg-gray-900/50">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border rounded bg-white dark:bg-gray-800">↑</kbd>
              <kbd className="px-1.5 py-0.5 border rounded bg-white dark:bg-gray-800">↓</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border rounded bg-white dark:bg-gray-800">↵</kbd>
              <span>Select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border rounded bg-white dark:bg-gray-800">esc</kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
