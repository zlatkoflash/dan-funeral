import { Button } from "react-bootstrap";


// Define the structure for a single pricing plan
interface Plan {
  title: string;
  subtitle: string;
  price: number | string;
  period: string;
  isAnnualDiscountAvailable: boolean;
  features: {
    text: string;
    isHighlighted: boolean;
    cutted?: boolean;
  }[];
  buttonText: string;
  isPrimary: boolean;
  type: 'basic' | 'standard' | 'basic-listing'
}


// Reusable component for the feature list item
const FeatureItem: React.FC<{ text: string, isHighlighted: boolean, cutted?: boolean }> = ({ text, isHighlighted, cutted }) => (
  <li className="feature-item">
    {
      /*<CheckCircle2
      className={`icon ${isHighlighted ? 'highlighted' : 'base'}`}
    />*/

    }

    <span className={`${isHighlighted ? 'text-highlighted' : 'text-base'} ${cutted === true ? 'cutted' : ''}`}>
      {text}
    </span>
  </li>
);

// Data for the three pricing plans based on the image
const plansData: Plan[] = [
  {
    type: "basic",
    title: "Basic",
    subtitle: "Foundational presence and claimed listing",
    price: 0,
    period: "/month",
    isAnnualDiscountAvailable: false,
    features: [
      { text: "Locations, 1", isHighlighted: false },
      { text: "Additional Listings", isHighlighted: false, cutted: true },
      { text: "Claimed Listing Badge", isHighlighted: false },
      { text: "Verified Badge", isHighlighted: false, cutted: true },
      { text: "Lead Flow, Behind contact wall", isHighlighted: false },
      { text: "All Core Features (Dashboard, Reviews, FAQ, Photos, etc.)", isHighlighted: false },
    ],
    buttonText: "Get Started",
    isPrimary: false,
  },
  {
    type: 'standard',
    title: "Standard",
    subtitle: "Verification and direct leads",
    price: 20,
    period: "/month",
    isAnnualDiscountAvailable: true,
    features: [
      { text: "Locations or Categories: 3", isHighlighted: false },
      { text: "Additional Listings", isHighlighted: false, cutted: true },
      { text: "Claimed Listing Badge", isHighlighted: false },
      { text: "Verified Badge (Interview/Vetting)", isHighlighted: false },
      { text: "Lead Flow, Direct to email", isHighlighted: false },
      { text: "All Core Features (Dashboard, Reviews, FAQ, Photos, etc.)", isHighlighted: false },
    ],
    buttonText: "Get Started",
    isPrimary: true,
  },
  {
    type: "basic-listing",
    title: "Basic Listing",
    subtitle: "Foundational presence and claimed listing",
    price: 40,
    period: "/month",
    isAnnualDiscountAvailable: true,
    features: [
      { text: "Locations or Categories: 10", isHighlighted: false },
      { text: "$10/mo per extra listing", isHighlighted: true }, // Highlighted item
      { text: "Claimed Listing Badge", isHighlighted: false },
      { text: "Verified Badge (Interview/Vetting)", isHighlighted: false },
      { text: "Lead Flow, Direct to email", isHighlighted: false },
      { text: "All Core Features (Dashboard, Reviews, FAQ, Photos, etc.)", isHighlighted: false },
    ],
    buttonText: "Get Started",
    isPrimary: false,
  },
];


// Data for the three pricing plans based on the image
const plansDataYear: Plan[] = [
  {
    type: "basic",
    title: "Basic",
    subtitle: "Foundational presence and claimed listing",
    price: 0,
    period: "/year",
    isAnnualDiscountAvailable: false,
    features: [
      { text: "Locations, 1", isHighlighted: false },
      { text: "Additional Listings", isHighlighted: false, cutted: true },
      { text: "Claimed Listing Badge", isHighlighted: false },
      { text: "Verified Badge", isHighlighted: false },
      { text: "Lead Flow, Behind contact wall", isHighlighted: false },
      { text: "All Core Features (Dashboard, Reviews, FAQ, Photos, etc.)", isHighlighted: false },
    ],
    buttonText: "Get Started",
    isPrimary: false,
  },
  {
    type: 'standard',
    title: "Standard",
    subtitle: "Verification and direct leads",
    price: 160,
    period: "/year",
    isAnnualDiscountAvailable: true,
    features: [
      { text: "Locations or Categories: 3", isHighlighted: false },
      { text: "Additional Listings", isHighlighted: false, cutted: true },
      { text: "Claimed Listing Badge", isHighlighted: false },
      { text: "Verified Badge (Interview/Vetting)", isHighlighted: false },
      { text: "Lead Flow, Direct to email", isHighlighted: false },
      { text: "All Core Features (Dashboard, Reviews, FAQ, Photos, etc.)", isHighlighted: false },
    ],
    buttonText: "Get Started",
    isPrimary: true,
  },
  {
    type: "basic-listing",
    title: "Basic Listing",
    subtitle: "Foundational presence and claimed listing",
    price: 350,
    period: "/year",
    isAnnualDiscountAvailable: true,
    features: [
      { text: "Locations or Categories: 10", isHighlighted: false },
      { text: "$10/mo per extra listing", isHighlighted: true }, // Highlighted item
      { text: "Claimed Listing Badge", isHighlighted: false },
      { text: "Verified Badge (Interview/Vetting)", isHighlighted: false },
      { text: "Lead Flow, Direct to email", isHighlighted: false },
      { text: "All Core Features (Dashboard, Reviews, FAQ, Photos, etc.)", isHighlighted: false },
    ],
    buttonText: "Get Started",
    isPrimary: false,
  },
];


interface IPPX3PPricingCardProps {
  plan: Plan;
  onSelectPlan: (title: string) => void;
}

// Reusable component for a single pricing card
const PPX3PPricingCard: React.FC<IPPX3PPricingCardProps> = ({ plan, onSelectPlan }) => {
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

      {/* Price Section */}
      <div className="card-price-section">
        <p className="card-price">
          <span className="dollar">$</span>
          {plan.price}
        </p>
        <span className="card-period">{plan.period}</span>
        {plan.isAnnualDiscountAvailable && (
          <div className="discount-tag">
            Save 20% on annual
          </div>
        )}
      </div>

      {/* Features List */}
      <div className="flex-grow">
        <h3 className="features-heading">What's included:</h3>
        <ul role="list" className="card-features-list">
          {plan.features.map((feature, index) => (
            <FeatureItem
              key={index}
              text={feature.text}
              isHighlighted={feature.isHighlighted}
              // cutted mean the line that cut the text, that mean that feature not yet added
              cutted={feature.cutted}
            />
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="button-wrap">

        <Button
          variant={plan.type === 'standard' ? 'success' : 'light'}
          className={`btn-select-package`}
        >
          {plan.buttonText}
        </Button>
      </div>
    </div>
  );
};


export interface IPlansAndPricingX3Panels {
  planType: "monthly" | "yearly"
}
export default function PlansAndPricingX3Panels(data: IPlansAndPricingX3Panels) {


  const _plans_ = (): Plan[] => {
    return (data.planType === 'monthly' ? plansData : plansDataYear);
  }

  return <div className="pricing-grid-wrapper">
    {
      /*<h1 className="page-title">
      Choose Your Plan
    </h1>*/
    }

    {/* Pricing Grid Container */}
    <div
      className="pricing-grid"
    >
      {_plans_().map((plan) => (
        <PPX3PPricingCard key={plan.title} plan={plan} onSelectPlan={() => { console.log("select the plan"); }} />
      ))}
    </div>

    {/*<p className="footer-text">
      *All prices are billed monthly unless an annual subscription is selected.
    </p>*/}
  </div>


}