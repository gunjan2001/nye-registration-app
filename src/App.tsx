import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import RegistrantList from "./pages/RegistrantList";
import "./App.css";
import RegistrantForm from "./components/RegistrantForm";

const App: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <main className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrantForm />} />
        <Route path="/list" element={<RegistrantList />} />
      </Routes>
    </main>
  </div>
);

export default App;
