"use client";

import check_star from "@/assets/images/icon-check-star.png";
import { getApiData } from "@/utils/api";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";


export default function StartVerificationPanel() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMEssage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [messagesAreSend, setMessagesAreSend] = useState<boolean>(false);

  const { user } = useAuth();
  if (!user) return <></>

  const sendVerification = async () => {
    setIsLoading(true);
    setErrorMEssage("");
    setSuccessMessage("");
    const response = await getApiData<{
      ok: boolean,
      message: string
    }>('/user/SendVerifyTheEmailAddress', 'POST', {
    }, "authorize", "application/json");
    setIsLoading(false);
    if (response.ok) {
      setSuccessMessage(response.message);
      setMessagesAreSend(true);
    }
    else {
      setErrorMEssage(response.message);
    }
  }

  if (user.verification.isCompleteVerification) {
    return <></>
  }

  return (
    <>
      <section className="start-verification-panel">
        <div className="left-content">
          <div className="icon">
            <img src={check_star.src} alt="check_star" />
          </div>
          <div className="content">


            {
              !user.verification.verificationEmailsAreSent && <>
                <div className="title">Build Trust with a Verified Profile</div>
                <div className="description">Verification helps families recognise trusted providers while giving your services better visibility across Gentle Road.</div>
              </>
            }
            {
              (
                user.verification.verificationEmailsAreSent
              ) && <>
                <div className="title">Your verification messages have been sent to your email address.</div>
                {
                  !user.verification.email && <div className="description">Please check your email and click on the verification link to complete the verification process. If you did not receive the email, please click on the "Start Verification" button again.</div>
                }
                {
                  user.verification.email && <div className="description">Your email address is verified.</div>
                }
                {
                  user.verification.email && !user.verification.isVerifiedByAdmin && <div className="description">Gentle Road admin is checking your details and will verify your account as soon as possible. You will receive a notification once your verification is completed.</div>
                }
              </>
            }

            {
              errorMessage !== "" && <div className="description text-danger">Verification messages were not sent, please try again later. Error: {errorMessage}</div>
            }
            {
              successMessage !== "" && <div className="description text-success">Verification messages were sent, please check your email. In case you did not receive the email, please click on the "Start Verification" button again.</div>
            }

          </div>
        </div>

        <div className="actions">
          {
            !user.verification.email && <Button variant="success" size="sm" type="button" className={`${isLoading ? "loading" : ""}`} disabled={
              messagesAreSend
            } onClick={() => {
              sendVerification();
            }}>Start Verification</Button>
          }

        </div>
      </section>
    </>
  )
}