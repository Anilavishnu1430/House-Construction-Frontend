import React, { useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import { Card, Label, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Textarea } from 'flowbite-react'
import { Table, Button } from "flowbite-react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { addReplyAPI, viewAllQuoteAPI } from '../../services/allAPIs';


function AdminHome() {
    const [openModal, setOpenModal] = useState(false);

    const [quote, setQuote] = React.useState([])

    
    const [replyMessage, setReplyMessage] = React.useState({
        userEmail: "",
        message: ""
    })
    const handleSendReply = async () => {
        const { userEmail, message } = replyMessage;
        if (message) {
            try {
                const token = sessionStorage.getItem("token")
                const reqHeader = {
                    Authorization: `Bearer ${token}`
                }
                const reqBody = { userEmail, message }
                const response = await addReplyAPI(reqBody, reqHeader)
                console.log(response);
                setOpenModal(false);
                if (response.status === 200) {
                    alert(response.data.message)
                    setReplyMessage({
                        userEmail: "",
                        message: ""
                    })
                    const updatedTable = quote.filter(item => item.email !== userEmail);
                    setQuote(updatedTable);
                }
            }
            catch (err) {
                console.log(err)
                alert("Error while sending reply")
            }
        }
        else {
            alert("Please fill the form")
        }
    }

    useEffect(() => {
        viewQuote()
    }, [])

    const viewQuote = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            Authorization: `Bearer ${token}`
        }
        try {
            const response = await viewAllQuoteAPI(reqHeader)
            console.log(response);
            setQuote(response.data.viewQuote)
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <AdminHeader />
            <section className="p-8">
                <h1 className="text-3xl font-bold text-[#660000] mb-6">Admin Dashboard</h1>
                
                <div className="grid grid-cols-3 gap-8 mb-10">

          <div className="bg-blue-100 shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
            <p className="text-black text-sm">Total Projects</p>
            <p className="text-4xl font-bold text-black mt-2">120</p>
          </div>

          <div className="bg-green-100 shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
            <p className="text-black text-sm">Total Users</p>
            <p className="text-4xl font-bold text-black mt-2">68</p>
          </div>

          <div className="bg-yellow-100 shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
            <p className="text-black text-sm">Contractors</p>
            <p className="text-4xl font-bold text-black mt-2">30</p>
          </div>

        </div>
                <div>
                    <h2 className="text-xl font-bold mb-4">Notifications</h2>
                    <Table className="border border-[#330000]">
                        <TableHead>
                            <TableRow className="bg-[#330000] text-white">
                                <TableHeadCell className="bg-[#330000] text-white">Name</TableHeadCell>
                                <TableHeadCell className="bg-[#330000] text-white">Mobile</TableHeadCell>
                                <TableHeadCell className="bg-[#330000] text-white">Location</TableHeadCell>
                                <TableHeadCell className="bg-[#330000] text-white">City</TableHeadCell>
                                <TableHeadCell className="bg-[#330000] text-white">Email</TableHeadCell>
                                <TableHeadCell className="bg-[#330000] text-white">Service</TableHeadCell>
                                <TableHeadCell className="bg-[#330000] text-white">Message</TableHeadCell>
                                <TableHeadCell className="bg-[#330000] text-white"></TableHeadCell>
                            </TableRow>
                        </TableHead>

                        <TableBody className="divide-y">
                            {
                                quote.length > 0 ?
                                    quote.map(item => (
                                        <TableRow>
                                            <TableCell className='text-[#660000]'>{item.name}</TableCell>
                                            <TableCell className='text-[#660000]'>{item.mobile}</TableCell>
                                            <TableCell className='text-[#660000]'>{item.location}</TableCell>
                                            <TableCell className='text-[#660000]'>{item.city}</TableCell>
                                            <TableCell className='text-[#660000]'>{item.email}</TableCell>
                                            <TableCell className='text-[#660000]'>{item.service}</TableCell>
                                            <TableCell className='text-[#660000]'>{item.message}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => { setReplyMessage({ ...replyMessage, userEmail: item.email }); setOpenModal(true) }} className="bg-[#660000] hover:bg-[#5E445C] text-white text-sm">
                                                    Reply
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : "No quote found"
                            }

                        </TableBody>
                    </Table>
                </div>
            </section>
            <Modal size='xl' dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader><span className="text-[#660000] font-bold text-2xl">Reply</span></ModalHeader>
                <ModalBody>
                    <form>
                        <p className="text-sm text-gray-600 mb-2">
                            Replying to: <span className="font-semibold">{replyMessage.userEmail}</span>
                        </p>
                        <div>
                            <Textarea onChange={e => setReplyMessage({ ...replyMessage, message: e.target.value })} id="message" placeholder="Type your Replay..." rows={4} className="mt-2" />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSendReply} className='bg-[#330000] hover:bg-[#5E445C]'>Send</Button>
                </ModalFooter>
            </Modal>
            <Footer />
        </div>
    )
}

export default AdminHome
