import { useState, useEffect, useRef } from 'react';

export function useTimer(initialSec) {
  const [seconds, setSeconds] = useState(initialSec);
  const intervalRef = useRef(null);

  const start = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setSeconds(initialSec);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { seconds, start, reset };
}