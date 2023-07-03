import { apiWithHeaderStripe } from "./Api";
import { ONFIDO_BASE_URL } from "./ApiUrls";
import qs from 'qs'

export const postApiCall = (params, token, url, RESPONSE_TYPE) => {
  return apiWithHeaderStripe(token, ONFIDO_BASE_URL, RESPONSE_TYPE)
    .post(url, JSON.stringify(params))
    .catch(function (error) {
      return error.response;
    });
};