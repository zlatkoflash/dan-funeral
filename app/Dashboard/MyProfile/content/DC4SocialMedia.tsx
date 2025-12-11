'use client';

import { Button, Col, Container, Row } from "react-bootstrap";
// Adjust import path as needed
import AdminSubmenuContentWrapMyProfile from "../../content/AdminSubmenuContentWrapMyProfile";
// import TextInput from "@/components/forms/Input";
import { useState } from "react";
// import Image from "next/image";

// import plusIcon from './../../../../assets/images/icon-plus.svg';
import ListSocialItemsEditor from "@/components/forms/ListItemsEdits/ListSocialItemsEditor";

export default function DS4SocialMedia() {
  // State for the new password fields
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default browser form submission

    // --- IMPORTANT Validation Logic ---
    if (newPassword !== confirmPassword) {
      console.error("New Password and Confirm Password do not match!");
      // In a real application, you would show an error message to the user here.
      return;
    }

    console.log('Password Change Data:', { oldPassword, newPassword, confirmPassword });
    // Add logic here to send data to your API/backend for password update
  };

  return (
    <AdminSubmenuContentWrapMyProfile>
      {/* Updated component name to reflect new purpose */}
      <form onSubmit={handleSubmit} className="form-dashboard">
        <Container>
          <Row>
            <Col>
              <ListSocialItemsEditor items={[
                { link: "", socialType: "facebook" },
                { link: "", socialType: "instagram" }
              ]} />
            </Col>
          </Row>


          <Row className="row-footer-buttons">
            <Col>
              {/* Submit Button */}
              <Button variant="success" type="submit">Update Social Profile</Button>
            </Col>
          </Row>
        </Container>
      </form>
    </AdminSubmenuContentWrapMyProfile>
  );
}