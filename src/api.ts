// api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mynt2.onrender.com';

interface WaitlistSubmission {
  name: string;
  position: string;
  company: string;
  email: string;
  niche: string;
  otherNiche?: string;
}

interface SubmissionResponse {
  success: boolean;
  message: string;
  id?: number;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = {
  async submitWaitlist(data: WaitlistSubmission): Promise<SubmissionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new ApiError(
          responseData.detail || 'Failed to submit form',
          response.status,
          responseData
        );
      }

      return responseData;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      if (error instanceof Error) {
        throw new ApiError(error.message, 500);
      }
      
      throw new ApiError('An unexpected error occurred', 500);
    }
  },

  async getWaitlistStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist/stats`);
      
      if (!response.ok) {
        throw new ApiError('Failed to fetch stats', response.status);
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch stats', 500);
    }
  },

  // New warmup function
  async warmupBackend(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.warn(`Backend health check returned status: ${response.status}`);
        return false;
      }

      const data = await response.json();
      return data.status === 'healthy';
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Backend warmup timed out - server might be starting up');
      } else {
        console.log('Backend warmup failed:', error);
      }
      return false;
    }
  }
};

export type { WaitlistSubmission, SubmissionResponse };