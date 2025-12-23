'use client'

import React, { useState } from 'react';
import TextInput from '../forms/Input';
import ZCheckBox from '../forms/ZCheckBox';

// --- Types ---
export interface DaySchedule {
  day: string;
  isEnabled: boolean;
  fromHour: string; // Using string for "HH:mm" format
  toHour: string;
  is24Hours: boolean;
}

interface WeeklySchedulerProps {
  initialData?: DaySchedule[];
  onUpdate?: (settings: DaySchedule[]) => void;
}

export const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];
export const DEFAULT_DAY_SCHEDULE = {
  // day,
  isEnabled: true,
  fromHour: '09:00',
  toHour: '17:00',
  is24Hours: false
};

const WeeklyScheduler: React.FC<WeeklySchedulerProps> = ({ onUpdate, initialData }) => {
  // Initialize 7 days with default values
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    initialData !== undefined ?
      initialData
      :
      DAYS_OF_WEEK.map(day => ({ ...DEFAULT_DAY_SCHEDULE, day }))
  );

  const handleUpdate = (updatedSchedule: DaySchedule[]) => {
    setSchedule(updatedSchedule);
    if (onUpdate) onUpdate(updatedSchedule);
  };

  const updateDay = (index: number, changes: Partial<DaySchedule>) => {
    const newSchedule = [...schedule];
    newSchedule[index] = { ...newSchedule[index], ...changes };

    // Logic: If 24h is checked, we might want to grey out or set hours
    if (changes.is24Hours) {
      newSchedule[index].fromHour = '00:00';
      newSchedule[index].toHour = '23:59';
    }

    handleUpdate(newSchedule);
  };

  return (
    <div className="z-weekly-scheduler">
      {
        /*<h2 className="text-xl font-bold text-gray-800 mb-6 px-2">Weekly Schedule Settings</h2>*/
      }

      <div className="z-weekly-scheduler__content">
        {schedule.map((dayData, index) => (
          <div
            key={dayData.day}
            className={`day-item transition-all ${dayData.isEnabled ? '' : 'opacity-60'
              }`}
          >
            {/* Toggle Day Enable */}
            <div className="">
              {
                /*<input
                type="checkbox"
                checked={dayData.isEnabled}
                onChange={(e) => updateDay(index, { isEnabled: e.target.checked })}
                className="cursor-pointer"
                id={`day-${index}`}
              />
              <label htmlFor={`day-${index}`}>Enable</label>*/
              }

              <ZCheckBox
                id={`day-checkbox-${index}`}
                label="Enable"
                checked={dayData.isEnabled}
                onChange={(checked) => updateDay(index, { isEnabled: checked })}
              />

            </div>

            {/* 24 Hours Check */}
            <div className="">
              {
                /*<input
                type="checkbox"
                disabled={!dayData.isEnabled}
                checked={dayData.is24Hours}
                onChange={(e) => updateDay(index, { is24Hours: e.target.checked })}
                className="cursor-pointer"
                id={`day-${index}-24h`}
              />
              <label htmlFor={`day-${index}-24h`}>24 Hours</label>*/
              }
              <ZCheckBox
                id={`day-checkbox-${index}-24h`}
                label="24 Hours"
                checked={dayData.is24Hours}
                onChange={(checked) => updateDay(index, { is24Hours: checked })}
              />
            </div>

            <div className='justify-center'>
              <span className="">{dayData.day}</span>
            </div>

            {/* Hours Selection */}
            <div className="">
              {
                /*<input
                type="time"
                disabled={!dayData.isEnabled || dayData.is24Hours}
                value={dayData.fromHour}
                onChange={(e) => updateDay(index, { fromHour: e.target.value })}
                className=""
              />*/
              }
              <TextInput
                type="time"
                disabled={!dayData.isEnabled || dayData.is24Hours}
                value={dayData.fromHour}
                onChange={(e) => updateDay(index, { fromHour: e.target.value })}
                id={`fromHour-${index}`}
              />
            </div>
            <div>
              {/*<input
                type="time"
                disabled={!dayData.isEnabled || dayData.is24Hours}
                value={dayData.toHour}
                onChange={(e) => updateDay(index, { toHour: e.target.value })}
                className=""
              />*/}
              <TextInput
                type="time"
                disabled={!dayData.isEnabled || dayData.is24Hours}
                value={dayData.toHour}
                onChange={(e) => updateDay(index, { toHour: e.target.value })}
                id={`toHour-${index}`}
              />
            </div>


          </div>
        ))}
      </div>

      {/* Developer Debug Output */}
      {/*<div className="mt-8 p-4 bg-gray-900 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono text-emerald-400">JSON Payload (Array of 7 Days)</span>
          <span className="text-[10px] text-gray-500 uppercase">One event returns this entire array</span>
        </div>
        <pre className="text-[10px] text-gray-300 overflow-auto max-h-48 font-mono">
          {JSON.stringify(schedule, null, 2)}
        </pre>
      </div>*/}
    </div>
  );
};

export default WeeklyScheduler;