import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the project
    console.log("New project:", projectForm);
    // Navigate back to projects list
    navigate("/dashboard/projects");
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            value={projectForm.name}
            onChange={(e) =>
              setProjectForm({ ...projectForm, name: e.target.value })
            }
            className="mt-1 w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={projectForm.description}
            onChange={(e) =>
              setProjectForm({ ...projectForm, description: e.target.value })
            }
            className="mt-1 w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
