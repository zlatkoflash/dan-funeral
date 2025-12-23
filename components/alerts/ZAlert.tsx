import Image from "next/image";
import pricingInfoIcon from "../../assets/images/icon-pricing-info.svg";

export default function ZAlert({ message, type }: { message: string, type: "success" | "error" }) {

  return <div className={`custom-alert ${type}`}>
    <Image className="icon" src={pricingInfoIcon} alt="Pricing Info" />
    <div className="ca-inner-content">
      <p>{message}</p>
    </div>
  </div>

}