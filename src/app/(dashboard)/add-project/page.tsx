"use client";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ProjectFormValues, projectSchema } from "@/lib/validations/project";
import { FileUpload } from "@/components/FileUpload";
import MultiSelect from "@/components/MultiSelect";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { createProjectAction, uploadFileAction } from "@/actions/actions";
import { toast } from "sonner";
import { ProjectData } from "@/interface";
import { Button } from "@/components/ui/button";

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

// Dynamically import TextEditor with SSR disabled
const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
});

export default function AddProjectPage() {
  const router = useRouter();
  const [editorContent, setEditorContent] = useState({});
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [projectImage, setProjectImage] = useState<File | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      clientName: "",
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      if (!projectImage) {
        return toast.error("Please upload a project image");
      }

      if (selectedTags.length === 0) {
        return toast.error("Please select at least one tag");
      }

      const formData = new FormData();
      formData.append("file", projectImage as File);
      const response = await uploadFileAction(formData);

      if (response.error) {
        return toast.error(response.error);
      }

      const tags = selectedTags.map((tag) => tag.value);

      const projectData = {
        ...data,
        tags,
        description: editorContent,
        image: response.url,
      };

      const result = await createProjectAction(projectData as ProjectData);
      if (result?.error) {
        return toast.error(result.error);
      }

      toast.success("Project created successfully");
      router.push("/projects");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="h-fit w-full">
      <div className="w-full bg-neutral-800 p-6 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-6">Create New Project</h1>

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
              />
            </div>
          </div>

          <TextEditor onChange={setEditorContent} />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 bg-white text-black border border-gray-300 hover:bg-neutral-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
