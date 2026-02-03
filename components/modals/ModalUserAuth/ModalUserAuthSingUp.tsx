'use client'

import TextInput from "@/components/forms/Input"
import { loginAction, signupAction } from "@/utils/apiServer"
import Link from "next/link"
import { useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"

export interface IModalUserAuthSingUp {
  setAuthForm: (v: 'signup' | 'login') => void
}

export default function ModalUserAuthSingUp(data: IModalUserAuthSingUp) {

  const [loading, set_loading] = useState<boolean>(false);
  const [error, set_error] = useState<string>("");
  const [showErrors, set_showErrors] = useState<boolean>(false); // NEW: Track if button was clicked

  const [email, set_email] = useState<string>("");
  const [password, set_password] = useState<string>("");
  const [name, set_name] = useState<string>("");
  const [last_name, set_last_name] = useState<string>("");
  const [phone, set_phone] = useState<string>("");
  const [bussines_name, set_bussines_name] = useState<string>("");

  const ___TrySignUp = async () => {
    set_error("")

    // 1. Validation Check: Stop if any field is empty
    if (!email || !password || !name || !last_name || !phone || !bussines_name) {
      set_showErrors(true); // Trigger error styles in inputs
      set_error("Please fill in all required fields.");
      return; // STOP the function here
    }

    set_loading(true);

    const results = await signupAction({
      email,
      password,
      name,
      last_name,
      phone,
      bussines_name
    });

    if (results.ok !== true) {
      set_error(results.message)
      set_loading(false);
    } else {
      await loginAction(email, password)
    }
  }

  return (
    <form action="" className="form-dashboard" onSubmit={(e) => e.preventDefault()}>
      <Container>
        <Row>
          <Col>
            <h2 className="title">Create Your Account</h2>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextInput
              id="name"
              onChange={(e: any) => set_name(e.target.value)}
              errorsCasses={["required"]}
              showError={showErrors && !name} // NEW PROP
              type="text"
              value={name}
              placeholder="First Name"
            />
          </Col>
          <Col md={6}>
            <TextInput
              id="last_name"
              onChange={(e: any) => set_last_name(e.target.value)}
              errorsCasses={["required"]}
              showError={showErrors && !last_name} // NEW PROP
              type="text"
              value={last_name}
              placeholder="Last Name"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextInput
              id="business"
              onChange={(e: any) => set_bussines_name(e.target.value)}
              errorsCasses={["required"]}
              showError={showErrors && !bussines_name}
              type="text"
              value={bussines_name}
              placeholder="Company Name"
            />
          </Col>
          <Col md={6}>
            <TextInput
              id="email"
              onChange={(e: any) => set_email(e.target.value)}
              errorsCasses={["required", "email"]}
              showError={showErrors && (!email || !email.includes('@'))}
              type="email"
              value={email}
              placeholder="Email Address"
            />
          </Col>
        </Row>
        <Row className="x2-margin">
          <Col md={6}>
            <TextInput
              id="phone"
              onChange={(e: any) => set_phone(e.target.value)}
              errorsCasses={["required"]}
              showError={showErrors && !phone}
              type="text"
              value={phone}
              placeholder="Phone Number"
            />
          </Col>
          <Col md={6}>
            <TextInput
              id="password"
              onChange={(e: any) => set_password(e.target.value)}
              errorsCasses={["required", "password"]}
              showError={showErrors && !password}
              type="password"
              value={password}
              placeholder="Password"
            />
          </Col>
        </Row>

        {/* ... Rest of your Row components (Privacy Policy, Button, etc.) ... */}

        <Row className="row-footer-buttons">
          <Col className="text-center">
            <Button
              type="button"
              variant="success"
              className={loading ? 'loading' : ''}
              onClick={___TrySignUp}
            >
              Sign Up
            </Button>
            {error !== '' && (
              <div className="text-center text-danger mt-2">
                {error}
              </div>
            )}
          </Col>
        </Row>

        {/* ... Login Link ... */}
      </Container>
    </form>
  );
}