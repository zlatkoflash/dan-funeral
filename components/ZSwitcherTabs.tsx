import { Button } from "react-bootstrap";

export default function ZSwitcherTabs({ toggleTarget, setToggleTarget, targets }: {
  targets: string[],
  toggleTarget: string;
  setToggleTarget: (value: any) => void;
}) {
  if (targets.length !== 2) {
    return <>
      <p>Add 2 targets this switcher to work</p>
    </>;
  }
  return <>
    <div className="z-switcher-tabs">
      <Button type="button" className={targets[0] === toggleTarget ? "active" : ""} onClick={() => {
        setToggleTarget(targets[0]);
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clipPath="url(#clip0_1841_523)">
            <path d="M9.33268 2.66699H13.3327V6.66699H9.33268V2.66699ZM2.66602 9.33366H6.66602V13.3337H2.66602V9.33366ZM9.33268 11.3337C9.33268 11.8641 9.5434 12.3728 9.91847 12.7479C10.2935 13.1229 10.8022 13.3337 11.3327 13.3337C11.8631 13.3337 12.3718 13.1229 12.7469 12.7479C13.122 12.3728 13.3327 11.8641 13.3327 11.3337C13.3327 10.8032 13.122 10.2945 12.7469 9.91945C12.3718 9.54437 11.8631 9.33366 11.3327 9.33366C10.8022 9.33366 10.2935 9.54437 9.91847 9.91945C9.5434 10.2945 9.33268 10.8032 9.33268 11.3337ZM2.66602 4.66699C2.66602 4.92964 2.71775 5.18971 2.81826 5.43236C2.91877 5.67501 3.06608 5.89549 3.2518 6.08121C3.43752 6.26692 3.658 6.41424 3.90065 6.51475C4.1433 6.61526 4.40337 6.66699 4.66602 6.66699C4.92866 6.66699 5.18873 6.61526 5.43138 6.51475C5.67403 6.41424 5.89451 6.26692 6.08023 6.08121C6.26595 5.89549 6.41327 5.67501 6.51377 5.43236C6.61428 5.18971 6.66602 4.92964 6.66602 4.66699C6.66602 4.40435 6.61428 4.14428 6.51377 3.90163C6.41327 3.65897 6.26595 3.4385 6.08023 3.25278C5.89451 3.06706 5.67403 2.91974 5.43138 2.81923C5.18873 2.71872 4.92866 2.66699 4.66602 2.66699C4.40337 2.66699 4.1433 2.71872 3.90065 2.81923C3.658 2.91974 3.43752 3.06706 3.2518 3.25278C3.06608 3.4385 2.91877 3.65897 2.81826 3.90163C2.71775 4.14428 2.66602 4.40435 2.66602 4.66699Z" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_1841_523">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg> By Category
      </Button>
      <Button type="button" className={targets[1] === toggleTarget ? "active" : ""} onClick={() => {
        setToggleTarget(targets[1]);
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clipPath="url(#clip0_1841_528)">
            <g clipPath="url(#clip1_1841_528)">
              <path d="M8 12.3337L6 11.3337M6 11.3337L2 13.3337V4.66699L6 2.66699M6 11.3337V2.66699M6 2.66699L10 4.66699M10 4.66699L14 2.66699V7.33366M10 4.66699V8.00033M12.6667 12.0003V12.007M14.0807 13.4143C14.3604 13.1346 14.551 12.7783 14.6282 12.3903C14.7054 12.0023 14.6658 11.6002 14.5145 11.2347C14.3631 10.8692 14.1068 10.5568 13.7779 10.337C13.449 10.1172 13.0623 9.9999 12.6667 9.9999C12.2711 9.9999 11.8844 10.1172 11.5555 10.337C11.2266 10.5568 10.9702 10.8692 10.8189 11.2347C10.6675 11.6002 10.6279 12.0023 10.7051 12.3903C10.7824 12.7783 10.9729 13.1346 11.2527 13.4143C11.5313 13.6934 12.0027 14.111 12.6667 14.667C13.3676 14.0737 13.8389 13.6561 14.0807 13.4143Z" stroke="#224A22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_1841_528">
              <rect width="16" height="16" fill="white" />
            </clipPath>
            <clipPath id="clip1_1841_528">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg> By Location
      </Button>
    </div>
  </>;
}