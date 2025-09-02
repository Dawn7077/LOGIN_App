exports.checkLogIn = (req,res,next)=>{//to check whether the login was succesful
    if(req.session.user){
        next()
    }else{
        res.redirect('/login')
    }
}

exports.byPassLogIn =(req,res,next)=>{ // to prevent logged in user from seeing login page again
    if(!req.session.user){
        next()        
    }else{
        res.redirect('/')
    }
}