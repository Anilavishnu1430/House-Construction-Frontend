import React, { useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import { Button, Label, TextInput } from 'flowbite-react'
import { updateUserProfileAPI } from '../../services/allAPIs'
import { serverURL } from '../../services/serverURL'


function Settings() {

  const [preview, setPreview] = React.useState("")

  const [adminDetails, setAdminDetails] = React.useState({
    id: "",
    username: "",
    password: "",
    cpassword: "",
    bio: "",
    profile: "",
    phone: ""
  })

  useEffect(() => {
    const adminData = JSON.parse(sessionStorage.getItem("existingUser"));
    console.log(adminData);
    if (adminData) {
      setAdminDetails({
        id: adminData._id,
        username: adminData.username,
        password: "",
        cpassword: "",
        bio: adminData.bio,
        profile: adminData.profile || "",
        phone: adminData.phone
      });
    }
  }, [])

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));

      // store file
      setAdminDetails({ ...adminDetails, profile: file });
    }
  }

  const handleUpdate = async () => {
    console.log(adminDetails);
    const { id, username, password, cpassword, bio, profile, phone } = adminDetails
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
      if (updatedProfile) {
        updatedProfile()
      }
    }
    catch (err) {
      console.log(err);

    }
  }

  const handleReset = async () =>{
    const adminData = JSON.parse(sessionStorage.getItem("existingUser"));
    console.log(adminData);
    if (adminData) {
      setAdminDetails({
        id: adminData._id,
        username: adminData.username,
        password: "",
        cpassword: "",
        bio: adminData.bio,
        profile: adminData.profile || "",
        phone: adminData.phone
      });
      setPreview("");
    }
  }


  return (
    <div>
      <AdminHeader />
      <div className="p-10">
        <h1 className="text-3xl font-bold text-[#660000] text-center mb-6">Settings</h1>
        <div className="flex flex-col justify-between items-center gap-10">
          <div className="w-1/2 text-black-700">
            Update your profile details here. You can change your name,
            contact information, password, and profile picture to keep your account secure and up to date.
          </div>
          <div className="w-1/2">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img
                  src={
                    preview
                      ? preview
                      : adminDetails.profile
                        ? adminDetails.profile.startsWith("http")
                          ? adminDetails.profile
                          : `${serverURL}/uploads/${adminDetails.profile}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <label
                  htmlFor="file"
                  className="absolute bottom-0 right-0 cursor-pointer flex flex-col items-center"
                >
                  <TextInput onChange={handleUpload} id="file" type="file" className="hidden" />
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                    alt=""
                    className="w-5 h-5"
                  />
                </label>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" value="Name" />
                <TextInput onChange={e => setAdminDetails({ ...adminDetails, username: e.target.value })} value={adminDetails.username} id="username" placeholder="Name" />
              </div>
              <div>
                <Label htmlFor="password1" value="Password" />
                <TextInput onChange={e => setAdminDetails({ ...adminDetails, password: e.target.value })} value={adminDetails.password} id="password1" type="password" placeholder="Password" />
              </div>
              <div>
                <Label htmlFor="password2" value="Confirm Password" />
                <TextInput onChange={e => setAdminDetails({ ...adminDetails, cpassword: e.target.value })} value={adminDetails.cpassword} id="cpassword2" type="password" placeholder="Confirm Password" />
              </div>
              <div>
                <Label htmlFor="bio" value="bio" />
                <TextInput onChange={e => setAdminDetails({ ...adminDetails, bio: e.target.value })} value={adminDetails.bio} id="bio" placeholder="Bio" />
              </div>
              <div>
                <Label htmlFor="phone" value="phone" />
                <TextInput onChange={e => setAdminDetails({ ...adminDetails, phone: e.target.value })} value={adminDetails.phone} id="phone" placeholder="Phone" />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button onClick={handleReset} className="bg-[#660000] hover:bg-[#5E445C]">Reset</Button>
              <Button onClick={handleUpdate} className="bg-[#660000] hover:bg-[#5E445C]">Update</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Settings
