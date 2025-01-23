"use client";
import { deleteProjectAction } from "@/actions/actions";
import { Project } from "@/interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface DeleteProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteProjectModal({
  project,
  isOpen,
  onClose,
}: DeleteProjectModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteProjectAction(project._id);
      if (result.success) {
        router.refresh();
        onClose();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-900 text-white border-neutral-700">
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Are you sure you want to delete &quot;{project.projectName}&quot;?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Project"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
