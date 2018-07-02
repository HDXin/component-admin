import $config from '@/api/config'
import Axios from "axios";
import { Loading } from 'element-ui';

var API = Axios.create({
    baseURL: $config.apiUrlPrefix[$config.env]
})

let instance = '';
API.interceptors.request.use(function (config) {
    // Do something before request is sent
    instance =  Loading.service({ fullscreen: true,text:'请稍候...'});
    return config;
}, function (error) {
    console.log(error)
    // Do something with request error
    return Promise.reject(error);
});
API.interceptors.response.use(function (response) {
    instance.close()
    if(response.data.code == 401){
        window.$AppMain.$message({type:'error',message:'登录超时,请重新登录'})
        window.$AppMain.$router.push('/login')
        return Promise.reject(response.data.code);
    }
    return response;
}, function (error) {
    instance.close()
    return Promise.reject(error);
});


function getArticleListApi (data) { //文章列表
    return API.get('/article', {
        params: data
    }).then(res => res.data)
}
function articeleCreate (data) { //文章新增
    return API.post('/article', data).then(res => res.data)
}
function articeleEditApi (id,data) { //文章编辑
    return API.put(`/article/${id}`,data).then(res => res.data)
}
function getArticeleDetailApi (id) { //文章详情
    return API.get(`/article/${id}`).then(res => res.data)
}

function articleDeleteApi (id) { //文章编辑
    return API.delete(`/article/${id}`).then(res => res.data)
}
export {
    getArticleListApi,
    articeleCreate,
    articeleEditApi,
    getArticeleDetailApi,
    articleDeleteApi
}