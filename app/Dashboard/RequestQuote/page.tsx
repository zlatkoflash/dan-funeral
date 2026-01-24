import FormSearch from "@/components/forms/ReadyForms/FormSearch"
import AdminContentWrap from "../content/AdminContentWrap"
import RequestListTable from "./RequestListTable"

export default function RequestQuotePage() {

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
          label: "Request Quote",
          link: "",
        },
      ],
      title: "Dashboard",
      right_content: <FormSearch buttonSearchType="btn-text" />
    }}>

      <div className="request-quote-info-text">
        <h4>Request List</h4>
        <p>Request List will appear here once the entries are made.</p>
      </div>

      <RequestListTable />

    </AdminContentWrap>
  </>

}