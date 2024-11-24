import Image from "next/image";
export default function Filler() {
  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-5 items-center justify-center text-center">
      <div className="flex flex-col items-center justify-center space-y-6 modecard p-5 rounded-3xl h-72">
        <div className="p-5 rounded-full overflow-hidden">
          <Image
            src="https://www.eventbrite.com/blog/wp-content/uploads/2022/11/image1-min-1.png"
            alt="Event Image 1"
            width={100}
            height={100}
            className="w-24 h-24 object-cover rounded-full"
          />
        </div>
        <p>Events are a great way to meet new people & friends.</p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-6 modecard p-5 rounded-3xl h-72">
        <div className="p-5 rounded-full overflow-hidden">
          <Image
            src="https://images.stockcake.com/public/f/a/d/fad75f3a-35ed-43a5-8a66-39990cf3c1bf_large/campus-student-gathering-stockcake.jpg"
            alt="Event Image 2"
            width={100}
            height={100}
            className="w-24 h-24 object-cover rounded-full"
          />
        </div>
        <p>Join a club that matches your passions.</p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-6 modecard p-5 rounded-3xl h-72">
        <div className="p-5 rounded-full overflow-hidden">
          <Image
            src="https://media.istockphoto.com/id/1218975473/photo/group-of-college-student-friends-meeting-and-talking-in-busy-communal-campus-building.jpg?s=612x612&w=0&k=20&c=ggYncioFDbZjXryC923y3Jmdc3uNFAsmZML-ftZYXYI="
            alt="Event Image 3"
            width={100}
            height={100}
            className="w-24 h-24 object-cover rounded-full"
          />
        </div>
        <p>Stay updated with the latest events and activities.</p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-6 modecard p-5 rounded-3xl h-72">
        <div className="p-5 rounded-full overflow-hidden">
          <Image
            src="https://images.stockcake.com/public/5/a/4/5a41b7bb-d366-448a-9d27-27cf0ca27df6_large/students-enjoying-outdoors-stockcake.jpg"
            alt="Event Image 4"
            width={100}
            height={100}
            className="w-24 h-24 object-cover rounded-full"
          />
        </div>
        <p>Explore new opportunities and experiences.</p>
      </div>
    </section>
  );
}
