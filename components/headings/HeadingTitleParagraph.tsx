export interface IHeadingTitleParagraph {
  title: string,
  paragraph: string,
  show: boolean,
  type?: "default" | "marketing-x3-panels" | "marketing-x3-read-more" | "our-mission",
  paragraphTop?: string
}

export default function HeadingTitleParagraph(
  data: IHeadingTitleParagraph
) {
  if (data.show !== true) return null;
  return <section className={`heading-title-paragraph ${data.type}`}>
    <div className="container">
      <div className="row">
        <div className="col-lg-12">

          <div className="heading-content">
            {data.paragraphTop !== undefined && data.paragraphTop !== "" ? <p className="paragraph-top">{data.paragraphTop}</p> : <></>}
            <h2 className="heading-lg">{data.title}</h2>
            {data.paragraph !== "" ? <p className="body-xl">{data.paragraph}</p> : <></>}
          </div>

        </div>
      </div>
    </div>
  </section>
}