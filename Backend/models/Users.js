import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    classname:{
        type:String,
        required:false,
        
    },
    email: {
        type: String,
        required: [true, 'Email is required'],    // Ensures email is required
        unique: true,      // Ensures email is unique
        lowercase: true,   // Optional: Converts email to lowercase
        trim: true,        // Optional: Removes whitespace around email
    },

role:{
    type:String,
    enum:['admin','user','peon'],
    default:'user'
},


    password:{
        type:String,
        required:true,
        minilength:6
    },
   
},{timestamps:true});

const UserModel=mongoose.model('user',userSchema)
export default UserModel;