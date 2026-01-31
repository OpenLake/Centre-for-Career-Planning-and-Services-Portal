import React, { useState } from "react";
import { createJobPosting } from "../api/useCreate";
import { updateJobPosting } from "../api/jobsApi";
import toast from "react-hot-toast";
const JobFormModal = ({ jobToEdit, onFormSubmitSuccess, onClose }) => {
    const isEditMode = !!jobToEdit;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    // Initialize state with default values or jobToEdit data
    const [form, setForm] = useState({
        jobTitle: jobToEdit?.jobTitle || "",
        jobDescription: jobToEdit?.jobDescription || "",
        Company: jobToEdit?.Company || "",
        requiredSkills: jobToEdit?.requiredSkills || "",
        Type: jobToEdit?.Type || "on-campus",
        batch: jobToEdit?.batch || "",
        Deadline: formatDate(jobToEdit?.Deadline) || "",
        ApplicationLink: jobToEdit?.ApplicationLink || "",
        Expiry: formatDate(jobToEdit?.Expiry) || "",
        author: jobToEdit?.author || "",
        relevanceScore: jobToEdit?.relevanceScore || 0,
        _id: jobToEdit?._id || null,
    });

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'batch' || name === 'relevanceScore') {
            setForm((prev) => ({ ...prev, [name]: Number(value) }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const deadlineDate = form.Deadline ? new Date(form.Deadline) : null;
        const expiryDate = form.Expiry ? new Date(form.Expiry) : null;

        if (deadlineDate && deadlineDate < today) {
            toast.error("Application Deadline cannot be before today's date.");
            setSubmitting(false);
            return;
        }

        if (expiryDate && expiryDate < today) {
            toast.error("Post Expiry Date cannot be before today's date.");
            setSubmitting(false);
            return;
        }

        if (deadlineDate && expiryDate && expiryDate < deadlineDate) {
            toast.error("Post Expiry Date cannot be before Application Deadline.");
            setSubmitting(false);
            return;
        }

        try {
            let token = localStorage.getItem("ccps-token");
            if (!token) {
                const userString = localStorage.getItem('ccps-user');
                if (userString) {
                    try {
                        const user = JSON.parse(userString);
                        token = user.token || user.accessToken || null;
                    } catch (e) { }
                }
            }
            let resultJob;

            if (isEditMode) {
                const updateData = { ...form };
                delete updateData._id;

                resultJob = await updateJobPosting(form._id, updateData, token);
                toast.success(`Job "${form.jobTitle}" updated successfully!`);

            } else {
                const responseData = await createJobPosting(form, token);
                resultJob = responseData.job;
                toast.success("Job created successfully!");
            }

            onFormSubmitSuccess(resultJob);

            onClose();

        } catch (err) {
            console.error(err);
            const errorMessage = err?.message || err?.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} job`;
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="bg-[#0c4a42] p-6 sticky top-0 z-10">
                    <h1 className="text-2xl font-bold text-white">
                        {isEditMode ? "Edit Job Posting" : "New Job Posting"}
                    </h1>
                    <p className="text-green-300 mt-1">
                        {isEditMode ? "Modify details and save changes" : "Fill in details to publish a job"}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Job Title */}
                        <div>
                            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                            <input id="jobTitle" name="jobTitle" type="text" required value={form.jobTitle} onChange={handleChange} placeholder="e.g. Frontend Engineer" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition" />
                        </div>
                        {/* Company Name */}
                        <div>
                            <label htmlFor="Company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <input id="Company" name="Company" type="text" required value={form.Company} onChange={handleChange} placeholder="e.g. Acme Corp" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition" />
                        </div>
                    </div>

                    {/* Job Description */}
                    <div>
                        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                        <textarea id="jobDescription" name="jobDescription" required rows={5} value={form.jobDescription} onChange={handleChange} placeholder="Describe role, responsibilities, perks…" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Required Skills */}
                        <div>
                            <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                            <input id="requiredSkills" name="requiredSkills" type="text" value={form.requiredSkills} onChange={handleChange} placeholder="e.g. React, Node.js" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition" />
                        </div>
                        {/* Job Type */}
                        <div>
                            <label htmlFor="Type" className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                            <select id="Type" name="Type" required value={form.Type} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition">
                                <option value="on-campus">On-Campus</option>
                                <option value="off-campus">Off-Campus</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Eligible Batch */}
                        <div>
                            <label htmlFor="batch" className="block text-sm font-medium text-gray-700 mb-1">Eligible Batch</label>
                            <input id="batch" name="batch" type="number" required value={form.batch} onChange={handleChange} placeholder="e.g. 2025" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition" />
                        </div>
                        {/* Relevance Score */}
                        <div>
                            <label htmlFor="relevanceScore" className="block text-sm font-medium text-gray-700 mb-1">Relevance Score</label>
                            <input id="relevanceScore" name="relevanceScore" type="number" step="1" value={form.relevanceScore} onChange={handleChange} placeholder="Default: 0" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Application Deadline */}
                        <div>
                            <label htmlFor="Deadline" className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                            <input id="Deadline" name="Deadline" type="date" value={form.Deadline} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition" />
                        </div>
                        {/* Post Expiry Date */}
                        <div>
                            <label htmlFor="Expiry" className="block text-sm font-medium text-gray-700 mb-1">Post Expiry Date</label>
                            <input id="Expiry" name="Expiry" type="date" value={form.Expiry} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition" />
                        </div>
                    </div>

                    {/* Application Link */}
                    <div>
                        <label htmlFor="ApplicationLink" className="block text-sm font-medium text-gray-700 mb-1">Application Link (optional)</label>
                        <input id="ApplicationLink" name="ApplicationLink" type="url" value={form.ApplicationLink} onChange={handleChange} placeholder="https://apply.here" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition" />
                    </div>

                    {/* Author */}
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author (optional)</label>
                        <input id="author" name="author" type="text" value={form.author} onChange={handleChange} placeholder="Your name" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition" />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={submitting}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 flex items-center space-x-2 transition"
                        >
                            {submitting && (
                                <svg className="w-5 h-5 animate-spin text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
                                    <path fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 10-8 8z" className="opacity-75" />
                                </svg>
                            )}
                            <span>{submitting ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Job" : "Create Job")}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobFormModal;