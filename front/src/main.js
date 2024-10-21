import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import vue3GoogleLogin from 'vue3-google-login'

import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const pinia = createPinia();
const app = createApp(App)

app.config.globalProperties.$swal = Swal;
app.config.globalProperties.$notyf = new Notyf();

app.use(vue3GoogleLogin, {
  clientId: 'YOUR_GOOGLE_CLIENT_ID'
});

app.use(pinia);
app.use(router)
app.mount('#app')
