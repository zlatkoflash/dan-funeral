"use client";

import dynamic from 'next/dynamic';
import React, { useState, useEffect, useMemo } from 'react';

interface FilterDistanceProps {
  initialDistance?: number;
  maxLimit?: number;
}

export default function FilterDistance({
  initialDistance = 25,
  maxLimit = 100
}: FilterDistanceProps) {

  const MapMemoDynamic = useMemo(() => dynamic(
    () => import('@/components/google/ZLeafletMap'),
    {
      ssr: false, // This is the magic line that kills the error
      loading: () => <div style={{ height: 'calc(30.8*var(--delta))', background: '#eee' }} />
    }
  ), []);

  const [distance, setDistance] = useState(initialDistance);
  const [mounted, setMounted] = useState(false);



  const [location_map_lat, setLocationMapLat] = useState<number>(40.7128);
  const [location_map_lng, setLocationMapLng] = useState<number>(-74.0060);
  const [location_map_address, setLocationMapAddress] = useState<string>("");
  const [location_map_zoom, setLocationMapZoom] = useState<number>(12);

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const urlDist = params.get("distance");
    if (urlDist) setDistance(Number(urlDist));
  }, []);

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setDistance(value);
    // Add your URL update logic here when ready
  };

  // If not mounted, render a container with the SAME className and structure
  // but without the dynamic bits. This prevents the "Server vs Client" text mismatch.
  if (!mounted) {
    return (
      <div className="card p-4 border-0 " style={{ maxWidth: '300px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0 fw-bold">Distance</h6>
          <span className="badge bg-light text-light px-3 py-2 rounded-pill">00 miles</span>
        </div>
        <div style={{ height: '40px' }}></div>
      </div>
    );
  }

  return (
    <div className="card p-4 border-0" style={{ maxWidth: '300px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0 fw-bold">Distance</h6>
        <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
          {distance} miles
        </span>
      </div>

      <div className="position-relative">
        <input
          type="range"
          className="form-range custom-slider"
          min="0"
          max={maxLimit}
          step="5"
          value={distance}
          onChange={handleDistanceChange}
          id="distanceRange"
        />

        <div className="d-flex justify-content-between mt-2">
          <span className="small text-muted">0 mi</span>
          <span className="small text-muted">{maxLimit} mi</span>
        </div>
      </div>

      {/* Standard CSS is safer for hydration than style jsx inside a component */}
      <style>{`
        .custom-slider::-webkit-slider-thumb { background: var(--bs-primary) !important; }
        .custom-slider::-moz-range-thumb { background: var(--bs-primary) !important; }
      `}</style>

      {
        /*<div className="distance-filter-map-wrap">
        <MapMemoDynamic
          initPositionAndZoom={{ lat: location_map_lat, lng: location_map_lng, zoom: location_map_zoom }}
          onLocationChange={(
            lat: number,
            lng: number,
            address: string,
            zoom: number,
            city: string,
            postcode: string,

          ) => {
            
          }} />
      </div>*/
      }
    </div>
  );
}