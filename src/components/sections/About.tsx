import Image from "next/image";
import { Button } from "@/components/ui/button";
import aboutImg from "../../../public/assets/about.png";

export function AboutSection() {
  return (
    <section className="py-24 text-white relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-12 items-center">
          <div className="col-span-7">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let&apos;s get know
              <br />
              about me closer
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg">
              A brand designer specializing in visual communication, branding,
              and visual identity. Her portfolio showcases her wide range of
              work, spanning books, posters and web design.
            </p>
            <Button>Discover More About Me</Button>
          </div>
          <div className="relative col-span-5">
            <div className="aspect-square rounded-3xl overflow-hidden relative">
              <Image
                src={aboutImg}
                alt="My image"
                width={500}
                height={500}
                className="object-cover w-full"
              />
            </div>
            <div className="h-44 w-14 border border-primary rounded-full absolute bottom-20 -left-8 hidden md:block"></div>
            <div className="h-9 w-[110px] border border-primary rounded-full absolute -top-6 right-0 hidden md:block"></div>
          </div>
        </div>
      </div>

      <div className="w-[200px] h-[80px] absolute top-44 -left-16 xl:left-10 bg-white blur-[100px] opacity-60 hidden lg:block"></div>
    </section>
  );
}
