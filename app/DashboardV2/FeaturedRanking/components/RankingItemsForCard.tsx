'use client';

import { Button } from "react-bootstrap";
import icon_rank_eye from '@/assets/images/icon-eye-rank.svg';
import icon_delete from '@/assets/images/icon-delete-green.svg';
import icon_edit from '@/assets/images/icon-edit.svg';
import Image from "next/image";
import example_listing_thumbnail from "@/assets/images/example-listing-thumbnail.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IRankData } from "@/utils/interfaceListing";
import { getStripeRankingProducts, StripeProductWithPrices } from "@/utils/stripe";
import { getApiData } from "@/utils/api";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { shopSlice } from "@/redux/features/ShopSlice";
import { formatPrice } from "@/utils/strings";

export default function RankingItemsForCard() {


  const { user } = useAuth();
  if (!user) {
    return <></>
  }

  const dispatch = useAppDispatch();
  const rankingCardsItem = useAppSelector((state) => state.shop.ranksData.list);



  const [loading, setLoading] = useState<boolean>(false);



  const LoadTheData = async () => {
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

  const RemoveItemFromTheList = async (rankData: IRankData) => {
    setLoading(true);

    const feedbackAfterRemovingData = await getApiData<{
      ok: boolean,
      // items: IRankData[]
    }>("/listings/RankingCard_RemoveItemFromCart", "POST", {
      // listing_id: user.defaultListing.id,
      rank_data: rankData
    }, "authorize", "application/json");
    console.log("feedbackAfterRemovingData:", feedbackAfterRemovingData);
    if (feedbackAfterRemovingData.ok) {

      dispatch(shopSlice.actions.RemoveCardItemFromCard(rankData.id || 0));
    }

    setLoading(false);
  }

  useEffect(() => {
    LoadTheData();
  }, []);

  return <>
    <div className="ranking-items-for-card">

      <div className="ranking-items-heading">
        <div className="left-content">
          <img src={icon_rank_eye.src} alt="Ad Preview" />
          <h5>
            Ad Preview
          </h5>
        </div>
        <div className="right-content-buttons">
          <Link href="/DashboardV2/FeaturedRanking/AddNewRanking" className="btn btn-light ">
            Add New
          </Link>
        </div>
      </div>

      {
        rankingCardsItem.length === 0 && <div className="no-item-to-show text-center py-5 text-center">
          <span>No items in the list</span>
        </div>
      }

      <div className="ranking-items-list">

        {
          rankingCardsItem.map((rankItem, index) => {
            const rankData = rankItem.rankData;
            const product = rankItem.product;
            const price = product.monthly;
            return <div className="item-ranking-card" key={index}>
              <div className="add-preview-panel">
                <div className="heading">
                  <div className="left-content">
                    <h5>"{rankData.type === "category" && <>{rankData.title}</>}
                      {rankData.type === "location" && <>
                        <strong>{rankData.title}</strong>
                        <br />
                        {rankData.description}
                      </>}
                      "</h5>
                  </div>
                  <div className="right-content">
                    <div className="current-plan-label success">

                      {
                        (() => {
                          const rankPosition = Number(rankData.rank_position);
                          if (rankPosition === 1) {
                            return <>1st AD</>
                          }
                          if (rankPosition === 2) {
                            return <>2nd AD</>
                          }
                          if (rankPosition === 3) {
                            return <>3rd AD</>
                          }
                          return <>-</>
                          return <></>
                        })()
                      }

                    </div>
                  </div>
                </div>
                <div className="content-inner">
                  <div className="left-content">
                    <Image src={example_listing_thumbnail} alt="image" width={250} height={250} />
                    <div className="inner-titles-and-paragraphs">
                      <h5>{user.defaultListing.name}</h5>
                      <p>ID: #{user.defaultListing.id}</p>
                    </div>
                  </div>
                  <div className="right-content">
                    <Link href={`/DashboardV2/FeaturedRanking/EditCardItemRanking/${rankData.id}`} className="btn btn-circle-icon">
                      <img src={icon_edit.src} alt="icon-edit" />
                    </Link>
                    <Button type="button" variant="light" className="btn-circle-icon" onClick={() => {
                      RemoveItemFromTheList(rankData);
                    }}>
                      <img src={icon_delete.src} alt="icon-delete" />
                    </Button>
                  </div>
                </div>
                <div className="footer-for">
                  <p>Per Month {
                    formatPrice(price?.unit_amount ? price?.unit_amount / 100 : 0)
                  }</p>
                </div>
              </div>
            </div>
          })
        }
      </div>


    </div >
  </>
} 