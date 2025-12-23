'use client'

import { Toast, ToastContainer } from "react-bootstrap";
import { IDCToasterMessage, useDashboard } from "../../DashboardProvider";

/*const DashboardToasters: React.FC<DashboardToastersProps> = ({ 
  messages, 
  onRemove, 
  duration = 5000 
}) => {*/
const DashboardToasters: React.FC = () => {

  const { messages, setMessages } = useDashboard();

  // Mapping types to Bootstrap background colors
  const getBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'primary';
    }
  };

  return (
    // position-fixed ensures it stays on top of your dashboard content
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      {messages.map((msg) => (
        <Toast
          key={msg.id}
          onClose={() => {
            // setMessages(messages.filter((m) => m.id !== msg.id));
            setMessages((prev) => prev.filter((m) => m.id !== msg.id));
          }}
          bg={getBgColor(msg.type)}
          autohide
          delay={3000}
          className="mb-2 shadow-lg"
        >
          <Toast.Header closeButton={true} className="text-dark">
            <strong className="me-auto">{msg.title}</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body className={msg.type === 'warning' ? 'text-dark' : 'text-white'}>
            {msg.message}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default DashboardToasters;