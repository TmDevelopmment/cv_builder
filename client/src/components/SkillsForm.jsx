import { Plus, Sparkle, X } from "lucide-react";
import { useState } from "react";

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() === "") return;
    onChange([...data, newSkill.trim()]);
    setNewSkill("");
  };

  const removeSkill = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          Skills
        </h3>
        <p className="text-sm text-gray-500">
          Add your relevant skills to showcase your expertise.
        </p>
      </div>

      <div className="flex gap-2">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a skill and press Enter"
          className="flex-1 px-3 py-2 text-sm"
        />
        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div>
          <Sparkle className="size-6 mx-auto mb-4 text-gray-400" />
          <p>No skills added yet.</p>
          <p className="text-sm">
            Start by adding your first skill above.
          </p>
        </div>
      )}

      <div className="p-4 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Focus on skills that are relevant to the job you're applying for. Include a mix of hard skills (technical abilities) and soft skills (interpersonal qualities) to give a well-rounded view of your capabilities.
        </p>
      </div>
    </div>
  );
};

export default SkillsForm;
