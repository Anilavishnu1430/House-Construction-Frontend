import React, { useEffect, useState } from 'react'
import ContractorHeader from '../components/ContractorHeader'
import Footer from '../../components/Footer'
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { addRequestWorkAPI } from '../../services/allAPIs';


function RequestWork() {
    const [requestWork, setRequestWork] = useState({
        name: "",
        trade: "",
        type: "",
        location: "",
        date: "",
        notes: "",
        projectname:""
    })

    const handleAddRequestWork = async () => {

        const { name, trade, type, location, date, notes, projectname } = requestWork
        if (name && trade && type && location && date && notes, projectname) {
            try {
                let token = sessionStorage.getItem("token")
                const reqHeader = {
                    Authorization: `Bearer ${token}`
                }
                const reqBody = { name, trade, type, location, date, notes, projectname }
                const response = await addRequestWorkAPI(reqBody, reqHeader)
                console.log(response);
                if (response.status === 200) {
                    alert(response.data.message)
                    setRequestWork({
                        name: "",
                        trade: "",
                        type: "",
                        location: "",
                        date: "",
                        notes: "",
                        projectname: ""
                    })
                }
            }
            catch (err) {
                console.log(err);
                alert("Error while Request work")
            }
        }
        else {
            alert("Please fill the form")
        }
    }
    return (
        <div>
            <ContractorHeader />
            <h1 className="text-3xl font-bold text-[#660000] m-6">Request New Work</h1>
            <form className="bg-white space-y-8 shadow-lg rounded-lg m-8 p-8">
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex-1 space-y-6">
                        <Label htmlFor="name" className="text-[#660000]">Name</Label>
                        <TextInput onChange={e => setRequestWork({ ...requestWork, name: e.target.value })} id="name" type="text" placeholder="Enter contractor name" className="mt-2" />
                        <Label htmlFor="trade" className="text-[#660000]">Trade</Label>
                        <Select onChange={e => setRequestWork({ ...requestWork, trade: e.target.value })} id="trade" className="mt-2">
                            <option value="">Select Trade</option>
                            <option value="Plumber">Plumber</option>
                            <option value="Mason">Mason</option>
                            <option value="Electrician">Electrician</option>
                            <option value="Carpenter">Carpenter</option>
                        </Select>
                        <Label htmlFor="projectType" className="text-[#660000]">Project Type</Label>
                        <Select onChange={e => setRequestWork({ ...requestWork, type: e.target.value })} id="projectType" className="mt-2">
                            <option value="">Select Project Type</option>
                            <option value="Home Construction">Home Construction</option>
                            <option value="Renovation">Renovation</option>
                        </Select>
                        <Label htmlFor="projectname" className="text-[#660000]">Project name</Label>
                        <TextInput onChange={e => setRequestWork({ ...requestWork, projectname: e.target.value })} id="projectname" placeholder="Enter project name" rows={3} className="mt-2" />
                    </div>
                    <div className="flex-1 space-y-6">
                        <Label htmlFor="location" className="text-[#660000]">Location</Label>
                        <TextInput onChange={e => setRequestWork({ ...requestWork, location: e.target.value })} id="location" type="text" placeholder="Enter location" className="mt-2" />
                        <Label htmlFor="date" className="text-[#660000]">Start Date</Label>
                        <TextInput onChange={e => setRequestWork({ ...requestWork, date: e.target.value })} id="date" type="date" className="mt-2" />
                        <Label htmlFor="notes" className="text-[#660000]">Notes</Label>
                        <Textarea onChange={e => setRequestWork({ ...requestWork, notes: e.target.value })} id="notes" placeholder="Enter notes or description" rows={3} className="mt-2" />

                        <div className="flex justify-end gap-4 mt-6">
                            <Button onClick={handleAddRequestWork} className="bg-[#660000] hover:bg-[#745271] text-white">Request</Button>
                            <Button className="bg-[#660000] hover:bg-[#745271] text-white">Cancel</Button>
                        </div>
                    </div>

                </div>
            </form>
            <Footer />
        </div>
    )
}

export default RequestWork
