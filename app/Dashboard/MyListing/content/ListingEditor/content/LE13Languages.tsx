import { Col, Container, Row, Form } from "react-bootstrap";
import AButtonUpdateCreateListing from "./AButtonUpdateCreateListing";
import { useMyListing } from "../../../AddNewListing/MyListingProviderEditor";
import { useEffect, useState } from "react";
import { getApiData } from "@/utils/api";

export interface IE13Language {
  id: number;
  code: string;
  name: string;
  native_name: string;
  direction: string;
}

export default function LE13Languages() {
  const {
    listing,
    setListing,
    setActiveMyListingSlug,
    // LE10Language,
    // setLE10Language
    LE13Languages,
    setLE13Languages
  } = useMyListing();

  const [languageList, setLanguageList] = useState<IE13Language[]>([]);
  const [languageChecked, setLanguageChecked] = useState<IE13Language[]>(LE13Languages);

  const LoadTheLanguages = async () => {
    const languagesAll = await getApiData<{

      ok: boolean,
      languages: IE13Language[]

    }>(`/listings/get-all-languages`, "GET");
    setLanguageList(languagesAll.languages);
  }

  useEffect(() => {
    LoadTheLanguages();
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="form-dashboard">
      <Container>
        <Row>
          <Col>
            <h3 className="title text-start">Languages</h3>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* CSS Grid Wrapper - No Bootstrap Cols used here */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem',
                padding: '20px 0'
              }}
            >
              {languageList.map((item: IE13Language) => (
                <Form.Check
                  key={`language-${item.id}`}
                  type="checkbox"
                  id={`language-${item.id}`}
                  label={item.name}
                  checked={languageChecked.find((i) => i.id.toString() === item.id.toString()) !== undefined}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setLanguageChecked([...languageChecked, item]);
                    } else {
                      setLanguageChecked(languageChecked.filter((i) => i.id.toString() !== item.id.toString()));
                    }
                  }}
                />
              ))}
            </div>
          </Col>
        </Row>

        <AButtonUpdateCreateListing
          onContinue={() => {
            setActiveMyListingSlug("preferred-vendors");
          }}
          onSubmit={() => { }}
          savingPartType="languages"
          inputsData={{
            data: languageChecked
          }}
        />
      </Container>
    </form>
  );
}