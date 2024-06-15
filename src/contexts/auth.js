import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { getUser, signIn as sendSignInRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";

function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [authRuleContext, setAuthRuleContext] = useState([]);

  useEffect(() => {
    //console.log("yoo");
    (async function () {
      const result = await getUser();
      console.log("result : ", result.isOK);
      if (result.isOK) {
        console.log("here : ");
        setUser(result.data.userData);
        setAuthRuleContext(result.data.userAuth);
      }

      setLoading(false);
    })();
  }, []);

  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log("hii");
  //   const userExist = sessionStorage.getItem("authState") ? true : false;
  //   console.log(userExist);
  //   if (userExist === false) {
  //     console.log("hio");
  //     navigate("/login");
  //   }
  // }, []);

  const signIn = useCallback(async (email, password) => {
    const result = await sendSignInRequest(email, password);

    if (result.isOk) {
      setUser(result.data.user);
      console.log("my data : ", result.data);
      setAuthRuleContext(result.data.userAuth);
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

  useEffect(() => {
    console.log("my context : ", authRuleContext);
  }, [authRuleContext]);

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
