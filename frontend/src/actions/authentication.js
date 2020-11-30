/** HTTP requests related to authentication */
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

/* payload must contain fields "email" and "password" */
export const login = (payload) => {
  if (!("email" in payload && "password" in payload)) {
    return null;
  }
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
