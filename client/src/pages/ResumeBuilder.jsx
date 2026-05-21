import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { useSelector } from "react-redux";
import api from "../../configs/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    templates: "classic",
    assent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async (resumeId) => {
    // const resume = dummyResumeData.find((res) => res._id === resumeId);
    // if (resume) {
    //   setResumeData(resume);
    //   document.title = resume.title;
    // } else {
    //   console.error("Resume not found");
    // }
    try {
      const { data } = await api.get('/api/resumes/get/' + resumeId, {
        headers: {
          Authorization: token
        }
      });
      console.log("Resume data fetched:", data);
      if (data) {
        document.title = data.title;
      }
      setResumeData(data);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    {
      id: "professional_summary",
      name: "Professional Summary",
      icon: FileText,
    },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume(resumeId);
  }, []);

  const changeResumeVisibility = () => {
    // setResumeData({...resumeData, public: !resumeData.public});
    try {

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify({public: !resumeData.public}));

      const { data } = api.put('/api/resumes/update', formData, {
        headers: {
          Authorization: token,
        }
      });
      setResumeData({...resumeData, public: !resumeData.public});
      toast.success(data.message);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if(navigator.share) {
      navigator.share({
        url: resumeUrl,
        text: "Check out my resume!",
      });
    } else {
      alert("Sharing not supported. Copy this link: " + resumeUrl);
    }
  }

  const downloadResume = () => {
    window.print();
  }

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);

      // remove image from updatedResumeData before sending to server
      if(typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === "object" && formData.append("image", resumeData.personal_info.image);

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: {
          Authorization: token,
        }
      });
      setResumeData(data.resume);
      toast.success(data.message);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div>
        <Link
          to={"/app"}
          className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Dashboard
        </Link>
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Resume Editor Section */}
            <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
                {/* progrss bar using activeSectionIndex and sections.length */}
                <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
                <hr
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
                  style={{
                    width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                  }}
                />

                {/* section navigation */}
                <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                  <div className="flex items-center gap-2">
                    <TemplateSelector 
                      selectedTemplate={resumeData.template} 
                      onChange={(template) => setResumeData(prev => ({ ...prev, template}))} 
                    />
                    <ColorPicker 
                      selectedColor={resumeData.assent_color} 
                      onChange={(color) => setResumeData(prev => ({ ...prev, assent_color : color }))} 
                    />
                  </div>
                  <div className="flex items-center">
                    {activeSectionIndex !== 0 && (
                      <button
                        className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                        disabled={activeSectionIndex === 0}
                        onClick={() =>
                          setActiveSectionIndex((prevIndex) =>
                            Math.max(prevIndex - 1, 0),
                          )
                        }
                      >
                        <ChevronLeft className="size-4" />
                        Previous
                      </button>
                    )}
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.min(prevIndex + 1, sections.length - 1),
                        )
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50 cursor-not-allowed'}"
                      disabled={activeSectionIndex === sections.length - 1}
                    >
                      <ChevronRight className="size-4" />
                      Next
                    </button>
                  </div>
                </div>

                {/* form content */}
                <div className="space-y-6">
                  {activeSection.id === "personal" && (
                    <div>
                      <PersonalInfoForm
                        data={resumeData.personal_info}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personal_info: data,
                          }))
                        }
                        removeBackground={removeBackground}
                        setRemoveBackground={setRemoveBackground}
                      />
                    </div>
                    )}
                  {activeSection.id === "professional_summary" && (
                    <div>
                      <ProfessionalSummaryForm
                        data={resumeData.professional_summary}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            professional_summary: data,
                          }))
                        }
                      />
                    </div>
                  )}
                  {activeSection.id === "experience" && (
                    <div>
                      <ExperienceForm
                        data={resumeData.experience}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            experience: data,
                          }))
                        }
                      />
                    </div>
                  )}
                    {activeSection.id === "education" && (
                      <div>
                        <EducationForm
                          data={resumeData.education}
                          onChange={(data) =>
                            setResumeData((prev) => ({
                              ...prev,
                              education: data,
                            }))
                          }
                        />
                      </div>
                    )}
                    {activeSection.id === "projects" && (
                      <div>
                        <ProjectForm
                          data={resumeData.projects}
                          onChange={(data) =>
                            setResumeData((prev) => ({
                              ...prev,
                              projects: data,
                            }))
                          }
                        />
                      </div>
                    )}
                    {activeSection.id === "skills" && (
                      <div>
                        <SkillsForm
                          data={resumeData.skills}
                          onChange={(data) =>
                            setResumeData((prev) => ({
                              ...prev,
                              skills: data,
                            }))
                          }
                        />
                      </div>
                    )}
                </div>
                <button onClick={() => {toast.promise(saveResume, {loading: 'Saving....'})}} className="mt-6 w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-all" >
                  Save Changes
                </button>
              </div>
            </div>
            {/*Right Pannel - Resume Preview Section */}
            <div className="lg:col-span-7 max-lg:mt-6">
              <div className="relative w-full">
                    <div className="absolute botton-3 left-0 right-0 flex items-center justify-end gap-2">
                      {resumeData.public && (
                        <button onClick={handleShare} className="flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors">
                          <Share2Icon className="size-4" />
                          Share
                        </button>
                        )}
                        <button onClick={changeResumeVisibility} className="flex gap-2 items-center p-2 px-4 text-sm bg-linear-to-br from-purple-100 to-purple-500 text-white rounded-lg hover:bg-gray-700 transition-colors">
                          {resumeData.public ? <EyeIcon className="size-4"/>
                            : <EyeOffIcon className="size-4"/>
                          }
                          {resumeData.public ? "Public" : "Private"}
                        </button>
                        <button onClick={downloadResume} className="flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors">
                          <DownloadIcon className="size-4" />
                          Download
                        </button>
                    </div>
                  </div>
              {/* resume preview section */}
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.assent_color}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
