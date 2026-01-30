import { useState, useEffect } from "react";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BACKEND_URL+"/api/alumni" || 'http://localhost:3000/api/alumni';

const useGetAllAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllAlumni = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}`);
      const data = await res.json();
      if (!res.ok || data.message) {
        throw new Error(data.message || "Failed to fetch alumni");
      }

      setAlumni(data);
    } catch (error) {
      toast.error(error.message || "Error loading alumni");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAlumni(); // fetch on mount
  }, []);

  return { alumni, loading, refetch: fetchAllAlumni };

};

export default useGetAllAlumni;
