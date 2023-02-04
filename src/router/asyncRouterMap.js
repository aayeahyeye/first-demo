//异步路由，权限管理，根据身份信息动态添加的，登录成功之后，后端返回角色名
export default[
    //考勤页面：老板，行政才能看
    {
        path:"/attendance",
        name:"Attendance",
        meta:{auth:["boss","administration"],meta:['首页','行政管理']},
        component:()=>import("@/views/AuthView/AuthAttendance")

    },
    //财务页面
    {
        path:"/salary",
        name:"Salary",
        meta:{auth:["boss","finance"],meta:['首页','财务管理']},
        component:()=>import("@/views/AuthView/AuthSalary")
    },
    //404页面,放在普通路由会影响，想要在访问不存在路由的页面时，会首先跳转到404页面，而不是到自动添加的路由去
    {
        path:"*",
        name:"NotFind",
        component:()=>import("@/views/NotFind.vue"),
        meta:{auth:["boss","administration","finance","user"]}
      }

]
    