import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { getUser, signIn as sendSignInRequest } from "../api/auth";

function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [authRuleContext, setAuthRuleContext] = useState([]);

  useEffect(() => {
    (async function () {
      const result = await getUser();
      if (result.isOK) {
        setUser(result.data.userData);
        setAuthRuleContext(result.data.userAuth);
      }

      setLoading(false);
    })();
  }, []);


  const signIn = useCallback(async (email, password) => {
    const result = await sendSignInRequest(email, password);
    if (result.isOk) {
      setUser(result.data.user);
      const authAPIData = result.data.userAuth;
      const correctedString = authAPIData.replace(/'/g, '"')
      .replace(/True/g, "true")
      .replace(/False/g, "false");
      const userAuthJSON = JSON.parse(correctedString);
      const filteredData = userAuthJSON.filter((section) => section.hasAccess == true);
      setAuthRuleContext(filteredData);
      const { user, userAuth, refresh, access } = result.data;
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      const authData = {
        user,
        userAuth,
        refresh,
        access,
        expirationTime,
      };
      sessionStorage.setItem("authState", JSON.stringify(authData));
    }
    return result;
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem("authState");
    setUser(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, loading, authRuleContext }}
      {...props}
    />
  );
}

const AuthContext = createContext({ loading: false });
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
