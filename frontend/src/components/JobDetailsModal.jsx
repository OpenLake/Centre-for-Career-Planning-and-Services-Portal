import React, { useEffect, useState } from 'react';
import { fetchJobById } from '../api/jobsApi';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const JobDetailsModal = ({ jobId, onClose, openApplyModal }) => {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const { authUser } = useAuthContext();

    useEffect(() => {
        const loadJobDetails = async () => {
            try {
                // Determine token based on role or storage
                const userString = localStorage.getItem('ccps-user');
                const tokenFromKey = localStorage.getItem('ccps-token');
                let token = tokenFromKey;
                if (userString) {
                    try {
                        const user = JSON.parse(userString);
                        token = user.token || user.accessToken || tokenFromKey;
                    } catch (e) { }
                }

                if (!token) return;

                const jobData = await fetchJobById(jobId, token);
                setJob(jobData);
            } catch (error) {
                console.error("Failed to load job details:", error);
                toast.error("Failed to load details");
            } finally {
                setLoading(false);
            }
        };

        if (jobId) {
            loadJobDetails();
        }
    }, [jobId]);

    if (!jobId) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : job ? (
                    <>
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl">
                            <div className="flex justify-between items-start">
                                <h2 className="text-2xl font-bold text-white mb-2">{job.jobTitle}</h2>
                                <button onClick={onClose} className="text-white hover:text-gray-200">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-blue-100 text-lg font-medium">{job.Company}</p>

                            <div className="flex flex-wrap gap-2 mt-4">
                                <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm">
                                    {job.Type}
                                </span>
                                <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm">
                                    Batch: {job.batch}
                                </span>
                                {job.Deadline && (
                                    <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm">
                                        Deadline: {new Date(job.Deadline).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6">

                            {/* Stats */}
                            <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 p-3 rounded-lg inline-block">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="font-semibold">{job.applicationCount || 0} Applicants</span>
                            </div>

                            {/* Skills */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {job.requiredSkills && job.requiredSkills.length > 0 ? (
                                        job.requiredSkills.map((skill, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm font-medium border border-blue-100">
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500 italic">No specific skills listed</span>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h3>
                                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {job.jobDescription}
                                </div>
                            </div>

                            {/* Action */}
                            <div className="pt-6 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={() => {
                                        if (job.ApplicationLink) {
                                            window.open(job.ApplicationLink, '_blank', 'noopener,noreferrer');
                                        } else {
                                            // Fallback to internal modal if no external link, or if user wants consistent flow
                                            // But req says "Proceed to external link". Use openApplyModal if external link missing?
                                            // Assuming ApplicationLink is the external one.
                                            openApplyModal(job);
                                        }
                                    }}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center"
                                >
                                    <span>Apply Now</span>
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        Job details not found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobDetailsModal;
