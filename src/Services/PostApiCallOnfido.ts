import {  apiWithHeaderONFIDO } from "./Api";
import { ONFIDO_BASE_URL } from "./ApiUrls";

export const postApiCall = (params,token, url, RESPONSE_TYPE) => {
  return apiWithHeaderONFIDO(token, ONFIDO_BASE_URL,RESPONSE_TYPE)
    .post(url, params)
    .catch(function (error) {
      return error.response;
    });
};