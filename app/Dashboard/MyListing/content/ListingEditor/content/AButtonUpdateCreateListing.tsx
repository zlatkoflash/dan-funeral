import { Button, Col, Row } from "react-bootstrap";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";
import { useState } from "react";
import { SaveTheListing } from "@/utils/listing";
import ZAlert from "@/components/alerts/ZAlert";
import { useRouter } from "next/navigation"; // 1. Import the router

export default function AButtonUpdateCreateListing({ onContinue, onSubmit, isNextStep = true }: { onContinue: () => void, onSubmit?: () => void, isNextStep?: boolean }) {

  const router = useRouter(); // 2. Initialize the router

  const { hasErrors, actualListingId, listing } = useMyListing();
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmitSaveTheListing = async () => {

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const result = await SaveTheListing(actualListingId, listing);
    console.log("result:", result);
    if (result.ok) {
      setSuccessMessage("Listing saved successfully");
      // result.listingId
      if (actualListingId === "" || actualListingId === undefined) {
        console.log("Listing created successfully");
        /**
         * this is the case when the listing is created new
         */
        router.push(`/Dashboard/MyListing/UpdateListing?listingId=${result.listingId}`);

      }
      else {
        /**
         * Here is the case when the listing is updated
         */
        //router.push(`/Dashboard/MyListing/UpdateListing?listingId=${actualListingId}`);

        console.log("Listing updated successfully");
      }
    }
    else {
      setErrorMessage(result.message);
    }
    // onSubmit();

    setLoading(false);
  };

  return <>
    <Row className="row-footer-buttons">
      <Col className="column-save-listing-buttons">
        {/* Submit Button */}
        {
          isNextStep && <Button variant="light" type="button" onClick={onContinue}>
            Continue to Next Step
          </Button>
        }

        <Button variant="success" type="button" className={` ${loading ? "loading " : ""} ${hasErrors ? "disabled" : ""}`} onClick={() => {
          if (onSubmit) {
            onSubmit();
          }
          onSubmitSaveTheListing()
        }}>
          Submit Listing
        </Button>


        <Button variant="success" type="button" className={` ${loading ? "loading " : ""} ${hasErrors ? "disabled" : ""}`} onClick={() => {
          if (onSubmit) {
            onSubmit();
          }
          onSubmitSaveTheListing()
        }}>
          Save
        </Button>

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
  </>;
}