export interface IHeadingTitleParagraph {
  title: string,
  paragraph: string,
  show: boolean
}

export default function HeadingTitleParagraph(
  data: IHeadingTitleParagraph
) {
  if (data.show !== true) return null;
  return <section className="heading-title-paragraph">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">

          <div className="heading-content">
            <h2 className="heading-lg">{data.title}</h2>
            <p className="body-xl">{data.paragraph}</p>
          </div>

        </div>
      </div>
    </div>
  </section>
}