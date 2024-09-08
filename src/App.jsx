import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/layouts";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./pages/Login/LoginPage";
import { setupAxiosInterceptors } from "./services/interceptor";

function App() {
  const [accessToken, setAccessToken] = React.useState(null);
  const [apiResponseMessage, setAPIResponseMessage] = React.useState("");

  const {
    isLoading,
    isAuthenticated,
    getIdTokenClaims,
    loginWithRedirect,
    logout,
  } = useAuth0();

  setupAxiosInterceptors(() => {
    logout();
    loginWithRedirect();
  });

  React.useEffect(() => {
    const getAccessToken = async () => {
      try {
        const idTokenClaims = await getIdTokenClaims();
        const idToken = idTokenClaims.__raw;

        setAccessToken(idToken);
        localStorage.setItem("token", idToken);
      } catch (e) {
        console.log(e.message);
      }
    };
    if (isAuthenticated && !isLoading) {
      setAPIResponseMessage("");
      getAccessToken();
    }
  }, [isAuthenticated, isLoading]);

  return (
    <>
      {isAuthenticated && !isLoading ? (
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        </Routes>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
