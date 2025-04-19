import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AirportTable from './tableRender/AirportTable';
import CreateAirportForm from './createRecord/CreateRecord';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AirportTable />} />
        <Route path="/create" element={<CreateAirportForm />} />
      </Routes>
    </Router>
  );
}
export default App;
