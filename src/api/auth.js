import axios from "axios";
import defaultUser from "../utils/default-user";
import { logToServer } from "./logger";
const API_URL = process.env.REACT_APP_API;

export async function signIn(email, password) {
  const payload = {
    email: email,
    password: password,
  };
  try {
    // Send request
    const response = await axios.post(`${API_URL}VMS/Login`, payload);
    if (response.status === 200) {
      await logToServer(
        "Login",
        "common",
        "login_view",
        "S",
        "SuccessFully LoggedIn...",
        JSON.stringify(payload),
        email,
        response.data.user.cmpid
      );
      return {
        isOk: true,
        data: response.data,
      };
    }
  } catch (error) {
    await logToServer(
      "Login",
      "common",
      "login_view",
      "S",
      "UnSuccessFully LoggedIn...",
      JSON.stringify(payload),
      email,
      0
    );
    return {
      isOk: false,
      message: error,
    };
  }
}

export async function checkAuthentication() {
  const storedSessionValue = JSON.parse(sessionStorage.getItem("authState"));
  const { access, user, userAuth } = storedSessionValue;
  const storedData = userAuth;
  const userData = user;
  const token = access;

  if (token != null && userData != null && storedData != null) {
    try {
      const header = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${API_URL}VMS/secure`, {
        headers: header,
      });
      if (response.status === 200 || response.status === 201) {
        return true;
      }
      return false;
    } catch (error) {
      if (error.response.status === 403) {
        const getNewToken = await getNewAccessToken();
        if (getNewToken.isOK) {
          const myNewToken = getNewToken.data.access.access_token;

          let authState = JSON.parse(sessionStorage.getItem("authState"));

          authState.access = myNewToken;

          const updatedAuthState = JSON.stringify(authState);

          sessionStorage.setItem("authState", updatedAuthState);
          return true;
        }

      }
      console.log("error : ", error);
      return false;
    }
  } else {
    return false;
  }
}

async function getNewAccessToken() {
  try {
    const sessionStoredData = JSON.parse(sessionStorage.getItem("authState"));
    const { refresh } = sessionStoredData;
    const payload = {
      refresh_token: refresh,
    };
    const response = await axios.post(`${API_URL}VMS/refreshToken`, payload);

    if (response.status === 200 || response.status === 201) {
      return {
        isOK: true,
        data: {
          access: response.data,
        },
      };
    } else {
      sessionStorage.removeItem("authState");
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function getUser() {
  try {
    const storedSessionValue = JSON.parse(sessionStorage.getItem("authState"));

    const { access, refresh, user, userAuth, expirationTime } =
      storedSessionValue;
    console.log("API tokeen : ", refresh);
    // Send request
    if (await checkAuthentication()) {
      const storedData = userAuth;
      if (storedData) {
        const currentTime = new Date().getTime();
        if (expirationTime >= currentTime) {
          return {
            isOK: true,
            data: {
              token: refresh,
              userData: user,
              userAuth: userAuth,
            },
          };
        } else {
          // remove the session
          sessionStorage.removeItem("authState");
        }
      }
    }
    return {
      isOk: true,
      data: {
        token: refresh,
        userData: user,
        userAuth: userAuth,
      },
    };
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function createAccount(email, password) {
  try {
    // Send request
    console.log(email, password);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to create account",
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to change password",
    };
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to reset password",
    };
  }
}

