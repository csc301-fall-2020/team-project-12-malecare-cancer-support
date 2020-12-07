import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

/** HTTP requests related to authentication */
/* payload must contain fields "email" and "password" */
export const login = (payload) => {
  // if (!("email" in payload && "password" in payload)) {
  //   return null;
  // }
  const returnVal = axios
    .post("/auth/login", payload)
    .then((response) => {
      return { response: response, errorMessage: "" };
    })
    .catch((error) => {
      return { response: null, errorMessage: error.response.data };
    });
  return returnVal;
};

export const signup = (payload) => {
  // For this function, assume the payload is properly formatted by the caller
  const returnVal = axios
    .post("/auth/signup", payload)
    .then((response) => {
      return { response: response, errorMessage: "" };
    })
    .catch((error) => {
      return { response: null, errorMessage: error.response.data };
    });
  return returnVal;
};

export const getConversations = (user_id) => {
  const returnVal = axios
    .get("/conversations/" + user_id)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return {response: null, errorMessage: error.response.data};
    })

  return returnVal;
}
