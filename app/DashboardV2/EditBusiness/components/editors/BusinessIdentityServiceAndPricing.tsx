"use client";

import BusinessHoursEditor from "@/app/DashboardV2/DashboardComponents/BusinessHoursEditor/BusinessHoursEditor";
import FAQsEditor from "@/app/DashboardV2/DashboardComponents/FAQsEditor/FAQsEditor";
import ServicesEditor, {
  IOtherService,
} from "@/app/DashboardV2/DashboardComponents/ServicesEditor/ServicesEditor";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { getApiData } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function BusinessIdentityServiceAndPricing() {
  const [services, setServices] = useState<IOtherService[]>([]);

  const { user } = useAuth();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  if (!user) return <></>;

  const fetchServices = async () => {
    const resultServices = await getApiData<{
      ok: boolean;
      services: IOtherService[];
    }>(
      "/listings/GET_OtherServices",
      "POST",
      {
        listing_id: user.defaultListing.id,
      },
      "authorize",
      "application/json",
    );

    setServices(resultServices.services);

    console.log("resultServices:", resultServices);
  };

  const updateServices = async (services: IOtherService[]) => {

    // services[0].
    console.log("services:", services);

    const resultServices = await getApiData<{
      ok: boolean;
      message: string;
    }>(
      "/listings/UPDATE_OtherServices",
      "POST",
      {
        listing_id: user.defaultListing.id,
        services: services,
      },
      "authorize",
      "application/json",
    );
    console.log("resultServices:", resultServices);
  };

  const SaveServices = async (goNext: boolean = false) => {
    setLoading(true);

    await updateServices(services);

    if (goNext) {
      // dispatch(dashboardSlice.actions.setEditorPage(2));
      // router.refresh();
      // router.push("/DashboardV2/EditBusiness/QuestionsAndAnswers");
      window.location.href = "/DashboardV2/EditBusiness/QuestionsAndAnswers";
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <div className="panel-content-wrap">
        <div className="heading">
          <h3>Quick Facts & Services</h3>
          <p>
            These tags are unlimited across all plans. They power internal
            search and improve SEO.
          </p>
        </div>

        <form onSubmit={() => {}} className="form-dashboard">
          <Container>
            <Row>
              <Col>
                <ServicesEditor
                  services={services}
                  onDeleteService={(index: number) => {
                    setServices((prevServices) => {
                      return prevServices.filter((_, i) => i !== index);
                    });
                  }}
                  onUpdateService={(service: IOtherService, index: number) => {
                    setServices((prevServices) => {
                      const updatedServices = [...prevServices];
                      updatedServices[index] = service;
                      return updatedServices;
                    });
                  }}
                  onAddService={(service: IOtherService) => {
                    setServices((prevServices) => {
                      return [...prevServices, service];
                    });
                  }}
                />
              </Col>
            </Row>

            {/*<Row>
              <Col>
                <FAQsEditor />
              </Col>
            </Row>

            <Row>
              <Col>
                <BusinessHoursEditor />
              </Col>
            </Row>*/}

            <Row className="row-buttons">
              <Col>
                <Button
                  variant="light"
                  type="button"
                  className={loading ? "loading" : ""}
                  disabled={loading}
                  onClick={() => {
                    SaveServices(false);
                  }}
                >
                  Save The Draft
                </Button>

                <Button
                  variant="success"
                  type="button"
                  className={loading ? "loading" : ""}
                  disabled={loading}
                  onClick={() => {
                    SaveServices(true);
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
