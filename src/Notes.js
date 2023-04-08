import React from 'react';
import './Notes.css';

export const Notes = () => (
  <div className="notes">
    <h2>Notes for Interviewers</h2>
    <p>
      Thanks for looking at this! It was a fun challenge. This is nowhere near
      where I'd like it to be, but I've exhausted my three hours and should stop
      here. I'd love to keep working on this though.
    </p>
    <p>
      Below are some notes to call out what I focused on during my three hours
      and what I would focus on for next steps if I had more time.
    </p>
    <h3>Disclaimers</h3>
    <ol>
      <li>
        All of this is built from scratch. The only things I borrowed were the
        box-shadow styles from MUI and the FocusTrap component from the
        focus-trap-react library (to which I'm a contributor!).
      </li>
      <li>
        The dates are hard-coded and only include months in the year 2023.
      </li>
      <li>
        Some of the logic in the datepicker is likely buggy. The initial
        experience of selecting a start and end date will work. Re-opening the
        datepicker and then selecting new dates may have an odd experience in
        some cases.
      </li>
      <li>
        I didn't focus on the styling for the trigger button for the datepicker.
        Ideally this would be styled nicer and would show the selected dates
        inside the button text. Or, it would be an input that users can type
        into. For a better input experience, I would use an input mask to help
        format the values nicely.
      </li>
      <li>
        The calendar dates don't have hover styles for when first selecting the
        start and end date. It would be better if the potential range of dates
        was shown on hover. If you want to see those styles, you'll need to
        select the start and end date and then re-open the datepicker.
      </li>
      <li>
        This demo should work well in the latest versions of Firefox and Chrome.
        In Safari I was running into issues with the focus trap functionality,
        which I believe is a bug with the focus-trap-react package and older
        versions of Safari that it no longer supports.
      </li>
    </ol>
    <h3>Accomplishments</h3>
    <ol>
      <li>
        This datepicker is fairly accessible. It should work nicely for mouse
        users, screen reader users, and keyboard users.
        <ul>
          <li>
            Mouse users can click the "Select date range" button to open the
            datepicker. Within the datepicker, they can click the navigation
            buttons to move between months, and they can choose two dates. Once
            the second date is selected, the datepicker closes.
          </li>
          <li>
            Keyboard users can interact with all the same functionality that
            mouse users can. A focus trap is implemented to keep the keyboard
            navigation within the datepicker when the datepicker is open. Focus
            is sent to the datepicker when it opens, and focus is sent back to
            the trigger button when the datepicker closes. Ideally the calendar
            dates would be navigated with the arrow keys instead of tabbing to
            each date, but I didn't have time to implement that.
          </li>
          <li>
            Screen reader users can interact with all the same functionality
            that mouse and keyboard users can. The trigger button has an
            `aria-haspopup="true"` attribute on it to communicate that clicking
            it will open a popup. The datepicker content is marked up as a
            dialog, so it has `aria-modal="true"`, `role="dialog"` and an
            `aria-label` on it. The focus trap and aria markup keeps the screen
            reader from interacting with content behind the datepicker while it
            is open. Each day in the calendar has an aria-label communicating
            what day it is and whether it's the start date, end date, or in the
            date range. The Next Month and Previous Month buttons have
            aria-label attributes for screen readers as well.
          </li>
        </ul>
      </li>
      <li>
        The size of the datepicker is consistent when switching between months.
        It's nice not having the content jump around, which would be visually
        jarring.
      </li>
      <li>The selected dates are retained even when moving between months.</li>
      <li>
        The date buttons have states for selected, hover, and when they are in
        between the range of selected dates.
      </li>
      <li>There is a minor animation when the datepicker opens.</li>
    </ol>
    <h3>To Do</h3>
    <ol>
      <li>Localization / Internationalization</li>
      <li>Unit tests</li>
      <li>Animation when the date picker is closed</li>
      <li>
        Put datepicker in a React portal to avoid the case where it gets hidden
        by parent containers with `overflow: hidden` on them or that have
        conflicting z-index issues
      </li>
      <li>
        Use text inputs instead of just a button, and use input masking for a
        better UX
      </li>
      <li>
        Show dates in range when hovering over dates, not just after the
        selection has already been made
      </li>
      <li>
        Show dates in range with a long connected background instead of separate
        circles
      </li>
      <li>
        Separate one large component into smaller sub-components (Calendar, Day,
        etc.)
      </li>
      <li>Additional cross-browser testing</li>
      <li>
        Possibly create a mobile version that uses the native datepicker, not
        just a mobile responsive component
      </li>
    </ol>
  </div>
);
