import { getApiData, getCacheData } from "@/utils/api";
import BurialMarketplaceContact from "./content";
import ZError from "../errors/ZError";
import HeroHeader from "@/components/heroes/HeroHeader";
import FooterLanding from "@/components/footers/FooterLanding";
import HeaderListingCards from "@/components/headers/HeaderListingCards";

export default async function ContactPage() {

  let pageJson: any = await getCacheData("contact");

  console.log("Data loaded from cache for contact:", pageJson);
  if (pageJson === null) {
    pageJson = await getApiData("/get_page_data/contact");
  } else {
    console.log("Data loaded from cache for contact");
  }

  if (pageJson.status === 404) {
    // this is not found from the server
    // notFound();
    return <ZError status={405} />
  }
  else if (pageJson.status === 500) {
    // server error
    return <ZError status={500} />
  }
  else if (pageJson.status === 501) {
    // internal error
    return <ZError status={501} />
  }

  return (
    <>

      <HeaderListingCards menuItems={pageJson.menu_header_items} />

      <BurialMarketplaceContact details={pageJson.acf} />

      <FooterLanding menu_footer_items={pageJson.menu_footer_items} />
    </>
  )
}