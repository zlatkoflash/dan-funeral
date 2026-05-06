'use client';

import TextInput from "@/components/forms/Input";
import { useState } from "react";
import iconSearchGray from "@/assets/images/icon-search-gray.svg";

export default function SearchLocationsForm() {

  const [search_text, setSearchText] = useState<string>("");

  return (
    <form>
      <div className="search-wrap">
        {/* <img src={plusIcon.src} alt="plusIcon" /> */}
        <TextInput
          onChange={(e) => setSearchText(e.target.value)}
          value={search_text}
          type="text"
          id="search-locations"
          placeholder="Search locations"
          icon={iconSearchGray}
        />
      </div>
    </form>
  )
}