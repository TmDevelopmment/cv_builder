import { Plus, Trash2, Sparkles, Briefcase } from "lucide-react";
const ProjectForm = ({ data = [], onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
      start_date: "",
      end_date: "",
      is_current: false,
      link: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg">Projects</h3>
          <p className="text-sm text-gray-500">Add your projects</p>
        </div>
        <button
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
          onClick={addProject}
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>
      
        <div>
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-center">
                <h4>Project #{index + 1}</h4>
                <button onClick={() => removeProject(index)}>
                  <Trash2 className="size-4 text-red-500" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  placeholder="Project Name"
                  className="w-full px-3 py-2 text-sm rounded-lg"
                />
                <input
                  value={project.type || ""}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  placeholder="Project Type (e.g., Personal, Academic, Professional)"
                  className="w-full px-3 py-2 text-sm rounded-lg"
                />
                <input
                  type="date"
                  value={project.start_date || ""}
                  onChange={(e) =>
                    updateProject(index, "start_date", e.target.value)
                  }
                  placeholder="Start Date"
                  className="px-3 py-2 text-sm rounded-lg"
                />
                <input
                  type="month"
                  value={project.end_date || ""}
                  onChange={(e) =>
                    updateProject(index, "end_date", e.target.value)
                  }
                  placeholder="End Date"
                  className="px-3 py-2 text-sm rounded-lg"
                />
              </div>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={project.is_current || false}
                  onChange={(e) =>
                    updateProject(
                      index,
                      "is_current",
                      e.target.checked ? true : false,
                    )
                  }
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Current Project
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <label htmlFor="">Project Description</label>
                  <button className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                    <Sparkles className="w-3 h-3" />
                    Enhance with AI
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  placeholder="Description of your role, responsibilities, achievements, etc."
                  className="w-full text-sm px-3 py-2 rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default ProjectForm;
