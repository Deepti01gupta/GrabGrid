/**
 * GrabGrid Design System v2 - Premium Theme System
 * Cohesive Light & Dark Themes with Professional Color Palettes
 * 
 * Light Theme: Soft, clean, warm backgrounds (#FCF9EA) with professional blues (#6482AD)
 * Dark Theme: Premium dark (#040D12) with sophisticated greens (#5C8374) and teals
 */

// ============================================
// THEME DEFINITIONS
// ============================================

/**
 * LIGHT THEME - Soft, modern, clean UI
 */
export const lightTheme = {
  // Primary Palette
  primary: '#6482AD',      // Professional blue-grey
  secondary: '#7FA1C3',    // Softer, lighter blue
  accent: '#BADFDB',       // Soft teal accent
  
  // Backgrounds
  background: '#FCF9EA',   // Main background - warm cream
  surface: '#F5EDED',      // Secondary background - soft beige
  card: '#E2DAD6',         // Card background - warm grey
  
  // Interactive Elements
  highlight: '#FFA4A4',    // Warm coral/pink for highlights
  highlightAlt: '#FFBDBD', // Lighter coral/pink
  
  // Semantic Colors
  success: '#5C8374',      // Green for success/positive
  error: '#D47A7A',        // Muted red for errors
  warning: '#D4B85C',      // Muted gold for warnings
  info: '#6482AD',         // Blue for info (same as primary)
  
  // Text Colors
  text: {
    primary: '#2C3333',    // Dark grey - main text
    secondary: '#5C6366',  // Medium grey - secondary text
    muted: '#8B8B8B',      // Light grey - muted/hint text
    invert: '#E7F6F2',     // Light text for dark backgrounds
  },
  
  // Borders & Dividers
  border: '#D9D1CC',       // Subtle borders
  divider: '#E2DAD6',      // Divider lines
};

/**
 * DARK THEME - Premium, sophisticated dark UI
 */
export const darkTheme = {
  // Primary Palette
  primary: '#5C8374',      // Premium green
  secondary: '#93B1A6',    // Softer, lighter green
  accent: '#A5C9CA',       // Soft teal accent
  
  // Backgrounds
  background: '#040D12',   // Main background - near black
  surface: '#2C3333',      // Secondary background - dark grey
  card: '#183D3D',         // Card background - dark teal
  
  // Interactive Elements
  highlight: '#A5C9CA',    // Teal highlight
  highlightAlt: '#7FA1C3', // Blue-teal alternative
  
  // Semantic Colors
  success: '#5C8374',      // Green (same as primary)
  error: '#E07A7A',        // Lighter red for dark backgrounds
  warning: '#E8D876',      // Lighter gold for dark backgrounds
  info: '#93B1A6',         // Secondary green for info
  
  // Text Colors
  text: {
    primary: '#E7F6F2',    // Light text - primary
    secondary: '#B8D4CE',  // Medium light - secondary text
    muted: '#395B64',      // Muted text
    invert: '#FCF9EA',     // Dark text on light backgrounds (rare)
  },
  
  // Borders & Dividers
  border: '#3D5A5A',       // Subtle borders in dark mode
  divider: '#2C4447',      // Divider lines
};

// ============================================
// COMPLETE COLOR PALETTE
// ============================================

export const colors = {
  // Primary - Professional Blue-Grey (Light) / Premium Green (Dark)
  primary: {
    light: '#6482AD',      // Light theme primary
    lightSecondary: '#7FA1C3', // Lighter shade
    dark: '#5C8374',       // Dark theme primary
    darkSecondary: '#93B1A6', // Lighter shade in dark mode
  },
  
  // Backgrounds
  background: {
    light: '#FCF9EA',      // Light theme main
    lightSecondary: '#F5EDED', // Light theme secondary
    lightCard: '#E2DAD6',  // Light theme card
    dark: '#040D12',       // Dark theme main
    darkSecondary: '#2C3333', // Dark theme secondary
    darkCard: '#183D3D',   // Dark theme card
  },
  
  // Text - Semantic & Accessible
  text: {
    light: {
      primary: '#2C3333',  // Dark grey on light backgrounds
      secondary: '#5C6366', // Medium grey
      muted: '#8B8B8B',    // Light grey for hints
      onDark: '#E7F6F2',   // Light text on dark backgrounds
    },
    dark: {
      primary: '#E7F6F2',  // Light text
      secondary: '#B8D4CE', // Medium light text
      muted: '#395B64',    // Muted text
      onLight: '#2C3333',  // Dark text on light (rare)
    },
  },
  
  // Accents
  accent: {
    light: '#BADFDB',      // Soft teal (light theme)
    dark: '#A5C9CA',       // Soft teal (dark theme)
  },
  
  // Highlights
  highlight: {
    light: '#FFA4A4',      // Warm coral (light theme)
    lightAlt: '#FFBDBD',   // Lighter coral
    dark: '#A5C9CA',       // Teal (dark theme)
    darkAlt: '#7FA1C3',    // Blue-teal alternative
  },
  
  // Semantic - Status Colors
  success: {
    light: '#5C8374',      // Green - light theme
    dark: '#5C8374',       // Green - dark theme (same)
  },
  error: {
    light: '#D47A7A',      // Muted red - light theme
    dark: '#E07A7A',       // Lighter red - dark theme
  },
  warning: {
    light: '#D4B85C',      // Muted gold - light theme
    dark: '#E8D876',       // Lighter gold - dark theme
  },
  
  // Borders
  border: {
    light: '#D9D1CC',      // Subtle - light theme
    dark: '#3D5A5A',       // Subtle - dark theme
  },
};

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  },
  
  heading: {
    h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' },
    h2: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.01em' },
    h3: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.5 },
  },
  
  body: {
    lg: { fontSize: '1.125rem', lineHeight: 1.6 },
    base: { fontSize: '1rem', lineHeight: 1.5 },
    sm: { fontSize: '0.875rem', lineHeight: 1.5 },
    xs: { fontSize: '0.75rem', lineHeight: 1.4 },
  },
};

// ============================================
// SPACING
// ============================================

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
};

// ============================================
// SHADOWS - Premium & Subtle
// ============================================

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  hover: '0 8px 12px -2px rgba(0, 0, 0, 0.12)',
  focus: '0 0 0 3px rgba(100, 130, 173, 0.1), 0 0 0 1px rgba(100, 130, 173, 0.5)',
};

// ============================================
// BORDER RADIUS - Rounded Corners
// ============================================

export const borderRadius = {
  none: '0',
  sm: '0.375rem',    // 6px
  base: '0.5rem',    // 8px
  md: '0.75rem',     // 12px
  lg: '1rem',        // 16px
  xl: '1.5rem',      // 24px
  full: '9999px',
};

// ============================================
// TRANSITIONS - Smooth Animations
// ============================================

export const transitions = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
  slower: '400ms ease-in-out',
};

// ============================================
// COMPONENT CLASSES - Reusable Tailwind Classes
// ============================================

/**
 * Semantic component classes using the new color system
 * These are designed to be theme-aware and switch between light/dark
 */
export const componentClasses = {
  // Container
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Buttons with new color palette
  button: {
    base: 'inline-flex items-center justify-center px-4 py-2.5 rounded-lg font-medium transition-all duration-200 cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed',
    
    // Primary - Uses light theme blue or dark theme green
    primary: 'bg-[#6482AD] hover:bg-[#5a74a0] text-white dark:bg-[#5C8374] dark:hover:bg-[#516f67] focus:ring-[#6482AD] dark:focus:ring-[#5C8374] shadow-md hover:shadow-lg',
    
    // Secondary - Lighter shades
    secondary: 'bg-[#7FA1C3] hover:bg-[#7694b3] text-white dark:bg-[#93B1A6] dark:hover:bg-[#82a396] focus:ring-[#7FA1C3] dark:focus:ring-[#93B1A6] shadow-md hover:shadow-lg',
    
    // Accent - Highlights
    accent: 'bg-[#FFA4A4] hover:bg-[#ff9494] text-[#2C3333] dark:bg-[#A5C9CA] dark:hover:bg-[#95b8b9] focus:ring-[#FFA4A4] dark:focus:ring-[#A5C9CA] shadow-md hover:shadow-lg',
    
    // Success - Green
    success: 'bg-[#5C8374] hover:bg-[#516f67] text-white dark:bg-[#5C8374] dark:hover:bg-[#516f67] focus:ring-[#5C8374] shadow-md hover:shadow-lg',
    
    // Outline - Bordered
    outline: 'border-2 border-[#6482AD] text-[#6482AD] hover:bg-[#FCF9EA] dark:border-[#A5C9CA] dark:text-[#A5C9CA] dark:hover:bg-[#183D3D] focus:ring-[#6482AD] dark:focus:ring-[#A5C9CA]',
    
    // Ghost - Minimal
    ghost: 'text-[#6482AD] hover:bg-[#F5EDED] dark:text-[#A5C9CA] dark:hover:bg-[#2C3333] focus:ring-[#6482AD] dark:focus:ring-[#A5C9CA]',
    
    // Sizes
    sm: 'px-3 py-1.5 text-sm',
    lg: 'px-6 py-3 text-lg',
  },
  
  // Cards
  card: 'bg-white dark:bg-[#183D3D] rounded-lg shadow-md border border-[#E2DAD6] dark:border-[#2C4447] transition-shadow duration-200',
  cardHover: 'hover:shadow-lg hover:-translate-y-1',
  
  // Inputs & Form Elements
  input: 'w-full px-4 py-2.5 rounded-lg border-2 border-[#D9D1CC] dark:border-[#3D5A5A] bg-white dark:bg-[#2C3333] text-[#2C3333] dark:text-[#E7F6F2] placeholder-[#8B8B8B] dark:placeholder-[#395B64] transition-colors duration-200 focus:outline-none focus:border-[#6482AD] focus:ring-2 focus:ring-[#6482AD] focus:ring-opacity-20 dark:focus:border-[#5C8374] dark:focus:ring-[#5C8374]',
  
  // Text & Typography
  text: {
    h1: 'text-4xl font-bold text-[#2C3333] dark:text-[#E7F6F2]',
    h2: 'text-3xl font-bold text-[#2C3333] dark:text-[#E7F6F2]',
    h3: 'text-2xl font-semibold text-[#2C3333] dark:text-[#E7F6F2]',
    h4: 'text-xl font-semibold text-[#2C3333] dark:text-[#E7F6F2]',
    base: 'text-base text-[#5C6366] dark:text-[#B8D4CE]',
    muted: 'text-sm text-[#8B8B8B] dark:text-[#395B64]',
  },
  
  // Badges
  badge: {
    base: 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold',
    primary: 'bg-[#6482AD] bg-opacity-20 text-[#6482AD] dark:bg-[#5C8374] dark:bg-opacity-20 dark:text-[#A5C9CA]',
    success: 'bg-[#5C8374] bg-opacity-20 text-[#5C8374] dark:bg-[#5C8374] dark:bg-opacity-30 dark:text-[#A5C9CA]',
    warning: 'bg-[#D4B85C] bg-opacity-20 text-[#D4B85C] dark:bg-[#E8D876] dark:bg-opacity-20 dark:text-[#E8D876]',
    error: 'bg-[#D47A7A] bg-opacity-20 text-[#D47A7A] dark:bg-[#E07A7A] dark:bg-opacity-20 dark:text-[#E07A7A]',
  },
  
  // Alerts
  alert: {
    success: 'bg-[#5C8374] bg-opacity-10 border border-[#5C8374] border-opacity-30 text-[#5C8374] dark:bg-[#5C8374] dark:bg-opacity-20 dark:border-[#A5C9CA] dark:border-opacity-30 dark:text-[#A5C9CA]',
    error: 'bg-[#D47A7A] bg-opacity-10 border border-[#D47A7A] border-opacity-30 text-[#D47A7A] dark:bg-[#E07A7A] dark:bg-opacity-20 dark:border-[#E07A7A] dark:border-opacity-30 dark:text-[#E07A7A]',
    warning: 'bg-[#D4B85C] bg-opacity-10 border border-[#D4B85C] border-opacity-30 text-[#D4B85C] dark:bg-[#E8D876] dark:bg-opacity-20 dark:border-[#E8D876] dark:border-opacity-30 dark:text-[#E8D876]',
    info: 'bg-[#6482AD] bg-opacity-10 border border-[#6482AD] border-opacity-30 text-[#6482AD] dark:bg-[#5C8374] dark:bg-opacity-20 dark:border-[#A5C9CA] dark:border-opacity-30 dark:text-[#A5C9CA]',
  },
  
  // Grid Layouts
  grid: {
    cols1: 'grid grid-cols-1 gap-6',
    cols2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
  },
};

// ============================================
// DEFAULT EXPORT
// ============================================

export const UIComponents = {
  lightTheme,
  darkTheme,
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  transitions,
  componentClasses,
};
