import Blog from "@/models/BlogModel";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


connectDB();

export async function POST(req:NextRequest){
    try{
        const reqBody = await req.json();
        const {title,content,image}  = reqBody;

        const accessToken = req.cookies.get("token");
        if(accessToken){
                    const newBlog = await new Blog({
                      title,
                      content,
                      image
                    });

                    const savedBlog = newBlog.save();
                    return NextResponse.json({
                      message: "Blog Created Successfully",
                      success: true,
                      savedBlog,
                    });
        }else{
            return NextResponse.json({error:"Unauthorized"},{status:401});
        }


    }catch(err){
        console.log(err);
    }
}


export async function GET(){
    try{
        const blogs = await Blog.find();
        return NextResponse.json({
            success:true,
            blogs
        })
    }catch(err){
        console.log(err);
    }
}


export async function PUT(req:NextRequest){
    try{
        const reqBody = await req.json();
        const {title,content} = reqBody;
        const accessToken = req.cookies.get("token");
        if(accessToken){
            const updatedBlog = await Blog.findByIdAndUpdate("_id",{
                title,
                content,
            },{new:true});
            return NextResponse.json({
                message:"Blog Updated Successfully",
                success:true,  
                updatedBlog
            })
        }

    }catch(e){
        console.log(e);
    }
}