import Vue from 'vue'
import extend from 'extend';
import App from './App.vue';
import store from './store';
import router from './router';

import BootstrapVue from 'bootstrap-vue';
import Multiselect from 'vue-multiselect';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';


Vue.use(BootstrapVue);

Vue.component('multiselect', Multiselect);

// Vue.config.productionTip = false;
// Vue.config.devtools = true;  // Включение Vue Devtools
// Vue.config.silent = false;  // Включение вывода всех ошибок в консоль

// Обработчик предупреждений Vue
// Vue.config.warnHandler = function (msg, vm, trace) {
//   console.error(`[Vue warn]: ${msg}\nTrace: ${trace}`);
// };

// Обработчик ошибок Vue
// Vue.config.errorHandler = function (err, vm, info) {
//   console.error(`[Vue error]: ${err.toString()}\nInfo: ${info}`);
// };

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
