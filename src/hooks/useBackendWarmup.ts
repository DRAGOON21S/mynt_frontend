// hooks/useBackendWarmup.ts
import { useEffect, useState } from 'react';
import { api } from '../api';

interface UseBackendWarmupResult {
  isBackendReady: boolean;
  isWarmingUp: boolean;
  warmupError: Error | null;
  retryWarmup: () => void;
}

export const useBackendWarmup = (options?: {
  enablePeriodicPing?: boolean;
  pingInterval?: number; // in milliseconds
  maxRetries?: number;
}): UseBackendWarmupResult => {
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [isWarmingUp, setIsWarmingUp] = useState(true);
  const [warmupError, setWarmupError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const {
    enablePeriodicPing = true,
    pingInterval = 5 * 60 * 1000, // 5 minutes
    maxRetries = 3
  } = options || {};

  const performWarmup = async () => {
    setIsWarmingUp(true);
    setWarmupError(null);

    try {
      const isHealthy = await api.warmupBackend();
      setIsBackendReady(isHealthy);
      
      if (!isHealthy && retryCount < maxRetries) {
        // Retry after a delay if not healthy
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          performWarmup();
        }, 2000); // Retry after 2 seconds
      }
    } catch (error) {
      setWarmupError(error instanceof Error ? error : new Error('Unknown error'));
      setIsBackendReady(false);
      
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          performWarmup();
        }, 2000);
      }
    } finally {
      setIsWarmingUp(false);
    }
  };

  useEffect(() => {
    // Initial warmup
    performWarmup();

    // Set up periodic ping if enabled
    let intervalId: number | null = null;
    
    if (enablePeriodicPing) {
      intervalId = setInterval(() => {
        api.warmupBackend().catch(() => {
          // Silently handle periodic ping failures
        });
      }, pingInterval);
    }

    // Cleanup
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [enablePeriodicPing, pingInterval]);

  const retryWarmup = () => {
    setRetryCount(0);
    performWarmup();
  };

  return {
    isBackendReady,
    isWarmingUp,
    warmupError,
    retryWarmup
  };
};