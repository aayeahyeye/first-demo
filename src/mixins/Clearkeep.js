export default{
    methods:{
        // 清除缓存
    clearCache() {
        let vnode = this.$vnode;
        let parentVnode = vnode && vnode.parent;
        if (
          parentVnode &&
          parentVnode.componentInstance &&
          parentVnode.componentInstance.cache
        ) {
          var key =
            vnode.key == null
              ? vnode.componentOptions.Ctor.cid +
                (vnode.componentOptions.tag
                  ? `::${vnode.componentOptions.tag}`
                  : "")
              : vnode.key;
          var cache = parentVnode.componentInstance.cache;
          var keys = parentVnode.componentInstance.keys;
          if (cache[key]) {
            this.$destroy();
            // remove key
            if (keys.length) {
              var index = keys.indexOf(key);
              if (index > -1) {
                keys.splice(index, 1);
              }
            }
            cache[key] = null;
          }
        }
      },
    }
}