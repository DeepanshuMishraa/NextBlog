import User from "@/models/UserModel";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqbody = await req.json();
    const { email, password } = reqbody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User Does not exist" },
        { status: 500 }
      );
    }

    if(password !== user.password){
        return NextResponse.json({error:"Wrong Password"},{status:400});
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      {
        message: "Login Success",
        success: true,
        jwt: token,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
