import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
// Ensure fetchAppliedJobs is imported from your API service file
import { fetchJobs, fetchMyApplications, fetchAppliedJobs } from "../../api/useApply";
import Sidebar from "../../components/Sidebar";
import ApplyModal from "../../components/ApplyModel";
import { saveJob, fetchSavedApplications, unsaveJob } from "../../api/useSavedJobs";

import JobCard from "../../components/JobCard";

import { useAuthContext } from "../../context/AuthContext";
import { getStudentProfile } from "../../api/profile/useStudentProfile";

const userData = {
  resumeUrl: "",
  phone: "",
  address: "",
};


const Applications = () => {
  const [jobs, setJobs] = useState([]);
  const [myApps, setMyApps] = useState([]);
  const [appliedJobsList, setAppliedJobsList] = useState([]); // NEW STATE
  const [savedJobslist, setSavedJobslist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState("jobs"); // <-- NEW STATE for tab

  const { authUser } = useAuthContext();
  const [profile, setProfile] = useState(userData);


  const loadAll = async () => {
    setLoading(true);
    try {
      const [jobList, { onCampus, offCampus }, dedicatedAppliedList, savedlist, profileData] = await Promise.all([
        fetchJobs(),
        fetchMyApplications(),

        fetchAppliedJobs(), // Fetch dedicated applied list
        fetchSavedApplications(),
        fetchProfile(),
      ]);
      setJobs(jobList);
      setMyApps([...onCampus, ...offCampus]);
      setAppliedJobsList(dedicatedAppliedList); // Set new state
      setSavedJobslist(savedlist,);
      setProfile(profileData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs/applications");
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    if (!authUser?._id) return { resumeUrl: authUser.resumeUrl, phone: authUser.phone, address: authUser.address };
    setLoading(true);
    try {
      const data = await getStudentProfile(authUser._id);
      setProfile({ ...userData, ...data });
    } catch (err) {
      return { resumeUrl: authUser.resumeUrl, phone: authUser.phone, address: authUser.address };
    }
  };//now this function returns a promise
  useEffect(() => {
    loadAll();
  }, []);

  const openApplyModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApplied = async () => {
    try {
      // Refresh both application lists for automatic update
      const [{ onCampus, offCampus }, dedicatedAppliedList] = await Promise.all([
        fetchMyApplications(),
        fetchAppliedJobs(),
      ]);
      setMyApps([...onCampus, ...offCampus]);
      setAppliedJobsList(dedicatedAppliedList);
      toast.success("Application submitted and list updated!");
    } catch (err) {
      console.error("Error refreshing applications:", err);
    }
  };

  const handleSaveJob = async (jobId) => {
    try {
      const token = localStorage.getItem("ccps-token");
      await saveJob(jobId, token);
      const updatedSavedList = await fetchSavedApplications();
      setSavedJobslist(updatedSavedList);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const handleUnsaveJob = async (jobId) => {
    try {
      const token = localStorage.getItem("ccps-token");
      const savedItem = savedJobslist.find(item => item.jobId?._id === jobId);

      if (!savedItem) {
        console.error("Saved item not found for jobId:", jobId);
        throw new Error("Saved job not found");
      }

      console.log("Unsaving with saved item ID:", savedItem._id);  // Debug log
      await unsaveJob(savedItem._id, token);

      const updatedSavedList = await fetchSavedApplications();
      setSavedJobslist(updatedSavedList);
    } catch (error) {
      console.error("Error in unsaving the job:", error);
      throw error;
    }
  };
  const filteredJobs = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = {
    onCampus: filteredJobs.filter((job) => job.Type === "on-campus"),
    offCampus: filteredJobs.filter((job) => job.Type === "off-campus"),
  };

  const renderJobs = (jobsList) =>
    jobsList.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.894"
            />
          </svg>
        </div>
        <p className="text-gray-500 text-lg font-medium">No jobs available</p>
        <p className="text-gray-400 text-sm mt-1">Check back later for new opportunities</p>
      </div>
    ) : (
      // Using the JobCard component here
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobsList.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            myApps={myApps}
            openApplyModal={openApplyModal}
            handleSaveJob={handleSaveJob}
            handleUnsaveJob={handleUnsaveJob}
            savedJobslist={savedJobslist}
          />
        ))}
      </div>
    );

  if (loading)
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center pt-20 sm:pt-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
            <p className="text-gray-600 font-medium">Loading amazing opportunities...</p>
            <p className="text-gray-400 text-sm mt-1">Please wait a moment</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Sidebar />
      <main className="flex-1 pt-20 md:pt-8 px-4 sm:px-6 lg:px-8 w-full">

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`pb-2 px-3 font-semibold ${activeTab === "jobs"
              ? "text-[#13665b] border-b-2 border-[#13665b]"
              : "text-gray-500"
              }`}
          >
            Job Opportunities
          </button>
          <button
            onClick={() => setActiveTab("applied")}
            className={`pb-2 px-3 font-semibold ${activeTab === "applied"
              ? "text-[#13665b] border-b-2 border-[#13665b]"
              : "text-gray-500"
              }`}
          >
            My Applied Jobs
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "applied" ? (
          <>
            {/* NEW SECTION: APPLIED JOBS LIST */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-4"></div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">My Applied Jobs</h2>
                  <p className="text-gray-600 text-sm">A dedicated list of all jobs you have applied for</p>
                </div>
                <div className="ml-auto">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {appliedJobsList.length} total
                  </span>
                </div>
              </div>
              {appliedJobsList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 bg-white border border-gray-200 rounded-xl">
                  <p className="text-gray-500 text-lg font-medium">No applied jobs found.</p>
                  <p className="text-gray-400 text-sm mt-1">Apply to a job to see it listed here!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {appliedJobsList.map((job) => (
                    <JobCard
                      key={job._id}
                      job={{
                        ...job,
                        status: job.applicationStatus || 'Pending',
                        applied: true,
                        Type: job.Type || 'Off-Campus' // Default type if missing
                      }}
                      myApps={appliedJobsList} // Pass the dedicated list for status check
                      isAppliedJob={true}
                    />
                  ))}
                </div>
              )}
            </section>
            {/* END NEW SECTION */}
          </>
        ) : (
          <>
            <div className="mb-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Job <span className="text-[#13665b]">Opportunities</span>
                  </h1>
                  <p className="text-gray-600 text-lg">Discover your next career adventure</p>
                </div>
                <div className="relative w-full lg:w-80">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search job titles..."
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#13665b] focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.894"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                      <p className="text-xs text-gray-500">Total Jobs</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-emerald-600"
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
                      <p className="text-2xl font-bold text-gray-900">{grouped.onCampus.length}</p>
                      <p className="text-xs text-gray-500">On-Campus</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{grouped.offCampus.length}</p>
                      <p className="text-xs text-gray-500">Off-Campus</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{myApps.length}</p>
                      <p className="text-xs text-gray-500">Applied</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <section>
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full mr-4"></div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">On-Campus Opportunities</h2>
                    <p className="text-gray-600 text-sm">Jobs available within your campus</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
                      {grouped.onCampus.length} available
                    </span>
                  </div>
                </div>
                {renderJobs(grouped.onCampus)}
              </section>

              <section>
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full mr-4"></div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Off-Campus Opportunities</h2>
                    <p className="text-gray-600 text-sm">External job opportunities</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                      {grouped.offCampus.length} available
                    </span>
                  </div>
                </div>
                {renderJobs(grouped.offCampus)}
              </section>
            </div>
          </>
        )}
      </main>

      {isModalOpen && selectedJob && (
        <ApplyModal
          jobId={selectedJob._id}
          applicationLink={selectedJob.ApplicationLink}
          userProfile={profile}
          onClose={() => setIsModalOpen(false)}
          onApplied={handleApplied}
        />
      )}
    </div>
  );
};

export default Applications;
