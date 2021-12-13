import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import store from './vuex/store'


const firebaseConfig = {
  apiKey: "AIzaSyCow3_jAynWS9Kd6moR9MlFE3pfEVnTS5E",
  authDomain: "fir-discovery-traineeship.firebaseapp.com",
  projectId: "fir-discovery-traineeship",
  storageBucket: "fir-discovery-traineeship.appspot.com",
  messagingSenderId: "96095963972",
  appId: "1:96095963972:web:14c5c7d289f7744899e511",
  databaseURL: "https://fir-discovery-traineeship-default-rtdb.europe-west1.firebasedatabase.app"

};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();


const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
