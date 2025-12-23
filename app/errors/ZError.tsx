import FooterBanner from "@/components/banners/FooterBanner"

export default function ZError({ status }: { status: number }) {

  if (status === 404) {
    return <div style={{ paddingTop: "3rem" }}>
      <FooterBanner
        heading={{
          show: true,
          title: "⚠️ 404",
          paragraph: "Page Not Found"
        }}
        link="/"
        btnLinkText="Navigate to Home Page"
        background_image=""
      />
    </div>
  }
  else if (status === 405) {
    return <div style={{ paddingTop: "3rem" }}>
      <FooterBanner
        heading={{
          show: true,
          title: "⚠️ 405",
          paragraph: "Api CMS Route not found"
        }}
        link="/"
        btnLinkText="Try again or Navigate to Home Page"
        background_image=""
      />
    </div>
  }
  else if (status === 500) {

    return <div style={{ paddingTop: "3rem" }}>
      <FooterBanner
        heading={{
          show: true,
          title: "⚠️ 500",
          paragraph: "API External Server Error"
        }}
        link="/"
        btnLinkText="Navigate to Home Page"
        background_image=""
      />
    </div>
  }
  else if (status === 501) {

    return <div style={{ paddingTop: "3rem" }}>
      <FooterBanner
        heading={{
          show: true,
          title: "⚠️ 500",
          paragraph: "Web Application Internal Server Error"
        }}
        link="/"
        btnLinkText="Navigate to Home Page"
        background_image=""
      />
    </div>
  }
  else if (status === 401) {

    return <div style={{ paddingTop: "3rem" }}>
      <FooterBanner
        heading={{
          show: true,
          title: "⚠️ 401",
          paragraph: "Unauthorized REST API"
        }}
        link="/"
        btnLinkText="Navigate to Home Page"
        background_image=""
      />
    </div>
  }
  else if (status === 466) {

    return <div style={{ paddingTop: "3rem" }}>
      <FooterBanner
        heading={{
          show: true,
          title: "⚠️ 466 - Invoice Not Found",
          paragraph: "The invoice you are looking for does not exist."
        }}
        link="/"
        btnLinkText="Navigate to Home Page"
        background_image=""
      />
    </div>
  }

  return <div>
    <h1>{status} - Internal Server Error</h1>
  </div>
}