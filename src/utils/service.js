//自定义axios
import axios from 'axios';
import { getToken } from './auth';
import { Message } from 'element-ui';

const service=axios.create({
    // 请求超时限制
    timeout:5000,
    baseURL:"http://localhost:8081"
})

//请求拦截器，每次请求都要带上token，因此token在登陆后要储存起来
service.interceptors.request.use((config)=>{
    if(getToken()){
        config.headers.token=getToken()
    }
    return config
},()=>{
    Message({
            type:"error",
            message:"请求错误3"
    })
    //把错误抛出去，主动创建一个错误对象，在封装的axios里面通过catch捕获到
    return Promise.reject( new Error( "请求错误3"))
})

//响应拦截器,接收两个函数，第一个是请求通了，第二个是请求没通
service.interceptors.response.use((res)=>{
    const result=res.data;
    if(result.success){
        return result
    }else{
        Message({
            type:"error",
            message:result.message||"响应错误"
        })
        //把错误抛出去，主动创建一个错误对象，在封装的axios里面通过catch捕获到
        return Promise.reject( new Error(result.message || "响应错误"))
    }
},()=>{
    Message({
        type:"error",
        message:"响应错误"
    })
    //把错误抛出去，主动创建一个错误对象，在封装的axios里面通过catch捕获到
    return Promise.reject( new Error( "响应错误"))
})
export default service