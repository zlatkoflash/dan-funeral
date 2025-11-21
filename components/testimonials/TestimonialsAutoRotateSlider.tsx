import Image from "next/image";

import lila from './../../assets/images/lila.jpg';
import jony from './../../assets/images/jony.jpg';


export default function TestimonialsAutoRotateSlider() {

  const data: {
    profilePhoto: any,
    nameAndLocation: string,
    paragraph: string
  }[] = [
      { profilePhoto: lila, nameAndLocation: "Sarah M., Chicago, IL", paragraph: "We found a wonderful funeral director who handled everything with such kindness and care. In a difficult week, Gentle Road made every step simple and clear." },
      { profilePhoto: jony, nameAndLocation: "David R., Seattle, WA", paragraph: "After days of searching, I came across Gentle Road. Within minutes, I connected with a provider who truly understood what our family needed." },
      { profilePhoto: jony, nameAndLocation: "David R., Seattle, WA", paragraph: "After days of searching, I came across Gentle Road. Within minutes, I connected with a provider who truly understood what our family needed." },
      // { profilePhoto: lila, nameAndLocation: "Sarah M., Chicago, IL", paragraph: "We found a wonderful funeral director who handled everything with such kindness and care. In a difficult week, Gentle Road made every step simple and clear.”" },
    ];

  const writeTheSlides = () => {
    return <>{
      data.map((item, key: number) => {
        return <div className="slide" key={`slide-key-${key}`}>
          <div className="heading-test">
            <div className="title body-md">{item.nameAndLocation}</div>
            <div className="profile">
              <Image src={item.profilePhoto} alt={item.profilePhoto} />
            </div>
          </div>
          <p className="body-md">“{item.paragraph}”</p>
        </div>
      })
    }</>
  }

  // Slider Container
  return <div className="testimonials-auto-rotate-slider" style={{
    "--numberOfSlides": data.length * 2
  } as React.CSSProperties}>
    {
      /*
      Slide Track
        IMPORTANT: Contains two sets of the same slides to create the seamless loop effect.
      */
    }
    <div className="slide-track">

      {
        //SET 1 (Originals: 3 Slides) 
      }

      {writeTheSlides()}

      {
        //SET 2 (Duplicates: 3 Slides)
      }

      {
        writeTheSlides()
      }

    </div>
  </div>
}