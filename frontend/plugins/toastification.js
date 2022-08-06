
import Vue from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

Vue.use(Toast, {
    transition: 'Vue-Toastification__bounce',
    maxToasts: 10,
    newestOnTop: true,
    hideProgressBar: true,
    timeout: 3000,
    icon: {
        iconClass: 'toast-icon',  // Optional
        iconTag: 'span'               // Optional
    }
});
