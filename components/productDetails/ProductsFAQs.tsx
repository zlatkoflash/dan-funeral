import Link from "next/link";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "react-bootstrap";

export interface IProductsFAQs {
  title: string,
  headingButton: {
    label: string,
    link: string
  },

  accordionItems: {
    title: string,
    content: string | React.ReactNode
  }[]
}

export default function ProductsFAQs(data: IProductsFAQs) {

  console.log("FAQ data:", data);

  return <section className="product-faqs">
    <div className="heading-title">
      <h3>{data.title}</h3>
      <div className="buttons-wrap">
        <Link href={data.headingButton.link} className="btn btn-success">
          {data.headingButton.label}
        </Link>
      </div>
    </div>

    <Accordion defaultActiveKey="0">
      {
        data.accordionItems.map((dataItem, key: number) => {
          return <AccordionItem key={`accordion-${key}`} eventKey={key.toString()}>
            <AccordionHeader>{dataItem.title}</AccordionHeader>
            <AccordionBody>
              {
                // 
              }
              <span dangerouslySetInnerHTML={{ __html: dataItem.content as string }} />

            </AccordionBody>
          </AccordionItem>
        })
      }
      {/*<AccordionItem eventKey="0">
        <AccordionHeader>Accordion Item #1</AccordionHeader>
        <AccordionBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </AccordionBody>
      </AccordionItem>
      <AccordionItem eventKey="1">
        <AccordionHeader>Accordion Item #2</AccordionHeader>
        <AccordionBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </AccordionBody>
      </AccordionItem>*/}
    </Accordion>

  </section>
}