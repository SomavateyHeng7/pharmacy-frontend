"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    pageSize: number;
  };
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  pagination,
  emptyMessage = "No data available",
  onRowClick,
  isLoading = false
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="p-8">
        <p className="text-center text-muted-foreground">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider ${column.className || ''}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={`${
                    onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''
                  } transition-colors`}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className={`px-4 py-3 text-sm ${column.className || ''}`}>
                      {typeof column.accessor === 'function'
                        ? column.accessor(row)
                        : String(row[column.accessor] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
