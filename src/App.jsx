import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Wishlist from "./Wishlist";
import Navbar from "./component/Navbar";
import ScrachCard from "./ScrachCard";
import ScratchCard2 from "./ScratchCard2";
import Support from "./Support";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/support" element={<Support/>} />
          <Route path="/scratch" element={<ScrachCard />} />
          <Route path="/scratch2" element={<ScratchCard2 />} />
          <Route path="/wishlist" element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
            } />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
