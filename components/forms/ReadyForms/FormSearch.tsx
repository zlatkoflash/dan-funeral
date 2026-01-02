"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import TextInput from "../Input";
import { Button } from "react-bootstrap";
import iconLocation from './../../../assets/images/icon-location.svg';
// import './style.scss';

export interface IFormSearch {
  buttonSearchType?: "btn-arrow" | "btn-text";
}

export default function FormSearch({ buttonSearchType }: IFormSearch) {
  const [searchText, set_searchText] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Reference to the entire form component
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("recent_locations");
    if (saved) setRecentSearches(JSON.parse(saved));

    // Function to handle clicks outside of the form
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    // Attach the listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const demoResults = [
    { id: 1, name: "New York, NY", type: "City" },
    { id: 2, name: "Newark, NJ", type: "City" },
    { id: 3, name: "Los Angeles, CA", type: "City" },
    { id: 4, name: "90210", type: "Zip Code" },
    { id: 5, name: "Chicago, IL", type: "City" },
  ];

  const filteredResults = useMemo(() => {
    if (!searchText.trim()) return [];
    return demoResults.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const handleSelectLocation = (locationName: string) => {
    set_searchText(locationName);
    const updatedRecents = [
      locationName,
      ...recentSearches.filter(item => item !== locationName)
    ].slice(0, 5);

    setRecentSearches(updatedRecents);
    localStorage.setItem("recent_locations", JSON.stringify(updatedRecents));
    setIsFocused(false);
  };

  const handleClearInput = () => {
    set_searchText("");
    const input = document.getElementById("search-input");
    input?.focus();
  };

  const handleCurrentLocation = () => {
    if ("geolocation" in navigator) {
      set_searchText("Detecting location...");
      navigator.geolocation.getCurrentPosition((position) => {
        const mockCity = "Current Location (Detected)";
        handleSelectLocation(mockCity);
      });
    }
  };

  return (
    <form
      ref={formRef} // Attach ref here
      action=""
      className={`search-form ${buttonSearchType} position-relative ${isFocused ? 'focused' : 'not-focused'}`}
      autoComplete="off"
    >
      <div className="input-wrapper w-100 position-relative">
        <TextInput
          type="text"
          id="search-input"
          autoComplete="one-time-code"
          label=""
          inputClassName="heading-xs"
          placeholder="Enter City or Zip Code"
          onFocus={() => setIsFocused(true)}
          // Removed onBlur because the handleClickOutside handles it more reliably
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_searchText(e.target.value)}
          value={searchText}
          icon={iconLocation}
        />

        {searchText && (
          <button
            type="button"
            className="clear-input-btn"
            onClick={handleClearInput}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}

        {isFocused && (
          <div className="search-dropdown">
            <ul className="list-unstyled mb-0">
              <li className="dropdown-item-custom current-location" onClick={handleCurrentLocation}>
                <span className="icon-blue">⊕</span>
                <span className="item-name ms-2 text-primary font-weight-bold">Use current location</span>
              </li>

              {!searchText.trim() && (
                <>
                  {recentSearches.length > 0 ? (
                    recentSearches.map((item, idx) => (
                      <li key={`visited-${idx}`} className="dropdown-item-custom" onClick={() => handleSelectLocation(item)}>
                        <img src={iconLocation.src} alt="" className="me-2" width="14" />
                        <span className="item-name text-muted">{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="dropdown-item-custom disabled text-muted italic small text-center py-2">
                      No recent locations
                    </li>
                  )}
                </>
              )}

              {searchText.trim() && (
                <>
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item) => (
                      <li
                        key={item.id}
                        className="dropdown-item-custom py-2"
                        onClick={() => handleSelectLocation(item.name)}
                      >
                        <span className="item-name">{item.name}</span>
                      </li>
                    ))
                  ) : (
                    <li className="dropdown-item-custom disabled text-muted text-center py-2">
                      No matches found
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        )}
      </div>

      {buttonSearchType === 'btn-text' ? (
        <Button variant="success" className="btn-for-search">Search</Button>
      ) : (
        <Button variant="success" className="btn-for-search btn-search" />
      )}
    </form>
  );
}