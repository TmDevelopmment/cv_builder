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
        const newResume = await Resume.create({ user: userId, title });

        return res.status(201).json({ message: "Resume created successfully", resume: newResume });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// controller for deleting a resume
// DELETE /api/resumes/delete/:id
export const deleteResume = async (req, res) => {

    try {

        const userId = req.userId;
        const {resumeId} = req.params;

        // delete the resume
        const deletedResume = await Resume.findOneAndDelete({ user: userId, _id: resumeId });

        if (!deletedResume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({ message: "Resume deleted successfully" });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// controller for getting all resumes of a user
// GET /api/resumes/get
export const getResumeById = async (req, res) => {
    try {

        const userId = req.userId;
        const {resumeId} = req.params;

        const resume = await Resume.findOne({ user: userId, _id: resumeId });

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
// PUT /api/resumes/update/:id
export const updateResume = async (req, res) => {
    try {

        const userId = req.userId;
        const {resumeId, resumeData, removeBackground} = req.body;
        const image = req.file;

        let resumeDataObj = JSON.parse(resumeData);

        if (image) {

            const imageBufferData = fs.createReadStream(image.path);

            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: "user-resumes",
                tranformations: {
                    pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ",e-bgremove" : "")
                }
            })

            resumeDataObj.personal_info.image = response.url;
        }

        // update the resume
        const updatedResume = await Resume.findByIdAndUpdate(
            { _id: resumeId, user: userId },
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
        res.status(400).json({ message: error.message });
    }
}