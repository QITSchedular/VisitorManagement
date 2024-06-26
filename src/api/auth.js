import axios from "axios";
import defaultUser from "../utils/default-user";
const API_URL = process.env.REACT_APP_API;

export async function signIn(email, password) {
  const payload = {
    email: email,
    password: password,
  };
  try {
    // Send request
    const response = await axios.post(`${API_URL}VMS/Login`, payload);
    console.log("reponse : ", response);
    console.log(email, password);
    if (response.status === 200) {
      return {
        isOk: true,
        data: response.data,
      };
    }
  } catch (error) {
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
        console.log("hii :: ", getNewToken);
        if (getNewToken.isOK) {
          const myNewToken = getNewToken.data.access.access_token;

          console.log("Greatest Token : ", myNewToken);
          let authState = JSON.parse(sessionStorage.getItem("authState"));

          authState.access = myNewToken;

          const updatedAuthState = JSON.stringify(authState);

          sessionStorage.setItem("authState", updatedAuthState);
          return true;
        }
        console.log("my new token : ", getNewToken);
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
