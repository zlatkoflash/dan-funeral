import { Button } from "react-bootstrap";
import icon_box from "@/assets/images/icon-rank-your-service-empty-panel.png";

export default function RankYourServiceEmptyPanel() {
  return (
    <>
      <section className="rank-your-service-empty-panel">
        <div className="icon">
          <img src={icon_box.src} alt="icon_check_star" />
        </div>
        <div className="content">
          <div className="title">Get Featured in Your Preferred Locations or category </div>
          <div className="description">Rank your services by city or category to appear at the top and reach more families when it matters most.</div>
          <div className="actions">
            <Button variant="success">Rank Your Services</Button>
          </div>
        </div>
      </section>
    </>
  )
}