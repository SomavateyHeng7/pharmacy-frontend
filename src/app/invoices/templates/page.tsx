'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  FileTextIcon,
  PlusIcon,
  SearchIcon,
  ArrowLeftIcon,
  LayoutTemplateIcon,
  PillIcon,
  ClockIcon,
  DollarSignIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Invoice templates data
const invoiceTemplates = [
  {
    id: 'template-001',
    name: 'Standard OTC Sale',
    category: 'OTC',
    description: 'Template for over-the-counter medication sales',
    defaultItems: ['Paracetamol 500mg', 'Vitamin C'],
    dispensingFee: 0,
    taxRate: 7,
    usageCount: 245
  },
  {
    id: 'template-002',
    name: 'Prescription Template',
    category: 'Prescription',
    description: 'Standard prescription medication invoice',
    defaultItems: ['Prescription Medication'],
    dispensingFee: 5.00,
    taxRate: 0,
    usageCount: 189
  },
  {
    id: 'template-003',
    name: 'Diabetes Care Package',
    category: 'Package',
    description: 'Bundled diabetes management supplies',
    defaultItems: ['Insulin', 'Test Strips', 'Lancets'],
    dispensingFee: 3.00,
    taxRate: 7,
    usageCount: 87
  },
  {
    id: 'template-004',
    name: 'Cold & Flu Package',
    category: 'Package',
    description: 'Common cold and flu medications bundle',
    defaultItems: ['Paracetamol', 'Cough Syrup', 'Vitamin C'],
    dispensingFee: 0,
    taxRate: 7,
    usageCount: 156
  },
  {
    id: 'template-005',
    name: 'Medical Supplies',
    category: 'Supply',
    description: 'Standard medical supplies invoice',
    defaultItems: ['Bandages', 'Gloves', 'Antiseptic'],
    dispensingFee: 2.00,
    taxRate: 7,
    usageCount: 98
  },
];

export default function InvoiceTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'OTC', 'Prescription', 'Package', 'Supply'];

  const filteredTemplates = invoiceTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'OTC':
        return 'bg-blue-100 text-blue-800';
      case 'Prescription':
        return 'bg-purple-100 text-purple-800';
      case 'Package':
        return 'bg-green-100 text-green-800';
      case 'Supply':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link href="/invoices">
              <Button variant="ghost" size="icon">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Invoice Templates
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Pre-configured invoice templates for faster billing
              </p>
            </div>
          </div>
          <Link href="/invoices/new">
            <Button className="gap-2">
              <PlusIcon className="h-4 w-4" />
              Create Custom Template
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <LayoutTemplateIcon className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Templates</p>
                  <p className="text-2xl font-bold">{invoiceTemplates.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <PillIcon className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Most Used</p>
                  <p className="text-lg font-semibold">Standard OTC</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <ClockIcon className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Time Saved</p>
                  <p className="text-2xl font-bold">~40%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSignIcon className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Usage</p>
                  <p className="text-2xl font-bold">775</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <FileTextIcon className="h-8 w-8 text-blue-600" />
                <Badge className={getCategoryColor(template.category)}>
                  {template.category}
                </Badge>
              </div>
              <CardTitle className="text-lg mt-3">{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {template.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Default Items:</span>
                  <span className="font-medium">{template.defaultItems.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Dispensing Fee:</span>
                  <span className="font-medium">${template.dispensingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax Rate:</span>
                  <span className="font-medium">{template.taxRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Usage Count:</span>
                  <span className="font-medium">{template.usageCount}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/invoices/new?template=${template.id}`} className="flex-1">
                  <Button className="w-full" size="sm">
                    Use Template
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card className="mt-8">
          <CardContent className="p-12 text-center">
            <FileTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search or filters
            </p>
            <Button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
