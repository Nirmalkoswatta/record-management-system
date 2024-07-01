import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddRecord from "./pages/AddRecord";
import PetRecordsTable from "./pages/ViewRecords";
import UpdateRecord from "./pages/UpdateRecords";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<AddRecord />} />
        <Route path="/view" element={<PetRecordsTable />} />
        <Route path="/update/:id" element={<UpdateRecord />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
