"use client";

import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: {
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }[];
  activeFiltersCount?: number;
  onClearFilters?: () => void;
}

export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  activeFiltersCount = 0,
  onClearFilters
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      {/* Search */}
      <div className="relative flex-1 max-w-md w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        {searchValue && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-3 items-center flex-wrap">
        {filters.map((filter) => (
          <div key={filter.label} className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        
        {activeFiltersCount > 0 && onClearFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-600 dark:text-gray-400"
          >
            Clear Filters
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          </Button>
        )}
      </div>
    </div>
  );
}
