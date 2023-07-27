const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const student = require('../model/student');

const cloudinary = require('cloudinary').v2


// Configuration 
cloudinary.config({
    cloud_name: "dfbaffw4y",
    api_key: "479455979741696",
    api_secret: "0KOBKo0FfdXAR5Qf12IomGqYnf4"
  });





router.get('/',(req,res,next)=>{
   student.find()
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

router.get('/:id',(req,res,next)=>{
 console.log(req.params.id);
 student.findById(req.params.id)
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

router.post('/',(req,res,next)=>{
    const file = req.files.photo
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        console.log(result)
        const Student = new student({
            _id:new mongoose.Types.ObjectId,
            name:req.body.name,
            email:req.body.email,
            gender:req.body.gender,
            phone:req.body.phone,
            imagePath:result.url
             })
            7
             Student.save()
             .then(Result=>{
                console.log(Result);
                res.status(200).json({
                    newStudent:Result
                })
             })
            
             .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err 
                })
             })
    })

})

// delete request

router.delete('/',(req,res,next)=>{
    const imageUrl = req.query.imageUrl;
    const urlArray = imageUrl.split('/');
    console.log(urlArray)
    const image = urlArray[urlArray.length-1]
    console.log(image)
    const imageName = image.split('.')[0]
    console.log(imageName)
    const studentId = req.query.id
    student.deleteOne({_id:studentId})
    .then(result=>{
        cloudinary.uploader.destroy(imageName,(error,result)=>{
            console.log(error,result)
        })
        res.status(200).json({
            message:'student data deleted',
            result:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
     })
})

// put request

router.put('/:id',(req,res,next)=>{
    console.log(req.params.id);
    student.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
email:req.body.email,
gender:req.body.gender,
phone:req.body.phone
        }
    })
    .then(Result=>{
        res.status(200).json({
            updated:Result
        })
     })
     .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
     })
     
})


module.exports = router;








