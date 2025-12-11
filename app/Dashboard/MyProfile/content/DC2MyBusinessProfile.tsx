'use client';

import { Button, Col, Container, Row } from "react-bootstrap";
// Adjust import path as needed
import AdminSubmenuContentWrapMyProfile from "../../content/AdminSubmenuContentWrapMyProfile";
import TextInput from "@/components/forms/Input";
import { useState } from "react";

export default function DC2MyBusinessProfile() {
  // 1. Updated State Variables for Business Profile
  const [businessName, setBusinessName] = useState<string>('');
  const [businessURL, setBusinessURL] = useState<string>('');
  const [businessEmail, setBusinessEmail] = useState<string>('');
  const [businessPhone, setBusinessPhone] = useState<string>('');
  const [businessLocation, setBusinessLocation] = useState<string>(''); // New field
  const [businessAddress, setBusinessAddress] = useState<string>('');   // New field

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default browser form submission

    // Log all updated data
    console.log('Business Profile Data:', {
      businessName,
      businessURL,
      businessEmail,
      businessPhone,
      businessLocation,
      businessAddress,
    });
    // Add logic here to send data to your API/backend
  };

  return (
    <AdminSubmenuContentWrapMyProfile>
      <form onSubmit={handleSubmit} className="form-dashboard">
        <Container>
          {/* Row 1: Official Business Name and Business URL */}
          <Row>
            <Col md={6}>
              <TextInput
                id="business-name"
                label=""
                onChange={(e) => { setBusinessName(e.target.value) }}
                type="text"
                value={businessName}
                placeholder="Official Business Name"
              />
            </Col>
            <Col md={6}>
              <TextInput
                id="business-url"
                label=""
                onChange={(e) => { setBusinessURL(e.target.value) }}
                type="url" // Changed type to 'url'
                value={businessURL}
                placeholder="e.g., https://mybusiness.com"
              />
            </Col>
          </Row>

          {/* Row 2: Business Email and Business Phone Number */}
          <Row>
            <Col md={6}>
              <TextInput
                id="business-email"
                label=""
                onChange={(e) => { setBusinessEmail(e.target.value) }}
                type="email"
                value={businessEmail}
                placeholder="Business Email"
              />
            </Col>
            <Col md={6}>
              <TextInput
                id="business-phone"
                label=""
                onChange={(e) => { setBusinessPhone(e.target.value) }}
                type="tel" // Changed type to 'tel' for phone
                value={businessPhone}
                placeholder="Business Phone Number"
              />
            </Col>
          </Row>

          {/* New Row 3: Business Location and Business Address */}
          <Row>
            <Col md={6}>
              <TextInput
                id="business-location"
                label=""
                onChange={(e) => { setBusinessLocation(e.target.value) }}
                type="text"
                value={businessLocation}
                placeholder="City, State/Province"
              />
            </Col>
            <Col md={6}>
              <TextInput
                id="business-address"
                label=""
                onChange={(e) => { setBusinessAddress(e.target.value) }}
                type="text"
                value={businessAddress}
                placeholder="Street Address, Apt/Suite"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <TextInput type="rich-tect-editor" id="" label="" onChange={(e) => { }} value="" />
            </Col>
          </Row>

          {/* Footer Row */}
          <Row className="row-footer-buttons">
            <Col>
              <Button variant="success" type="submit">Update Business Profile</Button>
            </Col>
          </Row>
        </Container>
      </form>
    </AdminSubmenuContentWrapMyProfile>
  );
}