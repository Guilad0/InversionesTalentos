import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import vue3GoogleLogin from 'vue3-google-login'
import iziToast from './plugins/iziToast';


// import 'bootstrap-icons/font/bootstrap-icons.css';


import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const pinia = createPinia();
const app = createApp(App)

app.config.globalProperties.$swal = Swal;
app.config.globalProperties.$notyf = new Notyf();
app.config.globalProperties.$izitoast = iziToast;

const GOOGLE_CLIENT_ID= "18305282873-51499fj6ktbfddhu8odib1hhd7tf5iug.apps.googleusercontent.com"
app.use(vue3GoogleLogin, {
  clientId: GOOGLE_CLIENT_ID
});


app.use(pinia);
app.use(router)
app.mount('#app')
