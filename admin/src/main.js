import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import axios from "axios";
// 导入全局样式表
import "./assets/css/global.css";
import "./assets/font/iconfont.css";
// Chrome 增加了新的事件捕获机制Passive Event Listeners
import "default-passive-events";
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
// 配置请求的根路径
axios.defaults.baseURL = "http://localhost:2021/";
Vue.prototype.devBaseUrl = "http://localhost:2021/";

// 请求拦截器(在请求头里面加了Authorization)
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    if (sessionStorage.token)
      //在请求头里面加token 服务端就能得到token
      config.headers.Authorization = sessionStorage.token;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);



Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
