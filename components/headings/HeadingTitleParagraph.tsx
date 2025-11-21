export default function HeadingTitleParagraph(
  { title, paragraph }
    :
    { title: string, paragraph: string }
) {
  return <section className="heading-title-paragraph">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">

          <div className="heading-content">
            <h2 className="heading-lg">{title}</h2>
            <p className="body-xl">{paragraph}</p>
          </div>

        </div>
      </div>
    </div>
  </section>
}