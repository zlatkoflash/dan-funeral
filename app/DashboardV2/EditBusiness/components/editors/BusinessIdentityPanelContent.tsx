"use client";

import { IE13Language } from "@/app/Dashboard/MyListing/content/ListingEditor/content/LE13Languages";
import TextInput from "@/components/forms/Input";
import TagSelector, { ITagSelectorItem } from "@/components/forms/InputTags";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { getApiData } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function BusinessIdentityPanelContent() {

  const {
    user
  } = useAuth();

  console.log("user>>>>:", user);

  if (!user) {
    return null;
  }

  const languagesSpokenString = user?.defaultListing.data.identity_and_narrative?.languages_spoken || "";
  const languagesSpokenArray = languagesSpokenString !== "" ? languagesSpokenString.split(",") : [];

  const [businessName, setBusinessName] = useState<string>(user?.defaultListing.data.identity_and_narrative?.business_name || "");
  const [aboutUs, setAboutUs] = useState<string>(user?.defaultListing.data.identity_and_narrative?.about_us || "");
  const [yearBusinessFounded, setYearBusinessFounded] = useState<string>(user?.defaultListing.data.identity_and_narrative?.year_business_founded || "");
  const [languagesSpoken, setLanguagesSpoken] = useState<string[]>(languagesSpokenArray);
  const [phoneNumber, setPhoneNumber] = useState<string>(user?.defaultListing.data.identity_and_narrative?.phone_number || "");
  const [website, setWebsite] = useState<string>(user?.defaultListing.data.identity_and_narrative?.website || "");

  const [all_languages, setAllLanguageList] = useState<IE13Language[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");


  const years = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= 1970; i--) {
      years.push({
        label: i.toString(),
        value: i.toString()
      });
    }
    return years;
  }

  const LoadTheLanguages = async () => {
    const languagesAll = await getApiData<{

      ok: boolean,
      languages: IE13Language[]

    }>(`/listings/get-all-languages`, "GET");
    setAllLanguageList(languagesAll.languages);
  }

  useEffect(() => {
    LoadTheLanguages();
  }, []);

  const router = useRouter();

  const ___SaveThePart = async (doRedirect: boolean = false) => {

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const feedback = await getApiData<{
      ok: boolean,
      errorJson500: {
        message: string
      }
    }>("/listings/UPDATE_BusinessIdentity", "POST", {
      user_id: user?.id,
      listing_id: user?.defaultListing.id,
      data: {
        business_name: businessName,
        about_us: aboutUs,
        year_business_founded: yearBusinessFounded,
        languages_spoken: languagesSpoken.join(','),
        phone_number: phoneNumber,
        website: website,
      }
    }, "authorize", "application/json");

    console.log("feedback:", feedback);
    if (feedback.ok !== true) {
      setErrorMessage('✗ ' + feedback.errorJson500.message);
    } else {
      setSuccessMessage(`✓ ` + "Business identity updated successfully");
      if (doRedirect) {
        router.push("/DashboardV2/EditBusiness/LocationsAndCategories");
      }
    }

    setLoading(false);
  }

  return <>
    <div className="panel-content-wrap">
      <div className="heading">
        <h3>Identity & Narrative</h3>
        <p>This information is unrestricted and displayed prominently to families searching for services.</p>
      </div>

      <form onSubmit={() => { }} className="form-dashboard">

        <Container>

          <Row>
            <Col md={6}>
              <TextInput id="business-name" label="Business name" placeholder="Business name" type="text" value={businessName} onChange={(e: any) => { setBusinessName(e.target.value) }} errorsCasses={["required"]} />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <TextInput
                id="about-us"
                onChange={(htmlText: string) => { setAboutUs(htmlText) }}
                type="rich-text-editor" // Use type="password" for security
                value={aboutUs}
                placeholder="About us"
                label="About us"
                maxLength={1500}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <TextInput
                id="year-business-founded"
                onChange={(e: any) => { setYearBusinessFounded(e.target.value) }}
                type="select" // Use type="password" for security
                value={yearBusinessFounded}
                placeholder="Year Business Founded"
                label="Year Business Founded"
                options={years()}
              />
            </Col>
            <Col md={6}>
              {
                /*<TextInput
                id="languages-spoken"
                onChange={(htmlText: string) => { setLanguagesSpoken(htmlText) }}
                type="text" // Use type="password" for security
                value={languagesSpoken}
                placeholder="Languages spoken"
                label="Languages spoken"
              />*/
              }
              <TagSelector
                onTagsChange={(tags: ITagSelectorItem[]) => {
                  console.log("Languages spoken tags:", tags);
                  // setLanguagesSpoken(tags.join(", "));
                  setLanguagesSpoken(tags.map((tag) => tag.value as string));
                }}
                value={languagesSpoken.map((tag) => {
                  const language = all_languages.find((language) => language.code === tag);
                  console.log("language+++:", language, all_languages, tag);
                  return ({ value: tag, label: language?.name + `(${language?.native_name})` });
                })}
                items={all_languages.map((language) => ({ value: language.code, label: language.name + `(${language.native_name})` }))}
                title="Languages Spoken"
              />
            </Col>
          </Row>


          <Row>
            <Col md={6}>
              <TextInput
                id="phone-number"
                onChange={(e: any) => {
                  console.log("Phone number text:", e.target.value);
                  setPhoneNumber(e.target.value)
                }}
                type="tel" // Use type="password" for security
                value={phoneNumber}
                placeholder="Phone number"
                label="Phone number"
              />
            </Col>
            <Col md={6}>
              <TextInput
                id="website"
                onChange={(e: any) => { setWebsite(e.target.value) }}
                type="text" // Use type="password" for security
                value={website}
                placeholder="Website"
                label="Website"
                maxLength={1500}
              />
            </Col>
          </Row>

          <Row className="row-buttons">
            <Col>
              <Button variant="light" type="button" className={`${loading ? "loading" : ""}`} onClick={() => {
                ___SaveThePart();
              }}>
                Save The Draft
              </Button>

              <Button variant="success" type="button" className={`${loading ? "loading" : ""}`} onClick={() => {
                ___SaveThePart(
                  true // redirect
                );
              }}>
                Save & Continue
              </Button>
            </Col>
          </Row>

          {successMessage && (
            <Row>
              <Col>
                <div className="text-success text-end">
                  {successMessage}
                </div>
              </Col>
            </Row>
          )}

          {errorMessage && (
            <Row>
              <Col>
                <div className="text-danger text-end">
                  {errorMessage}
                </div>
              </Col>
            </Row>
          )}

        </Container>

      </form>

    </div>
  </>
}