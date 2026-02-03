import { useStripePlans } from "@/ContextProvider/StripePlansProvider";
import { Button } from "react-bootstrap";


// Define the structure for a single pricing plan
export interface Plan {
  title: string;
  subtitle: string;
  price: number | string;
  period: string;
  isAnnualDiscountAvailable: boolean;
  features: {
    text: string;
    isHighlighted: boolean;
    cutted?: boolean;
    bold?: boolean,
  }[];
  buttonText: string;
  isPrimary: boolean;
  type: 'basic' | 'standard' | 'basic-listing'
}


// Reusable component for the feature list item
const FeatureItem: React.FC<{ text: string, isHighlighted: boolean, cutted?: boolean, bold?: boolean }> = ({ text, isHighlighted, cutted, bold }) => (
  <li className="feature-item">
    {
      /*<CheckCircle2
      className={`icon ${isHighlighted ? 'highlighted' : 'base'}`}
    />*/

    }

    <span className={`${isHighlighted ? 'text-highlighted' : 'text-base'} ${cutted === true ? 'cutted' : ''}`}>
      {
        bold ? <strong>{text}</strong> : text
      }
    </span>
  </li>
);



interface IPPX3PPricingCardProps {
  plan: Plan;
  onSelectPlan: (title: string) => void;
}

// Reusable component for a single pricing card
const PPX3PPricingCard: React.FC<IPPX3PPricingCardProps> = ({ plan, onSelectPlan }) => {
  // Determine button styles based on whether it's the primary/standard plan
  // const buttonClasses = plan.isPrimary ? 'primary' : 'secondary';
  const cardClasses = plan.isPrimary ? 'primary' : 'secondary';
  const {
    showCreditCardForm
  } = useStripePlans();

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
          {Number(plan.price).toFixed(0)}
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
              bold={feature.bold === true}
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
  planType: "month" | "year",
  plans: {
    month: Plan[],
    year: Plan[]
  }
}
export default function PlansAndPricingX3Panels(data: IPlansAndPricingX3Panels) {

  const {
    planType,
    plans
  } = data;

  const _plans_ = (): Plan[] => {
    return (planType === 'month' ? plans.month : plans.year);
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