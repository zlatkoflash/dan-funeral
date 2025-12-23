'use client';

import { Button, Col, Container, Row } from "react-bootstrap";
// Adjust import path as needed
import AdminSubmenuContentWrapMyProfile from "./../../content/AdminSubmenuContentWrapMyProfile";
import TextInput from "@/components/forms/Input";
import { useState } from "react";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { UpdateWPUserMetas } from "@/utils/user";
import { IDCToasterMessage, useDashboard } from "../../DashboardProvider";
import FormSearch from "@/components/forms/ReadyForms/FormSearch";

export default function DC1MyProfile() {

  const {
    user,
    setUser
  } = useAuth();

  const {
    // singleMessage,
    // setSingleMessage
  } = useDashboard()

  const [name, setName] = useState<string>(user?.full_name as string);
  const [occupation, setOccupation] = useState<string>(user?.occupation as string);
  // const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>(user?.phone as string);
  const [singleMessage, setSingleMessage] = useState<IDCToasterMessage>({
    id: '',
    message: '',
    title: '',
    type: 'success',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default browser form submission
    // Add logic here to send data to your API/backend
  };

  const [updating, setUpdating] = useState<boolean>(false);

  return (
    <AdminSubmenuContentWrapMyProfile subHeadSearchSettings={{
      breads: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Dashboard",
          link: "/Dashboard",
        },
        {
          label: "My Profile",
          link: "",
        },
      ],
      title: "My Profile",
      right_content: <FormSearch buttonSearchType="btn-text" />
    }}>
      {/* ⚠️ Added onSubmit handler and removed action="" */}
      <form onSubmit={handleSubmit} className="form-dashboard">
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
          <Row className="row-footer-buttons">
            <Col>
              {/* ✅ Changed type to "submit" to trigger the form onSubmit */}
              <Button

                variant="success"
                className={`${updating ? 'loading' : ''}`}
                type="button" onClick={async () => {
                  setUpdating(true)

                  await UpdateWPUserMetas([
                    {
                      var: 'full_name',
                      val: name
                    },
                    {
                      var: 'occupation',
                      val: occupation
                    },
                    {
                      var: 'phone',
                      val: phone
                    }
                  ])
                  console.log(user);
                  if (user) {
                    setUser({
                      ...user,
                      full_name: name as string,
                      occupation: occupation as string,
                      phone: phone as string
                    })
                  }


                  setUpdating(false)
                  setSingleMessage({
                    type: 'success',
                    message: 'Profile updated successfully',
                    title: 'Success',
                    id: '1'
                  })
                }}>Update Profile</Button>
            </Col>
          </Row>

          {
            singleMessage.id !== '' && <Row>
              <Col>
                <div className="text-let text-success">
                  {singleMessage.message}
                </div>
              </Col>
            </Row>
          }

        </Container>
      </form>
    </AdminSubmenuContentWrapMyProfile>
  );
}