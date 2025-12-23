import FormSearch from "@/components/forms/ReadyForms/FormSearch";
import AdminContentWrap from "../content/AdminContentWrap";

export default function MyReviews() {

  return <>
    <AdminContentWrap subHeadSearchSettings={{
      breads: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Dashboard",
          link: "/Dashboard",
        },
        {
          label: "My Reviews",
          link: "",
        },
      ],
      title: "My Reviews",
      right_content: <FormSearch buttonSearchType="btn-text" />
    }}>

      <div className="request-quote-info-text">
        <h4>My Reviews</h4>
        <p>Your Reviews will appear here once the entries are made.</p>
      </div>


    </AdminContentWrap>
  </>
}