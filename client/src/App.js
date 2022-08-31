import JoinChat from "./ChatJoin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Register from "./Register";
import { getCookie } from "./cookies";
import { useNavigate } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<JoinChat />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
