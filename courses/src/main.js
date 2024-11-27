import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/main.css'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import {onAuthStateChanged} from 'firebase/auth';
import { Auth } from './utils/firebase'
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
});
let app;
onAuthStateChanged(Auth,()=>{
  if(!app){
    app = createApp(App);

    app.use(createPinia());
    app.use(vuetify);
    app.use(ToastPlugin);
    app.use(router);
    
    app.mount('#app');
  }
});

