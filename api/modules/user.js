const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkOut = require('../middleware/check_out');


const User = require('../model/user');
const user = require('../model/user');


router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.pasword,10,(err, hash)=>{
        if(err){
            return res.status(500).json({
                error: err
            })
        }else{
            const user = new User({
                // _id:mongoose.Schema.Types.ObjectId,
                username:req.body.username,
                pasword:hash, 
                email:req.body.email,
                phone:req.body.phone
            })
            user.save()
            .then(Result=>{
                console.log(Result);
                res.status(200).json({
                    new_user:Result
                })
             })
             .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                })
             })
        }
       }) 
});


// get request

router.get('/',checkOut,(req,res,next)=>{
    user.find()
    .then(Result=>{
     res.status(200).json({
         studentData:Result
     })
    })
    .catch(err=>{
     console.log(err);
     res.status(500).json({
         error:err
     })
    })
 
 });

//  get request using id

router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    user.findById(req.params.id)
    .then(Result=>{
       res.status(200).json({
           studentData:Result
       })
      })
      .catch(err=>{
       console.log(err);
       res.status(500).json({
           error:err
       })
      })
    
    });
   
// // delete request

// router.delete('/:id',(req,res,next)=>{
//    user.deleteOne({_id:req.params.id})
//     .then(result=>{
//         res.status(200).json({
//             message:'user data deleted',
//             result:result
//         })
//     })
//     .catch(err=>{
//         console.log(err);
//         res.status(500).json({
//             error:err
//         })
//      })
// });

// // put request

// router.put('/:id',(req,res,next)=>{
//     console.log(req.params.id);
//     user.findByIdAndUpdate({_id:req.params.id},{
//         $set:{
//             username:req.body.username,
            
// email:req.body.email,
// phone:req.body.phone
//         }
//     })
//     .then(Result=>{
//         res.status(200).json({
//             updated:Result
//         })
//      })
//      .catch(err=>{
//         console.log(err);
//         res.status(500).json({
//             error:err
//         })
//      })
     
// })

router.post('/login',(req,res,next)=>{
User.find({username:req.body.username})
.exec()
.then(user=>{
    if(user.length < 1){
        return res.status(401).json({
            msg:"user not found"
        })
    }
    bcrypt.compare(req.body.pasword,user[0].pasword,(err,result)=>{
        if(!result){
            return res.status(401).json({
                msg:"pasword not matching"
            })
        }
        if(result){
            const token = jwt.sign({
                username:user[0].username,
                email:user[0].email,
                phone:user[0].phone,
            },
            "this is dummy text",{
                expiresIn:"24h"
            }
            );
            res.status(200).json({
                username:user[0].username,
                email:user[0].email,
                phone:user[0].phone,
                token:token
            })
        }
    })
})
.catch(err=>{
    res.status(500).json({
        err:err
    })
})
})














module.exports = router;