// 动画加载逻辑
const { getRepo,getRepoCode } = require('./http')
const inquirer = require('inquirer')
const util=require('util')
const download=require('download-git-repo')
const path=require('path')

module.exports = class Genetator {
    constructor(name, outputPath) {
        // 目标名称
        this.name = name
        // 目标路径
        this.outputPath = outputPath
    }
    // 创建逻辑

    async pullRepo() {
        const repoList = await getRepo()
        if (!repoList) return
        const repos = repoList.map(item => item.name)
        console.log('repos',repos);
        
        const {repo}=await inquirer.prompt([
            {
                name: 'repo',
                type: 'list',
                choices: repos,
                message: '请选择要拉取的文件模版'
            }
        ])
        console.log('repo',repo);
        
       return repo

    }
    
     async pullRepoCode(repo) {
        const versions = await getRepoCode(repo)
        if (!versions) return
        const versionsList = versions.map(item => item.name)
        const {version}=await inquirer.prompt([
            {
                name: 'version',
                type: 'list',
                choices: versionsList,
                message: '请选择要拉取的文件模版'
            }
        ])
       return version

    }

    
    async download(repo,version){
        console.log('repo---',repo);
        console.log('version',version);
        
        
        const reqUrl=`zhurong-cli/${repo}${version?'#'+version:''}`
        // const reqUrl=`vue/VUE${version?'#'+version:''}`
     
        download(reqUrl, this.outputPath, err => {
            if (err)  throw err
          })
    }
    async create() {
           const repo =await this.pullRepo()
            console.log('你选择了repo',repo);
           const version= await this.pullRepoCode(repo)
           console.log(`你选择了${version}`);
          const res= await this.download(repo,version)
          if(res){
              console.log('文件拉取成功');
              
          }
 
        
    }

}