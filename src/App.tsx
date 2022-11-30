import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateForm from "./components/CreateForm";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/newpost" element={<CreateForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
