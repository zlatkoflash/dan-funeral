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

export interface IModalUserAuthProps {
  disabledClosing?: boolean;
  forLandingPage?: boolean;
  showAlwaysVisible?: boolean;
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
  console.log("pathname:", pathname);
  const [show, set_show] = useState<boolean>(false);
  const handleClose = () => {
    set_show(false);
    if (props.forLandingPage) {
      setShowAuthModal(false);
    }

  }
  const handleShow = (e: any) => {
    set_show(true);
  }
  const [activeForm, set_activeForm] = useState<'signup' | 'login'>("login");

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

  return <div>

    {/*<Button variant="primary" onClick={handleShow}>
      Launch demo modal
    </Button>*/}

    <Modal className="modal-z modal-auth"
      // show={show}
      show={showAuthModal || props.showAlwaysVisible}
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
              activeForm === "signup" ?
                <ModalUserAuthSingUp setAuthForm={set_activeForm} />
                :
                <ModalUserAuthSingIn setAuthForm={set_activeForm} />
            }


          </div>
        </div>
      </ModalBody>
      {/*<ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </ModalFooter>*/}
    </Modal>

  </div >
}