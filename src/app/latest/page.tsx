'use client'
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { SignOutButton, UserButton } from "@clerk/nextjs";

export default function page() {
    let [currentView, setCurrentView] = useState('home')

    return (
        <section className='flex flex-col h-screen'>
            <nav className="flex w-full p-6 justify-between">
                <div className="font-[Fira Sans] text-xl font-bold">FLASHSMART</div>
                <div className="flex gap-6">
                    <button className="flex items-center">
                        <span className="mr-1 text-xl flex items-center">
                        <Icon icon="material-symbols-light:add"/>
                        </span>
                        Create
                    </button>

                    <SignOutButton>
                        <button className="bg-neutral-700 p-7 py-2 rounded-full font-semibold">Upgrade to Pro</button>
                    </SignOutButton>
                    
                    <UserButton/>
                </div>
            </nav>

            <div className="flex w-full h-full overflow-hidden">
                <div className="bar w-[12%] flex flex-col justify-between gap-8 p-6 h-full">
                    <div className='flex flex-col justify-between gap-8'>
                        <button className="flex text-base font-[Fira Sans] items-start" onClick={() => setCurrentView('home')}><span className="text-xl mr-3"><Icon icon="material-symbols:home"/></span>Home</button>
                        <button className="flex text-base font-[Fira Sans] items-start" onClick={() => setCurrentView('decks')}><span className="text-xl mr-3"><Icon icon="material-symbols:folder-open-sharp"/></span>Your Decks</button>
                    </div>
                    <div className="flex flex-col justify-between gap-8">
                        <hr className=''/>
                        <a className="flex text-base font-[Fira Sans] items-start" href=""><span className="text-xl mr-3"><Icon icon="mdi:cards"/></span>Practice</a>
                    </div>
                </div>

                <div className='view mt-12 px-24 w-full overflow-y-auto'>
                    {currentView == "home" && (
                        <>
                            <h1 className='text-xl font-semibold mb-3'>Recently Viewed</h1>
                            <div className='grid grid-cols-3 gap-6 w-full'>
                                <div className='scaffold h-[200px] rounded-lg bg-neutral-100'></div>
                                <div className='scaffold h-[200px] rounded-lg bg-neutral-100'></div>
                                <div className='scaffold h-[200px] rounded-lg bg-neutral-100'></div>
                            </div>
                            <h1 className='text-xl font-semibold mb-3 mt-12'>Your Decks</h1>
                            <div className='grid gap-6 w-full'>
                                <div className='scaffold h-[100px] rounded-lg bg-neutral-100'></div>
                                <div className='scaffold h-[100px] rounded-lg bg-neutral-100'></div>
                                <div className='scaffold h-[100px] rounded-lg bg-neutral-100'></div>
                                <div className='scaffold h-[100px] rounded-lg bg-neutral-100'></div>
                                <div className='scaffold h-[100px] rounded-lg bg-neutral-100'></div>
                            </div>
                        </>
                    )}

                    {currentView == "decks" && (
                        <>
                            <h1 className='text-xl font-semibold mb-3'>Your Decks</h1>
                            <div className='grid gap-6 w-full'>
                                <div className='scaffold h-[100px] rounded-lg bg-neutral-100'></div>
                                <div className='scaffold h-[100px] rounded-lg bg-neutral-100'></div>
                                <div className='scaffold h-[100px] rounded-lg bg-neutral-100'></div>
                                <div className='scaffold h-[100px] rounded-lg bg-neutral-100'></div>
                                <div className='scaffold h-[100px] rounded-lg bg-neutral-100'></div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
  }