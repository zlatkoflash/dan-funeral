"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocationData {
  city: string;
  zip: string;
  country: string;
  isp: string;
  loading: boolean;
}

const LocationContext = createContext<LocationData | undefined>(undefined);

export function MyLocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationData>({
    city: '',
    zip: '',
    country: '',
    isp: '',
    loading: true,
  });

  useEffect(() => {
    async function getStableLocation() {
      try {
        // This is a server-to-server or background API call
        // It does NOT trigger a browser popup.
        const res = await fetch('http://ip-api.com/json/');
        const data = await res.json();

        console.log("data:", data);

        if (data.status === 'success') {
          setLocation({
            city: data.city,
            zip: data.zip,
            country: data.country,
            isp: data.isp,
            loading: false,
          });
        }
      } catch (error) {
        console.error("Stable Location Error:", error);
        setLocation(prev => ({ ...prev, loading: false }));
      }
    }

    getStableLocation();
  }, []);

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
}

export const useMyLocation = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error("useMyLocation must be used within MyLocationProvider");
  return context;
};