import React from 'react'
import Sidebar from '../components/Sidebar';


const Applications = () => {
  const savedJobs = [
    {
      id: 1,
      title: 'Web Solutions Engineer',
      location: 'Washington',
      salary: '$50k-70k/month',
      type: 'Remote',
      Expiry: 'Feb 26, 2025 19:28',
    },
    {
      id: 2,
      title: 'Prompt Engineer',
      location: 'Santa Barbara',
      salary: '$150k-180k/month',
      type: 'Full Time',
      Expiry: 'Dec 19, 2025 23:26',
    },
    {
      id: 3,
      title: 'Product Engineer',
      location: 'Bengaluru',
      salary: 'Rs 50k-80k/month',
      type: 'Temporary',
      Expiry: 'March 4, 2025 19:28',
    },
  ];
  const handleSave = (id) => {
    // Logic to remove the job from the saved list
    console.log(`Job with ID ${id} removed.`);
  };

 
return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-montserrat mb-6">Saved Applications</h1>
        <div className="bg-white shadow-lg rounded-lg">
          <table className="w-full table-auto">
            <thead className="text-left">
              <tr>
                <th className="px-6 py-3 text-gray-500">Job</th>
                <th className="px-6 py-3 text-gray-500">Location</th>
                <th className="px-6 py-3 text-gray-500">Salary</th>
                <th className="px-6 py-3 text-gray-500">Type</th>
                <th className="px-6 py-3 text-gray-500">Expiring By</th>
                <th className="px-6 py-3 text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {savedJobs.map((job) => (
                <tr key={job.id} className="border-t">
                  <td className="px-6 py-4 font-montserrat text-[#0367A6]">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 font-roboto text-gray-700">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 font-roboto text-gray-700">
                    {job.salary}
                  </td>
                  <td className="px-6 py-4 font-roboto text-gray-700">
                    {job.type}
                  </td>
                  <td className="px-6 py-4 font-roboto text-gray-700">
                    {job.Expiry}
                  </td>
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <button
                      className="text-white bg-[green] px-4 py-2 rounded hover:bg-[#05F2C7]"
                      onClick={() => handleSave(job.id)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applications;
