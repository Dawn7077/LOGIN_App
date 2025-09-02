const express = require('express')
const app = express()
const session = require('express-session')
const {checkLogIn , byPassLogIn}=require('./middleware.js')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized:false, 
    name:'app.io',
    cookie:{
        maxAge:1000*60*60  
    }
}))

app.use((req,res,next)=>{ 
    res.locals.user = req.session.user //  just a copy of the req session object to the res object so we can avoid passing req.session.objects every time
    next()
})

app.get('/',checkLogIn,(req,res)=>{
    let name = req.session.user.name
    console.log(name)
    res.render('home')
})
app.get('/login',byPassLogIn,(req,res)=>{
    res.render('login',{error:null})
})
app.post('/login',(req,res)=>{
    if(req.body.username ==='dawn' && req.body.password === '1011')
        {
        req.session.user = {id:1,username:'dawn',name:'Dawn'}
        // res.send('HI '+req.body.username)
        res.redirect('/')
    }
    else if(req.body.username ==='admin' && req.body.password === '123')
        {
        req.session.user = {id:1,username:'Admin',name:'Admin'}
        // res.send('HI '+req.body.username)
        res.redirect('/')
    }
    
    else{
        res.render('login',{error:'Wrong Credentials'})
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.clearCookie('app.io')
    res.redirect('/')
})
app.listen(8000,()=>console.log('Listening on port 8000...'))