import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

const JobCard = ({ job, myApps, openApplyModal, handleSaveJob, isAppliedJob }) => {
    const { authUser } = useAuthContext();
    const [relevanceScore, setRelevanceScore] = useState(job.relevanceScore || 0);
    
    // Determine initial vote status from job data
    const initialVoteStatus = job.upvotedBy?.includes(authUser?._id) 
        ? 'up' 
        : job.downvotedBy?.includes(authUser?._id) 
            ? 'down' 
            : null;
            
    const [voteStatus, setVoteStatus] = useState(initialVoteStatus);

    const handleUpvote = async () => {
        const token = localStorage.getItem("ccps-token");
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/upvote/${job._id}`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: authUser?._id })
            });
            const data = await response.json();
            if (data.job) {
                setRelevanceScore(data.job.relevanceScore);
                setVoteStatus(data.userVote?.upvoted ? 'up' : null);
            } else if (response.status === 400 && data.message === 'Already upvoted') {
                setVoteStatus('up');
            }
        } catch (error) {
            console.error("Failed to upvote:", error);
        }
    };

    const handleDownvote = async () => {
        const token = localStorage.getItem("ccps-token");
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/downvote/${job._id}`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: authUser?._id })
            });
            const data = await response.json();
            if (data.job) {
                setRelevanceScore(data.job.relevanceScore);
                setVoteStatus(data.userVote?.downvoted ? 'down' : null);
            } else if (response.status === 400 && data.message === 'Already downvoted') {
                setVoteStatus('down');
            }
        } catch (error) {
            console.error("Failed to downvote:", error);
        }
    };

    const application = isAppliedJob ? null : myApps?.find((a) => {
        const applicationJobId = typeof a.jobId === 'object' && a.jobId !== null
            ? a.jobId._id
            : a.jobId;
        return applicationJobId === job._id;
    });

    const applied = isAppliedJob || !!application;
    const status = isAppliedJob
        ? job.status
        : (application?.status || job.applicationStatus);

    const isCampus = job.Type === "On-Campus" || job.Type === "on-campus";
    const typeBgClass = isCampus ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-purple-100 text-purple-700 border border-purple-200";
    const typeDotClass = isCampus ? "bg-emerald-500" : "bg-purple-500";

    const statusBgClass = status === "Accepted"
        ? "bg-green-100 text-green-800 border border-green-200"
        : status === "Rejected"
            ? "bg-red-100 text-red-800 border border-red-200"
            : "bg-yellow-100 text-yellow-800 border border-yellow-200";
    const statusDotClass = status === "Accepted"
        ? "bg-green-500"
        : status === "Rejected"
            ? "bg-red-500"
            : "bg-yellow-500";

    return (
        <div
            key={job._id}
            className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-50 dark:hover:shadow-gray-900/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-indigo-50/0 group-hover:from-blue-50/30 group-hover:to-indigo-50/30 transition-all duration-300 rounded-2xl"></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${typeBgClass}`}
                >
                    <div className={`w-2 h-2 rounded-full mr-2 ${typeDotClass}`}></div>
                    {job.Type}
                </span>
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#0c4a42] dark:group-hover:text-emerald-300 transition-colors duration-200 relative z-10 line-clamp-2">
                {job.jobTitle}
            </h2>

            <div className="flex items-center mb-4 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center mr-3 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                    <svg
                        className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                    </svg>
                </div>
                <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{job.Company}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Company</p>
                </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 relative z-10">
                {job.jobDescription}
            </p>

            {!isAppliedJob && (
                <div className={`flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 relative z-10`}>
                    <div className="flex flex-col">
                        {applied ? (
                            <span
                                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold ${statusBgClass}`}
                            >
                                <div className={`w-1.5 h-1.5 rounded-full mr-2 ${statusDotClass}`}></div>
                                {status || 'Pending'}
                            </span>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openApplyModal(job)}
                                    className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group/btn"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-200"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Apply Now
                                </button>
                                <button
                                    onClick={() => handleSaveJob(job._id)}
                                    className="inline-flex items-center px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold rounded-xl shadow-lg transition-all duration-200"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-gray-50 dark:bg-gray-700/30 rounded-lg p-1 gap-1 border border-gray-100 dark:border-gray-700/50">
                            <button
                                onClick={handleUpvote}
                                className={`p-1 rounded transition-colors ${voteStatus === 'up' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                title="Upvote relevance"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 min-w-[12px] text-center">
                                {relevanceScore}
                            </span>
                            <button
                                onClick={handleDownvote}
                                className={`p-1 rounded transition-colors ${voteStatus === 'down' ? 'text-red-600 bg-red-50 dark:bg-red-900/20' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                title="Downvote relevance"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                        {!applied && (
                            <div className="text-right">
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h6m-6 4h6M6 7v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2z"
                                        />
                                    </svg>
                                    Deadline
                                </div>
                                <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                                    {job.Deadline
                                        ? new Date(job.Deadline).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                        : "Open"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobCard;
