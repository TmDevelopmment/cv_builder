import { Loader2, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../../configs/api";
import { toast } from "react-hot-toast";
import { useState } from "react";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  console.log("setResumeData prop:", setResumeData);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      const prompt = `Generate a professional summary for a resume based on the following information: "${data}"`;
      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        {
          userContent: prompt,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      console.log("AI response:", response.data);
      setResumeData((prev) => ({
        ...prev,
        professionalSummary: response.data.userContent,
      }));
      toast.success("Professional summary enhanced successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary for your resume here
          </p>
        </div>
        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="size-4" />
              {isGenerating ? "Generating..." : "Enhance with AI"}
            </>
          )}
        </button>
      </div>

      <div className="mt-6">
        <textarea
          value={data || ""}
          rows={4}
          onChange={(e) => onChange(e.target.value)}
          name="professionalSummary"
          id="professionalSummary"
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
        />
        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center mt-4">
          Tip: Keep it concise (3-4 sentences) and focus on your most relevant
          achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
