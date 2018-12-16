const express = require('express')
const router = express.Router()

//用户请求的  主页
router.get('/',(req,res)=>{ 
    //使用render函数之前 一定要保证安装和配置ejs模板引擎
    res.render('index.ejs',{}) 
})
//吧路由对外暴露
module.exports=router