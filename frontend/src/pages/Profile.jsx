import React from 'react'
import Sidebar from '../components/Sidebar'

const Profile = () => {

    const user = {
    name: "Aditya Rehpade",
    email: "adityarehapde1@gmail.com",
    phone: "+91 9876543210",
    idNumber: "12340000",
    degree: "B.Tech",
    program: "Electrical Engineering",
    cgpa: "8.7",
  };

  return (
    <div>
        <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4 text-slate-800">Student Profile</h1>
          <div className="space-y-4 text-slate-700">
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Phone:</strong> {user.phone}</div>
            <div><strong>ID Number:</strong> {user.idNumber}</div>
            <div><strong>Degree:</strong> {user.degree}</div>
            <div><strong>Program:</strong> {user.program}</div>
            <div><strong>CGPA:</strong> {user.cgpa}</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Profile
