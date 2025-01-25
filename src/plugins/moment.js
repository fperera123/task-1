import moment from "moment-timezone";

moment.locale("en");
moment.tz("Asia/Colombo");

export default function install(Vue) {
  Object.defineProperties(Vue.prototype, {
    $moment: {
      get() {
        return moment;
      },
    },
  });
}