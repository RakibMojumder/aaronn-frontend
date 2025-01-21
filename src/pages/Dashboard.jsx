import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProjectList from "./ProjectList";
import AddProject from "./AddProject";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-8">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/dashboard/projects"
              className="text-blue-600 hover:text-blue-800"
            >
              All Projects
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/add-project"
              className="text-blue-600 hover:text-blue-800"
            >
              Add Project
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="projects" element={<ProjectList />} />
        <Route path="add-project" element={<AddProject />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
