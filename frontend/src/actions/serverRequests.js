import axios from "axios";

// The SERVER_BASE_URL environment variable should be defined when deploying
axios.defaults.baseURL = process.env.SERVER_BASE_URL || "http://localhost:5000";

/* Helper function (not exported) to make requests and return the result in a
 * uniform format. */
const axiosRequest = (method, url, data) => {
  const config = { method: method, url: url, data: data };
  return axios
    .request(config)
    .then((response) => {
      return { responseData: response.data, errorMessage: "" };
    })
    .catch((error) => {
      return { responseData: null, errorMessage: error.response.data.error };
    });
};

/*** HTTP requests related to authentication */
/* payload must contain fields "email" and "password" */
export const login = (payload) => {
  const returnVal = axiosRequest("POST", "/auth/login", payload);
  return returnVal;
};

/* payload must contain the fields required for registration */
export const signup = (payload) => {
  // For this function, assume the payload is properly formatted by the caller
  const returnVal = axiosRequest("POST", "/auth/signup", payload);
  return returnVal;
};

/*** HTTP requests related to user information */
/* Get the profile information of the user with targetUserId */
export const getUser = (targetUserId) => {
  const returnVal = axiosRequest("GET", "/user/" + targetUserId);
  return returnVal;
};

/* Get the profile information of the user with targetUserId */
export const getMatchRecommendations = (mode, curUserId) => {
  const returnVal = axiosRequest("GET", "/matches/" + curUserId);
  return returnVal;
};

/* When the current user wants to "pass" a match recommendation.
 * "mode" is one of ("dating", "mentor") */
export const matchRecommendationPass = (mode, curUserId, targetUserId) => {
  // Include authToken in payload, or pass along as cookie?
  const payload = { mode: mode };
  const returnVal = axiosRequest(
    "POST",
    "/matches/pass/" + curUserId + "&" + targetUserId,
    payload
  );
  return returnVal;
};

/* When the current user wants to "connect" with a match recommendation.
 * "mode" is one of ("dating", "mentor") */
export const matchRecommendationConnect = (mode, curUserId, targetUserId) => {
  // Include authToken in payload?
  const payload = { mode: mode };
  const returnVal = axiosRequest(
    "POST",
    "/matches/connect/" + curUserId + "&" + targetUserId,
    payload
  );
  return returnVal;
};

export const getConversations = (userId) => {
  const returnVal = axiosRequest("GET", "/conversations/" + userId);
  return returnVal;
};

export const getCancerData = () => {
  const returnVal = axios
    .get("/data/cancer-data")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return returnVal;
};

export const getInterestsData = () => {
  const returnVal = axios
    .get("/data/interests")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return returnVal;
};

