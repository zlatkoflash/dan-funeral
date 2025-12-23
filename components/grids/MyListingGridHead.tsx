export interface IMyListingGridHead {
  items: {
    count: number,
    title: string,
    titleSmall?: string,
    label: string,
    link?: string
  }[]
}

export default function MyListingGridHead(props: IMyListingGridHead) {

  const { items } = props;

  return <div className="my-listing-grid">
    {
      items.map((item, index) => {
        return <div className="my-listing-grid-item" key={index}>
          <div className="count-wrap">
            <div className="count">{item.count < 10 ? '0' + item.count : item.count}</div>
          </div>
          <div className="title">
            {item.title}
            {item.titleSmall && <div className="title-small">{item.titleSmall}</div>}
          </div>
          <div className="label">{item.label}</div>
        </div>
      })
    }
  </div>
}