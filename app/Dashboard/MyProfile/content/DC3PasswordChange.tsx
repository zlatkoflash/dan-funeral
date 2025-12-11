'use client';

import { Button, Col, Container, Row } from "react-bootstrap";
// Adjust import path as needed
import AdminSubmenuContentWrapMyProfile from "./../../content/AdminSubmenuContentWrapMyProfile";
import TextInput from "@/components/forms/Input";
import { useState } from "react";

export default function DC3PasswordChange() {
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
            <Col md={12}>
              {/* Old Password Input */}
              <TextInput
                id="old-password"
                label="" // As requested, no label
                onChange={(e) => { setOldPassword(e.target.value) }}
                type="password" // Use type="password" for security
                value={oldPassword}
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
                placeholder="Confirm New Password"
              />
            </Col>
          </Row>

          <Row className="row-footer-buttons">
            <Col>
              {/* Submit Button */}
              <Button variant="success" type="submit">Change Password</Button>
            </Col>
          </Row>
        </Container>
      </form>
    </AdminSubmenuContentWrapMyProfile>
  );
}