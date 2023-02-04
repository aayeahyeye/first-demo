//后端数据模拟
import Mock from 'mockjs'

// mock加延时 正常网络请求都有延时
Mock.setup({
    timeout:500
})

// mock模拟接口语法：Mock.mock("地址","请求方式","回调函数"),req请求对象
//登录接口
Mock.mock("http://localhost:8081/login","post",(req)=>{
    
    // 转换成js对象格式
    const {username,password}=JSON.parse(req.body);
    // 判断是否用户名和密码正确
    console.log("后端",{username,password});
    if(username=="admin"&& password== 123456){
        return{
            code: 200,
            success: true,
            message:"登录成功",
            //首次登录后端会返回一个登录令牌
            token:"3arc9h0vhcr0f8iprpnscmfo8s",
            nickname:"aayeah~",
        }
    }else{
        return{
            code:100,
            success:false,
            message:"账号或密码有误"
        }
    }

})

// 左侧导航栏数据
const menuList=[
    {
        name:"首页",
        icon:"el-icon-s-home",
        url:"/index"
    },
    {
        name:"订单管理",
        icon:"el-icon-s-order",
        url:"/oders",
        children:[
            {
                name: "订单列表",
                icon: "el-icon-user",
                url: "/orders/list",
            }
        ]
    },
    {
        name:"运单管理",
        icon:"el-icon-menu",
        url:"/waybill",
        children:[
            {
                name:"运单录入",
                icon:"el-icon-notebook-2",
                url:'/waybill/in'
            },
            {
                name:"运单列表",
                icon:"el-icon-truck",
                url:"/waybill/list"
            }
        ]
    },
    {
        name: "发车管理",
        icon: "el-icon-s-order",
        url: "/depart",
        children: [
            {
                name: "发车数据单",
                icon: "el-icon-tickets",
                url: "/depart/data",
            }
        ]
    },
    {
        name: "承运商管理",
        icon: "el-icon-user",
        url: "/carrier",
        children:[
            {
                name: "承运商列表",
                icon: "el-icon-chat-square",
                url: "/carrier/list",
            },
            {
                name: "车辆列表",
                icon: "el-icon-bank-card",
                url: "/carrier/trucks",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/carrier/drivers",
            },
        ]
    },
    {
        name:"客户管理",
        icon:"el-icon-chat-dot-square",
        url:"/customer",
        children:[
            {
                name:"客户列表",
                icon:"el-icon-chat-dot-square",
                url:"/customer/list", 
            }
        ]
    },
    {
        name:"财务管理",
        icon:"el-icon-user",
        url:"/finacial",
        children:[
            {
                name: "客户对账单",
                icon: "el-icon-chat-square",
                url: "/finacial/customer",
            },
            {
                name: "承运商对账单",
                icon: "el-icon-bank-card",
                url: "/finacial/carrier",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/finacial/driver",
            },
        ]

    },
    {
        name:"个人中心",
        icon:"el-icon-user",
        url:"/personal" 
    }
]
//左侧导航栏接口
Mock.mock("http://localhost:8081/menu","get",()=>{
    // const {role} = JSON.parse(req.body)
    // if(role=='/attendance'){
    //     const menuAtt={
    //         name:'行政管理',
    //         icon:'el-icon-user',
    //         url:'/attendance'
    //     }
    //     const menuData=[...menuList,menuAtt]
    // }
    return {
        code:200,
        success:true,
        message:'菜单请求成功',
        data:menuList,

    }
})
//修改密码请求，每次请求必带token
Mock.mock('http://localhost:8081/changepass','get',()=>{
    return {
        code:200,
        success:true,
        message:'修改密码成功'
    }
    
})
//获取入职日期
Mock.mock('http://localhost:8081/indate','get',()=>{
    return{
        code:200,
        success:true,
        message:'请求成功',
        data:"2022-10-22 09:30:00"
    }
})

//本月数据（卡片）
Mock.mock('http://localhost:8081/monthData','get',()=>{
    return {
        code:200,
        success:true,
        message:'请求成功',
        data:[
            {
                monthin:588,
                compare:'+20.12%'
            },
            {
                monthin:121000000,
                compare:'+1.25%'
            },
            {
                allorder:128700,
                compare:'+11.48%'
            },
            {
                monthin:923380079,
                compare:'-2.06%'
            },
        ]
    }
})

//折线图图表接口
Mock.mock("http://localhost:8081/line","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:{
            "22-01":30,
            "22-02":84,
            "22-03":56,
            "22-04":47,
            "22-05":84,
            "22-06":61,
            "22-07":90,
        }
    }
})

//饼图接口
Mock.mock("http://localhost:8081/pie","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:[{ value: 1048, name: "日用百货" },
        { value: 735, name: "粮油调味" },
        { value: 580, name: "电器数码" },
        { value: 484, name: "母婴用品" },
        { value: 300, name: "美容护肤" },
    ]
    }
})

//操作数据接口模拟
Mock.mock("http://localhost:8081/operate","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:[
            {timestap:"2021/12/10",operation:"审核订单",name:"李石爻",time:"08:55"},
            {timestap:"2021/12/10",operation:"新增订单",name:"余麟域",time:"10:23"},
            {timestap:"2021/12/11",operation:"审核订单",name:"李奥",time:"14:34"},
            {timestap:"2021/12/13",operation:"审核订单",name:"李石爻",time:"10:38"},
        ]
    }
})

//订单管理-订单列表
Mock.mock("http://localhost:8081/orderList","post",(req)=>{
    const {page,pageSize} = JSON.parse(req.body);
    console.log('订单接口',page,pageSize);
    return {
        code: 200,
        success: true,
        message: "成功",
        data:Mock.mock({
            //随机生成pageSize项列表数据,list和数据都是变量加[]
            [`list|${pageSize}`]:[{
                'id|+1':10000,//从10000开始递增
                'status|1':[1,2,3,4],//订单状态(随机选) 1待审核 2已审核 3审核通过 4审核拒绝
                'date':Mock.Random.date(),//随机生成下单时间
                'name|1':["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                'cargo|1': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'unit|1': ["方","吨"],//单位
                "price":Mock.Random.integer(5000,50000),//运费
                "from|1":["移动端","pc端"],
                "pay|1":[1,2],//是否支付 1 已支付 2未支付
            }],
            'total':50
        })
    }
})

//订单管理-搜索接口
Mock.mock("http://localhost:8081/search","get",()=>{
    return{
        code:200,
        success:true,
        message:"搜索数据成功",
    }
})

//订单管理-编辑订单
Mock.mock("http://localhost:8081/adit","post",(req)=>{
    const res = JSON.parse(req.body);
    console.log("编辑订单",res);
    return {
        code:200,
        success:true,
        message:"编辑订单提交成功"
    }
})
//订单管理-新建订单
Mock.mock("http://localhost:8081/construct","post",(req)=>{
    const res = JSON.parse(req.body);
    console.log("新建订单",res);
    return {
        code:200,
        success:true,
        message:"新建订单提交成功"
    }
})

//订单管理-操作
Mock.mock("http://localhost:8081/operate","post",(req)=>{
    const i =req.body;
    console.log(req);
    console.log(i);
    if(i==1){
        return {
        code:200,
        success:true,
        message:"审核操作成功"
        }
    }else if(i==2){
        return {
            code:200,
            success:true,
            message:"修改操作成功"
            }
    }else{
        return{
            code:200,
            success:true,
            message:"作废操作成功"
        }
    }
})
//订单管理-删除
Mock.mock("http://localhost:8081/delete1","post",(req)=>{
    const id =req.body;
    console.log(req);
    console.log(id);
    return {
        code:200,
        success:true,
        message:`删除${id}操作成功`,
    }
    
})

//运单列表-列表数据接口
Mock.mock("http://localhost:8081/waybillList",'post',(req)=>{
    const {page,pageSize} = JSON.parse(req.body);
    console.log("接收到参数",page,pageSize);
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:Mock.mock({
            [`list|${pageSize}`]:[{
                'no|+1':10000,//订单号
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'cargo|1': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                "price":Mock.Random.integer(5000,50000),//运费
                "needRecive|1":[1,2],//需要接货 1需要 2不需要
                'plateNumber|1': ["京A12345","苏C66666","鲁B45678"],//车牌号
                 "driver":Mock.Random.cname(),
                 "tel|1":[18888888888,15577896554,15789654785,13698745269],
                 "percent|1":[37,22,89,65,80,74,56]
   
            }],
            "total": 50
        })
    }
})

//运单-详情页
//详情页接口
Mock.mock("http://localhost:8081/detail",'post',(req)=>{
    const res=req.body;
    console.log(res);
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:Mock.mock({
            list: {
                'no|+1': 10000,//订单号
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'cargo|1': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                "price":Mock.Random.integer(5000,50000),//运费
                "needRecive|1":[1,2],//需要接货 1需要 2不需要
                'plateNumber|1': ["京A12345","苏C66666","鲁B45678"],//车牌号
                 "driver":Mock.Random.cname(),//.cname是mock的方法，随机生成人名
                 "tel|1":[18888888888,15577896554,15789654785,13698745269],
                 "dress|1":["湖南长沙","河南郑州","上海闵行","浙江温州","北京周口","广东佛山","深圳福田区"],
                 "carid|1":[188888888885565765,155778965542333389,157896547852334342],
                 "Operator|1":["李俊","赵梅","刘涵"]
   
            },
            "total": 50
        })  
    }
})
// 运单列表-查询
Mock.mock("http://localhost:8081/searchwaybill","post",(req)=>{
    const {waybillNo,name,date}= JSON.parse(req.body);
    console.log("查询运单",waybillNo,name,date);
    return {
        code:200,
        success:true,
        message:"查询运单提交成功"
    }
})

//运单录入-运单创建
Mock.mock("http://localhost:8081/waybillin","post",(req)=>{
    const ruleForm= JSON.parse(req.body);
    console.log("创建运单",ruleForm);
    return {
        code:200,
        success:true,
        message:"运单创建提交成功"
    }
})

//运单列表-运单修改
Mock.mock("http://localhost:8081/revise","post",(req)=>{
    const ruleForm= JSON.parse(req.body);
    console.log("修改运单",ruleForm);
    return {
        code:200,
        success:true,
        message:"运单修改提交成功"
    }
})

//根据token获取权限名
Mock.mock('http://localhost:8081/getRole',"get",()=>{
    return {
        code:200,
        success:true,
        message:'请求成功',
        role:"finance"

    }
})

//发车数据单
Mock.mock('http://localhost:8081/departData',"post",(req)=>{
    const {page,pageSize} = JSON.parse(req.body);
    console.log(page,pageSize);
    return {
        code:200,
        success:true,
        message:'请求成功',
        data:Mock.mock({
            [`list|${pageSize}`]:[{
                'no|+1':10000,//订单号
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'cargo|1': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                "price":Mock.Random.integer(5000,50000),//运费
                "needRecive|1":[1,2],//需要接货 1需要 2不需要
                'plateNumber|1': ["京A12345","苏C66666","鲁B45678"],//车牌号
                 "driver":Mock.Random.cname(),
                 "tel|1":[18888888888,15577896554,15789654785,13698745269],
                 "percent|1":[37,22,89,65,80,74,56]
   
            }],
            "total": 50
        })
    }
})

//发车数据单查询
Mock.mock("http://localhost:8081/searchDepart","post",(req)=>{
    const {waybillNo,name,startDate,endDate}= JSON.parse(req.body);
    console.log("查询发车数据单",waybillNo,name,startDate,endDate);
    return {
        code:200,
        success:true,
        message:"查询发车数据单提交成功"
    }
})

//承运商列表
Mock.mock('http://localhost:8081/CarrierList',"post",(req)=>{
    const {page,pageSize} = JSON.parse(req.body);
    console.log('承运商',page,pageSize);
    return{
        code:200,
        success:true,
        message:'请求成功',
        data:Mock.mock({
            [`list|${pageSize}`]:[{
                'id|1':[235456,988767,578987,232344,998787],
                'abbreviation|1':['湖南运输','上海运输','广东运输','辽宁运输'],
                'permission|1':['D42328938234','S89343455334','L23244546343'],
                "tel|1":['王冕/18888888888','李勋/15577896554','廖河/15789654785','鲁速/13698745269'],
                'type|1':[1,2],//自有车，非自有车
                'date':Mock.Random.date(),//注册时间
                'name|1':['天津狮桥','广州志宏','华北福瑞达','则一'],//承运商
                'credit|1':[1323,2323,4454,5464],//信誉代码
                'address':Mock.Random.city(true),//注册地址
                'report|1':[1,2],//是，否
                'sco|1':[90,95,80,85],

            }],
            'total':50
        })
    }
})
//承运商管理-删除
Mock.mock("http://localhost:8081/delete2","post",(req)=>{
    const id =req.body;
    console.log(req);
    console.log(id);
    return {
        code:200,
        success:true,
        message:`删除${id}操作成功`,
    }
    
})
// 运单列表-查询
Mock.mock("http://localhost:8081/searchCarrier","post",(req)=>{
    const {waybillNo,name,date}= JSON.parse(req.body);
    console.log("查询运单",waybillNo,name,date);
    return {
        code:200,
        success:true,
        message:"查询承运商提交成功"
    }
})

//承运司机列表
Mock.mock('http://localhost:8081/DriverList',"post",(req)=>{
    const {page,pageSize} = JSON.parse(req.body);
    console.log('承运司机',page,pageSize);
    return{
        code:200,
        success:true,
        message:'请求成功',
        data:Mock.mock({
            [`list|${pageSize}`]:[{
                'id|1':[235456,988767,578987,232344,998787],
                'name':Mock.Random.cname(),
                'permission|1':['D42328938234','S89343455334','L23244546343'],
                "tel|1":[18888888888,15577896554,15789654785,13698745269],
                'type|1':[1,2],//自有车，非自有车
                'plateNumber|1': ["京A12345","苏C66666","鲁B45678"],//车牌号
                "card|1":[188888888885565765,155778965542333389,157896547852334342],
                'address':Mock.Random.city(true),//现居地址
                'report|1':[1,2],//是，否
                'sco|1':[90,95,80,85],

            }],
            'total':50
        })
    }
})
// 承运司机列表-查询
Mock.mock("http://localhost:8081/searchDriver","post",(req)=>{
    const {No,name,date}= JSON.parse(req.body);
    console.log("查询承运司机",No,name,date);
    return {
        code:200,
        success:true,
        message:`查询承运司机${name}提交成功`
    }
})

//车辆列表
Mock.mock('http://localhost:8081/CarList',"post",(req)=>{
    const {page,pageSize} = JSON.parse(req.body);
    console.log('承运司机',page,pageSize);
    return{
        code:200,
        success:true,
        message:'请求成功',
        data:Mock.mock({
            [`list|${pageSize}`]:[{
                'id|1':[235456,988767,578987,232344,998787],
                'plateNumber|1': ["京A12345","苏C66666","鲁B45678"],//车牌号
                "tel|1":[18888888888,15577896554,15789654785,13698745269],
                'name':Mock.Random.cname(),
                'permission|1':['D42328938234','S89343455334','L23244546343'],
                'type|1':[1,2],//自有车，非自有车
                'date':Mock.Random.date(),//注册时间
                'credit|1':[1323,2323,4454,5464],//信誉代码
                'address':Mock.Random.city(true),//司机现居地址
                'quality|1':[1,2],//是，否，是否质检
                'report|1':[1,2],//是，否
                'sco|1':[90,95,80,85],

            }],
            'total':50
        })
    }
})
// 车辆列表-查询
Mock.mock("http://localhost:8081/searchCar","post",(req)=>{
    const {id,plateNumber}= JSON.parse(req.body);
    console.log("查询车辆",id,plateNumber);
    return {
        code:200,
        success:true,
        message:"查询车辆提交成功"
    }
})

//客户管理
Mock.mock('http://localhost:8081/customer',"post",(req)=>{
    const {page,pageSize}=JSON.parse(req.body);
    console.log('客户管理',page,pageSize);
    return {
        code:200,
        success:true,
        message:'请求成功',
        data:Mock.mock({
            [`list|${pageSize}`]:[{
                'id|1':[1212,2334,2323,4534],
                'name':Mock.Random.cname(),
                'company|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'work|1':["日用品","纺织品","生鲜","建材","电器"],
                'balance':Mock.Random.integer(5000,50000),//账户余额
                'status|1':[1,2],
                'transport':Mock.Random.integer(2000,10000),//里程
                'person':Mock.Random.cname(),//联系人
                'tel|1':['18888888888','15577896554','15789654785','13698745269'],//联系方式
                'address':Mock.Random.city(true),
                "card|1":[188888888885565765,155778965542333389,157896547852334342],
            }],
            total:50
        })
    }
})

// 客户列表-查询
Mock.mock("http://localhost:8081/searchCustomer","post",(req)=>{
    const {id,name,tel,work,status,person}= JSON.parse(req.body);
    console.log("查询客户",id,name,tel,work,status,person);
    return {
        code:200,
        success:true,
        message:`查询客户${name}提交成功`
    }
})

//承运商对账单
Mock.mock('http://localhost:8081/FinacialCarrier',"post",(req)=>{
    const {page,pageSize} = JSON.parse(req.body);
    console.log('承运商对账单',page,pageSize);
    return{
        code:200,
        success:true,
        message:'请求成功',
        data:Mock.mock({
            [`list|${pageSize}`]:[{
                'no|1':[232442324334,324343424243,545453534534],
                'date':Mock.Random.date(),//账单时间
                'pay|1':Mock.Random.cname(),//付款对象
                'Billingstatus|1':[1,2],//账单状态，已对账，未对账
                'status|1':[1,2],//已开票，未开票
                'expenditure|1':[20000,40000,90000,50000],//总支出金额
                'abnormal|1':[1,2],//账单异常，是，否
                'createDate':Mock.Random.date(),//创建日期
                'createPerson':Mock.Random.cname(),//创建人


            }],
            total:50
        })
    }
})


//个人中心-个人信息
Mock.mock("http://localhost:8081/message","get",()=>{
    return {
        code:200,
        success:true,
        message:"请求成功",
        data:Mock.mock({
            message:{
                'name':Mock.Random.cname(),
                'job':'行政助理',
                'date':'2020-10-19',
                'direct':'行政总监'
            }
        })
    }
})

//个人中心-考勤
Mock.mock("http://localhost:8081/personalAttendance","get",()=>{
    return {
        code:200,
        success:true,
        message:"请求成功",
        data:Mock.mock({
            days:{
                'num1':22,
                'num2':18,
                'num3':1,
                'num4':3,
            }
        })
    }
})

//财务管理-月度报表
Mock.mock('http://localhost:8081/MonthSalary',"post",(req)=>{
    const {page,pageSize} = JSON.parse(req.body);
    console.log('财务报表',page,pageSize);
    return{
        code:200,
        success:true,
        message:'请求成功',
        data:Mock.mock({
            [`list|${pageSize}`]:[{
                'date':Mock.Random.date(),//账单时间
                'name|1':Mock.Random.cname(),//花费对象
                'department|1':['行政部','财务部','开发部','设计部','后勤部'],//账单状态，已对账，未对账
                'person|1':[300000,100000,200000],
                'pay|1':['零食','设备','团建'],//采购支出
                'in|1':[500000,300000,400000,800000],//收入
                'all|1':[1000000,200000,4000000,7000000],//总收入

            }],
            total:50
        })
    }
})

//财务管理-年度报表
Mock.mock('http://localhost:8081/YearSalary',"get",()=>{
    const pageSize=12;
    return{
        code:200,
        success:true,
        message:'请求成功',
        data:Mock.mock({
            [`list|${pageSize}`]:[{
                'date|+1':1,//月份
                'department|1':['行政部','财务部','开发部','设计部','后勤部'],//账单状态，已对账，未对账
                'person|1':[3000000,1000000,2000000],//人员支出
                'pay|1':[12000,30000,34000],//采购支出
                'in|1':[5000000,3000000,4000000,8000000],//收入
                'all|1':[10000000,2000000,40000000,70000000],//总收入

            }],
        })
    }
})

//行政待办数据接口模拟
Mock.mock("http://localhost:8081/admini","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:[
            {timestap:"2018/4/2",operation:"离职审核",name:"李石爻",time:"08:55"},
            {timestap:"2018/4/2",operation:"补交考勤时长",name:"李丽 ",time:"10:23"},
            {timestap:"2018/4/2",operation:"入职申请",name:"刘苏",time:"14:34"},
            {timestap:"2018/4/2",operation:"入职申请",name:"李娜",time:"10:38"},
            {timestap:"2018/4/2",operation:"入职申请",name:"刘苏",time:"14:34"},
            {timestap:"2018/4/2",operation:"入职申请",name:"李娜",time:"10:38"},
        ]
    }
})
