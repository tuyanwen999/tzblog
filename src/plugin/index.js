import Vue from 'vue'
import "../assets/css/global.css"
import VueElementLoading from "vue-element-loading";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(mavonEditor)
Vue.use(VueLazyload)

export default {
    install(Vue) {
        const service = axios.create({
            timeout: 50000,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            },
        })

        service.interceptors.request.use(config => {
            Nprogress.start()
            config.headers.Authorization = sessionStorage.getItem('token')
            return config
        })
        service.interceptors.response.use(config => {
            Nprogress.done()
            return config
        })
        Vue.config.productionTip = false
        Vue.prototype.$http = service
        Vue.use(Element)
        Vue.component("VueElementLoading", VueElementLoading);
        // Vue 定义自定义指令:防止按钮重复提交
        Vue.directive('preventReClick', {
            inserted(el, binding) {
                el.addEventListener('click', () => {
                    if (!el.disabled) {
                        el.disabled = true
                        setTimeout(() => {
                            el.disabled = false
                        }, binding.value || 1000)
                    }
                })
            }
        })
    }
}