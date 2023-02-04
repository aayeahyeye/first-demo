import { get } from '@/utils/http'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    row:{},
    detail:{},
    isFromDetail:false,
    //角色
    role:"",
    // 运单修改
    waybillrevise:{},
    //发车数据单
    departDetail:{},
    isfromDepartdetail:false,
    // 承运商编辑
    carrier:{},
    //承运车辆编辑
    trucks:{},
    //承运司机编辑
    driver:{}
  },
  getters: {
  },
  mutations: {
    saveRow(state,payload){
      state.row=payload
    },
    clearRow(state){
      state.row={}
    },
    setDetail(state,payload){
      state.detail=payload;
    },
    changeIsFromDetail(state,payload){
      state.isFromDetail=payload
    },
    // 设置角色
    setRole(state,payload){
      state.role=payload;
    },
    //储存运单需要修改的那一行数据
    setWaybillrevise(state,payload){
      state.waybillrevise=payload;
    },
    saveWaybillrevise(state,payload){
      state.waybillrevise=payload
    },
    clearWaybill(state){
      state.waybillrevise={}
    },
    //发车数据单，详情页数据
    setDepartdetail(state,payload){
      state.departDetail=payload;
    },
    changeIsFromDepartdetail(state,payload){
      state.isfromDepartdetail=payload
    },
    //承运商编辑
    setCarrier(state,payload){
      state.carrier=payload;
    },
    clearCarrier(state){
      state.carrier={}
    },
    //承运车辆编辑
    setTrucks(state,payload){
      state.trucks=payload;
    },
    cleartrucks(state){
      state.trucks={}
    },
    //承运司机编辑
    setDriver(state,payload){
      state.driver=payload;
    },
    clearDriver(state){
      state.driver={}
    }
  },
  actions: {
    async getRole({commit}){      
      let {role} = await get('/getRole');
      commit("setRole",role)
    }
  },
  modules: {
  }
})
