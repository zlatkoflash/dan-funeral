import Image from 'next/image';
import dir1Illustration from './../../assets/images/1-directory-funeral-and-memories.svg';
import dir2Illustration from './../../assets/images/2-cremation-services.svg';
import dir3Illustration from './../../assets/images/3-burial-and-cemetery.svg';
import dir4Illustration from './../../assets/images/4-ceremony-leaders-and-venues.svg';
import dir5Illustration from './../../assets/images/5-funeral-products-and-tributes.svg';
import dir6Illustration from './../../assets/images/6-grief-legal-and-planning-support.svg';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import HeadingTitleParagraph, { IHeadingTitleParagraph } from '../headings/HeadingTitleParagraph';


export interface ICategory {
  /**
   * The unique identifier for the taxonomy term (the Category ID).
   */
  term_id: number;

  /**
   * The human-readable name of the category (e.g., "Ceremony Leaders & Venues").
   */
  name: string;

  /**
   * The URL-friendly version of the name (e.g., "ceremony-leaders-venues").
   */
  slug: string;

  /**
   * A group identifier for the term (usually 0 for standard categories).
   */
  term_group: number;

  /**
   * The unique identifier for the term-taxonomy pairing.
   */
  term_taxonomy_id: number;

  /**
   * The taxonomy the term belongs to (e.g., "category").
   */
  taxonomy: 'category' | string;

  /**
   * The description associated with the category.
   */
  description: string;

  /**
   * The ID of the parent category (0 if it's a top-level category).
   */
  parent: number;

  /**
   * The number of posts currently associated with this category.
   */
  count: number;

  /**
   * The filter used when querying the term data (usually "raw").
   */
  filter: 'raw' | string;

  /**
   * The attached Advanced Custom Field (ACF) for the icon, 
   * returned as the full, absolute URL of the SVG/image attachment.
   *
   * Example: "http://local.wp/projects/.../4-ceremony-leaders-and-venues.3250f5dd.svg"
   */
  icon: string;
}

export interface IHomeDirectory {
  heading: IHeadingTitleParagraph,
  directories: ICategory[]
}

export default function HomeDirectory(data: IHomeDirectory) {

  const {
    heading,
    directories
  } = data;

  /*const direcoriesData: {
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
    ];*/

  return <section className="home-directory">

    <HeadingTitleParagraph
      {...heading}
      show={true}
    // title='Find the Support You Need'
    // paragraph='Explore trusted services across categories.'
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
              directories.map((category, key: number) => {
                return <div className="grid-item" key={`grid-directory-item-${key}`}>
                  <div className="image">
                    <Image src={category.icon} alt={category.name} width={104} height={104} />
                  </div>
                  <h4 className='heading-xs'>{category.name}</h4>
                  <p className='body-md'>{category.description}</p>
                  <Link href={`/find-providers/all-cities/${category.slug}`} className='btn-visit-directory'>
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