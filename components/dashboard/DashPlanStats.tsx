export interface IDashPlanStats {
  stats: {
    label: string,
    value: string
  }[],
  additionalElement: React.ReactElement
}

export default function DashPlanStats(data: IDashPlanStats) {

  const { stats, additionalElement } = data;

  return <div className="dashboard-plan-stats">

    {
      stats.map((item, key: number) => {
        return <div className="plan-stats-item" key={`item-plan-stats-${key}`}>
          <h5>{item.label}</h5>
          <h4>{item.value}</h4>
        </div>
      })
    }
    {/*<div className="badge-active-plan">
      Active
    </div>*/}
    {additionalElement}
  </div>
}