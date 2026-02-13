import Link from "next/link";
import { Table } from "react-bootstrap";

import icon_refresh from './../../../../assets/images/icon-refresh.svg';
import icon_trash from './../../../../assets/images/icon-trash.svg';
import icon_edit from './../../../../assets/images/icon-grey-edit.svg';
import Image from "next/image";

export default function DashboardTableRankings() {
  return (
    <>
      <div className="invoices-table features-table">
        <Table responsive>
          <thead>
            <tr>
              <th><span className="heading-title">Listing Name:</span></th>
              <th><span className="heading-title">Rank</span></th>
              <th><span className="heading-title">Location</span></th>
              <th><span className="heading-title">Service/Product</span></th>
              <th><span className="heading-title">Price (Monthly)</span></th>
              <th className="text-end"><span className="heading-title justify-content-end">Action</span></th>
            </tr>
          </thead>
          <tbody>
            {
              [1, 2, 3, 4].map((val, key: number) => {
                return <tr key={`dashboard-table-rankings-${key}`}>
                  <td>Peaceful Funeral Home</td>
                  <td>Rank 1</td>
                  <td>Chicago</td>
                  <td>Funeral</td>
                  <td>
                    <div className="price-for">
                      $100
                    </div>
                    <span className="badge-table">Expire Jun 30, 2024</span>
                  </td>
                  <td className="text-end td-actions">
                    <div className="span-actions">
                      <Link className="btn-view-invoice" href={`/`} target="_blank">
                        <Image src={icon_refresh} alt="Refresh Rank" />
                      </Link>
                      <Link className="btn-view-invoice" href={`/`} target="_blank">
                        <Image src={icon_trash} alt="Delete Listing" />
                      </Link>
                      <Link className="btn-view-invoice" href={`/`} target="_blank">
                        <Image src={icon_edit} alt="Edit Listing" />
                      </Link>
                    </div>
                  </td>
                </tr>
              })
            }
          </tbody>
        </Table>
      </div>

    </>
  )
}