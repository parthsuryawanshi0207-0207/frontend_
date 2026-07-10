/**
 * API Configuration and Endpoints
 *
 * Configure your backend API base URL here.
 * Set up environment variables for different environments.
 */

// API Configuration
export const API_CONFIG = {
  // Default to localhost for development
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  TIMEOUT: 30000, // 30 seconds
  DEMO_MODE: true, // Set to false when connecting to real backend
};

// API Endpoints
export const chatEndpoints = {
  sendMessage: `${API_CONFIG.BASE_URL}/chat/send`,
  uploadFile: `${API_CONFIG.BASE_URL}/chat/upload`,
  voiceInput: `${API_CONFIG.BASE_URL}/chat/voice`,
  getHistory: `${API_CONFIG.BASE_URL}/chat/history`,
  deleteMessage: `${API_CONFIG.BASE_URL}/chat/messages/:id`,
};

/**
 * Generic API request handler
 * @param {string} url - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} Response data
 */
async function apiRequest(url, options = {}) {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
  config.signal = controller.signal;

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Send a message to the AI
 * @param {string} message - User message
 * @param {object} metadata - Optional metadata
 */
export async function sendMessage(message, metadata = {}) {
  return apiRequest(chatEndpoints.sendMessage, {
    method: 'POST',
    body: JSON.stringify({ message, metadata }),
  });
}

/**
 * Upload a file
 * @param {File} file - File to upload
 */
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  return apiRequest(chatEndpoints.uploadFile, {
    method: 'POST',
    headers: {}, // Let browser set multipart/form-data boundary
    body: formData,
  });
}

/**
 * Submit voice input
 * @param {Blob} audioBlob - Audio data
 */
export async function submitVoiceInput(audioBlob) {
  const formData = new FormData();
  formData.append('audio', audioBlob);

  return apiRequest(chatEndpoints.voiceInput, {
    method: 'POST',
    headers: {},
    body: formData,
  });
}

/**
 * Get chat history
 */
export async function getChatHistory() {
  return apiRequest(chatEndpoints.getHistory);
}

/**
 * Delete a message
 * @param {string} messageId - Message ID to delete
 */
export async function deleteMessage(messageId) {
  const url = chatEndpoints.deleteMessage.replace(':id', messageId);
  return apiRequest(url, { method: 'DELETE' });
}
