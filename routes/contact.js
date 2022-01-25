const express= require('express');
const auth = require('../middleware/auth');
const Contact=require('./../models/Contact');

const router = express.Router();

// const {check,validationResult} = require('express-validator/check');
const {check,validationResult} = require('express-validator');

//@acess : private
//@desc: get all users contact 
//@route : get /api/contact
router.get('/',auth,async(req,res)=>{
    try{
        const contacts= await Contact.find({user:req.user.id}).sort({date:-1});
        res.json(contacts);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("server error");
    }
});

//@acess : private
//@desc: add new contact 
//@route : post /api/contact
router.post('/',
    [auth,[
        check('name','Name is Required').not().isEmpty()
    ]],
    async(req,res)=>{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const{name, email, phone, didProjects, workingProjects} = req.body;

        try{
            const newContact = new Contact({
                name,
                email,
                phone,
                didProjects,
                workingProjects,
                user:req.user.id
            });
            const contact = await newContact.save();
            res.json(contact);
        }
        catch(err){
            console.log(err.message);
            res.status(500).send("server error");
        }

    });

//@acess : private
//@desc: update contact 
//@route : put /api/contact/:id
router.put('/:id',auth,async(req,res)=>{
    const {name,email,phone,didProjects,workingProjects}= req.body;
    const contactUpdate = {};
    if(name) contactUpdate.name = name;
    if(email) contactUpdate.email = email;
    if(phone) contactUpdate.phone = phone;
    if(didProjects) contactUpdate.didProjects = didProjects;
    if(workingProjects) contactUpdate.workingProjects = workingProjects;

    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg:"contact not found"});

        //to check users own contact
        if(contact.user.toString() != req.user.id) return res.status(401).json({msg: "not authorized.."})

        contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set: contactUpdate},
            {$new:true}
        );
        res.json(contact);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("server error");
    }

});

//@acess : private
//@desc: delete contact 
//@route : delete /api/contact/:id
router.delete('/:id',auth,async(req,res)=>{
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg:"contact not found"});

        //to check users own contact
        if(contact.user.toString() != req.user.id) return res.status(401).json({msg: "not authorized.."})

        await Contact.findByIdAndRemove(req.params.id);
        res.json({msg:"contact removed successfully"});
        
    } catch (error) {
        console.error(error);
        res.status(500).send("server error");
    }
});

module.exports = router;