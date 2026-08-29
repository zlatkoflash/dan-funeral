'use client';

import { useEffect } from 'react';
import { zsettings } from '@/settings/ZSettings';
import { useAppDispatch } from '@/redux/hooks';
import { setConnected, setStatus, addLog, clearLogs } from '@/redux/features/SocketSlice';
import { fetchScrapingStats } from '@/redux/features/ScrapingSliceThunk';


export default function SocketManager() {
  const dispatch = useAppDispatch();

  const ROOM_SCRAPING = "room-scraping";

  useEffect(() => {
    console.log('[SocketManager] Initializing and clearing logs...');
    dispatch(clearLogs());

    console.log(`[SocketManager] Connecting to WebSocket at: ${zsettings.scraping.ws}`);
    const ws = new WebSocket(zsettings.scraping.ws);

    ws.onopen = () => {
      console.log('[SocketManager] WebSocket connected successfully.');
      dispatch(setConnected(true));
      dispatch(setStatus('Connected'));

      // ⚠️ CRITICAL: Tell backend to join the room right after connecting!
      const joinPayload = JSON.stringify({ action: 'join', room: ROOM_SCRAPING });
      console.log('[SocketManager] Sending join room payload:', joinPayload);
      ws.send(joinPayload);
    };

    ws.onmessage = (event) => {
      console.log('[SocketManager] Raw message received:', event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.message) {
          console.log('[SocketManager] Adding log:', data.message);
          dispatch(addLog(data.message));
        }
        if (data.status) {
          console.log('[SocketManager] Updating status:', data.status);
          dispatch(setStatus(data.status));
        }

        if ([
          "new-zip-scraping-process-completed",
          "scrap-for-company-by-domain",
          "scraped-company-finished",
          "scraped-ai-company-finished"
        ].indexOf(data.type) !== -1) {
          dispatch(fetchScrapingStats());
        }

        console.log("socket data:", data);
      } catch (err) {
        console.error('[SocketManager] Failed to parse WebSocket message', err);
      }
    };

    ws.onclose = () => {
      console.log('[SocketManager] WebSocket connection closed.');
      dispatch(setConnected(false));
      dispatch(setStatus('Disconnected'));
    };

    ws.onerror = (error) => {
      console.error('[SocketManager] WebSocket error encountered:', error);
    };

    return () => {
      console.log('[SocketManager] Component unmounting, cleaning up WebSocket connection...');
      if (ws.readyState === WebSocket.OPEN) {
        const leavePayload = JSON.stringify({ action: 'leave', room: ROOM_SCRAPING });
        ws.send(leavePayload);
        ws.close();
        console.log('[SocketManager] WebSocket explicitly closed.');
      }
    };
  }, [dispatch]);

  return null;
}