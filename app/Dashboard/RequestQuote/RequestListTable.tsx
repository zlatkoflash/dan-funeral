'use client'

import { getApiData } from '@/utils/api';
import { ILead } from '@/utils/interfaceWP';
import React, { useEffect } from 'react';
import { Table, Container, Badge } from 'react-bootstrap';



// Mock data (You can replace this with data from your API)
const mockLeads: ILead[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    message: "I am interested in the premium consulting package.",
    receivedAt: "2026-01-14",
    listing_id_from_where_is_send: 0
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@provider.net",
    phone: "+44 7700 900077",
    message: "Could you please send over a quote for maintenance?",
    receivedAt: "2026-01-15",
    listing_id_from_where_is_send: 0
  }
];

export default function RequestListTable() {

  const [leads, setLeads] = React.useState<ILead[]>([]);
  const [loading, setLoading] = React.useState(false);

  const __LoadList = async () => {
    /*const response = await fetch('/api/leads');
    const data = await response.json();
    setLeads(data);*/
    setLoading(true)
    const leadsdata = await getApiData<{
      ok: boolean,
      data: ILead[]
    }>("/listings/reach-out-to-provider-get-leads", "POST", { ok: true }, "authorize");
    console.log("leadsdata:", leadsdata);
    setLeads(leadsdata.data);
    setLoading(false)
  }

  useEffect(() => {
    __LoadList();
  }, []);

  return (
    <Container className="p-0">
      {
        /*<div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Inbound Leads</h3>
        <Badge bg="primary">{mockLeads.length} Total</Badge>
      </div>*/
      }

      <div className="invoices-table">
        <Table responsive hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="border-0">Name</th>
              <th className="border-0">Email</th>
              <th className="border-0">Phone</th>
              <th className="border-0">Message</th>
              <th className="border-0 text-end">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="fw-bold">{lead.name}</td>
                  <td>
                    <a href={`mailto:${lead.email}`} className="text-decoration-none">
                      {lead.email}
                    </a>
                  </td>
                  <td><a href={`tel:${lead.phone}`}>{lead.phone}</a></td>
                  <td>
                    <div
                      style={{
                        maxWidth: '300px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      title={lead.message} // Shows full message on hover
                    >
                      {lead.message}
                    </div>
                  </td>
                  <td className="text-end text-muted small">
                    {lead.receivedAt}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-5 text-muted">
                  {
                    loading ? 'Loading...' : 'No leads found.'
                  }
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}