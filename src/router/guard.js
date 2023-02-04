//导航守卫
import { getToken } from "@/utils/auth";
import router from "./index";//引入路由实例
import asyncRouterMap from './asyncRouterMap'
import store from '@/store'

// 进入页面没登陆必须先进登录页
// 全局前置导航守卫
router.beforeEach(async(to,from,next)=>{
   
    //1.发请求到后端，验证有没有token（安全系数更高）
    // 2.直接验证本地存储有没有token
   const hastoken=getToken();
    if(hastoken){
         //在有token的前提下，在全局前置守卫，即每次刷新页面时，触发vuex异步操作，向后端发送token，获取身份角色，存到vuex
        await store.dispatch("getRole")
        if(to.path=='/login'){
            next('/')
        }else{
            if(to.name==null){
                //在异步路由里面过滤出有该登录角色的异步路由数组,动态添加的路由，刷新就丢失
                let aRouter = asyncRouterMap.filter(item=>item.meta.auth.includes(store.state.role))
                for(let i = 0;i < aRouter.length;i++){
                    router.addRoute('Layout',aRouter[i])//添加该角色有权限访问的路由
                }
                //跳转,next()接收对象做参数
                //因为跳转有可能发生在路由添加完成之前，
                // 所以要反复执行（参数to找不到对象就会反复执行），把to拆开，next到to对象，
                //一直跳到路由添加完成，to有名字了，就执行else放行，不添加replace，即next(to)即可
                //...to是为了加replace:true,没有历史记录，不能点返回键，防止用户撤销
            next({...to,replace:true})
            }else{
                next()
            }
            
        }
    }else{
        if(to.path == '/login'){
            next()
        }else{
            next('/login')
        }
    }
})

//在main.js引入文件