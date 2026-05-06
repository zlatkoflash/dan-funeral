'use client';

import Image from "next/image";
import { ClipboardEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  Button, Col, Container, Modal,
  ModalBody,
  Row,
  // Row,
  // ModalFooter, ModalHeader 
} from "react-bootstrap";
import { usePathname } from 'next/navigation';
import iconSuccess from "@/assets/images/circle-green-Icon-check.svg";



import illustration from './../../../assets/images/auth-illustration.jpg';
// import TextInput from "@/components/forms/Input";
// import Link from "next/link";
import ModalUserAuthSingUp from "./ModalUserAuthSingUp";
import ModalUserAuthSingIn from "./ModalUserAuthSingIn";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { redirect } from 'next/navigation';
import TextInput from "@/components/forms/Input";
import { getApiData } from "@/utils/api";
import { isValidEmail, validateString } from "@/components/forms/inputValidation";
import Link from "next/link";

export interface IModalUserAuthProps {
  disabledClosing?: boolean;
  forLandingPage?: boolean;
  showAlwaysVisible?: boolean;
}

export default function ModalForgotPassword(props: IModalUserAuthProps) {


  const {
    user,
    showAuthModal,
    setShowAuthModal
  } = useAuth();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);



  const pathname = usePathname();
  // console.log("modal user auth pathname:", pathname);
  const [show, set_show] = useState<boolean>(false);
  const handleClose = () => {
    set_show(false);
    if (props.forLandingPage) {
      setShowAuthModal(false);
    }

  }
  /*const handleShow = (e: any) => {
    set_show(true);
  }*/
  const modalIsVisible = () => {
    return (showAuthModal || props.showAlwaysVisible);
  }
  // const [activeForm, set_activeForm] = useState<'signup' | 'login'>("login");
  // const [activeAuthPage, set_activeAuthPage] = useState<'signin+signup' | 'forgot-password'>("signin+signup");
  const [loading, set_loading] = useState<boolean>(false);
  const [error, set_error] = useState<string>("");
  const [statusContent, set_statusContent] = useState<'enter-email' | 'enter-passcode' | 'set-new-password' | 'success'>(
    "enter-email"
    // "enter-passcode"
  );
  const [confirmation_code_id, set_confirmation_code_id] = useState<string>("");

  const [activeEmail, set_activeEmail] = useState<string>("");


  useEffect(() => {
    console.log("Modal is made...");
  }, []);

  useEffect(() => {
    // console.log("login/signup model is not showing, demo showing is disabled");

    // console.log("pathname.indexOf('/Dashboard') !== -1 && user === null:", pathname.indexOf('/Dashboard') !== -1 && user === null);
    // console.log("user === null:", user === null);
    // console.log("pathname.indexOf('/Dashboard') !== -1:", pathname.indexOf('/Dashboard') !== -1);
    set_show(
      pathname.indexOf('/Dashboard') !== -1 || showAuthModal === true
      // && user === null
    );
  }, [showAuthModal]);
  useEffect(() => {
    if (user !== null) {
      handleClose();
    }
  }, [user]);

  if (!isMounted) {
    return null;
  }

  /*if (props.forLandingPage === true && showAuthModal !== true) {
    return null;
  }*/


  {
    // this modal is for sign in and sign up
  }

  /*if (activeAuthPage === "forgot-password") {
    return <ModalForgotPassword />
  }*/

  return <div>

    {/*<Button variant="primary" onClick={handleShow}>
      Launch demo modal
    </Button>*/}

    <Modal className="modal-z modal-auth modal-forgot-password"
      // show={show}
      show={
        // showAuthModal || props.showAlwaysVisible
        modalIsVisible()
      }
      onHide={handleClose}
      centered={true}
      // backdrop=""
      backdrop={props.disabledClosing ? "static" : true}
    >
      {/*<ModalHeader closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </ModalHeader>*/}

      {
        /*props.disabledClosing !== true && <div className="header-buttons">
          <button className="z-btn-close-modal" type="button" onClick={handleClose}></button>
        </div>*/
      }
      <div className="header-buttons">
        {
          props.showAlwaysVisible !== true && <button className="z-btn-close-modal" type="button" onClick={() => {
            if (window.location.href.indexOf('/Dashboard') !== -1) {
              redirect("/");
            }
            else {

              handleClose();
            }
          }}></button>
        }
      </div>


      <ModalBody>

        <div className="content-wrap">

          {
            statusContent === 'enter-email' && <EnterEmailForm onSubmit={(email: string) => {
              // console.log("email:", email);
              set_statusContent("enter-passcode")
              set_activeEmail(email)
            }} />
          }
          {
            statusContent === 'enter-passcode' && <EnterPasscodeForm
              email={activeEmail}
              onGoBack={() => {
                set_statusContent("enter-email")
              }}
              onVerify={(code_id: string) => {
                set_statusContent("set-new-password")
                set_confirmation_code_id(code_id)
              }}
            />
          }
          {
            statusContent === 'set-new-password' && <SetNewPasswordForm
              confirmation_code_id={confirmation_code_id}
              /*onGoBack={() => {
                set_statusContent("enter-passcode")
              }}*/
              onSuccess={() => {
                set_statusContent("success")
              }}
              onGoBack={() => {
                set_statusContent("enter-passcode")
              }}
            />
          }
          {
            statusContent === 'success' && <SuccessForm />
          }

        </div>
      </ModalBody>

    </Modal>

  </div >
}


function EnterEmailForm({
  onSubmit
}: {
  onSubmit: (email: string) => void;
}) {

  const [email, set_email] = useState<string>("");
  const [loading, set_loading] = useState<boolean>(false);
  const [error, set_error] = useState<string>("");

  const __sendCode = async () => {
    set_loading(true)
    const result = await getApiData("/user/SendCodeForResetPassword", "POST", {
      email: email
    }, "not-authorize", "application/json");

    console.log("result:", result);
    set_loading(false)

    onSubmit(email);

  }

  return <>
    <form action="" className="form-dashboard">
      <Row>
        <Col>
          <div className="heading">
            <h2 className="title">Forgot your password?</h2>
            <p>No problem. Enter the email address linked to your account and we'll send you a reset code.</p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <TextInput id="email-address" label="" onChange={(v: any) => { set_email(v.target.value) }} type="email" value={email} placeholder="Email Address" errorsCasses={[
            "required", "email"
          ]} />
        </Col>
      </Row>

      <Row className="row-footer-buttons">
        <Col className="text-center">
          <Button
            type="button" variant="success"
            className={loading ? 'loading' : ''}
            disabled={!isValidEmail(email)}
            onClick={() => {
              __sendCode();
            }} >Send Code</Button>
        </Col>
      </Row>

    </form>
  </>
}



function EnterPasscodeForm({
  email,
  onVerify,
  onGoBack
}: {
  email: string;
  onVerify: (confirmation_code_id: string) => void;
  onGoBack: () => void;
}) {
  // 1. Local state for the 6 digits
  const [passcode, set_passcode] = useState<string[]>(Array(6).fill(""));
  const [loading, set_loading] = useState<boolean>(false);
  const [error, set_error] = useState<string>("");

  // 2. Refs to handle focus movement
  const inputRefs = useRef<any[]>([]);

  // Function to move focus to a specific index
  const focusInput = (index: number) => {
    if (index >= 0 && index < 6) {
      const targetInput = inputRefs.current[index];
      if (targetInput?.focus) targetInput.focus();
      // Fallback if TextInput is a wrapper around the actual input
      else targetInput?.querySelector('input')?.focus();
    }
  };

  const handleChange = (val: string, index: number) => {
    // Only allow numeric input (take only the last character entered)
    const char = val.slice(-1);
    if (!/^\d*$/.test(char)) return;

    const newPasscode = [...passcode];
    newPasscode[index] = char;
    set_passcode(newPasscode);

    // Auto-focus next input if a digit was entered
    if (char && index < 5) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move back on backspace if current field is empty
    if (e.key === "Backspace" && !passcode[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  // 3. Handle Ctrl+V (Paste) event
  const handlePaste = (e: ClipboardEvent<HTMLFormElement>) => {
    // Prevent the default paste behavior within the focused input
    e.preventDefault();

    // Get the pasted data from the clipboard
    const pastedData = e.clipboardData.getData("text");

    // Clean data: take first 6 chars, keep only digits, split into array
    const cleanData = pastedData
      .replace(/\D/g, "") // Remove non-digits
      .slice(0, 6)        // Take max 6 digits
      .split("");         // Convert to array

    if (cleanData.length > 0) {
      const newPasscode = [...passcode];

      // Fill the state array with pasted digits
      cleanData.forEach((digit, i) => {
        if (i < 6) newPasscode[i] = digit;
      });

      set_passcode(newPasscode);

      // Determine where to place focus after paste
      const nextFocusIndex = Math.min(cleanData.length, 5);
      focusInput(nextFocusIndex);
    }
  };

  const __verify = async () => {
    const fullCode = passcode.join("");
    if (fullCode.length < 6) return set_error("Please complete the code.");

    set_loading(true);
    set_error(""); // Clear previous errors

    try {
      // 4. Implement API call to verify the code
      const result = await getApiData<{
        ok: boolean,
        message: string,
        confirmation_code_id: string,
        user_id: number
      }>(
        "/user/VerifyCodeForResettingPassword", // Replace with your actual WP endpoint
        "POST",
        {
          email: email,
          passcode: fullCode,
        },
        "not-authorize", // Assuming this matches your API setup
        "application/json"
      );

      console.log("Verification result:", result);

      if (result.ok) {
        // Code is valid, move to the next step (e.g., set new password)
        onVerify(result.confirmation_code_id);
      } else {
        // Code is invalid or expired
        set_error(result.message || "Invalid code. Please try again.");
        // Optional: Clear passcode state on failure
        // set_passcode(Array(6).fill(""));
        // focusInput(0);
      }
    } catch (err) {
      console.error("Verification error:", err);
      set_error("An unexpected error occurred. Please try again later.");
    } finally {
      set_loading(false);
    }
  };

  const __ResendThecode = async () => {
    set_loading(true);
    set_error("");
    set_passcode(Array(6).fill("")); // Clear inputs
    focusInput(0); // Focus first input

    const result = await getApiData(
      "/user/SendCodeForResetPassword",
      "POST",
      {
        email: email,
      },
      "not-authorize",
      "application/json"
    );

    console.log("result from resend:", result);

    if (result.ok) {
      set_error("A new code has been sent to your email."); // Using error state for success feedback here, or create a success state
    } else {
      set_error(result.message || "Failed to resend code.");
    }

    set_loading(false);
  };

  const isFormDisabled = loading || passcode.join("").length < 6;

  return (
    // Attach handlePaste to the form to capture the event via bubbling
    <form action="" className="form-dashboard" onPaste={handlePaste}>
      <Row>
        <Col>
          <div className="heading text-center">
            <h2 className="title">Enter your passcode</h2>
            <p>We’ve sent the code to the email <strong>{email}</strong> on your device</p>
          </div>
        </Col>
      </Row>

      <Row>
        {passcode.map((digit, key) => (
          <Col key={'pass-code-digit-' + key} >
            <TextInput
              // Attach ref to the specific index
              ref={(el: any) => (inputRefs.current[key] = el)}
              id={'pass-code-digit-' + key}
              label=""
              type="text"
              // inputMode="numeric" // Helps mobile browsers show number pad
              // pattern="\d*"       // Helps mobile browsers show number pad
              value={digit}
              placeholder=""
              inputClassName="text-center font-weight-bold"
              // style={{ fontSize: '1.5rem', height: '50px' }}
              // Pass the index to our handlers
              onChange={(e: any) => handleChange(e.target.value, key)}
              onKeyDown={(e: any) => handleKeyDown(e, key)}
              disabled={loading}
              autoComplete="one-time-code" // Helps iOS auto-fill SMS/Email codes
            />
          </Col>
        ))}
      </Row>

      <Row className="row-forgot-password">
        <Col className="d-flex justify-content-between">
          <Link href="/" style={{
            pointerEvents: loading ? "none" : "auto",
            opacity: loading ? "0.5" : "1"
          }} onClick={(e) => {
            e.preventDefault();
            if (!loading) onGoBack();
          }}>Go Back</Link>

          <Link href="/" style={{
            pointerEvents: loading ? "none" : "auto",
            opacity: loading ? "0.5" : "1"
          }} onClick={(e) => {
            e.preventDefault();
            if (!loading) __ResendThecode();
          }}>Resend Code</Link>
        </Col>
      </Row>

      {error && (
        <div className={`text-center mt-3 ${error.includes('sent') ? 'text-success' : 'text-danger'}`}>
          {error}
        </div>
      )}

      <Row className="row-footer-buttons">
        <Col className="text-center">
          <Button
            type="button"
            variant="success"
            className={loading ? 'loading' : ''}
            disabled={isFormDisabled}
            onClick={__verify}
          >
            Verify Code
          </Button>
        </Col>
      </Row>
    </form>
  );
}



function SetNewPasswordForm({
  confirmation_code_id,
  onSuccess,
  onGoBack
}: {
  confirmation_code_id: string;
  onSuccess: () => void;
  onGoBack: () => void;
}) {

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const __ChangeThePassword = async () => {

    if (newPassword !== confirmNewPassword || newPassword.length < 8) {
      setError("Passwords do not match or are too short.");
      return;
    }
    const validationPassword = validateString(newPassword, ["password"]);
    if (validationPassword !== null) {
      setError(validationPassword);
      return;
    }

    setLoading(true);
    setError("");

    const result = await getApiData(
      "/user/changePassword",
      "POST",
      {
        confirmation_code_id: confirmation_code_id,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      },
      "not-authorize",
      "application/json"
    );

    console.log("result from change password:", result);

    if (result.ok) {
      setError("Password changed successfully.");
      onSuccess();
    } else {
      setError(result.message || "Failed to change password.");
    }

    setLoading(false);
  }

  return <>

    <form action="" className="form-dashboard">
      <Row>
        <Col>
          <div className="heading text-center">
            <h2 className="title">Set a new password</h2>
            <p>Choose something secure you haven't used before.</p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <TextInput
            id="new-password"
            // label="New Password"
            type="password"
            value={newPassword}
            onChange={(e: any) => setNewPassword(e.target.value)}
            placeholder="New password"
            errorsCasses={["password"]}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <TextInput
            id="confirm-new-password"
            // label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e: any) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm password"
            errorsCasses={["password"]}
          />
        </Col>
      </Row>


      <Row className="row-forgot-password">
        <Col className="d-flex justify-content-between">
          <Link href="/" style={{
            pointerEvents: loading ? "none" : "auto",
            opacity: loading ? "0.5" : "1"
          }} onClick={(e) => {
            e.preventDefault();
            if (!loading) onGoBack();
          }}>Go Back</Link>
        </Col>
      </Row>


      <Row className="row-footer-buttons">
        <Col className="text-center">
          <div className={`text-center mb-3 ${error.includes('sent') ? 'text-success' : 'text-danger'}`}>
            {error}
          </div>
          <Button
            type="button"
            variant="success"
            className={loading ? 'loading' : ''}
            // disabled={isFormDisabled}
            onClick={__ChangeThePassword}
          >
            Change Password
          </Button>
        </Col>
      </Row>


    </form>

  </>
}


function SuccessForm() {
  return <>
    <form action="" className="form-dashboard">

      <Row className="success-icon">
        <Col>
          <Image
            src={iconSuccess}
            alt="Success"
            width={85}
            height={85}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="heading text-center">
            <h2 className="title">Password Changed!</h2>
            <p>Your password has been changed successfully.</p>
          </div>
        </Col>
      </Row>

      <Row className="row-footer-buttons">
        <Col className="text-center">
          {
            /*<Button
            type="button"
            variant="success"
            onClick={() => {
              // close modal
            }}
          >
            Go to Login
          </Button>*/
          }
          <Link href="/Dashboard/User/Auth" className="btn btn-success">Back to login</Link>
        </Col>
      </Row>
    </form>
  </>
}