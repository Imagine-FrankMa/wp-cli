#! /usr/bin/env node

const program = require('commander')
const figlet=require('figlet')
const chalk=require('chalk')

program
  // 定义命令和参数
  .command('create <app-name>')
  .description('创建一个新项目')
//   命令配置
  .option('-f, --force', '如果已有，覆盖原来的项目')
  .action((name, options) => {
    // 命令具体执行！！
     require('../creator.js').create(name,options)
  })
  
  program
  .on('--help', () => {
    // 使用 figlet 绘制 Logo
    console.log('\r\n' + figlet.textSync('yyds', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));
    // 新增说明信息
    console.log(`\r\n ${chalk.cyan(`马哥`)} yyds\r\n`)
  })


program
   // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')
  
// // 解析用户执行命令传入参数
program.parse(process.argv);
// process.argv [ '/usr/local/bin/node', '/usr/local/bin/zr', 'create', 'yyds' ]



