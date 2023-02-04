import service from './service';

//一个文件只有一个默认导出
export function post(url,params){
        const config={//axios配置项
            method:"post",
            url:url,
        }
        if(params){
            config.data=params
        }
        return service(config)
    }

export function get(url,params){
    const config={
        method:"get",
        url:url,
    }
    if(params){
        config.data=params
    }
    return service(config)
}
