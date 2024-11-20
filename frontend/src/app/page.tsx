import HomeEvents from "@/components/HomeEvents";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="content-container space-y-10">
      <section className="space-y-3 text-justify py-8">
        <h1 className="text-4xl font-bold">Welcome to Club Net!</h1>
        <p className="text-lg">
          Stay in the Loop. Never Miss a Beat. Discover Nitte’s Vibrant Events.
        </p>
        <p className="text-lg">
          ClubNet is your one-stop destination for all events happening in
          Nitte. We have a wide range of clubs that cater to all interests.
          Whether you are interested in coding, dancing, or even debating, we
          have a club for you. Our platform allows you to stay up to date with
          all the events happening in Nitte.
        </p>
      </section>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-5 items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center space-y-6 modecard p-5 rounded-3xl h-72">
          <div className="p-10 rounded-full overflow-hidden">
            <Image
              src="/path/to/image1.jpg"
              alt="Event Image 1"
              width={100}
              height={100}
              className="w-24 h-24 object-cover rounded-full"
            />
          </div>
          <p>Events are a great way to meet new people and make new friends.</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 modecard p-5 rounded-3xl h-72">
          <div className="p-10 rounded-full overflow-hidden">
            <Image
              src="/path/to/image2.jpg"
              alt="Event Image 2"
              width={100}
              height={100}
              className="w-24 h-24 object-cover rounded-full"
            />
          </div>
          <p>Join a club that matches your interests and passions.</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 modecard p-5 rounded-3xl h-72">
          <div className="p-10 rounded-full overflow-hidden">
            <Image
              src="/path/to/image3.jpg"
              alt="Event Image 3"
              width={100}
              height={100}
              className="w-24 h-24 object-cover rounded-full"
            />
          </div>
          <p>Stay updated with the latest events and activities.</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 modecard p-5 rounded-3xl h-72">
          <div className="p-10 rounded-full overflow-hidden">
            <Image
              src="/path/to/image4.jpg"
              alt="Event Image 4"
              width={100}
              height={100}
              className="w-24 h-24 object-cover rounded-full"
            />
          </div>
          <p>Explore new opportunities and experiences.</p>
        </div>
      </section>
      <section className="flex items-center justify-between space-x-5">
        <div className="text-5xl font-bold text-center space-y-1">
          <p>T</p>
          <p>O</p>
          <p>P</p>
          <p>-</p>
          <p>3</p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 items-center justify-center text-center  text-sm">
          <div className="flex flex-col items-center justify-center space-y-2 p-5 rounded-3xl h-72">
            <div className="p-10 rounded-full overflow-hidden">
              <Image
                src="https://www.finiteloop.co.in/_next/image?url=%2Fimages%2Fflc-logo-crop.png&w=1920&q=75"
                alt="Finite Loop Club"
                width={100}
                height={100}
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
            <p>Finite Loop Club</p>
            <p>Elite Coding Club</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 p-5 rounded-3xl h-72 text-sm">
            <div className="p-10 rounded-full overflow-hidden">
              <Image
                src="https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=640&crop=smart&auto=webp&s=22ed6cc79cba3013b84967f32726d087e539b699"
                alt="Computer Society of India"
                width={100}
                height={100}
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
            <p>Computer Society of India</p>
            <p>IT and Non IT</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 p-5 rounded-3xl h-72 text-sm">
            <div className="p-10 rounded-full overflow-hidden">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/HackerEarth_logo.png/800px-HackerEarth_logo.png"
                alt="Samvada"
                width={100}
                height={100}
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
            <p>Samvada</p>
            <p>Let's talk!</p>
          </div>
        </div>
      </section>
      <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
      <HomeEvents />
    </main>
  );
}
