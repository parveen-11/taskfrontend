import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./pages/form";
import Data from "./pages/data";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from 'react-tooltip';


export default function App() {
  return (
    <>
      <Router>
        <ToastContainer theme="colored" />
        <ReactTooltip />
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/data" element={<Data />} />
          <Route path="/*" element={<Form />} />
        </Routes>
      </Router>
    </>
  );
}
