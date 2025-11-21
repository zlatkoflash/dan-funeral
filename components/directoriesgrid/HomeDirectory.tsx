import Image from 'next/image';
import dir1Illustration from './../../assets/images/1-directory-funeral-and-memories.svg';
import dir2Illustration from './../../assets/images/2-cremation-services.svg';
import dir3Illustration from './../../assets/images/3-burial-and-cemetery.svg';
import dir4Illustration from './../../assets/images/4-ceremony-leaders-and-venues.svg';
import dir5Illustration from './../../assets/images/5-funeral-products-and-tributes.svg';
import dir6Illustration from './../../assets/images/6-grief-legal-and-planning-support.svg';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import HeadingTitleParagraph from '../headings/HeadingTitleParagraph';


export default function HomeDirectory() {

  const direcoriesData: {
    src: any,
    title: string,
    paragraph: string,
    link: string
  }[] = [
      {
        src: dir1Illustration,
        title: "Funeral & Memorial Services",
        paragraph: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        link: "",
      },
      {
        src: dir2Illustration,
        title: "Cremation Services",
        paragraph: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        link: "",
      },
      {
        src: dir3Illustration,
        title: "Burial & Cemetery",
        paragraph: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        link: "",
      },
      {
        src: dir4Illustration,
        title: "Ceremony Leaders & Venues   ",
        paragraph: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        link: "",
      },
      {
        src: dir5Illustration,
        title: "Funeral Products & Tributes",
        paragraph: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        link: "",
      },
      {
        src: dir6Illustration,
        title: "Grief, Legal & Planning Support",
        paragraph: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        link: "",
      },
    ];

  return <section className="home-directory">

    <HeadingTitleParagraph
      title='Find the Support You Need'
      paragraph='Explore trusted services across categories.'
    />

    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          {
            /*<div className="heading">
            <h2 className='heading-lg'>Find the Support You Need</h2>
            <p className='body-xl'>Explore trusted services across categories.</p>
          </div>*/
          }

          <div className="grid">
            {
              direcoriesData.map((data, key: number) => {
                return <div className="grid-item" key={`grid-directory-item-${key}`}>
                  <div className="image">
                    <Image src={data.src} alt={data.title} />
                  </div>
                  <h4 className='heading-xs'>{data.title}</h4>
                  <p className='body-md'>{data.paragraph}</p>
                  <Link href={data.link} className='btn-visit-directory'>
                    <span>Visit Directory</span>
                  </Link>
                </div>
              })
            }
          </div>

          <div className="footer-buttons">
            <Button variant='success'>Visit Full Directory</Button>
          </div>

        </div>
      </div>
    </div>
  </section>
}