import User from "@/models/UserModel";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


connectDB();

export  async function POST(req:NextRequest){
    try{
        const reqbody = await req.json();
        const  {name,email,password} = reqbody;
        
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error:"User Already Exists"},{status:500});
        }
        const newUser = new User({
            name,
            email,
            password
        })

        const savedUser = await newUser.save();
        return NextResponse.json({message:"User Created Successfully",success:true,savedUser});
    }catch(e:any){
        return NextResponse.json({error:e.message},{status:500});
        console.log(e);
    }
}