import React from 'react';
import { DateRangePicker } from './components/date-range-picker';
import { Notes } from './Notes';

function App() {
  return (
    <main className="App">
      <h1>Date Range Picker Challenge</h1>
      <DateRangePicker />
      <Notes />
    </main>
  );
}

export default App;
