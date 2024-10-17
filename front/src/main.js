import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const app = createApp(App)

app.config.globalProperties.$swal = Swal;
app.config.globalProperties.$notyf = new Notyf();

app.use(router)
app.mount('#app')
