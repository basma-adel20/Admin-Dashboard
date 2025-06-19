// Light mode colors (default)
const lightColors = {
  primary: '#443120',        // Main brown color used in buttons, headers
  primaryLight: '#B6AEA2',   // Lighter brown for status badges
  primaryLighter: '#F1E4D9', // Very light brown for card backgrounds
  primaryDark: '#2A1E13',    // Darker brown for hover states
  
  secondary: '#967251',      // Secondary brown
  secondaryLight: '#C4B9AF', // Light gray-brown
  
  background: '#FFFFFF',     // White background
  surface: '#F8F8F8',        // Light gray for surfaces
  card: '#FFFFFF',           // Card backgrounds
  
  text: {
    primary: '#1A1A1A',      // Main text color
    secondary: '#4A5568',    // Secondary text
    tertiary: '#718096',     // Tertiary text
    onPrimary: '#FFFFFF',    // Text on primary color
  },
  
  status: {
    available: '#B6AEA2',    // Available status color
    unavailable: '#E53E3E',  // Unavailable status color
    confirmed: '#38A169',    // Confirmed bookings
  },
  
  icons: {
    primary: '#443120',      // Main icon color
    secondary: '#938B82',    // Secondary icon color
    tertiary: '#B0A69A',     // Tertiary icon color
  },
  
  chart: {
    bar: '#443120',          // Chart bar color
  }
};

// Dark mode colors
const darkColors = {
  primary: '#D1C7B7',        // Light brown for dark mode
  primaryLight: '#8A7D6B',   // Medium brown
  primaryLighter: '#3A3329', // Dark brown
  primaryDark: '#E5D9C8',    // Very light brown
  
  secondary: '#B8A58F',      // Secondary light brown
  secondaryLight: '#5D5347', // Dark gray-brown
  
  background: '#1A1A1A',     // Dark background
  surface: '#2D3748',        // Dark surface
  card: '#2D3748',           // Card backgrounds
  
  text: {
    primary: '#F7FAFC',      // Main text color
    secondary: '#CBD5E0',    // Secondary text
    tertiary: '#A0AEC0',     // Tertiary text
    onPrimary: '#1A1A1A',    // Text on primary color
  },
  
  status: {
    available: '#8A7D6B',    // Available status color
    unavailable: '#FC8181',  // Unavailable status color
    confirmed: '#68D391',    // Confirmed bookings
  },
  
  icons: {
    primary: '#D1C7B7',      // Main icon color
    secondary: '#8A7D6B',    // Secondary icon color
    tertiary: '#5D5347',     // Tertiary icon color
  },
  
  chart: {
    bar: '#D1C7B7',          // Chart bar color
  }
};

export const colors = {
  light: lightColors,
  dark: darkColors
};

export type ColorTheme = typeof lightColors;