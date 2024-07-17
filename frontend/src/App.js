import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App w-full overflow-auto h-full bg-lightgray">
      <div>
      <Navbar />
      <HomePage />
      </div>

    </div>
  );
}

export default App;
