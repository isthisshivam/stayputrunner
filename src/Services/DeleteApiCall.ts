import { apiWithHeader, apiWithoutHeader } from "./Api";
import { BASE_URL } from "../config/ApiEnvironment";


export const deleteApiCall = async (url) => {
  console.log("DELETE API URL=====", url);
  return apiWithoutHeader(BASE_URL)
    .delete(url)
    .catch(async function (error) {
      console.log("DELETE API RESPONSE=====", error);

      return error.response;
    });
};

export const deleteApiCallWithHeader = async (token, url, token_key) => {
  console.log("DELETE API URL=====", url);
  const CONTENT_TYPE = "application/json";
  return apiWithHeader(token, BASE_URL, CONTENT_TYPE, token_key)
    .delete(url)
    .catch(async function (error) {
      console.log("DELETE API RESPONSE WITH HEADER=====", error);

      return error.response;
    });
};
