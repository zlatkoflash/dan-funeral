"use client";

import FAQsEditor from "@/app/DashboardV2/DashboardComponents/FAQsEditor/FAQsEditor";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { getApiData } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export interface IFAQBusiness {
  title: string;
  answer: string;
  order: number;
}

export default function BusinessFAQsEditor() {
  const { user } = useAuth();

  if (!user) {
    return <></>;
  }

  const [loading, setLoading] = useState<boolean>(false);

  const [faqsBusiness, setFAQsBusiness] = useState<IFAQBusiness[]>([]);

  const router = useRouter();

  const SaveTheFAQs = async (goNext: boolean = false) => {
    setLoading(true);

    const results = await getApiData(
      "/listings/EditBusiness_SaveFAQs",
      "POST",
      {
        listing_id: user.defaultListing.id,
        faqs: faqsBusiness,
      },
      "authorize",
      "application/json",
    );

    console.log("Results after saving the FAQs:", results);

    setLoading(false);

    if (goNext) {
      // router.refresh();
      // router.push("/DashboardV2/EditBusiness/BusinessHours");
      window.location.href = "/DashboardV2/EditBusiness/BusinessHours";
    }
  };

  const fetchTheFAQs = async () => {
    const results = await getApiData<{
      ok: boolean;
      message: string;
      faqs: IFAQBusiness[];
    }>(
      "/listings/GET_FAQs",
      "POST",
      {
        listing_id: user.defaultListing.id,
      },
      "authorize",
      "application/json",
    );
    console.log("Results after fetching the FAQs:", results);
    setFAQsBusiness(results.faqs);
  };
  useEffect(() => {
    fetchTheFAQs();
  }, []);

  return (
    <>
      <div className="panel-content-wrap">
        <div className="heading">
          <h3>Frequently Asked Questions</h3>
          <p>
            These tags are unlimited across all plans. They power internal
            search and improve SEO.
          </p>
        </div>

        <form onSubmit={() => {}} className="form-dashboard">
          <Container>
            <Row>
              <Col>
                <FAQsEditor
                  onUpdateOrder={(
                    faq: IFAQBusiness,
                    index: number,
                    direction: "up" | "down",
                  ) => {
                    //onUpdateOrder(faq, index, direction);
                    if (direction === "up") {
                      if (index === 0) return;
                      const updatedFAQs = [...faqsBusiness];
                      const temp = updatedFAQs[index - 1];
                      updatedFAQs[index - 1] = updatedFAQs[index];
                      updatedFAQs[index] = temp;
                      setFAQsBusiness(updatedFAQs);
                    } else {
                      if (index === faqsBusiness.length - 1) return;
                      const updatedFAQs = [...faqsBusiness];
                      const temp = updatedFAQs[index + 1];
                      updatedFAQs[index + 1] = updatedFAQs[index];
                      updatedFAQs[index] = temp;
                      setFAQsBusiness(updatedFAQs);
                    }
                  }}
                  faqsBusiness={faqsBusiness}
                  onDeleteFAQ={(index: number) => {
                    setFAQsBusiness((prevFAQs) => {
                      return prevFAQs.filter((_, i) => i !== index);
                    });
                  }}
                  onUpdateFAQ={(faq: IFAQBusiness, index: number) => {
                    setFAQsBusiness((prevFAQs) => {
                      const updatedFAQs = [...prevFAQs];
                      updatedFAQs[index] = faq;
                      return updatedFAQs;
                    });
                  }}
                  onAddFAQ={(faq: IFAQBusiness) => {
                    setFAQsBusiness((prevFAQs) => {
                      return [...prevFAQs, faq];
                    });
                  }}
                />
              </Col>
            </Row>

            <Row className="row-buttons">
              <Col>
                <Button
                  variant="light"
                  type="button"
                  className={loading ? "loading" : ""}
                  onClick={() => {
                    SaveTheFAQs();
                  }}
                >
                  Save The Draft
                </Button>

                <Button
                  variant="success"
                  type="button"
                  className={loading ? "loading" : ""}
                  onClick={() => {
                    SaveTheFAQs(true);
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
