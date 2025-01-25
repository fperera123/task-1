import _ from "lodash";

export default function install(Vue) {
  Object.defineProperties(Vue.prototype, {
    $lodash: {
      get() {
        return _;
      },
    },
  });
}
