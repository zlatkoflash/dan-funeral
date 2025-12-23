"use client";

import TextInput from "@/components/forms/Input";
import { Button } from "react-bootstrap";

export default function PromoCodeComponent() {
  return <div className="promo-code-component">

    <TextInput
      id="promo-code"
      type="text"
      value=""
      onChange={() => { }}
      placeholder="Enter promo code"
    />

    <Button type="button" variant="success">Apply</Button>

  </div>
}