const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const moment =require('moment')

const conn=mysql.createConnection({
    host:'127.0.0.1',
    database:'blog',
    user:'root',
    password:'root'
})
//用户请求的注册页面
router.get('/register',(req,res)=>{
    
    res.render('./user/register.ejs',{})
}) 

//用户请求的登录页面
router.get('/login',(req,res)=>{
    res.render('./user/login.ejs',{})
})
//注册新用户
router.post('/register',(req,res)=>{
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
//开始登录啦
router.post('/login',(req,res)=>{
    //获取表单中的数据
    const userInfo = req.body
    //执行sql语句,查询用户是否存在
    const sql1='select*from user where username=? and password=?'
    conn.query(sql1,[userInfo.username,userInfo.password],(err,result)=>{
        //如果查询期间,执行sql语句失败,则认为登录失败!
        if(err) return res.send({msg:'用户登录失败',status:501})
        //如果查询期间的结果,记录条数不为1 则查询失败
        if(result.length !==1)return res.send({msg:'用户登录失败',status:502})
        //查询成功
        res.send({msg:'ok',status:200})
    })
})
module.exports=router