const fs=require('fs-extra')
const path=require('path')
const inquirer=require('inquirer');
const chalk = require('chalk');
const  Generator=require('./Generator')
const create=async (name,options)=>{
    // 先执行判重逻辑
   await  fileRepeat(name,options)
    const cwdPath=process.cwd()
    //配合当前路径 和命令名称产出文件夹
    const outPath=path.join(cwdPath,name)
    const gn=new Generator(name,outPath)
    gn.create()

}

const  fileRepeat=async (name,options)=>{
    console.log('options',options);

    const cwdPath=process.cwd()
    //配合当前路径 和命令名称产出文件夹
    const outPath=path.join(cwdPath,name)
    // 已存在路径处理
    if(fs.existsSync(outPath)){
        if(options.force){
            await fs.remove(outPath)

        }else{
            // 已存在不强制覆盖的情况
            let {action,cool}=await inquirer.prompt([
                {
                name:'action',
                type:'list',
                message:'目标文件已经存在，是否确认覆盖',
                choices:[
                    {
                        name:'overwrite',
                        value:'overwrite'
                    },{
                        name:'cancel',
                        value:false
                    }
                ]
            },
            {
                name:'cool',
                type:'list',
                message:'马哥帅不帅',
                choices:[
                    {
                        name:'帅',
                        value:'帅'
                    },{
                        name:'不帅',
                        value:false
                    }
                ]
            },
        ])
        console.log('action',action,cool);
    
        if(!cool){
            console.log(chalk.cyan('你怕是瞎了狗眼！'));
            
        }else{
            console.log(chalk.cyan('可以，有眼光！'));
        }
        if(!action){
            return
        }else if(action==='overwrite'){
            await fs.remove(outPath)    
        }
        
        }

    }
    
}


module.exports={
    create,
}