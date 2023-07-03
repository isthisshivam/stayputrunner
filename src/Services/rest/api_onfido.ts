import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import assets from "../../assets";
// import { usePersistantResponseStore } from "../../store/peristResponse";
import { ONFIDO_BASE_URL, ONFIDO_TOKEN } from "../ApiUrls";
import { getApiCall } from "../GetApiCallOnfido";
import { postApiCall } from "../PostApiCallOnfido";
import { deleteApiCallWithHeader } from "../DeleteApiCall";
import {
  getData,
  ACCESS_TOKEN,
  LOGIN_TYPE_TOKEN_KEY,
} from "../../Storage/ApplicationStorage";

import { useNavigation } from "@react-navigation/native";
import { putApiCall } from "../PutApiCall";
import Toast from "react-native-simple-toast";

interface UseRestProps {
  URL: string;
  PAYLOAD?: any;
  paginationEnabled?: boolean;
  useUrlOnly?: boolean;
  lazy?: boolean;
  persist?: boolean;
  optimisticResponse?: any;
  CALL_TYPE: number;
  RESPONSE_TYPE?: string;
}
interface UseRestReturnProps<T> {
  data: T | null;
  loading: number;
  error: string | null;
  responseCode: number;
  fetchData: (
    currentDataLength: number
  ) => Promise<[T, Dispatch<SetStateAction<T | null>>]>;
  search: CallableFunction;
}

export const LOADING_TYPES = {
  STOPPED_LOADING: 0,
  LOADING: 1,
  FETCHING_MORE: 2,
  STOPPED_FETCHING_MORE: 3,
  REFRESHING: 4,
  STOP_REFRESHING: 5,
  SEARCHING: 6,
  STOP_SEARCHING: 7,
};
export const CALL_TYPES = {
  GET: 1,
  POST: 2,
  DELETE: 3,
  PUT: 4,
};

export const useRest = <T>({
  URL,
  PAYLOAD,
  CALL_TYPE,
  paginationEnabled = true,
  useUrlOnly = false,
  lazy = false,
  persist = false,
  optimisticResponse,
  RESPONSE_TYPE,
}: UseRestProps): UseRestReturnProps<T> => {
  const navigation = useNavigation();

  const baseUrl = ONFIDO_BASE_URL;
  // const login = useLogin();
  const [loading, setLoading] = useState(LOADING_TYPES.REFRESHING);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [isOptimisticInitialized, setOptimisticInitialized] = useState(false);
  const [searchText, setSearchText] = useState("");
  var isreset = false;

  const fetchData: (
    currentDataLength: number
  ) => Promise<[T, Dispatch<SetStateAction<T | null>>]> = async (
    currentDataLength: number
  ) => {
    setLoading(
      data
        ? currentDataLength === -1
          ? LOADING_TYPES.REFRESHING
          : currentDataLength === -2
          ? LOADING_TYPES.SEARCHING
          : LOADING_TYPES.FETCHING_MORE
        : LOADING_TYPES.LOADING
    );

    let responseJson;

    try {
      let aToken = await getData(ACCESS_TOKEN);

      let token_key = await getData(LOGIN_TYPE_TOKEN_KEY);
      //console.log("TOKEN ======= ", aToken);

      console.log("PAYLOAD RECEIVED ======= ", PAYLOAD);
      let url = ONFIDO_BASE_URL + URL;
      console.log("URL ======= ", url);
      if (CALL_TYPE === CALL_TYPES.GET) {
        responseJson = await getApiCall(ONFIDO_TOKEN, url);
      } else if (CALL_TYPE === CALL_TYPES.DELETE) {
        responseJson = await deleteApiCallWithHeader(aToken, url, token_key);
      } else if (CALL_TYPE === CALL_TYPES.PUT) {
        responseJson = await putApiCall(aToken, url, token_key);
      } else {
        console.log("POST API CALL ONFIDO PARAMS======= ", url, "-------");
        try {
          responseJson = await postApiCall(
            PAYLOAD,
            ONFIDO_TOKEN,
            url,
            RESPONSE_TYPE
          );
        } catch (e) {
          console.log("EXCEPTION=========", e);
        }
      }
      console.log("Response JSON: ", responseJson);

      if (responseJson?.status == 401) {
        setResponseCode(401);
      } else {
        await setError(null);
        await setData(responseJson?.data);
        await setResponseCode(responseJson?.status);
      }
    } catch (exception) {
      console.log("Error fetching", exception);

      Toast.show("Please check your internet connection", Toast.SHORT);
      setError("Please check your internet connection");
    }
    setLoading(
      data
        ? currentDataLength === -1
          ? LOADING_TYPES.STOP_REFRESHING
          : currentDataLength === -2
          ? LOADING_TYPES.STOP_SEARCHING
          : LOADING_TYPES.STOPPED_FETCHING_MORE
        : LOADING_TYPES.STOPPED_LOADING
    );
    return [responseJson, setData];
  };

  const search = (keyword: any) => {
    console.log("SEARCH TEXT IN API============", keyword);
    setSearchText(keyword);
  };

  useEffect(() => {
    if (!lazy && searchText === "") fetchData(0);
    if (!lazy) fetchData(-2);
  }, [URL, baseUrl, searchText]);

  return {
    data,
    loading,
    error,
    fetchData,
    search,
    responseCode,
  };
};

export default useRest;
