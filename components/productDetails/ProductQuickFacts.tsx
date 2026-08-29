import Image from "next/image"

export interface IProductQuickFacts {
  facts: {
    label: string,
    value: string,
    icon?: any,
    link?: string
  }[]
}

export default function ProductQuickFacts(data: IProductQuickFacts) {
  return <section className="product-quick-facts">
    <h3>Quick Facts</h3>

    <div className="facts-grid">
      {
        data.facts.map((value, key: number) => {
          return <div className="item-fact" key={`product-fact-key-${key}`}>
            {
              value.icon !== undefined
                ?
                <Image src={value.icon} alt={value.value} />
                :
                <></>
            }
            <div className="content">
              <div className="label">{value.label}</div>
              {
                value.link ? (
                  <a href={value.link} target="_blank">
                    <div className="value" dangerouslySetInnerHTML={{ __html: value.value }} />
                  </a>
                ) : (
                  <div className="value" dangerouslySetInnerHTML={{ __html: value.value }} />
                )
              }
            </div>
          </div>
        })
      }
    </div>

  </section>
}