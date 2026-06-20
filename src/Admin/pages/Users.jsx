import React, { useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import { Card } from 'flowbite-react'
import { deleteAUserAPI, getAllUsersAPI } from '../../services/allAPIs'
import { serverURL } from '../../services/serverURL';
import { MdDelete } from "react-icons/md";

function Users() {

  const [allUsers, setAllUsers] = React.useState([])

  useEffect(() => {
    getAllUsers()
  }, [])

  const getAllUsers = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await getAllUsersAPI(reqHeader)
      console.log(response);
      setAllUsers(response.data.allusers)
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await deleteAUserAPI(id,reqHeader)
      console.log(response);
      getAllUsers()
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <AdminHeader />
      <h1 className="text-3xl font-bold text-[#660000] m-6">User Details</h1>
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {
          allUsers.length > 0 ?
            allUsers.map(item => (
              <Card className="w-92 shadow-md p-4">
                <div className="flex justify-end">
                  <MdDelete onClick={()=>handleDelete(item._id)} className='text-red-800 text-2xl' />
                </div>

                <p className="text-sm font-medium text-[#660000] mb-3">
                  ID: {item._id}
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.profile
                        ? item.profile.startsWith("http")
                          ? item.profile
                          : `${serverURL}/uploads/${item.profile}`
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="profile"
                    className="w-15 h-15 rounded-full"
                  />
                  <div>
                    <h5 className="text-2xl font-semibold text-[#660000]">{item.username}</h5>
                    <p className="text-md text-[#660000]">{item.email}</p>
                  </div>
                </div>
              </Card>
            ))
            : "No user Find"
        }
      </div>
      <Footer />
    </div>
  )
}

export default Users
