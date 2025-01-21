import Image from "next/image";
import Quote from "../../../public/assets/quote.png";

export function TestimonialSection() {
  return (
    <section className="py-24 text-white relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-bold">Testimonial</h2>
          <div className="flex gap-2">
            <Image src={Quote} alt="quote" height={150} width={150} />
          </div>
        </div>
        <div className="max-w-3xl">
          <p className="text-neutral-400 text-lg leading-tight">
            Aaron&apos;s eye helps me to work with from start to finish. We were
            looking for a simple, clean yet logo and professional brand identity
            for a new client dining. I enjoyed working with him from the first
            call. His process was thorough and helped us get to the final
            product efficiently. The client was happy with the end result and I
            can&apos;t thank Aaron enough for his effort and professionalism. I
            would recommend him to anyone looking for a logo.
          </p>
          <p className="mt-6 text-white text-2xl">- Martin lee</p>
        </div>
      </div>

      <div className="w-[200px] h-[80px] absolute top-44 -left-16 xl:left-10 bg-white blur-[100px] opacity-60 hidden lg:block"></div>
    </section>
  );
}
