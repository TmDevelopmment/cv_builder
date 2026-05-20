import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";

const ExperienceForm = ({ data, onChange }) => {

    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false,
        };
        onChange([...data, newExperience]);
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    }

    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = {
            ...updated[index],
            [field]: value,
        };
        onChange(updated);
    }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h3 className="flex items-center gap-2 text-lg">
                Professional Experience
            </h3>
            <p className="text-sm text-gray-500">
                Add your job experience
            </p>
        </div>
        <button 
            className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
            onClick={addExperience}
        >
            <Plus className="size-4"/>
            Add Experience
        </button>
      </div>
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
            <Briefcase className="size-6 mx-auto mb-4"/>
            <p>No experience added yet.</p>
            <p>Click the "Add Experience" button to add your first experience.</p>
        </div>
      ) : (
        <div>
            {data.map((exp, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                        <h4>Experience #{index + 1}</h4>
                        <button onClick={()=> removeExperience(index)}>
                            <Trash2 className="size-4"/>
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                        <input 
                            value={exp.company || ""}
                            onChange={(e) => updateExperience(index, "company", e.target.value)}
                            placeholder="Company"
                            className="px-3 py-2 text-sm rounded-lg"
                        />
                        <input 
                            value={exp.position || ""}
                            onChange={(e) => updateExperience(index, "position", e.target.value)}
                            placeholder="Position"
                            className="px-3 py-2 text-sm rounded-lg"
                        />
                        <input 
                            type="date"
                            value={exp.start_date || ""}
                            onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                            placeholder="Start Date"
                            className="px-3 py-2 text-sm rounded-lg"
                        />
                        <input 
                            type="month"
                            value={exp.end_date || ""}
                            onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                            placeholder="End Date"
                            className="px-3 py-2 text-sm rounded-lg"
                        />
                        
                    </div>
                    <label className="flex items-center mt-2">
                        <input 
                            type="checkbox"
                            checked={exp.is_current || false}
                            onChange={(e) => updateExperience(index, "is_current", e.target.checked ? true : false)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Current Job</span>
                    </label>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <label htmlFor="">
                                Job Description
                            </label>
                            <button className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                                <Sparkles className="w-3 h-3"/>
                                Enhance with AI
                            </button>
                        </div>
                        <textarea
                            value={exp.description || ""}
                            onChange={(e) => updateExperience(index, "description", e.target.value)}
                            placeholder="Description of your role, responsibilities, achievements, etc."
                            className="w-full h-40 text-sm px-3 py-2 rounded-lg"
                        />  
                    </div>
                    
                </div>

            ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
