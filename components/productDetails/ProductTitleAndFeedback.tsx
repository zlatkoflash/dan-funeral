import Image from "next/image";
import ZStars from "../stars/ZStars";

import locationIcon from './../../assets/images/icon-location-gray.svg';

export default function ProductTitleAndFeedback() {
  return <section className="product-title-and-feedback">
    <h1>Peaceful Memorial Home</h1>
    <div className="stars-and-location">
      <ZStars value={5} size="larger" />
      <div className="location">
        <Image src={locationIcon} alt="Serves Chicago, IL" /> Serves Chicago, IL
      </div>
    </div>
  </section>
}