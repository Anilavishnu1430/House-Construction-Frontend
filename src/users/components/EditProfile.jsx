import React from 'react'
import { Button, Drawer, DrawerHeader, DrawerItems, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { useEffect } from "react";
import { serverURL } from '../../services/serverURL';
import { updateUserProfileAPI } from '../../services/allAPIs';


function EditProfile({ updatedProfile }) {

  const [preview, setPreview] = React.useState("")

  const [userDetails, setUserDetails] = React.useState({
    id: "",
    username: "",
    password: "",
    cpassword: "",
    bio: "",
    profile: "",
    phone: ""
  })

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("existingUser"));
    console.log(userData);
    if (userData) {
      setUserDetails({
        id: userData._id,
        username: userData.username,
        password: "",
        cpassword: "",
        bio: userData.bio,
        profile: userData.profile || "",
        phone: userData.phone
      });
    }
  }, [])

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));

      // store file
      setUserDetails({ ...userDetails, profile: file });
    }
  }

  const handleUpdate = async () => {
    console.log(userDetails);
    const { id, username, password, cpassword, bio, profile, phone } = userDetails
    if (password && password !== cpassword) {
      alert("Password Mismatch")
      return;
    }
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    const reqBody = new FormData();
    if (username) reqBody.append("username", username);
    if (password) reqBody.append("password", password);
    if (bio) reqBody.append("bio", bio);
    // instanceof File : Sends the profile only if it’s a new uploaded file, otherwise skips it.
    if (profile instanceof File) {
      reqBody.append("profile", profile);
    }
    if (phone) reqBody.append("phone", phone);
    try {
      const response = await updateUserProfileAPI(id, reqBody, reqHeader);
      console.log(response);
      alert(response.data.message);

      // update session
      sessionStorage.setItem(
        "existingUser",
        JSON.stringify(response.data.updateProfile)
      );
      if(updatedProfile){
        updatedProfile()
      }
      setIsOpen(false);
    }
    catch (err) {
      console.log(err);

    }
  }

  const handleReset = async () =>{
    const userData = JSON.parse(sessionStorage.getItem("existingUser"));
    console.log(userData);
    if (userData) {
      setUserDetails({
        id: userData._id,
        username: userData.username,
        password: "",
        cpassword: "",
        bio: userData.bio,
        profile: userData.profile || "",
        phone: userData.phone
      });
      setPreview("");
    }
  }


  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)} size="md" className='bg-[#660000] hover:bg-[#5E445C]'>
        Edit
      </Button>
      <Drawer open={isOpen} onClose={handleClose} position="left">
        <DrawerHeader title="Edit Profile" />
        <DrawerItems>
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={
                  preview
                    ? preview
                    : userDetails.profile
                      ? userDetails.profile.startsWith("http")
                        ? userDetails.profile
                        : `${serverURL}/uploads/${userDetails.profile}`
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <label htmlFor="file" className="absolute bottom-0 right-0 cursor-pointer flex flex-col items-center">
                <TextInput onChange={handleUpload} id="file" type="file" hidden />
                <img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="" className="w-5 h-5" />
              </label>

            </div>
          </div>
          <div className="flex justify-center items-center gap-2 mb-2">
            <h2 className="text-xl font-semibold">{userDetails.username}</h2>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR24hy9dlk78YXM0cFFOHtKkihBPWKRDch0tQ&s"
              className='w-5 h-5' />
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" value="Name" />
              <TextInput onChange={e => setUserDetails({ ...userDetails, username: e.target.value })} value={userDetails.username} id="username" placeholder="Name" />
            </div>
            <div>
              <Label htmlFor="password1" value="Password" />
              <TextInput onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} value={userDetails.password} id="password1" type="password" placeholder="Password" />
            </div>
            <div>
              <Label htmlFor="password2" value="Confirm Password" />
              <TextInput onChange={e => setUserDetails({ ...userDetails, cpassword: e.target.value })} value={userDetails.cpassword} id="cpassword2" type="password" placeholder="Confirm Password" />
            </div>
            <div>
              <Label htmlFor="bio" value="bio" />
              <TextInput onChange={e => setUserDetails({ ...userDetails, bio: e.target.value })} value={userDetails.bio} id="bio" placeholder="Bio" />
            </div>
            <div>
              <Label htmlFor="phone" value="phone" />
              <TextInput onChange={e => setUserDetails({ ...userDetails, phone: e.target.value })} value={userDetails.phone} id="phone" placeholder="Phone" />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button onClick={handleReset} className="bg-[#660000] hover:bg-[#5E445C]">Reset</Button>
            <Button onClick={handleUpdate} className="bg-[#660000] hover:bg-[#5E445C]">Update</Button>
          </div>
        </DrawerItems>
      </Drawer>
    </div>
  )
}

export default EditProfile
