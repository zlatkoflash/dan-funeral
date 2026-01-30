import { Button, Col, Row } from "react-bootstrap";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";
import { useState } from "react";
import {
  CreateNewListing,
  //SaveTheListing, 
  SaveTheListingPart, TSavingPartType
} from "@/utils/listing";
import ZAlert from "@/components/alerts/ZAlert";
import { useRouter } from "next/navigation"; // 1. Import the router
import InfoCountdownModal from "@/components/modals/info/InfoModal";

/**
 * 
 * @param param0 
 * @returns 
 * inputsData: any can hold the data of the forms
 */
export default function AButtonUpdateCreateListing({ onContinue, onSubmit, isNextStep = true, canSave = true, inputsData, savingPartType, TitleSaveButton }: { onContinue: () => void, onSubmit?: () => void, isNextStep?: boolean, canSave?: boolean, inputsData?: { data: any, file?: File }, savingPartType?: TSavingPartType, TitleSaveButton?: string }) {

  const router = useRouter(); // 2. Initialize the router

  const {
    hasErrors, actualListingId, listing,
    setLE1About,
    setLE2Category,
    setLE3Location,
    setLE5Pricing,
    setLE6BusinessHours,
    setLE7ListingVideo,
    setLE8MyTeam,
    setLE9FAQs,
    setLE10ServiceOffering,
    setLE12PreferredVendor,
    setLE13Languages
  } = useMyListing();
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [redirectingPathAfterCreatingListing, set_redirectingPathAfterCreatingListing] = useState<string>("");
  const [showTheModalAfterCreatingListing, set_showTheModalAfterCreatingListing] = useState<boolean>(false);

  const SaveThePartOfTheListing = async () => {



    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    console.log("inputsData?.data for saving:", inputsData?.data);

    // const result = await SaveTheListing(actualListingId, listing);
    const result = await SaveTheListingPart(
      Number(actualListingId),
      savingPartType as TSavingPartType,
      inputsData?.data,
      inputsData?.file
    );
    console.log("result:", result);
    if (result.ok) {
      setSuccessMessage("Saved successfully");
      // result.listingId
      /*if (actualListingId === "" || actualListingId === undefined) {
        console.log("Created successfully");
        
        router.push(`/Dashboard/MyListing/UpdateListing?listingId=${result.listingId}`);

      }
      else {
        

        console.log("Listing updated successfully");
      }*/
      if (savingPartType === "about") setLE1About(inputsData?.data);
      if (savingPartType === "category") setLE2Category(inputsData?.data);
      else if (savingPartType === "location") setLE3Location(inputsData?.data);
      else if (savingPartType === "media") {
        // no need to update state here, after updating the images, state is auto updating
      }
      else if (savingPartType === "pricing") setLE5Pricing(inputsData?.data);
      else if (savingPartType === "businessHours") setLE6BusinessHours(inputsData?.data);
      else if (savingPartType === "video") setLE7ListingVideo(inputsData?.data);
      else if (savingPartType === "teamMembers") setLE8MyTeam(inputsData?.data);
      else if (savingPartType === "faqs") setLE9FAQs(inputsData?.data);
      else if (savingPartType === "preffered-vendors") setLE12PreferredVendor(inputsData?.data);
      else if (savingPartType === "service-offering") setLE10ServiceOffering(inputsData?.data);
      else if (savingPartType === "languages") setLE13Languages(inputsData?.data);

    }
    else {
      setErrorMessage(result.message);
    }
    // onSubmit();

    setLoading(false);
  };


  const ___CreateNewListing = async () => {
    setLoading(true);
    const responseAfterCreateNewListing = await CreateNewListing({
      title: inputsData?.data.title,
      description: inputsData?.data.description,
      yearsinoperation: "0"
    });
    console.log("responseAfterCreateNewListing:", responseAfterCreateNewListing);
    if (responseAfterCreateNewListing.ok === true && responseAfterCreateNewListing.listing_id !== undefined) {
      // router.push(`/Dashboard/MyListing/UpdateListing?listingId=${responseAfterCreateNewListing.listing_id}`);
      set_redirectingPathAfterCreatingListing(`/Dashboard/MyListing/UpdateListing?listingId=${responseAfterCreateNewListing.listing_id}`);
      set_showTheModalAfterCreatingListing(true);
    }
    else {
      setErrorMessage("Listing creation failed, please try again or contact support.");
    }
    setLoading(false);
  }


  return <>
    {
      actualListingId === undefined && (
        <Row className="mb-0">
          <Col>
            <p><strong>Ready to create your listing?</strong> To ensure your property or service stands out, you'll need to provide a <strong>compelling Title</strong> and a <strong>detailed Description</strong>. A clear title helps users find you in search results, while a thorough description builds trust and answers potential questions upfront.</p>
          </Col>
        </Row>
      )
    }
    <Row className={`row-footer-buttons ${actualListingId === undefined ? "mt-3" : ""}`}>
      <Col className="column-save-listing-buttons">
        {/* Submit Button */}

        {
          actualListingId !== undefined && (
            <>
              {
                isNextStep && <Button variant="light" type="button" onClick={onContinue}>
                  Continue to Next Step
                </Button>
              }

              {
                inputsData !== undefined && <Button variant="success" type="button" className={` ${loading ? "loading " : ""} ${canSave !== undefined && canSave === false ? "disabled" : ""

                  }`} onClick={() => {
                    if (onSubmit) {
                      onSubmit();
                    }
                    SaveThePartOfTheListing()
                  }}>
                  {TitleSaveButton !== undefined ? TitleSaveButton : "Save"}
                </Button>
              }
            </>
          )
        }

        {
          actualListingId === undefined &&
          <>
            <Button variant="success" type="button" className={` ${loading ? "loading " : ""} ${!canSave ? "disabled" : ""}`} onClick={() => {

              ___CreateNewListing();
            }}>
              Create The New Listing
            </Button>
          </>
        }


      </Col>
    </Row>
    {
      (successMessage !== "" || errorMessage !== "") && <Row>
        <Col>
          {
            successMessage && <ZAlert message={successMessage} type="success" />
          }
          {
            errorMessage && <ZAlert message={errorMessage} type="error" />
          }
        </Col>
      </Row>
    }

    <InfoCountdownModal

      show={showTheModalAfterCreatingListing}
      title="Listing Created Successfully"
      description="Your listing has been created successfully. You will be redirected to the listing page in 5 seconds."
      redirectPath={redirectingPathAfterCreatingListing}
      countdownSeconds={5}

    />
  </>;
}