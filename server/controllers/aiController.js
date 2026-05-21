import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";
import { Type } from "@google/genai"; // Used to build our structured JSON schema

// controller for enhancing a resumes professional summary using AI
// POST /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ error: "User content is required" });
    }

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: [userContent],
      config: {
        systemInstruction: "You are a helpful assistant that enhances professional summaries for resumes. Your task is to take the user's input and improve it by making it more concise, impactful, and tailored for a resume. Focus on highlighting key skills, achievements, and experiences while maintaining a professional tone.",
      }
    });

    console.log("AI API response:", response);

    const enhancedSummary = response.text;
    return res.status(200).json({ enhancedSummary });
  } catch (error) {
    console.error("AI API error:", error);
    return res.status(400).json({ message: error.message });
  }
};

// controller for enhancing a job description using AI
// POST /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;
    console.log("Received user content for job description enhancement:", userContent);

    if (!userContent) {
      return res.status(400).json({ error: "User content is required" });
    }

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: [userContent],
      config: {
        systemInstruction: "You are a helpful assistant that enhances job descriptions for resumes. Your task is to take the user's input and improve it by making it more concise, impactful, and tailored for a resume. Focus on highlighting key responsibilities, achievements, and skills while maintaining a professional tone.",
      }
    });

    console.log("AI API response:", response);
    const enhancedJobDescription = response.text;
    return res.status(200).json({ enhancedJobDescription });
  } catch (error) {
    console.error("AI API error:", error);
    return res.status(400).json({ message: error.message });
  }
};

// controller for uploading a resume in database
// POST /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;
    

    // if (!resumeText) {
    //   return res.status(400).json({ error: "Resume text is required" });
    // }

    // Defining a strict Gemini schema structure matching your MongoDB fields
    const resumeSchema = {
      type: Type.OBJECT,
      properties: {
        professionalSummary: { type: Type.STRING },
        skills: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING } 
        },
        personal_info: {
          type: Type.OBJECT,
          properties: {
            image: { type: Type.STRING },
            full_name: { type: Type.STRING },
            profession: { type: Type.STRING },
            email: { type: Type.STRING },
            phone: { type: Type.STRING },
            location: { type: Type.STRING },
            linkedin: { type: Type.STRING },
            website: { type: Type.STRING },
          }
        },
        experience: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              company: { type: Type.STRING },
              position: { type: Type.STRING },
              start_date: { type: Type.STRING },
              end_date: { type: Type.STRING },
              description: { type: Type.STRING },
              is_current: { type: Type.BOOLEAN },
            }
          }
        },
        projects: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              type: { type: Type.STRING },
              description: { type: Type.STRING },
            }
          }
        },
        education: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              institution: { type: Type.STRING },
              degree: { type: Type.STRING },
              field: { type: Type.STRING },
              graduation_date: { type: Type.STRING },
              gpa: { type: Type.STRING },
            }
          }
        }
      }
    };

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: [`Extract data from this resume:\n\n${resumeText}`],
      config: {
        systemInstruction: "You are an expert AI Agent to extract structured data from resumes.",
        responseMimeType: "application/json",
        responseSchema: resumeSchema,
      },
    });

    const extractedData = response.text;
    const parsedData = JSON.parse(extractedData);
    
    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });
    
    return res.status(200).json({ resumeId: newResume._id });
  } catch (error) {
    console.error("AI API error:", error);
    return res.status(400).json({ message: error.message });
  }
};