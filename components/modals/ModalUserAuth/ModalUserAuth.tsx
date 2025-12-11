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

export default function ModalUserAuth() {

  const {
    user
  } = useAuth();

  const pathname = usePathname();
  console.log("pathname:", pathname);
  const [show, set_show] = useState<boolean>(false);
  const handleClose = () => {
    set_show(false);
  }
  const handleShow = (e: any) => {
    set_show(true);
  }
  const [activeForm, set_activeForm] = useState<'signup' | 'login'>("signup");

  useEffect(() => {
    console.log("login/signup model is not showing, demo showing is disabled");
    set_show(pathname === "/" && user === null);
  }, []);
  useEffect(() => {
    if (user !== null) {
      handleClose();
    }
  }, [user]);

  return <div>

    {/*<Button variant="primary" onClick={handleShow}>
      Launch demo modal
    </Button>*/}

    <Modal className="modal-z modal-auth" show={show} onHide={handleClose} centered={true}>
      {/*<ModalHeader closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </ModalHeader>*/}

      <div className="header-buttons">
        <button className="z-btn-close-modal" type="button" onClick={handleClose}></button>
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

  </div>
}