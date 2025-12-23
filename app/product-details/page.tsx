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


import dollarIcon from './../../assets/images/icon-dollar-gray.svg';
import ProductServies from "@/components/productDetails/ProductServies";
import ProductsFAQs from "@/components/productDetails/ProductsFAQs";
import ProductReviews from "@/components/productDetails/ProductReviews";
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";
import { getApiData } from "@/utils/api";
import PricingList from "@/components/pricing/PricingList";

export default async function ProductDetails() {


  // this is the old product details static page.
  return null;

  const DashboardData = await getApiData("/dashboard/GetBasicData", "GET", {});

  return <>
    <HeaderListingCards menuItems={DashboardData.menu_header_items} />


    <SubHeaderOnlyBreadCrumbs bread={{
      links: [
        { label: "Home", link: "/" },
        { label: "Peaceful-memorial-funerals", link: "/ListingCards" },
        { label: "Details", link: "" },
      ]
    }} />

    <ProductDetailsGallery />

    <ProductContentSidebar
      content={
        <>
          <ProductTitleAndFeedback />
          <ProductAbout />
          <ProductQuickFacts facts={[
            { label: "Services Offered", value: "Burial, Cremation, Green Options", icon: undefined },
            { label: "Service Area", value: "Greater Chicago & Surroundings", icon: undefined },
            { label: "Languages Spoken", value: "English, Spanish", icon: undefined },
            { label: "Availability", value: "24/7 including holidays", icon: undefined },
            { label: "Pricing", value: "Starts at $1,500", icon: dollarIcon },
            { label: "Years in Operation", value: "40+ Years", icon: undefined },
          ]} />
          <ProductServies title="Services Offered" services={[
            { label: "Traditional Funeral Services" },
            { label: "Memorial Ceremonies" },
            { label: "Pre-Planning & Advance Directives" },
            { label: "Direct Cremation" },
            { label: "Grief Counseling & Family Support" },
            { label: "Live Streaming for Remote Guests" },
            { label: "Eco-Friendly Burials" },

          ]} />

          <PricingList items={[
            {
              title: "Traditional Funeral Services",
              price: 1500,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget lacinia dui. Suspendisse massa ex, commodo non sollicitudin id, viverra vitae sem. Maecenas nec justo eget lorem auctor hendrerit. Vivamus fermentum turpis at finibus suscipit. Quisque maximus lorem in diam finibus, a ornare leo fermentum. Ut interdum porttitor tortor ut varius. Vestibulum lacinia varius ipsum quis pharetra. Cras tempor elit aliquam pellentesque placerat. Aenean eu est et ex faucibus efficitur a vel metus. Mauris id vestibulum orci.",
              linkForQuestions: "/"
            },
            {
              title: "Memorial Ceremonies",
              price: 750,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget lacinia dui. Suspendisse massa ex, commodo non sollicitudin id, viverra vitae sem. Maecenas nec justo eget lorem auctor hendrerit. Vivamus fermentum turpis at finibus suscipit. Quisque maximus lorem in diam finibus, a ornare leo fermentum. Ut interdum porttitor tortor ut varius. Vestibulum lacinia varius ipsum quis pharetra. Cras tempor elit aliquam pellentesque placerat. Aenean eu est et ex faucibus efficitur a vel metus. Mauris id vestibulum orci.",
              linkForQuestions: "/"
            },
            {
              title: "Pre-Planning & Advance Directives",
              price: 1500,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget lacinia dui. Suspendisse massa ex, commodo non sollicitudin id, viverra vitae sem. Maecenas nec justo eget lorem auctor hendrerit. Vivamus fermentum turpis at finibus suscipit. Quisque maximus lorem in diam finibus, a ornare leo fermentum. Ut interdum porttitor tortor ut varius. Vestibulum lacinia varius ipsum quis pharetra. Cras tempor elit aliquam pellentesque placerat. Aenean eu est et ex faucibus efficitur a vel metus. Mauris id vestibulum orci.",
              linkForQuestions: "/"
            },
            {
              title: "Direct Cremation",
              price: 1500,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget lacinia dui. Suspendisse massa ex, commodo non sollicitudin id, viverra vitae sem. Maecenas nec justo eget lorem auctor hendrerit. Vivamus fermentum turpis at finibus suscipit. Quisque maximus lorem in diam finibus, a ornare leo fermentum. Ut interdum porttitor tortor ut varius. Vestibulum lacinia varius ipsum quis pharetra. Cras tempor elit aliquam pellentesque placerat. Aenean eu est et ex faucibus efficitur a vel metus. Mauris id vestibulum orci.",
              linkForQuestions: "/"
            },
            {
              title: "Grief Counseling & Family Support",
              price: 1500,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget lacinia dui. Suspendisse massa ex, commodo non sollicitudin id, viverra vitae sem. Maecenas nec justo eget lorem auctor hendrerit. Vivamus fermentum turpis at finibus suscipit. Quisque maximus lorem in diam finibus, a ornare leo fermentum. Ut interdum porttitor tortor ut varius. Vestibulum lacinia varius ipsum quis pharetra. Cras tempor elit aliquam pellentesque placerat. Aenean eu est et ex faucibus efficitur a vel metus. Mauris id vestibulum orci.",
              linkForQuestions: "/"
            },
            {
              title: "Live Streaming for Remote Guests",
              price: 1500,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget lacinia dui. Suspendisse massa ex, commodo non sollicitudin id, viverra vitae sem. Maecenas nec justo eget lorem auctor hendrerit. Vivamus fermentum turpis at finibus suscipit. Quisque maximus lorem in diam finibus, a ornare leo fermentum. Ut interdum porttitor tortor ut varius. Vestibulum lacinia varius ipsum quis pharetra. Cras tempor elit aliquam pellentesque placerat. Aenean eu est et ex faucibus efficitur a vel metus. Mauris id vestibulum orci.",
              linkForQuestions: "/"
            },
            {
              title: "Eco-Friendly Burials",
              price: 1500,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget lacinia dui. Suspendisse massa ex, commodo non sollicitudin id, viverra vitae sem. Maecenas nec justo eget lorem auctor hendrerit. Vivamus fermentum turpis at finibus suscipit. Quisque maximus lorem in diam finibus, a ornare leo fermentum. Ut interdum porttitor tortor ut varius. Vestibulum lacinia varius ipsum quis pharetra. Cras tempor elit aliquam pellentesque placerat. Aenean eu est et ex faucibus efficitur a vel metus. Mauris id vestibulum orci.",
              linkForQuestions: "/"
            },
            {
              title: "Eco-Friendly Burials",
              price: 1500,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget lacinia dui. Suspendisse massa ex, commodo non sollicitudin id, viverra vitae sem. Maecenas nec justo eget lorem auctor hendrerit. Vivamus fermentum turpis at finibus suscipit. Quisque maximus lorem in diam finibus, a ornare leo fermentum. Ut interdum porttitor tortor ut varius. Vestibulum lacinia varius ipsum quis pharetra. Cras tempor elit aliquam pellentesque placerat. Aenean eu est et ex faucibus efficitur a vel metus. Mauris id vestibulum orci.",
              linkForQuestions: "/"
            },

          ]} />

          <ProductsFAQs
            title="Frequently asked questions"
            headingButton={{
              label: "Call Now",
              link: "/"
            }}
            accordionItems={[
              {
                title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget lacinia dui. Suspendisse massa ex, commodo non sollicitudin id, viverra vitae sem. Maecenas nec justo eget lorem auctor hendrerit. Vivamus fermentum turpis at finibus suscipit. Quisque maximus lorem in diam finibus, a ornare leo fermentum. Ut interdum porttitor tortor ut varius. Vestibulum lacinia varius ipsum quis pharetra. Cras tempor elit aliquam pellentesque placerat. Aenean eu est et ex faucibus efficitur a vel metus. Mauris id vestibulum orci."
              },
              {
                title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget lacinia dui. Suspendisse massa ex, commodo non sollicitudin id, viverra vitae sem. Maecenas nec justo eget lorem auctor hendrerit. Vivamus fermentum turpis at finibus suscipit. Quisque maximus lorem in diam finibus, a ornare leo fermentum. Ut interdum porttitor tortor ut varius. Vestibulum lacinia varius ipsum quis pharetra. Cras tempor elit aliquam pellentesque placerat. Aenean eu est et ex faucibus efficitur a vel metus. Mauris id vestibulum orci."
              },
              {
                title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget lacinia dui. Suspendisse massa ex, commodo non sollicitudin id, viverra vitae sem. Maecenas nec justo eget lorem auctor hendrerit. Vivamus fermentum turpis at finibus suscipit. Quisque maximus lorem in diam finibus, a ornare leo fermentum. Ut interdum porttitor tortor ut varius. Vestibulum lacinia varius ipsum quis pharetra. Cras tempor elit aliquam pellentesque placerat. Aenean eu est et ex faucibus efficitur a vel metus. Mauris id vestibulum orci."
              },
            ]}
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

          <FlagVerify />

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
          <FlagVerify />
          <FormProduct />
        </>
      }
    />



    <FooterLanding menu_footer_items={DashboardData.menu_footer_items} />

  </>
}