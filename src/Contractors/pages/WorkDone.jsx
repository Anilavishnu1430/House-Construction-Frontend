import React from 'react'
import ContractorHeader from '../components/ContractorHeader'
import Footer from '../../components/Footer'
import { Button, Label, Select, TextInput } from "flowbite-react";
import { addWorkdoneAPI } from '../../services/allAPIs';

function WorkDone() {

    const [workDone, setWorkDone] = React.useState({
        projectname: "",
        type: "",
        location: "",
        date: "",
        status: "",
        uploadedImage: ""
    })

    const [preview, setPreview] = React.useState("")

    const handleUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            setPreview(URL.createObjectURL(file));

            // store file
            setWorkDone({ ...workDone, uploadedImage: file });
        }
    }
    const handleAddWorkdoone = async () => {
        console.log(workDone);

        const { projectname, type, location, date, status, uploadedImage } = workDone

        if (projectname && type && location && date && status &&  uploadedImage) {
            try {
                let token = sessionStorage.getItem("token")
                const reqHeader = {
                    Authorization: `Bearer ${token}`
                }
                const reqBody = new FormData()

                reqBody.append("projectname", projectname);
                reqBody.append("type", type);
                reqBody.append("location", location);
                reqBody.append("date", date);
                reqBody.append("status", status);
                reqBody.append("uploadedImage", uploadedImage);


                const response = await addWorkdoneAPI(reqBody, reqHeader)
                console.log(response);
                if (response.status === 200) {
                    alert(response.data.message)
                    setWorkDone({
                        projectname: "",
                        type: "",
                        location: "",
                        date: "",
                        status: "",
                        uploadedImage: ""
                    })
                    setPreview("");
                }
            }
            catch (err) {
                console.log(err);
                alert(err.response.data.message)
            }
        }
        else {
            alert("Please fill the form")
        }
    }
    return (
        <div>
            <ContractorHeader />
            <h1 className="text-3xl font-bold text-[#660000] m-6">Work Updates</h1>
            <form className="bg-white space-y-8 shadow-lg rounded-lg m-8 p-8">
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex-1 space-y-6">
                        <Label htmlFor="name" className="text-[#660000]">Project Name</Label>
                        <TextInput onChange={e => setWorkDone({ ...workDone, projectname: e.target.value })} value={workDone.projectname} id="name" type="text" placeholder="Enter Project name" className="mt-2" />
                        <Label htmlFor="projectType" className="text-[#660000]">Project Type</Label>
                        <Select onChange={e => setWorkDone({ ...workDone, type: e.target.value })} value={workDone.type} id="projectType" className="mt-2">
                            <option value="">Select Project Type</option>
                            <option value="Home Construction">Home Construction</option>
                            <option value="Renovation">Renovation</option>
                        </Select>
                        <Label htmlFor="location" className="text-[#660000]">Location</Label>
                        <TextInput onChange={e => setWorkDone({ ...workDone, location: e.target.value })} value={workDone.location} id="location" type="text" placeholder="Enter location" className="mt-2" />
                    </div>
                    <div className="flex-1 space-y-6">
                        <Label htmlFor="date" className="text-[#660000]">Date completed</Label>
                        <TextInput onChange={e => setWorkDone({ ...workDone, date: e.target.value })} value={workDone.date} id="date" type="date" className="mt-2" />
                        <Label htmlFor="status" className="text-[#660000]">Status</Label>
                        <Select onChange={e => setWorkDone({ ...workDone, status: e.target.value })} value={workDone.status} id="status" className="mt-2"
                        >
                            <option value="">Select Status</option>
                            <option value="completed">Not Started</option>
                            <option value="completed">Ongoing</option>
                            <option value="completed">Completed</option>
                        </Select>
                        
                        <label htmlFor="file" className="cursor-pointer flex flex-col items-center">
                            <TextInput onChange={handleUpload} id="file" type="file" className="hidden" />
                            <img
                                src={preview ? preview : "https://www.freeiconspng.com/uploads/orange-square-button-document-file-page-up-upload-icon-5.jpeg"}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-lg"
                            />
                        </label>
                        <div className="flex justify-end gap-4 mt-6">
                            <Button onClick={handleAddWorkdoone} className="bg-[#660000] hover:bg-[#745271] text-white">Add</Button>
                        </div>
                    </div>

                </div>
            </form>
            <Footer />
        </div>
    )
}

export default WorkDone
