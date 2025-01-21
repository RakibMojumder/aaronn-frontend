import React, { useState } from "react";

const ProjectList = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Project 1", description: "Description 1" },
    { id: 2, name: "Project 2", description: "Description 2" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", description: "" });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditForm({ name: project.name, description: project.description });
  };

  const handleSave = (id) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, ...editForm } : project
      )
    );
    setEditingId(null);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div key={project.id} className="border p-4 rounded">
            {editingId === project.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={() => handleSave(project.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold">{project.name}</h3>
                <p className="text-gray-600">{project.description}</p>
                <button
                  onClick={() => handleEdit(project)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
