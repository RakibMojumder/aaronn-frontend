import Image from "next/image";
import aboutImg from "../../../../public/assets/about.png";
import aboutMeImg from "../../../../public/assets/about-2.png";

export default function AboutPage() {
  return (
    <div className="container mx-auto min-h-screen text-white px-4 pt-16 pb-28 relative">
      <div className="w-[200px] h-[80px] absolute top-28 -left-16 xl:left-10 bg-white blur-[100px] opacity-60 hidden lg:block"></div>
      {/* Header Section */}

      <h1 className="text-3xl md:text-5xl font-semibold mb-2">About Me</h1>
      <p className="text-gray-400 mb-24">Little Brief About Myself</p>

      <hr className="py-10 border-neutral-600" />

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-24">
        <div>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            My mission
            <br />
            is to make
            <br />
            design
            <br />
            easier.
          </h2>
        </div>
        <div className="flex items-center">
          <p className="text-gray-400 text-lg">
            Create custom Designs with AARONN that converts more visitors than
            any website. With lots of unique design, you can easily select a
            logo without hassle. Create custom landing logos with AARONN that
            converts more visitors than any website. With lots of revisions, you
            can easily build a logo without porblem.
          </p>
        </div>
      </div>

      {/* Images Section */}
      <div className="relative mb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6 lg:col-span-4">
            <Image
              src={aboutImg}
              alt="Portrait 1"
              width={500}
              height={500}
              className="w-full aspect-square object-cover h-[500px]"
            />
          </div>
          <div className="md:col-span-6 lg:col-span-8">
            <Image
              src={aboutMeImg}
              alt="Portrait 2"
              width={500}
              height={500}
              className="w-full aspect-square object-cover h-[500px]"
            />
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div>
        <h3 className="text-3xl md:text-4xl font-bold mb-8">Follow me on:</h3>
        <div className="flex items-center justify-between flex-wrap gap-4">
          {["DRIBBBLE", "TWITTER", "FACEBOOK", "INSTAGRAM"].map((platform) => (
            <span
              key={platform}
              className="text-2xl text-gray-400 hover:text-white transition-colors"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
