import { dummyResumeData } from "../assets/assets"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../components/Loader"
import ResumePreview from "../components/ResumePreview"
import { ArrowLeftIcon } from "lucide-react"

const Preview = () => {

  const { resumeId } = useParams()

  const [isLoading, setLoading] = useState(true)

  const [resumeData, setResumeData] = useState(null)

  const loadResume = async () => {
    setResumeData(dummyResumeData.find(resume => resume._id === resumeId || null))
    setLoading(false)
  }

  useEffect(() => {
    loadResume()
  }, [])

  return resumeData ? (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview 
        data={resumeData}
        template={resumeData.templates}
        assentColor={resumeData.assent_color}
        classes="py-5 bg-white"
         />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? <Loader /> : (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <p className="text-6xl font-semibold text-center text-slate-400">Resume not found</p>
          <a href="/" className="mt-6 bg-green-500 hover:bg-green-600
          text-white rounded-full px-6 h-9 m-1 ring-offset-2 ring-1 ring-green-400 flex items-center transition-colors">
          <ArrowLeftIcon className="mr-2 size-4" size={16} />
          Go back to home</a>
        </div>
      )}
    </div>
  )
}

export default Preview