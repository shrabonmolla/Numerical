import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaFacebookF, FaArrowRight } from 'react-icons/fa'; // Add this to your imports

import {
  FaPhone,
  FaSchool,
  FaMapMarkerAlt,
  FaUniversity,
  FaBus,
} from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { FaMapLocation } from 'react-icons/fa6';
import { motion } from 'framer-motion';

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/member')
      .then((res) => res.json())
      .then((data) => {
        const foundUser = data.find((user) => user._id === id);
        setProfile(foundUser);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [id]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-600">
        Loading...
      </div>
    );
  }

  const cleanPhotoPath = profile.photo.replace(/\\/g, '/');

  return (
    <div className="overflow-x-hidden relative min-h-screen flex items-center justify-center p-4 bg-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent -z-10" />

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-screen-lg bg-white rounded-2xl shadow-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* LEFT: Image + Name/Dept */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center md:items-start gap-6"
        >
          <div className="w-full">
            <img
              src={`http://localhost:3000/${cleanPhotoPath}`}
              alt={profile.name}
              className="w-full h-80 md:h-96 object-cover rounded-xl shadow-md"
            />
          </div>
          <div className="w-full sm:justify-center md:text-left text-center m-auto flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {profile.name}
            </h2>
            <p className="text-gray-600">{profile.bio}</p>
<button className="flex items-center  gap-2 text-white bg-purple-900 hover:bg-purple-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2 transition ">
  <FaFacebookF />
  <Link to={profile.fbId} className="flex items-center gap-1 ">
    Facebook 
  </Link>
</button>
          </div>
        </motion.div>

        {/* RIGHT: Info List */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <div className="text-center md:text-left">
            <p className="font-bold text-purple-900 text-2xl kiresala">Information</p>
            <hr className="mt-1 text-purple-900" />
          </div>

          <div className="space-y-3 text-gray-700 text-sm md:text-base [&>div]:shadow-md [&>div]:p-4 [&>div]:rounded-lg">
            <InfoItem icon={<FaSchool />} label="college" value={profile.college} delay={0.4} />
            <InfoItem icon={ <FaMapMarkerAlt />} label="Location" value={profile.presentaddd} delay={0.45} />
            <InfoItem icon={<FaMapLocation />} label="District" value={profile.district} delay={0.5} />
            <InfoItem icon={<MdBloodtype />} label="Blood Group" value={profile.blood} textClass="text-red-800" delay={0.65} />
            <InfoItem icon={<FaBus />} label="Varsity Bus" value={profile.bus} delay={0.7} />
            <InfoItem icon={<FaPhone />} label="Phone" value={profile.phone} delay={0.7} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function InfoItem({ icon, label, value, textClass = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.2 }}
      className={`flex justify-between items-center ${textClass}`}
    >
      <div className="flex items-center gap-4 font-bold">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-right">{value}</div>
    </motion.div>
  );
}

export default Profile;