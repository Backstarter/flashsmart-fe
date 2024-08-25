'use client'
import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex w-screen h-screen">
            <div className="login-bg w-4/6  flex flex-col justify-center items-center">
                <h1 className="font-extrabold text-6xl">DON&apos;T JUST STUDY HARD</h1> 
                <h1 className="font-extrabold text-6xl">STUDY <span className="opacity-75 logingrad drop-shadow-lg">SMART</span></h1> 
                <p className="mt-6 font-bold">FLASHSMART</p>
            </div>
            <div className="w-2/6 flex flex-col items-center justify-center">
                <SignUp />
            </div>
        </div>
    );
}