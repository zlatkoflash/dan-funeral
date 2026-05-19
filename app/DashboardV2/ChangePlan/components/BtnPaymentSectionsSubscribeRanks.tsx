"use client";

import ZCheckBox from "@/components/forms/ZCheckBox";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { shopSlice } from "@/redux/features/ShopSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getApiData } from "@/utils/api";
import { IRankData } from "@/utils/interfaceListing";
import { IStripePrice, IStripeProduct } from "@/utils/interfaceStripe"
import { formatPrice } from "@/utils/strings";
import { AddItemsToStripeGroupSubscribtion, getStripeCustomer, getStripeRankingProducts, StripeProductWithPrices } from "@/utils/stripe";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap"

export default function BtnPaymentSectionsSubscribeRanks(
  {
    // plansSubscribtions = []
  }
    :
    {
      /*plansSubscribtions?: {
        plan: IStripeProduct;
        period: "daily" | "weekly" | "monthly" | "yearly";
      }[]*/
    }
) {


  const { user } = useAuth();
  if (user === null) return <></>

  const [loading, setLoading] = useState<boolean>(false);

  const rankCardItems = useAppSelector((state) => state.shop.ranksData.list);
  const dispatch = useAppDispatch();

  const [acceptTheTerms, setAcceptTheTerms] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const SubscribeTheRankingPlan = async () => {
    setLoading(true);
    setError("");
    // const response:AxiosRes

    const stripeCustomer = await getStripeCustomer(user.email);
    const itemsForSubscribtions = rankCardItems.map((rankItem) => {
      return {
        // priceId: rankItem.product.monthly?.id as string,
        // productId: rankItem.product.id,
        product: rankItem.product,
        metadata: {
          ...JSON.parse(JSON.stringify(rankItem.rankData)),
        }
      }
    });
    console.log("itemsForSubscribtions:", itemsForSubscribtions);
    const resultAfterSubscribtionNewItems = await AddItemsToStripeGroupSubscribtion(
      stripeCustomer?.id as string,
      itemsForSubscribtions,
      // null // subscribtion id // when creating new subscribtion
      // 'sub_1TY2wXKhVoChiPYnIVabqFqd' // when update subscribtion
      user.defaultListing.rank_subscribtion_id === "" ? null : user.defaultListing.rank_subscribtion_id,
      {
        listing_id: user.defaultListing.id.toString()
      }
    );
    console.log("resultAfterSubscribtionNewItems:", resultAfterSubscribtionNewItems);


    setLoading(false);

    if (resultAfterSubscribtionNewItems.status === "active") {
      // return; // debugging
      dispatch(shopSlice.actions.setRanksDataList([]));
      // router.push("/DashboardV2/FeaturedRanking/Confirmation");
      window.location.href = "/DashboardV2/FeaturedRanking/Confirmation";
    }
    else {
      setError(resultAfterSubscribtionNewItems.message as string);
    }

  }

  const totalPrice = useMemo(() => {
    return rankCardItems.reduce((total, rankItem) => {
      let productPrice: any = rankItem.product.monthly;
      const ProductPriceFor = productPrice as IStripePrice;
      if (ProductPriceFor === null || ProductPriceFor === undefined) return total;
      return total + ProductPriceFor.unit_amount;
    }, 0);
  }, [rankCardItems]);



  const LoadCardItems = async () => {
    setLoading(true);

    const cartItemsData = await getApiData<{
      ok: boolean,
      items: IRankData[]
    }>("/listings/RankingCard_Items", "POST", {
      listing_id: user.defaultListing.id
    }, "authorize", "application/json");
    console.log("cartItemsData:", cartItemsData);

    const dataForCart: {
      rankData: IRankData,
      product: StripeProductWithPrices
    }[] = [];

    const rankingProducts = await getStripeRankingProducts();
    for (const rankItem of cartItemsData.items) {
      const product = rankingProducts.find((product) => product.id === rankItem.stripe_product_id);
      if (product) {
        dataForCart.push({
          rankData: rankItem,
          product: product
        });
      }
    }


    dispatch(shopSlice.actions.setRanksDataList(dataForCart));


    setLoading(false);
  }

  useEffect(() => {
    LoadCardItems()
  }, []);


  return <>
    <div className="payment-section">
      <div className="heading">
        <h4>Summary</h4>
      </div>

      {
        (
          rankCardItems.length === 0
            ?
            <>
              <div className="no-items-in-the-list text-center mb-4">
                Card list is empty!
              </div>
            </>
            :
            <>

            </>
        )
      }

      {
        rankCardItems.length > 0 &&

        <div className="items-holder">
          <div className="items-list">
            {
              rankCardItems.map((item, index) => {

                const price = item.product.monthly;

                return <div className="item-card" key={index}>
                  <div className="left-content">
                    <h5>{
                      item.rankData.type === "category" ? "Category" : "Location"
                    }</h5>
                    <p>{
                      item.rankData.title
                    } <span className="rank-mark">({'1st Place'})</span></p>
                  </div>
                  <div className="price">
                    Per Month {formatPrice(price !== null && price !== undefined && price.unit_amount !== null ? price?.unit_amount / 100 : 0)}
                  </div>
                </div>
              })
            }
          </div>
          <hr className="card-hr success" />
          <div className="item-card">
            <div className="left-content">
              <p>Total</p>
            </div>
            <div className="price success">
              Per Month {formatPrice(totalPrice / 100)}
            </div>
          </div>

        </div>
      }


      <Button type="button" variant="success"
        className={`payment-button ${loading ? "loading" : ""}`}
        disabled={
          rankCardItems.length === 0
          || !acceptTheTerms
        }
        onClick={() => {
          SubscribeTheRankingPlan()
          // router.push("/DashboardV2/FeaturedRanking/Subscribtion/");
        }}

      >
        Subscribe The Ranks
      </Button>

      {
        error.length > 0 &&
        <div className="error-message text-danger mb-4 ">
          {error}
        </div>
      }

      {
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
      }

    </div>
  </>
}