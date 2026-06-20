import React, { useEffect, useState } from 'react'
import { Card, Button, Avatar } from "flowbite-react"
import Header from '../components/Header'
import Footer from '../../components/Footer'
import Editprofile from '../components/EditProfile'
import { serverURL } from '../../services/serverURL';

function Profile() {
  const [userData, setUserData] = useState({});
  const userProfileData = () => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"));
    setUserData(user)
  };

  useEffect(() => {
    userProfileData();
  }, []);

  return (
    <div>
      <Header />
      <section className="py-12 flex justify-center">
        <div className="w-full max-w-4xl p-8">
          <h2 className="text-3xl font-extrabold text-[#660000] mb-8 text-center">
            My Profile
          </h2>
          <div className="flex flex-col md:flex-row gap-10 mb-10 bg-white shadow-lg p-10">
            <div className="md:w-1/3 flex flex-col items-center md:items-start">
              <img
                src={
                  userData.profile
                    ? userData.profile.startsWith("http")
                      ? userData.profile
                      : `${serverURL}/uploads/${userData.profile}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-[#660000]"
              />
              <h3 className="text-2xl font-bold text-[#660000]">{userData.username}</h3>
              <p className="text-[#5E445C]">{userData.bio}</p>
            </div>
            <div className="md:w-2/3">
              <h4 className="text-xl font-bold text-[#660000] mb-6">
                Personal Information
              </h4>
              <div className="flex flex-col md:flex-row md:justify-between gap-6">
                <ul className="space-y-3 text-[#5E445C]">
                  <li><span className="font-semibold">Full Name:</span> {userData.username}</li>
                  <li><span className="font-semibold">Email:</span> {userData.email}</li>
                  <li><span className="font-semibold">Phone Number:</span> {userData.phone}</li>
                  <li><span className="font-semibold">Bio:</span> {userData.bio}</li>
                </ul>
                
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-end mt-8">
            <Editprofile updatedProfile={userProfileData}/>
          </div>
        </div>
         
      </section>
      <Footer />
    </div>
  )
}

export default Profile
