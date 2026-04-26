'use client'
// app/artisan/factures-electroniques/components/FloatingInput.tsx

import {
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  forwardRef,
} from 'react'
import { motion } from 'framer-motion'

interface FloatingInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label: string
  error?: string
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, className = '', type = 'text', ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const hasValue = props.value !== undefined && props.value !== ''
    const isFloating = focused || hasValue

    return (
      <div className={`relative w-full ${className}`}>
        <motion.label
          animate={{
            y: isFloating ? -10 : 13,
            scale: isFloating ? 0.78 : 1,
            color: focused ? '#C9650F' : error ? '#EF4444' : '#8C7D6E',
          }}
          transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
          className="absolute left-4 origin-left pointer-events-none z-10"
          style={{ fontSize: 14, fontWeight: 500, letterSpacing: '0.01em', top: 0 }}
        >
          {label}
        </motion.label>

        <input
          ref={ref}
          type={type}
          className="w-full rounded-xl border bg-white text-[15px] transition-all duration-200 outline-none"
          style={{
            padding: '22px 16px 10px',
            borderColor: error ? '#EF4444' : focused ? '#E87E1A' : '#E6DFD6',
            boxShadow: error
              ? '0 0 0 3px rgba(239,68,68,0.15)'
              : focused
              ? '0 0 0 3px rgba(232,126,26,0.15)'
              : 'none',
            color: '#332B25',
          }}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e)  => { setFocused(false); props.onBlur?.(e) }}
          {...props}
        />

        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="block mt-1 ml-1"
            style={{ fontSize: 12, color: '#EF4444', fontWeight: 500 }}
          >
            {error}
          </motion.span>
        )}
      </div>
    )
  }
)
FloatingInput.displayName = 'FloatingInput'

interface FloatingTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'placeholder'> {
  label: string
  error?: string
  rows?: number
}

export const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, error, className = '', rows = 2, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const hasValue = props.value !== undefined && props.value !== ''
    const isFloating = focused || hasValue

    return (
      <div className={`relative w-full ${className}`}>
        <motion.label
          animate={{
            y: isFloating ? -10 : 13,
            scale: isFloating ? 0.78 : 1,
            color: focused ? '#C9650F' : error ? '#EF4444' : '#8C7D6E',
          }}
          transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
          className="absolute left-4 origin-left pointer-events-none z-10"
          style={{ fontSize: 14, fontWeight: 500, letterSpacing: '0.01em', top: 0 }}
        >
          {label}
        </motion.label>

        <textarea
          ref={ref}
          rows={rows}
          className="w-full rounded-xl border bg-white text-[15px] transition-all duration-200 outline-none resize-none"
          style={{
            padding: '24px 16px 10px',
            borderColor: error ? '#EF4444' : focused ? '#E87E1A' : '#E6DFD6',
            boxShadow: error
              ? '0 0 0 3px rgba(239,68,68,0.15)'
              : focused
              ? '0 0 0 3px rgba(232,126,26,0.15)'
              : 'none',
            color: '#332B25',
            minHeight: 72,
          }}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e)  => { setFocused(false); props.onBlur?.(e) }}
          {...props}
        />

        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="block mt-1 ml-1"
            style={{ fontSize: 12, color: '#EF4444', fontWeight: 500 }}
          >
            {error}
          </motion.span>
        )}
      </div>
    )
  }
)
FloatingTextarea.displayName = 'FloatingTextarea'