import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "react-bootstrap";
import FilterPriceRange from "./Filters/FilterPriceRange";
import FilterServices from "./Filters/FilterServices";
import FilterAvailability from "./Filters/FilterAvilability";
import FilterCulturalAndReligiousServices from "./Filters/FilterCulturalAndReligiousServices";
import FilterDistance from "./Filters/FilterDistance";

export default function TheFiltersForTheList() {
  return <>
    <div className="the-filters-panel">

      <Accordion defaultActiveKey="0">

        <AccordionItem eventKey="0">
          <AccordionHeader>Price Range</AccordionHeader>
          <AccordionBody>
            <FilterPriceRange />
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="1">
          <AccordionHeader>Services</AccordionHeader>
          <AccordionBody>
            <FilterServices />
          </AccordionBody>
        </AccordionItem>

        <AccordionItem eventKey="2">
          <AccordionHeader>Availability</AccordionHeader>
          <AccordionBody>
            <FilterAvailability />
          </AccordionBody>
        </AccordionItem>

        <AccordionItem eventKey="3">
          <AccordionHeader>Cultural/Religious Services</AccordionHeader>
          <AccordionBody>
            <FilterCulturalAndReligiousServices />
          </AccordionBody>
        </AccordionItem>


        <AccordionItem eventKey="4">
          <AccordionHeader>Distance</AccordionHeader>
          <AccordionBody>
            <FilterDistance />
          </AccordionBody>
        </AccordionItem>

      </Accordion>

    </div>
  </>
}