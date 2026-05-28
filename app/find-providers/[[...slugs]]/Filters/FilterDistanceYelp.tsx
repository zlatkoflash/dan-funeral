'use client';

import { executeSearchFiltersRedirect } from '@/utils/listing';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent } from 'react';


const getBrowserLocation = () => {
  return new Promise((resolve, reject) => {
    // 1. Check if the browser even supports geolocation
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    // 2. High accuracy configuration settings
    const options = {
      enableHighAccuracy: true, // Forces GPS/Precise Wi-Fi instead of coarse IP mapping
      timeout: 10000,           // Stop waiting after 10 seconds if no response
      maximumAge: 0             // Do not use a cached position; fetch fresh coordinates
    };

    // 3. Request the position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy // Error margin in meters
        });
      },
      (error) => {
        // Handle explicit error states cleanly
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("User denied the request for Geolocation."));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location information is unavailable on this connection."));
            break;
          case error.TIMEOUT:
            reject(new Error("The request to get user location timed out."));
            break;
          default:
            reject(new Error("An unknown error occurred while fetching location."));
            break;
        }
      },
      options
    );
  });
};


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


  const [disabled, setDisabled] = useState(false);

  const [distanceVersion2, setDistanceVersion2] = useState<number | null>(null);

  const distanceOptionsV2 = [
    {
      label: "5 miles", value: 5
    },
    {
      label: "10 miles", value: 10
    },
    {
      label: "25 miles", value: 25
    },
    {
      label: "50 miles", value: 50
    },
  ];

  return (
    <>
      {/*distanceOptions.map((option) => (
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
      ))*/}

      <div className={`grid-buttons-distance ${disabled ? 'disabled' : ''}`}>
        {
          distanceOptionsV2.map((option) => {
            return <button key={option.value} className={`btn-distance-filter ${distanceVersion2 === option.value ? 'active' : ''}`} onClick={async (e) => {

              let browserLocation: any = null;

              try {
                browserLocation = await getBrowserLocation();
                console.log("browserLocation:", browserLocation);
              }
              catch (error) {
                setDisabled(true);
              }

              if (browserLocation === null) {
                return;
              }

              e.preventDefault();
              /*handleDistanceChange({
                target: {
                  value: option.value
                }
              });*/

              if (option.value === distanceVersion2) {
                setDistanceVersion2(null);

                executeSearchFiltersRedirect(
                  {
                    paramsArray: [
                      {
                        paramName: "distance",
                        paramValue: "-"
                      },
                    ],
                    router: router,
                    currentParams: new URLSearchParams(window.location.search),
                    pageIndex: 1
                  }
                )

                return;
              }

              setDistanceVersion2(option.value)

              executeSearchFiltersRedirect(
                {
                  paramsArray: [
                    {
                      paramName: "expanded-distance",
                      paramValue: "true"
                    },
                    {
                      paramName: "distance",
                      paramValue: `${option.value}`
                    },
                    {
                      paramName: "distance_unit",
                      paramValue: `miles`
                    },
                    {
                      paramName: "distance_center_latitude",
                      paramValue: browserLocation.lat
                    },
                    {
                      paramName: "distance_center_longitude",
                      paramValue: browserLocation.lng
                    }
                  ],
                  router: router,
                  currentParams: new URLSearchParams(window.location.search),
                  pageIndex: 1
                }
              )

            }}>
              {option.label}
            </button>
          })
        }
      </div>
    </>
  );
}