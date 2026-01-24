import FlagVerify from "@/components/flags/FlagVerify";
import FooterLanding from "@/components/footers/FooterLanding";
import FormProduct from "@/components/forms/ReadyForms/FormProduct";
import ProductDetailsGallery from "@/components/galleries/ProductDetailsGallery";
import HeaderListingCards from "@/components/headers/HeaderListingCards";
import SubHeaderOnlyBreadCrumbs from "@/components/headers/SubHeaderOnlyBreadCrumbs";
import ProductAbout from "@/components/productDetails/ProductAbout";
import ProductQuickFacts from "@/components/productDetails/ProductQuickFacts";
import ProductTitleAndFeedback from "@/components/productDetails/ProductTitleAndFeedback";
import ProductContentSidebar from "@/components/SidebarContainers/ProductContentSidebar";
// import SubHeaderSearch from "@/components/headers/SubHeaderSearch";


import dollarIcon from './../../../assets/images/icon-dollar-gray.svg';
import ProductServies from "@/components/productDetails/ProductServies";
import ProductsFAQs from "@/components/productDetails/ProductsFAQs";
import ProductReviews from "@/components/productDetails/ProductReviews";
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";
import { getApiData } from "@/utils/api";
import PricingList from "@/components/pricing/PricingList";
import { IListing, MyListingProviderEditor } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";
import { FAQItem } from "@/components/grids/FAQsEditor";
import ProductMap from "@/components/productDetails/ProductMap";
import { ILE10ServiceOffering } from "@/app/Dashboard/MyListing/content/ListingEditor/content/LE10ServiceOffering";
import { IE13Language } from "@/app/Dashboard/MyListing/content/ListingEditor/content/LE13Languages";



export default async function ListingPage(
  {
    params,
    searchParams,
  }: {
    params: Promise<{ slug: string }>;
    searchParams: { [key: string]: string | string[] | undefined };
  }
) {


  const listingSlug = (await params).slug;
  console.log("listingSlug:", listingSlug);

  const listingDetails = await getApiData<{ listing: IListing, listingPost: { ID: string, post_title: string, post_author: number } }>(`/listings/get-listing-by-slug`, "POST", { listingSlug: listingSlug });
  console.log("listingDetails:", listingDetails);

  const DashboardData = await getApiData("/dashboard/GetBasicData", "GET", {});

  const ServicesOffered: { label: string }[] = [];
  listingDetails.listing.serviceOffering.forEach((service: ILE10ServiceOffering) => {
    ServicesOffered.push({ label: service.name });
  });



  return <>
    <MyListingProviderEditor
      actualListingId={listingDetails.listingPost.ID}
      listingInit={listingDetails.listing}
    >
      <HeaderListingCards menuItems={DashboardData.menu_header_items} />


      <SubHeaderOnlyBreadCrumbs bread={{
        links: [
          { label: "Home", link: "/" },
          { label: "Find Providers", link: "/find-providers" },
          { label: listingDetails.listingPost.post_title, link: "" },
        ]
      }} />

      <ProductDetailsGallery />

      <ProductContentSidebar
        content={
          <>
            <ProductTitleAndFeedback />
            <ProductMap />
            <ProductAbout />
            <ProductQuickFacts facts={[
              { label: "Services Offered", value: "Burial, Cremation, Green Options", icon: undefined },
              { label: "Service Area", value: "Greater Chicago & Surroundings", icon: undefined },
              {
                label: "Languages Spoken",
                value: listingDetails.listing.languages.map((language: IE13Language) => `${language.name}(${language.native_name}) `).join(", "),
                icon: undefined
              },
              { label: "Availability", value: "24/7 including holidays", icon: undefined },
              // { label: "Pricing", value: "Starts at $1,500", icon: dollarIcon },
              { label: "Years in Operation", value: "40+ Years", icon: undefined },
            ]} />
            <ProductServies title="Services Offered" services={/*[
              { label: "Traditional Funeral Services" },
              { label: "Memorial Ceremonies" },
              { label: "Pre-Planning & Advance Directives" },
              { label: "Direct Cremation" },
              { label: "Grief Counseling & Family Support" },
              { label: "Live Streaming for Remote Guests" },
              { label: "Eco-Friendly Burials" },
            ]*/ServicesOffered} />

            <PricingList items={
              listingDetails.listing.pricing.length > 0 ? listingDetails.listing.pricing.map((item: any) => ({
                title: item.description,
                price: item.price,
                description: item.description,
                linkForQuestions: ""
              })) : []
            } />

            <ProductsFAQs
              title="Frequently asked questions"
              headingButton={{
                label: "Call Now",
                link: "/"
              }}
              accordionItems={
                listingDetails.listing.faqs.length > 0 ? listingDetails.listing.faqs.map((item: FAQItem) => ({
                  title: item.faqTitle,
                  content: <div dangerouslySetInnerHTML={{ __html: item.description }} />
                })) : []


              }
            />

            <ProductReviews
              feedbacks={[
                {
                  clientNameLoc: "David R., Seattle, WA",
                  date: "Oct 27",
                  paragraph: "After days of searching, I came across Gentle Road. Within minutes, I connected with a provider who truly understood what our family needed.",
                  stars: 5,
                  verified: true
                },
                {
                  clientNameLoc: "David R., Seattle, WA",
                  date: "Oct 27",
                  paragraph: "After days of searching, I came across Gentle Road. Within minutes, I connected with a provider who truly understood what our family needed.",
                  stars: 5,
                  verified: true
                },
                {
                  clientNameLoc: "David R., Seattle, WA",
                  date: "Oct 27",
                  paragraph: "After days of searching, I came across Gentle Road. Within minutes, I connected with a provider who truly understood what our family needed.",
                  stars: 5,
                  verified: true
                },
              ]}
            />

            <FlagVerify listing={listingDetails.listing} listingPost={listingDetails.listingPost} />

            <TestimonialsPanel
              showTheTestimonials={false}
              containerNoPadding={true}
              heading={{
                show: false, paragraph: "", title: ""
              }}
              banner={{
                buttonlink: "",
                buttontext: "List Your Business",
                bigtitle: "Need help choosing a provider?",
                paragraph: "Our care team is here to guide you every step of the way.",
                background_photo: ""
              }}
            />

          </>
        }
        sidebarContent={
          <>
            <FlagVerify listing={listingDetails.listing} listingPost={listingDetails.listingPost} />
            <FormProduct />
          </>
        }
      />



      <FooterLanding menu_footer_items={DashboardData.menu_footer_items} />
    </MyListingProviderEditor>
  </>
}