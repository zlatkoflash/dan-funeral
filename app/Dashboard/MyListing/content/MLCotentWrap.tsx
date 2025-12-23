import MLSidebarMenu, { IMLSidebarMenu } from "./MLSidebarMenu";

export default function MLCotentWrap({
  children,
  sidebarItems
}: {
  children: React.ReactNode,
  sidebarItems: IMLSidebarMenu
}) {


  return <div className="my-listing-content-wrap">
    <MLSidebarMenu items={sidebarItems.items} activeMenuValue={sidebarItems.activeMenuValue} />
    <div className="my-listing-content-wrap-inner">
      {children}
    </div>
  </div>
}