import HomeEvents from "@/components/HomeEvents";
import Filler from "@/components/Filler";
import Top3 from "@/components/top3";

export default function Home() {
  return (
    <main className="content-container space-y-10">
      <section className="space-y-3 text-justify py-8">
        <h1 className="text-4xl font-bold">Welcome to Club Net!</h1>
        <p className="text-md">
          Stay in the Loop. Never Miss a Beat. Discover Nitte’s Vibrant Events.
        </p>
        <p className="text-md">
          ClubNet is your one-stop destination for all events happening in
          Nitte. We have a wide range of clubs that cater to all interests.
          Whether you are interested in coding, dancing, or even debating, we
          have a club for you. Our platform allows you to stay up to date with
          all the events happening in Nitte.
        </p>
      </section>
      <Filler />
      <Top3 />
      <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
      <HomeEvents />
    </main>
  );
}
