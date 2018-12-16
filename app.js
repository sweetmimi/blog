const express = require('express')
const bodyParser=require('body-parser')
const fs = require('fs')
const path =require('path')

const app = express()
//静态资源托管 吧node_modules文件夹,托管为静态资源目录
app.use('/node_modules',express.static('./node_modules'))
 
//设置模板引擎
app.set('views engine','ejs')

app.set('views','./views')

 //注册解析表单数据的中间件
 app.use(bodyParser.urlencoded({extended:false}))

// //导入router/index.js路由模块
// const router1=require('./router/index.js')
// app.use(router1)
// //导入用户相关的 路由模块
// const router2 = require('./router/user.js') 
// app.use(router2)

//使用 循环的方式 进行路由的自动注册
fs.readdir(path.join(__dirname,'./router'),(err,filenames)=>{
    if(err) return console.log('读取router目录中的路由失败!')
    //循环router目录下的每一个文件名
    filenames.forEach(fname=>{
        //每循环一次拼接出一个完整的路由模块地址
        //然后 使用require导入这个路由模块
    const router = require(path.join(__dirname,'./router',fname))
    app.use(router)
    })
})

app.listen(80,()=>{
    console.log('server running at http://127.0.0.1')
})