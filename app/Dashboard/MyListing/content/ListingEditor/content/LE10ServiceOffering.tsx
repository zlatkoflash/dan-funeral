import { Col, Container, Row, Form } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";
import { useEffect, useState } from "react";
import { getApiData } from "@/utils/api";

export interface ILE10ServiceOffering {
  term_id: number;
  name: string;
  slug: string;
  children: ILE10ServiceOffering[];
}

export default function LE10ServiceOffering() {
  const {
    listing,
    setListing,
    setActiveMyListingSlug,
    LE10ServiceOffering,
    setLE10ServiceOffering
  } = useMyListing();

  // Temporary local array
  /*const services = [
    { id: "s1", label: "Consulting" },
    { id: "s2", label: "Implementation" },
    { id: "s3", label: "24/7 Support" },
    { id: "s4", label: "Maintenance" },
    { id: "s5", label: "Custom Design" },
    { id: "s6", label: "Training" },
  ];*/
  const [serviceOfferingList, setServiceOfferingList] = useState<ILE10ServiceOffering[]>([]);
  const [serviceOfferingChecked, setServiceOfferingChecked] = useState<ILE10ServiceOffering[]>(LE10ServiceOffering);

  console.log("LE10ServiceOffering:", LE10ServiceOffering);

  const LoadTheServicesOFfersCategories = async () => {
    const categoriesOffering = await getApiData<{

      ok: boolean,
      categories: ILE10ServiceOffering[]

    }>(`/listings/get-service-offering-categories`, "GET");
    console.log("categoriesOffering:", categoriesOffering);
    setServiceOfferingList(categoriesOffering.categories);
    console.log("categoriesOffering.categories:", categoriesOffering.categories);
  }

  const __CheckIfCategoryIsChecked = (item: ILE10ServiceOffering): boolean => {
    // Use .some() to check if the item exists in the main array or within any children
    return serviceOfferingChecked.some((checkedItem) => {
      // 1. Check if the top-level item matches
      if (checkedItem.term_id === item.term_id) {
        return true;
      }

      // 2. If the item has children, check them recursively
      /*if (checkedItem.children && checkedItem.children.length > 0) {
        return __CheckIfItemInChildArray(item.term_id, checkedItem.children);
      }*/

      return false;
    });
  };

  // Helper function to handle the recursive nesting
  const __CheckIfItemInChildArray = (targetId: number, children: ILE10ServiceOffering[]): boolean => {
    return children.some(child => {
      if (child.term_id === targetId) return true;
      if (child.children && child.children.length > 0) {
        return __CheckIfItemInChildArray(targetId, child.children);
      }
      return false;
    });
  };

  const ___CheckItem = (item: ILE10ServiceOffering): React.ReactNode => {
    return <Form.Check
      key={`service-offering-${item.term_id}`}
      type="checkbox"
      id={`service-offering-${item.term_id}`}
      label={item.name}
      checked={
        __CheckIfCategoryIsChecked(item)
      }
      onChange={(e) => {
        if (e.target.checked) {
          setServiceOfferingChecked([...serviceOfferingChecked, item]);
        } else {
          setServiceOfferingChecked(serviceOfferingChecked.filter((i) => i.term_id !== item.term_id));
        }
      }}
    />
  }

  useEffect(() => {
    LoadTheServicesOFfersCategories();
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="form-dashboard">
      <Container>
        <Row>
          <Col>
            <h3 className="title text-start">Service Offering</h3>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* CSS Grid Wrapper - No Bootstrap Cols used here */}
            <div
              style={{
                /*display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem',
                padding: '20px 0'*/

              }}
            >
              {serviceOfferingList.map((item: ILE10ServiceOffering) => (
                <div className="service-offering-categories-editor" key={`service-offering-categories-editor-${item.term_id}`}>
                  <div style={{
                    fontWeight: "bold"
                  }}>
                    {
                      ___CheckItem(item)
                    }
                  </div>
                  {
                    item.children.length > 0 && <div className="children-categories" key={`children-categories-${item.term_id}`}>
                      {item.children.map((child: ILE10ServiceOffering) => (
                        ___CheckItem(child)
                      ))}
                    </div>
                  }
                </div>



              ))}
            </div>
          </Col>
        </Row>

        <AButtonUpdateCreateListing
          onContinue={() => {
            setActiveMyListingSlug("product-offerings");
          }}
          onSubmit={() => {

            console.log("serviceOfferingChecked:", serviceOfferingChecked);

          }}
          savingPartType="service-offering"
          inputsData={{
            data: serviceOfferingChecked
          }}
        />
      </Container>
    </form>
  );
}