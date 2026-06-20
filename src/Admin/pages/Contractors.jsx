import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import { Button, Select, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Label, TextInput, Textarea } from "flowbite-react";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { addContractorAPI, deleteAContractorAPI, getAllContractorsAPI, updateContractorAPI } from '../../services/allAPIs';
import { useEffect } from 'react';


function Contractors() {



    const [allContractor, setAllContractor] = React.useState([])

    const [contractor, setContractor] = useState({
         _id: "",
        name: "",
        phone: "",
        email: "",
        trade: "",
        type: "",
        location: "",
        date: "",
        notes: "",
        status: ""
    })

    const handleAddContractor = async () => {

        const { name, phone, email, trade, type, location, date, notes, status } = contractor
        console.log(contractor);
        if (name && phone && email && trade && type && location && date && notes && status) {
            try {
                let token = sessionStorage.getItem("token")
                const reqHeader = {
                    Authorization: `Bearer ${token}`
                }
                const reqBody = { name, phone, email, trade, type, location, date, notes, status }
                const response = await addContractorAPI(reqBody, reqHeader)
                console.log(response);
                if (response.status === 200) {
                    alert(response.data.message)

                    setContractor({
                        _id: "",
                        name: "",
                        phone: "",
                        email: "",
                        trade: "",
                        type: "",
                        location: "",
                        date: "",
                        notes: "",
                        status: ""
                    })
                    viewContractor()
                    setOpenModal(false);
                }
            }
            catch (err) {
                console.log(err);
                alert("Error while add Contractor")
            }
        }
        else {
            alert("Please fill the form")
        }

    }

    useEffect(() => {
        viewContractor()
    }, [])

    const viewContractor = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            Authorization: `Bearer ${token}`
        }
        try {
            const response = await getAllContractorsAPI(reqHeader)
            console.log(response);
            setAllContractor(response.data.viewContractor)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleEditClick = (item) => {
        setContractor({
            _id: item._id,
            name: item.name,
            phone: item.phone,
            email: item.email,
            trade: item.trade,
            type: item.type,
            location: item.location,
            date: item.date,
            notes: item.notes,
            status: item.status
        });
        setOpenEditModal(true);
    }

    const handleUpdate = async () => {
        console.log(contractor);
        const { _id, name, phone, email, trade, type, location, date, notes, status } = contractor

        try {
            const token = sessionStorage.getItem("token");

            const reqHeader = {
                Authorization: `Bearer ${token}`
            };

            const reqBody = {
                name, phone, email, trade, type, location, date, notes, status
            };

            const response = await updateContractorAPI(_id, reqBody, reqHeader);

            console.log(response);

            if (response.status === 200) {
                alert(response.data.message);

                viewContractor();
                setOpenEditModal(false);

                setContractor({
                    _id: "",
                    name: "",
                    phone: "",
                    email: "",
                    trade: "",
                    type: "",
                    location: "",
                    date: "",
                    notes: "",
                    status: ""
                });
            }

        } catch (err) {
            console.log(err);
            alert("Updation failed");
        }
    }

    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          Authorization: `Bearer ${token}`
        }
        try {
          const response = await deleteAContractorAPI(id,reqHeader)
          console.log(response);
          viewContractor()
        }
        catch (err) {
          console.log(err)
        }
      }

    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false)
    return (
        <div>
            <AdminHeader />
            <div className="overflow-x-auto p-10">
                <h1 className="text-3xl font-bold text-[#660000] mb-6">Contractor Details</h1>
                <div className="flex justify-end mb-4">
                    <Button onClick={() => setOpenModal(true)}
                        className="bg-[#660000] hover:bg-[#5E445C] text-white">
                        Add Contractor
                    </Button>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell className="bg-[#330000] text-white">No</TableHeadCell>
                            <TableHeadCell className="bg-[#330000] text-white">Name</TableHeadCell>
                            <TableHeadCell className="bg-[#330000] text-white">Phone</TableHeadCell>
                            <TableHeadCell className="bg-[#330000] text-white">Email</TableHeadCell>
                            <TableHeadCell className="bg-[#330000] text-white">Trade</TableHeadCell>
                            <TableHeadCell className="bg-[#330000] text-white">Project Type</TableHeadCell>
                            <TableHeadCell className="bg-[#330000] text-white">Location</TableHeadCell>
                            <TableHeadCell className="bg-[#330000] text-white">Date</TableHeadCell>
                            <TableHeadCell className="bg-[#330000] text-white">Notes</TableHeadCell>
                            <TableHeadCell className="bg-[#330000] text-white">Status</TableHeadCell>
                            <TableHeadCell className="bg-[#330000] text-white"></TableHeadCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className="divide-y">
                        {
                            allContractor.length > 0 ?
                                allContractor.map((item, index) => (
                                    <TableRow key={item._id}>
                                        <TableCell className="font-medium text-[#660000]">{index + 1}</TableCell>
                                        <TableCell className='text-[#660000]'>{item.name}</TableCell>
                                        <TableCell className='text-[#660000]'>{item.phone}</TableCell>
                                        <TableCell className="text-[#660000]">{item.email}</TableCell>
                                        <TableCell className="text-[#660000]">{item.trade}</TableCell>
                                        <TableCell className="text-[#660000]">{item.type}</TableCell>
                                        <TableCell className="text-[#660000]">{item.location}</TableCell>
                                        <TableCell className="text-[#660000]">{item.date}</TableCell>
                                        <TableCell className="text-[#660000]">{item.notes}</TableCell>
                                        <TableCell className="text-[#660000]">{item.status}</TableCell>
                                        <TableCell>
                                            <p  size="xs" className="text-[#660000] mb-2"><FaEdit onClick={() => handleEditClick(item)}/></p>
                                            <p size="xs" className="text-[#660000] mb-2"><FaTrash  onClick={()=>handleDelete(item._id)}/></p>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : "No contractor found"
                        }

                    </TableBody>
                </Table>
            </div>
            <Modal size='5xl' dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader className="text-xl font-bold text-[#330000] mb-4">Contractor Details</ModalHeader>
                <ModalBody>
                    <form className="space-y-8 bg-white shadow-lg rounded-lg p-8">
                        <div>
                            <Label htmlFor="name" className="text-[#5E445C]">Name</Label>
                            <TextInput onChange={e => setContractor({ ...contractor, name: e.target.value })} value={contractor.name} id="name" type="text" placeholder="Enter contractor name" className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="phone" className="text-[#5E445C]">Phone</Label>
                            <TextInput onChange={e => setContractor({ ...contractor, phone: e.target.value })} value={contractor.phone} id="phone" type="tel" placeholder="Enter phone number" className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-[#5E445C]">Email</Label>
                            <TextInput onChange={e => setContractor({ ...contractor, email: e.target.value })} value={contractor.email} id="email" type="email" placeholder="Enter email address" className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="trade" className="text-[#5E445C]">Trade</Label>
                            <Select onChange={e => setContractor({ ...contractor, trade: e.target.value })} value={contractor.trade} id="trade" className="mt-2">
                                <option value="">Select Trade</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Engineer">Engineer</option>
                                <option value="Electrician">Electrician</option>
                                <option value="Carpenter">Carpenter</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="projectType" className="text-[#5E445C]">Project Type</Label>
                            <Select onChange={e => setContractor({ ...contractor, type: e.target.value })} value={contractor.type} id="projectType" className="mt-2">
                                <option value="">Select Project Type</option>
                                <option value="Home Construction">Home Construction</option>
                                <option value="Renovation">Renovation</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="location" className="text-[#5E445C]">Location</Label>
                            <TextInput id="location" onChange={e => setContractor({ ...contractor, location: e.target.value })} value={contractor.location} type="text" placeholder="Enter location" className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="date" className="text-[#5E445C]">Date</Label>
                            <TextInput onChange={e => setContractor({ ...contractor, date: e.target.value })} value={contractor.date} id="date" type="date" className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="notes" className="text-[#5E445C]">Notes</Label>
                            <Textarea onChange={e => setContractor({ ...contractor, notes: e.target.value })} value={contractor.notes} id="notes" placeholder="Enter notes or description" rows={3} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="status" className="text-[#5E445C]">Status</Label>
                            <Select onChange={e => setContractor({ ...contractor, status: e.target.value })} value={contractor.status} id="status" className="mt-2">
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Select>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <Button onClick={handleAddContractor} className="bg-[#660000] hover:bg-[#5E445C] text-white">Save</Button>
                            <Button onClick={() => setOpenModal(false)} className="bg-[#660000] hover:bg-[#5E445C] text-white">Cancel</Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Modal size='5xl' dismissible show={openEditModal} onClose={() => setOpenEditModal(false)}>
                <ModalHeader className="text-xl font-bold text-[#330000] mb-4">Update Contractor Details</ModalHeader>
                <ModalBody>
                    <form className="space-y-8 bg-white shadow-lg rounded-lg p-8">
                        <div>
                            <Label htmlFor="name" className="text-[#5E445C]">Name</Label>
                            <TextInput onChange={e => setContractor({ ...contractor, name: e.target.value })} value={contractor.name} id="name" type="text" placeholder="Enter contractor name" className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="phone" className="text-[#5E445C]">Phone</Label>
                            <TextInput onChange={e => setContractor({ ...contractor, phone: e.target.value })} value={contractor.phone} id="phone" type="tel" placeholder="Enter phone number" className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-[#5E445C]">Email</Label>
                            <TextInput onChange={e => setContractor({ ...contractor, email: e.target.value })} value={contractor.email} id="email" type="email" placeholder="Enter email address" className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="trade" className="text-[#5E445C]">Trade</Label>
                            <Select onChange={e => setContractor({ ...contractor, trade: e.target.value })} value={contractor.trade} id="trade" className="mt-2">
                                <option value="">Select Trade</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Engineer">Engineer</option>
                                <option value="Electrician">Electrician</option>
                                <option value="Carpenter">Carpenter</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="projectType" className="text-[#5E445C]">Project Type</Label>
                            <Select onChange={e => setContractor({ ...contractor, type: e.target.value })} value={contractor.type} id="projectType" className="mt-2">
                                <option value="">Select Project Type</option>
                                <option value="Home Construction">Home Construction</option>
                                <option value="Renovation">Renovation</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="location" className="text-[#5E445C]">Location</Label>
                            <TextInput id="location" onChange={e => setContractor({ ...contractor, location: e.target.value })} value={contractor.location} type="text" placeholder="Enter location" className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="date" className="text-[#5E445C]">Date</Label>
                            <TextInput onChange={e => setContractor({ ...contractor, date: e.target.value })} value={contractor.date} id="date" type="date" className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="notes" className="text-[#5E445C]">Notes</Label>
                            <Textarea onChange={e => setContractor({ ...contractor, notes: e.target.value })} value={contractor.notes} id="notes" placeholder="Enter notes or description" rows={3} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="status" className="text-[#5E445C]">Status</Label>
                            <Select onChange={e => setContractor({ ...contractor, status: e.target.value })} value={contractor.status} id="status" className="mt-2">
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Select>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <Button onClick={handleUpdate} className="bg-[#660000] hover:bg-[#5E445C] text-white">Update</Button>
                            <Button onClick={() => setOpenEditModal(false)} className="bg-[#660000] hover:bg-[#5E445C] text-white">Cancel</Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Footer />
        </div>
    )
}

export default Contractors
