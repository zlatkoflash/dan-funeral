'use client';

import { Button, Col, Container, Row } from "react-bootstrap";
// Adjust import path as needed
import AdminSubmenuContentWrapMyProfile from "../../content/AdminSubmenuContentWrapMyProfile";
import TextInput from "@/components/forms/Input";
import { useState } from "react";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { UpdateWPUserMetas } from "@/utils/user";
import { IDCToasterMessage, useDashboard } from "../../DashboardProvider";
import FormSearch from "@/components/forms/ReadyForms/FormSearch";
import { getApiData } from "@/utils/api";

export default function DC2MyBusinessProfile() {

  const {
    user,
    setUser
  } = useAuth()

  // 1. Updated State Variables for Business Profile
  const [businessName, setBusinessName] = useState<string>(user?.official_business_name || '');
  const [businessURL, setBusinessURL] = useState<string>(user?.business_url || '');
  const [businessEmail, setBusinessEmail] = useState<string>(user?.business_email || '');
  const [businessPhone, setBusinessPhone] = useState<string>(user?.business_phone || '');
  const [businessLocation, setBusinessLocation] = useState<string>(user?.business_location || ''); // New field
  const [businessAddress, setBusinessAddress] = useState<string>(user?.business_address || '');   // New field
  const [businessDescription, setBusinessDescription] = useState<string>(user?.business_description || '');

  // const { singleMessage, setSingleMessage, loading, setLoading } = useDashboard();

  const [loading, setLoading] = useState<boolean>(false);
  const [singleMessage, setSingleMessage] = useState<IDCToasterMessage>({
    id: '',
    message: '',
    title: '',
    type: 'success',
  });

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
          label: "Business Profile",
          link: "",
        },
      ],
      title: "Business Profile",
      right_content: <FormSearch buttonSearchType="btn-text" />
    }}>
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
              <TextInput type="rich-text-editor" id="" label="" onChange={(content: string) => {
                setBusinessDescription(content)
              }} value={businessDescription} />
            </Col>
          </Row>

          {/* Footer Row */}
          <Row className="row-footer-buttons">
            <Col>

              <Button variant="success" className={`${loading ? 'loading' : ''}`} type="button" onClick={async () => {
                console.log("Loading");
                // return;
                setLoading(true);

                await UpdateWPUserMetas([
                  {
                    var: 'official_business_name',
                    val: businessName
                  },
                  {
                    var: 'business_url',
                    val: businessURL
                  },
                  {
                    var: 'business_email',
                    val: businessEmail
                  },
                  {
                    var: 'business_phone',
                    val: businessPhone
                  },
                  {
                    var: 'business_location',
                    val: businessLocation
                  },
                  {
                    var: 'business_address',
                    val: businessAddress
                  },
                  {
                    var: 'business_description',
                    val: businessDescription
                  }
                ]);
                if (user !== null) {

                  setUser({
                    ...user,
                    official_business_name: businessName as string,
                    business_url: businessURL as string,
                    business_email: businessEmail as string,
                    business_phone: businessPhone as string,
                    business_location: businessLocation as string,
                    business_address: businessAddress as string,
                    business_description: businessDescription as string
                  })
                }
                setLoading(false);
                setSingleMessage({
                  type: 'success',
                  message: 'Business profile updated successfully',
                  title: 'Success',
                  id: '1'
                })
              }}>Update Business Profile</Button>
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