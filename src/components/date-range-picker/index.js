import React, { useRef, useState } from 'react';
import FocusTrap from 'focus-trap-react';
import { days, months } from './constants';
import './index.css';

export const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(3);

  const dateRangePickerTriggerButtonRef = useRef();

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

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      toggleDatePicker();
    }
  };

  const handleOutsideClick = () => {
    toggleDatePicker();
    dateRangePickerTriggerButtonRef.current?.focus();
  };

  return (
    <div data-testid="date-range-picker" className="dateRangePicker">
      <p>
        Start date:{' '}
        {startDate?.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </p>
      <p>
        End date:{' '}
        {endDate?.toLocaleDateString('en-US', {
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
        ref={dateRangePickerTriggerButtonRef}
      >
        Select date range
      </button>
      {isOpen && (
        <FocusTrap>
          <div>
            <div
              data-testid="date-range-picker-background-underlay"
              className="dateRangePickerBackgroundUnderlay"
              onClick={handleOutsideClick}
            />
            <div
              data-testid="date-range-picker-calendar"
              className="dateRangePickerCalendar"
              onKeyDown={handleEscapeKey}
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
                  const indexOfFirstDayOfMonth =
                    days[currentMonthIndex].indexOf(1);
                  const isPreviousMonth = index < indexOfFirstDayOfMonth;
                  const isNextMonth =
                    day < 15 && index > days[currentMonthIndex].indexOf(day);

                  const monthIndexForThisDay = isPreviousMonth
                    ? currentMonthIndex - 1
                    : isNextMonth
                    ? currentMonthIndex + 1
                    : currentMonthIndex;

                  const fullDateForDay = new Date(
                    2023,
                    monthIndexForThisDay,
                    day
                  );
                  const isSelected =
                    startDate?.toDateString() ===
                      fullDateForDay.toDateString() ||
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
          </div>
        </FocusTrap>
      )}
    </div>
  );
};
