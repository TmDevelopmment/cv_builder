import Resume from "../models/Resume.js";
import imagekit from "../configs/imageKit.js";
import fs from "fs";

// controller for creating a new resume
// POST /api/resumes/create
export const createResume = async (req, res) => {

    try {

        const userId = req.userId;
        const { title } = req.body;

        // create new resume
        const newResume = await Resume.create({ userId, title });

        return res.status(201).json({ message: "Resume created successfully", resume: newResume });

    } catch (error) {
        console.error("Error creating resume:", error);
        res.status(400).json({ message: error.message });
    }
};


// controller for deleting a resume
// DELETE /api/resumes/delete/:id
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        // Ensure the query matches the database schema
        const deletedResume = await Resume.findOneAndDelete({ userId, _id: resumeId });

        if (!deletedResume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        console.error("Error deleting resume:", error);
        res.status(400).json({ message: error.message });
    }
};

// controller for getting all resumes of a user
// GET /api/resumes/get
export const getResumeById = async (req, res) => {
    try {

        const userId = req.userId;
        const {resumeId} = req.params;

        const resume = await Resume.findOne({ userId, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        resume.__v = undefined; // hide version key in response
        resume.createdAt = undefined; // hide createdAt in response
        resume.updatedAt = undefined; // hide updatedAt in response
        return res.status(200).json(resume);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// get resume by id publicly accessible
// GET /api/resumes/public/:id
export const getPublicResumeById = async (req, res) => {
    try {

        const {resumeId} = req.params;
        const resume = await Resume.findOne({ public: true, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        resume.__v = undefined; // hide version key in response
        resume.createdAt = undefined; // hide createdAt in response
        resume.updatedAt = undefined; // hide updatedAt in response

        // return the resume data
        return res.status(200).json(resume);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// controller for updating a resume
// PUT /api/resumes/update
// export const updateResume = async (req, res) => {
//     try {
//         const userId = req.userId;

//         const { resumeId, resumeData, removeBackground } = req.body;

//         // Parse resumeData if it is a string
//         let resumeDataObj;
//         if (typeof resumeData === 'string') {
//             resumeDataObj = JSON.parse(resumeData);
//         } else {
//             resumeDataObj = structuredClone(resumeData); // Use structuredClone for deep copy if it's already an object
//         }

        

//         const image = req.file;

//         if (image) {
//             const imageBufferData = fs.createReadStream(image.path);

//             const response = await imagekit.files.upload({
//                 file: imageBufferData,
//                 fileName: 'resume.png',
//                 folder: "user-resumes",
//                 tranformations: {
//                     pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ",e-bgremove" : "")
//                 }
//             });

//             resumeDataObj.personal_info.image = response.url;
//         }

//         // update the resume
//         const updatedResume = await Resume.findByIdAndUpdate(
//             { _id: resumeId, userId },
//             resumeDataObj,
//             { new: true }
//         );
//         console.log("Updated resume:", updatedResume);

//         if (!updatedResume) {
//             return res.status(404).json({ message: "Resume not found" });
//         }

//         updatedResume.__v = undefined; // hide version key in response
//         updatedResume.createdAt = undefined; // hide createdAt in response
//         updatedResume.updatedAt = undefined; // hide updatedAt in response

//         return res.status(200).json({ message: "Resume updated successfully", resume: updatedResume });

//     } catch (error) {
//         console.error("Error updating resume:", error);
//         res.status(400).json({ message: error.message });
//     }
// };

export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;

        // Ensure resumeId exists before destructuring
        if (!req.body.resumeId) {
            return res.status(400).json({ message: "resumeId is missing in the request body." });
        }

        const { resumeId, resumeData, removeBackground } = req.body;

        // Parse resumeData if it is a string
        let resumeDataObj;
        try {
            resumeDataObj = typeof resumeData === "string" ? JSON.parse(resumeData) : resumeData;
        } catch (error) {
            return res.status(400).json({ message: "Invalid JSON format for resumeData." });
        }

        // Remove empty or invalid _id field
        if (!resumeDataObj._id || resumeDataObj._id === "") {
            delete resumeDataObj._id;
        }

        const image = req.file;

        if (image) {
            const imageBufferData = fs.createReadStream(image.path);

            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: "user-resumes",
                tranformations: {
                    pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ",e-bgremove" : "")
                }
            });

            resumeDataObj.personal_info.image = response.url;
        }

        // update the resume
        const updatedResume = await Resume.findByIdAndUpdate(
            { _id: resumeId, userId },
            resumeDataObj,
            { new: true }
        );

        if (!updatedResume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        updatedResume.__v = undefined; // hide version key in response
        updatedResume.createdAt = undefined; // hide createdAt in response
        updatedResume.updatedAt = undefined; // hide updatedAt in response

        return res.status(200).json({ message: "Resume updated successfully", resume: updatedResume });

    } catch (error) {
        console.error("Error updating resume:", error);
        res.status(400).json({ message: error.message });
    }
};