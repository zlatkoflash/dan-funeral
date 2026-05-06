import icon_cards_illustration from '@/assets/images/icon-cards-illustration.svg';

export default function FeaturesPaymentsSection() {
  return <>
    <div className="features-payments-wrap">
      <div className="heading">
        <h4>Future payments</h4>
        <p>Here’s how we’ll charge you for future  payments:</p>
      </div>

      <div className="feature-items-list">
        <div className="feature-item">
          <div className="icon">
            <img src={icon_cards_illustration.src} alt="icon-cards-illustration" />
          </div>
          <div className="feature-content">
            <h5>Secondry billing method</h5>
            <p>If you don’t have enough money in your account, we’ll charge your secondry billing method
              instead.</p>
          </div>
        </div>
      </div>

    </div>
  </>
}