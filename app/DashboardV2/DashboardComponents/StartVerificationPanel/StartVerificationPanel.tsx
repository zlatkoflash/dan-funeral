import check_star from "@/assets/images/icon-check-star.png";
import { Button } from "react-bootstrap";


export default function StartVerificationPanel() {
  return (
    <>
      <section className="start-verification-panel">
        <div className="left-content">
          <div className="icon">
            <img src={check_star.src} alt="check_star" />
          </div>
          <div className="content">
            <div className="title">Build Trust with a Verified Profile</div>
            <div className="description">Verification helps families recognise trusted providers while giving your services better visibility across Gentle Road.</div>
          </div>
        </div>

        <div className="actions">
          <Button variant="success" size="sm">Start Verification</Button>
        </div>
      </section>
    </>
  )
}