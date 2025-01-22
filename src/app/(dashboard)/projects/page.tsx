import { getProjectsAction } from "@/actions/actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import ProjectActions from "@/components/ProjectActions";
import { Project } from "@/interface";

async function getProjects() {
  const projects = await getProjectsAction();
  return projects?.data;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="bg-neutral-800 p-5 rounded-2xl">
      <h2 className="text-2xl font-bold mb-5 text-white">Projects</h2>
      <Table>
        <TableCaption>A list of projects.</TableCaption>
        <TableHeader>
          <TableRow className="bg-zinc-900/60 text-sm hover:bg-zinc-900/60 text-white">
            <TableHead className="rounded-l-lg pl-5">Image</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-left rounded-r-lg">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project) => (
            <TableRow key={project._id} className="text-white font-semibold">
              <TableCell className="pl-5">
                <Image
                  src={project.image || ""}
                  alt="project image"
                  width={100}
                  height={100}
                  className="size-12"
                />
              </TableCell>
              <TableCell>{project.projectName}</TableCell>
              <TableCell>{project.clientName}</TableCell>
              <TableCell>{project.tags.join(", ")}</TableCell>
              <TableCell>
                <ProjectActions project={project as Project} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
