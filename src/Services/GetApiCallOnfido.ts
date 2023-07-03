import { apiWithHeaderONFIDO } from "./Api";
import { ONFIDO_BASE_URL } from "./ApiUrls";

export const getApiCall = ( token, url) => {
  return apiWithHeaderONFIDO(token, ONFIDO_BASE_URL)
  .get(url)
    .catch(function (error) {
      return error.response;
    });

 
};