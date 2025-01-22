"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UpdateProjectModal from "@/components/UpdateProjectModal";
import { Project } from "@/interface";

interface ProjectActionsProps {
  project: Project;
}

export default function ProjectActions({ project }: ProjectActionsProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline">View</Button>
        <Button variant="default" onClick={() => setIsUpdateModalOpen(true)}>
          Edit
        </Button>
        <Button variant="destructive">Delete</Button>
      </div>

      <UpdateProjectModal
        project={project}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      />
    </>
  );
}
