'use client';

import { useState, useEffect, useRef } from "react";
import TextInput from "../Input";
import { Button, Spinner } from "react-bootstrap";
import iconLocation from './../../../assets/images/icon-location.svg';
import { executeSearchFiltersRedirect, FetchLocationsForTheSearchBar, getLocalLocation } from "@/utils/listing";
import { useRouter } from "next/navigation";
// import { useListingsPublic } from "@/ContextProvider/ListingCardsProvider";

export interface IFormSearch {
  buttonSearchType?: "btn-arrow" | "btn-text";
}

export default function FormSearch({ buttonSearchType }: IFormSearch) {

  const router = useRouter();

  /*const {
    LoadTheListAgain,
    loadingList
  } = useListingsPublic();*/

  const [searchText, set_searchText] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<{ city: string, postcode: string }[]>([]);

  // New states for server-side search
  const [serverResults, setServerResults] = useState<{ city: string, postcode: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [IcanUseEffectForSearchText, setIcanUseEffectForSearchText] = useState(true);

  const [loadingTheList, setLoadingTheList] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  // 1. Handle Debounced Server Search
  useEffect(() => {


    if (!IcanUseEffectForSearchText) return;

    if (!searchText.trim()) {
      setServerResults([]);
      return;
    }

    // Set a timeout to delay the API call
    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        // Replace this URL with your actual WordPress/Next.js API endpoint
        /*const response = await fetch(`/api/search-locations?q=${encodeURIComponent(searchText)}`);
        const data = await response.json();

        // Assuming your server returns an array of objects like: { id, name }
        setServerResults(data || []);*/
        console.log("Here searching the results");
        const resultLocationsForTheSearchBar = await FetchLocationsForTheSearchBar(searchText);
        console.log("resultLocationsForTheSearchBar:", resultLocationsForTheSearchBar);
        setServerResults(resultLocationsForTheSearchBar.locations);
        // resultLocationsForTheSearchBar.
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  useEffect(() => {
    const saved = localStorage.getItem("recent_locations");
    if (saved) setRecentSearches(JSON.parse(saved));

    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLocation = (location: { city: string, postcode: string }) => {

    console.log("Location:", location);

    // Now here search should start :)
    // router.push('/');

    set_searchText(location.city);
    setIcanUseEffectForSearchText(false);
    setTimeout(() => {
      setIcanUseEffectForSearchText(true);
    }, 50);
    const updatedRecents = [
      location,
      ...recentSearches.filter(item => item.city !== location.city)
    ].slice(0, 5);

    setRecentSearches(updatedRecents);
    localStorage.setItem("recent_locations", JSON.stringify(updatedRecents));
    setIsFocused(false);

    executeSearchFiltersRedirect({
      /*paramName: "zip",
      paramValue: location.postcode,*/
      paramsArray: [
        { paramName: "zip", paramValue: location.postcode },
        { paramName: "city", paramValue: location.city }
      ],
      router: router,
      currentParams: new URLSearchParams(window.location.search)
    });

  };

  const handleClearInput = () => {
    set_searchText("");
    setServerResults([]);
  };

  /**
   * Don't delete this function, client will ask for it, but you must tel him that we need to use external source to get zip and city
   */
  const ___getLocalLocation = async () => {
    const localLocation = await getLocalLocation();
    console.log("localLocation:", localLocation);
  };

  const ___LoadTheListAgain = () => {
    executeSearchFiltersRedirect({
      /*paramName: "zip",
      paramValue: location.postcode,*/
      paramsArray: [
        // { paramName: "zip", paramValue: location.postcode },
        { paramName: "city", paramValue: searchText }
      ],
      router: router,
      currentParams: new URLSearchParams(window.location.search)
    });
  }

  return (
    <form
      ref={formRef}
      className={`search-form ${buttonSearchType} position-relative ${isFocused ? 'focused' : 'not-focused'}`}
      autoComplete="off"
    >
      <div className="input-wrapper w-100 position-relative">
        <TextInput
          type="text"
          id="search-input"
          autoComplete="one-time-code"
          inputClassName="heading-xs"
          placeholder="Enter City or Zip Code"
          onFocus={() => setIsFocused(true)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_searchText(e.target.value)}
          value={searchText}
          icon={iconLocation}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="position-absolute end-0 top-50 translate-middle-y me-3">
            <Spinner animation="border" size="sm" variant="success" />
          </div>
        )}

        {searchText && !isLoading && (
          <button type="button" className="clear-input-btn" onClick={handleClearInput}>
            &times;
          </button>
        )}

        {isFocused && (
          <div className="search-dropdown">
            <ul className="list-unstyled mb-0">


              {
                /*
                When client will ask this I must explain him that we need to use external source to get zip and city
                <li className="dropdown-item-custom current-location" onClick={() => {

                ___getLocalLocation();
              }}>
                <span className="icon-blue">⊕</span>
                <span className="item-name ms-2 text-primary font-weight-bold">Use current location</span>
              </li>*/

              }

              {/* RECENT SEARCHES (When input is empty) */}
              {!searchText.trim() && recentSearches.map((item, idx) => (
                <li key={idx} className="dropdown-item-custom" onClick={() => handleSelectLocation(item)}>
                  <img src={iconLocation.src} alt="" className="me-2" width="14" />
                  <span className="item-name text-muted">{item.city}({item.postcode})</span>
                </li>
              ))}

              {/* SERVER SEARCH RESULTS */}
              {searchText.trim() && !isLoading && (
                <>
                  {serverResults.length > 0 ? (
                    serverResults.map((item, index) => (
                      <li key={`index-${item.city}-${item.postcode}`} className="dropdown-item-custom py-2" onClick={() => handleSelectLocation(item)}>
                        <span className="item-name">{item.city}({item.postcode})</span>
                      </li>
                    ))
                  ) : (
                    <li className="dropdown-item-custom disabled text-muted text-center py-2">
                      No matches found on server
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        )}
      </div>

      {
        /*<Button variant="success" className={`btn-for-search ${buttonSearchType === "btn-arrow" ? "btn-arrow" : "btn-search"}`}>
        {buttonSearchType === 'btn-text' ? 'Search' : ''}
      </Button>*/
      }
      {
        (() => {
          if (buttonSearchType === 'btn-text')
            return <Button type="button" onClick={() => ___LoadTheListAgain()} variant="success" className={`btn-for-search ${loadingTheList ? "loading" : ""}`}>Search</Button>
          return <Button type="button" onClick={() => ___LoadTheListAgain()} variant="success" className={`btn-for-search btn-search ${loadingTheList ? "loading" : ""}`} />
        })()
      }
    </form>
  );
}