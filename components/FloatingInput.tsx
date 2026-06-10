'use client'
import React, { forwardRef } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export const FloatingInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = 'text', className = '', ...props }, ref) => {
    const alwaysFloat = type === 'date' || type === 'datetime-local' || type === 'number'
    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          {...props}
          placeholder=" "
          className={`peer w-full border rounded-xl px-4 pt-6 pb-2 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid text-brown transition-colors ${
            error ? 'border-red-400' : 'border-wood'
          } ${className}`}
        />
        <label
          className={`absolute left-4 transition-all duration-200 pointer-events-none font-semibold ${
            alwaysFloat
              ? 'top-2 text-xs text-green-dark'
              : 'top-2 text-xs text-green-dark peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-sm peer-placeholder-shown:text-brown/60 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:text-green-dark peer-focus:font-semibold'
          }`}
        >
          {label}
        </label>
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>
    )
  }
)
FloatingInput.displayName = 'FloatingInput'

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
}

export const FloatingTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          ref={ref}
          {...props}
          placeholder=" "
          className={`peer w-full border rounded-xl px-4 pt-6 pb-2 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid text-brown resize-none transition-colors ${
            error ? 'border-red-400' : 'border-wood'
          } ${className}`}
        />
        <label className="absolute left-4 transition-all duration-200 pointer-events-none font-semibold top-2 text-xs text-green-dark peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-sm peer-placeholder-shown:text-brown/60 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:text-green-dark peer-focus:font-semibold">
          {label}
        </label>
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>
    )
  }
)
FloatingTextarea.displayName = 'FloatingTextarea'

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
  children: React.ReactNode
}

export const FloatingSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          {...props}
          className={`w-full border rounded-xl px-4 pt-6 pb-2 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid text-brown appearance-none transition-colors ${
            error ? 'border-red-400' : 'border-wood'
          } ${className}`}
        >
          {children}
        </select>
        <label className="absolute left-4 top-2 text-xs text-green-dark font-semibold pointer-events-none">
          {label}
        </label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brown/50">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>
    )
  }
)
FloatingSelect.displayName = 'FloatingSelect'
