import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastProvider } from "./components/Toast";
import AddRecord from "./pages/AddRecord";
import PetRecordsTable from "./pages/ViewRecords";
import UpdateRecord from "./pages/UpdateRecords";

const Layout = () => (
  <>
    <Navbar />
    <main id="main" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Outlet />
    </main>
  </>
);

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/view" element={<PetRecordsTable />} />
            <Route path="/add" element={<AddRecord />} />
            <Route path="/update/:id" element={<UpdateRecord />} />
            <Route path="*" element={<Navigate to="/view" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
