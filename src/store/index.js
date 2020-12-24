import Vue from 'vue'
import Vuex from 'vuex'
import { login } from "@/api/user";
import { setToken } from "@/utils/token";
import { Message } from 'element-ui'
import axios from "axios";

Vue.use(Vuex)

const state = {
  theme: '',//主题
  menu_bg: '',//菜单背景
  token: '',
  roles: [],
  areaCode: [],
  msgStatus: null,
};
const getters = {
  theme: state => state.theme,
  menu_bg: state => state.menu_bg,
  token: state => state.token,
  msgStatus: state => state.msgStatus,
};
const mutations = {
  SET_THEME(state, payload) {
    state.theme = payload.theme
    state.menu_bg = payload.menu_bg
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_CODES: (state, areaCode) => {
    state.areaCode = areaCode
  },
  SET_STATUS: (state, statusCode) => {
    state.msgStatus = statusCode
  },
};
const actions = {
  getAreaCode({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.VUE_APP_BASE_API}v2/basic/area_code`)
        .then((res) => {
          // console.log(res);
          commit("SET_CODES", res.data.results);
          resolve(res.data);
        }).catch(error => {
          reject(error)
        })
    })
  },
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(res => {
        if (res.status === 0) {
          var token = res.results.token;
          commit("SET_TOKEN", token);
          setToken("user-token", token);
        } else {
          Message({
            type: 'error',
            message: res.msg,
          })
        }
        resolve(res);
      }).catch(error => {
        reject(error)
      })
    })
  }
};

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
})
