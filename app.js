const express = require('express')
const bodyParser=require('body-parser')

const app = express()
//静态资源托管 吧node_modules文件夹,托管为静态资源目录
app.use('/node_modules',express.static('./node_modules'))
 
//设置模板引擎
app.set('views engine','ejs')

app.set('views','./views')

 //注册解析表单数据的中间件
 app.use(bodyParser.urlencoded({extended:false}))

//导入router/index.js路由模块
const router1=require('./router/index.js')
app.use(router1)
//导入用户相关的 路由模块
const router2 = require('./router/user.js') 
app.use(router2)

app.listen(80,()=>{
    console.log('server running at http://127.0.0.1')
})