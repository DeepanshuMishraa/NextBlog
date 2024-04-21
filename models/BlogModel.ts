import mongoose from "mongoose";


const BlogModel = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    
})


const Blog =  mongoose.models.Blog || mongoose.model("Blog",BlogModel);

export default Blog;