"use client";

import { executeSearchFiltersRedirect } from '@/utils/listing';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

interface FilterPriceRangeProps {
  initialMin?: number;
  initialMax?: number;
  minLimit?: number;
  maxLimit?: number;
  onMinChange?: (min: number) => void;
  onMaxChange?: (max: number) => void;
}


const MIN_PRICE_IN_RANGE = 0;
const MAX_PRICE_IN_RANGE = 5000;

export default function FilterPriceRange({
  initialMin = MIN_PRICE_IN_RANGE,
  initialMax = MAX_PRICE_IN_RANGE,
  minLimit = MIN_PRICE_IN_RANGE,
  maxLimit = MAX_PRICE_IN_RANGE,
  onMinChange,
  onMaxChange
}: FilterPriceRangeProps) {
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);
  const [mounted, setMounted] = useState(false);

  // 1. Mount Guard: Fixes the Hydration Error
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMin(initialMin);
    setMax(initialMax);
  }, [initialMin, initialMax]);

  // Calculate percentages
  const leftPercent = (min / maxLimit) * 100;
  const rightPercent = 100 - (max / maxLimit) * 100;

  const router = useRouter();

  // 1. Create a reference holder for the timeout ID
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const LocalOnChange = async (min: number, max: number) => {

    // 2. Clear the previous timer immediately if the user is still sliding
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // 3. Wait for 500ms. If the user slides again before this time expires, the old call is cancelled.
    debounceTimer.current = setTimeout(() => {

      executeSearchFiltersRedirect(
        {
          pageIndex: 1,
          paramsArray: [
            {
              paramName: "service_price_min",
              paramValue: min.toString()
            },
            {
              paramName: "service_price_max",
              paramValue: max.toString()
            }
          ],
          router: router,
        }
      )

    }, 400);


  }

  // 2. Prevent rendering until mounted on client
  if (!mounted) {
    // Return a static placeholder or null so server/client HTML matches 
    return <div className="card p-4 border-0" style={{ maxWidth: '300px', height: '150px' }}></div>;
  }

  return (
    <div className="card- p-4- border-0 " style={{ maxWidth: '300px' }}>

      {
        // <h6 className="mb-4 fw-bold">Price Range</h6>
      }

      <div className="position-relative mb-3" style={{ height: '8px' }}>
        {/* Grey Track */}
        <div className="position-absolute w-100 rounded"
          style={{ height: '100%', top: 0, backgroundColor: '#eeeeeeff' }}
        ></div>

        {/* Blue Active Track */}
        <div className="position-absolute bg-primary rounded"
          style={{
            height: '100%',
            left: `${leftPercent}%`,
            right: `${rightPercent}%`,
            top: 0,
            zIndex: 1
          }}
        ></div>

        {/* Interactive Sliders */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={min}
          onChange={(e) => {
            const newValue = Math.min(Number(e.target.value), max - 500)
            setMin(newValue)
            onMinChange?.(newValue)
            LocalOnChange(newValue, max)
          }}
          className="multi-range-input"
          style={{ zIndex: 3 }}
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={max}
          onChange={(e) => {
            const newValue = Math.max(Number(e.target.value), min + 500)
            setMax(newValue)
            onMaxChange?.(newValue)
            LocalOnChange(min, newValue)
          }}
          className="multi-range-input"
          style={{ zIndex: 4 }}
        />

        {/* Visual Handles */}
        <div className="position-absolute border border-2 border-primary bg-white rounded-circle"
          style={{
            width: '18px', height: '18px',
            left: `calc(${leftPercent}% - 9px)`,
            top: '-5px', zIndex: 2, pointerEvents: 'none'
          }}
        ></div>

        <div className="position-absolute border border-2 border-primary bg-white rounded-circle"
          style={{
            width: '18px', height: '18px',
            left: `calc(${100 - rightPercent}% - 9px)`,
            top: '-5px', zIndex: 2, pointerEvents: 'none'
          }}
        ></div>
      </div>

      <style jsx>{`
        .multi-range-input {
          position: absolute;
          width: 100%;
          pointer-events: none;
          appearance: none;
          height: 100%;
          opacity: 0;
          background: none;
          top: 0;
          left: 0;
          margin: 0;
        }
        .multi-range-input::-webkit-slider-thumb {
          pointer-events: auto;
          appearance: none;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        .multi-range-input::-moz-range-thumb {
          pointer-events: auto;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      `}</style>

      <div className="d-flex justify-content-between mt-2">
        <div className="text-start">
          <span className="small text-muted d-block">Min</span>
          <span className="fw-bold">${min.toLocaleString()}</span>
        </div>
        <div className="text-end">
          <span className="small text-muted d-block">Max</span>
          <span className="fw-bold">${max.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}