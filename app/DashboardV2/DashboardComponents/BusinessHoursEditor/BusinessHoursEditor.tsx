"use client";

import TextInput from "@/components/forms/Input";
import ZCheckBox from "@/components/forms/ZCheckBox";
import { useState } from "react";
import { IBusinessHour } from "../../EditBusiness/components/editors/BusinessHoursEditor";

export default function BusinessHoursEditor(
  {
    businessHours,
    onUpdate,
  }
    :
    {
      businessHours: IBusinessHour[],
      onUpdate: (businessHours: IBusinessHour[]) => void
    }
) {


  return <>
    <div className="business-hours-editor text-input-wrap">
      <label htmlFor="business-name" className="form-label">
        Business Hours
      </label>


      <div className="hours-days-working-v2">
        {businessHours.map((dayData, index) => (
          <div key={index} className="day-working">
            <label htmlFor="business-name" className="form-label">
              {dayData.day}
            </label>

            <div className="time-inputs">
              <TextInput
                type="time"
                value={
                  dayData.time_start
                }
                onChange={(e) => {
                  console.log("e:", e.target.value);
                  const updatedBusinessHours = [...businessHours];
                  updatedBusinessHours[index].time_start = e.target.value;
                  onUpdate(updatedBusinessHours);
                }}
                // disabled={!dayData.isEnabled || dayData.is24Hours}
                // value={dayData.fromHour}
                // onChange={(e) => updateDay(index, { fromHour: e.target.value })}
                id={`fromHour-${index}`}
              />
              <TextInput
                type="time"
                value={dayData.time_end}
                onChange={(e) => {
                  console.log("e:", e.target.value);
                  const updatedBusinessHours = [...businessHours];
                  updatedBusinessHours[index].time_end = e.target.value;
                  onUpdate(updatedBusinessHours);
                }}
                // disabled={!dayData.isEnabled || dayData.is24Hours}
                // value={dayData.fromHour}
                // onChange={(e) => updateDay(index, { fromHour: e.target.value })}
                id={`toHour-${index}`}
              />
            </div>

            <div className="checkboxes-inputs">
              <ZCheckBox
                id={`day-checkbox-${index}`}
                label="Enable"
                checked={dayData.day_week_is_available}
                onChange={(checked: boolean) => {
                  const updatedBusinessHours = [...businessHours];
                  updatedBusinessHours[index].day_week_is_available = checked;
                  onUpdate(updatedBusinessHours);
                }}
              />
              <ZCheckBox
                id={`day-checkbox-${index}-24h`}
                label="24 Hours"
                checked={dayData.it_is_working_24_hours}
                onChange={(checked: boolean) => {
                  const updatedBusinessHours = [...businessHours];
                  updatedBusinessHours[index].it_is_working_24_hours = checked;
                  onUpdate(updatedBusinessHours);
                }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  </>
}