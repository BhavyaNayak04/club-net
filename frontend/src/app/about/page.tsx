import Link from "next/link";

export default function About() {
  return (
    <section className="content-container space-y-10 min-h-screen">
      <p className="text-lg text-justify">
        ClubNet is your one-stop destination for all events happening in Nitte.
        We have a wide range of clubs that cater to all interests. Whether you
        are interested in coding, dancing, or even debating, we have a club for
        you. Our platform allows you to stay up to date with all the events
        happening in Nitte.
      </p>
      <p className="text-lg text-justify">
        Whether you are interested in coding, dancing, or even debating, we have
        a club for you. Our platform allows you to stay up to date with all the
        events happening in Nitte. Stay in the Loop. Never Miss a Beat. Discover
        Nitte’s Vibrant Events.
      </p>
      <p className="text-lg text-justify">Explore Various Clubs here.</p>
      <Link href="/clubs">Clubs</Link>

      <p className="text-lg text-justify">Explore Various Events here.</p>
      <Link href="/events">Events</Link>
    </section>
  );
}
