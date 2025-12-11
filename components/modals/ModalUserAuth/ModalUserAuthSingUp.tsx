'use client'

import TextInput from "@/components/forms/Input"
import Link from "next/link"
import { Button, Col, Container, Row } from "react-bootstrap"


export interface IModalUserAuthSingUp {
  setAuthForm: (v: 'signup' | 'login') => void
}

export default function ModalUserAuthSingUp(data: IModalUserAuthSingUp) {
  return <form action="" className="form-dashboard">

    <Container>
      <Row>
        <Col>
          <h2 className="title">Create Your Account</h2>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <TextInput id="" label="" onChange={() => { }} type="text" value="" placeholder="First Name" />
        </Col>
        <Col md={6}>
          <TextInput id="" label="" onChange={() => { }} type="text" value="" placeholder="Last Name" />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <TextInput id="" label="" onChange={() => { }} type="text" value="" placeholder="Company Name" />
        </Col>
        <Col md={6}>
          <TextInput id="" label="" onChange={() => { }} type="email" value="" placeholder="Email Address" />
        </Col>
      </Row>
      <Row className="x2-margin">
        <Col md={6}>
          <TextInput id="" label="" onChange={() => { }} type="text" value="" placeholder="Phone Number" />
        </Col>
        <Col md={6}>
          <TextInput id="" label="" onChange={() => { }} type="password" value="" placeholder="Password" />
        </Col>
      </Row>
      <Row className="row-for-agree">
        <Col className="text-center">
          By clicking 'Sign Up', I agree to GentleRoad’s <Link href="/">Privacy Policy</Link> and <Link href="/">Terms of Use</Link>
        </Col>
      </Row>
      <Row className="row-footer-buttons">
        <Col className="text-center">
          <Button type="button" variant="success">Sign Up</Button>
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