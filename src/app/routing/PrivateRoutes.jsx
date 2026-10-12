import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { ErrorsPage } from "../pages/errors/ErrorsPage";
import Loader from "../components/Loader";
import useAuthContext from "../context/AuthContext";
import AuthPage from "../pages/auth/AuthPage";
import Layout from "../pages/layout/Layout";

const LayoutWrapper = ({ children, currentPageName }) =>
  Layout ? (
    <Layout currentPageName={currentPageName}>{children}</Layout>
  ) : (
    <>{children}</>
  );

const AppRoutes = () => {
  const { isAuthenticated, loading, user } = useAuthContext();

  return (
    <Routes>
      <Route path="error/*" element={<ErrorsPage />} />
      {isAuthenticated ? (
        user ? (
          <>
            <Route
              path="/*"
              element={
                loading ? (
                  <Loader />
                ) : (
                  <LayoutWrapper>
                    <PrivateRoutes user={user} />
                  </LayoutWrapper>
                )
              }
            />
            <>
              {user.role === 1 && (
                <Route index element={<Navigate to="/admin/dashboard" />} />
              )}
            </>
          </>
        ) : (
          <Route path="/*" element={<Loader />} />
        )
      ) : (
        <>
          <Route path="auth/*" element={<AuthPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
