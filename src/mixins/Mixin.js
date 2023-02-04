import {post} from '@/utils/http'
export default function(configs){
    return{
        data(){
            return {
                tableData:[],
                total:0,
                loading:false
            }
        },
        mounted(){
            this.getData();
          },
        methods:{
            async getData(){
                this.loading=true;
                const {data} = await post(configs.url,configs.params);
                this.tableData=data.list;
                this.total=data.total;
                this.loading=false;
            },
            async handleSizeChange(val){
                this.params.pageSize=val;
              this.getData()
            },
            async handleCurrentChange(val){
                this.params.page=val;
              this.getData()
            },
            a(){
                console.log(1);
            }
        }
    }
}