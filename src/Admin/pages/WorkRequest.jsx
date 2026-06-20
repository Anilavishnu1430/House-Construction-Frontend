import React, { useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import { Button, Modal, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { approveRequestAPI, rejectRequestAPI, viewRequestWorkAPI } from '../../services/allAPIs';
import { TiTick } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";


function WorkRequest() {
    const [requestWork, setRequestWork] = React.useState([])

    useEffect(() => {
            viewRequestWork()
        }, [])
    
        const viewRequestWork = async () => {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                Authorization: `Bearer ${token}`
            }
            try {
                const response = await viewRequestWorkAPI(reqHeader)
                console.log(response);
                setRequestWork(response.data.viewRequestWork)
            }
            catch (err) {
                console.log(err)
            }
        }

        const handleApprove=async(id)=>{
          const token = sessionStorage.getItem("token")
            const reqHeader = {
                Authorization: `Bearer ${token}`
            }
             try {
                const response = await approveRequestAPI(id,reqHeader)
                console.log(response); 
                viewRequestWork()
            }
            catch (err) {
                console.log(err)
            }
        }

        const handleReject=async(id)=>{
          const token = sessionStorage.getItem("token")
            const reqHeader = {
                Authorization: `Bearer ${token}`
            }
             try {
                const response = await rejectRequestAPI(id,reqHeader)
                console.log(response); 
                viewRequestWork()
            }
            catch (err) {
                console.log(err)
            }
        }

    const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <AdminHeader/>
    <div className="overflow-x-auto p-20">
        <h1 className="text-3xl font-bold text-[#660000] mb-6">Work Requets</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell className="bg-[#330000] text-white">No</TableHeadCell>
            <TableHeadCell className="bg-[#330000] text-white">Name</TableHeadCell>
            <TableHeadCell className="bg-[#330000] text-white">Project Type</TableHeadCell>
            <TableHeadCell className="bg-[#330000] text-white">Trade</TableHeadCell>
            <TableHeadCell className="bg-[#330000] text-white">Location</TableHeadCell>
            <TableHeadCell className="bg-[#330000] text-white">Start Date</TableHeadCell>
            <TableHeadCell className="bg-[#330000] text-white">Project Name</TableHeadCell>
            <TableHeadCell className="bg-[#330000] text-white"></TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody className="divide-y">
          {
            requestWork.length>0?
            requestWork.map((item,index)=>(
              <TableRow key={item._id}>
            <TableCell className="font-medium text-[#660000]">{index + 1}</TableCell>
            <TableCell className='text-[#660000]'>{item.name}</TableCell>
            <TableCell className='text-[#660000]'>{item.type}</TableCell>
            <TableCell className='text-[#660000]'>{item.trade}</TableCell>
            <TableCell className='text-[#660000]'>{item.location}</TableCell>
            <TableCell className='text-[#660000]'>{item.date}</TableCell>
            <TableCell className='text-[#660000]'>{item.projectname}</TableCell>
            <TableCell>
              {
                item.status === "pending" ?
                <div className='flex justify-evenly'>
                <Button onClick={()=>handleApprove(item._id)} size="xs" className="bg-[#660000] hover:bg-[#5E445C] text-white mr-2 w-25">
                  <TiTick className='text-2xl'/> Approve
                  </Button>
              <Button onClick={()=>handleReject(item._id)} size="xs" className="bg-[#660000] hover:bg-[#5E445C] text-white mr-2 w-25">
                <IoCloseSharp className='text-2xl'/>Reject
                </Button>
              </div>
              :item.status==="approved"?
              <Button onClick={()=>handleReject(item._id)} size="xs" className="bg-[#660000] hover:bg-[#5E445C] text-white mr-2 w-25">
                   Approved
                  </Button>
                  :<Button onClick={()=>handleApprove(item._id)} size="xs" className="bg-[#660000] hover:bg-[#5E445C] text-white mr-2 w-25">
                Rejected
                </Button>
              }
            </TableCell>
          </TableRow>
            ))
            :"No request found"
          }
        </TableBody>
      </Table>
    </div>
    <Modal size='xl' dismissible show={openModal} onClose={() => setOpenModal(false)}>
                    <ModalHeader>Contractor Request Details</ModalHeader>
                    <ModalBody>
                        <div className="space-y-4 text-[#330000]">
                        <p><strong>Request ID:</strong> 1</p>
                        <p><strong>Name:</strong>Rajesh</p>
                        <p><strong>Contact:</strong> 9898987656</p>
                        <p><strong>Email:</strong> Rajesh@gmail.com</p>
                        <p><strong>Project Type:</strong> Residential</p>
                        <p><strong>Location:</strong> kochi</p>
                        <p><strong>Date:</strong> 5/4/2026</p>
                        <p><strong>Status:</strong> Awaiting Approval</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={() => setOpenModal(false)}
                            type="submit"
                            className=" bg-[#330000] hover:bg-[#5E445C] text-white font-semibold"
                        >
                            Approve
                        </Button>
                        <Button
                            onClick={() => setOpenModal(false)}
                            type="submit"
                            className=" bg-[#330000] hover:bg-[#5E445C] text-white font-semibold"
                        >
                            Reject
                        </Button>
                    </ModalFooter>
                </Modal>
      <Footer/>
    </div>
  )
}

export default WorkRequest
