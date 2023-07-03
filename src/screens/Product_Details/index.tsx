import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  Modal,
  ActivityIndicator,
  Share,
} from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import assets from "../../assets";
import { dW } from "../../utils/dynamicHeightWidth";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Rating, AirbnbRating } from "react-native-ratings";
import Button from "../../common_components/Button";
import { Combo_pannel } from "./component/combo_pannel";
import {
  PRODUCT_DETAILS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  MARK_AS_FAV,
} from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import HTMLView from "react-native-htmlview";
import { showToastMessage, GetData } from "../../utils/utilities";
import { LOGIN_KEY } from "../../Storage/ApplicationStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  doRefreshAction,
  productDetailRefreshAction,
} from "../../redux/actions/RefeshCallbackActions";
import NoInternetView from "../../common_components/NoInternetView";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import GetLocation from "react-native-get-location";
import Geocoder from "react-native-geocoding";
const Product_Detail = ({ route }) => {
  console.log(route);

  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const image_URL =
    "https://images-eu.ssl-images-amazon.com/images/I/315q4CFDxqL._AC_SX184_.jpg";
  const image2 =
    "https://m.media-amazon.com/images/I/71YTwU1IexL._AC_UL320_.jpg";
  const mobile =
    "https://images-eu.ssl-images-amazon.com/images/I/41BaLQSvq2L._AC_SR400,600_.jpg";
  const cloth =
    "https://m.media-amazon.com/images/I/717Bou9m+YS._AC_UL320_.jpg";
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [details, setDetails] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [rev_count, setRevCount] = useState("");
  const [inStock, setInstock] = useState("");
  const [cartCount, setCartCount] = useState(null);
  const [primaryImage, setPrimaryImage] = useState("");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [internet, setInternet] = useState("");
  const [store_sku, setStoreSKU] = useState("");
  const [reviews, setReviews] = useState([]);
  const [Spcs_key, setSpacKeys] = useState([]);
  const [Spcs_value, setSpacValues] = useState([]);
  const [isCartUpdated, setCartUpdated] = useState(false);
  const [favourite, setFavourite] = useState("favourite");
  const [store_name, setStore_name] = useState("");
  const [storeList, setStoreList] = useState([]);
  const [curr_location, setCurrLocation] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const dispatch = useDispatch();
  const doRefreshStoreData = useSelector(
    (store) => store.RefreshCallbackReducer
  );
  useEffect(() => {
    userCurrent_location();
  }, [curr_location]);

  const userCurrent_location = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        getPlacedetails(location.latitude, location.longitude);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };
  const getPlacedetails = (lat, lng) => {
    Geocoder.from(lat, lng)
      .then((json) => {
        var addressComponent = json.results[0].address_components;
        for (var i = 0; i < addressComponent.length; i++) {
          if (
            addressComponent[i].types.findIndex((item) => item === "route") > -1
          ) {
          } else if (
            addressComponent[i].types.findIndex(
              (item) => item === "postal_code"
            ) > -1
          ) {
          } else if (
            addressComponent[i].types.findIndex(
              (item) => item === "administrative_area_level_1"
            ) > -1
          ) {
          } else if (
            addressComponent[i].types.findIndex(
              (item) => item === "administrative_area_level_2"
            ) > -1
          ) {
            setLocation(addressComponent[i]?.long_name);
          }
        }
      })

      .catch((error) => console.log("error==", error));
  };
  const product_detail_payload = {
    id: route?.params?.prod_id,
    store: route?.params?.store,
  };

  const fav_product_payload = {
    product_id: route?.params?.prod_id,
    store: route?.params?.store,
  };

  const add_to_cart_payload = {
    product_id: route?.params?.prod_id,
    qty: count,
    store: route?.params?.store,
  };

  const {
    data: f_data,
    loading: f_loading,
    error: f_error,
    fetchData: f_fetchData,
    responseCode: f_responseCode,
  } = useRest({
    URL: MARK_AS_FAV,
    PAYLOAD: fav_product_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: PRODUCT_DETAILS,
    PAYLOAD: product_detail_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const {
    data: c_data,
    loading: c_loading,
    error: c_error,
    fetchData: c_fetchData,
    responseCode: c_responseCode,
  } = useRest({
    URL: ADD_TO_CART,
    PAYLOAD: add_to_cart_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (doRefreshStoreData.product_detail_refresh) {
      fetchData(0);
      dispatch(productDetailRefreshAction(false));
    }
  }, [doRefreshStoreData]);

  useEffect(() => {
    if (f_data) {
      setFavourite(f_data?.data?.status);
      dispatch(doRefreshAction(true));
      setTimeout(() => {
        showToastMessage(f_data?.message);
      }, 100);
    }
  }, [f_data, f_error, f_responseCode]);
  useEffect(() => {
    fetchData(0);
  }, []);

  useEffect(() => {
    if (data) {
      const detail = data?.data;

      setDetails(detail);
      setLocation(detail?.location);
      setCartCount(detail?.cart.cart_item_count);
      setProductName(detail?.product_name);
      setRating(detail?.rating);
      setRevCount(detail?.total_reviews_count);
      setImages(detail?.images);
      setPrice(detail?.price);
      setCount(details?.cart_count);
      setInstock(detail?.in_stock);
      setDescription(detail?.description);
      setModel(detail?.model);
      setInternet(detail?.internet);
      setStoreSKU(detail?.store_sku);
      setReviews(detail?.reviews);
      setFavourite(detail?.favourite);
      //init_Specifications();
      global.branchIo.logEvent("View Product Details", {
        customData: {
          anonymousid: detail?.id,
          "Product Name": detail?.product_name,
          "Product Price": detail?.price,
          screenURL:
            "https://projects.invisionapp.com/d/main?origin=v7#/console/21467222/460336499/preview?scrollOffset=0#project_console",
        },
      });
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    if (c_data) {
      fetchData(0);
      dispatch(doRefreshAction(true));
      setCount(c_data?.data?.item_count);
      setTimeout(() => {
        showToastMessage(c_data?.message);
        setCartUpdated(false);
      }, 100);
    }
  }, [c_data, c_error, c_responseCode]);

  useEffect(() => {
    if (count !== "0" && isCartUpdated) {
      c_fetchData(0);
    }
  }, [count]);

  useFocusEffect(
    React.useCallback(() => {
      const focus = getData();
      return () => focus;
    }, [])
  );

  const getData = async () => {
    const login = await GetData(LOGIN_KEY);
    console.log("USER_DETAILS==", login);
    if (login) {
      const user_store = JSON.parse(login);
      setStore_name(user_store?.store_name);
    }
    setStoreList(global.storeList);
  };

  const imagesTypes = [
    { img: image2 },
    { img: cloth },
    { img: mobile },
    { img: image2 },
    { img: image_URL },
    { img: cloth },
    { img: image2 },
  ];

  const comboItems = [
    {
      img: image_URL,
      title: "Red Bull",
      type: "Energy Drink",
      qty: "8.4lt.oz.(4-pack)",
      price: "$28.99",
    },
    {
      img: image2,
      title: "Red Bull",
      type: "Energy Drink",
      qty: "8.4lt.oz.(4-pack)",
      price: "$28.99",
    },
    {
      img: mobile,
      title: "Red Bull",
      type: "Energy Drink",
      qty: "8.4lt.oz.(4-pack)",
      price: "$28.99",
    },
  ];

  const additem = () => {
    setCartUpdated(true);
    setCount(parseInt(count) + 1 + "");
  };
  const goToDetailTabs = (index) => {
    navigate(assets.NavigationConstants.ABOUT_PRODUCT.NAME, {
      prod_name: productName,
      prod_rating: rating,
      prod_img: images && images[0],
      prod_model: model,
      prod_desc: description,
      prod_sku: store_sku ? store_sku : null,
      prod_internet: internet,
      prod_rev: rev_count,
      prod_review: reviews,
      index: index,
      prod_spec_key: Spcs_key,
      prod_spec_value: Spcs_value,
      extra: data?.data?.extra,
    });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: data?.data.product_name + " " + data?.data.product_url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result?.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Modal
        visible={
          loading === LOADING_TYPES.LOADING ||
          loading === LOADING_TYPES.FETCHING_MORE ||
          loading === LOADING_TYPES.REFRESHING ||
          c_loading === LOADING_TYPES.LOADING ||
          c_loading === LOADING_TYPES.FETCHING_MORE ||
          f_loading === LOADING_TYPES.LOADING ||
          f_loading === LOADING_TYPES.FETCHING_MORE
        }
        transparent={true}
      >
        <View style={[pallete.loader_View]}>
          <ActivityIndicator
            size={"large"}
            color={assets.Colors.WHITE}
            style={[pallete.loader]}
          />
        </View>
      </Modal>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Pressable onPress={goBack}>
            <FontAwesome
              name={"angle-left"}
              color={assets.Colors.BLACK_COLOR}
              size={dW(40)}
            />
          </Pressable>
          <Pressable
            onPress={() => setCurrLocation(!curr_location)}
            style={[styles.headerTxt_container, { marginLeft: dW(10) }]}
          >
            <Icon
              name="navigation"
              color={assets.Colors.INPUT_TITLE_COLOR}
              size={18}
            />
            <Text style={[styles.headerTxt, { marginLeft: dW(5) }]}>
              {location}
            </Text>
          </Pressable>
          {/* <View style={[styles.headerTxt_container, { marginLeft: dW(5) }]}>
            <Text style={[styles.headerTxt, { fontSize: dW(12) }]}>
              {store_name}
            </Text>
            <FontAwesome5
              name="caret-down"
              color={assets.Colors.INPUT_TITLE_COLOR}
              size={15}
              style={{ marginLeft: dW(8) }}
            />
          </View> */}
          <SelectDropdown
            data={global.storeList}
            onSelect={(selectedItem, index) => {
              setStore_name(selectedItem.name);
            }}
            defaultButtonText={store_name}
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
            buttonStyle={styles.headerTxt_container_drop}
            buttonTextStyle={styles.headerTxt}
            // dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown}
            // rowStyle={styles.dropdown4RowStyle}
            // rowTextStyle={styles.dropdown4RowTxtStyle}
          />
          {/* add dropdown */}
        </View>
        <Pressable
          onPress={() =>
            navigate(assets.NavigationConstants.MY_CART.NAME, {
              storeID: route?.params?.store,
            })
          }
          style={styles.cart_container}
        >
          <FontAwesome5
            name="shopping-cart"
            color={assets.Colors.BACKGROUND_THEME_COLOR}
            size={16}
            style={{ alignSelf: "center" }}
          />
          {cartCount !== 0 && <Text style={styles.cartTxt}>{cartCount}</Text>}
        </Pressable>
      </View>
      <View style={{ paddingHorizontal: dW(20) }}>
        <View style={styles.input_view}>
          <Icon
            name="search"
            color={assets.Colors.PRODUCT_DETAILS_INPUT_TXT_CLR}
            size={20}
            style={{ marginLeft: dW(5) }}
          />
          <TextInput
            placeholder="Start searching for items"
            editable={false}
            onPressIn={() =>
              navigate(assets.NavigationConstants.PRODUCT_SEARCH.NAME)
            }
            placeholderTextColor={assets.Colors.Product_INPUT_HOLDER_TXT}
            style={styles.placeHolder}
          />
          {/* <Ionicons
            name="ios-mic-outline"
            color={assets.Colors.PRODUCT_DETAILS_INPUT_TXT_CLR}
            size={25}
          /> */}
        </View>
      </View>
      {error ? (
        <NoInternetView onRefresh={fetchData} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <ScrollView horizontal={true} style={styles.horizontalScroll}>
            <View style={styles.productFlow}>
              <Text
                style={[
                  styles.txt,
                  { color: assets.Colors.PRODUCT_FLOW_TXT, paddingLeft: dW(5) },
                ]}
              >
                {details?.category_name}
              </Text>
              <Icon
                name="chevron-right"
                color={assets.Colors.ACCOUNT_TXT_COLOR}
                size={dW(18)}
                style={{ paddingHorizontal: dW(8) }}
              />
              <Text
                numberOfLines={1}
                style={[
                  styles.txt,
                  { color: assets.Colors.PRODUCT_FLOW_TXT, maxWidth: 150 },
                ]}
              >
                {details?.product_name}
              </Text>
              <Icon
                name="chevron-right"
                color={assets.Colors.ACCOUNT_TXT_COLOR}
                size={dW(18)}
                style={{ paddingHorizontal: dW(8) }}
              />
              <Text
                style={[styles.txt, { color: assets.Colors.ACCOUNT_TXT_COLOR }]}
              >
                Product Details
              </Text>
            </View>
          </ScrollView>
          <View style={styles.topMargin}>
            <View style={styles.headerContainer}>
              <View style={{ width: "70%" }}>
                <Text style={styles.brand_title}>
                  {productName}{" "}
                  {
                    <Text
                      numberofLines={2}
                      style={[
                        styles.brand_title,
                        { fontFamily: assets.fonts.ROBOTO_REGULAR },
                      ]}
                    ></Text>
                  }
                </Text>
              </View>
              <Pressable onPress={onShare}>
                <Image source={assets.Images.SHARE_ICON} style={styles.share} />
              </Pressable>
              <Pressable onPress={() => f_fetchData(0)}>
                <Icon
                  name="heart"
                  color={
                    favourite === "1"
                      ? assets.Colors.THEME_COLOR_PRIMARY
                      : assets.Colors.ACCOUNT_TXT_COLOR
                  }
                  size={dW(25)}
                />
              </Pressable>
            </View>
            <View style={styles.ratingView}>
              <Rating
                readonly={true}
                type="custom"
                ratingColor={assets.Colors.BUTTON_THEME_COLOR}
                ratingBackgroundColor={assets.Colors.BACKGROUND_THEME_COLOR}
                ratingCount={5}
                startingValue={rating}
                imageSize={18}
                // onFinishRating={ratingCompleted}
                style={{}}
              />
              <Text style={styles.ratingTxt}>{rev_count}</Text>
            </View>
            <View style={styles.productImage_view}>
              <Image
                source={
                  primaryImage === ""
                    ? { uri: images[0] }
                    : { uri: primaryImage }
                }
                style={styles.image_style}
              />
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.horizontal_image}>
                {images.map((item) => {
                  return (
                    <Pressable onPress={() => setPrimaryImage(item)}>
                      <Image
                        source={{ uri: item }}
                        style={styles.images_style}
                      />
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
            <View style={[styles.headerContainer, styles.topMargin]}>
              <Text style={styles.product_price}>{price}</Text>
              {inStock === "1" ? (
                <View style={styles.headerLeft}>
                  <FontAwesome5
                    name="check"
                    color={assets.Colors.BUTTON_THEME_COLOR}
                    size={15}
                    style={{ marginRight: dW(8) }}
                  />
                  <Text style={styles.in_Stock}>In Stock</Text>
                  <View></View>
                </View>
              ) : (
                <Text style={styles.in_Stock}>Not in Stock</Text>
              )}
            </View>
            <Button
              imgBG={""}
              style={[
                styles.topMargin,
                styles.bttn,
                inStock !== "1" && { opacity: 0.3 },
              ]}
              img={""}
              event={() => {
                inStock === "1"
                  ? details?.cart_count === "0"
                    ? additem()
                    : navigate(assets.NavigationConstants.MY_CART.NAME)
                  : showToastMessage("Not in stock");
              }}
              title={details?.cart_count === "0" ? "Add to Cart" : "Go to Cart"}
              bgcolor={assets.Colors.ACTIVE_STORES_BG_COLOR}
              image={false}
            />
          </View>
          <Pressable
            style={[styles.headerContainer, styles.topMargin]}
            onPress={() => goToDetailTabs(0)}
          >
            <Text style={styles.product_detail}>Product Details</Text>
            <Icon
              name="chevron-right"
              color={assets.Colors.BUTTON_THEME_COLOR}
              size={30}
            />
          </Pressable>
          <View style={styles.paddinghorizontal}>
            <View style={styles.productDetails_container}>
              <HTMLView value={description} stylesheet={styles} />

              <View
                style={[styles.model_sku_View, { flexDirection: "column" }]}
              >
                {model != "" && model != null && (
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text style={styles.bold_txt}>{"Model"}</Text>
                    <Text style={styles.normal_txt}>{model}</Text>
                  </View>
                )}
                {internet != "" && internet != null && (
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text style={styles.bold_txt}>{"Internet/Catalog"}</Text>
                    <Text style={styles.normal_txt}>{internet}</Text>
                  </View>
                )}
                {store_sku != "" && store_sku != null && (
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text style={styles.bold_txt}>{"Store SKU"}</Text>
                    <Text style={styles.normal_txt}>{store_sku}</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.productDetails_container}>
              <Text style={styles.product_detail}>
                Frequently Bought Together
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.combo_image}>
                  {imagesTypes.map((type) => {
                    return (
                      <View style={[styles.detailsBottom_rowContent]}>
                        <Image
                          source={{ uri: type.img }}
                          style={styles.images_style}
                        />
                        <Pressable onPress={() => alert("added")}>
                          <MaterialCommunityIcons
                            name="plus"
                            color={assets.Colors.ACCOUNT_TXT_COLOR}
                            size={22}
                          />
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
              <View style={styles.details_content}>
                <View style={styles.headerLeft}>
                  <Text
                    style={[
                      styles.product_details,
                      { fontFamily: assets.fonts.ROBOTO_REGULAR },
                    ]}
                  >
                    Total Price:
                  </Text>
                  <Text
                    style={[
                      styles.product_details,
                      { fontFamily: assets.fonts.ROBOTO_BOLD },
                    ]}
                  >
                    {" "}
                    $29.72{" "}
                  </Text>
                </View>
                <View style={styles.headerLeft}>
                  <Text
                    style={[
                      styles.product_details,
                      { color: assets.Colors.BUTTON_THEME_COLOR },
                    ]}
                  >
                    Choose Products
                  </Text>
                  <Icon
                    name="chevron-right"
                    color={assets.Colors.BUTTON_THEME_COLOR}
                    size={25}
                  />
                </View>
              </View>
            </View>

            {
              <View style={styles.productDetails_container}>
                <Text style={styles.product_detail}>Specifications</Text>
                <View style={styles.topMargin}>
                  {data?.data?.extra != null &&
                    data?.data?.extra?.slice(0, 6).map((item, index) => (
                      <View style={styles.detailsBottom_rowContent}>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.product_details,
                            {
                              fontFamily: assets.fonts.ROBOTO_MEDIUM,
                              fontSize: dW(13),
                            },
                          ]}
                        >
                          {item?.name} :{" "}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.product_details,
                            {
                              fontFamily: assets.fonts.ROBOTO_REGULAR,
                              fontSize: dW(13),
                            },
                          ]}
                        >
                          {item?.value}
                        </Text>
                      </View>
                    ))}
                  <Pressable
                    onPress={() => goToDetailTabs(1)}
                    style={styles.seeAll_spec}
                  >
                    <Text
                      style={[
                        styles.product_details,
                        { color: assets.Colors.BUTTON_THEME_COLOR },
                      ]}
                    >
                      See All Specifications
                    </Text>
                    <Icon
                      name="chevron-right"
                      color={assets.Colors.BUTTON_THEME_COLOR}
                      size={25}
                    />
                  </Pressable>
                </View>
              </View>
            }
          </View>

          <Combo_pannel data={comboItems} title="Energize - need a boost ?" />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default Product_Detail;
