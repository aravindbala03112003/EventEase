'use client';

import React, { InputHTMLAttributes } from 'react';

interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function FormField({
  label,
  error,
  helperText,
  required,
  className = '',
  children,
}: FormFieldProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className='label'>
          {label}
          {required && <span className='text-red-600 ml-1'>*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className='mt-1 text-sm text-red-600 font-medium'>{error}</p>
      )}
      {helperText && !error && (
        <p className='mt-1 text-sm text-slate-500'>{helperText}</p>
      )}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, required, className = '', ...props },
    ref
  ) => (
    <FormField label={label} error={error} helperText={helperText} required={required}>
      <input
        ref={ref}
        className={`input ${error ? 'border-red-500 ring-red-500' : ''} ${className}`}
        {...props}
      />
    </FormField>
  )
);
Input.displayName = 'Input';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { label, error, helperText, required, className = '', ...props },
    ref
  ) => (
    <FormField label={label} error={error} helperText={helperText} required={required}>
      <textarea
        ref={ref}
        className={`input ${error ? 'border-red-500 ring-red-500' : ''} resize-vertical min-h-[120px] ${className}`}
        {...props}
      />
    </FormField>
  )
);
TextArea.displayName = 'TextArea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      className = '',
      options = [],
      ...props
    },
    ref
  ) => (
    <FormField label={label} error={error} helperText={helperText} required={required}>
      <select
        ref={ref}
        className={`select input ${error ? 'border-red-500 ring-red-500' : ''} ${className}`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormField>
  )
);
Select.displayName = 'Select';
