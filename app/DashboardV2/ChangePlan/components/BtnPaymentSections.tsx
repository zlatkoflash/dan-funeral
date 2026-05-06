import { Button } from "react-bootstrap"

export default function BtnPaymentSections() {
  return <>
    <div className="payment-section">
      <div className="heading">
        <h4>Summary</h4>
      </div>

      <div className="items-holder">
        <div className="items-list">
          {
            ["", "", ""].map((item, index) => {
              return <div className="item-card" key={index}>
                <div className="left-content">
                  <h5>Plan</h5>
                  <p>Small Business</p>
                </div>
                <div className="price">
                  Per Month $20
                </div>
              </div>
            })
          }
        </div>
        <hr className="card-hr success" />
        <div className="item-card">
          <div className="left-content">
            <p>Total</p>
          </div>
          <div className="price success">
            $20.00
          </div>
        </div>

      </div>

      <Button type="button" variant="success" className="payment-button">
        Proceed to Payment
      </Button>

      <div className="message-info">
        <p>By clicking above, you agree to our Terms of Service for advertising.</p>
      </div>

    </div>
  </>
}