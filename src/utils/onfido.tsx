import {
  Onfido,
  OnfidoCaptureType,
  OnfidoCountryCode,
  OnfidoDocumentType,
} from '@onfido/react-native-sdk';
export const onfidoStartSdk = (token,callbackOnfidoSuccess) => {
  console.warn('OnfidoSDK: token:', token)
    Onfido.start({
      sdkToken: token,
      flowSteps: {
        welcome: true,
        captureFace: {
          type: OnfidoCaptureType.PHOTO,
        },
        captureDocument: {
          docType: OnfidoDocumentType.DRIVING_LICENCE,
          countryCode: OnfidoCountryCode.USA,
        },
      },
    })
      .then(res => {
          console.warn('OnfidoSDK: Success:', JSON.stringify(res))
          callbackOnfidoSuccess(res)
        }
      )
      .catch(err => console.warn('OnfidoSDK: Error:', err.code, err.message));
  
};
