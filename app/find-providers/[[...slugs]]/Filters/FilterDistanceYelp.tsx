'use client';

import { executeSearchFiltersRedirect } from '@/utils/listing';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent } from 'react';

export default function FilterDistanceYelp() {

  const router = useRouter();

  const [selectedDistance, setSelectedDistance] = useState<string>('auto');

  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDistance(e.target.value);

    executeSearchFiltersRedirect({
      paramsArray: [
        { paramName: 'distance', paramValue: e.target.value },
      ],
      router: router,
      currentParams: new URLSearchParams(window.location.search),
      pageIndex: 1
    });

  };

  const distanceOptions = [
    { id: 'birds-eye', label: "Bird's-eye View", value: 'auto' },
    { id: 'driving', label: 'Driving (5 mi.)', value: '5mi' },
    { id: 'biking', label: 'Biking (2 mi.)', value: '2mi' },
    { id: 'walking', label: 'Walking (1 mi.)', value: '1mi' },
    { id: 'blocks', label: 'Within 4 blocks', value: '4blocks' },
  ];

  return (
    <>
      {distanceOptions.map((option) => (
        <div className="form-check mb-3" key={option.id}>
          <input
            className="form-check-input"
            type="radio"
            name="distanceFilter"
            id={option.id}
            value={option.value}
            checked={selectedDistance === option.value}
            onChange={handleDistanceChange}
          />
          <label className="form-check-label" htmlFor={option.id} style={{ cursor: 'pointer' }}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
}