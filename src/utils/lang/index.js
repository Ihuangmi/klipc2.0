import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
Vue.use(VueI18n)

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import Cookies from 'js-cookie'

// console.log(navigator.language)
// Create VueI18n instance with options
const i18n = new VueI18n({
    // locale: sessionStorage.getItem('LANG') || "zh-hans", // 语言标识
    locale: Cookies.get('lang') || "zh-hans",
    messages: {
        //中文
        'zh-hans': {
            ...require('./zh-CN'),
            ...zhLocale,
        },
        //英文
        'en': {
            ...require('./en-US'),
            ...enLocale,
        },
        //越南
        'vi': require('./vi-VN'),
        //泰国
        'th': require('./th-TH'),
        //德语
        'de': require('./de-DE'),
        //西班牙
        'es': require('./es-ES'),
        //法语
        'fr': require('./fr-FR'),
        //印度
        'hi': require('./gu-IN Gujarati'),
        //印度尼西亚
        'id': require('./id-ID'),
        //日语
        'ja': require('./ja-JP'),
        //韩语
        'ko': require('./ko-KR'),
        //俄语
        'ru': require('./ru-RU'),
        //瑞典
        'sv': require('./sv-SE'),
    }
})
// Element-ui组件的语言
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
})
export default i18n