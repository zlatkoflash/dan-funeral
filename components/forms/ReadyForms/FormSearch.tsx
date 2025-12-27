"use client"

import { useState } from "react";
import TextInput from "../Input";
import { Button } from "react-bootstrap";
import iconLocation from './../../../assets/images/icon-location.svg';


export interface IFormSearch {
  buttonSearchType?: "btn-arrow" | "btn-text"
}

export default function FormSearch(
  data: IFormSearch
) {


  const [searchText, set_searchText] = useState<string>("");

  return <form action="" className={`search-form ${data.buttonSearchType}`}>
    <TextInput
      type="text"
      id="search-input"
      label=""
      inputClassName="heading-xs"
      placeholder="Enter City or Zip Code"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        set_searchText(e.target.value)
      }}
      value={searchText}
      icon={iconLocation}
    />

    {
      (() => {
        if (data.buttonSearchType === 'btn-text')
          return <Button variant="success" className="btn-for-search">Search</Button>
        return <Button variant="success" className="btn-for-search btn-search" />
      })()
    }

    <Button variant="success" className="btn-for-search btn-search d-none" />


  </form>
}