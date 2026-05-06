"use client";

import icon_lock from '@/assets/images/icon-lock-for-badge.svg';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '@/redux/hooks';
import { dashboardSlice } from '@/redux/features/DashboardSlice';

export default function RecentLeads() {


  const leads: {
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
    ];

  const dispatch = useAppDispatch();

  return (
    <>
      <section className="recent-leads">

        <div className="heading">
          <div className="content">
            <h2>Recent leads</h2>
          </div>
          <div className="right-content">
            <div className="current-plan-label light">
              <img src={icon_lock.src} alt="icon_lock" />
              Upgrade to unlock
            </div>
          </div>
        </div>

        <div className="leads-wrap">
          {
            leads.map((lead, index) => (
              <div key={index} className={`lead ${lead.avaiable === true ? "available" : "not-available"}`}>
                <div className="initials">{lead.initials}</div>
                <div className="content">
                  <div className="name">{lead.name}</div>
                  <div className="description">{lead.description}</div>
                </div>
                <div className="right-content">
                  {
                    lead.avaiable !== true ? <>
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
                      <div className="time-date">{lead.time_date}</div>
                    </>
                  }
                </div>
              </div>
            ))
          }
        </div>

      </section>
    </>
  )
}