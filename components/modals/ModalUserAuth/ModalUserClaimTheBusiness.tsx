'use client'

import TextInput from "@/components/forms/Input"
import { loginAction, signupAction } from "@/utils/apiServer"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import iconGoogle from './../../../assets/images/icon-google.svg';
import iconApple from './../../../assets/images/icon-apple.svg';
import { AuthUser, useAuth } from "@/ContextProvider/AuthProviderWrap"
import { useRouter } from "next/navigation"
import AccountProgress from "./AccountProgress"
import { validateString } from "@/components/forms/inputValidation"
import { getApiData } from "@/utils/api"
import ClaimBusinessList from "./ClaimBusinessList"
import { IListingV2 } from "@/utils/interfaceListing"
import iconCheck from '@/assets/images/circle-green-Icon-check.svg';
import { getStripePlans } from "@/utils/stripe"
import CurrentPlanInfo from "@/components/pricing/CurrentPlanInfo"

// import searchIcon from '@/assets/images/search';


export default function ModalUserClaimTheBusiness() {


  const [stepsStatuses, set_stepsStatuses] = useState<{ title: string, status: 'active' | 'completed' | 'pending' }[]>([
    { title: 'Account', status: 'completed' },
    { title: 'Your Business', status: 'active' },
  ])
  const [account_steps, set_account_steps] = useState<'select-your-business' | 'all-set'>('select-your-business');


  return (
    <>



      {
        account_steps === 'select-your-business' && <>

          <AccountProgress
            steps={stepsStatuses}
          />
          <SelectYourBusinessForm
            afterSettingDefaultListing={() => {
              set_account_steps("all-set")
            }}
          />

        </>
      }

      {
        account_steps === "all-set" && <>
          <AllSet />
        </>
      }

    </>
  );
}






function SelectYourBusinessForm({
  afterSettingDefaultListing
}: {
  afterSettingDefaultListing: () => void
}) {

  const [search_company, set_search_company] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<IListingV2[]>([]);
  const {
    user
  } = useAuth();

  useEffect(() => {
    // 1. Don't search if the string is too short (saves server resources)
    if (search_company.trim().length < 2) {
      setResults([]); // Clear results if they backspace
      return;
    }

    // 2. Setup AbortController to cancel previous pending requests
    const controller = new AbortController();

    // 3. Implement Debounce (300ms-500ms is the sweet spot)
    const timer = setTimeout(async () => {
      try {
        setIsLoading(true); // Always show a loader for UX

        /*const response = await fetch(`/api/search?q=${search_company}`, {
          signal: controller.signal // Link the abort signal
        });

        const data = await response.json();
        setResults(data);*/
        const results = await getApiData<{
          ok: Boolean,
          listings: IListingV2[]
        }>("/listings/get-listings-for-claim-by-user-email", "POST", {
          email: user?.email,
          search: search_company
        }, "authorize", "application/json");

        console.log("results:", results);
        setResults(results.listings);

      } catch (err: any) {
        if (err.name === 'AbortError') {
          // This is expected, we don't need to log it
        } else {
          console.error("Search Error:", err);
          // Track this in your PHP/Server logs!
        }
      } finally {
        setIsLoading(false);
      }
    }, 500);

    // 4. Cleanup function: This runs when the component unmounts 
    // OR when search_company changes again.
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search_company]);

  const [selected_listing_id, set_selected_listing_id] = useState<number | null>(null);

  const CreateNewBlankListing = async () => {

    setIsLoading(true)

    const results = await getApiData<{
      ok: boolean,
      listing_id: number
    }>("/listings/create-blank-listing", "POST", {
      listing_id: selected_listing_id
    }, "authorize", "application/json");

    console.log("results after create blank listing:", results);

    setIsLoading(false);

    if (results.ok === true) {
      console.log("Now we set default listing...");
      await SetDefaultListing(results.listing_id)
    }

    // set_selected_listing_id(results.listing_id)

  }
  const SetDefaultListing = async (selected_listing_id_outh?: number) => {

    setIsLoading(true)

    const results = await getApiData<{
      ok: boolean
    }>("/listings/set-default-listing-for-user", "POST", {
      listing_id: selected_listing_id_outh !== undefined ? selected_listing_id_outh : selected_listing_id
    }, "authorize", "application/json");

    setIsLoading(false);

    afterSettingDefaultListing()

    console.log("result after selecting default listing:", results);
  }


  return <>

    <form action="" className="form-dashboard" onSubmit={(e) => e.preventDefault()}>
      <Container>
        <Row>
          <Col className="text-center">
            <h2 className="title">Find your business</h2>
            <p>Search to claim an existing listing, or create a new profile from scratch.</p>
          </Col>
        </Row>

        <Row className="justify-content-space-between mb-3">
          <Col lg={6}>
            Business name or Address
          </Col>
          <Col lg={6} className="d-flex justify-content-end">
            <Link href={"/"} className="link-green" style={{
              opacity: isLoading ? .5 : 1,
              pointerEvents: isLoading ? "none" : "auto",
            }} onClick={(e) => {
              e.preventDefault();
              CreateNewBlankListing()
            }}>+ Create a new Listing</Link>
          </Col>
        </Row>


        <Row>
          <Col>
            <TextInput
              id="search-company"
              onChange={(e: any) => set_search_company(e.target.value)}
              errorsCasses={["required"]}
              // showError={showErrors && !bussines_name}
              type="text"
              value={search_company}
              placeholder="Search"
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <ClaimBusinessList list={results} afterSelecting={(listing_id: number) => {
              set_selected_listing_id(listing_id)
            }} />
          </Col>
        </Row>

        <Row className="row-footer-buttons">
          <Col className="text-center">
            <Button variant="success" className={isLoading ? "loading" : ""} type="button" disabled={!selected_listing_id} onClick={() => {
              SetDefaultListing();
            }}>Confirm</Button>
          </Col>
        </Row>

      </Container>
    </form>

  </>
}



function AllSet() {


  /*const loadStripePlans = async () => {
    const res = await getStripePlans();
    console.log("Stripe plans:", res);
  }

  useEffect(() => {
    loadStripePlans();
  }, []);*/

  return <>
    <form action="" className="form-dashboard" onSubmit={(e) => e.preventDefault()}>
      <Row>
        <Col className="text-center">
          <img className="icon-dashboard-title" src={iconCheck.src} alt="All Set" />
          <h2 className="title">You’re all set!</h2>
          <p>
            Your profile is live on the Basic plan (free forever).
            <br />
            Complete your profile to attract families.
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <CurrentPlanInfo />
        </Col>
      </Row>


      <Row className="row-footer-buttons">
        <Col className="text-center">
          <Link href={"/Dashboard"} className="btn btn-light">Go to My Dashboard</Link>
          <Link href={"/Dashboard/PricingPlan"} className="btn btn-success">Learn About Plans & Pricing</Link>
        </Col>
      </Row>

    </form>
  </>
}