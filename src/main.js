import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;

// Ref : https://alligator.io/vuejs/vue-google-maps/
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA8B4NiXqE0c_Y6aDfQmOweb_5ufeGp1BY"
  }
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
