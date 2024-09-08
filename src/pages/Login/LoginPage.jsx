import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

function LoginPage() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  React.useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading]);
  return <></>;
}

export default LoginPage;
