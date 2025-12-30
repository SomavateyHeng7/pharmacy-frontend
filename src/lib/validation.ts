/**
 * Input validation utilities
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class Validator {
  private errors: string[] = [];

  required(value: any, fieldName: string): this {
    if (!value || (typeof value === 'string' && !value.trim())) {
      this.errors.push(`${fieldName} is required`);
    }
    return this;
  }

  email(value: string, fieldName: string = 'Email'): this {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      this.errors.push(`${fieldName} must be a valid email address`);
    }
    return this;
  }

  phone(value: string, fieldName: string = 'Phone'): this {
    const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
    if (value && !phoneRegex.test(value)) {
      this.errors.push(`${fieldName} must be a valid phone number`);
    }
    return this;
  }

  minLength(value: string, min: number, fieldName: string): this {
    if (value && value.length < min) {
      this.errors.push(`${fieldName} must be at least ${min} characters`);
    }
    return this;
  }

  maxLength(value: string, max: number, fieldName: string): this {
    if (value && value.length > max) {
      this.errors.push(`${fieldName} must be no more than ${max} characters`);
    }
    return this;
  }

  min(value: number, min: number, fieldName: string): this {
    if (value != null && value < min) {
      this.errors.push(`${fieldName} must be at least ${min}`);
    }
    return this;
  }

  max(value: number, max: number, fieldName: string): this {
    if (value != null && value > max) {
      this.errors.push(`${fieldName} must be no more than ${max}`);
    }
    return this;
  }

  pattern(value: string, pattern: RegExp, message: string): this {
    if (value && !pattern.test(value)) {
      this.errors.push(message);
    }
    return this;
  }

  custom(condition: boolean, message: string): this {
    if (!condition) {
      this.errors.push(message);
    }
    return this;
  }

  getResult(): ValidationResult {
    const result = {
      isValid: this.errors.length === 0,
      errors: [...this.errors],
    };
    this.errors = [];
    return result;
  }
}

// Predefined validators
export const validateCustomer = (data: any): ValidationResult => {
  const validator = new Validator();
  
  validator
    .required(data.name, 'Customer name')
    .required(data.phone, 'Phone number')
    .phone(data.phone, 'Phone number');
  
  if (data.email) {
    validator.email(data.email, 'Email');
  }
  
  return validator.getResult();
};

export const validateDrug = (data: any): ValidationResult => {
  const validator = new Validator();
  
  validator
    .required(data.name, 'Drug name')
    .required(data.genericName, 'Generic name')
    .required(data.strength, 'Strength')
    .required(data.form, 'Form')
    .required(data.category, 'Category')
    .min(data.currentStock, 0, 'Current stock')
    .min(data.minStockLevel, 0, 'Minimum stock level')
    .min(data.unitPrice, 0, 'Unit price')
    .min(data.sellingPrice, 0, 'Selling price');
  
  return validator.getResult();
};

export const validateInvoice = (data: any): ValidationResult => {
  const validator = new Validator();
  
  validator
    .required(data.customerId, 'Customer')
    .required(data.pharmacistName, 'Pharmacist name')
    .custom(
      data.lineItems && data.lineItems.length > 0,
      'At least one line item is required'
    );
  
  return validator.getResult();
};

export const validateSupplier = (data: any): ValidationResult => {
  const validator = new Validator();
  
  validator
    .required(data.companyName, 'Company name')
    .required(data.contactPerson, 'Contact person')
    .required(data.phone, 'Phone number')
    .required(data.email, 'Email')
    .phone(data.phone, 'Phone number')
    .email(data.email, 'Email');
  
  return validator.getResult();
};
