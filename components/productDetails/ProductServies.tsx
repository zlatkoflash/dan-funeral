export interface IProductServies {
  title: string,
  services: {
    label: string
  }[]
}

export default function ProductServies(data: IProductServies) {
  return <section className="product-services">
    <h3>{data.title}</h3>
    <ul className="services-grid">
      {
        data.services.map((item, key: number) => {
          return <li key={`service-li-${key}`}>
            {item.label}
          </li>
        })
      }
    </ul>
  </section>
}