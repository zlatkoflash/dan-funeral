import Image from "next/image"

export interface IProductQuickFacts {
  facts: {
    label: string,
    value: string,
    icon?: any
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
              <div className="value">{value.value}</div>
            </div>
          </div>
        })
      }
    </div>

  </section>
}