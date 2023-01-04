import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { clickOutside } from './helpers/directives';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.directive('clickOut', clickOutside);

app.mount('#app');
