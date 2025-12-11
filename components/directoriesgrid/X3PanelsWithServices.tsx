import { Button, Col, Container, Row } from "react-bootstrap";
import HeadingTitleParagraph, { IHeadingTitleParagraph } from "../headings/HeadingTitleParagraph";
import Link from "next/link";


// Define the structure for a single pricing plan
interface IServicesColumn {
  title: string;
  subtitle: string;
  price: number | string;
  period: string;
  isAnnualDiscountAvailable: boolean;
  parent_category: {
    slug: string,
  },
  features: {
    /*text: string;
    isHighlighted: boolean;
    cutted?: boolean;
    link: string;*/

    // name and slug are for the wordpress category
    name: string,
    slug: string
  }[];
  buttonText: string;
  isPrimary: boolean;
  type: 'basic' | 'standard' | 'basic-listing',
  button: {
    title: string,
    link: string
  }
}


// Reusable component for the feature list item
const ServiceItem: React.FC<{ text: string, isHighlighted: boolean, cutted?: boolean, link: string }> = ({ text, isHighlighted, cutted, link }) => (
  <li className="feature-item">
    {
      /*<CheckCircle2
      className={`icon ${isHighlighted ? 'highlighted' : 'base'}`}
    />*/

    }

    <Link href={link} className={`${isHighlighted ? 'text-highlighted' : 'text-base'} ${cutted === true ? 'cutted' : ''}`}>
      {text}
    </Link>
  </li>
);

// Data for the three pricing plans based on the image
/*const plansData: IServicesColumn[] = [
  {
    type: "basic",
    title: "By Religion",
    subtitle: "Choose providers by religious affiliation",
    price: 0,
    period: "/month",
    isAnnualDiscountAvailable: false,
    features: [
      { text: "Christian Funerals", isHighlighted: false, link: "/" },
      { text: "Catholic Funerals", isHighlighted: false, link: "/", cutted: false },
      { text: "Jewish Funerals", isHighlighted: false, link: "/" },
      { text: "Muslim Funerals", isHighlighted: false, link: "/", cutted: false },
      { text: "Hindu Funerals", isHighlighted: false, link: "/" },
      { text: "Buddhist Funerals", isHighlighted: false, link: "/" },
      { text: "Sikh Funerals", isHighlighted: false, link: "/" },
      { text: "Spiritual Funerals", isHighlighted: false, link: "/" },
    ],
    buttonText: "Get Started",
    isPrimary: false,
    button: {
      link: "/",
      title: "See All Religions"
    }
  },
  {
    type: 'standard',
    title: "Funeral Services",
    subtitle: "Choose providers by service offering",
    price: 20,
    period: "/month",
    isAnnualDiscountAvailable: true,
    features: [
      { text: "Full-Service Funeral Planning", isHighlighted: false, link: "/" },
      { text: "Memorial & Celebration of Life", isHighlighted: false, link: "/", cutted: false },
      { text: "Viewing an Visitation", isHighlighted: false, link: "/" },
      { text: "Graveside Services", isHighlighted: false, link: "/" },
      { text: "Secular and Humanist Funerals", isHighlighted: false, link: "/" },
      { text: "Veteran Services", isHighlighted: false, link: "/" },
      { text: "Green & Natural Burials", isHighlighted: false, link: "/" },
      { text: "Other Services", isHighlighted: false, link: "/" },
    ],
    buttonText: "Get Started",
    isPrimary: true,
    button: {
      link: "/",
      title: "See Funeral Services"
    }
  },
  {
    type: "basic-listing",
    title: "Cremation & Burial",
    subtitle: "Cremation options that suit your needs",
    price: 40,
    period: "/month",
    isAnnualDiscountAvailable: true,
    features: [
      { text: "Direct Cremations", isHighlighted: false, link: "/" },
      { text: "Cremation with Memorial Service", isHighlighted: true, link: "/" },
      { text: "Witnessed Cremation", isHighlighted: false, link: "/" },
      { text: "Scattering Services", isHighlighted: false, link: "/" },
      { text: "Urn Inurment", isHighlighted: false, link: "/" },
      { text: "Green and Natural Burial Grounds", isHighlighted: false, link: "/" },
      { text: "Alternative Funeral & Burials", isHighlighted: false, link: "/" },
      { text: "Other Options", isHighlighted: false, link: "/" },
    ],
    buttonText: "Get Started",
    isPrimary: false,
    button: {
      link: "/",
      title: "See Cremation Options"
    }
  },
];*/




export interface IX3ServicesCardProps {
  plan: IServicesColumn;
  // onSelectIServicesColumn: (title: string) => void;
}

// Reusable component for a single pricing card
const X3ServicesCard: React.FC<IX3ServicesCardProps> = ({ plan }) => {
  // Determine button styles based on whether it's the primary/standard plan
  // const buttonClasses = plan.isPrimary ? 'primary' : 'secondary';
  const cardClasses = plan.isPrimary ? 'primary' : 'secondary';

  return (
    <div
      className={`pricing-card ${cardClasses}`}
    >
      {/* Header and Title */}
      <div className="card-header">
        <h2 className="card-title">{plan.title}</h2>
        <p className="card-subtitle">{plan.subtitle}</p>
      </div>



      {/* Features List */}
      <div className="flex-grow">
        {
          // <h3 className="features-heading">What's included:</h3>
        }
        <ul role="list" className="card-features-list">
          {plan.features.map((feature, index) => (
            <ServiceItem
              key={index}
              text={feature.name}
              isHighlighted={false}
              // cutted mean the line that cut the text, that mean that feature not yet added
              cutted={false}
              link={`/directory/${feature.slug}`}
            />
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="button-wrap">

        <Link
          href={`/directory/${plan.parent_category.slug}`}
          // variant={plan.type === 'standard' ? 'success' : 'light'}
          className={`btn btn-light btn-select-package`}
        >
          {plan.button.title}
        </Link>
      </div>
    </div>
  );
};


export interface IX3PanelsWithServices {
  // planType: "monthly" | "yearly"
  heading: IHeadingTitleParagraph,
  panels: IServicesColumn[]
}
export default function X3PanelsWithServices(data: IX3PanelsWithServices) {



  return <section className="x3-services-panels">
    <Container>
      <Row>
        <Col>

          <HeadingTitleParagraph {...data.heading} show={true} />

          <div className="pricing-grid-wrapper">
            {
              /*<h1 className="page-title">
              Choose Your IServicesColumn
            </h1>*/
            }

            {/* Pricing Grid Container */}
            <div
              className="pricing-grid"
            >
              {
                data.panels.map((plan) => (
                  <X3ServicesCard key={plan.title} plan={plan} />
                ))}
            </div>

            {/*<p className="footer-text">
      *All prices are billed monthly unless an annual subscription is selected.
    </p>*/}
          </div>
        </Col>
      </Row>
    </Container>
  </section>


}