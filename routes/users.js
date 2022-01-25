const express = require('express');

const router= express.Router();

const jwt = require('jsonwebtoken');

const bcrypt=require('bcryptjs');

const config = require('config');

// const {check,validationResult} = require('express-validator/check');
const {check,validationResult} = require('express-validator');

const User = require('./../models/user');

//@acess : public
//@desc: registeration 
//@route : post /api/users
router.post('/',
            [
                check('name','Name is Required').not().isEmpty(),
                check('email','Please enter the valid email').isEmail(),
                check('password','enter the pasword of minimum 6 characters').isLength({min:6})
            ],
            async (req,res)=>{
                const errors=validationResult(req);
                if(!errors.isEmpty()){
                    //there iserror
                    return res.status(400).json({errors: errors.array()});
                }
                // res.send("passed");

                const {name,email,password} = req.body

                try {
                    
                    let user =await User.findOne({email: email});

                    if(user){
                        res.status(400).json({msg: "user already exists"});
                    }

                    user= new User({
                        name: name,
                        email:email,
                        password:password
                    });

                    //hashing the pasword

                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(password,salt);

                    await user.save();

                    // res.send("user saved");
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
                    res.status(500).send("Server Error");
                }

            });

module.exports = router;