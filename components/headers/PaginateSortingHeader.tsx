"use client";

import { Col, Container, Row } from "react-bootstrap";
import ZDropdown from "../forms/ZDropdown";
import { useState } from "react";
import { useListingsPublic } from "@/ContextProvider/ListingCardsProvider";
import { executeSearchFiltersRedirect } from "@/utils/listing";
import { useRouter } from "next/navigation";

export default function PaginateSortingHeader() {
  const router = useRouter();

  const { totalCount, setTotalCount, TotalPages, currentPage, itemsPerPage } =
    useListingsPublic();
  const [sortingValue, set_sortingValue] = useState<string>("Most Popular");

  return (
    <section className="pagination-sorting-header">
      <Container>
        <Row>
          <Col>
            <div className="left-content">
              Showing {(currentPage - 1) * itemsPerPage + 1}-
              {currentPage * itemsPerPage > totalCount
                ? totalCount
                : currentPage * itemsPerPage}{" "}
              of {totalCount} Products
            </div>
            <div className="right-content">
              Sort by:{" "}
              <ZDropdown
                variant="dropdown-for-sort"
                data={[
                  {
                    value: "rating",
                    text: "Rating: High to Low",
                  },
                  {
                    value: "reviews_count",
                    text: "Number of Reviews",
                  },
                  /*{
                value: "distance",
                text: "Distance (Closest First)"
              },*/
                ]}
                value={sortingValue}
                onChange={(v: string) => {
                  set_sortingValue(v);

                  executeSearchFiltersRedirect({
                    paramsArray: [{ paramName: "orderBy", paramValue: v }],
                    router: router,
                    currentParams: new URLSearchParams(window.location.search),
                    pageIndex: currentPage,
                  });
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
