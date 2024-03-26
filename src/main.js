import { createApp } from 'vue'
import App from './App.vue'
import router from '../router';
import axios from 'axios'
import { Store } from './stores';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
axios.defaults.baseURL = "http://localhost:8000"

createApp(App).use(router).use(Store).mount('#app')
