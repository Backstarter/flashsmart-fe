'use client'
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CreateDeck from "../../components/CreateDeck";
import { SignOutButton, UserButton, useAuth, useUser } from "@clerk/nextjs";
import Link from 'next/link';

interface Deck {
    deck_description: string;
    deck_name: string;
    deck_owner: string;
    deck_id?: string; // Optional since we'll add it manually
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
    
    return (
        <section className='flex flex-col h-screen'>
            <nav className="flex w-full p-6 justify-between">
                <div className="font-[Fira Sans] text-xl font-bold">FLASHSMART</div>
                <div className="flex gap-6">
                    <Link href='/app/create' role="button" className="flex items-center" >
                        <span className="mr-1 text-xl flex items-center">
                            <Icon icon="material-symbols-light:add"/>
                        </span>
                        Create
                    </Link>

                    {/* <SignOutButton>
                        <button className="bg-neutral-700 p-7 py-2 rounded-full font-semibold">Upgrade to Pro</button>
                    </SignOutButton> */}
                    
                    <UserButton/>
                </div>
            </nav>

            <div className="flex w-full h-full overflow-hidden">
                <div className='bar w-[12%] flex flex-col justify-between gap-8 p-6 h-full'>
                    <div className='flex flex-col justify-between gap-8'>
                        <Link href='/app' role="button" className="flex text-base font-[Fira Sans] items-start" ><span className="text-xl mr-3"><Icon icon="material-symbols:home"/></span>Home</Link>
                        <Link href='/app/library' role="button" className="flex text-base font-[Fira Sans] items-start" ><span className="text-xl mr-3"><Icon icon="material-symbols:folder-open-sharp"/></span>Your Decks</Link>
                    </div>
                    <div className="flex flex-col justify-between gap-8">
                        <hr className=''/>
                        <Link className="flex text-base font-[Fira Sans] items-start" href=""><span className="text-xl mr-3"><Icon icon="mdi:cards"/></span>Practice</Link>
                    </div>
                </div>

                <div className='view mt-6 px-24 w-full overflow-y-auto'>
                    {children}
                </div>
            </div>
        </section>
    );
}
