import React,{useState} from 'react';
import Sidebar from '../components/Sidebar';




const Profile = () => {

const [profile, setProfile] = useState({
    name: ' Vijay S',
    email: 'svijay@example.com',
    phone: '+91 45687 7890',
    discipline: 'Computer Science',
    batch:'2023'
  });


  const [isEditing, setIsEditing] = useState(false);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  
  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    
    console.log('Updated Profile:', profile);
  };

  
  return (<div className="flex">
      {/* Sidebar */}
      <div className="w-1/4  ">
        <Sidebar /> 
      </div>

    
      <div className="w-3/4 max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Student Profile</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <span className="text-lg text-gray-800">{profile.name}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <span className="text-lg text-gray-800">{profile.email}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Phone:</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <span className="text-lg text-gray-800">{profile.phone}</span>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Discipline:</label>
            {isEditing ? (
              <input
                type="text"
                name="program"
                value={profile.discipline}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <span className="text-lg text-gray-800">{profile.discipline}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Batch:</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={profile.batch}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <span className="text-lg text-gray-800">{profile.batch}</span>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-400 transition duration-300"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>

            {isEditing && (
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition duration-300"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile