'use client';

import { Button, Col, Container, Row } from "react-bootstrap";
// Adjust import path as needed
import AdminSubmenuContentWrapMyProfile from "./../../content/AdminSubmenuContentWrapMyProfile";
import TextInput from "@/components/forms/Input";
import { useState } from "react";

export default function DC1MyProfile() {
  const [name, setName] = useState<string>('');
  const [occupation, setOccupation] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default browser form submission
    console.log('Profile Data:', { name, occupation, email, phone });
    // Add logic here to send data to your API/backend
  };

  return (
    <AdminSubmenuContentWrapMyProfile>
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
                onChange={(e) => { setEmail(e.target.value) }}
                type="email"
                value={email}
                placeholder="Email"
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
              <Button variant="success" type="submit">Update Profile</Button>
            </Col>
          </Row>
        </Container>
      </form>
    </AdminSubmenuContentWrapMyProfile>
  );
}