import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center text-white pt-16">
      <div className="container mx-auto px-4 text-center relative">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Adaptive Logo Design
          <br />
          for Your Brand
        </h1>
        <Button className="hover:bg-orange-600 text-white h-16 px-10 py-6 rounded-full text-xs tracking-[3px]">
          EXPLORE MORE <ArrowRight />
        </Button>

        <div className="w-[200px] h-[80px] absolute top-5 right-64 bg-white blur-[100px] opacity-60 hidden lg:block"></div>
      </div>
    </section>
  );
}
