import Image from "next/image";
import HeadingTitleParagraph, { IHeadingTitleParagraph } from "../headings/HeadingTitleParagraph";



import Link from "next/link";


export interface IGuidsGrid {
  heading: IHeadingTitleParagraph,
  items: {
    src: any,
    title: string,
    paragraph: string,
    readMoreLink: string
  }[];
}


export default function GuidsGrid(data: IGuidsGrid) {

  /*const data: {
    src: any,
    title: string,
    paragraph: string,
    readMoreLink: string
  }[] = [
      {
        src: guid1,
        title: "How to Choose a Cremation Provider",
        paragraph: "A clear guide to comparing options, understanding costs, and choosing a trusted provider that aligns with your family’s needs.",
        readMoreLink: ""
      },
      {
        src: guid2,
        title: "What to Include in a Memorial Service",
        paragraph: "Discover thoughtful ways to personalize a service from meaningful rituals to small details that create lasting comfort.",
        readMoreLink: ""
      },
      {
        src: guid3,
        title: "Legal and Estate Essentials Made Simple",
        paragraph: "Get clarity on the key documents and steps involved in managing wills, estates, and end-of-life planning.",
        readMoreLink: ""
      },
    ];*/

  return <section className="guids-grid">

    <HeadingTitleParagraph
      // show={true}
      // title="Guides to Help You Plan with Confidence"
      // paragraph="Explore our most-read resources — simple, compassionate guides to help you make informed decisions and find peace of mind at every step."
      {...data.heading}
    />

    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="grid-wrap">
            <div className="grid">
              {
                data.items.map((itemData, key: number) => {
                  return <div className="guid-item" key={`guid-item-${key}`}>
                    <div className="image-title-wrap">
                      <div className="image">
                        <Image src={itemData.src} alt={itemData.title} />
                      </div>
                      <p className="title body-lg">
                        {
                          itemData.title
                        }
                      </p>
                    </div>
                    <p className="description body-md">{itemData.paragraph}</p>
                    <div className="link-wrap">
                      <Link className="btn-read-more" href={itemData.src}>Read More</Link>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}