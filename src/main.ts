// main.js o main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Importa createPinia desde Pinia
import App from './App.vue';
import router from './router.ts';
import './style.scss';
import 'v-calendar/style.css';
import { setupCalendar } from 'v-calendar';


import { createI18n } from 'vue-i18n';
import lang  from './locales/lang.js';


const i18n = createI18n({
    legacy: false,
    messages: lang,
    fallbackFormat: 'en',
    locale: navigator.language.startsWith('es') ? 'es' : 'en'
});
const app = createApp(App);

const pinia = createPinia();
// Use calendar defaults (optional)
app.use(setupCalendar, {})
app.use(pinia);
app.use(router);
app.use(i18n);
app.mount('#app');
