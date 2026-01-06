import { Col, Container, Row } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import WeeklyScheduler, { DaySchedule } from "@/components/grids/WeeklyScheduler";
import { useState } from "react";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";

/*
we will use here the interface "DaySchedule"
export interface I6WorkingHours {
  
}*/

export default function LE6WorkingHours() {

  const {
    // listing, setListing, 
    setActiveMyListingSlug,
    LE6BusinessHours,
    setLE6BusinessHours

  } = useMyListing();

  const [daysSchedule, setDaysSchedule] = useState<DaySchedule[]>(LE6BusinessHours);

  return <form onSubmit={() => { }} className="form-dashboard">
    <Container>
      <Row>
        <Col>
          <h3 className="title text-start">Business Hours</h3>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <WeeklyScheduler initialData={LE6BusinessHours} onUpdate={(data: DaySchedule[]) => {
            console.log("data:", data);
            setDaysSchedule(data)
          }} />
        </Col>
      </Row>

      <AButtonUpdateCreateListing

        onContinue={() => {
          // console.log("daysSchedule:", daysSchedule); return;//debugging
          //setListing({ ...listing, businessHours: daysSchedule });
          setActiveMyListingSlug("listing-video");
        }}
        onSubmit={() => { }}
        savingPartType="businessHours"
        inputsData={{
          data: daysSchedule
        }}

      />

    </Container>
  </form>
}