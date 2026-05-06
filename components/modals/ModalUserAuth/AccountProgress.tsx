import dotActive from './../../../assets/images/circle-dot-active.svg';
import dotCompleted from './../../../assets/images/circle-dot-completed.svg';
import dotPending from './../../../assets/images/circle-dot-pending.svg';



export default function AccountProgress({
  steps
}: {
  steps: { title: string, status: 'active' | 'completed' | 'pending' }[]
}) {

  const getDot = (status: 'active' | 'completed' | 'pending') => {
    switch (status) {
      case 'active':
        return <img src={dotActive.src} alt="dot-active" />;
      case 'completed':
        return <img src={dotCompleted.src} alt="dot-completed" />;
      case 'pending':
        return <img src={dotPending.src} alt="dot-pending" />;
    }
  }

  return (
    <div className="account-progress-wrap">
      <div className="account-progress">
        {
          steps.map((step, index) => (
            <div key={'step-status' + index} className={`account-progress-step ${step.status}`}>
              <div className="account-progress-step-content">
                {
                  getDot(step.status)
                }
                <h3 className="account-progress-step-title">{step.title}</h3>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}