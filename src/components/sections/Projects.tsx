import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import projectImg from "../../../public/assets/project.png";

const projects = [
  {
    title: "Brand Journey Improvements",
    categories: ["Branding", "Logo Design"],
    image: projectImg,
  },
  {
    title: "Brand Grouping",
    categories: ["Branding", "Logo Design"],
    image: projectImg,
  },
  {
    title: "NFT Glimps",
    categories: ["Portfolio", "NFT Design"],
    image: projectImg,
  },
  {
    title: "Brand Suggestions",
    categories: ["13", "NFT Logo"],
    image: projectImg,
  },
];

export function ProjectsSection() {
  return (
    <section className="py-24 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">My Projects Highlight</h2>
          <Button
            variant="outline"
            className="text-white mt-10 rounded-full text-xs tracking-[3px] h-16"
          >
            EXPLORE MORE <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative">
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={600}
                  className="w-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <div className="flex gap-2">
                  {project.categories.map((category, idx) => (
                    <span key={idx} className="text-sm text-gray-400">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
