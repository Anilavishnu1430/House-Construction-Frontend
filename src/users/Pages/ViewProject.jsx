import { Button, Modal, TabItem } from 'flowbite-react'
import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link, useParams } from 'react-router-dom'
import { Label, TextInput, Textarea, Radio } from "flowbite-react";
import { ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState, useEffect } from "react";
import { makePaymentAPI, viewAllProjectAPI } from '../../services/allAPIs'
import { getAProjectAPI } from "../../services/allAPIs";
import { loadStripe } from '@stripe/stripe-js';


function ViewProject() {
    
    const [token, setToken] = React.useState("")
    console.log(token);
    const { id } = useParams()
    console.log(id);
    const [project, setProject] = React.useState({})

    useEffect(() => {
        setToken(sessionStorage.getItem("token"))
        getProject(id)
    }, [token])


    const getProject = async (id) => {
        try {
            const reqHeader = {
                Authorization: `Bearer ${token}`
            }
            const response = await getAProjectAPI(id, reqHeader)
            console.log(response);
            setProject(response.data.project)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handlePayment = async () => {
        console.log(project);
        const stripe = await loadStripe('pk_test_51TPyayK0X2MRsi8XV6Ti5JviDUD6pG1Q3jURLiptAVRk2vA75q4lUEqcuuN9a9MQnUvW5tXJCRfbVIiOhOuU3a2k00dTDz90TH');
        console.log(stripe);
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            Authorization: `Bearer ${token}`
        }
        const reqBody = {
            project: project
        }
        try {
            const response = await makePaymentAPI(reqBody, reqHeader)
            console.log(response);
            const checkoutUrl = response.data.session.url
            window.location.href = checkoutUrl
        }
        catch (err) {
            console.log(err);
        }
    }

    const [openModal, setOpenModal] = useState(false);
    return (
        <div>
            <Header />
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 items-center">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-4xl font-bold text-[#660000] mb-6">
                                {project.projectname}
                            </h2>
                            <ul className="space-y-3 text-lg text-gray-700">
                                <li><span className="font-semibold text-[#660000]">Location:</span> {project.location}</li>
                                <li><span className="font-semibold text-[#660000]">Budget:</span> ₹{project.price}</li>
                                <li><span className="font-semibold text-[#660000]">Road Facing:</span> {project.direction}</li>
                                <li><span className="font-semibold text-[#660000]">Floors:</span> {project.type}</li>
                                <li><span className="font-semibold text-[#660000]">Plot Dimensions:</span> {project.plotsize}</li>
                            </ul>
                            <div className="flex gap-4 mt-8">
                                <Link to={"/projects"}>
                                    <Button className="bg-[#660000] hover:bg-[#5E445C] text-white font-semibold text-lg px-8 py-3 rounded-md shadow-md">
                                        Back
                                    </Button>
                                </Link>
                                <Button onClick={() => setOpenModal(true)} className="bg-[#660000] hover:bg-[#5E445C] text-white font-semibold text-lg px-8 py-3 rounded-md shadow-md">
                                    Book Now
                                </Button>
                            </div>
                        </div>
                        <div className="rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={project.imageUrl}
                                alt="Afzal Khan Residence"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Modal size='5xl' dismissible show={openModal} onClose={() => setOpenModal(false)} >
                <ModalHeader>Confirm Your Booking</ModalHeader>
                <ModalBody>
                    <p className='text-xl text-[#5E445C] my-2'>
                        “Your dream home at a fixed budget of ₹{project.price} is ready to book. While the construction cost remains the same, you’re free to personalize interiors, flooring, and the overall outline to match your style. Secure your booking today with an advance of ₹5000.”
                    </p>

                    <form className="space-y-1 rounded-lg">
                        {/* <h3 className="text-xl font-bold text-[#330000] mb-4">Type of Construction</h3>
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-2">
                                <Radio onChange={e => setBooking({ ...booking, type: e.target.value })} id="residential" name="constructionType" value="Residential" />
                                <Label htmlFor="residential">Residential</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio onChange={e => setBooking({ ...booking, type: e.target.value })} id="commercial" name="constructionType" value="Commercial" />
                                <Label htmlFor="commercial">Commercial</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio onChange={e => setBooking({ ...booking, type: e.target.value })} id="industrial" name="constructionType" value="Industrial" />
                                <Label htmlFor="industrial">Industrial</Label>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-[#330000] mb-4">Planned Start Date</h3>
                        <div>
                            <Label htmlFor="startDate" value="When do you plan to start?" className="text-[#5E445C]" />
                            <TextInput onChange={e => setBooking({ ...booking, date: e.target.value })} id="startDate" type="date" required className="mt-2" />
                        </div>
                        <h3 className="text-xl font-bold text-[#330000] mb-4">Current Stage</h3>
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-2">
                                <Radio onChange={e => setBooking({ ...booking, stage: e.target.value })} id="planning" name="stage" value="Planning" />
                                <Label htmlFor="planning">Planning</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio onChange={e => setBooking({ ...booking, stage: e.target.value })} id="foundation" name="stage" value="Foundation" />
                                <Label htmlFor="foundation">Foundation</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio onChange={e => setBooking({ ...booking, stage: e.target.value })} id="construction" name="stage" value="Construction" />
                                <Label htmlFor="construction">Construction</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio onChange={e => setBooking({ ...booking, stage: e.target.value })} id="finishing" name="stage" value="Finishing" />
                                <Label htmlFor="finishing">Finishing</Label>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-[#330000] mb-4">Land Details</h3>
                        <div>
                            <Label htmlFor="landUnit" value="Select Unit" className="text-[#5E445C]" />
                            <select onChange={e => setBooking({ ...booking, unit: e.target.value })}
                                id="landUnit"
                                name="landUnit"
                                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#330000] focus:ring-[#330000]"
                            >
                                <option value="sqyards">Sq yards</option>
                                <option value="sqfeet">Sq feet</option>
                                <option value="acres">Acres</option>
                                <option value="notsure">Not sure</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="landSize" value="Land Size (sq ft)" className="text-[#5E445C]" />
                            <TextInput onChange={e => setBooking({ ...booking, area: e.target.value })} id="landSize" type="number" placeholder="e.g., 2400" className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="landDescription" value="Land Description" className="text-[#5E445C]" />
                            <Textarea onChange={e => setBooking({ ...booking, description: e.target.value })} id="landDescription" placeholder="Describe the land..." rows={3} className="mt-2" />
                        </div>
                        <h3 className="text-xl font-bold text-[#330000] mb-4">Contact Information</h3>
                        <div>
                            <Label htmlFor="name" value="Name" className="text-[#5E445C]" />
                            <TextInput onChange={e => setBooking({ ...booking, fullname: e.target.value })} id="name" type="text" placeholder="Your full name" required className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="phone" value="Phone Number" className="text-[#5E445C]" />
                            <TextInput id="phone" type="tel" onChange={e => setBooking({ ...booking, phone: e.target.value })} placeholder="Enter phone number" required className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="email" value="Email Address" className="text-[#5E445C]" />
                            <TextInput id="email" type="email" onChange={e => setBooking({ ...booking, email: e.target.value })} placeholder="you@example.com" required className="mt-2" />
                        </div> */}
                        <h3 className="text-xl font-bold text-[#330000] mb-4">Advance Payment</h3>
                        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                            <p className="text-[#5E445C] font-semibold">Advance Payment Amount</p>
                            <p className="text-2xl font-bold text-[#330000] mt-2">₹5000</p>
                            <p className="text-sm text-[#5E445C] mt-1">*This amount is fixed and required to proceed</p>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => { setOpenModal(false); handlePayment(); }}
                        type="button"
                        className="w-full bg-[#330000] hover:bg-[#5E445C] text-white font-semibold"
                    >
                        Confirm & Pay ₹5000
                    </Button>
                </ModalFooter>
            </Modal>
            <Footer />
        </div>
    )
}

export default ViewProject
