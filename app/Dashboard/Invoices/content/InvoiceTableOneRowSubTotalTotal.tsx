import { Table } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

// import a from './../../../../assets/images/icon'
import icon_invoice_id from './../../../../assets/images/icon-receipt_long-2.svg';
import icon_asignment from './../../../../assets/images/icon-assignment-2.svg';
import icon_credit_score from './../../../../assets/images/icon-credit_score-2.svg';
import icon_calendar_month from './../../../../assets/images/icon-calendar_month-2.svg';
import icon_local_atm from './../../../../assets/images/icon-local_atm-2.svg';

import icon_attach_money from './../../../../assets/images/icon-attach_money-2.svg';

import icon_visibility from './../../../../assets/images/icon-visibility.svg';
import Stripe from "stripe";
import { getformattedPrice } from "@/utils/prices";


const columns = [
  {
    name: "Sub Total",
    icon: icon_attach_money
  },
  {
    name: "",
  },
  {
    name: "",
    // icon: icon_credit_score
  },
  {
    name: "",
    // icon: icon_calendar_month
  },
  {
    name: "Total",
    icon: icon_attach_money
  },

]

export default function InvoiceTableOneRowSubTotalTotal({ invoice }: { invoice: Stripe.Response<Stripe.Invoice> | null }) {




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
            Array.from({ length: 1 }).map((_, index) => (
              <tr key={index}>
                <td>{getformattedPrice(invoice?.subtotal as number / 100)}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>{getformattedPrice(invoice?.total as number / 100)}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  </>
}