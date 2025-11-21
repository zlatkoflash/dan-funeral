import BannerPhotoTextButton from "../banners/BannerPhotoTextButton";
import HeadingTitleParagraph from "../headings/HeadingTitleParagraph";
import TestimonialsAutoRotateSlider from "./TestimonialsAutoRotateSlider";

export default function TestimonialsPanel() {
  return <section className="testimonials-panel">
    {/*<div className="container">
      <div className="row">
        <div className="col-lg-12">

          <div className="heading-content">
            <h2 className="heading-lg">Families Who Found Comfort Through Gentle Road</h2>
            <p className="body-xl">Real stories from families who discovered trusted providers through our platform each experience a reminder of why compassion and clarity matter most.</p>
          </div>

        </div>
      </div>
    </div>*/}
    <HeadingTitleParagraph
      title="Families Who Found Comfort Through Gentle Road"
      paragraph="Real stories from families who discovered trusted providers through our platform each experience a reminder of why compassion and clarity matter most."
    />

    <TestimonialsAutoRotateSlider />

    <BannerPhotoTextButton />

  </section>
}