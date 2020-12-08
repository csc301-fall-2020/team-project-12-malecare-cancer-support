import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

/** HTTP requests related to authentication */
/* payload must contain fields "email" and "password" */
export const login = (payload) => {
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

/* payload must contain the fields required for registration */
export const signup = (payload) => {
  // For this function, assume the payload is properly formatted by the caller
  const returnVal = axios
    .post("/auth/signup", payload)
    .then((response) => {
      return { response: response.data, errorMessage: "" };
    })
    .catch((error) => {
      return { response: null, errorMessage: error.response.data.error };
    });
  return returnVal;
};

/*** HTTP requests related to user information */
/* Get the profile information of the user with targetUserId */
export const getUser = (curAccessToken, targetUserId) => {
  // Include authToken in payload
  const payload = { authToken: curAccessToken };
  const returnVal = axios
    .get("/user/" + targetUserId, payload)
    .then((response) => {
      return { response: response.data, errorMessage: "" };
    })
    .catch((error) => {
      return { response: null, errorMessage: error.response.data.error };
    });
  return returnVal;
};

/* Get the profile information of the user with targetUserId */
export const getMatchRecommendations = (curAccessToken, curUserId) => {
  // Include authToken in payload
  const payload = { authToken: curAccessToken };
  const returnVal = axios
    .get("/matches/" + curUserId, payload)
    .then((response) => {
      return { response: response.data, errorMessage: "" };
    })
    .catch((error) => {
      return { response: null, errorMessage: error.response.data.error };
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

export const getCancerData = () => {
  const returnVal = axios
    .get("/data/cancer-data")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    })

    return returnVal;
}

export const getInterestsData = () => {
  const returnVal = axios
    .get("/data/interests")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    })
    return returnVal;
}