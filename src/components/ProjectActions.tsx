"use client";
import { useState } from "react";
import UpdateProjectModal from "@/components/UpdateProjectModal";
import { Project } from "@/interface";
import Link from "next/link";

interface ProjectActionsProps {
  project: Project;
}

export default function ProjectActions({ project }: ProjectActionsProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          href={`/projects/${project._id}`}
          className="bg-orange-900/20 py-1.5 px-4 rounded-lg text-xs font-medium text-orange-500 border border-orange-500/40"
        >
          Detail
        </Link>
        <button
          className="bg-blue-900/20 py-1.5 px-4 rounded-lg text-xs font-medium text-blue-500 border border-blue-500/40"
          onClick={() => setIsUpdateModalOpen(true)}
        >
          Edit
        </button>
        <button className="bg-red-900/20 py-1.5 px-4 rounded-lg text-xs font-medium text-red-500 border border-red-500/40">
          Delete
        </button>
      </div>

      <UpdateProjectModal
        project={project}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      />
    </>
  );
}
