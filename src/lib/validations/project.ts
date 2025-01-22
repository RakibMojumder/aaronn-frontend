import * as z from "zod";

export const projectSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  clientName: z.string().min(1, "Client name is required"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
