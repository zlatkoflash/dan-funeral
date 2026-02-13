import { Button } from "react-bootstrap";
import { useState } from "react";
import Image from "next/image";
import iconStar from './../../../assets/images/icon-star.svg';
import { SendVerifyTheEmailAddress } from "@/utils/user";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import VerifiedBadge from "@/components/badges/VerifiedBadge";
// import { SendVerifyTheEmailAddress } from "@/utils/user";

export default function BtnBecomeVerified() {

  const [loading, setLoading] = useState<boolean>(false);
  const [messageAfterSendingVerification, setMessageAfterSendingVerification] = useState<string>("");

  const { user } = useAuth();


  if (user?.verification.isVerifiedByAdmin === true) {
    return <VerifiedBadge />
  }

  return (
    <>
      <div>
        {

          <Button type="button" variant="success" className={`${loading ? 'loading' : ''} ${loading || user?.verification.verificationEmailsAreSent === true || user?.verification.email === true ? 'disabled' : ''
            } 
          `} onClick={async (e) => {
              e.preventDefault();
              setLoading(true);

              const resultForSendingEmailForVerification =
                await SendVerifyTheEmailAddress();
              // await DoSendVerificationDetails

              console.log(resultForSendingEmailForVerification);
              if (resultForSendingEmailForVerification.ok !== true) {

              }
              else {
                setMessageAfterSendingVerification("Verification email sent successfully");
              }
              setLoading(false);
            }}>
            Become Verified
            <Image src={iconStar} className="icon-right" alt="Become Verified" />
          </Button>
        }
        {
          messageAfterSendingVerification !== "" &&
          <p className="text-success text-center">{messageAfterSendingVerification}</p>
        }
        {
          user?.verification.verificationEmailsAreSent === true && !user?.verification.email &&
          <p className=" text-success text-center">Please check your email and click on the verification link to verify your email address.</p>
        }
        {
          user?.verification.email === true &&
          <p className=" text-success text-center">Your email is verified</p>
        }
      </div>
    </>
  )
}