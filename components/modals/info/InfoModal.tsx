'use client';

import { useEffect, useState } from "react";
import { Modal, ModalBody, Button } from "react-bootstrap";
import { useRouter } from 'next/navigation';

interface IInfoModalProps {
  show: boolean;
  title: string;
  description: string;
  redirectPath: string;
  countdownSeconds?: number;
}

export default function InfoCountdownModal({
  show,
  title,
  description,
  redirectPath,
  countdownSeconds = 10
}: IInfoModalProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(countdownSeconds);

  useEffect(() => {
    if (!show) return;

    // 1. Logic to decrease the timer every second
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // 2. Logic to redirect when timer hits 0
    if (timeLeft <= 0) {
      if (redirectPath !== "")
        router.push(redirectPath);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [show, timeLeft, router, redirectPath]);

  const handleManualRedirect = () => {
    router.push(redirectPath);
  };

  return (
    <Modal
      show={show}
      centered
      backdrop="static" // User cannot click outside to close
      keyboard={false} // User cannot press Esc to close
      className="modal-z"
    >
      <ModalBody className="p-4 text-center">
        <div className="info-content py-3">
          <h3 className="fw-bold mb-3">{title}</h3>
          <p className="text-muted mb-4">{description}</p>

          <div className="countdown-display mb-4">
            <span className="badge bg-light text-primary p-2 fs-6 border">
              Redirecting in <strong>{timeLeft}</strong> seconds...
            </span>
          </div>

          <Button
            variant="success"
            className="w-100 py-2 fw-bold"
            onClick={handleManualRedirect}
          >
            Continue Now
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}