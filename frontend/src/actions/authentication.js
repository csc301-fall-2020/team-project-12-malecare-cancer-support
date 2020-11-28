/** HTTP requests related to authentication */
import axios from "axios";

const baseUrl = "http://localhost:5000";

axios.defaults.baseURL = baseUrl;

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
    console.log(returnVal);
  return returnVal;
};
