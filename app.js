const express = require('express')
const mysql = require('mysql')
const bodyParser=require('body-parser')
const moment =require('moment')

const conn=mysql.createConnection({
    host:'127.0.0.1',
    database:'blog',
    user:'root',
    password:'root'
})
 
const app = express()
//静态资源托管 吧node_modules文件夹,托管为静态资源目录
app.use('/node_modules',express.static('./node_modules'))
 
//设置模板引擎
app.set('views engine','ejs')

app.set('views','./views')

 //注册解析表单数据的中间件
 app.use(bodyParser.urlencoded({extended:false}))
//用户请求的  主页
app.get('/',(req,res)=>{ 
    res.render('index.ejs',{}) 
})

//用户请求的注册页面
app.get('/register',(req,res)=>{
    
    res.render('./user/register.ejs',{})
}) 

//用户请求的登录页面
app.get('/login',(req,res)=>{
    res.render('./user/login.ejs',{})
})
//注册新用户
app.post('/register',(req,res)=>{
    //完成用户注册的业务逻辑
    const userInfo = req.body
    //判断用户输入是否完整
    if (!userInfo.username || !userInfo.nickname || !userInfo.password) return res.status(400).send({ status: 400, msg: '请输入正确的表单信息!' })
    //查询用户名是否重复
    const sql1 ='select count(*) as count from user where username=?'
    conn.query(sql1,userInfo.username,(err,result)=>{
        //如果查询失败 返回客户端失败
        if(err) return res.status(500).send({msg:'用户查询失败!',status:502})
        //console.log(result)
        if(result[0].count !==0)return res.send({msg:'请更换其他用户名!',status:503})
        // 添加ctime字段
        userInfo.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
         
        //执行注册的业务逻辑
        const sql2='insert into user set ?'
        conn.query(sql2,userInfo,(err,result)=>{
            if (err) return res.status(500).send({ status: 500, msg: '注册失败!请重试!' })
            res.send({msg:'恭喜,注册成功!',status:200}) 
        })
    })
    
}) 

app.listen(80,()=>{
    console.log('server running at http://127.0.0.1')
})