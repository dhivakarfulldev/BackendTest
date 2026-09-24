import express from "express";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();
app.use(cors())
const app = express();
app.use(express.json())
let users = [
    {
        id:1,
        name:"dhiva",
        email:"dhiva123@gmail.com",
        password:"123456789",
        
    },
    { 
        id:2,
        name:"bala",
        email:"bala123@gmail.com",
        password:"12345",
        
    }
]
app.get("/users"  , (req, res) => {
   res.json({
    success:true,
    users:users
   })
})

app.get("/users/:id" , (req , res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => (user.id === id));
 
  
  if(!user){
    return  res.status(404).json({
        success:false,
        message:"User Not Found"
      })
  }

  res.status(200).json({
    success:true,
    data:user
  })
  

})

app.post("/users" , (req , res) => {
        const {name , email , password} = req.body;
        const newUser = {
            id:users.length + 1,
            name,
            email,password
        }
        users.push(newUser)

        res.status(201).json(
            {
                success:true,
                message:"User created Successfully",
                date:newUser
            }
        )
})

app.put("/users/:id" , (req,res) => {
 const id = Number(req.params.id);
  const {name , email , password}  = req.body;
  const user = users.find((user) => (user.id === id));

  if(!user){
    res.status(404).json(
        {
            success:false,
            message:"User Not found"
        }
    )
  }

  user.name = name;
  user.email = email;
  user.password = password;

  res.status(200).json({
    success:true,
    message:"User updated Successfully",
    data:user
  })
})

app.delete("/users/:id" , (req , res) => {
 const id  =  Number(req.params.id);

 const user = users.find((user) => (user.id === id));

 if(!user){
   return res.status(404).json({
        success:false,
        message:"User Not Found"
    })
 }

   users =  users.filter((user) => (user.id !== id));

   res.status(200).json({
    success:true,
    message:"User Deleted Successfully",
    deletedUser:user
   })
})

app.listen(process.env.PORT , () => {
    console.log("Port Running on 3000......");
    
})