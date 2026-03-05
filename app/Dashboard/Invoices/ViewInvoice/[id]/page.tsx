import FormSearch from "@/components/forms/ReadyForms/FormSearch";
import InvoicesTable from "../../content/InvoicesTable";
import AdminContentWrap from "@/app/Dashboard/content/AdminContentWrap";
import InvoiceTableOneRow from "../../content/InvoiceTableOneRow";
import InvoiceTableOneRowSubTotalTotal from "../../content/InvoiceTableOneRowSubTotalTotal";
import InvoiceFromTo from "../../content/InvoiceFromTo";
import { getBusinessDetails, getInvoiceById } from "@/utils/stripe";
import { formatDateStripeSubscribtion } from "@/utils/dates-time";
import ZError from "@/app/errors/ZError";
import { AuthUser } from "@/ContextProvider/AuthProviderWrap";
import { getApiData } from "@/utils/api";
import Link from "next/link";

export default async function ViewInvoicePage(params: { params: Promise<{ id: string }> }) {

  const loggedUserData = await getApiData<{
    ok: Boolean,
    user: AuthUser
  }>("/user/getLoggedUser", "POST", {}, "authorize");

  const invoiceId = await params.params;

  const invoice = await getInvoiceById(invoiceId.id);
  console.log("invoice:", invoice);

  const getBusiness = await getBusinessDetails();
  console.log("getBusiness:", getBusiness);
  console.log(getBusiness?.email);

  if (invoice === null) {
    return <>
      <ZError status={466} />
    </>
  }

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
          link: "/Dashboard/Invoice",
        },
        {
          label: "Invoice View",
          link: "",
        },
      ],
      title: "Invoice",
      right_content: <FormSearch buttonSearchType="btn-text" />
    }}>

      {/*<div className="request-quote-info-text">
        <Link target="_blank" href={invoice?.invoice_pdf as string}>
          <h4>Invoice #{invoice?.number}</h4>
          <p>{formatDateStripeSubscribtion(invoice?.created as number)}</p>
        </Link>
      </div>*/}

      <div className="request-quote-info-text">
        <h4>Invoice #{invoice?.number}</h4>
        <p>{formatDateStripeSubscribtion(invoice?.created as number)}</p>
      </div>

      <InvoiceFromTo invoice={invoice} userTo={loggedUserData.user} />

      <InvoiceTableOneRow invoice={invoice} />
      <InvoiceTableOneRowSubTotalTotal invoice={invoice} />

    </AdminContentWrap>
  </>
}