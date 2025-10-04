import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Mentoring from "./pages/Mentoring";
import Berita from "./pages/Berita";
import NewsDetail from "./pages/NewsDetail";
import Footer from "./components/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

export default function App() {
  const location = useLocation();
  const hideNavAndFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/berita/");
  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/mentoring" element={<Mentoring />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<NewsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}
