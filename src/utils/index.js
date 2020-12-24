/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d}'
    const date = new Date(time)
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        return value.toString().padStart(2, '0')
    })
    return time_str
}
/**
 * 防抖函数
 * @param {Function} 
 * @param {number} time
 */
let timeout = null //注意：timeout不能放在函数内部
export function debounce(fn, wait) {
    !timeout && fn()//立即执行
    timeout = setTimeout(() => {
        timeout = null//过wait时间后才允许执行
    }, wait)
}


/**
 * 格式化数字金额用逗号隔开保留两位小数函数
 * @param {Function} 
 * @param {number} s
 */

export function dataFormat(s) {
    // n = n > 0 && n <= 20 ? n : 2;
    var n = 2;
    s = parseFloat((s + "").replace(/[^\d/.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}
