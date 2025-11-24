"use client"

import { Button } from "react-bootstrap";
import TextInput from "../Input";

export default function FormProduct() {
  return <section className="form-product">
    <form>
      <div className="heading-content">
        <h4>Reach Out To Provider Directly.</h4>
        <p>We urge providers to respond quickly.</p>
      </div>

      <TextInput id="" label="" onChange={(e) => { }} type="text" value="" placeholder="Your Name" />
      <TextInput id="" label="" onChange={(e) => { }} type="text" value="" placeholder="Email Address" />
      <TextInput id="" label="" onChange={(e) => { }} type="text" value="" placeholder="Phone Number" />
      <TextInput id="" label="" onChange={(e) => { }} type="textarea" value="" placeholder="Phone Number" />

      <Button variant="success" className="btn-submit">Send</Button>

    </form>
  </section>
}