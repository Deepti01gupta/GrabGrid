import React from 'react';
import { componentClasses } from '../../styles/designSystem';

/**
 * Button Component
 * Professional, reusable button with multiple variants
 * Props: variant, size, disabled, onClick, children, icon
 */
export const Button = ({
  variant = 'primary',
  size = 'base',
  disabled = false,
  onClick,
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseClass = componentClasses.button.base;
  const variantClass = componentClasses.button[variant] || componentClasses.button.primary;
  const sizeClass = componentClasses.button[size] || '';
  
  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

/**
 * Card Component
 * Reusable card container with consistent styling
 * Props: children, hoverable, className
 */
export const Card = ({ children, hoverable = false, className = '', ...props }) => {
  const hoverClass = hoverable ? componentClasses.cardHover : '';
  return (
    <div className={`${componentClasses.card} ${hoverClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Input Component
 * Professional text input with consistent styling
 * Props: placeholder, value, onChange, error, label, required
 */
export const Input = ({
  label,
  required = false,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`${componentClasses.input} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

/**
 * Select Component
 * Professional select input
 */
export const Select = ({
  label,
  required = false,
  error,
  options = [],
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        className={`${componentClasses.input} ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

/**
 * TextArea Component
 * Professional textarea input
 */
export const TextArea = ({
  label,
  required = false,
  error,
  className = '',
  rows = 4,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={`${componentClasses.input} resize-none ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

/**
 * Badge Component
 * Status indicator badge
 * Props: variant, children
 */
export const Badge = ({ variant = 'primary', children, icon, className = '' }) => {
  const baseClass = componentClasses.badge.base;
  const variantClass = componentClasses.badge[variant] || componentClasses.badge.primary;
  
  return (
    <div className={`${baseClass} ${variantClass} ${className}`}>
      {icon && <span>{icon}</span>}
      {children}
    </div>
  );
};

/**
 * Alert Component
 * Informational alert box with new color scheme
 * Props: type, title, message, onClose
 */
export const Alert = ({ type = 'info', title, message, onClose, className = '' }) => {
  const typeClasses = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
    error: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`border rounded-lg p-4 flex items-start gap-3 ${typeClasses[type]} ${className}`}>
      <span className="text-lg font-bold flex-shrink-0">{icons[type]}</span>
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        {message && <p className="text-sm">{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-lg leading-none opacity-50 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  );
};

/**
 * Skeleton Loading Component
 * Placeholder while content loads
 */
export const Skeleton = ({ className = '', height = '1rem', count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse ${className}`}
          style={{ height }}
        />
      ))}
    </>
  );
};

/**
 * Empty State Component
 * Display when no content is available
 */
export const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className="py-12 text-center">
      <div className="text-6xl mb-4 opacity-50">{icon}</div>
      <h3 className={componentClasses.text.h3}>{title}</h3>
      <p className={`${componentClasses.text.muted} mt-2 mb-6`}>{description}</p>
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
};

/**
 * StatCard Component
 * Statistics display card
 */
export const StatCard = ({ icon, label, value, trend, color = 'blue' }) => {
 
  return (
    <Card className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 overflow-hidden">
      <div className="flex items-center justify-between p-6">
        <div>
          <p className={componentClasses.text.muted}>{label}</p>
          <p className={`${componentClasses.text.h2} mt-2`}>{value}</p>
          {trend && (
            <p className={`text-sm mt-2 font-medium ${trend.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {trend.positive ? '↑' : '↓'} {trend.value}% from last month
            </p>
          )}
        </div>
        <div className={`text-5xl opacity-30`}>{icon}</div>
      </div>
    </Card>
  );
};

/**
 * Modal Component
 * Overlay modal dialog
 */
export const Modal = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[9997] transition-opacity" onClick={onClose} />
      <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
        <Card className="w-full max-w-md rounded-xl">
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
            <h2 className={componentClasses.text.h3}>{title}</h2>
            <button
              onClick={onClose}
              className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 text-2xl leading-none transition-colors duration-200"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          <div className="p-6">{children}</div>
          {actions && (
            <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 flex gap-3 justify-end">
              {actions}
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

/**
 * Tooltip Component
 * Help text on hover
 */
export const Tooltip = ({ text, children }) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[9998] shadow-lg">
        {text}
      </div>
    </div>
  );
};

export const UIComponents = {
  Button,
  Card,
  Input,
  Select,
  TextArea,
  Badge,
  Alert,
  Skeleton,
  EmptyState,
  StatCard,
  Modal,
  Tooltip,
};