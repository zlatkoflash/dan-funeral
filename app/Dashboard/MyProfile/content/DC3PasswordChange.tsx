'use client';

import { Button, Col, Container, Row } from "react-bootstrap";
// Adjust import path as needed
import AdminSubmenuContentWrapMyProfile from "./../../content/AdminSubmenuContentWrapMyProfile";
import TextInput from "@/components/forms/Input";
import { useState } from "react";
import { getApiData } from "@/utils/api";
import { IDCToasterMessage, useDashboard } from "../../DashboardProvider";
import FormSearch from "@/components/forms/ReadyForms/FormSearch";

export default function DC3PasswordChange() {
  // State for the new password fields
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  // const [errorMessage, setErrorMessage] = useState<string>('');

  // const { singleMessage, setSingleMessage } = useDashboard();
  const [singleMessage, setSingleMessage] = useState<IDCToasterMessage>({
    id: '',
    message: '',
    title: '',
    type: 'success',
  });

  /*const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default browser form submission

    // --- IMPORTANT Validation Logic ---
    if (newPassword !== confirmPassword) {
      console.error("New Password and Confirm Password do not match!");
      // In a real application, you would show an error message to the user here.
      return;
    }

    console.log('Password Change Data:', { oldPassword, newPassword, confirmPassword });
    // Add logic here to send data to your API/backend for password update
  };*/

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
          link: "/Dashboard/MyProfile",
        },
        {
          label: "Password Change",
          link: "",
        },
      ],
      title: "Password Change",
      right_content: <FormSearch buttonSearchType="btn-text" />
    }}>
      {/* Updated component name to reflect new purpose */}
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

          <Row className="row-footer-buttons">
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
                const results = await getApiData("/user/change-password", "POST", {
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
    </AdminSubmenuContentWrapMyProfile>
  );
}