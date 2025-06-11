import { useState, useEffect } from 'react';

type ISSPosition = {
  lat: number;
  lng: number;
};

const fetchISSPosition = async (): Promise<ISSPosition> => {
  const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
  const data = await response.json();
  return { lat: data.latitude, lng: data.longitude };
};

const useISSPosition = (intervalMs: number = 2000): ISSPosition | null => {
  const [position, setPosition] = useState<ISSPosition | null>(null);

  useEffect(() => {
    let isMounted = true;
    const updatePosition = async () => {
      try {
        const pos = await fetchISSPosition();
        if (isMounted) setPosition(pos);
      } catch {
        // handle error if needed
      }
    };
    updatePosition();
    const id = setInterval(updatePosition, intervalMs);
    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, [intervalMs]);

  return position;
};

export default useISSPosition;