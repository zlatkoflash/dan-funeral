import FormSearch from "@/components/forms/ReadyForms/FormSearch";
import AdminContentWrap from "../content/AdminContentWrap";
import InvoicesTable from "./content/InvoicesTable";
import { getStripeCustomer, getStripeInvoices } from "@/utils/stripe";
import { AuthUser } from "@/ContextProvider/AuthProviderWrap";
import { getApiData } from "@/utils/api";
import ZError from "@/app/errors/ZError";

export default async function InvoicePage() {

  /**
   * Don't worry about the perfomance, next.js handle duplicate posts requests
   */
  const loggedUserData = await getApiData<{
    ok: Boolean,
    user: AuthUser
  }>("/user/getLoggedUser", "POST", {}, "authorize");

  if (!loggedUserData.ok) {
    // redirect("/login");
    return <ZError status={401} />
  }

  const customerId = await getStripeCustomer(loggedUserData.user.email);

  const invoices = await getStripeInvoices(customerId?.id as string);
  console.log("invoices:", invoices);

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
          label: "Invoice Home",
          link: "",
        },
      ],
      title: "Invoice",
      right_content: <FormSearch buttonSearchType="btn-text" />
    }}>

      <div className="request-quote-info-text">
        <h4>Invoice List</h4>
        <p>Check your payments list quotes.</p>
      </div>

      <InvoicesTable invoices={invoices} />

    </AdminContentWrap>
  </>
}