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

  const handleDayClick = (e) => {
    const { day, month, year } = e.target.dataset;
    const selectedDate = new Date(year, month - 1, day);

    if (!startDate) {
      return setStartDate(selectedDate);
    }

    if (selectedDate < startDate) {
      return setStartDate(selectedDate);
    }

    setEndDate(selectedDate);
    toggleDatePicker();
  };

  return (
    <div data-testid="date-range-picker" className="dateRangePicker">
      <p>
        Start date:{' '}
        {startDate?.toLocaleDateString(undefined, {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </p>
      <p>
        End date:{' '}
        {endDate?.toLocaleDateString(undefined, {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </p>
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
            {days[currentMonthIndex].map((day, index) => {
              const indexOfFirstDayOfMonth = days[currentMonthIndex].indexOf(1);
              const isPreviousMonth = index < indexOfFirstDayOfMonth;
              const isNextMonth =
                day < 15 && index > days[currentMonthIndex].indexOf(day);

              const monthIndexForThisDay = isPreviousMonth
                ? currentMonthIndex - 1
                : isNextMonth
                ? currentMonthIndex + 1
                : currentMonthIndex;

              const fullDateForDay = new Date(2023, monthIndexForThisDay, day);
              const isSelected =
                startDate?.toDateString() === fullDateForDay.toDateString() ||
                endDate?.toDateString() === fullDateForDay.toDateString();

              const isInsideSelectedRange =
                startDate &&
                endDate &&
                fullDateForDay > startDate &&
                fullDateForDay < endDate;

              return (
                <button
                  key={`${monthIndexForThisDay}-${day}-2023-${index}`}
                  data-testid="date-range-picker-calendar-day"
                  className={`dateRangePickerCalendarDay${
                    isSelected ? ' selected' : ''
                  }${isInsideSelectedRange ? ' dayInRange' : ''}`}
                  type="button"
                  onClick={handleDayClick}
                  data-day={day}
                  data-month={monthIndexForThisDay + 1}
                  data-year={2023}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
