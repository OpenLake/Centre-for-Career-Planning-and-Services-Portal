import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ccps-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const saveJob = async (jobId) => {
  const res = await api.post("/api/saved-jobs/save", { jobId });
  return res.data;
};
export const unsaveJob=async(jobId)=>{
  const res = await api.delete(`/api/saved-jobs/saved/${jobId}`);
  return res.data;
}
export const fetchSavedApplications = async () => {
   try{
const res = await api.get("/api/saved-jobs/saved");
if(Array.isArray(res.data.savedJobs)){
  return res.data.savedJobs; 
  }
  return [];
}catch(error){
  console.error("Error fetching saved jobs:",error);
  throw error;
}
};//handles errors now
