import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import IssueCertificate from "./pages/IssueCertificate";
import VerifyCertificate from "./pages/VerifyCertificate";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issue" element={<IssueCertificate />} />
          <Route path="/verify" element={<VerifyCertificate />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;