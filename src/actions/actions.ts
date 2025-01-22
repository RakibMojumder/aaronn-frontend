"use server";

import { ApiResponse, Project, ProjectData } from "@/interface";
import { encrypt, login } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from 'next/cache';

// Login action
export async function loginAction(formData: FormData) {
  try {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    // Validate email and password
    if (!email || !password) {
      return { error: "Email and password are required." };
    }

    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: ApiResponse<{ token: string }> = await response.json();

    // Check for HTTP errors
    if (!response.ok) {
      return { error: data.message || "Login failed." };
    }

    // Check for missing or invalid token
    if (!data.success || !data.data?.token) {
      return { error: "Invalid credentials." };
    }

    // Encrypt the token securely
    const session = await encrypt({ token: data.data.token });
    await login(session);

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}

// Logout action
export async function logoutAction() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}

// Upload file action
export async function uploadFileAction(formData: FormData) {
  try {
    // Get the session token for authentication
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
      return { error: "Authentication required" };
    }

    // Get the file from formData
    const file = formData.get("file") as File;

    if (!file) {
      return { error: "No file selected" };
    }

    const apiFormData = new FormData();
    apiFormData.append("file", file);

    const response = await fetch("http://localhost:5000/file-upload/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.value}`,
      },
      body: apiFormData,
    });

    const data: ApiResponse<{ url: string }> = await response.json();

    if (!response.ok) {
      return { error: data.message || "Upload failed" };
    }

    if (!data.success || !data.data?.url) {
      return { error: "File upload failed" };
    }

    return { success: true, url: data.data.url };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: "An unexpected error occurred during upload",
    };
  }
}

// Create project action
export async function createProjectAction(projectData: ProjectData) {
  "use server";

  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
      return { error: "Authentication required" };
    }

    const response = await fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.value}`,
      },
      body: JSON.stringify(projectData),
    });

    const data: ApiResponse<Project> = await response.json();

    if (data.success) {
      revalidateTag('projects');
    }

    return data;
  } catch (error) {
    console.error("Error creating project:", error);
  }
}

// Get projects action
export async function getProjectsAction() {
  "use server";
  try {
    const response = await fetch("http://localhost:5000/projects", {
      method: "GET",
      next: {
        tags: ['projects']
      }
    });

    const data: ApiResponse<Project[]> = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting projects:", error);
  }
}

export async function updateProjectAction(projectData: Project) {
  "use server";
  try {
    const response = await fetch(
      `http://localhost:5000/projects/${projectData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update project");
    }

    revalidateTag('projects');
    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return { error: "Failed to update project" };
  }
}

export async function deleteProjectAction(projectId: string) {
  "use server";
  try {
    const response = await fetch(
      `http://localhost:5000/projects/${projectId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }

    revalidateTag('projects');
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { error: "Failed to delete project" };
  }
}
