import Image from "next/image";
import { Icon } from '@iconify/react';
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <nav className="flex w-full p-6 justify-between">
        <div className="text-xl font-bold">FLASHSMART</div>
        <div className="flex gap-6">
          <a className="flex items-center" href="/app">
            <span className="mr-1 text-xl flex items-center">
              <Icon icon="material-symbols-light:add"/>
            </span>
            Create
          </a>

          <SignInButton>
            <button className="bg-neutral-700 p-7 py-2 rounded-full font-semibold">Log In</button>
          </SignInButton>
        </div>
      </nav>

      <section className="hero px-6 pt-20 w-full flex flex-col flex-1">
        <div className="max-w-screen-xl mx-auto w-full flex">
          <span className="text-7xl w-7/12 font-montserrat">Achieve Mastery, One Card at a Time</span>
          <div className="w-5/12 mt-8">
            <p className="text-lg text-neutral-400">Mastery is within your reach. Turn your study sessions into a journey toward success. Join now and start learning smarter.</p>
            <button className="bg-neutral-700 p-7 py-2 rounded-full mt-5 text-lg text-white font-[Fira Sans] font-semibold">Start Now</button>
          </div>
          <img src="" alt="" />
        </div>
        <div className="cards flex-1 flex w-full">
          <div className="flex mx-auto gap-5 relative h-min">
            <div className="card-glow absolute left-1/2 transform -translate-x-1/2 self-center"></div>
            <div className="w-[600px] h-[300px] mt-32 hero-card-pink rounded-xl -rotate-[10deg] p-6 text-rose-950 text-lg flex flex-col">
              <h1 className="font-[Fira Sans] font-semibold">Efficient Learning</h1>
              <hr className="my-3 border-t-2 border-rose-300"/>
              <p className="pt-3">Streamline your study sessions with adaptive flashcards that focus on areas where you need the most improvement, making your learning process faster and more effective.</p>
            </div>
            <div className="w-[600px] h-[300px] mt-32 hero-card-teal rounded-xl rotate-[10deg] p-6 text-teal-950 text-lg flex flex-col">
              <h1 className="font-[Fira Sans] font-semibold">Flexible Study Options</h1>
              <hr className="my-3 border-t-2 border-teal-200"/>
              <p className="pt-3">Study anytime, anywhere with seamless access across all your devices, allowing you to fit learning into your busy schedule with ease.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
