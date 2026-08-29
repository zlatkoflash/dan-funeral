'use client';

import { useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';


export default function ScraperStatusPanel() {
  const { isConnected, status, logs } = useAppSelector((state) => state.socket);
  const [latestMessage, setLatestMessage] = useState<string>('None');
  const [latestType, setLatestType] = useState<string>('None');

  useEffect(() => {
    if (logs.length > 0) {
      const lastLog: any = logs[logs.length - 1];
      if (typeof lastLog === 'object' && lastLog !== null) {
        setLatestMessage(lastLog.message || 'None');
        setLatestType(lastLog.type || 'General');
      } else {
        setLatestMessage(String(lastLog));
        setLatestType('Message');
      }
    }
  }, [logs]);

  return (
    <p>
      <strong>WebSocket Status:</strong> {isConnected ? '🟢 Connected' : '🔴 Disconnected'} |
      <strong> Current Process:</strong> <span className="text-primary">{status}</span> |
      <strong> Type:</strong> <span className="text-secondary">{latestType}</span> |
      <strong> Message:</strong> <span className="text-muted">{latestMessage}</span> |
      <strong> Total Logs:</strong> {logs.length}
    </p>
  );
}