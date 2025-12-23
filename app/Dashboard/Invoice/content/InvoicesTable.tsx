import { Table } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

// import a from './../../../../assets/images/icon'
import icon_invoice_id from './../../../../assets/images/icon-receipt_long-2.svg';
import icon_asignment from './../../../../assets/images/icon-assignment-2.svg';
import icon_credit_score from './../../../../assets/images/icon-credit_score-2.svg';
import icon_calendar_month from './../../../../assets/images/icon-calendar_month-2.svg';
import icon_local_atm from './../../../../assets/images/icon-local_atm-2.svg';


import icon_visibility from './../../../../assets/images/icon-visibility.svg';
import Stripe from "stripe";
import { getformattedPrice } from "@/utils/prices";
import { formatDateStripeSubscribtion } from "@/utils/dates-time";


const columns = [
  {
    name: "Invoice Id",
    icon: icon_invoice_id
  },
  {
    name: "Plan Name",
    icon: icon_asignment
  },
  {
    // name: "Payment Mode",
    name: "Status",
    icon: icon_credit_score
  },
  {
    name: "Date",
    icon: icon_calendar_month
  },
  {
    name: "Price",
    icon: icon_local_atm
  },
  {
    name: "View Invoice",
    icon: ""
  },

]

export default function InvoicesTable({ invoices }: { invoices: Stripe.Response<Stripe.ApiList<Stripe.Invoice>> }) {

  return <>
    <div className="invoices-table">
      <Table responsive>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>
                <span className="heading-title">
                  {column.icon && column.icon !== "" && <Image src={column.icon} alt={column.name} />}
                  {column.name}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            invoices.data.map((invoice, index) => {
              return <tr key={`invoice-${invoice.id}`}>
                <td>#{invoice.id}</td>
                <td>{
                  invoice.lines.data[0].description
                }</td>
                <td>{invoice.status}</td>
                <td>
                  {
                    // Jun 25, 2025
                    formatDateStripeSubscribtion(invoice.created)
                  }
                </td>
                <td>{getformattedPrice(invoice.total / 100)}</td>
                <td>
                  <Link className="btn-view-invoice" href={`/Dashboard/Invoice/ViewInvoice/${invoice.id}`} target="_blank">
                    <Image src={icon_visibility} alt="View Invoice" />
                  </Link>
                </td>
              </tr>
            })
          }
        </tbody>
      </Table>
    </div>
  </>
}