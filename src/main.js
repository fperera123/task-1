import Vue from "vue";
import { ToastPlugin, ModalPlugin } from "bootstrap-vue";
import VueCompositionAPI from "@vue/composition-api";

import router from "./router";
import store from "./store";
import App from "./App.vue";

import * as VueGoogleMaps from 'vue2-google-maps';

import "./assets/css/main.css";

// Global Components
import "./global-components";

// 3rd party plugins
import "@/libs/portal-vue";
import "@/libs/toastification";

// Moment
import moment from "./plugins/moment.js";

import lodash from "./plugins/lodash.js";

// BSV Plugin Registration
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);

// Composition API
Vue.use(VueCompositionAPI);

// import core styles
require("@core/scss/core.scss");

// import assets styles
require("@/assets/scss/style.scss");

Vue.use(moment);
Vue.use(lodash);

import VueIframe from 'vue-iframes'

Vue.use(VueIframe)


Vue.use(VueGoogleMaps, {
  load: {
    key: '', // key is given by leecom
    libraries: 'places',
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
