"use client";

import BusinessHoursEditor from "@/app/DashboardV2/DashboardComponents/BusinessHoursEditor/BusinessHoursEditor";
import { useAuth } from "@/ContextProvider/AuthProviderWrap";
import { getApiData } from "@/utils/api";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export interface IBusinessHour {
  day: string,
  time_start: string,
  time_end: string,
  day_week_is_available: boolean,
  it_is_working_24_hours: boolean
}

export default function BusinessHoursEditorWrap() {

  const [loading, setLoading] = useState(false);

  const [businessHours, setBusinessHours] = useState<IBusinessHour[]>([]);

  const { user } = useAuth();
  if (!user) return <></>;

  const fetchBusinessHours = async () => {
    try {
      setLoading(true);
      const res = await getApiData<{
        businessHours: IBusinessHour[],
        status: string
      }>("/listings/GET_BusinessHours", "POST", {
        listing_id: user.defaultListing.id
      }, "authorize", "application/json")
      setBusinessHours(res.businessHours);

      console.log("Getting the working hours from the backend:", res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBusinessHours();
  }, []);

  const SaveTheBusinessHours = async () => {
    try {
      setLoading(true);
      const res = await getApiData<{ status: string, message: string }>("/listings/SAVE_BusinessHours", "POST", {
        listing_id: user.defaultListing.id,
        businessHours: businessHours
      }, "authorize", "application/json")
      console.log("The response from the backend:", res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  return <>
    <div className="panel-content-wrap">


      <div className="heading">
        <h3>Business Hours</h3>
        <p>Specify your business working hours</p>
      </div>


      <form onSubmit={() => { }} className="form-dashboard">
        <Container>
          <Row>
            <Col>

              <BusinessHoursEditor
                businessHours={businessHours}
                onUpdate={(updatedBusinessHours: IBusinessHour[]) => {
                  setBusinessHours(updatedBusinessHours);
                }}
              />

            </Col>
          </Row>

          <Row className="row-buttons">
            <Col>
              <Button variant="light" type="button" className={loading ? "loading" : ""} onClick={() => {
                SaveTheBusinessHours();
              }}>
                Save The Business Hours
              </Button>

              {
                /*<Button variant="success" type="button" className={loading ? "loading" : ""} onClick={() => {
                SaveTheFAQs(true)
              }}>
                Save & Continue
              </Button>*/
              }
            </Col>
          </Row>

        </Container>
      </form>

    </div>
  </>
}