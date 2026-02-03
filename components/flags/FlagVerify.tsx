'use client';

import Image from "next/image";
import Link from "next/link";

import flag from './../../assets/images/icon-flag.svg';
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { IListing } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import { useState } from "react";
import { SendVerifyTheEmailAddress } from "@/utils/user";

export default function FlagVerify({ listing, listingPost }: { listing?: IListing, listingPost?: { post_author: number, email_verified?: boolean } }) {


  const {
    user,
    showAuthModal,
    setShowAuthModal
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  console.log("listingPost:", listingPost, user);

  const ___sendVerificationEmail = async () => {
    setLoading(true);
    await SendVerifyTheEmailAddress();
    setLoading(false);
    setMessage("Verification email sent successfully, please check your email.");
  }



  // if (user !== null && user.id.toString() !== listingPost?.post_author?.toString()) return null;

  return <>
    <section className={`flag-verify ${loading ? "loading" : ""}`}>
      <Image src={flag} alt="Flag" />


      {
        // when no logged
        /*user === null && listingPost?.email_verified === false && <>
          <span className="question">Is this your business?</span>
          <Link href="/" className="verify-link" onClick={(e) => {
            e.preventDefault();
            setShowAuthModal(true);
            console.log("showAuthModal:", showAuthModal);
          }}>Verify it today.</Link>
        </>*/
      }
      <>
        <span className="question">Is this your business?</span>
        <Link href="/" className="verify-link" onClick={(e) => {
          e.preventDefault();
          setShowAuthModal(true);
          console.log("showAuthModal:", showAuthModal);
        }}>Verify it today.</Link>
      </>


      {
        /*user !== null && user.id.toString() === listingPost?.post_author?.toString() && !user.email_verified && <>
          <span className="question">This is your business.</span>
          <Link href="/" className="verify-link" onClick={(e) => {
            e.preventDefault();
            ___sendVerificationEmail();
          }}>Please Verify.</Link>

        </>*/
      }

      {
        /*listingPost?.email_verified === true && <>
          <span className="question">This business is verified.</span>

        </>*/
      }

      {
        // user === null
        // it is missing verified business
      }



      {
        message && <div className="w-100">
          <span className="message text-success">{message}</span>
        </div>
      }


    </section>

  </>

}