import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import "@/theme/index.scss";  // 自定义全局样式
import 'element-plus/dist/index.css'
const app = createApp(App);
import { useRoute } from 'vue-router';
app.config.globalProperties.$router = useRoute();
app.use(router).use(ElementPlus).mount('#app')
