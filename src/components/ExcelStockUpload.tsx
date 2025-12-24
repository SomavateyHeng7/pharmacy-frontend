"use client"

import React, { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  X,
  Eye,
  Save,
  RefreshCw,
} from "lucide-react"

interface ExcelRow {
  drugName: string
  genericName?: string
  strength?: string
  form?: string
  manufacturer?: string
  barcode?: string
  currentStock: number
  minStockLevel?: number
  maxStockLevel?: number
  unitCost?: number
  sellingPrice?: number
  location?: string
  expiryDate?: string
  batchNumber?: string
  supplierId?: string
}

interface ValidationError {
  row: number
  field: string
  message: string
  value: any
}

interface ExcelUploadProps {
  onDataImport: (data: ExcelRow[]) => void
  onClose: () => void
}

const REQUIRED_COLUMNS = ["drugName", "currentStock"]

const SAMPLE_DATA: ExcelRow[] = [
  {
    drugName: "Paracetamol 500mg",
    genericName: "Acetaminophen",
    strength: "500mg",
    form: "Tablet",
    manufacturer: "PharmaCorp",
    barcode: "1234567890123",
    currentStock: 150,
    minStockLevel: 20,
    maxStockLevel: 500,
    unitCost: 0.25,
    sellingPrice: 0.5,
    location: "A1-B2",
    expiryDate: "2025-12-31",
    batchNumber: "PCT001",
    supplierId: "SUP001",
  },
  {
    drugName: "Amoxicillin 250mg",
    genericName: "Amoxicillin",
    strength: "250mg",
    form: "Capsule",
    manufacturer: "MediCore",
    barcode: "9876543210987",
    currentStock: 75,
    minStockLevel: 15,
    maxStockLevel: 300,
    unitCost: 1.5,
    sellingPrice: 3.0,
    location: "B2-C3",
    expiryDate: "2026-06-30",
    batchNumber: "AMX002",
    supplierId: "SUP002",
  },
]

export default function ExcelStockUpload({ onDataImport, onClose }: ExcelUploadProps) {
  const [uploadedData, setUploadedData] = useState<ExcelRow[]>([])
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [fileName, setFileName] = useState<string>("")
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString)
    return !isNaN(date.getTime()) && !!dateString.match(/^\d{4}-\d{2}-\d{2}$/)
  }

  const validateData = (data: ExcelRow[]): ValidationError[] => {
    const errors: ValidationError[] = []

    data.forEach((row, index) => {
      REQUIRED_COLUMNS.forEach((column) => {
        if (!row[column as keyof ExcelRow] && row[column as keyof ExcelRow] !== 0) {
          errors.push({
            row: index + 1,
            field: column,
            message: `${column} is required`,
            value: row[column as keyof ExcelRow],
          })
        }
      })

      if (row.currentStock !== undefined && (isNaN(row.currentStock) || row.currentStock < 0)) {
        errors.push({
          row: index + 1,
          field: "currentStock",
          message: "Current stock must be a non-negative number",
          value: row.currentStock,
        })
      }
      if (row.unitCost !== undefined && (isNaN(row.unitCost) || row.unitCost < 0)) {
        errors.push({
          row: index + 1,
          field: "unitCost",
          message: "Unit cost must be a non-negative number",
          value: row.unitCost,
        })
      }
      if (row.sellingPrice !== undefined && (isNaN(row.sellingPrice) || row.sellingPrice < 0)) {
        errors.push({
          row: index + 1,
          field: "sellingPrice",
          message: "Selling price must be a non-negative number",
          value: row.sellingPrice,
        })
      }
      if (row.expiryDate && !isValidDate(row.expiryDate)) {
        errors.push({
          row: index + 1,
          field: "expiryDate",
          message: "Invalid date format (expected: YYYY-MM-DD)",
          value: row.expiryDate,
        })
      }
    })

    return errors
  }

  const simulateParse = async () => {
    // Simulate network/parse delay; replace with real xlsx parsing later
    await new Promise((r) => setTimeout(r, 1200))
    const mock: ExcelRow[] = [
      {
        drugName: "Aspirin 100mg",
        genericName: "Acetylsalicylic Acid",
        strength: "100mg",
        form: "Tablet",
        manufacturer: "HealthCorp",
        currentStock: 200,
        minStockLevel: 30,
        maxStockLevel: 600,
        unitCost: 0.15,
        sellingPrice: 0.3,
        location: "C1-D2",
      },
      {
        drugName: "Vitamin D3",
        genericName: "Cholecalciferol",
        strength: "1000 IU",
        form: "Capsule",
        manufacturer: "VitaHealth",
        currentStock: 120,
        minStockLevel: 25,
        maxStockLevel: 400,
        unitCost: 0.45,
        sellingPrice: 0.9,
        location: "D3-E4",
      },
    ]
    return mock
  }

  const processFile = async (file: File) => {
    setIsProcessing(true)
    setUploadStatus("idle")
    setFileName(file.name)
    try {
      // TODO: swap simulateParse() with real XLSX parsing
      const parsed = await simulateParse()
      setUploadedData(parsed)
      const errors = validateData(parsed)
      setValidationErrors(errors)
      setUploadStatus(errors.length === 0 ? "success" : "error")
      setShowPreview(true)
    } catch (e) {
      console.error(e)
      setUploadStatus("error")
      setShowPreview(false)
      setUploadedData([])
      setValidationErrors([])
    } finally {
      setIsProcessing(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    await processFile(file)
  }

  const onDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files?.[0]
      if (!file) return
      await processFile(file)
    },
    [] // eslint-disable-line
  )

  const downloadTemplate = () => {
    const headers = [
      "drugName",
      "genericName",
      "strength",
      "form",
      "manufacturer",
      "barcode",
      "currentStock",
      "minStockLevel",
      "maxStockLevel",
      "unitCost",
      "sellingPrice",
      "location",
      "expiryDate",
      "batchNumber",
      "supplierId",
    ]

    const csvContent = [
      headers.join(","),
      ...SAMPLE_DATA.map((row) =>
        headers
          .map((h) => {
            const val = row[h as keyof ExcelRow]
            return typeof val === "string" && val.includes(",") ? `"${val}"` : val
          })
          .join(",")
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "stock_upload_template.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    if (validationErrors.length === 0) {
      onDataImport(uploadedData)
      onClose()
    }
  }

  const resetUpload = () => {
    setUploadedData([])
    setValidationErrors([])
    setShowPreview(false)
    setUploadStatus("idle")
    setFileName("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <Card className="overflow-hidden">
        {/* Header */}
        <CardHeader className="border-b bg-muted/40">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-6 w-6 text-primary" />
              <span>Excel Stock Upload</span>
              {uploadStatus !== "idle" && (
                <Badge
                  variant={uploadStatus === "success" ? "default" : "destructive"}
                  className="ml-2"
                >
                  {uploadStatus === "success" ? "Ready to import" : "Needs attention"}
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={downloadTemplate}>
                <Download className="mr-2 h-4 w-4" />
                Template
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Tips */}
          <div className="grid gap-3 rounded-lg border bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100">
            <p className="font-medium">Upload Tips</p>
            <ul className="list-inside list-disc space-y-1">
              <li>Required columns: <b>drugName</b>, <b>currentStock</b></li>
              <li>Formats: .xlsx, .xls, .csv — date format: <b>YYYY-MM-DD</b></li>
              <li>Numeric fields must be non-negative numbers</li>
            </ul>
          </div>

          {/* Uploader */}
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            aria-label="File drop zone"
            className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/30 hover:bg-muted/40"
            }`}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-lg font-medium">
                {fileName ? "Selected file:" : "Drag & drop your file here"}
              </p>
              <p className="text-sm text-muted-foreground">
                {fileName || "…or click the button to choose a file"}
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isProcessing}
              />
              <Button onClick={() => fileInputRef.current?.click()} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
                    Processing…
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Choose File
                  </>
                )}
              </Button>
              {fileName && (
                <Button variant="ghost" className="ml-2" onClick={resetUpload}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>

            {/* Inline status */}
            {uploadStatus !== "idle" && (
              <div
                className={`mt-6 inline-flex items-center rounded-md px-3 py-2 text-sm ${
                  uploadStatus === "success"
                    ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200"
                    : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200"
                }`}
              >
                {uploadStatus === "success" ? (
                  <CheckCircle className="mr-2 h-4 w-4" />
                ) : (
                  <AlertCircle className="mr-2 h-4 w-4" />
                )}
                {uploadStatus === "success"
                  ? `Parsed ${uploadedData.length} record(s).`
                  : `${validationErrors.length} validation error(s) found.`}
              </div>
            )}
          </div>

          {/* Errors */}
          {validationErrors.length > 0 && (
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader className="py-3">
                <CardTitle className="flex items-center text-sm font-semibold text-red-700 dark:text-red-200">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Validation Errors ({validationErrors.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-48 space-y-2 overflow-auto pt-0">
                {validationErrors.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-md bg-red-50 p-2 text-sm dark:bg-red-950"
                  >
                    <div>
                      <span className="font-medium">Row {e.row}:</span> {e.message}
                    </div>
                    <Badge variant="outline" className="text-red-600">
                      {e.field}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Preview */}
          {showPreview && uploadedData.length > 0 && (
            <Card className="overflow-hidden">
              <CardHeader className="flex items-center justify-between gap-2 border-b py-3">
                <CardTitle className="flex items-center text-base">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview ({uploadedData.length} records)
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={resetUpload}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleImport}
                    disabled={validationErrors.length > 0}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Import {uploadedData.length}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-80 overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 z-10 bg-muted">
                      <tr className="text-left">
                        <th className="px-3 py-2">Drug Name</th>
                        <th className="px-3 py-2">Generic</th>
                        <th className="px-3 py-2">Stock</th>
                        <th className="px-3 py-2">Min</th>
                        <th className="px-3 py-2">Unit Cost</th>
                        <th className="px-3 py-2">Price</th>
                        <th className="px-3 py-2">Location</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:nth-child(even)]:bg-muted/30">
                      {uploadedData.slice(0, 200).map((row, i) => (
                        <tr key={`${row.drugName}-${i}`} className="border-b last:border-0">
                          <td className="px-3 py-2 font-medium">{row.drugName}</td>
                          <td className="px-3 py-2">{row.genericName || "-"}</td>
                          <td className="px-3 py-2">{row.currentStock}</td>
                          <td className="px-3 py-2">{row.minStockLevel ?? "-"}</td>
                          <td className="px-3 py-2">
                            {row.unitCost !== undefined ? `$${row.unitCost.toFixed(2)}` : "-"}
                          </td>
                          <td className="px-3 py-2">
                            {row.sellingPrice !== undefined ? `$${row.sellingPrice.toFixed(2)}` : "-"}
                          </td>
                          <td className="px-3 py-2">{row.location || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {uploadedData.length > 200 && (
                  <div className="border-t bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                    Showing first 200 rows… ({uploadedData.length - 200} more)
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Footer actions (when no preview yet) */}
          {!showPreview && (
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={resetUpload}>
                Reset
              </Button>
              <Button disabled className="cursor-not-allowed opacity-70">
                <Save className="mr-2 h-4 w-4" />
                Import
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
