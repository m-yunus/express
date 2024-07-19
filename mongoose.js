const express=require('express');
const mongoose=require('mongoose')
const app=express();
const port=process.env.PORT || 3000;
//connect to mongo db
mongoose.connect('mongodb://127.0.0.1:27017/nodejs', {useNewUrlParser: true, useUnifiedTopology:true})
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to db")
    })
    //create schema
    const userSchema=new mongoose.Schema({
        name:String,
        email:String,
        password:String
        })
    //create model
    const User=mongoose.model('User',userSchema)
    app.get('/create',async(req,res)=>{
        const user=new User({
            name:'sai',
            email:'sai@gmail.com',
            password:'123456'
        })
        await user.save();
        res.send(user)
    })
    app.get('/read',async(req,res)=>{
        await User.find({}).then((user)=>{
            res.send(user)
        }).catch((err)=>{
            res.status(500).send(err )
        });
    
        })
        app.get('/update',async(req,res)=>{
            await User.updateOne({name:'sai'},{name:'sai kumar'}).then((user)=>{
                    res.send(user)
                    }).catch((err)=>{
                        res.status(500).send(err)
                        });
                        });
app.get('/delete',async(req,res)=>{
                            await User.deleteOne({name:'sai kumar'}).then((user)=>{
                                res.send(user)
                                }).catch((err)=>{
                                    res.status(500).send(err)
                                    });
                                    });
app.listen(port,()=>{
    console.log(`server is listening on ${port}`)
})