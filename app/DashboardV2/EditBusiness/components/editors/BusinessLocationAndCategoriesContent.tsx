"use client";

import TextInput from "@/components/forms/Input";
import ZProgressBar from "@/components/zprogressbar/ZProgressBar";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import info_green_icon from "@/assets/images/icon-info-green.svg";
import TagSelector, { ITagSelectorItem } from "@/components/forms/InputTags";
import TagsButtonsPlusMinus from "@/components/forms/TagsButtonsPlusMinus";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { dashboardSlice } from "@/redux/features/DashboardSlice";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { ILE10ServiceOffering } from "@/app/Dashboard/MyListing/content/ListingEditor/content/LE10ServiceOffering";
import { useEffect, useState } from "react";
import { getApiData } from "@/utils/api";
import InputSearchDropdownAddressesDV2, {
  ILocationItemSelected,
} from "@/components/forms/InputSearchDropdownAddressesDV2";
import TagsButtonsAddRemoveItems from "@/components/forms/TagsButtonsPlusMinus/indexWithRemovingItems";
import { useRouter } from "next/navigation";

export default function BusinessLocationAndCategoriesContent() {
  const { user } = useAuth();

  const dispatch = useAppDispatch();
  // const modalPlansShow = useAppSelector((state) => state.dashboard.modalPlansShow);

  if (!user?.defaultListing) {
    return null;
  }

  const slots_count = user.defaultListing.counts.slots;
  const slots_count_used = user.defaultListing.counts_used.slots;

  // const progress = slots_count_used / (slots_count > 0 ? slots_count : 1) * 100;

  const [serviceOfferingList, setServiceOfferingList] = useState<
    ILE10ServiceOffering[]
  >([]);
  const LoadTheServicesOFfersCategories = async () => {
    const categoriesOffering = await getApiData<{
      ok: boolean;
      categories: ILE10ServiceOffering[];
    }>(`/listings/get-service-offering-categories`, "GET");
    // console.log("categoriesOffering:", categoriesOffering);
    setServiceOfferingList(categoriesOffering.categories);
    // console.log("categoriesOffering.categories:", categoriesOffering.categories);

    const selectedCategoriesAndSubcategories =
      user.defaultListing.data.services_areas_and_categories
        .categories_and_subcategories;
    /*const selectedCategoriesTagsInit = selectedCategoriesAndSubcategories.map((categoryId: number) => {
      const category = categoriesOffering.categories.find((category) => category.term_id === categoryId);
      return {
        value: categoryId,
        label: category?.name,
        object: category
      }
    });*/
    const selectedCategoriesTagsInit: ITagSelectorItem[] = [];
    console.log("selectedCategoriesAndSubcategories:");
    selectedCategoriesAndSubcategories.forEach((categoryId: number) => {
      const category = categoriesOffering.categories.find(
        (category) => category.term_id === categoryId,
      );
      console.log("category:", category);
      if (category && category.children.length > 0) {
        selectedCategoriesTagsInit.push({
          value: categoryId,
          label: category?.name,
          object: category,
        });
      }
    });
    console.log("selectedCategoriesTagsInit:", selectedCategoriesTagsInit);
    setSelectedCategoriesTags(selectedCategoriesTagsInit);
  };

  const totalSlotsSelected = () => {
    let totalSlots = 0;
    totalSlots += locationsItems.length;
    /*selectedCategoriesTags.forEach((tag) => {
      totalSlots += tag.object.children.length;
    });*/
    selectedCategoriesIds.forEach((categoryId) => {
      /**
       * Now we check if the id of categories do not belong to the parent categories list
       * if it does not belong to the parent categories list, it means that it belong to the children list
       * and in this case we add 1 to the total slots
       */
      const categoryFor = serviceOfferingList.find(
        (category) => category.term_id === categoryId,
      );
      if (!categoryFor) {
        // this mean that id belong of the children of some category
        totalSlots += 1;
      }
    });
    return totalSlots > slots_count ? slots_count : totalSlots;
  };
  const totalProgress = () => {
    const totalProgress =
      (totalSlotsSelected() / (slots_count > 0 ? slots_count : 1)) * 100;
    return totalProgress > 100 ? 100 : totalProgress;
  };
  const ICanAddNewSlot = () => {
    return totalSlotsSelected() < slots_count;
  };

  const [selectedCategoriesTags, setSelectedCategoriesTags] = useState<
    ITagSelectorItem[]
  >([]);

  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>(
    user.defaultListing.data.services_areas_and_categories
      .categories_and_subcategories,
  );
  //
  console.log("user.defaultListing.data:", user.defaultListing.data);

  useEffect(() => {
    LoadTheServicesOFfersCategories();
  }, []);

  const [latestSelectedLocation, setLatestSelectedLocation] =
    useState<ILocationItemSelected | null>(null);
  const selectedLocationsInit =
    user.defaultListing.data.services_areas_and_categories.locations;
  const [locationsTags, setLocationsTags] = useState<ITagSelectorItem[]>(
    selectedLocationsInit.map((item) => {
      return {
        value: item.place_id,
        label: item.display_name,
        object: item,
      };
    }),
  );
  const [locationsItems, setLocationsItems] = useState<ILocationItemSelected[]>(
    selectedLocationsInit,
  );

  // locationsItems[0].

  const AddNewLocation = () => {
    console.log("Add New Location");
    if (latestSelectedLocation) {
      setLocationsItems([...locationsItems, latestSelectedLocation]);
      setLocationsTags([
        ...locationsTags,
        {
          value: latestSelectedLocation.place_id,
          label: (
            <>
              {/*<span>Display Name: {latestSelectedLocation.display_name}</span>
          <span>City: {latestSelectedLocation.city}</span>
          <span>Country: {latestSelectedLocation.country}</span>
          <span>Postcode: {latestSelectedLocation.postcode}</span>*/}
              {latestSelectedLocation.display_name}
            </>
          ),
        },
      ]);
    }
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const SaveTheSlots = async (doRedirect: boolean = false) => {
    setLoading(true);
    const response = await getApiData(
      "/listings/UPDATE_BusinessLocationsAndCategories",
      "POST",
      {
        categoriesIds: [
          ...selectedCategoriesIds,
          ...selectedCategoriesTags.map((tag) => tag.value),
        ],
        subcategoriesOnlyIds: selectedCategoriesIds,
        locationsIds: locationsItems.map((item) => item.place_id),
        listing_id: user.defaultListing.id,

        locationsItems: locationsItems,
      },
      "authorize",
      "application/json",
    );
    console.log("response:", response);
    setLoading(false);

    if (doRedirect === true) {
      // router.refresh();
      // router.push("/DashboardV2/EditBusiness/MediaGallery");
      window.location.href = "/DashboardV2/EditBusiness/MediaGallery";
    }
  };

  console.log("Business is rendering....");

  return (
    <>
      <div className="panel-content-wrap">
        <div className="heading">
          <h3>Service Areas & Categories</h3>
          <p>
            Locations and categories share the same slot pool. Each consumes 1
            slot from your plan's allowance.
          </p>
        </div>

        <section className="dashboard-sidebar-menu">
          {/*<div className="box-cell-content">
            <div className="title">Plan Usage</div>
          </div>*/}

          <div className="box-cell-content">
            <ZProgressBar
              progress={totalProgress()}
              variant={`${totalProgress() >= 100 ? "warning" : "success"}`}
              labels={{
                start: "Slots",
                end: `${totalSlotsSelected()}/${slots_count}`,
              }}
            />
          </div>

          {
            // <>Total Slots: {totalSlotsSelected()}</>
          }

          {totalSlotsSelected() >= slots_count && (
            <div className="box-cell-content">
              <Alert variant="success">
                <img src={info_green_icon.src} alt="Info" className="icon" />
                <span className="content">
                  Slot limit reached. Upgrade your plan to add more.
                </span>
              </Alert>
            </div>
          )}
        </section>

        <form onSubmit={() => {}} className="form-dashboard">
          <Container>
            <Row>
              <Col md={6} className="have-button-right">
                {/*<TextInput id="business-name" label="Add city or zip code" placeholder="Add city or zip code" type="text" value={""} onChange={(e: any) => { }} errorsCasses={["required"]}
                  childrenAfterInput={
                    <Button variant="light">Add</Button>
                  }
                />*/}
                <InputSearchDropdownAddressesDV2
                  placeholder="Select Area Where You Provide Services"
                  onSelect={(item: ILocationItemSelected) => {
                    console.log("item:", item);
                    // item.
                    setLatestSelectedLocation(item);
                  }}
                />
                <Button
                  type="button"
                  variant="light"
                  className={
                    latestSelectedLocation
                      ? // && ICanAddNewSlot()
                        ""
                      : "disabled"
                  }
                  onClick={() => {
                    if (ICanAddNewSlot()) {
                      AddNewLocation();
                    } else {
                      dispatch(dashboardSlice.actions.setModalPlansShow(true));
                    }
                  }}
                >
                  Add
                </Button>
              </Col>
            </Row>

            {locationsTags.length > 0 && (
              <Row>
                <Col md={12}>
                  <TagsButtonsAddRemoveItems
                    title="Areas we Serve"
                    tags={locationsTags}
                    onTagClick={(tag: ITagSelectorItem) => {
                      console.log("tag:", tag);
                      // here tags should be removed
                      setLocationsTags(
                        locationsTags.filter((t) => t.value !== tag.value),
                      );
                      setLocationsItems(
                        locationsItems.filter((t) => t.place_id !== tag.value),
                      );
                    }}
                  />
                </Col>
              </Row>
            )}

            <Row>
              <Col md={12}>
                <TagSelector
                  onTagsChange={(tags: ITagSelectorItem[]) => {
                    console.log("It is working on change....");
                    // dispatch(dashboardSlice.actions.setModalPlansShow(true));
                    setSelectedCategoriesTags(tags);
                  }}
                  title="Categories"
                  items={serviceOfferingList.map((category) => ({
                    value: category.term_id,
                    label: category.name,
                    object: category,
                  }))}
                  value={selectedCategoriesTags}
                />
              </Col>
            </Row>

            {selectedCategoriesTags.map(
              (tag: ITagSelectorItem, index: number) => {
                const category = tag.object as ILE10ServiceOffering;
                return (
                  <Row key={`subactegories-${index}`}>
                    <Col md={12}>
                      <TagsButtonsPlusMinus
                        title={category.name}
                        tags={category.children?.map((subcategory) => {
                          return {
                            value: subcategory.term_id,
                            label: subcategory.name,
                            object: subcategory,
                            selected: selectedCategoriesIds.includes(
                              subcategory.term_id,
                            ),
                          };
                        })}
                        onTagClick={(tag: ITagSelectorItem) => {
                          console.log("tag:", tag);
                          if (!tag.selected && !ICanAddNewSlot()) {
                            dispatch(
                              dashboardSlice.actions.setModalPlansShow(true),
                            );
                            return;
                          }
                          if (
                            selectedCategoriesIds.includes(tag.value as number)
                          ) {
                            setSelectedCategoriesIds(
                              selectedCategoriesIds.filter(
                                (id) => id !== tag.value,
                              ),
                            );
                          } else {
                            setSelectedCategoriesIds([
                              ...selectedCategoriesIds,
                              tag.value as number,
                            ]);
                          }
                        }}
                      />
                    </Col>
                  </Row>
                );
              },
            )}

            {/*<Row>
              <Col md={12}>
                <TagsButtonsPlusMinus />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <TagsButtonsPlusMinus />
              </Col>
            </Row>*/}

            <Row className="row-buttons">
              <Col>
                <Button
                  variant="light"
                  type="button"
                  className={loading ? "loading" : ""}
                  onClick={() => {
                    SaveTheSlots();
                  }}
                >
                  Save The Draft
                </Button>

                <Button
                  variant="success"
                  type="button"
                  className={loading ? "loading" : ""}
                  onClick={() => {
                    SaveTheSlots(true);
                  }}
                >
                  Save & Continue
                </Button>
              </Col>
            </Row>
          </Container>
        </form>
      </div>
    </>
  );
}
