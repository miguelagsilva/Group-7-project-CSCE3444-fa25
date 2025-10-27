// API service functions for connecting frontend to backend
const API_BASE_URL = 'http://localhost:5000';

// Challenge API functions
export const challengeAPI = {
  // Get test cases for a challenge
  async getTestCases(challengeId: number) {
    const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/test-cases`);
    if (!response.ok) {
      throw new Error(`Failed to fetch test cases: ${response.statusText}`);
    }
    return response.json();
  },

  // Validate a challenge submission
  async validateSubmission(challengeId: number, submission: {
    user_id: string;
    code: string;
    execution_results: Record<string, string>;
  }) {
    const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to validate submission: ${response.statusText}`);
    }
    return response.json();
  },

  // Get user's submission history for a challenge
  async getUserSubmissions(challengeId: number, userId: string) {
    const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/submissions/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch submissions: ${response.statusText}`);
    }
    return response.json();
  },

  // Get solution for a challenge
  async getSolution(challengeId: number) {
    const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/solution`);
    if (!response.ok) {
      throw new Error(`Failed to fetch solution: ${response.statusText}`);
    }
    return response.json();
  }
};

// Quiz API functions
export const quizAPI = {
  // Submit quiz progress
  async submitProgress(submission: {
    quiz_id: number;
    user_id: string;
    answers: Record<string, string>;
    completion_time?: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/quiz-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to submit quiz progress: ${response.statusText}`);
    }
    return response.json();
  },

  // Get user's quiz progress
  async getUserProgress(userId: string) {
    const response = await fetch(`${API_BASE_URL}/quiz-progress/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch quiz progress: ${response.statusText}`);
    }
    return response.json();
  },

  // Get user's quiz summary
  async getUserSummary(userId: string) {
    const response = await fetch(`${API_BASE_URL}/quiz-progress/${userId}/summary`);
    if (!response.ok) {
      throw new Error(`Failed to fetch quiz summary: ${response.statusText}`);
    }
    return response.json();
  }
};

// Utility function to handle API errors
export const handleAPIError = (error: Error) => {
  console.error('API Error:', error.message);
  return {
    success: false,
    error: error.message
  };
};
