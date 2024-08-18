import Image from "next/image";
import { Icon } from '@iconify/react';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#101010]">
      <nav className="flex w-full p-6 justify-between">
        <div className="font-[Fira Sans] text-xl font-bold">FLASHSMART</div>
        <div className="flex gap-6">
          <p className="flex items-center">
            <span className="mr-1 text-xl flex items-center">
              <Icon icon="material-symbols-light:add"/>
            </span>
            Create
          </p>
          <button className="bg-neutral-700 p-7 py-2 rounded-full font-semibold">Log In</button>
        </div>
      </nav>

      <section className="hero px-6 pt-20 w-full flex flex-col flex-1">
        <div className="max-w-screen-xl mx-auto w-full flex">
          <span className="text-7xl w-7/12 font-[Montserrat]">Achieve Mastery, One Card at a Time</span>
          <div className="w-5/12 mt-8">
            <p className="text-lg text-neutral-400 font-[Fira Sans]">Mastery is within your reach. Turn your study sessions into a journey toward success. Join now and start learning smarter.</p>
            <button className="bg-gradient-to-r from-emerald-400 to-teal-400 p-7 py-2 rounded-full mt-5 text-lg text-black font-[Fira Sans] font-semibold">Start Now</button>
          </div>
          <img src="" alt="" />
        </div>
        <div className="cards flex-1 flex w-full">
          <div className="flex mx-auto pt-32 gap-5">
            <div className="w-[600px] h-[300px] bg-rose-300 rounded-xl -rotate-[10deg] p-6 text-rose-950 text-lg flex flex-col">
              <h1 className="font-[Fira Sans] font-semibold">Efficient Learning</h1>
              <hr className="my-3 border-t-2 border-rose-200"/>
              <p className="pt-3">Streamline your study sessions with adaptive flashcards that focus on areas where you need the most improvement, making your learning process faster and more effective.</p>
            </div>
            <div className="w-[600px] h-[300px] bg-teal-300 rounded-xl rotate-[10deg] p-6 text-teal-950 text-lg flex flex-col">
              <h1 className="font-[Fira Sans] font-semibold">Flexible Study Options</h1>
              <hr className="my-3 border-t-2 border-teal-200"/>
              <p className="pt-3">Study anytime, anywhere with seamless access across all your devices, allowing you to fit learning into your busy schedule with ease.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Radial Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-64 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-white via-transparent to-transparent opacity-50"></div>
      </div>
    </main>
  );
}
