const { Router } = require('express')
const router = Router();
const db = require('../database/database');
const session = require('express-session');
const path = require('path');


const isAuth = (req,res,next)=>{    
  if(req.session.authenticated)
      next();
  else
      return res.status(403).json({msg: "Redirect"})
  }

const getUsername = async(req,res,next)=>{    
 
}

router.use('/check',isAuth, async(req,res)=>{
  let userExist = await db.getDb().collection('collection').findOne({ email: req.session.user})
  if (userExist){
    try {
      if(userExist.admin)
        res.status(200).send(JSON.stringify({data: userExist.data, email: req.session.user,admin: true}  ));  
       else
        res.status(200).send(JSON.stringify({data: userExist.data, email: req.session.user}  ));  
    } catch{
      console.log("greska u dohvacanju username-a");
      res.status(403).send("neap");
    }
}   
}) 

router.post('/logout',isAuth, function(req, res){
    try {
      req.session.destroy((err)=>{
        if(err) throw err;
        return res.status(200).json({msg: "Redirect"})
      });
    } catch (error) {
      console.log("bug");
      return res.status(200).json({msg: "Redirect"})
    } 
 });

module.exports = router;

