import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Login, Signup, CustomerHome, StoreDashboard } from "./LazyComponents";

const AppRoutes = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : user.role === "customer" ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/store" replace />
              )
            }
          />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Customer dashboard */}
          {user?.role === "customer" && (
            <Route path="/dashboard" element={<CustomerHome />} />
          )}

          {/* Store dashboard */}
          {user?.role === "admin" && (
            <Route path="/store" element={<StoreDashboard />} />
          )}

          {/* Optional catch-all */}
          <Route
            path="*"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : user.role === "customer" ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/store" replace />
              )
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
