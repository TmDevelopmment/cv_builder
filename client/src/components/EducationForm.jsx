import { Plus, GraduationCap, Trash2, Sparkles } from "lucide-react";

const EducationForm = ({data, onChange}) => {

    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            subject: "",
            graduation_date: "",
            gpa: "",
            isPresent: false,
            description: "",
        };
        onChange([...data, newEducation]);
    }

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    }

    const updateEducation = (index, field, value) => {
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
                Education
            </h3>
            <p className="text-sm text-gray-500">
                Add your educational background
            </p>
        </div>
        <button 
            className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
            onClick={addEducation}
        >
            <Plus className="size-4"/>
            Add Education
        </button>
      </div>
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
            <GraduationCap className="size-6 mx-auto mb-4"/>
            <p>No education added yet.</p>
            <p>Click the "Add Education" button to add your first education.</p>
        </div>
      ) : (
        <div>
            {data.map((edu, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                        <h4>Education #{index + 1}</h4>
                        <button onClick={()=> removeEducation(index)}>
                            <Trash2 className="size-4"/>
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                        <input 
                            value={edu.institution || ""}
                            onChange={(e) => updateEducation(index, "institution", e.target.value)}
                            placeholder="Institution"
                            className="px-3 py-2 text-sm rounded-lg"
                        />
                        <input 
                            value={edu.degree || ""}
                            onChange={(e) => updateEducation(index, "degree", e.target.value)}
                            placeholder="Degree (e.g. Bachelor of Science)"
                            className="px-3 py-2 text-sm rounded-lg"
                        />
                        <input 
                            value={edu.field || ""}
                            onChange={(e) => updateEducation(index, "field", e.target.value)}
                            placeholder="Field of Study (e.g. Computer Science)"
                            className="px-3 py-2 text-sm rounded-lg"
                        />
                        <input 
                            type="month"
                            value={edu.graduation_date || ""}
                            onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                            placeholder="Graduation Date"
                            className="px-3 py-2 text-sm rounded-lg"
                        />
                        
                    </div>

                    <input
                        value={edu.gpa || ""}
                        onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                        placeholder="GPA (optional)"
                        className="w-full px-3 py-2 text-sm rounded-lg"
                    />

                    <label className="flex items-center mt-2">
                        <input 
                            type="checkbox"
                            checked={edu.is_current || false}
                            onChange={(e) => updateEducation(index, "is_current", e.target.checked ? true : false)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Current Education</span>
                    </label>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <label htmlFor="">
                                Education Description
                            </label>
                            <button className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                                <Sparkles className="w-3 h-3"/>
                                Enhance with AI
                            </button>
                        </div>
                        <textarea
                            value={edu.description || ""}
                            onChange={(e) => updateEducation(index, "description", e.target.value)}
                            placeholder="Description of your education, responsibilities, achievements, etc."
                            className="w-full h-40 text-sm px-3 py-2 rounded-lg"
                        />  
                    </div>
                    
                </div>

            ))}
        </div>
      )}
    </div>
  )
}

export default EducationForm