"use client";

/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/5ybpxxJ4gKp
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Libre_Franklin } from 'next/font/google'

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Trophy } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import connectDB from "@/utils/db";

export function RegisterForm() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);

  const router = useRouter();


  const handleSignup = async()=>{
    try{
      setLoading(true);
      const res = await axios.post('/api/user/signup',{name,email,password}); 
      console.log(res.data);
      router.push("/login")

    }catch(e:any){
      setError(e.message);
      console.log(e)
    }finally{
      setLoading(false);
    }
  }
  return (
    <div  className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>Enter your details below to register an account.</CardDescription>
          {loading && <h1 className="text-blue-700">Registering your account....</h1>}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Name</Label>
            <Input onChange={(e)=>setName(e.target.value)} id="name" placeholder="john doe" required type="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input onChange={(e)=>setEmail(e.target.value)} id="email" placeholder="m@example.com" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input onChange={(e)=>setPassword(e.target.value)} id="password" required type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full" onClick={handleSignup}>Signup</Button>

          {error && <p className="text-red-500">{error}</p>}
        </CardFooter>
      </Card>
    </div>
  )
}
