import HomeEvents from "@/components/HomeEvents";

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
          <div className="radial-gradient bg-gradient-to-r from-red-500 to-yellow-500 p-10 rounded-full"></div>
          <p>Events are a great way to meet new people and make new friends.</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 modecard p-5 rounded-3xl h-72">
          <div className="radial-gradient bg-gradient-to-r from-red-500 to-yellow-500 p-10 rounded-full"></div>
          <p>There are 30+ clubs in Nitte that cater to all interests.</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 modecard p-5 rounded-3xl h-72">
          <div className="radial-gradient bg-gradient-to-r from-red-500 to-yellow-500 p-10 rounded-full"></div>
          <p>Explore clubs and events that interest you.</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 modecard p-5 rounded-3xl h-72">
          <div className="radial-gradient bg-gradient-to-r from-red-500 to-yellow-500 p-10 rounded-full"></div>
          <p>
            Get notifications for events you are interested in and never miss
            out.
          </p>
        </div>
      </section>
      <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 items-center justify-center text-center text-lg">
        <div className="flex flex-col items-center justify-center space-y-2  p-5 rounded-3xl h-72">
          <div className="radial-gradient bg-gradient-to-r from-red-500 to-yellow-500 p-10 rounded-full"></div>
          <p>Finite Loop Club</p>
          <p>Elite Coding Club</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2  p-5 rounded-3xl h-72">
          <div className="radial-gradient bg-gradient-to-r from-red-500 to-yellow-500 p-10 rounded-full"></div>
          <p>Computer Society of India</p>
          <p>IT and Non IT</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2  p-5 rounded-3xl h-72">
          <div className="radial-gradient bg-gradient-to-r from-red-500 to-yellow-500 p-10 rounded-full"></div>
          <p>Samvada</p>
          <p>Let's talk!</p>
        </div>
      </section>
      <h1 className="text-4xl font-bold text-center">Upcoming Events</h1>
      <HomeEvents />
    </main>
  );
}
