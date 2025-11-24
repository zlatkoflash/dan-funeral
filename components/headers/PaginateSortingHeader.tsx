"use client"

import { Col, Container, Row } from "react-bootstrap";
import ZDropdown from "../forms/ZDropdown";
import { useState } from "react";

export default function PaginateSortingHeader() {

  const [sortingValue, set_sortingValue] = useState<string>("Most Popular");

  return <section className="pagination-sorting-header">
    <Container>
      <Row>
        <Col>
          <div className="left-content">
            Showing 1-10 of 100 Products
          </div>
          <div className="right-content">
            Sort by: <ZDropdown variant="dropdown-for-sort" data={[
              {
                value: "Most Popular",
                text: "Most Popular"
              },
              {
                value: "Price",
                text: "Price"
              },
              {
                value: "Score",
                text: "Score"
              },
            ]} value={sortingValue}
              onChange={(v: string) => {
                set_sortingValue(v);
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
}