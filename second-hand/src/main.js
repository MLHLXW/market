import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from '@/router/index.js'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(ElementUI);
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
