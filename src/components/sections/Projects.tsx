import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getProjectsAction } from "@/actions/actions";
import Link from "next/link";

const getProjects = async () => {
  const projects = await getProjectsAction();
  return projects;
};

export async function ProjectsSection() {
  const projects = await getProjects();

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
          {projects?.data?.map((project) => (
            <Link href={`/project/${project._id}`} key={project._id}>
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image
                  src={project.image || ""}
                  alt="Project Image"
                  width={600}
                  height={600}
                  className="w-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">
                  {project.projectName}
                </h3>
                <p className="text-sm text-gray-400 flex items-center gap-4">
                  <span className="w-12">Client: </span>
                  <span className="text-white">{project.clientName}</span>
                </p>

                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-400 w-12">Work:</p>
                  <div className="flex gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-sm text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
