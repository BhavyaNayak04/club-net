"use client";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Home() {
  const { id } = useParams();
  return (
    <div className="">
      <p>Hi from {id}!</p>
      <p>Digital Hunt!</p>
      <p>
        <a href="https://finiteloop.co.in" className="underline">
          Visit their website
        </a>
      </p>
      <main className="flex flex-col justify-center items-center space-y-10 text-justify">
        <div className="flex justify-between items-center gap-4">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/5e10bdc20efb8f0d169f85f9/09943d85-b8c7-4d64-af31-1a27d1b76698/arrow.png?format=1500w"
            alt="Vercel Logo"
            width={500}
            height={500}
          />
          <p>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            'Content here, content here', making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search for 'lorem ipsum'
            will uncover many web sites still in their infancy. Various versions
            have evolved over the years, sometimes by accident, sometimes on
            purpose (injected humour and the like).
          </p>
        </div>
        <h3 className="text-3xl">Upcoming Events</h3>
      </main>
    </div>
  );
}
