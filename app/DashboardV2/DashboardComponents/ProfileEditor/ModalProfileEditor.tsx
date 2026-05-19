"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, Col, Container, Modal, Nav, Row } from "react-bootstrap";
import { dashboardSlice } from "@/redux/features/DashboardSlice";
import Link from "next/link";
import { useState } from "react";
import CoverProfileEditor from "./CoverProfileEditor";
import TextInput from "@/components/forms/Input";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { getApiData } from "@/utils/api";
import { IDCToasterMessage } from "@/app/Dashboard/DashboardProvider";
import PlansVersion2 from "../PlansVersion2/PlansVersion2";

export default function ModalProfileEditor() {

  const dispatch = useAppDispatch();
  const showModal = useAppSelector((state) => state.dashboard.modalShow_ProfileDetails);
  const activeTab = showModal.type;

  const navigationMap: { key: "my-profile" | "bussiness" | "password" | "membership", label: string, path: string }[] = [
    { key: 'my-profile', label: 'My Profile', path: '/DashboardV2' },
    { key: 'bussiness', label: 'Business Profile', path: '/DashboardV2/EditBusiness/LocationsAndCategories' },
    { key: 'password', label: 'Password', path: '/DashboardV2/EditBusiness/MediaGallery' },
    { key: 'membership', label: 'Membership', path: '/DashboardV2/EditBusiness/ServicesAndPrices' }
  ];

  // const activeTab = "my-profile";
  // const [activeTab, setActiveTab] = useState<"my-profile" | "bussiness" | "password" | "membership">("my-profile");


  return (
    <>
      <Modal
        show={showModal.show}
        onHide={() => {
          // dispatch(dashboardSlice.actions.setModalPlansShow(false))
          dispatch(dashboardSlice.actions.setModalShow_ProfileDetails({
            show: false,
            type: showModal.type
          }));
        }}
        centered
        className={`modal-packages  modal-z modal-profile-editor ${showModal.type}`}
      >
        <div className="header-buttons">
          {
            <button className="z-btn-close-modal" type="button" onClick={() => {
              dispatch(dashboardSlice.actions.setModalShow_ProfileDetails({
                show: false,
                type: showModal.type
              }));
            }}></button>
          }
        </div>
        <Modal.Body className="p-4">


          <div className="business-editor-wrap">
            <div className="business-editor-content">
              <Nav variant="tabs" activeKey={activeTab} className="border-bottom-0 tabs-profile-editor">
                {navigationMap.map((tab) => (
                  <Nav.Item key={tab.key}>
                    <Nav.Link eventKey={tab.key} as={Link} href={tab.path} onClick={(e) => {
                      e.preventDefault();
                      // setActiveTab(tab.key);
                      dispatch(dashboardSlice.actions.setModalShow_ProfileDetails({
                        show: true,
                        type: tab.key
                      }));
                    }}>
                      {tab.label}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>


            <div className="profile-tabs-content">
              {
                activeTab === "my-profile" && <MyProfileEditor />
              }
              {
                activeTab === "bussiness" && <BusinessProfileEditor />
              }
              {
                activeTab === "password" && <ChangePasswordForm />
              }
              {
                activeTab === "membership" && <PlansVersion2 />
              }
            </div>

          </div>


        </Modal.Body>
      </Modal>
    </>
  )
}


function MyProfileEditor() {

  const {
    user,
    setUser
  } = useAuth();

  const [name, setName] = useState(user?.profile.name ?? "");
  const [occupation, setOccupation] = useState(user?.profile.occupation ?? "");
  const [phone, setPhone] = useState(user?.profile.phone_number ?? "");
  const [updating, setUpdating] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const __UpdateTheProfileDetails = async () => {
    setUpdating(true);
    setSuccessMessage("");
    setErrorMessage("");

    const results = await getApiData<{
      ok: boolean;
      message: string;
    }>("/user/UpdateProfileDetails", "POST", {
      name: name,
      occupation: occupation,
      phone_number: phone
    }, "authorize", "application/json");

    console.log("result after uploading the details: ", results);

    if (results.ok) {
      setSuccessMessage(results.message);
    }
    else {
      setErrorMessage(results.message);
    }



    setUpdating(false);
  }

  return <>
    <CoverProfileEditor size="small" />

    {/* ⚠️ Added onSubmit handler and removed action="" */}
    <form onSubmit={() => { }} className="form-dashboard">
      <Container>
        <Row>
          <Col md={6}>
            {/* ✅ Fixed id, label, and added state management */}
            <TextInput
              id="profile-name"
              label=""
              onChange={(e) => { setName(e.target.value) }}
              type="text"
              value={name}
              placeholder="Name"
            />
          </Col>
          <Col md={6}>
            {/* ✅ Fixed id, label, and added state management */}
            <TextInput
              id="profile-occupation"
              label=""
              onChange={(e) => { setOccupation(e.target.value) }}
              type="text"
              value={occupation}
              placeholder="Occupation"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            {/* ✅ Fixed id, label, and added state management */}
            <TextInput
              id="profile-email"
              label=""
              onChange={(e) => {
                // setEmail(e.target.value)
              }}
              type="email"
              value={user?.email as string}
              placeholder="Email"
              disabled={true}
            />
          </Col>
          <Col md={6}>
            {/* ✅ Fixed id, label, and added state management */}
            <TextInput
              id="profile-phone"
              label=""
              onChange={(e) => { setPhone(e.target.value) }}
              type="tel"
              value={phone}
              placeholder="Phone Number"
            />
          </Col>
        </Row>
        <Row className="row-buttons">
          <Col>
            {/* ✅ Changed type to "submit" to trigger the form onSubmit */}
            <Button

              variant="warning"
              className={`${updating ? 'loading' : ''}`}
              type="button" onClick={() => {


                __UpdateTheProfileDetails();

              }}>Update Profile</Button>
          </Col>
        </Row>

        {
          /*singleMessage.id !== '' && <Row>
            <Col>
              <div className="text-let text-success">
                {singleMessage.message}
              </div>
            </Col>
          </Row>*/
        }
        {
          successMessage !== "" && <Row>
            <Col>
              <div className="text-let text-success">
                {successMessage}
              </div>
            </Col>
          </Row>
        }
        {
          errorMessage !== "" && <Row>
            <Col>
              <div className="text-let text-danger">
                {errorMessage}
              </div>
            </Col>
          </Row>
        }

      </Container>
    </form>

  </>
}


function BusinessProfileEditor() {

  const {
    user
  } = useAuth();

  if (user === null) {
    return <></>
  }

  const [official_business_name, setOfficial_business_name] = useState(user?.business_profile?.official_business_name ?? "");
  const [business_url, setBusiness_url] = useState(user?.business_profile?.business_url ?? "");
  const [business_email, setBusiness_email] = useState(user?.business_profile?.business_email ?? "");
  const [business_phone, setBusiness_phone] = useState(user?.business_profile?.business_phone_number ?? "");
  const [business_location, setBusiness_location] = useState(user?.business_profile?.business_location ?? "");
  const [business_address, setBusiness_address] = useState(user?.business_profile?.business_address ?? "");
  const [business_description, setBusiness_description] = useState(user?.business_description ?? "");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updating, setUpdating] = useState(false);

  const __UpdateTheProfileDetails = async () => {
    setMessage("");
    setErrorMessage("");

    setUpdating(true);

    const details = {
      official_business_name: official_business_name,
      business_url: business_url,
      business_email: business_email,
      business_phone_number: business_phone,
      business_location: business_location,
      business_address: business_address,
      business_description: business_description
    };
    console.log("details:", details);
    const results = await getApiData<{
      ok: boolean;
      message: string;
    }>("/user/UpdateBusinessDetails", "POST", details, "authorize", "application/json");

    console.log("result after uploading the details: ", results);

    if (results.ok) {
      setMessage(results.message);
    }
    else {
      setErrorMessage(results.message);
    }

    setUpdating(false);
  }

  return <>
    <form onSubmit={() => { }} className="form-dashboard">
      <Container>
        <Row>
          <Col md={6}>
            <TextInput
              id="business-name"
              label=""
              onChange={(e) => { setOfficial_business_name(e.target.value) }} // TODO: Implement state management
              type="text"
              value={official_business_name}
              placeholder="Business Name"
            />
          </Col>
          <Col md={6}>
            <TextInput
              id="business-url"
              label=""
              onChange={(e) => { setBusiness_url(e.target.value) }} // TODO: Implement state management
              type="url"
              value={business_url}
              placeholder="Business URL"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextInput
              id="business-email"
              label=""
              onChange={(e) => { setBusiness_email(e.target.value) }} // TODO: Implement state management
              type="email"
              value={business_email}
              placeholder="Business Email"
            />
          </Col>
          <Col md={6}>
            <TextInput
              id="business-phone"
              label=""
              onChange={(e) => { setBusiness_phone(e.target.value) }} // TODO: Implement state management
              type="tel"
              value={business_phone}
              placeholder="Business Phone Number"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextInput
              id="business-location"
              label=""
              onChange={(e) => { setBusiness_location(e.target.value) }} // TODO: Implement state management
              type="text"
              value={business_location}
              placeholder="Business Location"
            />
          </Col>
          <Col md={6}>
            <TextInput
              id="business-address"
              label=""
              onChange={(e) => { setBusiness_address(e.target.value) }} // TODO: Implement state management
              type="text"
              value={business_address}
              placeholder="Business Address"
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <TextInput
              id="business-description"
              label=""
              onChange={(text) => { setBusiness_description(text) }} // TODO: Implement state management
              type="rich-text-editor"
              value={business_description}
              placeholder="Business Description"
            />
          </Col>
        </Row>
        <Row className="row-buttons">
          <Col>
            {/* ✅ Changed type to "submit" to trigger the form onSubmit */}
            <Button

              variant="warning"
              className={`${updating ? 'loading' : ''}`}
              type="button" onClick={() => {


                __UpdateTheProfileDetails();

              }}>Update Profile</Button>
          </Col>
        </Row>

        {
          message !== "" && <Row>
            <Col>
              <div className="text-let text-success">
                {message}
              </div>
            </Col>
          </Row>
        }
        {
          errorMessage !== "" && <Row>
            <Col>
              <div className="text-let text-danger">
                {errorMessage}
              </div>
            </Col>
          </Row>
        }
      </Container>
    </form>
  </>
}


function ChangePasswordForm() {


  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const [singleMessage, setSingleMessage] = useState<IDCToasterMessage>({
    id: '',
    message: '',
    title: '',
    type: 'success',
  });

  return <>
    <form
      // onSubmit={handleSubmit}
      className="form-dashboard"
    >
      <Container>
        <Row>
          <Col md={12}>
            {/* Old Password Input */}
            <TextInput
              id="old-password"
              label="" // As requested, no label
              onChange={(e) => { setOldPassword(e.target.value) }}
              type="password" // Use type="password" for security
              value={oldPassword}
              errorsCasses={["password"]}
              placeholder="Old Password"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            {/* New Password Input */}
            <TextInput
              id="new-password"
              label="" // As requested, no label
              onChange={(e) => { setNewPassword(e.target.value) }}
              type="password" // Use type="password" for security
              value={newPassword}
              errorsCasses={["password"]}
              placeholder="New Password"
            />
          </Col>
          <Col md={6}>
            {/* Confirm New Password Input */}
            <TextInput
              id="confirm-password"
              label="" // As requested, no label
              onChange={(e) => { setConfirmPassword(e.target.value) }}
              type="password" // Use type="password" for security
              value={confirmPassword}
              errorsCasses={["password"]}
              placeholder="Confirm New Password"
            />
          </Col>
        </Row>
        {
          singleMessage.message !== '' && (
            <Row>
              <Col>
                <p className={singleMessage.type === 'error' ? "text-danger" : "text-success"}>{singleMessage.message}</p>
              </Col>
            </Row>
          )
        }

        <Row className="row-buttons">
          <Col>
            {/* Submit Button */}
            <Button variant="success" className={loading ? "loading" : ""} type="button" onClick={async () => {
              if (newPassword !== confirmPassword) {
                // toast.error("New Password and Confirm Password do not match!");
                setSingleMessage({
                  type: 'error',
                  message: 'New Password and Confirm Password do not match!',
                  title: 'Error',
                  id: 'error-1',
                })
                return;
              }
              else {
                setSingleMessage({
                  type: 'success',
                  message: '',
                  title: '',
                  id: '',
                })
              }
              setLoading(true)
              const results = await getApiData<{
                ok: boolean;
                message: string;
              }>("/user/change-password", "POST", {
                old_password: oldPassword,
                new_password: newPassword,
              }, 'authorize');
              setLoading(false)
              console.log("Results after changing the password:", results);
              if (results.ok !== true) {
                setSingleMessage({
                  type: 'error',
                  message: results.message,
                  title: 'Error',
                  id: 'error-1',
                })
              }
              else {
                setSingleMessage({
                  type: 'success',
                  message: 'Password is changed successfully!',
                  title: 'Success',
                  id: 'success-1',
                })
              }
            }}>Change Password</Button>
          </Col>
        </Row>
      </Container>
    </form>
  </>
}