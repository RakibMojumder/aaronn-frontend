import { getOtherProjectsAction } from "@/actions/actions";
import Image from "next/image";
import Link from "next/link";

const getOtherProjects = async (id: string) => {
  const projects = await getOtherProjectsAction(id);
  return projects;
};

const OtherProjects = async ({ id }: { id: string }) => {
  const projects = await getOtherProjects(id);

  return (
    <div className="py-10 mt-20">
      <h2 className="text-2xl md:text-4xl font-semibold mb-10 text-center">
        Other Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects?.data?.map((project) => (
          <Link
            href={`/project/${project._id}`}
            key={project._id}
            className="pb-5"
          >
            <div>
              <Image
                src={project.image || ""}
                alt={project.projectName}
                width={400}
                height={400}
                className="rounded-lg w-full h-full object-cover"
              />
              <h3 className="text-xl font-semibold mt-5">
                {project.projectName}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OtherProjects;
