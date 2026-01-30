"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAlumniAdmin from "../../api/alumni/useAlumniAdmin";
import Sidebar from "../../components/Sidebar";
import useGetAllAlumni from "../../api/alumni/useGetAllAlumni";


const initialForm = {
  name: "",
  company: "",
  linkedin: "",
  InstituteId: "",
  MobileNumber: "",
  Email: "",
  batch: "",
  jobs: [{ id: "", role: "" }],
};

const AdminAlumniPage = () => {
  const navigate = useNavigate();
  const { addAlumni, updateAlumni, deleteAlumni, alumni, refetch } = useAlumniAdmin();
  const { alumni: allAlumni, loading, refetch: refetchAll } = useGetAllAlumni();



  const [searchId, setSearchId] = useState("");
  const [form, setForm] = useState(initialForm);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("job-")) {
      const [_, field] = name.split("-");
      setForm((prev) => ({
        ...prev,
        jobs: [{ ...prev.jobs[0], [field]: value }],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSearch = () => {
    const found = alumni.find((a) => a.InstituteId === searchId);
    if (found) {
      const { _id, __v, ...cleaned } = found;
      setForm({
        ...initialForm,
        ...cleaned,
        jobs: found.jobs?.length ? found.jobs : [{ id: "", role: "" }],
      });
      setIsEditMode(true);
      setEditingId(found._id);
      toast.success("Alumni found. You can now update or delete.");
    } else {
      toast.error("No alumni found with that Institute ID");
      setIsEditMode(false);
      setEditingId(null);
      setForm(initialForm);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("ccps-token");
    try {
      if (isEditMode && editingId) {
        await updateAlumni(editingId, form, token);
        toast.success("Alumni updated successfully");
      } else {
        await addAlumni(form, token);
        toast.success("Alumni added successfully");
      }
      refetch();
      refetchAll();
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("ccps-token");
    if (!editingId) return;
    if (window.confirm("Are you sure you want to delete this alumni?")) {
      try {
        await deleteAlumni(editingId, token);
        toast.success("Alumni deleted");
         resetForm();
        refetch();
        refetchAll();
      } catch (error) {
        toast.error("Failed to delete alumni");
      }
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setIsEditMode(false);
    setEditingId(null);
    setSearchId("");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-grow bg-gray-100 py-10 px-6 md:px-12 overflow-y-auto">

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">
            {isEditMode ? "Edit Alumni" : "Add New Alumni"}
          </h1>

          {/* Search Bar */}
          <section className="mb-10">
            <label htmlFor="searchId" className="block mb-2 font-semibold text-gray-700">
              Search Alumni by Institute ID
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                id="searchId"
                type="text"
                placeholder="Enter Institute ID"
                className="input input-bordered flex-grow rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="btn bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white rounded-lg px-6 py-3 font-semibold transition"
                aria-label="Search Alumni"
              >
                Search
              </button>
            </div>
          </section>

          {/* Alumni Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. John Doe"
                className="input input-bordered rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>

            {/* Company */}
            <div className="flex flex-col">
              <label htmlFor="company" className="mb-2 font-semibold text-gray-700">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="e.g. Google"
                className="input input-bordered rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.company}
                onChange={handleChange}
                required
              />
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col">
              <label htmlFor="linkedin" className="mb-2 font-semibold text-gray-700">
                LinkedIn URL
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                placeholder="https://linkedin.com/in/username"
                className="input input-bordered rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.linkedin}
                onChange={handleChange}
                required
              />
            </div>

            {/* Institute ID */}
            <div className="flex flex-col">
              <label htmlFor="InstituteId" className="mb-2 font-semibold text-gray-700">
                Institute ID
              </label>
              <input
                type="text"
                id="InstituteId"
                name="InstituteId"
                placeholder="Unique Institute ID"
                className={`input input-bordered rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none ${isEditMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                value={form.InstituteId}
                onChange={handleChange}
                required
                disabled={isEditMode}
              />
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col">
              <label htmlFor="MobileNumber" className="mb-2 font-semibold text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                id="MobileNumber"
                name="MobileNumber"
                placeholder="+1 234 567 8900"
                className="input input-bordered rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.MobileNumber}
                onChange={handleChange}
                required
                pattern="[+0-9\s\-()]{7,15}"
                title="Please enter a valid phone number"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="Email" className="mb-2 font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                placeholder="name@example.com"
                className="input input-bordered rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.Email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            {/* Batch Year */}
            <div className="flex flex-col">
              <label htmlFor="batch" className="mb-2 font-semibold text-gray-700">
                Batch Year
              </label>
              <input
                type="number"
                id="batch"
                name="batch"
                placeholder="e.g. 2021"
                className="input input-bordered rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.batch}
                onChange={handleChange}
                required
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            {/* Job Information (span both columns) */}
            <fieldset className="md:col-span-2 border border-gray-300 rounded-lg p-5">
              <legend className="text-lg font-semibold text-gray-800 mb-4 px-2">
                Job Information
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="job-id" className="mb-2 font-medium text-gray-700">
                    Job ID
                  </label>
                  <input
                    type="text"
                    id="job-id"
                    name="job-id"
                    placeholder="e.g. 12345"
                    className="input input-bordered rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={form.jobs[0]?.id || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="job-role" className="mb-2 font-medium text-gray-700">
                    Job Role
                  </label>
                  <input
                    type="text"
                    id="job-role"
                    name="job-role"
                    placeholder="e.g. Software Engineer"
                    className="input input-bordered rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={form.jobs[0]?.role || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </fieldset>

            {/* Action Buttons */}
            <div className="md:col-span-2 flex flex-col md:flex-row justify-between gap-4 mt-3">
              <button
                type="submit"
                className="btn btn-primary w-full md:w-auto bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                {isEditMode ? "Update Alumni" : "Add Alumni"}
              </button>
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-error w-full md:w-auto bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
        {/* Alumni Management Table */}
<section className="mt-14">
  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
    Alumni Management
  </h2>

  {loading ? (
    <p className="text-center text-gray-600">Loading alumni...</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Batch</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y">
          {allAlumni.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-6 text-gray-500">
                No alumni records found
              </td>
            </tr>
          ) : (
            allAlumni.map((alum) => (
              <tr key={alum._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{alum.name}</td>
                <td className="px-4 py-3">{alum.batch}</td>
                <td className="px-4 py-3">{alum.Email}</td>
                <td className="px-4 py-3 text-center space-x-3">
                  <button
                    className="text-blue-600 hover:underline font-medium"
                    disabled
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline font-medium"
                    disabled
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )}
</section>

      </main>
    </div>
  );
};

export default AdminAlumniPage;
