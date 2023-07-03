import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { postApiCallFCM } from "../PostApiCall";
import { getData, ACCESS_TOKEN } from "../../Storage/ApplicationStorage";
const CONTENT_TYPE = "application/json";

const SERVER_KEY =
  "AAAA_W1ztlg:APA91bENWyNGBNoHLtw-px1fr26719w28st4KX99-MP5KwriXlu2uXZBjXkTF-0Tfo0KuF8YKhNhxyIKtileuali232CwaKfrKMYc5VTbHLHKRjNlki-9DaHiKgC8rDqa3AzeX_AfIOv";

interface UseRestProps {
  URL: string;
  PAYLOAD?: any;
  paginationEnabled?: boolean;
  lazy?: boolean;
}
interface UseRestReturnProps<T> {
  data: T | null;
  loading: number;
  error: string | null;
  fetchData: (
    currentDataLength: number
  ) => Promise<[T, Dispatch<SetStateAction<T | null>>]>;
}

export const LOADING_TYPES = {
  STOPPED_LOADING: 0,
  LOADING: 1,
};
export const CALL_TYPES = {
  GET: 1,
  POST: 2,
};

export const useRest = <T>({
  URL,
  PAYLOAD,
  lazy = false,
}: UseRestProps): UseRestReturnProps<T> => {
  const [loading, setLoading] = useState(LOADING_TYPES.LOADING);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData: (
    apnsToken
  ) => Promise<[T, Dispatch<SetStateAction<T | null>>]> = async (apnsToken) => {
    setLoading(LOADING_TYPES.LOADING);

    let responseJson;

    try {
      const headerParams = {
        "Content-Type": CONTENT_TYPE,
        Authorization: "key=" + SERVER_KEY,
      };
      const bodyParams = {
        application: "com.clc.compass.staging",
        sandbox: false,
        apns_tokens: [apnsToken],
      };
      responseJson = await postApiCallFCM(headerParams, bodyParams, URL);

      responseJson = responseJson.data;
      console.log("Response JSON: ", JSON.stringify(responseJson));

      await setData(responseJson);
    } catch (exception) {
      console.log("Error fetching", exception);
      setError(error);
    }
    setLoading(LOADING_TYPES.STOPPED_LOADING);
    return [responseJson, setData];
  };

  useEffect(() => {
    if (!lazy) fetchData("");
  }, [URL]);

  return {
    data,
    loading,
    error,
    fetchData,
  };
};

export default useRest;
