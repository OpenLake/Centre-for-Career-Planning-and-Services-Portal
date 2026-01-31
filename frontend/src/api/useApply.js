import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const getAuthToken = () => {
  let token = localStorage.getItem('ccps-token');
  if (!token) {
    const userString = localStorage.getItem('ccps-user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        token = user.token || user.accessToken || null;
      } catch (e) { }
    }
  }
  return token;
};

export const fetchJobs = async () => {
  const token = getAuthToken(); // Retrieve token robustly
  const headers = {};
  if (token) {
    // Conditionally add the Authorization header if a token exists
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    // Pass headers to the GET request
    const res = await axiosInstance.get('/api/jobs', { headers });

    // Check if the response data is an array directly, or if it's nested (e.g., res.data.jobs)
    const jobs = Array.isArray(res.data) ? res.data : res.data.jobs || [];
    console.log('Fetched Jobs Data:', jobs);
    return jobs;
  } catch (err) {
    // A 401 might return a specific error message, which we log
    console.error('Error fetching jobs:', err.response?.data || err.message);
    return [];
  }
};

export const fetchMyApplications = async () => {
  const token = getAuthToken();
  if (!token) {
    return { onCampus: [], offCampus: [] };
  }
  try {
    // FIX: Changed '/api/applications/my' to '/api/applications/student-applications'
    const res = await axiosInstance.get('/api/applications/student-applications', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // The backend controller returns onCampusApplications and offCampusApplications
    return {
      onCampus: res.data.onCampusApplications || [],
      offCampus: res.data.offCampusApplications || [],
    };
  } catch (err) {
    console.error('Error fetching my applications:', err.response?.data || err.message);
    return { onCampus: [], offCampus: [] };
  }
};

export const fetchAppliedJobs = async () => {
  const token = getAuthToken();
  try {
    // This route is correctly mapped on the backend: /api/applications/applied-jobs
    const res = await axiosInstance.get('/api/applications/applied-jobs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // The backend controller exports the key 'appliedJobs', so this looks correct.
    return res.data.appliedJobs || [];
  } catch (err) {
    console.error("Applied Jobs API error:", err.response?.data || err.message);
    return [];
  }
};

export const applyToJob = async (jobData) => {
  const token = getAuthToken();
  try {
    // FIX: Changed '/api/applications' to '/api/applications/apply'
    const res = await axiosInstance.post('/api/applications', jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Apply Job API error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || 'Failed to submit application');
  }
};

export const fetchApplicants = async (jobId) => {
  const token = getAuthToken();
  try {
    // NOTE: Backend route is /api/applications/job/:jobId/applicants. Frontend call is correct.
    const res = await axiosInstance.get(`/api/applications/job/${jobId}/applicants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Raw applicants API response:", res.data);
    return res.data.applicants || [];
  } catch (err) {
    console.error("Applicants API error:", err.response?.data || err.message);
    return [];
  }
};

export const updateApplicationStatus = async (id, status) => {
  const token = getAuthToken();
  // NOTE: The backend routes you provided do not show a route for updating status.
  // Assuming the correct path is /api/applications/status/:id
  await axiosInstance.put(`/api/applications/status/${id}`, { status }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveJob = async (jobId) => {
  // NOTE: The backend routes you provided do not show routes for save or fetch saved applications.
  // Assuming the correct path is /api/applications/save
  const res = await axiosInstance.post("/api/applications/save", { jobId });
  return res.data;
};

export const fetchSavedApplications = () =>
  axiosInstance
    .get("/api/applications/saved")
    .then((res) => res.data.savedApplications);
