"use client";

import TextInput, { TextInputSelect } from "@/components/forms/Input";
import { getApiData } from "@/utils/api";
import { EmailIsValid } from "@/utils/strings";
import { useState } from "react";
import { Container, Row, Col, Alert, Card, Form, Button } from "react-bootstrap";

export default function FuneralDirectoryContact(
  { details }: {
    details: {
      // use the example and create an interface
      email_to: string;
      phone_number_call: string;
      post__page_template: string;
      working_days_label: string;

    }
  }
) {
  const [inquiryType, setInquiryType] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Fully controlled form states
  const [businessName, setBusinessName] = useState<string>("");
  const [listingUrl, setListingUrl] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  const [error, errorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {

    errorMessage("");

    if (inquiryType === "") {
      errorMessage("Please select inquiry type");
      return;
    }
    if (fullName === "") {
      errorMessage("Please enter your full name");
      return;
    }
    if (!EmailIsValid(email)) {
      errorMessage("Please enter a valid email address");
      return;
    }
    if (message === "") {
      errorMessage("Please enter your message");
      return;
    }

    e.preventDefault();
    setLoading(true);
    // call api
    const result = await getApiData<{
      ok: boolean;
      message: string;
    }>("/listings/ContactForm_SendMessage", "POST", {
      'mailTo': details.email_to,
      'inquiryType': inquiryType,
      'businessName': businessName,
      'listingUrl': listingUrl,
      'fullName': fullName,
      'email': email,
      'message': message,
    }, "not-authorize", "application/json");


    console.log("result:", result);

    if (result.ok === true) {
      setSubmitted(true)
    } else {
      errorMessage("Something went wrong, please try again later");
    }
    setLoading(false);


  };

  return (
    <section className="contact-page">
      <Container className="py-5 text-secondary main-directory-layout small">

        {/* BRAND HEADER */}
        <div className="text-center mb-5 header-container mx-auto" style={{ maxWidth: 'calc(70*var(--delta))' }}>
          <h1 className="fw-bold text-dark mb-2">
            Contact Our Directory Support
          </h1>
          <p className="text-muted mx-auto subtitle-text">
            The Complete Directory for Funeral & End-of-Life Planning. From trusted funeral homes and
            cremation providers to officiants, legal support, and memorial products, find everything you need locally.
          </p>
        </div>

        {/* SECTION 1: URGENT CARE INTAKE */}
        <Alert variant="danger" className="border-0 rounded-4 p-4 mb-5 shadow-sm d-flex align-items-start gap-3 text-danger-heading mx-auto" style={{ maxWidth: 'calc(70*var(--delta))' }}>
          {
            /*<div className="bg-white text-danger rounded-circle px-2 py-1 d-inline-flex shadow-sm mt-1 fw-bold fs-5 emergency-icon">
            &#9742;
          </div>*/
          }
          <div>
            <Alert.Heading as="h4" className="fw-bold mb-1 urgent-heading ">
              ☎ Has a death recently occurred?
            </Alert.Heading>
            <p className="mb-0 small  opacity-75">
              If you need to coordinate immediate service arrangements with a local funeral home or require urgent care assistance,
              please call our emergency careline directly at <a href={`tel:${details.phone_number_call}`}><strong className="">{details.phone_number_call}</strong></a>. Available 24/7.
            </p>
          </div>
        </Alert>

        {/* SECTION 2: MAIN CONTENT SPLIT */}
        <Row className="g-5">

          {/* LEFT COLUMN: THE DIRECTORY INTENT FORM */}
          <Col lg={7}>
            <Card className="p-4 border- border-secondary-subtle rounded-4 shadow-sm bg-white h-100" style={{ border: "none" }}>
              {submitted ? (
                <Card.Body className="text-center py-5 my-auto">
                  <div className="text-success mb-3 fs-1 success-checkmark d-inline-flex justify-content-center" style={{
                    width: "calc(12*var(--delta))",
                    height: "auto"
                  }}>
                    <svg viewBox="0 0 100 100" className="" style={{
                      width: "100%"
                    }} xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="white"></circle><path d="M32 52 L44 64 L68 36" fill="none" stroke="#6b7c67" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </div>
                  <Card.Title as="h3" className="fw-bold text-dark">Message Safely Received</Card.Title>
                  <p className="text-muted small px-4 mb-0">
                    Thank you for reaching out to our directory team. We will review your details and connect you with help within 12 hours.
                  </p>
                </Card.Body>
              ) : (
                <Form onSubmit={(e) => {
                  e.preventDefault()
                }} >
                  <h2 className="h4 fw-bold text-dark mb-1 form-title">
                    Send a Message
                  </h2>
                  <p className="text-muted small mb-4">
                    Select your path below so we can route your message to the correct directory specialist.
                  </p>

                  {/* Dynamic Directory Category Selector */}
                  <Form.Group className="mb-3" controlId="directoryInquirySelector">
                    <Form.Label className="small fw-bold text-dark">
                      How can we help you navigate our services?
                    </Form.Label>
                    {
                      /*<Form.Select
                      className="shadow-none py-2 bg-light border-secondary-subtle"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      required
                    >
                      <option value="" disabled>Choose an option...</option>
                      <option value="consumer-help">I am trying to connect with a listed provider (Funeral home, Cremation, Officiant)</option>
                      <option value="provider-help">I am a provider looking to claim, update, or create a listing</option>
                      <option value="dispute">Report a listing error, inaccurate pricing, or business profile issues</option>
                      <option value="general">General pre-planning questions or app feedback</option>
                    </Form.Select>

                    <TextInputSelect
                      options={[
                        { value: "", label: "Choose an option..." },
                        { value: "consumer-help", label: "I am trying to connect with a listed provider (Funeral home, Cremation, Officiant)" },
                        { value: "provider-help", label: "I am a provider looking to claim, update, or create a listing" },
                        { value: "dispute", label: "Report a listing error, inaccurate pricing, or business profile issues" },
                        { value: "general", label: "General pre-planning questions or app feedback" }
                      ]}
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      id=""
                    />*/
                    }

                    <TextInput
                      type="select"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      id=""
                      options={[
                        { value: "", label: "Choose an option..." },
                        { value: "consumer-help", label: "I am trying to connect with a listed provider (Funeral home, Cremation, Officiant)" },
                        { value: "provider-help", label: "I am a provider looking to claim, update, or create a listing" },
                        { value: "dispute", label: "Report a listing error, inaccurate pricing, or business profile issues" },
                        { value: "general", label: "General pre-planning questions or app feedback" }
                      ]}
                    />
                  </Form.Group>

                  {/* Contextual Guidance Field for Directory Buyers */}
                  {inquiryType === "consumer-help" && (
                    <div className="mb-3 p-3 bg-light rounded-3 border text-start contextual-guidance-box">
                      <Form.Group controlId="contextualBusinessName">
                        <Form.Label className="small fw-bold text-dark">
                          Business or Product Name (If applicable)
                        </Form.Label>
                        {
                          /*<Form.Control
                          type="text"
                          className="shadow-none bg-white mb-2"
                          placeholder="e.g., Evergreen Cremation Services or Local Memorials"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                        />*/
                        }
                        <TextInput
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          id=""
                          placeholder="e.g., Evergreen Cremation Services or Local Memorials"
                        />
                      </Form.Group>
                      <Form.Text className="text-muted tip-text">
                        💡 <strong>Tip:</strong> If you are looking to book service dates, ask about product inventory, or clarify local legal options, contacting the provider directly using the matching button on their directory listing profile yields the fastest response.
                      </Form.Text>
                    </div>
                  )}

                  {/* Contextual Guidance Field for Fraud / Error Reporting */}
                  {inquiryType === "dispute" && (
                    <div className="mb-3 p-3 bg-light rounded-3 border context-dispute-box">
                      <Form.Group controlId="contextualListingUrl">
                        <Form.Label className="small fw-bold text-danger">
                          Link to the Listing Profile URL
                        </Form.Label>
                        {
                          /*<Form.Control
                          type="url"
                          className="shadow-none bg-white border-danger-subtle"
                          placeholder="https://yourdirectory.com/listings/business-name"
                          required
                          value={listingUrl}
                          onChange={(e) => setListingUrl(e.target.value)}
                        />*/
                        }
                        <TextInput
                          type="textarea"
                          value={listingUrl}
                          onChange={(e) => setListingUrl(e.target.value)}
                          id=""
                          placeholder="https://yourdirectory.com/listings/business-name"
                        /*required={true}
                        errorsCasses={[
                          {
                            type: "empty",
                            message: "Please enter a listing URL"
                          },
                          {
                            type: "url",
                            message: "Please enter a valid URL"
                          }
                        ]}*/
                        />
                      </Form.Group>
                    </div>
                  )}

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="senderFullName">
                        <Form.Label className="small fw-bold text-dark">Your Full Name</Form.Label>
                        {
                          /*<Form.Control
                          type="text"
                          className="shadow-none py-2"
                          placeholder="Jane Doe"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />*/
                        }
                        <TextInput
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          id=""
                          placeholder="Jane Doe"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="senderEmail">
                        <Form.Label className="small fw-bold text-dark">Email Address</Form.Label>
                        {
                          /*<Form.Control
                          type="email"
                          className="shadow-none py-2"
                          placeholder="jane@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />*/
                        }
                        <TextInput
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id=""
                          placeholder="jane@example.com"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4" controlId="senderMessageDetails">
                    <Form.Label className="small fw-bold text-dark">Message Details</Form.Label>
                    {
                      /*<Form.Control
                      as="textarea"
                      className="shadow-none"
                      rows={4}
                      placeholder="Please provide any useful context regarding your end-of-life planning needs..."
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />*/
                    }
                    <TextInput
                      type="textarea"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      id=""
                      placeholder="Please provide any useful context regarding your end-of-life planning needs..."
                    />
                  </Form.Group>


                  {
                    !submitted && <Button
                      type="button"
                      variant="success"
                      className={`w-100 ${loading ? "loading" : ""}`}
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      Submit Inquiry
                    </Button>
                  }


                  {
                    error &&
                    // do it with simple paragraph
                    <p className="text-danger small mt-3">{error}</p>
                  }

                  {
                    submitted && (
                      <p className="text-success small mt-3">Thank you for your message! We will get back to you as soon as possible.</p>
                    )
                  }


                </Form>
              )}
            </Card>
          </Col>

          {/* RIGHT COLUMN: PROVIDER & DIRECTORY PARTNERS */}
          <Col lg={5} className="d-flex flex-column justify-content-between gap-4 sidebar-layout">

            {/* Box 1: Directory Providers / Businesses */}
            <Card className="p-4 border- border-secondary-subtle rounded-4 shadow-sm bg-white professional-card" style={{ border: "none" }}>
              <Card.Body className="p-0">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="icon-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_249_541" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9"></rect></mask><g mask="url(#mask0_249_541)"><path d="M12 11.6922C11.0375 11.6922 10.2136 11.3496 9.52825 10.6642C8.84275 9.97875 8.5 9.15475 8.5 8.19225C8.5 7.22975 8.84275 6.40583 9.52825 5.7205C10.2136 5.035 11.0375 4.69225 12 4.69225C12.9625 4.69225 13.7864 5.035 14.4718 5.7205C15.1573 6.40583 15.5 7.22975 15.5 8.19225C15.5 9.15475 15.1573 9.97875 14.4718 10.6642C13.7864 11.3496 12.9625 11.6922 12 11.6922ZM4.5 17.7885V17.0845C4.5 16.5948 4.633 16.1413 4.899 15.724C5.165 15.3067 5.5205 14.9858 5.9655 14.7615C6.95383 14.277 7.95092 13.9136 8.95675 13.6712C9.96258 13.4289 10.977 13.3077 12 13.3077C13.023 13.3077 14.0374 13.4289 15.0433 13.6712C16.0491 13.9136 17.0462 14.277 18.0345 14.7615C18.4795 14.9858 18.835 15.3067 19.101 15.724C19.367 16.1413 19.5 16.5948 19.5 17.0845V17.7885C19.5 18.2102 19.3523 18.5688 19.0568 18.8645C18.7613 19.16 18.4026 19.3077 17.9808 19.3077H6.01925C5.59742 19.3077 5.23875 19.16 4.94325 18.8645C4.64775 18.5688 4.5 18.2102 4.5 17.7885ZM6 17.8077H18V17.0845C18 16.882 17.9413 16.6945 17.824 16.522C17.7067 16.3497 17.5474 16.209 17.3462 16.1C16.4846 15.6757 15.6061 15.3542 14.7107 15.1355C13.8152 14.917 12.9117 14.8077 12 14.8077C11.0883 14.8077 10.1848 14.917 9.28925 15.1355C8.39392 15.3542 7.51542 15.6757 6.65375 16.1C6.45258 16.209 6.29333 16.3497 6.176 16.522C6.05867 16.6945 6 16.882 6 17.0845V17.8077ZM12 10.1922C12.55 10.1922 13.0208 9.99641 13.4125 9.60475C13.8042 9.21308 14 8.74225 14 8.19225C14 7.64225 13.8042 7.17141 13.4125 6.77975C13.0208 6.38808 12.55 6.19225 12 6.19225C11.45 6.19225 10.9792 6.38808 10.5875 6.77975C10.1958 7.17141 10 7.64225 10 8.19225C10 8.74225 10.1958 9.21308 10.5875 9.60475C10.9792 9.99641 11.45 10.1922 12 10.1922Z" fill="#1C1B1F"></path></g></svg>
                  </span>
                  <Card.Title as="h3" className="h5 fw-bold text-dark mb-0">For End-of-Life Professionals</Card.Title>
                </div>
                <Card.Text className="text-muted small mb-3">
                  Are you a local funeral director, cremation provider, celebrant, estate lawyer, or monument artisan? Join the complete directory to expand your local digital footprint.
                </Card.Text>
                <Button
                  variant="outline-success"
                  size="sm"
                  href="/DashboardV2"
                  className=""
                >
                  List Your Business Profile &nbsp; &#10142;
                </Button>
              </Card.Body>
            </Card>

            {/* Box 2: Pre-Planning Tools */}
            <Card className="p-4 border- border-transparent rounded-4 shadow-sm bg-white resources-card" style={{ border: "none" }}>
              <Card.Body className="p-0">
                <div className="d-flex align-items-center gap-2 mb-3">

                  <span className="icon-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_249_547" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" ><rect width="24" height="24" fill="#D9D9D9"></rect></mask><g mask="url(#mask0_249_547)"><path d="M5.30775 20.5C4.81058 20.5 4.385 20.323 4.031 19.969C3.677 19.615 3.5 19.1894 3.5 18.6923V5.30775C3.5 4.81058 3.677 4.385 4.031 4.031C4.385 3.677 4.81058 3.5 5.30775 3.5H9.75775C9.82058 2.94483 10.0629 2.47275 10.4848 2.08375C10.9064 1.69458 11.4131 1.5 12.0048 1.5C12.5964 1.5 13.1032 1.69458 13.525 2.08375C13.9468 2.47275 14.1859 2.94483 14.2423 3.5H18.6923C19.1894 3.5 19.615 3.677 19.969 4.031C20.323 4.385 20.5 4.81058 20.5 5.30775V18.6923C20.5 19.1894 20.323 19.615 19.969 19.969C19.615 20.323 19.1894 20.5 18.6923 20.5H5.30775ZM5.30775 19H18.6923C18.7692 19 18.8398 18.9679 18.9038 18.9038C18.9679 18.8398 19 18.7693 19 18.6923V5.30775C19 5.23075 18.9679 5.16025 18.9038 5.09625C18.8398 5.03208 18.7692 5 18.6923 5H5.30775C5.23075 5 5.16025 5.03208 5.09625 5.09625C5.03208 5.16025 5 5.23075 5 5.30775V18.6923C5 18.7693 5.03208 18.8398 5.09625 18.9038C5.16025 18.9679 5.23075 19 5.30775 19ZM8 16.6345H13C13.2125 16.6345 13.3906 16.5626 13.5343 16.4187C13.6781 16.2751 13.75 16.0969 13.75 15.8842C13.75 15.6718 13.6781 15.4937 13.5343 15.35C13.3906 15.2065 13.2125 15.1348 13 15.1348H8C7.7875 15.1348 7.60942 15.2066 7.46575 15.3503C7.32192 15.4941 7.25 15.6723 7.25 15.885C7.25 16.0975 7.32192 16.2756 7.46575 16.4193C7.60942 16.5628 7.7875 16.6345 8 16.6345ZM8 12.75H16C16.2125 12.75 16.3906 12.6781 16.5343 12.5343C16.6781 12.3904 16.75 12.2122 16.75 11.9998C16.75 11.7871 16.6781 11.609 16.5343 11.4655C16.3906 11.3218 16.2125 11.25 16 11.25H8C7.7875 11.25 7.60942 11.3219 7.46575 11.4658C7.32192 11.6096 7.25 11.7878 7.25 12.0003C7.25 12.2129 7.32192 12.391 7.46575 12.5345C7.60942 12.6782 7.7875 12.75 8 12.75ZM8 8.86525H16C16.2125 8.86525 16.3906 8.79342 16.5343 8.64975C16.6781 8.50592 16.75 8.32767 16.75 8.115C16.75 7.9025 16.6781 7.72442 16.5343 7.58075C16.3906 7.43725 16.2125 7.3655 16 7.3655H8C7.7875 7.3655 7.60942 7.43742 7.46575 7.58125C7.32192 7.72492 7.25 7.90308 7.25 8.11575C7.25 8.32825 7.32192 8.50633 7.46575 8.65C7.60942 8.7935 7.7875 8.86525 8 8.86525ZM12 4.34625C12.2167 4.34625 12.3958 4.27542 12.5375 4.13375C12.6792 3.99208 12.75 3.81292 12.75 3.59625C12.75 3.37958 12.6792 3.20042 12.5375 3.05875C12.3958 2.91708 12.2167 2.84625 12 2.84625C11.7833 2.84625 11.6042 2.91708 11.4625 3.05875C11.3208 3.20042 11.25 3.37958 11.25 3.59625C11.25 3.81292 11.3208 3.99208 11.4625 4.13375C11.6042 4.27542 11.7833 4.34625 12 4.34625Z" fill="#1C1B1F"></path></g></svg>
                  </span>
                  <Card.Title as="h3" className="h5 fw-bold text-dark mb-0">Planning Resources</Card.Title>
                </div>
                <Card.Text className="text-muted small mb-3">
                  Looking to review arrangements before making direct inquiries? Browse our localized verification toolsets, grief checksheets, and legal template archives.
                </Card.Text>
                <Button
                  variant="outline-success"
                  size="sm"
                  href="/find-providers"
                  className=""
                >
                  Explore Guide Library &nbsp; &#10142;
                </Button>
              </Card.Body>
            </Card>

            {/* Box 3: Alternate Directory Contacts */}
            <div className="p-4 bg-white rounded-4 border- border-secondary-subtle operational-desk-box shadow-sm">
              <h4 className="h6 fw-bold text-dark mb-3">Platform Operations Desk</h4>
              <div className="d-flex align-items-center gap-2 mb-2 small text-muted operational-row">
                {
                  // <span>&#9993;</span>
                  // demo: directory-desk@yourdomain.com
                }
                ✉
                <a href={`mailto:${details.email_to}`}> {details.email_to}</a>
              </div>
              <div className="d-flex align-items-center gap-2 small text-muted operational-row">
                {
                  // <span>&#9202;</span>
                }
                <span className="hourse-available">{details.working_days_label}</span>
              </div>
            </div>

          </Col>

        </Row>
      </Container>
    </section>
  );
}