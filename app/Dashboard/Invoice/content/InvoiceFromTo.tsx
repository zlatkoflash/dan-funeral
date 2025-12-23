import Image from "next/image";
import Link from "next/link";

import icon_mail from "../../../../assets/images/icon-mail.svg";
import icon_call from "../../../../assets/images/icon-call.svg";
import Stripe from "stripe";
import { AuthUser } from "@/ContextProvider/AuthProviderWrap";

export default function InvoiceFromTo({ invoice, userTo }: { invoice: Stripe.Response<Stripe.Invoice> | null, userTo: AuthUser }) {


  const usersFromTo = [
    {
      typeFromTo: "From",
      name: "Dan S.",
      addresses: [
        "2546 Penn Street",
        "Sikeston, MO 63801"
      ],
      email: "gentalroad@gmail.com",
      phone: "000 11 22 33 44"
    },
    {
      typeFromTo: "To",
      name: userTo.full_name,
      addresses: [
        userTo.business_address,
        userTo.business_location
      ],
      email: userTo.email,
      phone: userTo.phone
    }
  ];

  return <div className="invoice-from-to">
    {
      usersFromTo.map((user, index) => (
        <div key={index} className="invoice-from-to-user">
          <p className="lead">{user.typeFromTo}</p>
          <h4>{user.name}</h4>
          <p className="address" dangerouslySetInnerHTML={{ __html: user.addresses.join("<br/>") }}></p>
          <p className="email-phone">
            <Image src={icon_mail} alt="email" />
            <span>
              Email: <Link href={"mailto:" + user.email}>{user.email}</Link>
            </span>
          </p>
          <p className="email-phone">
            <Image src={icon_call} alt="email" />
            <span>
              Phone: <Link href={"tel:" + user.phone}>{user.phone}</Link>
            </span>
          </p>
        </div>
      ))
    }
  </div>
}

