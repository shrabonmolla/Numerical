import React, { useEffect, useRef, useState } from 'react';

// Utility function to safely get photo URL
const getPhotoURL = (photo) => {
  if (!photo) return 'https://via.placeholder.com/150'; // fallback image
  if (photo.startsWith('http')) return photo;
  return `https://numerical-e8za.onrender.com/${photo.replace(/\\/g, '/')}`;
};

const MemberCard = ({ member, onPhotoUpdated }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(getPhotoURL(member.photo));
  const [updating, setUpdating] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    try {
      setUpdating(true);

      const res = await fetch(`https://numerical-e8za.onrender.com/api/member/${member._id}/photo`, {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const updated = await res.json();
      const newPhotoURL = getPhotoURL(updated.photo);
      setPreview(newPhotoURL);
      alert('Photo updated successfully!');
      onPhotoUpdated(updated);
    } catch (err) {
      console.error(err);
      alert('Error updating photo');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg flex items-center justify-between mb-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <img
          src={preview}
          alt={member.name || 'Member'}
          className="w-16 h-16 object-cover rounded-full border"
        />
        <div>
          <p className="text-lg font-semibold">{member.name || 'Unnamed Member'}</p>
          <p className="text-sm text-gray-600">{member.bio || 'No bio'}</p>
        </div>
      </div>

      <div>
        <button
          onClick={() => fileInputRef.current.click()}
          disabled={updating}
          className={`${
            updating ? 'bg-blue-300' : 'bg-purple-500 hover:bg-purple-600'
          } text-white px-4 py-2 rounded-lg transition`}
        >
          {updating ? 'Uploading...' : 'Change Photo'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

const MembersList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('https://numerical-e8za.onrender.com/api/member')
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error('Error fetching members:', err));
  }, []);

  const handlePhotoUpdated = (updatedMember) => {
    setMembers((prev) =>
      prev.map((m) => (m._id === updatedMember._id ? updatedMember : m))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Member Profiles</h1>
      {members.length === 0 ? (
        <p className="text-gray-500">No members found.</p>
      ) : (
        members.map((member) => (
          <MemberCard
            key={member._id}
            member={member}
            onPhotoUpdated={handlePhotoUpdated}
          />
        ))
      )}
    </div>
  );
};

export default MembersList;
