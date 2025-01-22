"use client";
import dynamic from "next/dynamic";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectFormValues, projectSchema } from "@/lib/validations/project";
import { FileUpload } from "@/components/FileUpload";
import MultiSelect from "@/components/MultiSelect";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { updateProjectAction, uploadFileAction } from "@/actions/actions";
import { toast } from "sonner";
import { Project } from "@/interface";
import { Button } from "./ui/button";

// Dynamically import TextEditor with SSR disabled
const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
});

type Option = {
  value: string;
  label: string;
};

const tagOptions = [
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Property Portal", label: "Property Portal" },
  { value: "E-commerce", label: "E-commerce" },
  { value: "Digital Products", label: "Digital Products" },
  { value: "Development", label: "Development" },
  { value: "Mobile Apps", label: "Mobile Apps" },
  { value: "Web Development", label: "Web Development" },
  { value: "Cloud Solutions", label: "Cloud Solutions" },
  { value: "AI/ML", label: "AI/ML" },
  { value: "Blockchain", label: "Blockchain" },
  { value: "SEO", label: "SEO" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Software Engineering", label: "Software Engineering" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Data Science", label: "Data Science" },
];

interface UpdateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export default function UpdateProjectModal({
  isOpen,
  onClose,
  project,
}: UpdateProjectModalProps) {
  const [editorContent, setEditorContent] = useState(project.description || {});
  const [selectedTags, setSelectedTags] = useState<Option[]>(
    project.tags.map((tag) => ({ value: tag, label: tag }))
  );
  const [projectImage, setProjectImage] = useState<File | undefined>();
  const [currentImageUrl, setCurrentImageUrl] = useState(project.image);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: project.projectName,
      clientName: project.clientName,
    },
  });

  useEffect(() => {
    if (project) {
      reset({
        projectName: project.projectName,
        clientName: project.clientName,
      });
      setSelectedTags(project.tags.map((tag) => ({ value: tag, label: tag })));
      setEditorContent(project.description || {});
      setCurrentImageUrl(project.image);
    }
  }, [project, reset]);

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      if (selectedTags.length === 0) {
        return toast.error("Please select at least one tag");
      }

      let imageUrl = currentImageUrl;

      if (projectImage) {
        const formData = new FormData();
        formData.append("file", projectImage);
        const response = await uploadFileAction(formData);

        if (response.error) {
          return toast.error(response.error);
        }
        imageUrl = response.url;
      }

      const tags = selectedTags.map((tag) => tag.value);

      const projectData = {
        ...data,
        _id: project._id,
        tags,
        description: editorContent,
        image: imageUrl,
      };

      const result = await updateProjectAction(projectData);

      if (result.error) {
        return toast.error(result.error);
      }

      toast.success("Project updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto bg-neutral-800 p-6 md:p-10 text-white border-neutral-700">
        <DialogTitle className="text-2xl font-bold mb-6">
          Update Project
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="projectName" className="text-sm font-medium">
                  Project Name
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Enter project name"
                  className="h-12 bg-transparent border-white/10 focus:border-primary focus:outline-none"
                  {...register("projectName")}
                />
                {errors.projectName && (
                  <p className="text-red-500 text-sm">
                    {errors.projectName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="clientName" className="text-sm font-medium">
                  Client Name
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Enter client name"
                  className="h-12 bg-transparent border-white/10 focus:border-primary focus:outline-none"
                  {...register("clientName")}
                />
                {errors.clientName && (
                  <p className="text-red-500 text-sm">
                    {errors.clientName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Project Tags</label>
                <MultiSelect
                  options={tagOptions}
                  selected={selectedTags}
                  onChange={setSelectedTags}
                  placeholder="Select tags..."
                  className="bg-transparent w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <FileUpload
                acceptedTypes={["image/jpeg", "image/png"]}
                maxSizeMB={5}
                onUpload={(file) => setProjectImage(file)}
                onRemoveFile={() => setProjectImage(undefined)}
                label="Upload project image"
                fileTypeDescription="Supports: JPEG, PNG"
                className="w-full"
                currentImage={currentImageUrl}
              />
            </div>
          </div>

          <TextEditor
            onChange={setEditorContent}
            initialContent={project.description}
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white text-black border border-gray-300 hover:bg-neutral-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
