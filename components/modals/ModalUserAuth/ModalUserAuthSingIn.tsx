'use client'

import TextInput from "@/components/forms/Input";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";

import iconGoogle from './../../../assets/images/icon-google.svg';
import iconApple from './../../../assets/images/icon-apple.svg';
import { useState } from "react";
import { getApiData } from "@/utils/api";
import { getAccessToken, loginAction } from "@/utils/apiServer";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";

export interface IModalUserAuthSingIn {
  setAuthForm: (v: 'signup' | 'login') => void
}

export default function ModalUserAuthSingIn(data: IModalUserAuthSingIn) {

  const [email, set_email] = useState<string>("");
  const [password, set_password] = useState<string>("");
  const [loading, set_loading] = useState<boolean>(false);
  const [error, set_error] = useState<string>("");

  const {
    setUser,
    signIn
  } = useAuth();

  const ___TryLogin = async () => {
    // const accessToken = await getAccessToken();
    // console.log("accessToken:", accessToken);

    /*const checkPermission = await getApiData("/user/check-jwt-permission", "GET", {}, "authorize");
    console.log("checkPermission:", checkPermission);
    return;*/

    set_loading(true);
    /*const response = await getApiData("/user/login", "POST", {
      email,
      password
    });
    console.log("Response after login:", response);*/
    try {
      const response = await loginAction(email, password);
      console.log("response:", response);
      if (response.user !== undefined) {
        // setUser(response.user);
        signIn(response.user);
      }
      else {
        set_error('Login failed');
      }
    }
    catch (error) {
      console.log("error:", error);
      set_error('Login failed');
    }
    set_loading(false);
  }


  return <form action="" className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h2 className="title">Login to your Account</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <TextInput id="email-address" label="" onChange={(v: any) => { set_email(v.target.value) }} type="email" value={email} placeholder="Email Address" errorsCasses={[
            "required", "email"
          ]} />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextInput id="password" label="" onChange={(e: any) => {
            set_password(e.target.value)
          }} type="password" value={password} placeholder="Password" errorsCasses={[
            "required", "password"
          ]} />
        </Col>
      </Row>
      <Row className="row-forgot-password">
        <Col>
          <Link href="/">Forgot Password?</Link>
        </Col>
      </Row>
      <Row className="row-footer-buttons">
        <Col className="text-center">
          <Button type="button" variant="success" className={loading ? 'loading' : ''} onClick={() => {
            ___TryLogin()
          }} >Login</Button>
        </Col>
      </Row>

      {
        error !== '' && <Row>
          <Col>
            <div className="text-center text-danger">
              {error}
            </div>
          </Col>
        </Row>
      }

      <Row className="row-already-login-footer">
        <Col>
          Not a member yet? <Link className="" href="/" onClick={(e) => {
            e.preventDefault()
            data.setAuthForm("signup")
          }} >Sign up</Link>
        </Col>
      </Row>
      <Row className="row-social-login">
        <Col>
          <div className="heading-special">Or continue with</div>
          <div className="social-buttons">
            <Link href="">
              <Image src={iconGoogle} alt="Login with google" />
            </Link>
            <Link href="">
              <Image src={iconApple} alt="Login with google" />
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  </form>
}