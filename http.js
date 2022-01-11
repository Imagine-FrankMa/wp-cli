const axios=require('axios')
// 请求拦截
axios.interceptors.response.use(res=>res.data)

const getRepo=async ()=>{
    return axios.get('https://api.github.com/orgs/zhurong-cli/repos')
}

const getRepoCode=async (repo)=>{
    return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`)

}

module.exports={
    getRepo,
    getRepoCode
}