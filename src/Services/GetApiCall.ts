import { apiWithHeader } from "./Api";
import { BASE_URL } from "../config/ApiEnvironment";
import { getData, ACCESS_TOKEN } from "../Storage/ApplicationStorage";

export const getApiCall = async (url, token) => {
  return apiWithHeader(token, BASE_URL)
    .get(url)
    .catch(async function (error) {
      let aToken = await getData(ACCESS_TOKEN);
      console.log("GET API TOKEN=====", aToken);
      console.log("GET API RESPONSE=====", error);

      return error.response;
    });
};
