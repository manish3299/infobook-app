const express= require('express');

const router= express.Router();

const jwt = require('jsonwebtoken');

const bcrypt=require('bcryptjs');

const config = require('config');

const auth = require("../middleware/auth");

// const {check,validationResult} = require('express-validator/check');
const {check,validationResult} = require('express-validator');

const User = require('./../models/user');

//@acess : private
//@desc: get logged in user
//@route : get /api/auth
router.get('/',auth, async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//@acess : public
//@desc: auth user and get token 
//@route : post /api/auth
router.post('/',
[
    check('email','please enter the valid email adress').isEmail(),
    check('password','Password is required').exists()
],async (req,res)=>{
    
    const errors=validationResult(req);
                if(!errors.isEmpty()){
                    //there iserror
                    return res.status(400).json({errors: errors.array()});
                }

    const {email, password} = req.body;

    try {
        

        let user = await User.findOne({email:email});

        if(!user){
            return res.status(400).json({msg:"Invalid credentials"});
        }

        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({msg:"Invalid credentials"});
        }

        const payload = {
            user:{
                id:user.id
            }
        };

        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn: 360000
        },(err,token)=>{
            if(err) throw err;
            res.json({token});
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server Error")
    }

  }
);

module.exports = router;