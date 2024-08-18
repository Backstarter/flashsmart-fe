'use client'
import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex w-screen h-screen">
            <div className="login-bg w-4/6"></div>
            <div className="w-2/6 flex flex-col items-center justify-center">
                <SignUp />
            </div>
        </div>
    );
}