// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCa7pIEgwVSFXD8vy6h0CBru_K3RegeGGU",
    authDomain: "mesaayuda-8ba2a.firebaseapp.com",
    projectId: "mesaayuda-8ba2a",
    storageBucket: "mesaayuda-8ba2a.firebasestorage.app",
    messagingSenderId: "641317784563",
    appId: "1:641317784563:web:87baaedad285296b846086",
    measurementId: "G-EBGWMFS47X"
  }
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
