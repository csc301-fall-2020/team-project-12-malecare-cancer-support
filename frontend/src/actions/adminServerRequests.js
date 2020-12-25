import axios from "axios";

// The SERVER_BASE_URL environment variable should be defined when deploying
axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000";

/* Helper function (not exported) to make requests and return the result in a
 * uniform format. */
const axiosRequest = (method, url, data) => {
  const config = { method: method, url: url, data: data };
  return axios
    .request(config)
    .then((response) => {
      // successful response from server
      return { responseData: response.data, errorMessage: "" };
    })
    .catch((error) => {
      // an error occurred
      const returnObject = {
        responseData: null,
        errorMessage: "No response from the server",
      };
      if (error.response) {
        // we got a response from the server
        Object.assign(returnObject, {
          errorMessage: error.response.data.error,
          errorData: error.response.data,
        });
      }
      return returnObject;
    });
};

/* Helper used to request an email list of users matching the criteria in the
 * filter specified in payload; payload must contain the fields required for the
 * filter (defined by the server) */
export const requestEmails = (payload) => {
  const returnVal = axiosRequest("POST", "/api/admin", payload);
  return returnVal;
};
