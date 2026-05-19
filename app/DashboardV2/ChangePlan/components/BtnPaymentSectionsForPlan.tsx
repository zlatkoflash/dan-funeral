"use client";

import ZCheckBox from "@/components/forms/ZCheckBox";
import { AuthUser, useAuth } from "@/ContextProvider/AuthProviderWrap";
import { getApiData } from "@/utils/api";
import { IStripePrice, IStripeProduct } from "@/utils/interfaceStripe"
import { formatPrice, slugify } from "@/utils/strings";
import { addSubscription, getDefaultPaymentMethod, getStripeCustomer, updateSubscription } from "@/utils/stripe";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "react-bootstrap"

export default function BtnPaymentSectionsForPlan(
  {
    plansSubscribtions = []
  }
    :
    {
      plansSubscribtions?: {
        plan: IStripeProduct;
        period: "daily" | "weekly" | "monthly" | "yearly";
      }[]
    }
) {



  const { user, setUser } = useAuth();

  if (!user) {
    return <></>;
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [acceptTheTerms, setAcceptTheTerms] = useState<boolean>(false);

  const router = useRouter();

  const SubscribeThePlan = async () => {
    setLoading(true);
    setErrorMessage("")
    // const response:AxiosRes

    let price: IStripePrice = plansSubscribtions[0].period === "monthly" ? plansSubscribtions[0].plan.monthly : plansSubscribtions[0].plan.yearly;

    const stripeCustomer = await getStripeCustomer(user.email);
    const defaultPaymentMethod = await getDefaultPaymentMethod(stripeCustomer?.id as string);

    console.log("defaultPaymentMethod:", defaultPaymentMethod);
    if (defaultPaymentMethod === null || defaultPaymentMethod === undefined) {
      setErrorMessage("Please add a default payment method");
      setLoading(false);
      return;
    }

    let result: { success: boolean; message: string; status: string } = { success: false, message: "", status: "" };
    const metadata = {
      subscribtion_is_for: "listing-plan",
      user_id: user.id,
      listing_id: user.defaultListing.id.toString(),
      plan_slug: slugify(plansSubscribtions[0].plan.name),
      plan_type: plansSubscribtions[0].plan.metadata.plan_type,
      plan_period: plansSubscribtions[0].period,
    };

    // console.log("metadata:", metadata); return; // debugging

    if (
      user.defaultListing.plan_subscribtion_details.subscribtion_id === ""
      ||
      user.defaultListing.plan_subscribtion_details.status === "canceled"
      // || 1
    ) {
      // add new subscribtion

      console.log("stripeCustomer", `${stripeCustomer?.id} <- customer id`);
      console.log("price", `${price.id} <- price id`);
      console.log("defaultPaymentMethod", `${defaultPaymentMethod?.id} <- default payment method id`);

      result = await addSubscription(
        stripeCustomer?.id as string,
        price.id,
        defaultPaymentMethod.id as string,
        metadata
      ) as { success: boolean; message: string; status: string };
      console.log("Result after adding subscribtion:", result);
    }
    else {
      // update subscribtion
      result = await updateSubscription(
        user.defaultListing.plan_subscribtion_details.subscribtion_id as string,
        price.id,
        metadata
      ) as { success: boolean; message: string; status: string };
      console.log("Result after updating subscribtion:", result);
    }

    if (result.success === false) {
      setErrorMessage(result.message)
    }
    else {
      // when success we redirect to thank you page with window.location.href to load everything from scratch
      window.location.href = "/DashboardV2/ChangePlan/Confirmation";
    }

    setLoading(false);

  }

  const productPrice = (): IStripePrice | null => {

    let productPrice: IStripePrice;
    const index = 0;

    if (plansSubscribtions[index] === undefined) return null;

    if (plansSubscribtions[index].period === "monthly") {
      productPrice = plansSubscribtions[index].plan.monthly;
    } else {
      productPrice = plansSubscribtions[index].plan.yearly;
    }
    return productPrice;

  }

  const loadListingStripeData = async () => {
    setLoading(true);
    setErrorMessage("");
    const response = await getApiData("/listings/testListingPHPStripeProduct", "POST", {
      listing_id: user.defaultListing.id.toString(),
      //period: "monthly",
    }, "authorize", "application/json");
    console.log("response:", response);
    setLoading(false);
  }



  return <>
    <div className="payment-section">
      <div className="heading">
        <h4>Summary</h4>
      </div>

      <div className="items-holder">
        <div className="items-list">
          {
            plansSubscribtions === undefined
              ?
              ["", "", ""].map((item, index) => {
                return <div className="item-card" key={index}>
                  <div className="left-content">
                    <h5>Plan</h5>
                    <p>Small Business</p>
                  </div>
                  <div className="price">
                    Per Month $20
                  </div>
                </div>
              })
              :
              plansSubscribtions.map((plan, index) => {

                let productPrice: IStripePrice;

                if (plan.period === "monthly") {
                  productPrice = plan.plan.monthly;
                } else {
                  productPrice = plan.plan.yearly;
                }
                console.log("productPrice:", productPrice);

                return <div className="item-card" key={index}>
                  <div className="left-content">
                    <h5>Plan</h5>
                    <p>{plan.plan.name}</p>
                  </div>
                  <div className="price">
                    {
                      `Per ${plan.period} $${productPrice.unit_amount / 100}`
                    }
                  </div>
                </div>
              })
          }
        </div>
        <hr className="card-hr success" />
        {(() => {
          const price = productPrice();
          if (price === null) return <></>;
          return <div className="item-card">
            <div className="left-content">
              <p>Total</p>
            </div>
            <div className="price success">
              {`${formatPrice(price.unit_amount / 100, 2)}`}
            </div>
          </div>
        })()
        }

      </div>

      <Button type="button" variant="success" className={`payment-button ${loading ? "loading" : ""}`}
        disabled={!acceptTheTerms}
        onClick={() => {
          SubscribeThePlan()
        }}>
        Subscribe
      </Button>


      {/* <Button type="button" variant="success" className={`payment-button ${loading ? "loading" : ""}`} onClick={() => {
        loadListingStripeData()
      }}>
        Load listing Stripe Data
      </Button> */}


      {
        errorMessage !== "" && <div className="message-info error mb-3">
          <p className="error text-danger">{errorMessage}</p>
        </div>
      }

      <div className="message-info">
        <ZCheckBox
          checked={acceptTheTerms}
          onChange={(checked: boolean) => {
            setAcceptTheTerms(checked);
          }}
          id="accept-the-terms"
          label="By clicking above, you agree to our Terms of Service for advertising."
        />
      </div>



    </div>
  </>
}