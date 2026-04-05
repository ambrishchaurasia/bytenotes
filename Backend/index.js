require('dotenv').config();
const mongoose = require('mongoose');
const config = require('./config.json'); 
mongoose.connect(config.connectionString);

const express =require('express');
const cors = require('cors');
const jwt =require('jsonwebtoken');
const { authenticateToken } = require('./utilities');
const app=express();

const User=require('./models/user.model');
const Note=require('./models/note.model');

app.use(express.json());
app.use(cors(
    {
        origin:"*",
    }
));

app.get('/',(req,res)=>{
    res.send("Hello World");
});
//Backend ready
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;
    if(!fullName)
    {
       return res.status(400).json({ message: "Full name is required" }); 
    }
    if(!email)
    {
        return res.status(400).json({ message: "Email is required" });
    }
    if(!password)    {
        return res.status(400).json({ message: "Password is required" });
    }  
    
    const isUser=await User.findOne({email:email});
    if(isUser)
    {
        return res.json({message:"User already exists"});
    }
    const user=new User({
        fullName,
        email,
        password,
    });
   await user.save();

const accessToken = jwt.sign(
  { user },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: "30m" }
);

return res.json({
  error: false,
  message: "User created successfully",
  accessToken,
});
    
});

app.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    if(!email)
    {
        return res.status(400).json({ message: "Email is required" });
    }       
    if(!password)    {
        return res.status(400).json({ message: "Password is required" });
    }   
    
    const userInfo=await User.findOne({email:email});
    if(!userInfo)    {
        return res.json({message:"User does not exist"});
    }
    if(userInfo.password!==password)
    {
        return res.json({message:"Invalid credentials"});
    }
    if(userInfo.password===password && userInfo.email===email)
    {
        const user={user:userInfo};
        const accessToken=jwt.sign({user:userInfo},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:'30m',
        } );
        return res.json({error:false,message:"Login successful",email,accessToken

        });
    }
    else
    {
        return res.status(400).json({error:true,message:"Invalid credentials"});
    }
    });

//GetUser
app.get("/get-user",authenticateToken,async (req,res)=>{
    const {user}=req.user;
    const isUser=await User.findOne({_id:user._id});
    if(!isUser)
    {
        return res.status(404).json({error:true,message:"User not found"});
    }
   return res.json({error:false,
    user:{
        fullName:isUser.fullName,
        email:isUser.email,
        "_id":isUser._id,
        createdOn:isUser.createdOn,
        },
    message:"User fetched successfully"});
});


app.post("/add-note",authenticateToken,async (req,res)=>{
   const {title,content,tags,isPinned}=req.body;
   const {user}=req.user;
   if(!title)
   {
       return res.status(400).json({ message: "Title is required" });
   }
   if(!content)   {
       return res.status(400).json({ message: "Content is required" });
   }
   try {
    const note=new Note({
        title,
        content,  
        tags: tags || [],  
        userId: user._id,
   });

   await note.save();
   
   return res.json({
    error:false,
    note,
    message:"Note added successfully",
}); 
   }
catch(error){
    console.error("Error adding note:", error);
    return res.status(500).json({ error: true, message: "Internal server error" }); 
}
});

//Edit note
app.put("/edit-note/:noteId",authenticateToken,async (req,res)=>{
    const noteId=req.params.noteId;
    const {title,content,tags,isPinned}=req.body;
    const {user}=req.user;

    if(!title && !content && !tags)
    {
        return res.status(400).json({ message: "At least one field (title, content, or tags) is required for update" });
    }
    try {
        const note=await Note.findOne({_id:noteId,userId:user._id});
        if(!note)
        {
            return res.status(404).json({error: true, message: "Note not found" });
        }
    
    if(title)
    {
        note.title=title;
    }
    if(content)
    {
        note.content=content;
    }
    if(tags)
    {
        note.tags=tags;
    }
    if(isPinned)
        note.isPinned=isPinned;

    await note.save();

    return res.json({
        error:false,
        note,   
        message:"Note updated successfully",            
});
    }
    catch(error){
        console.error("Error updating note:", error);
        return res.status(500).json({ 
            error: true, message: "Internal server error" 
        }); 
    }
})

//Get all notes
app.get("/get-all-notes",authenticateToken,async (req,res)=>{
    const {user}=req.user;

    try {
        const notes=await Note.find({userId:user._id}).sort({isPinned:-1});
        return res.json({error:false, notes,message:"Notes fetched successfully"});
    }
    catch(error){
        console.error("Error fetching notes:", error);
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
});

//Delete note  
app.delete("/delete-note/:noteId",authenticateToken,async (req,res)=>{
    const noteId=req.params.noteId;
    const {user}=req.user;
    
    try{
        const note=await Note.findOne({_id:noteId,userId:user._id});
        if(!note)
        {
            return res.status(404).json({error: true, message: "Note not found"

             });
        }
        await Note.deleteOne({_id:noteId,userId:user._id});
        return res.json({error:false,message:"Note deleted successfully"});
    }
    catch(error){
        console.error("Error deleting note:", error);
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
   
});

//Update isPinned status
app.put("/update-note-pinned/:noteId",authenticateToken,async (req,res)=>{
      const noteId=req.params.noteId;
    const {isPinned}=req.body;
    const {user}=req.user;

    try {
        const note=await Note.findOne({_id:noteId,userId:user._id});
        if(!note)
        {
            return res.status(404).json({error: true, message: "Note not found" });
        }
  
   
        note.isPinned=isPinned;

    await note.save();

    return res.json({
        error:false,
        note,   
        message:"Note updated successfully",            
});
    }
    catch(error){
        console.error("Error updating note:", error);
        return res.status(500).json({ 
            error: true, message: "Internal server error" 
        }); 
    }
});

//search 
app.get("/search-notes",authenticateToken,async (req,res)=>{
    const {query}=req.query;
    const {user}=req.user;

    if(!query)
    {
        return res.status(400).json({ message: "Search query is required" });
    }

    try
    {
        const matchingNotes=await Note.find({
            userId:user._id,
            $or:[
                {title:{$regex: new RegExp(query,"i")}},
                {content:{$regex: new RegExp(query,"i")}},
                {tags:{$regex: new RegExp(query,"i")}},
            ],
        });
        return res.json({error:false, notes:matchingNotes,message:"Search completed successfully"});
    }
    catch(error)
{
  return res.status(500).json({ error: true, message: "Internal server error" });
}
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});

 

module.exports=app;