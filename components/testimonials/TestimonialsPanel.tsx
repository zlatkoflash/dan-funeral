import BannerPhotoTextButton, { IBannerPhotoTextButton } from "../banners/BannerPhotoTextButton";
import HeadingTitleParagraph, { IHeadingTitleParagraph } from "../headings/HeadingTitleParagraph";
import TestimonialsAutoRotateSlider from "./TestimonialsAutoRotateSlider";


export interface ITestimonialsPanel {
  // show_heading_title_paragraph: boolean,
  heading: IHeadingTitleParagraph,
  banner: IBannerPhotoTextButton,
  showTheTestimonials: boolean,
  containerNoPadding?: boolean
}

export default function TestimonialsPanel(data: ITestimonialsPanel
) {
  return <section className={`testimonials-panel ${data.containerNoPadding === true ? "container-no-paddings" : ""}`}>

    {/*<HeadingTitleParagraph
          title="Families Who Found Comfort Through Gentle Road"
          paragraph="Real stories from families who discovered trusted providers through our platform each experience a reminder of why compassion and clarity matter most."
        />*/}

    <HeadingTitleParagraph
      {...data.heading}
    />

    {
      data.showTheTestimonials ?
        <TestimonialsAutoRotateSlider />
        :
        <></>
    }


    <BannerPhotoTextButton
      {...data.banner}
    />

  </section>
}