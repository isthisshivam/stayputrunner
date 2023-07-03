import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
  Linking,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Text_Input from "../../common_components/Text_Input";
import Button from "../../common_components/Button";
import * as RNLocalize from "react-native-localize";
import { Country, State, City } from "country-state-city";
import { Secrets } from "../../assets/secrets";
import { cities } from "../../assets/Const";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  showToastMessage,
  validLicense_no,
  GetData,
  SaveData,
} from "../../utils/utilities";
import { setData, getData } from "../../Storage/ApplicationStorage";
import { TextInputMask } from "react-native-masked-text";
import axios from "axios";
import { dW } from "../../utils/dynamicHeightWidth";
import { LOGIN_KEY } from "../../Storage/ApplicationStorage";
import moment from "moment";
import NetInfo from "@react-native-community/netinfo";
import { decode, encode } from "base-64";
import { getStoredData, storeData } from "../../Storage/ApplicationStorage";
import BackButton from "../../common_components/BackButton";
import SelectDropdown from "react-native-select-dropdown";
import { INVITEAPPLICANT_CERTN_PRODUCTION } from "../../Services/ApiUrls";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Background = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const cityDropDownRef = useRef();
  const { navigate, goBack } = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [apt, setApt] = useState("");
  const [userState, setUserState] = useState("");
  const [secure_no, setSecure_No] = useState("");
  const [city, setCity] = useState("");
  const [licenseNum, setLicenseNum] = useState("");
  const [licenseState, setLicenseState] = useState("");
  const [candidateID, setCandidateID] = useState("");
  const [report, setReport] = useState("");
  const [criminalID, setCriminalID] = useState([]);
  const [invitationId, setInvitationId] = useState("");
  const [loader, setLoader] = useState(false);
  const [work_country, setWorkCountry] = useState("");
  const [work_city, setWorkCity] = useState("");
  const [work_state, setWorkState] = useState("");
  const [workStateList, setWorkStateList] = useState([]);
  const [workCityList, setWorkCityList] = useState([]);
  const [invitationUrl, setInvitationUrl] = useState("");
  let datetimeField = useRef();

  const background_payload = {
    bg_firstname: firstName.trim(),
    bg_lastname: lastName.trim(),
    bg_address: address.trim(),
    bg_apt: apt.trim(),
    bg_social_security_number: secure_no.trim(),
    invitation_url: invitationUrl,
  };

  useEffect(() => {
    getUserDetails();
    if (candidateID) {
      sendInvitation();
      setLoader(false);
    }
  }, [candidateID]);
  useEffect(() => {
    if (invitationId) {
      createReport();
    }
  }, [invitationId]);

  const setPaths = async () => {
    let data = await getStoredData("PATH");

    await storeData("BACKGROUND_PAYLOAD", background_payload);
    await storeData("PATH", { ...data, Background_Check: true }).then(() => {
      navigate(assets.NavigationConstants.BACKCHECK_REPORT.NAME);
    });
  };
  useEffect(() => {
    if (invitationUrl) {
      setTimeout(() => {
        setPaths();
      }, 1000);
    }
  }, [invitationUrl]);

  const getUserDetails = async () => {
    let uData = await GetData(LOGIN_KEY);
    if (uData) {
      let userDetails = JSON.parse(uData);

      setEmail(userDetails?.email);
      setUserState(userDetails?.state);
      setCity(userDetails?.city);
    }
  };
  const createCandidate = () => {
    setLoader(true);
    let payload = {
      last_name: lastName.trim(),
      no_middle_name: true,
      first_name: firstName.trim(),
      dob: dob.trim(),
      //email: email,
      email: "isthisshivam@gmail.com",
      zipcode: zipCode.trim(),
      copy_requested: false,
      ssn: secure_no.trim(),
      driver_license_number: licenseNum.trim(),
      driver_license_state: work_state.toUpperCase().trim(),
      geo_ids: "c9a4b2196e6c61cc3b21e7f2",
    };

    let header = {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "5574571d6afaebc5f49550764f4f7a073013741e",
        password: "",
      },
      timeout: 500000,
    };
    //
    axios
      .post("https://api.checkr.com/v1/candidates", payload, header)
      .then((res) => {
        setCandidateID(res?.data?.id);
        setLoader(false);
      })
      .catch((error) => {
        console.log("CREATE CANDIDATE ERROR====", JSON.stringify(error));
        setLoader(false);
        setTimeout(() => {
          showToastMessage(
            "Sorry, We can't onboard you right now, we found some substantial problem with your identity."
          );
        }, 1000);
      });
  };
  const sendInvitation = () => {
    setLoader(true);
    axios
      .post(
        "https://api.checkr.com/v1/invitations",
        {
          candidate_id: candidateID?.trim(),
          package: "driver_pro",
          communication_types: ["email"],
          work_locations: [
            // {
            //   state: "CA",
            //   //  state: userState,
            //   country: "US",
            //   city: "San Francisco",
            //   //city: city,
            // },
            {
              state: work_state.toUpperCase(),
              country: work_country.toUpperCase(),
              city: work_city,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: "e81d479a7ba197ec198496eed87e1c0d2161193a",
            password: "",
          },
        }
      )
      .then((res) => {
        setInvitationId(res?.data?.id);

        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        setTimeout(() => {
          if (error?.message == "Request failed with status code 404") {
            showToastMessage("Incorrect WorkLocation!");
          } else {
            showToastMessage(
              "Sorry, We can't onboard you right now, we found some substantial problem with your identity."
            );
          }
        }, 1000);
        console.log("INVITATION ERROR====", JSON.stringify(error));
      });
  };
  const createReport = () => {
    setLoader(true);
    axios
      .post(
        "https://api.checkr.com/v1/reports",
        {
          candidate_id: candidateID?.trim(),
          package: "driver_pro",
          work_locations: [
            // {
            //   state: "CA",
            //   //  state: userState,
            //   country: "US",
            //   city: "San Francisco",
            //   //city: city,
            // },
            {
              state: work_state.toUpperCase(),
              country: work_country.toUpperCase(),
              city: work_city,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: "e81d479a7ba197ec198496eed87e1c0d2161193a",
            password: "",
          },
        }
      )
      .then((res) => {
        console.log("REPORT===", JSON.stringify(res));
        console.log("CRIMINAL_ID====", res?.data?.county_criminal_search_ids);
        setCriminalID(res?.data?.county_criminal_search_ids);
        setReport(res?.data?.id);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        setTimeout(() => {
          if (error?.message == "Request failed with status code 404") {
            showToastMessage("Incorrect WorkLocation!");
          } else {
            showToastMessage(
              "Sorry, We can't onboard you right now, we found some substantial problem with your identity."
            );
          }
        }, 1000);
        console.log("CREATE REPORT ERROR====", JSON.stringify(error.message));
      });
  };
  const inviteCertnApplicant = async () => {
    setLoader(true);
    // var convert_us_date_format = dob.trim().split("-").reverse().join("-");
    axios
      .post(
        INVITEAPPLICANT_CERTN_PRODUCTION,
        JSON.stringify({
          tag: assets.Secrets.APP_TAG,
          email: email,

          information: {
            // first_name: firstName.trim(),
            // last_name: lastName.trim(),
            // date_of_birth: convert_us_date_format,
            // license_number: licenseNum,
            addresses: [
              // {
              //   city: "San Francisco",
              //   province_state: "CA",
              //   country: "US",
              //   postal_code: "12346",
              // },
              {
                address: address,
                city: work_city,
                province_state: work_state,
                country: "US",
                postal_code: zipCode,
              },
            ],
          },
          request_flag: [
            {
              request_us_criminal_record_check_tier_3: true,
            },
            // {
            //   request_us_criminal_record_check_tier_2: true,
            // },
            // {
            //   request_us_criminal_record_check_tier_3: true,
            // },
          ],
        }),
        // {
        //   tag: "com.android.application",
        //   email: "runner@gmail.com",
        //   information: {
        //     first_name: "Runner",
        //     last_name: "User",
        //     date_of_birth: yourdate,
        //     license_number: "F2111655",
        //     addresses: [
        //       {
        //         city: "San Francisco",
        //         province_state: "CA",
        //         country: "US",
        //         postal_code: "12346",
        //       },
        //     ],
        //   },
        //   request_flag: [
        //     {
        //       request_us_criminal_record_check_tier_1: true,
        //     },
        //     {
        //       request_us_criminal_record_check_tier_2: true,
        //     },
        //     {
        //       request_us_criminal_record_check_tier_3: true,
        //     },
        //   ],
        // },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Secrets.CERTN_TOKEN.PROUCTION_TOKEN,
          },
        }
      )
      .then((res) => {
        console.log("inviteCertnApplicant.response", JSON.stringify(res?.data));
        global.applicantId = res?.data?.applicant?.id;

        setLoader(false);
        let applicant = {
          id: res?.data?.applicant?.id,
          application_url: res?.data?.applicant?.application_url,
        };
        saveBackgroundData(applicant);

        //console.log("CRIMINAL_ID====", res?.data?.county_criminal_search_ids);
        //setCriminalID(res?.data?.county_criminal_search_ids);
      })
      .catch((error) => {
        setLoader(false);
        // setTimeout(() => {
        //   if (error?.message == "Request failed with status code 404") {
        //     showToastMessage("Incorrect WorkLocation!");
        //   } else {
        //     showToastMessage(
        //       "Sorry, We can't onboard you right now, we found some substantial problem with your identity."
        //     );
        //   }
        // }, 1000);
        console.log("inviteCertnApplicant.catch====", JSON.stringify(error));
      });
  };
  const saveBackgroundData = async (data) => {
    await setData("BACKGROUNDINFO", JSON.stringify(data)).then(() => {
      setInvitationUrl(data?.application_url);
    });
  };
  const isValidbackground_check = () => {
    if (!address.trim()) {
      showToastMessage("Please enter Address");
      return false;
    } else if (!work_country.trim()) {
      showToastMessage("Please select your Driver Country");
      return false;
    } else if (!work_state.trim()) {
      showToastMessage("Please select your Driver State");
      return false;
    } else if (!work_city.trim()) {
      showToastMessage("Please select  your Driver City");
      return false;
    }

    return true;
  };
  const valid_Background = () => {
    if (isValidbackground_check()) {
      NetInfo.addEventListener((state) =>
        state.isConnected === true
          ? //createCandidate()
            inviteCertnApplicant()
          : showToastMessage("Please check your internet connection")
      );
    }
  };

  const updatedCountries = () => {
    // return countries.map((country) => ({
    //   label: country.name,
    //   value: country.id,
    //   ...country,
    // }));

    //let countries = Country.getAllCountries();
    let countries = [
      {
        name: "United States",
        isoCode: "US",
        flag: "🇺🇸",
        phonecode: "1",
        currency: "USD",
        latitude: "38.00000000",
        longitude: "-97.00000000",
        timezones: [
          {
            zoneName: "America/Adak",
            gmtOffset: -36000,
            gmtOffsetName: "UTC-10:00",
            abbreviation: "HST",
            tzName: "Hawaii–Aleutian Standard Time",
          },
          {
            zoneName: "America/Anchorage",
            gmtOffset: -32400,
            gmtOffsetName: "UTC-09:00",
            abbreviation: "AKST",
            tzName: "Alaska Standard Time",
          },
          {
            zoneName: "America/Boise",
            gmtOffset: -25200,
            gmtOffsetName: "UTC-07:00",
            abbreviation: "MST",
            tzName: "Mountain Standard Time (North America",
          },
          {
            zoneName: "America/Chicago",
            gmtOffset: -21600,
            gmtOffsetName: "UTC-06:00",
            abbreviation: "CST",
            tzName: "Central Standard Time (North America",
          },
          {
            zoneName: "America/Denver",
            gmtOffset: -25200,
            gmtOffsetName: "UTC-07:00",
            abbreviation: "MST",
            tzName: "Mountain Standard Time (North America",
          },
          {
            zoneName: "America/Detroit",
            gmtOffset: -18000,
            gmtOffsetName: "UTC-05:00",
            abbreviation: "EST",
            tzName: "Eastern Standard Time (North America",
          },
          {
            zoneName: "America/Indiana/Indianapolis",
            gmtOffset: -18000,
            gmtOffsetName: "UTC-05:00",
            abbreviation: "EST",
            tzName: "Eastern Standard Time (North America",
          },
          {
            zoneName: "America/Indiana/Knox",
            gmtOffset: -21600,
            gmtOffsetName: "UTC-06:00",
            abbreviation: "CST",
            tzName: "Central Standard Time (North America",
          },
          {
            zoneName: "America/Indiana/Marengo",
            gmtOffset: -18000,
            gmtOffsetName: "UTC-05:00",
            abbreviation: "EST",
            tzName: "Eastern Standard Time (North America",
          },
          {
            zoneName: "America/Indiana/Petersburg",
            gmtOffset: -18000,
            gmtOffsetName: "UTC-05:00",
            abbreviation: "EST",
            tzName: "Eastern Standard Time (North America",
          },
          {
            zoneName: "America/Indiana/Tell_City",
            gmtOffset: -21600,
            gmtOffsetName: "UTC-06:00",
            abbreviation: "CST",
            tzName: "Central Standard Time (North America",
          },
          {
            zoneName: "America/Indiana/Vevay",
            gmtOffset: -18000,
            gmtOffsetName: "UTC-05:00",
            abbreviation: "EST",
            tzName: "Eastern Standard Time (North America",
          },
          {
            zoneName: "America/Indiana/Vincennes",
            gmtOffset: -18000,
            gmtOffsetName: "UTC-05:00",
            abbreviation: "EST",
            tzName: "Eastern Standard Time (North America",
          },
          {
            zoneName: "America/Indiana/Winamac",
            gmtOffset: -18000,
            gmtOffsetName: "UTC-05:00",
            abbreviation: "EST",
            tzName: "Eastern Standard Time (North America",
          },
          {
            zoneName: "America/Juneau",
            gmtOffset: -32400,
            gmtOffsetName: "UTC-09:00",
            abbreviation: "AKST",
            tzName: "Alaska Standard Time",
          },
          {
            zoneName: "America/Kentucky/Louisville",
            gmtOffset: -18000,
            gmtOffsetName: "UTC-05:00",
            abbreviation: "EST",
            tzName: "Eastern Standard Time (North America",
          },
          {
            zoneName: "America/Kentucky/Monticello",
            gmtOffset: -18000,
            gmtOffsetName: "UTC-05:00",
            abbreviation: "EST",
            tzName: "Eastern Standard Time (North America",
          },
          {
            zoneName: "America/Los_Angeles",
            gmtOffset: -28800,
            gmtOffsetName: "UTC-08:00",
            abbreviation: "PST",
            tzName: "Pacific Standard Time (North America",
          },
          {
            zoneName: "America/Menominee",
            gmtOffset: -21600,
            gmtOffsetName: "UTC-06:00",
            abbreviation: "CST",
            tzName: "Central Standard Time (North America",
          },
          {
            zoneName: "America/Metlakatla",
            gmtOffset: -32400,
            gmtOffsetName: "UTC-09:00",
            abbreviation: "AKST",
            tzName: "Alaska Standard Time",
          },
          {
            zoneName: "America/New_York",
            gmtOffset: -18000,
            gmtOffsetName: "UTC-05:00",
            abbreviation: "EST",
            tzName: "Eastern Standard Time (North America",
          },
          {
            zoneName: "America/Nome",
            gmtOffset: -32400,
            gmtOffsetName: "UTC-09:00",
            abbreviation: "AKST",
            tzName: "Alaska Standard Time",
          },
          {
            zoneName: "America/North_Dakota/Beulah",
            gmtOffset: -21600,
            gmtOffsetName: "UTC-06:00",
            abbreviation: "CST",
            tzName: "Central Standard Time (North America",
          },
          {
            zoneName: "America/North_Dakota/Center",
            gmtOffset: -21600,
            gmtOffsetName: "UTC-06:00",
            abbreviation: "CST",
            tzName: "Central Standard Time (North America",
          },
          {
            zoneName: "America/North_Dakota/New_Salem",
            gmtOffset: -21600,
            gmtOffsetName: "UTC-06:00",
            abbreviation: "CST",
            tzName: "Central Standard Time (North America",
          },
          {
            zoneName: "America/Phoenix",
            gmtOffset: -25200,
            gmtOffsetName: "UTC-07:00",
            abbreviation: "MST",
            tzName: "Mountain Standard Time (North America",
          },
          {
            zoneName: "America/Sitka",
            gmtOffset: -32400,
            gmtOffsetName: "UTC-09:00",
            abbreviation: "AKST",
            tzName: "Alaska Standard Time",
          },
          {
            zoneName: "America/Yakutat",
            gmtOffset: -32400,
            gmtOffsetName: "UTC-09:00",
            abbreviation: "AKST",
            tzName: "Alaska Standard Time",
          },
          {
            zoneName: "Pacific/Honolulu",
            gmtOffset: -36000,
            gmtOffsetName: "UTC-10:00",
            abbreviation: "HST",
            tzName: "Hawaii–Aleutian Standard Time",
          },
        ],
      },
    ];
    return countries;
  };

  const updatedStates = (countryId) => {
    var data = [
      {
        label: "Alabama",
        value: "AL",
        name: "Alabama",
        isoCode: "AL",
        countryCode: "US",
        latitude: "32.31823140",
        longitude: "-86.90229800",
      },
      {
        label: "Alaska",
        value: "AK",
        name: "Alaska",
        isoCode: "AK",
        countryCode: "US",
        latitude: "64.20084130",
        longitude: "-149.49367330",
      },
      {
        label: "American Samoa",
        value: "AS",
        name: "American Samoa",
        isoCode: "AS",
        countryCode: "US",
        latitude: "-14.27097200",
        longitude: "-170.13221700",
      },
      {
        label: "Arizona",
        value: "AZ",
        name: "Arizona",
        isoCode: "AZ",
        countryCode: "US",
        latitude: "34.04892810",
        longitude: "-111.09373110",
      },
      {
        label: "Arkansas",
        value: "AR",
        name: "Arkansas",
        isoCode: "AR",
        countryCode: "US",
        latitude: "35.20105000",
        longitude: "-91.83183340",
      },
      {
        label: "Baker Island",
        value: "UM-81",
        name: "Baker Island",
        isoCode: "UM-81",
        countryCode: "US",
        latitude: "0.19362660",
        longitude: "-176.47690800",
      },
      {
        label: "California",
        value: "CA",
        name: "California",
        isoCode: "CA",
        countryCode: "US",
        latitude: "36.77826100",
        longitude: "-119.41793240",
      },
      {
        label: "Colorado",
        value: "CO",
        name: "Colorado",
        isoCode: "CO",
        countryCode: "US",
        latitude: "39.55005070",
        longitude: "-105.78206740",
      },
      {
        label: "Connecticut",
        value: "CT",
        name: "Connecticut",
        isoCode: "CT",
        countryCode: "US",
        latitude: "41.60322070",
        longitude: "-73.08774900",
      },
      {
        label: "Delaware",
        value: "DE",
        name: "Delaware",
        isoCode: "DE",
        countryCode: "US",
        latitude: "38.91083250",
        longitude: "-75.52766990",
      },
      {
        label: "District of Columbia",
        value: "DC",
        name: "District of Columbia",
        isoCode: "DC",
        countryCode: "US",
        latitude: "38.90719230",
        longitude: "-77.03687070",
      },
      {
        label: "Florida",
        value: "FL",
        name: "Florida",
        isoCode: "FL",
        countryCode: "US",
        latitude: "27.66482740",
        longitude: "-81.51575350",
      },
      {
        label: "Georgia",
        value: "GA",
        name: "Georgia",
        isoCode: "GA",
        countryCode: "US",
        latitude: "32.16562210",
        longitude: "-82.90007510",
      },
      {
        label: "Guam",
        value: "GU",
        name: "Guam",
        isoCode: "GU",
        countryCode: "US",
        latitude: "13.44430400",
        longitude: "144.79373100",
      },
      {
        label: "Hawaii",
        value: "HI",
        name: "Hawaii",
        isoCode: "HI",
        countryCode: "US",
        latitude: "19.89676620",
        longitude: "-155.58278180",
      },
      {
        label: "Howland Island",
        value: "UM-84",
        name: "Howland Island",
        isoCode: "UM-84",
        countryCode: "US",
        latitude: "0.81132190",
        longitude: "-176.61827360",
      },
      {
        label: "Idaho",
        value: "ID",
        name: "Idaho",
        isoCode: "ID",
        countryCode: "US",
        latitude: "44.06820190",
        longitude: "-114.74204080",
      },
      {
        label: "Illinois",
        value: "IL",
        name: "Illinois",
        isoCode: "IL",
        countryCode: "US",
        latitude: "40.63312490",
        longitude: "-89.39852830",
      },
      {
        label: "Indiana",
        value: "IN",
        name: "Indiana",
        isoCode: "IN",
        countryCode: "US",
        latitude: "40.26719410",
        longitude: "-86.13490190",
      },
      {
        label: "Iowa",
        value: "IA",
        name: "Iowa",
        isoCode: "IA",
        countryCode: "US",
        latitude: "41.87800250",
        longitude: "-93.09770200",
      },
      {
        label: "Jarvis Island",
        value: "UM-86",
        name: "Jarvis Island",
        isoCode: "UM-86",
        countryCode: "US",
        latitude: "-0.37435030",
        longitude: "-159.99672060",
      },
      {
        label: "Johnston Atoll",
        value: "UM-67",
        name: "Johnston Atoll",
        isoCode: "UM-67",
        countryCode: "US",
        latitude: "16.72950350",
        longitude: "-169.53364770",
      },
      {
        label: "Kansas",
        value: "KS",
        name: "Kansas",
        isoCode: "KS",
        countryCode: "US",
        latitude: "39.01190200",
        longitude: "-98.48424650",
      },
      {
        label: "Kentucky",
        value: "KY",
        name: "Kentucky",
        isoCode: "KY",
        countryCode: "US",
        latitude: "37.83933320",
        longitude: "-84.27001790",
      },
      {
        label: "Kingman Reef",
        value: "UM-89",
        name: "Kingman Reef",
        isoCode: "UM-89",
        countryCode: "US",
        latitude: "6.38333300",
        longitude: "-162.41666700",
      },
      {
        label: "Louisiana",
        value: "LA",
        name: "Louisiana",
        isoCode: "LA",
        countryCode: "US",
        latitude: "30.98429770",
        longitude: "-91.96233270",
      },
      {
        label: "Maine",
        value: "ME",
        name: "Maine",
        isoCode: "ME",
        countryCode: "US",
        latitude: "45.25378300",
        longitude: "-69.44546890",
      },
      {
        label: "Maryland",
        value: "MD",
        name: "Maryland",
        isoCode: "MD",
        countryCode: "US",
        latitude: "39.04575490",
        longitude: "-76.64127120",
      },
      {
        label: "Massachusetts",
        value: "MA",
        name: "Massachusetts",
        isoCode: "MA",
        countryCode: "US",
        latitude: "42.40721070",
        longitude: "-71.38243740",
      },
      {
        label: "Michigan",
        value: "MI",
        name: "Michigan",
        isoCode: "MI",
        countryCode: "US",
        latitude: "44.31484430",
        longitude: "-85.60236430",
      },
      {
        label: "Midway Atoll",
        value: "UM-71",
        name: "Midway Atoll",
        isoCode: "UM-71",
        countryCode: "US",
        latitude: "28.20721680",
        longitude: "-177.37349260",
      },
      {
        label: "Minnesota",
        value: "MN",
        name: "Minnesota",
        isoCode: "MN",
        countryCode: "US",
        latitude: "46.72955300",
        longitude: "-94.68589980",
      },
      {
        label: "Mississippi",
        value: "MS",
        name: "Mississippi",
        isoCode: "MS",
        countryCode: "US",
        latitude: "32.35466790",
        longitude: "-89.39852830",
      },
      {
        label: "Missouri",
        value: "MO",
        name: "Missouri",
        isoCode: "MO",
        countryCode: "US",
        latitude: "37.96425290",
        longitude: "-91.83183340",
      },
      {
        label: "Montana",
        value: "MT",
        name: "Montana",
        isoCode: "MT",
        countryCode: "US",
        latitude: "46.87968220",
        longitude: "-110.36256580",
      },
      {
        label: "Navassa Island",
        value: "UM-76",
        name: "Navassa Island",
        isoCode: "UM-76",
        countryCode: "US",
        latitude: "18.41006890",
        longitude: "-75.01146120",
      },
      {
        label: "Nebraska",
        value: "NE",
        name: "Nebraska",
        isoCode: "NE",
        countryCode: "US",
        latitude: "41.49253740",
        longitude: "-99.90181310",
      },
      {
        label: "Nevada",
        value: "NV",
        name: "Nevada",
        isoCode: "NV",
        countryCode: "US",
        latitude: "38.80260970",
        longitude: "-116.41938900",
      },
      {
        label: "New Hampshire",
        value: "NH",
        name: "New Hampshire",
        isoCode: "NH",
        countryCode: "US",
        latitude: "43.19385160",
        longitude: "-71.57239530",
      },
      {
        label: "New Jersey",
        value: "NJ",
        name: "New Jersey",
        isoCode: "NJ",
        countryCode: "US",
        latitude: "40.05832380",
        longitude: "-74.40566120",
      },
      {
        label: "New Mexico",
        value: "NM",
        name: "New Mexico",
        isoCode: "NM",
        countryCode: "US",
        latitude: "34.51994020",
        longitude: "-105.87009010",
      },
      {
        label: "New York",
        value: "NY",
        name: "New York",
        isoCode: "NY",
        countryCode: "US",
        latitude: "40.71277530",
        longitude: "-74.00597280",
      },
      {
        label: "North Carolina",
        value: "NC",
        name: "North Carolina",
        isoCode: "NC",
        countryCode: "US",
        latitude: "35.75957310",
        longitude: "-79.01929970",
      },
      {
        label: "North Dakota",
        value: "ND",
        name: "North Dakota",
        isoCode: "ND",
        countryCode: "US",
        latitude: "47.55149260",
        longitude: "-101.00201190",
      },
      {
        label: "Northern Mariana Islands",
        value: "MP",
        name: "Northern Mariana Islands",
        isoCode: "MP",
        countryCode: "US",
        latitude: "15.09790000",
        longitude: "145.67390000",
      },
      {
        label: "Ohio",
        value: "OH",
        name: "Ohio",
        isoCode: "OH",
        countryCode: "US",
        latitude: "40.41728710",
        longitude: "-82.90712300",
      },
      {
        label: "Oklahoma",
        value: "OK",
        name: "Oklahoma",
        isoCode: "OK",
        countryCode: "US",
        latitude: "35.46756020",
        longitude: "-97.51642760",
      },
      {
        label: "Oregon",
        value: "OR",
        name: "Oregon",
        isoCode: "OR",
        countryCode: "US",
        latitude: "43.80413340",
        longitude: "-120.55420120",
      },
      {
        label: "Palmyra Atoll",
        value: "UM-95",
        name: "Palmyra Atoll",
        isoCode: "UM-95",
        countryCode: "US",
        latitude: "5.88850260",
        longitude: "-162.07866560",
      },
      {
        label: "Pennsylvania",
        value: "PA",
        name: "Pennsylvania",
        isoCode: "PA",
        countryCode: "US",
        latitude: "41.20332160",
        longitude: "-77.19452470",
      },
      {
        label: "Puerto Rico",
        value: "PR",
        name: "Puerto Rico",
        isoCode: "PR",
        countryCode: "US",
        latitude: "18.22083300",
        longitude: "-66.59014900",
      },
      {
        label: "Rhode Island",
        value: "RI",
        name: "Rhode Island",
        isoCode: "RI",
        countryCode: "US",
        latitude: "41.58009450",
        longitude: "-71.47742910",
      },
      {
        label: "South Carolina",
        value: "SC",
        name: "South Carolina",
        isoCode: "SC",
        countryCode: "US",
        latitude: "33.83608100",
        longitude: "-81.16372450",
      },
      {
        label: "South Dakota",
        value: "SD",
        name: "South Dakota",
        isoCode: "SD",
        countryCode: "US",
        latitude: "43.96951480",
        longitude: "-99.90181310",
      },
      {
        label: "Tennessee",
        value: "TN",
        name: "Tennessee",
        isoCode: "TN",
        countryCode: "US",
        latitude: "35.51749130",
        longitude: "-86.58044730",
      },
      {
        label: "Texas",
        value: "TX",
        name: "Texas",
        isoCode: "TX",
        countryCode: "US",
        latitude: "31.96859880",
        longitude: "-99.90181310",
      },
      {
        label: "United States Minor Outlying Islands",
        value: "UM",
        name: "United States Minor Outlying Islands",
        isoCode: "UM",
        countryCode: "US",
        latitude: "19.28231920",
        longitude: "166.64704700",
      },
      {
        label: "United States Virgin Islands",
        value: "VI",
        name: "United States Virgin Islands",
        isoCode: "VI",
        countryCode: "US",
        latitude: "18.33576500",
        longitude: "-64.89633500",
      },
      {
        label: "Utah",
        value: "UT",
        name: "Utah",
        isoCode: "UT",
        countryCode: "US",
        latitude: "39.32098010",
        longitude: "-111.09373110",
      },
      {
        label: "Vermont",
        value: "VT",
        name: "Vermont",
        isoCode: "VT",
        countryCode: "US",
        latitude: "44.55880280",
        longitude: "-72.57784150",
      },
      {
        label: "Virginia",
        value: "VA",
        name: "Virginia",
        isoCode: "VA",
        countryCode: "US",
        latitude: "37.43157340",
        longitude: "-78.65689420",
      },
      {
        label: "Wake Island",
        value: "UM-79",
        name: "Wake Island",
        isoCode: "UM-79",
        countryCode: "US",
        latitude: "19.27961900",
        longitude: "166.64993480",
      },
      {
        label: "Washington",
        value: "WA",
        name: "Washington",
        isoCode: "WA",
        countryCode: "US",
        latitude: "47.75107410",
        longitude: "-120.74013850",
      },
      {
        label: "West Virginia",
        value: "WV",
        name: "West Virginia",
        isoCode: "WV",
        countryCode: "US",
        latitude: "38.59762620",
        longitude: "-80.45490260",
      },
      {
        label: "Wisconsin",
        value: "WI",
        name: "Wisconsin",
        isoCode: "WI",
        countryCode: "US",
        latitude: "43.78443970",
        longitude: "-88.78786780",
      },
      {
        label: "Wyoming",
        value: "WY",
        name: "Wyoming",
        isoCode: "WY",
        countryCode: "US",
        latitude: "43.07596780",
        longitude: "-107.29028390",
      },
    ];
    setWorkStateList(data);
  };
  const updatedCities = (countrycode, stateId) => {
    let data = cities.filter(
      (city) => city.countryCode == countrycode && city.stateCode == stateId
    );
    setWorkCityList(data);
  };
  useEffect(() => {
    setWorkCity("");
    cityDropDownRef.current.reset();
  }, [work_state]);

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <BackButton
        onBackPress={() =>
          navigate(assets.NavigationConstants.BG_CHECK_COPY.NAME)
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Modal visible={loader} transparent={true}>
          <View style={[pallete.Loader_View]}>
            <ActivityIndicator
              size="large"
              color="white"
              justifyContent={"center"}
              marginTop="100%"
            />
          </View>
        </Modal>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
        >
          <View style={[pallete.mb_50]}>
            <Text style={styles.title}>Background check</Text>

            <Text_Input
              keyboard_type=""
              placeholdertxt={assets.Colors.INPUT_HOLDER_TXT_COLOR}
              event={(text) => setAddress(text)}
              edit={address}
              style={styles.space_vertical}
              subtitle={""}
              title="Street Address"
            />
            <Text
              style={[styles.input_title, { marginTop: 20 }]}
            >{`Driver License Country`}</Text>
            <SelectDropdown
              data={updatedCountries()}
              onSelect={(selectedItem, index) => {
                setWorkCountry(selectedItem?.isoCode);
                updatedStates(selectedItem?.isoCode);
              }}
              defaultValue={work_country}
              defaultButtonText={work_country}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              renderDropdownIcon={() => {
                return (
                  <FontAwesome5
                    name="caret-down"
                    color={assets.Colors.INPUT_TITLE_COLOR}
                    size={15}
                    style={{ marginLeft: dW(8) }}
                  />
                );
              }}
              buttonStyle={styles.dropdownSmall4BtnStyle}
              buttonTextStyle={styles.dropdown4BtnTxtStyle}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown4DropdownStyle}
              rowStyle={styles.dropdown4RowStyle}
              rowTextStyle={styles.dropdown4RowTxtStyle}
            />
            <Text
              style={[styles.input_title, { marginTop: 20 }]}
            >{`Driver License State`}</Text>
            <SelectDropdown
              data={workStateList}
              onSelect={(selectedItem, index) => {
                console.log(
                  "updated.selectedItem=",
                  selectedItem?.countryCode,
                  selectedItem?.isoCode
                );
                setWorkState(selectedItem?.isoCode);
                updatedCities(selectedItem?.countryCode, selectedItem?.isoCode);
              }}
              defaultValue={work_state}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              renderDropdownIcon={() => {
                return (
                  <FontAwesome5
                    name="caret-down"
                    color={assets.Colors.INPUT_TITLE_COLOR}
                    size={15}
                    style={{ marginLeft: dW(8) }}
                  />
                );
              }}
              buttonStyle={styles.dropdownSmall4BtnStyle}
              buttonTextStyle={styles.dropdown4BtnTxtStyle}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown4DropdownStyle}
              rowStyle={styles.dropdown4RowStyle}
              rowTextStyle={styles.dropdown4RowTxtStyle}
            />
            <Text
              style={[styles.input_title, { marginTop: 20 }]}
            >{`Driver License City`}</Text>
            <SelectDropdown
              ref={cityDropDownRef}
              data={workCityList}
              onSelect={(selectedItem, index) => {
                setWorkCity(selectedItem?.label);
              }}
              defaultValue={work_city}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              renderDropdownIcon={() => {
                return (
                  <FontAwesome5
                    name="caret-down"
                    color={assets.Colors.INPUT_TITLE_COLOR}
                    size={15}
                    style={{ marginLeft: dW(8) }}
                  />
                );
              }}
              buttonStyle={styles.dropdownSmall4BtnStyle}
              buttonTextStyle={styles.dropdown4BtnTxtStyle}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown4DropdownStyle}
              rowStyle={styles.dropdown4RowStyle}
              rowTextStyle={styles.dropdown4RowTxtStyle}
            />
          </View>
        </ScrollView>

        <Button
          imgBG={""}
          style={[styles.buttn, pallete.mb_10]}
          txt={assets.Colors.BACKGROUND_THEME_COLOR}
          event={valid_Background}
          bgcolor={assets.Colors.BUTTON_THEME_COLOR}
          image={false}
          img={""}
          title="Next"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Background;
