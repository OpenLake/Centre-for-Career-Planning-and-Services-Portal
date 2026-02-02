import JobPosting from '../models/jobPosting.model.js';
import mongoose from 'mongoose';

export const jobCreate = async (req, res) => {
    try {
        const {
            jobTitle,
            jobDescription,
            Company,
            requiredSkills,
            Type,
            batch,
            Deadline,
            ApplicationLink,
            Expiry,
            author,
            relevanceScore
        } = req.body;
        // Create a new job posting instance
        const newJobPosting = new JobPosting({
            jobTitle,
            jobDescription,
            Company,
            requiredSkills,
            Type,
            batch,
            Deadline,
            ApplicationLink,
            Expiry,
            author,
            relevanceScore
        });

        // Save the job posting to the database
        await newJobPosting.save();

        // Send a success response
        res.status(201).json({
            message: 'Job posting created successfully',
            job: newJobPosting
        });
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(500).json({
            message: 'Error creating job posting',
            error: error.message
        });
    }
};


export const jobUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedJobPosting = await JobPosting.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
            runValidators: true // Ensure the updated data adheres to the schema
        });
        if (!updatedJobPosting) {
            return res.status(404).json({
                message: 'Job posting not found'
            });
        }
        res.status(200).json({
            message: 'Job posting updated successfully',
            job: updatedJobPosting
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating job posting',
            error: error.message
        });
    }
};



export const jobDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedJobPosting = await JobPosting.findByIdAndDelete(id);
        if (!deletedJobPosting) {
            return res.status(404).json({
                message: 'Job posting not found'
            });
        }
        res.status(200).json({
            message: 'Job posting deleted successfully',
            job: deletedJobPosting
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting job posting',
            error: error.message
        });
    }
};


export const jobList = async (req, res) => {
    try {
        const jobPostings = await JobPosting.aggregate([{
            $lookup:{
                from: "jobapplications",
                localField: "_id",
                foreignField: "jobId",
                as: "jobApplications"
            }
        }]);
        res.status(200).json({
            message: 'Job postings retrieved successfully',
            jobs: jobPostings
        });
    } catch (error) {
        console.error("Error in jobList:", error);
        res.status(500).json({
            message: 'Error retrieving job postings',
            error: error.message
        });
    }
};


// Helper function to check ObjectId validity
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Upvote a job posting
export const jobRelevanceScoreUpvote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.body.userId; // user ID from request

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const jobPosting = await JobPosting.findById(id);
        if (!jobPosting) {
            return res.status(404).json({ message: 'Job posting not found' });
        }

        // Initialize fields if missing
        jobPosting.relevanceScore = jobPosting.relevanceScore || 0;
        jobPosting.upvotedBy = jobPosting.upvotedBy || [];
        jobPosting.downvotedBy = jobPosting.downvotedBy || [];

        if (jobPosting.upvotedBy.includes(userId)) {
            return res.status(400).json({ message: 'Already upvoted' });
        }

        // Switch vote if previously downvoted
        if (jobPosting.downvotedBy.includes(userId)) {
            jobPosting.downvotedBy.pull(userId);
            jobPosting.upvotedBy.push(userId);
            jobPosting.relevanceScore += 2;
        } else {
            // Normal upvote
            jobPosting.upvotedBy.push(userId);
            jobPosting.relevanceScore += 1;
        }

        await jobPosting.save();

        res.status(200).json({
            message: 'Relevance score upvoted successfully',
            job: jobPosting,
            userVote: {
                upvoted: true,
                downvoted: false
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating relevance score',
            error: error.message
        });
    }
};

// Downvote a job posting
export const jobRelevanceScoreDownvote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.body.userId; // user ID from request

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const jobPosting = await JobPosting.findById(id);
        if (!jobPosting) {
            return res.status(404).json({ message: 'Job posting not found' });
        }

        // Initialize fields if missing
        jobPosting.relevanceScore = jobPosting.relevanceScore || 0;
        jobPosting.upvotedBy = jobPosting.upvotedBy || [];
        jobPosting.downvotedBy = jobPosting.downvotedBy || [];

        if (jobPosting.downvotedBy.includes(userId)) {
            return res.status(400).json({ message: 'Already downvoted' });
        }

        // Switch vote if previously upvoted
        if (jobPosting.upvotedBy.includes(userId)) {
            jobPosting.upvotedBy.pull(userId);
            jobPosting.downvotedBy.push(userId);
            jobPosting.relevanceScore -= 2;
        } else {
            // Normal downvote
            jobPosting.downvotedBy.push(userId);
            jobPosting.relevanceScore -= 1;
        }

        await jobPosting.save();

        res.status(200).json({
            message: 'Relevance score downvoted successfully',
            job: jobPosting,
            userVote: {
                upvoted: false,
                downvoted: true
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating relevance score',
            error: error.message
        });
    }
};

