import React, { useState } from 'react';
import { days, months } from './constants';
import './index.css';

export const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(3);

  const toggleDatePicker = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const goToPreviousMonth = () => {
    setCurrentMonthIndex((currentMonthIndex) => currentMonthIndex - 1);
  };

  const goToNextMonth = () => {
    setCurrentMonthIndex((currentMonthIndex) => currentMonthIndex + 1);
  };

  return (
    <div data-testid="date-range-picker" className="dateRangePicker">
      <button
        type="button"
        onClick={toggleDatePicker}
        data-testid="date-range-picker-trigger-button"
        className="dateRangePickerTriggerButton"
      >
        Select date range
      </button>
      {isOpen && (
        <div
          data-testid="date-range-picker-calendar"
          className="dateRangePickerCalendar"
        >
          <div
            data-testid="date-range-picker-calendar-controls"
            className="dateRangePickerCalendarControls"
          >
            <span>{months[currentMonthIndex]} 2023</span>
            <span
              data-testid="date-range-picker-next-previous-buttons"
              className="dateRangePickerNextPreviousButtons"
            >
              <button
                type="button"
                onClick={goToPreviousMonth}
                disabled={currentMonthIndex === 0}
                aria-label="Previous Month"
              >
                &lt;
              </button>
              <button
                type="button"
                onClick={goToNextMonth}
                disabled={currentMonthIndex === 11}
                aria-label="Next Month"
              >
                &gt;
              </button>
            </span>
          </div>
          <div
            data-testid="date-range-picker-calendar-days"
            className="dateRangePickerCalendarDays"
          >
            {days[currentMonthIndex].map((day) => (
              <button
                data-testid="date-range-picker-calendar-day"
                className="dateRangePickerCalendarDay"
                type="button"
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
