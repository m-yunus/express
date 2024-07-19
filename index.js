const express=require('express');
const app=express()
const fs=require('fs');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; 
app.use(express.urlencoded({extended:false}))
const port=3000
const middleware = (req, res, next) => {
    const sessionId = req.cookies.session;
    if (!sessionId) {
      res.redirect("/login");
      return;
    }
}
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
    console.log(req.url,req.method);
})
app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/login.html")
    console.log(req.url,req.method);
})
app.get("/register",(req,res)=>{
    res.sendFile(__dirname+"/register.html")
    console.log(req.url,req.method);
})
app.post('/login',(req,res)=>{
    const username=req.body.name;
    const email=req.body.email;

    const userdata = JSON.parse(fs.readFileSync(__dirname + "/users.json"));
    const user = userdata.find((user) => user.name === username && user.email === email);

    if (user) {
        const token = jwt.sign({ name: username, email: email }, secretKey, { expiresIn: '1h' });
        res.json({ message: "Login Successful", token: token });
    } else {
        res.status(401).json({ message: "Login Failed: user not found" });
    }

})
app.post("/register",(req,res)=>{
    const username=req.body.name
    const email=req.body.email
    const users=JSON.parse(fs.readFileSync(__dirname+"/users.json"))//readfilesync is for read the file and return the content
    console.log(users);
    const userexist=users.find((user)=>user.name===username)
    if(userexist){
        res.send("user already exist")
        return;
        }
       
            users.push({id:Math.floor(10000 +Math.random()*10000),name:username,email:email})
            fs.writeFileSync(__dirname+"/users.json",JSON.stringify(users));
res.redirect('/')
         
    console.log(users);
})
app.listen(port,()=>{
    console.log("server is running on port",port);
})