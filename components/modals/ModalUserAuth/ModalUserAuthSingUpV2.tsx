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

// import searchIcon from '@/assets/images/search';

export interface IModalUserAuthSingUp {
  setAuthForm: (v: 'signup' | 'login') => void
}

export default function ModalUserAuthSingUpV2(data: IModalUserAuthSingUp) {


  const [stepsStatuses, set_stepsStatuses] = useState<{ title: string, status: 'active' | 'completed' | 'pending' }[]>([
    { title: 'Account', status: 'active' },
    { title: 'Your Business', status: 'pending' },
  ])
  const [account_steps, set_account_steps] = useState<'signup-form' | 'select-your-business' | 'all-set'>('signup-form');


  return (
    <>

      <AccountProgress
        steps={stepsStatuses}
      />

      {
        account_steps === 'signup-form' && <SignupForm
          setAuthForm={data.setAuthForm}
          onSuccessSignUp={() => {
            set_account_steps('select-your-business')
            set_stepsStatuses([
              { title: 'Account', status: 'completed' },
              { title: 'Your Business', status: 'active' },
            ])
          }}
        />
      }
      {
        account_steps === 'select-your-business' && <SelectYourBusinessForm
        />
      }

    </>
  );
}



function SignupForm(data: IModalUserAuthSingUp & {
  onSuccessSignUp: () => void
}) {


  const [loading, set_loading] = useState<boolean>(false);
  const [error, set_error] = useState<string>("");
  const [showErrors, set_showErrors] = useState<boolean>(false); // NEW: Track if button was clicked

  const [email, set_email] = useState<string>("");
  const [password, set_password] = useState<string>("");
  const [password_repeat, set_password_repeat] = useState<string>("");
  const [name, set_name] = useState<string>("");
  const [last_name, set_last_name] = useState<string>("");
  const [phone, set_phone] = useState<string>("");
  const [bussines_name, set_bussines_name] = useState<string>("");

  const { signIn } = useAuth();
  const router = useRouter();

  const ___TrySignUp = async () => {
    set_error("")

    // 1. Validation Check: Stop if any field is empty
    if (
      !email || !password || !name || !last_name
      // || !phone || !bussines_name
    ) {
      set_showErrors(true); // Trigger error styles in inputs
      set_error("Please fill in all required fields.");
      return; // STOP the function here
    }
    const validationPassword = validateString(password, ["password"]);
    if (validationPassword !== null) {
      set_error(validationPassword);
      return;
    }
    if (password !== password_repeat) {
      set_error("Passwords do not match.");
      return;
    }

    set_loading(true);

    /*const results = await signupAction({
      email,
      password,
      name,
      last_name,
      phone,
      bussines_name
    });*/
    const results = await getApiData("/user/signup", "POST", {
      email,
      password,
      name,
      last_name,
      phone,
      bussines_name
    });

    if (results.ok !== true) {
      set_error(results.message)
      set_loading(false);
    } else {
      const loginResults = await loginAction(email, password)
      if (loginResults.ok !== true) {
        set_error(loginResults.message)
        set_loading(false);
      } else {
        // data.setAuthForm("login")
        signIn(loginResults.user as AuthUser);
        // router.push("/Dashboard/User/ClaimTheBusiness");
        // router.push("/DashboardV2");
        data.onSuccessSignUp();
      }
    }
  }

  return <>
    <form action="" className="form-dashboard" onSubmit={(e) => e.preventDefault()}>
      <Container>
        <Row>
          <Col className="text-center">
            <h2 className="title">Create Your Account</h2>
            <p>The trusted network for funeral service professionals.</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextInput
              id="name"
              onChange={(e: any) => set_name(e.target.value)}
              errorsCasses={["required"]}
              // showError={showErrors && !name} // NEW PROP
              type="text"
              value={name}
              placeholder="First Name"
            />
          </Col>
          <Col md={6}>
            <TextInput
              id="last_name"
              onChange={(e: any) => set_last_name(e.target.value)}
              errorsCasses={["required"]}
              // showError={showErrors && !last_name} // NEW PROP
              type="text"
              value={last_name}
              placeholder="Last Name"
            />
          </Col>
        </Row>
        <Row>
          {
            /*<Col md={6}>
            <TextInput
              id="business"
              onChange={(e: any) => set_bussines_name(e.target.value)}
              errorsCasses={["required"]}
              // showError={showErrors && !bussines_name}
              type="text"
              value={bussines_name}
              placeholder="Company Name"
            />
          </Col>*/
          }
          <Col>
            <TextInput
              id="email"
              onChange={(e: any) => set_email(e.target.value)}
              errorsCasses={["required", "email"]}
              // showError={showErrors && (!email || !email.includes('@'))}
              type="email"
              value={email}
              placeholder="Email Address"
            />
          </Col>
        </Row>
        <Row className="x2-margin">
          {
            /*<Col md={6}>
            <TextInput
              id="phone"
              onChange={(e: any) => set_phone(e.target.value)}
              errorsCasses={["required"]}
              // showError={showErrors && !phone}
              type="tel"
              value={phone}
              placeholder="Phone Number"
            />
          </Col>*/
          }
          <Col md={6}>
            <TextInput
              id="password"
              onChange={(e: any) => set_password(e.target.value)}
              errorsCasses={["required", "password"]}
              // showError={showErrors && !password}
              type="password"
              value={password}
              placeholder="Password"
            />
          </Col>
          <Col md={6}>
            <TextInput
              id="password-repeat"
              onChange={(e: any) => set_password_repeat(e.target.value)}
              errorsCasses={["required", "password"]}
              // showError={showErrors && !password}
              type="password"
              value={password_repeat}
              placeholder="Password Repeat"
            />
          </Col>
        </Row>

        {/* ... Rest of your Row components (Privacy Policy, Button, etc.) ... */}

        <Row className="row-footer-buttons">
          <Col className="text-center">
            <Button
              type="button"
              variant="success"
              className={loading ? 'loading' : ''}
              onClick={___TrySignUp}
            >
              Create Free Account
            </Button>
            {error !== '' && (
              <div className="text-center text-danger mt-2">
                {error}
              </div>
            )}
          </Col>
        </Row>

        <Row className="row-already-login-footer">
          <Col>
            Free forever. No credit card required
          </Col>
        </Row>
        <Row className="row-already-login-footer">
          <Col>
            Already have an account? <Link className="" href="/" onClick={(e) => {
              e.preventDefault()
              data.setAuthForm("login")
            }} >Login</Link>
          </Col>
        </Row>
        <Row className="row-social-login">
          <Col>
            <div className="heading-special">Or continue with</div>
            <div className="social-buttons">
              <Link href="">
                <Image src={iconGoogle} alt="Signup with google" />
              </Link>
              <Link href="">
                <Image src={iconApple} alt="Signup with google" />
              </Link>
            </div>
          </Col>
        </Row>

        {/* ... Login Link ... */}
      </Container>
    </form>
  </>
}



function SelectYourBusinessForm() {

  const { user } = useAuth();
  console.log("user:", user);

  const [search_company, set_search_company] = useState("");
  const router = useRouter();

  /*const CreateNewListing = async () => {
    const resultsAfterCreatingNewListing = await getApiData("/listings/CreateDefaultListing", "POST", {
      name: search_company
    }, "authorize", "application/json");
    if (resultsAfterCreatingNewListing.ok === true) {
      router.push("/DashboardV2");
    }
  }*/

  const [foundListings, setFoundListings] = useState<IListingV2[]>([]);
  const [listing_id_for_claiming, set_listing_id_for_claiming] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Now we need to find the listing that are related to the user email
   */
  const FindListingsAttachedForLoggedUser = async (search: string) => {
    const resultsAfterFindingListings = await getApiData<{
      ok: true,
      data: IListingV2[],
      // message: string
    }>("/listings/FindListingsAttachedForLoggedUser", "POST", {
      business_name: search,
    }, "authorize", "application/json");
    console.log("resultsAfterFindingListings", resultsAfterFindingListings);
    if (resultsAfterFindingListings.ok === true) {
      setFoundListings(resultsAfterFindingListings.data);
    }
  }

  useEffect(() => {
    // 1. Guard clause: Clear results immediately if search string is too short
    if (search_company.length <= 3) {
      // Optional: ClearListingsAttachedForLoggedUser();
      return;
    }

    // 2. Setup a flag to prevent race conditions
    let isCurrentRequest = true;

    // 3. Debounce the execution by 400ms
    const searchTimeout = setTimeout(async () => {
      try {
        // Execute your search API/handler action
        const data = await FindListingsAttachedForLoggedUser(search_company);

        // Only commit the state changes if the user hasn't typed a new key since this fired
        if (isCurrentRequest && data) {
          // SetListings(data);
        }
      } catch (error) {
        console.error("Search failed:", error);
      }
    }, 400); // 400ms is the sweet spot for natural human typing pauses

    // 4. Cleanup function: Runs automatically every time 'search_company' changes
    return () => {
      isCurrentRequest = false; // Invalidates the previous pending request
      clearTimeout(searchTimeout); // Cancels the previous timer execution
    };
  }, [search_company]);

  const ClaimTheBussiness = async () => {
    setLoading(true);
    setError("");

    const resultsAfterClaimingTheBusiness = await getApiData("/listings/ClaimTheBusiness", "POST", {
      listing_id: listing_id_for_claiming,
    }, "authorize", "application/json");
    console.log("resultsAfterClaimingTheBusiness", resultsAfterClaimingTheBusiness);

    setLoading(false);
    //return; //debugging

    if (resultsAfterClaimingTheBusiness.ok === true) {
      router.push("/DashboardV2");
    }
    else {
      setError(resultsAfterClaimingTheBusiness.message);
    }
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


        <Row className="justify-content-space-between">
          <Col lg={6}>
            Business name or Address
          </Col>
          <Col lg={6} className="d-flex justify-content-end">
            <Link href={"/DashboardV2"} className="link-green" onClick={(e) => {

              // No need for this, when no listing, system create default by default
              // e.preventDefault()
              // CreateNewListing();

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
            <ClaimBusinessList list={foundListings} afterSelecting={(listing_id: any) => {
              set_listing_id_for_claiming(listing_id);
            }} />
          </Col>
        </Row>

        {
          listing_id_for_claiming !== "" && (
            <Row>
              <Col>
                <Button
                  type="button"
                  variant="success"
                  className={`d-flex w-100 ${loading ? 'loading' : ''}`}
                  onClick={() => {
                    ClaimTheBussiness()
                  }}
                >
                  Claim The Business
                </Button>
              </Col>
            </Row>
          )
        }
        {
          error !== "" && (
            <Row>
              <Col>
                <div className="text-center text-danger mt-2">
                  {error}
                </div>
              </Col>
            </Row>
          )
        }

      </Container>
    </form>

  </>
}