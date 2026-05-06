'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Button, Col, Container, Modal,
  ModalBody,
  // Row,
  // ModalFooter, ModalHeader 
} from "react-bootstrap";
import { usePathname } from 'next/navigation';



import illustration from './../../../assets/images/auth-illustration.jpg';
// import TextInput from "@/components/forms/Input";
// import Link from "next/link";
import ModalUserAuthSingUp from "./ModalUserAuthSingUp";
import ModalUserAuthSingIn from "./ModalUserAuthSingIn";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { redirect } from 'next/navigation';
import ModalForgotPassword from "./ModalForgotPassword";
import ModalUserAuthSingUpV2 from "./ModalUserAuthSingUpV2";

export interface IModalUserAuthProps {
  disabledClosing?: boolean;
  forLandingPage?: boolean;
  showAlwaysVisible?: boolean;
  children?: React.ReactNode;
}

export default function ModalUserAuth(props: IModalUserAuthProps) {


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
  const [activeForm, set_activeForm] = useState<'signup' | 'login'>("login");
  // const [activeAuthPage, set_activeAuthPage] = useState<'signin+signup' | 'forgot-password'>("signin+signup");

  useEffect(() => {
    console.log("Modal is made...");
  }, []);

  useEffect(() => {

    set_show(
      pathname.indexOf('/Dashboard') !== -1 || showAuthModal === true
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


  return <div>


    <Modal className="modal-z modal-auth"
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
        <div className="wrap-auth-content">
          <div className="left-content">
            <div className="illustration">
              <Image src={illustration} alt="Gentle Road Auth" />
            </div>
            <div className="heading-titles">
              <h4>Welcome to</h4>
              <h3>Gentle Road</h3>
              <h5>For Funeral Providers</h5>
            </div>
          </div>
          <div className="right-content">

            {
              props.children !== undefined ? props.children :
                (
                  activeForm === "signup" ?
                    // <ModalUserAuthSingUp setAuthForm={set_activeForm} />
                    <ModalUserAuthSingUpV2 setAuthForm={set_activeForm} />
                    :
                    <ModalUserAuthSingIn setAuthForm={set_activeForm} />
                )
            }
            {
              /*activeForm === "signup" ?
                // <ModalUserAuthSingUp setAuthForm={set_activeForm} />
                <ModalUserAuthSingUpV2 setAuthForm={set_activeForm} />
                :
                <ModalUserAuthSingIn setAuthForm={set_activeForm} />*/
            }


          </div>
        </div>
      </ModalBody>

    </Modal>

  </div >
}