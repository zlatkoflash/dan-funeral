"use client"

import { Button } from "react-bootstrap";
import TextInput from "../Input";
import { useState } from "react";
import { useMyListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import { getApiData } from "@/utils/api";

export default function FormProduct() {

  const {
    listing,
    actualListingId
  } = useMyListing()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageAfterSuccess, setMessageAfterSuccess] = useState("");

  const ReachOutToProvider = async () => {
    setLoading(true);

    const response = await getApiData("/listings/reach-out-to-provider", "POST", {
      listingId: actualListingId,
      name: name,
      email: email,
      phone: phone,
      message: message,
    })

    console.log("response:", response);

    setLoading(false);
    setMessageAfterSuccess("Thank you for your message. We will get back to you as soon as possible.");

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  }

  return <section className="form-product">
    <form>
      <div className="heading-content">
        <h4>Reach Out To Provider Directly.</h4>
        <p>We urge providers to respond quickly.</p>
      </div>

      <TextInput id="name" onChange={(e) => { setName(e.target.value) }} type="text" value={name} placeholder="Your Name" errorsCasses={["required"]} />
      <TextInput id="email" onChange={(e) => { setEmail(e.target.value) }} type="text" value={email} placeholder="Email Address" errorsCasses={["required", "email"]} />
      <TextInput id="phone" onChange={(e) => { setPhone(e.target.value) }} type="text" value={phone} placeholder="Phone Number" errorsCasses={["required"]} />
      <TextInput id="message" onChange={(e) => { setMessage(e.target.value) }} type="textarea" value={message} placeholder="Your Message" errorsCasses={["required"]} />

      <Button type="button" variant="success" className={`btn-submit ${loading ? 'loading' : ''}`} onClick={() => {

        if (name === "" || email === "" || phone === "" || message === "") {
          // alert("Please fill all fields");
          return;
        }

        ReachOutToProvider()

      }}>Send</Button>

      {messageAfterSuccess && <p className="text-success text-center mt-3">{messageAfterSuccess}</p>}

    </form>
  </section>
}