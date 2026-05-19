import {
  FilePenLineIcon,
  PlusIcon,
  UploadIcon,
  PencilIcon,
  Trash2Icon,
  X,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResumel, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const navigate = useNavigate();

  const colors = [
    "#4F46E5", // Indigo
    "#9333EA", // Purple
    "#2563EB", // Blue
    "#16A34A", // Green
    "#D97706", // Orange
    "#DC2626", // Red
    "#8B5CF6", // Violet
    "#F59E0B", // Amber
  ];

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  const createResume = async (e) => {
    e.preventDefault();
    setShowCreateResume(false);
    navigate(`/app/builder/res123`);
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setShowUploadResume(false);
    navigate(`/app/builder/res123`);
  };

  const editTitle = async (e) => {
    e.preventDefault();
    setEditResumeId('');
  }

  const deleteResume = async (resumeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this resume?");
    if (confirmDelete) {
      setAllResumes(prev => prev.filter(resume => resume._id !== resumeId));
      alert("Resume deleted successfully!");
    }
  }

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, John Doe!
        </p>
        <div className="flex gap-4">
          <button
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-gray-300 hover:border-indigo-500 transition-all duration-300"
            onClick={() => setShowCreateResume(true)}
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transaction-all duration-300">
              Create CV
            </p>
          </button>
          <button
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-gray-300 hover:border-purple-500 transition-all duration-300"
            onClick={() => setShowUploadResume(true)}
          >
            <UploadIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600 transaction-all duration-300">
              Upload CV
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-87.5" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-48 bg-white h-48 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-gray-300 hover:border-indigo-500 transition-all duration-300 group"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-11 p-2.5 text-white rounded-full"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>
                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transaction-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "80" }}
                >
                  Upadate on{" "}
                  {new Date(resume.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div onClick={e=> e.stopPropagation()} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-1">
                  <PencilIcon onClick={() => {setEditResumeId(resume._id); setTitle(resume.title)}} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-all duration-300" />
                  <Trash2Icon onClick={() => deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-all duration-300" />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResumel && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-semibold mb-4">Create a Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Resume Title"
                className="border p-2 rounded mb-4 w-full"
                required
              />
              <button className="w-full bg-linear-to-bl from-green-800 to-green-400 text-white px-4 py-2 rounded-xl mt-2">
                Create
              </button>
              <XIcon
                className="absolute top-4 right-4 size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-all duration-300"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-semibold mb-4">Upload a Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Resume Title"
                className="border p-2 rounded mb-4 w-full"
                required
              />
              <div>
                <label
                  htmlFor="resume-input"
                  className="block mb-1 font-medium"
                >
                  Select Resume File
                  <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-sm">{resume.name}</p>
                    ) : (
                      <>
                        <UploadIcon className="size-10" />
                        <p className="text-sm">
                          Click to upload or drag and drop
                        </p>
                      </>
                    )}
                    <input
                      id="resume-input"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => setResume(e.target.files[0])}
                    />
                  </div>
                </label>
              </div>
              <button className="w-full bg-linear-to-bl from-green-800 to-green-400 text-white px-4 py-2 rounded-xl mt-2">
                Upload
              </button>
              <XIcon
                className="absolute top-4 right-4 size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-all duration-300"
                onClick={() => setShowUploadResume(false)}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId('')}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-semibold mb-4">Edit Resume Title</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Resume Title"
                className="border p-2 rounded mb-4 w-full"
                required
              />
              <button className="w-full bg-linear-to-bl from-green-800 to-green-400 text-white px-4 py-2 rounded-xl mt-2">
                Update
              </button>
              <XIcon
                className="absolute top-4 right-4 size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-all duration-300"
                onClick={() => {
                  setEditResumeId('');
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
