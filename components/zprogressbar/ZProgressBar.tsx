import { ProgressBar } from "react-bootstrap";

export default function ZProgressBar({
  variant = "success",
  progress,
  labels = undefined
}: {
  variant: 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'secondary' | 'light' | 'dark';
  progress: number;
  labels?: { start: string, end: string } | null | undefined;
}) {
  return <>
    <div className="z-progress-bar">
      <ProgressBar variant={variant} now={progress} />
      {labels && <div className="labels">
        <div className="label-start">{labels.start}</div>
        <div className="label-end">{labels.end}</div>
      </div>}
    </div>
  </>
}