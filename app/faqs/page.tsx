import { getApiData, getCacheData } from "@/utils/api";
import ZError from "../errors/ZError";
import HeroHeader from "@/components/heroes/HeroHeader";
import BannerFindSupport from "@/components/banners/BannerFindSupport";
import FooterLanding from "@/components/footers/FooterLanding";
import ProductsFAQs from "@/components/productDetails/ProductsFAQs";
import { IFAQBusiness } from "../DashboardV2/EditBusiness/components/editors/BusinessFAQsEditor";
import { Col, Container, Row } from "react-bootstrap";

export default async function FAQsPage() {


  let pageJson: any = await getCacheData("faqs");
  console.log("Data loaded from cache for faqs:", pageJson);
  if (pageJson === null) {
    pageJson = await getApiData("/get_page_data/faqs");
  } else {
    console.log("Data loaded from cache for faqs");
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


  const faqsData = () => {
    const faqsItems = [];
    for (let i = 1; i <= 15; i++) {
      const faqItem = pageJson.acf.faqs[`faq_item_${i}`];
      console.log("faqItem:", faqItem);
      if (faqItem?.question && faqItem?.description) {
        faqsItems.push({
          title: faqItem.question,
          content: faqItem.description
        })
      }

    }

    console.log("faqsItems:", faqsItems);

    return faqsItems;
  }


  return <>


    <HeroHeader
      {...pageJson.acf.hero_header}
      headerListingCards={{ menuItems: pageJson.menu_header_items }}
      //heroPhoto={aboutUsHero}
      showSearchForm={false}
      /*title="Why we built Gentle Road"
      paragraph="Finding a path forward shouldn't be the hardest part."*/
      class="for-about-us"
    />



    <Container>
      <Row>
        <Col>
          <ProductsFAQs
            title="Frequently Asked Questions"
            headingButton={{
              label: "Register Your Business",
              link: `/DashboardV2`,
            }}
            accordionItems={
              faqsData()
              /*listingDetails.listing.frequent_asked_questions.length > 0
                ? listingDetails.listing.frequent_asked_questions.map(
                  (item: IFAQBusiness) => ({
                    title: item.title,
                    content: (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.answer,
                        }}
                      />
                    ),
                  }),
                )
                : []*/
            }
          />
        </Col>
      </Row>
    </Container>



    <BannerFindSupport
      /*{heading={{
        paragraph: "",
        show: true,
        title: "Let us help you find the way.",
      }}}*/
      {...pageJson.acf.banner_support}
      button={{
        label: "Find Support in Your Community",
        link: "/"
      }}
    // image={bannerFinaSupprotIllustration}
    />



    <FooterLanding menu_footer_items={pageJson.menu_footer_items} />



  </>
}