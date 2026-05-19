"use client";

import icon_lock from '@/assets/images/icon-lock-for-badge.svg';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '@/redux/hooks';
import { dashboardSlice } from '@/redux/features/DashboardSlice';
import { useAuth } from '@/ContextProvider/AuthProviderWrap';
import { useEffect, useState } from 'react';
import { getApiData } from '@/utils/api';
import { ILead } from '@/utils/interfaceWP';
import { FriendlyLeadsDate } from '@/utils/strings';

export default function RecentLeads() {


  /*const leads: {
    initials: string,
    name: string,
    description: string,
    time_date: string,
    avaiable: boolean
  }[] = [
      {
        initials: "AB",
        name: "Alex Brown",
        description: "New lead from contact form",
        time_date: "2 hours ago",
        avaiable: false
      },
      {
        initials: "CD",
        name: "Charlie Davis",
        description: "New lead from contact form",
        time_date: "2 hours ago",
        avaiable: false
      },
      {
        initials: "EF",
        name: "Emily Foster",
        description: "New lead from contact form",
        time_date: "2 hours ago",
        avaiable: true
      }
    ];*/

  const dispatch = useAppDispatch();

  const { user } = useAuth();

  const [leads, setLeads] = useState<ILead[]>([]);

  const __loadLeads = async () => {
    const leadsdata = await getApiData<{
      ok: boolean,
      data: ILead[]
    }>("/listings/reach-out-to-provider-get-leads", "POST", {
      ok: true,
      listing_id: user?.defaultListing.id
    }, "authorize");
    setLeads(leadsdata.data);
    console.log("leadsdata:", leadsdata);
  }

  useEffect(() => {
    __loadLeads()
  }, []);

  return (
    <>
      <section className="recent-leads">

        <div className="heading">
          <div className="content">
            <h2>Recent leads</h2>
          </div>
          <div className="right-content">
            {
              user?.defaultListing.planType === "basic" && <div className="current-plan-label light">
                <img src={icon_lock.src} alt="icon_lock" />
                Upgrade to unlock
              </div>
            }
          </div>
        </div>

        {
          leads.length > 0 && <div className="leads-wrap">
            {
              leads.map((lead, index) => (
                <div key={index} className={`lead ${index === 0 || user?.defaultListing.planType !== "basic" ? "available" : "not-available"}`}>
                  <div className="initials">{lead.name.charAt(0).toUpperCase() + lead.name.charAt(1).toUpperCase()}</div>
                  <div className="content">
                    <div className="name">{lead.name}</div>
                    <div className="description"><strong>Message:</strong> {lead.message}</div>
                    <div className="description">
                      <strong>Phone</strong> <a href={`tel:${lead.phone}`}>{lead.phone}</a>, <strong>Email</strong> <a href={`mailto:${lead.email}`}>{lead.email}</a>
                    </div>
                  </div>
                  <div className="right-content">
                    {
                      index > 0 && user?.defaultListing.planType === "basic" ? <>
                        <Button variant='warning' type='button' size='sm' onClick={() => {
                          dispatch(
                            dashboardSlice.actions.setModalUpgradePlanShow({
                              show: true,
                              type: "unlock-leads-content"
                            })
                          );
                        }}>
                          Unlock
                        </Button>
                      </> : <>
                        <div className="time-date">{FriendlyLeadsDate(new Date(lead.receivedAt.replace(' ', 'T')))}</div>
                      </>
                    }
                  </div>
                </div>
              ))
            }
          </div>
        }

        {
          leads.length === 0 && <>

            <h2 className="leads-wrap text-center py-5">
              No leads found
            </h2>
          </>
        }


      </section>
    </>
  )
}