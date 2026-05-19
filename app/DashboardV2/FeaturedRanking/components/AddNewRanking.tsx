'use client';

import icon_rank_eye from '@/assets/images/icon-eye-rank.svg';
import icon_delete from '@/assets/images/icon-delete-green.svg';
import icon_edit from '@/assets/images/icon-edit.svg';
import Image from 'next/image';
import { Button, Col, Container, Row } from 'react-bootstrap';
import example_listing_thumbnail from "@/assets/images/example-listing-thumbnail.jpg";
import ZSwitcherTabs from '@/components/ZSwitcherTabs';
import TextInput from '@/components/forms/Input';
import { useEffect, useMemo, useState } from 'react';
import TagsButtonsPlusMinus from '@/components/forms/TagsButtonsPlusMinus';
import dot_solid_circle from '@/assets/images/fas-fa-dot-circle.svg';
import dot_not_solid from '@/assets/images/far-fa-circle.svg';
import { ILE10ServiceOffering } from '@/app/Dashboard/MyListing/content/ListingEditor/content/LE10ServiceOffering';
import { getApiData } from '@/utils/api';
import { useAuth } from '@/ContextProvider/AuthProviderWrap';
import { getStripeRankingProducts, StripeProductWithPrices } from '@/utils/stripe';
import { formatPrice } from '@/utils/strings';
import { useAppDispatch } from '@/redux/hooks';
import { shopSlice } from '@/redux/features/ShopSlice';
import { IRankData } from '@/utils/interfaceListing';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function AddNewRanking(
  { initialData }: { initialData?: IRankData }
) {

  const { user } = useAuth();
  if (user === null) return <></>

  const [loading, setLoading] = useState(false);
  const [toggleTarget, setToggleTarget] = useState<"rank-by-service" | "rank-by-location">('rank-by-service');


  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubServiceId, setSelectedSubServiceId] = useState<string>('');
  const [categories, setCategories] = useState<ILE10ServiceOffering[]>([]);
  const LoadMyCategories = async () => {
    setLoading(true);
    const data = await getApiData<{
      ok: boolean,
      categories: ILE10ServiceOffering[]
    }>(`/listings/get-service-offering-categories`, "GET");
    setCategories(data.categories);
    setLoading(false);
  }


  const selectedCategoryObject = useMemo(() => {
    return categories.find((category) => category.term_id.toString() === selectedCategoryId)
  }, [categories, selectedCategoryId]);
  const selectedSubcategoryObject = useMemo(() => {
    return selectedCategoryObject?.children.find((category) => category.term_id.toString() === selectedSubServiceId)
  }, [selectedCategoryObject, selectedSubServiceId]);




  const [locationId, setLocationId] = useState<string>('');
  const locationObject = useMemo(() => {
    return user.defaultListing.data.services_areas_and_categories.locations.find((location) => location.place_id === locationId);
  }, [user.defaultListing.data.services_areas_and_categories.locations, locationId]);



  const [stripeRankingProducts, setStripeRankingProducts] = useState<StripeProductWithPrices[]>([]);
  const LoadStripeRankProducts = async () => {
    setLoading(true);

    const rankProducts = await getStripeRankingProducts();
    console.log("rankProducts:", rankProducts);
    setStripeRankingProducts(rankProducts);

    setLoading(false);
  }

  const [rankingProductId, setRankingProductId] = useState<string>('');
  const [rankingProduct, setRankingProduct] = useState<StripeProductWithPrices | null>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const AddUpdateItemNewRankingToCard = async () => {
    if (!ICanAddToCard()) return;


    setLoading(true);

    const locationObject = user.defaultListing.data.services_areas_and_categories.locations.find((location) => location.place_id === locationId);
    // const category = user.defaultListing.data.services_areas_and_categories.categories.find((category) => category.id === selectedCategoryId);

    let objectRanking: IRankData = {
      id: initialData?.id,
      type: toggleTarget === "rank-by-location" ? "location" : "category",
      stripe_product_id: rankingProductId,
      stripe_product_price_id: rankingProduct?.monthly?.id,
      subscribtion_status: 'item-card',
      user_id: Number(user.id),
      listing_id: user.defaultListing.id,
      rank_position: (rankingProduct?.metadata?.rank_type !== undefined ? Number(rankingProduct?.metadata?.rank_type) : 3)
    };
    if (toggleTarget === "rank-by-location") {
      objectRanking = {
        ...objectRanking,
        location_data: JSON.stringify(locationObject !== undefined ? locationObject : {}),
        title: locationObject?.city,
        description: locationObject?.display_name
      };
    }
    if (toggleTarget === "rank-by-service") {
      const catObj = selectedCategoryObject;
      const categoryId = catObj?.children.length === 0 ? selectedCategoryId : selectedSubServiceId;
      let serviceObject: ILE10ServiceOffering | undefined = undefined;
      if (catObj?.children.length === 0) {
      } else {
        serviceObject = catObj?.children.find((category) => category.term_id.toString() === selectedSubServiceId)
      }
      objectRanking = {
        ...objectRanking,
        service_id: Number(categoryId),
        // service_data: JSON.stringify(selectedCategoryObject)
        title: serviceObject !== undefined ? serviceObject?.name : selectedCategoryObject?.name,
        description: "Service offering"
      };
    }


    if (initialData === undefined) {

      const resultSavingItem = await getApiData<{
        ok: boolean,
        item: IRankData,
      }>("/listings/RankingCard_AddRankingItem", "POST", {
        ranking_item: objectRanking
      }, "authorize", "application/json");

      dispatch(shopSlice.actions.addRankItemToCard({
        // here go updated item
        rankData: resultSavingItem.item,
        product: stripeRankingProducts.find((product) => product.id === rankingProductId) as StripeProductWithPrices
      }));
    }
    else if (initialData !== undefined) {

      const resultSavingItem = await getApiData<{
        ok: boolean,
        item: IRankData,
      }>("/listings/RankingCard_UpdateRankingItem", "POST", {
        ranking_item: objectRanking
      }, "authorize", "application/json");

      dispatch(shopSlice.actions.updateRankItemInCard({
        // here go updated item
        rankData: objectRanking,
        product: stripeRankingProducts.find((product) => product.id === rankingProductId) as StripeProductWithPrices
      }));
    }




    setLoading(false);

  }

  const ICanAddToCard = () => {

    if (rankingProductId === "") return false;
    if (toggleTarget === "rank-by-location") {
      return locationId !== "";
    }
    if (toggleTarget === "rank-by-service") {
      if (selectedCategoryId !== "" && selectedCategoryObject && selectedCategoryObject.children.length === 0) {
        return true;
      }
      if (selectedSubServiceId !== "") {
        return true;
      }
    }
    return false;
  }


  const findCategoryDeep = (categoriesFor: ILE10ServiceOffering[], targetId: number): {
    category: ILE10ServiceOffering | null,
    subcategory: ILE10ServiceOffering | null
  } => {

    // console.log("Searching for categories...", categoriesFor);

    for (const item of categoriesFor) {

      // console.log("item:", item);
      // check if subcategory exist
      // 2. If it has children, search them recursively
      if (item.children && item.children.length > 0) {
        const found = findCategoryDeep(item.children, targetId);
        if (found.category !== null) return {
          category: item,
          subcategory: found.category
        };
      }
      // console.log("item:", item);
      // check if category exist
      // 1. Check if the current item is the match
      if (item.term_id === targetId) return {
        category: item,
        subcategory: null
      };
    }
    // 3. Return null if nothing is found in this branch
    return {
      category: null,
      subcategory: null
    };
  };

  const SetInitialDataIfIsEditor = async () => {
    if (initialData === undefined || initialData === null) return;

    setLoading(true);

    setToggleTarget(initialData.type === "category" ? "rank-by-service" : "rank-by-location");
    setRankingProductId(initialData.stripe_product_id as string);
    setRankingProduct(
      stripeRankingProducts.find((p) => p.id === initialData.stripe_product_id) as StripeProductWithPrices
    );


    console.log("initialData:", initialData);

    const serviceData = findCategoryDeep(categories, Number(initialData.service_id));
    if (serviceData.category !== null && serviceData.subcategory !== null) {
      setSelectedCategoryId(serviceData.category.term_id.toString());
      setSelectedSubServiceId(serviceData.subcategory.term_id.toString());
    }
    else if (serviceData.category !== null) {
      setSelectedCategoryId(serviceData.category.term_id.toString());
    }
    console.log("serviceData:", serviceData);
    if (initialData.location_data) {
      setLocationId(JSON.parse(initialData.location_data).place_id)
    }


    setLoading(false);
  }

  const InitTheEditor = async () => {
    await LoadMyCategories();
    await LoadStripeRankProducts();
  }

  useEffect(() => {
    /*LoadMyCategories();
    LoadStripeRankProducts();*/
    InitTheEditor();
  }, []);

  useEffect(() => {
    SetInitialDataIfIsEditor();
  }, [categories, stripeRankingProducts]);

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
          {
            /*<Link href="/DashboardV2/FeaturedRanking/AddNewRanking" className="btn btn-light ">
            Add New
          </Link>*/
          }
        </div>
      </div>


      <div className="ranking-items-list">
        <div className="item-ranking-card" >
          <div className="add-preview-panel">
            <div className="heading">
              <div className="left-content">
                <h5>"{
                  // Home Renovation
                  (() => {
                    if (toggleTarget === "rank-by-service") {
                      if (selectedSubcategoryObject !== undefined) return selectedSubcategoryObject.name;
                      if (selectedCategoryObject !== undefined) return selectedCategoryObject.name;
                    }
                    if (toggleTarget === "rank-by-location") {
                      if (locationId !== "") {
                        return <>
                          <strong>{locationObject?.city}</strong>
                          <br />
                          {locationObject?.display_name}
                        </>;
                      }
                    }
                    return "[Ranking Subject]"
                  })()
                }"</h5>
              </div>
              <div className="right-content">
                <div className="current-plan-label success">{

                  (() => {
                    if (rankingProduct !== null) {
                      const rankPosition = Number(rankingProduct?.metadata?.rank_type);
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
                    }
                    return <>-</>
                  })()

                }</div>
              </div>
            </div>
            <div className="content-inner">
              <div className="left-content">
                <Image src={example_listing_thumbnail} alt="image" width={250} height={250} />
                <div className="inner-titles-and-paragraphs">
                  <h5>{
                    // Peaceful Funeral Home 
                    user.defaultListing.name
                  }</h5>
                  <p>ID: #{user.defaultListing.id}</p>
                </div>
              </div>
              <div className="right-content">
                {
                  /*
                  <Button type="button" variant="light" className="btn-circle-icon">
                  <img src={icon_edit.src} alt="icon-edit" />
                </Button>
                 */
                }
                {
                  initialData !== undefined && <Button type="button" variant="light" className="btn-circle-icon" onClick={async () => {
                    const feedbackAfterRemovingData = await getApiData<{
                      ok: boolean,
                      // items: IRankData[]
                    }>("/listings/RankingCard_RemoveItemFromCart", "POST", {
                      // listing_id: user.defaultListing.id,
                      rank_data: initialData
                    }, "authorize", "application/json");
                    console.log("feedbackAfterRemovingData:", feedbackAfterRemovingData);
                    if (feedbackAfterRemovingData.ok) {

                      dispatch(shopSlice.actions.RemoveCardItemFromCard(initialData.id || 0));

                      router.push("/DashboardV2/FeaturedRanking/")
                    }
                  }}>
                    <img src={icon_delete.src} alt="icon-delete" />
                  </Button>
                }
              </div>
            </div>
            <div className="footer-for">
              <p>Per Month {
                rankingProduct === undefined || rankingProduct === null || rankingProduct?.monthly === undefined || rankingProduct?.monthly?.unit_amount === undefined || rankingProduct?.monthly?.unit_amount === null ? "-" : formatPrice(rankingProduct?.monthly?.unit_amount / 100)
              }</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="card-hr " />

      <div className="targeting-strategy-section">
        <div className="left-content">
          <h5>Targeting Strategy</h5>
          <p>Where should your ad appear?</p>
        </div>
        <div className="right-content">
          <ZSwitcherTabs
            targets={["rank-by-service", "rank-by-location"]}
            toggleTarget={toggleTarget}
            setToggleTarget={setToggleTarget}
          />
        </div>
      </div>


      <form className='form-dashboard'>
        <Container>

          {
            toggleTarget === "rank-by-service" && <>
              <Row>
                <Col>
                  <TextInput
                    id='service-category-target'
                    label='Which Service Category target'
                    placeholder=''
                    type='select'
                    options={
                      [
                        {
                          value: '',
                          label: 'Select Category'
                        },
                        ...categories.map((category) => {
                          return {
                            value: category.term_id.toString(),
                            label: category.name
                          }
                        })
                      ]}
                    onChange={(e) => {
                      setSelectedCategoryId(e.target.value)
                    }}
                    value={selectedCategoryId}
                  />
                </Col>
              </Row>

              {
                (
                  selectedCategoryObject &&
                  selectedCategoryObject?.children.length > 0
                ) && <Row>
                  <Col>
                    <TagsButtonsPlusMinus
                      title="Cremation Services"
                      onTagClick={(item) => {
                        setSelectedSubServiceId(item.value as string)
                      }}
                      tags={[

                        ...(selectedCategoryObject?.children?.map((child) => {
                          return {
                            value: child.term_id.toString(),
                            label: child.name,
                            object: child,
                            selected: child.term_id.toString() === selectedSubServiceId

                          }
                        }) ?? [])
                      ]}
                    />
                  </Col>
                </Row>
              }




            </>
          }

          {
            toggleTarget === "rank-by-location" && <>
              <Row>
                <Col>
                  <TextInput
                    id='location-target'
                    label='Which Location target'
                    placeholder=''
                    type='select'
                    options={[
                      {
                        value: '',
                        label: 'Select Location'
                      },
                      ...(
                        user.defaultListing.data.services_areas_and_categories.locations.map((location) => {
                          return {
                            value: location.place_id,
                            label: location.display_name
                          }
                        })
                      )
                    ]}
                    onChange={(e) => {
                      setLocationId(e.target.value)
                    }}
                    value={locationId}
                  />
                </Col>
              </Row>
            </>
          }



          {
            /*<Row>
            <Col>
              <TextInput
                label="Price per month"
                id="price-per-month"
                type="text"
                placeholder="Price"
                onChange={() => { }}
                value=""
              />
            </Col>
          </Row>*/
          }

          <Row>
            <Col>
              <div className="ranking-position-selector">
                <h3>Select Ranking Position</h3>
                <div className="ranking-position-radios">
                  {
                    stripeRankingProducts.map((rankProduct, index) => {
                      return <label key={index} htmlFor={`ranking-position-${index}`} className="ranking-position-radio">
                        <input type="radio" name="ranking-position" id={`ranking-position-${index}`} checked={rankingProductId === rankProduct?.id} onChange={() => {
                          setRankingProductId(rankProduct.id as string);
                          setRankingProduct(rankProduct);
                          console.log("rankProduct:", rankProduct);
                        }} />
                        <div className='the-content'>
                          <strong>{rankProduct.name}</strong>
                          {formatPrice((rankProduct.monthly?.unit_amount || 0) / 100)}/month
                        </div>

                        <div className="dot-icon">
                          <img src={dot_solid_circle.src} alt="icon" className='checked-dot' />
                          <img src={dot_not_solid.src} alt="icon" className='not-checked-dot' />
                        </div>
                      </label>
                    })
                  }
                </div>
              </div></Col>
          </Row>



          <Row className="row-buttons">
            <Col>
              <Link href="/DashboardV2/FeaturedRanking/" className={`btn btn-light ${loading ? "loading" : ""}`} onClick={() => {
                // ___SaveThePart();
              }}>
                Cancel
              </Link>



              {
                initialData === undefined && <Button
                  variant="success"
                  type="button" className={`${loading ? "loading" : ""}`}
                  disabled={!ICanAddToCard()}
                  onClick={() => {
                    /*___SaveThePart(
                      true // redirect
                    );*/

                    AddUpdateItemNewRankingToCard();
                  }}>
                  Add to Cart
                </Button>
              }
              {
                initialData !== undefined && <Button
                  variant="success"
                  type="button" className={`${loading ? "loading" : ""}`}
                  disabled={!ICanAddToCard()}
                  onClick={() => {
                    /*___SaveThePart(
                      true // redirect
                    );*/

                    AddUpdateItemNewRankingToCard();
                  }}>
                  Edit The Cart Item
                </Button>
              }
            </Col>
          </Row>


        </Container>
      </form>




    </div>

  </>
}