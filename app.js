const express = require('express')
 
const app = express()
//静态资源托管 吧node_modules文件夹,托管为静态资源目录
app.use('/node_modules',express.static('./node_modules'))
 
//设置模板引擎
app.set('views engine','ejs')

app.set('views','./views')

app.get('/',(req,res)=>{
    res.render('index.ejs',{name:'zs'})
})

app.listen(80,()=>{
    console.log('server running at http://127.0.0.1')
})