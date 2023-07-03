import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";
// import { usePersistantResponseStore } from "../../store/peristResponse";
import { ONFIDO_BASE_URL, ONFIDO_TOKEN } from "../ApiUrls";
import { getApiCall } from "../GetApiCall";
import { postApiCallImage } from "../PostApiCall";
import {
  getData,
  ACCESS_TOKEN,
  APPLICANT_ID,
} from "../../Storage/ApplicationStorage";
import { apiWithHeader, apiWithCustomHeader } from "../Api";
import RNFetchBlob from "rn-fetch-blob";
import { GetData } from "../../utils/utilities";
import Toast from "react-native-simple-toast";

interface UseRestProps {
  URL: string;
  PAYLOAD?: any;
  useUrlOnly?: boolean;
  lazy?: boolean;
  CALL_TYPE: number;
  fileList: [any];
}
interface UseRestReturnProps<T> {
  data: T | null;
  loading: number;
  error: string | null;
  responseCode: number;
  fetchData: (
    currentDataLength: number,
    fileList: [any]
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

const useRest = <T>({
  URL,
  PAYLOAD,
  CALL_TYPE,
  lazy = false,
  fileList,
}: UseRestProps): UseRestReturnProps<T> => {
  /**
   * Base code for getting data from rest
   */

  const baseUrl = ONFIDO_BASE_URL;
  const [loading, setLoading] = useState(LOADING_TYPES.STOPPED_LOADING);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [responseCode, setResponseCode] = useState(null);

  const fetchData: (
    currentDataLength: number,
    fileList: [any]
  ) => Promise<[T, Dispatch<SetStateAction<T | null>>]> = async (
    currentDataLength: number,
    fileList: [any]
  ) => {
    setLoading(LOADING_TYPES.LOADING);
    const applicant_id = await GetData(APPLICANT_ID);
    let responseJson;

    try {
      let url = ONFIDO_BASE_URL + URL;

      var files = [];
      if (fileList.length < 1) return;
      console.log("fileLIST======", url, "=-----", fileList);
      files.push({
        name: "type",
        data: "driving_licence",
      });
      files.push({
        name: "applicant_id",
        data: applicant_id,
      });
      fileList.map((item, index) =>
        files.push({
          name: "file",
          filename: Platform.OS == "ios" ? item?.path : item?.path,
          type: "image/jpeg",
          data:
            Platform.OS == "ios"
              ? RNFetchBlob.wrap(
                  decodeURIComponent(item?.path.replace("file://", ""))
                )
              : RNFetchBlob.wrap("file://" + item?.path),
        })
      ),
        await RNFetchBlob.config({
          timeout: 240000,
        })
          .fetch(
            "POST",
            url,
            {
              Authorization: `Token token=${ONFIDO_TOKEN}`,
              "Content-Type": "multipart/form-data",
            },

            files
          )
          .then((resp) => {
            console.log("Response JSON SUCCESS: ", JSON.stringify(resp.data));
            setData(resp.data);
            setLoading(LOADING_TYPES.STOPPED_LOADING);
            return [resp.data, setData];
          })
          .catch((err) => {
            // ...
            // alert("ERROR===" + JSON.stringify(err));
            console.log("Response JSON ERROR DIRECT: ", err);
            console.log("Response JSON ERROR: ", JSON.stringify(err));
            if (responseJson.status === 401) {
              setResponseCode(401);
            } else {
              setError(err);
              setLoading(LOADING_TYPES.STOPPED_LOADING);
            }
            return [responseJson.data, setData];
          });
    } catch (exception) {
      console.log("Error fetching", exception);

      setError(error);
    }
  };

  useEffect(() => {
    if (!lazy) fetchData(-2);
  }, [URL, baseUrl]);

  return {
    data,
    loading,
    error,
    fetchData,
    responseCode,
  };
};

export default useRest;
