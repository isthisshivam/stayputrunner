import assets from "../../assets";
export const IosLocationPermission = [
  "ios.permission.LOCATION_ALWAYS",
  "ios.permission.LOCATION_WHEN_IN_USE",
];
export const AndroidLocationPermission = [
  "android.permission.ACCESS_BACKGROUND_LOCATION",
  "android.permission.ACCESS_COARSE_LOCATION",
  "android.permission.ACCESS_FINE_LOCATION",
];
export const GALLERY = "GALLERY";
export const CAMERA = "CAMERA";
export const cars = [
  { id: "9", icon: assets.Images.BIKE_ICON, type: "Motorcycle/scooter" },
  { id: "1,2,3", icon: assets.Images.CAR_ICON, type: "Car" },
  { id: "4,5", icon: assets.Images.TRUCK_ICON, type: "Crossover" },
  { id: "8", icon: assets.Images.SUV_ICON, type: "SUV" },
  { id: "6", icon: assets.Images.TRUCK_ICON, type: "Truck" },
  { id: "7", icon: assets.Images.TRUCK_CONTAINER, type: "Cargo van" },
];
export const truckSubArray = [
  {
    name: "Short bed",
    id: 1,
  },
  {
    name: "Long bed",
    id: 2,
  },
];
export const data = [
  {
    id: 1,
    day: "Today",
    date: "sep 2",
  },
  {
    id: 2,
    day: "Fri",
    date: "sep 3",
  },
  {
    id: 3,
    day: "Sat",
    date: "sep 4",
  },
  {
    id: 4,
    day: "Sun",
    date: "sep 5",
  },
  {
    id: 5,
    day: "Mon",
    date: "sep 6",
  },
  {
    id: 6,
    day: "Tue",
    date: "sep 7",
  },
];

export const columnData = [
  {
    id: 1,
    time: "8am - 10am",
    price: "$20",
  },
  {
    id: 2,
    time: "8am - 10am",
    price: "$25",
  },
  {
    id: 3,
    time: "10am - noon",
    price: "$29",
  },
  {
    id: 4,
    time: "noon - 2pm",
    price: "$40",
  },
  {
    id: 5,
    time: "2pm - 4pm",
    price: "$40",
  },
  {
    id: 6,
    time: "4pm - 6pm",
    price: "$40",
  },
];
export const sizes = [
  { id: "1", option: "Medium" },
  { id: "2", option: "Large" },
  { id: "3", option: "X - Large" },
  { id: "3", option: "2X - Large" },
];

export const METHOD_DATA = [
  {
    supportedMethods: ["apple-pay"],
    data: {
      merchantIdentifier: "merchant.com.stayputrunner.dev",
      supportedNetworks: ["visa", "mastercard", "amex"],
      countryCode: "US",
      currencyCode: "USD",
    },
  },
];
export const DETAILS = {
  id: "basic-example",
  displayItems: [
    {
      label: "Movie Ticket",
      amount: { currency: "USD", value: "15.00" },
    },
    {
      label: "Grocery",
      amount: { currency: "USD", value: "5.00" },
    },
  ],
  shippingOptions: [
    {
      id: "economy",
      label: "Economy Shipping",
      amount: { currency: "USD", value: "0.00" },
      detail: "Arrives in 3-5 days", // `detail` is specific to React Native Payments
    },
  ],
  total: {
    label: "Enappd Store",
    amount: { currency: "USD", value: "20.00" },
  },
};
export const OPTIONS = {
  requestPayerName: true,
  requestPayerPhone: true,
  requestPayerEmail: true,
  requestShipping: true,
};
