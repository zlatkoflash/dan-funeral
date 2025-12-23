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

  const [email, set_email] = useState<string>("");
  const [password, set_password] = useState<string>("");
  const [name, set_name] = useState<string>("");
  const [last_name, set_last_name] = useState<string>("");
  const [phone, set_phone] = useState<string>("");
  const [bussines_name, set_bussines_name] = useState<string>("");

  const ___TrySignUp = async () => {
    set_error("")
    set_loading(true);
    const results = await signupAction({
      email,
      password,
      name,
      last_name,
      phone,
      bussines_name
    });
    console.log("Results after signup:", results);
    if (results.ok !== true) {
      set_error(results.message)
      set_loading(false);
    }
    else {
      await loginAction(email, password)
    }
  }

  return <form action="" className="form-dashboard">

    <Container>
      <Row>
        <Col>
          <h2 className="title">Create Your Account</h2>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <TextInput id="" label="" onChange={(e: any) => { set_name(e.target.value) }} errorsCasses={["required"]} type="text" value={name} placeholder="First Name" />
        </Col>
        <Col md={6}>
          <TextInput id="" label="" onChange={(e: any) => { set_last_name(e.target.value) }} errorsCasses={["required"]} type="text" value={last_name} placeholder="Last Name" />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <TextInput id="" label="" onChange={(e: any) => { set_bussines_name(e.target.value) }} errorsCasses={["required"]} type="text" value={bussines_name} placeholder="Company Name" />
        </Col>
        <Col md={6}>
          <TextInput id="" label="" onChange={(e: any) => { set_email(e.target.value) }} errorsCasses={["required", "email"]} type="email" value={email} placeholder="Email Address" />
        </Col>
      </Row>
      <Row className="x2-margin">
        <Col md={6}>
          <TextInput id="" label="" onChange={(e: any) => { set_phone(e.target.value) }} errorsCasses={["required"]} type="text" value={phone} placeholder="Phone Number" />
        </Col>
        <Col md={6}>
          <TextInput id="" label="" onChange={(e: any) => { set_password(e.target.value) }} errorsCasses={["required", "password"]} type="password" value={password} placeholder="Password" />
        </Col>
      </Row>
      <Row className="row-for-agree">
        <Col className="text-center">
          By clicking 'Sign Up', I agree to GentleRoad’s <Link href="/privacypolicy" target="_blank">Privacy Policy</Link> and <Link href="/terms-of-service" target="_blank">Terms of Use</Link>
        </Col>
      </Row>
      <Row className="row-footer-buttons">
        <Col className="text-center">
          <Button type="button" variant="success" className={loading ? 'loading' : ''} onClick={() => {
            ___TrySignUp();
          }}>Sign Up</Button>
          {
            error !== '' && <div className="text-center text-danger mt-2">
              {error}
            </div>
          }
        </Col>
      </Row>
      <Row className="row-already-login-footer">
        <Col>
          Already have an account? <Link className="" href="/" onClick={(e) => {
            e.preventDefault()
            data.setAuthForm("login")
          }}>Login</Link>
        </Col>
      </Row>
    </Container>
  </form>
}