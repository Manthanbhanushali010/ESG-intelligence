// API Configuration
const config = {
  development: {
    apiUrl: 'http://localhost:5003'
  },
  production: {
    apiUrl: 'https://esg-intelligence.onrender.com'
  }
}

// Get current environment
const environment = import.meta.env.MODE || 'development'

// Export the appropriate config
export const API_BASE_URL = config[environment].apiUrl

// Helper function to build API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`
} 