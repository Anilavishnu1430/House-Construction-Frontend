import React, { useState } from 'react'
import Header from '../components/Header'
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Button } from "flowbite-react";
import { Card } from "flowbite-react";
import { FaClipboardList, FaCalculator, FaCalendarAlt, FaHome, FaSmileBeam } from "react-icons/fa";
import { FaHardHat, FaBusinessTime, FaBuilding, FaProjectDiagram, FaUsers } from "react-icons/fa";
import Footer from '../../components/Footer';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { Label, TextInput, Textarea, Radio } from "flowbite-react";
import { addQuoteAPI } from '../../services/allAPIs';



function Home() {
  const [openModal, setOpenModal] = useState(false);

  const [quote, setQuote] = useState({
    name: "",
    mobile: "",
    location: "",
    city: "",
    email: "",
    service: "",
    message: ""
  })

  const handleAddQuote = async () => {

    const { name, mobile, location, city, email, service, message } = quote;
    if (name && mobile && location && city && email && service && message) {
      try {
        let token = sessionStorage.getItem("token")
        const reqHeader = {
          Authorization: `Bearer ${token}`
        }
        const reqBody = { name, mobile, location, city, email, service, message }
        const response = await addQuoteAPI(reqBody, reqHeader)
        console.log(response);
        if (response.status === 200) {
          alert(response.data.message)
          setQuote({
            name: "",
            mobile: "",
            location: "",
            city: "",
            email: "",
            service: "",
            message: ""
          })
        }
        setOpenModal(false)
      }
      catch (err) {
        console.log(err);
        alert("Error while add quote")
      }
    }
    else {
      alert("Please fill the form")
    }
  }
  return (
    <div>
      <Header />
      <section className='w-ful h-screen bg-[url(https://cdn.jswonehomes.com/Home_Hero_Web_Image_0095d89aac/Home_Hero_Web_Image_0095d89aac.webp)] bg-cover bg-center bg-fixed flex items-center justify-center'>
        <div className="bg-opacity-50 p-10 rounded-lg text-center max-w-xl">
          <h1 className="text-4xl font-bold text-black-900 mb-4" data-aos="zoom-in">
            You Dream. We Deliver.
          </h1>
          <p className="text-black-900 mb-6" data-aos="zoom-in">
            Build your dream home hassle-free with DreamConstruct.
          </p>
          <Button onClick={() => setOpenModal(true)} className="w-full bg-[#660000] text-white font-semibold hover:bg-[#5E445C] transition-colors" data-aos="flip-left">
            Starts from Rs. 1599/-sft
          </Button>
        </div>
      </section>

      <Modal size='5xl' dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader><span className="text-[#660000] font-bold text-2xl">Quote</span></ModalHeader>
        <ModalBody>
          <form className="space-y-10 bg-white shadow-lg rounded-lg p-8">
            <div>
              <Label htmlFor="name" className="block text-[#660000] font-medium">
                Name
              </Label>
              <TextInput onChange={e => setQuote({ ...quote, name: e.target.value })} id="name" type="text" placeholder="Type your name..." required className="mt-2" />
            </div>
            <div>
              <Label htmlFor="mobile" value="Mobile Number" className="text-[#660000]" >Mobile</Label>
              <TextInput onChange={e => setQuote({ ...quote, mobile: e.target.value })} id="mobile" type="tel" placeholder="Mobile Number" required className="mt-2" />
            </div>
            <div>
              <Label value="Your Current Location (Country of Residence)" className="text-[#660000]" >Location</Label>
              <div className="flex flex-col mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Radio onChange={e => setQuote({ ...quote, location: e.target.value })} id="india" name="location" value="India" />
                  <Label htmlFor="india">India</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio onChange={e => setQuote({ ...quote, location: e.target.value })} id="outsideIndia" name="location" value="Outside India" />
                  <Label htmlFor="outsideIndia">Outside India</Label>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="city" value="Select City" className="text-[#660000]">Select City</Label>
              <select onChange={e => setQuote({ ...quote, city: e.target.value })}
                id="city"
                name="city"
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#330000] focus:ring-[#330000]"
              >
                <option value="chennai">Chennai</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="email" value="Email" className="text-[#660000]">Email</Label>
              <TextInput onChange={e => setQuote({ ...quote, email: e.target.value })} id="email" type="email" placeholder="Type your email..." required className="mt-2" />
            </div>
            <div>
              <Label htmlFor="service" value="Select Service" className="text-[#660000]">Select Service</Label>
              <select onChange={e => setQuote({ ...quote, service: e.target.value })}
                id="service"
                name="service"
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#330000] focus:ring-[#330000]"
              >
                <option value="">No Topics selected</option>
                <option value="construction">Construction</option>
                <option value="renovation">Renovation</option>
                <option value="consultation">Consultation</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="message" value="Message" className="text-[#660000]">Message</Label>
              <Textarea onChange={e => setQuote({ ...quote, message: e.target.value })} id="message" placeholder="Type your Message..." rows={4} className="mt-2" />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleAddQuote} type="submit"
            className="w-full bg-[#330000] hover:bg-[#5E445C] text-white font-semibold">SUBMIT</Button>
        </ModalFooter>
      </Modal>

      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-[#660000] mb-4"  data-aos="zoom-in">HOW IT WORKS?</h2>
          <p className="text-[#2F222E]" data-aos="zoom-in">
            Wehouse has been using cutting‑edge technology from the outset to address challenges faced by the regular house construction contractors.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6 max-w-6xl mx-auto">
          <Card className="flex flex-col items-center text-center shadow-md w-full md:w-1/5" data-aos="flip-left">
            <div className="flex items-center gap-4 mb-4">
              <FaClipboardList className="h-14 w-14 text-[#5E445C]" />
              <span className="text-8xl font-extrabold text-gray-300 hover:text-[#660000] transition-colors duration-300">
                1
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#000000]">Your Requirement</h3>
            <p className="text-sm text-[#5E445C]">Tell us your needs and preferences.</p>
          </Card>
          <Card className="flex flex-col items-center text-center shadow-md w-full md:w-1/5" data-aos="flip-left">
            <div className="flex items-center gap-4 mb-4">
              <FaCalculator className="h-14 w-14 text-[#5E445C]" />
              <span className="text-8xl font-extrabold text-gray-300 hover:text-[#660000] transition-colors duration-300">
                2
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#000000]">Cost Estimation</h3>
            <p className="text-sm text-[#5E445C]">Get a transparent cost estimate.</p>
          </Card>
          <Card className="flex flex-col items-center text-center shadow-md w-full md:w-1/5" data-aos="flip-left">
            <div className="flex items-center gap-4 mb-4">
              <FaCalendarAlt className="h-14 w-14 text-[#5E445C]" />
              <span className="text-8xl font-extrabold text-gray-300 hover:text-[#660000] transition-colors duration-300">
                3
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#000000]">Schedule Visit</h3>
            <p className="text-sm text-[#5E445C]">Book a convenient site visit.</p>
          </Card>
          <Card className="flex flex-col items-center text-center shadow-md w-full md:w-1/5" data-aos="flip-left">
            <div className="flex items-center gap-4 mb-4">
              <FaHome className="h-14 w-14 text-[#5E445C]" />
              <span className="text-8xl font-extrabold text-gray-300 hover:text-[#660000] transition-colors duration-300">
                4
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#000000]">Work Execution</h3>
            <p className="text-sm text-[#5E445C]">We execute the construction work.</p>
          </Card>
          <Card className="flex flex-col items-center text-center shadow-md w-full md:w-1/5" data-aos="flip-left">
            <div className="flex items-center gap-4 mb-4">
              <FaSmileBeam className="h-14 w-14 text-[#5E445C]" />
              <span className="text-8xl font-extrabold text-gray-300 hover:text-[#660000] transition-colors duration-300">
                5
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#000000]">Satisfied Delivery</h3>
            <p className="text-sm text-[#5E445C]">Receive your dream home, hassle‑free.</p>
          </Card>
        </div>
      </section>

      <section
        className="py-16 bg-cover bg-center"
        style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/05/59/09/50/360_F_559095057_YeiS6zTM107wRlnenmZZ8ztDjOmG8858.jpg')" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center gap-6">

          <Card className="flex flex-col items-center text-center bg-transparent shadow-none border-none p-6">
            <FaHardHat className="h-16 w-16 text-[#5E445C] mb-3 mx-auto" data-aos="flip-left" />
            <h3 className="text-4xl font-bold text-black" data-aos="zoom-in">2000+</h3>
            <p className="text-xl text-[#660000] font-bold">Workforce</p>
          </Card>
          <Card className="flex flex-col items-center text-center bg-transparent shadow-none border-none p-6">
            <FaBusinessTime className="h-16 w-16 text-[#5E445C] mb-3 mx-auto" data-aos="flip-left" />
            <h3 className="text-4xl font-bold text-black" data-aos="zoom-in">25+</h3>
            <p className="text-xl text-[#660000] font-bold">Experience</p>
          </Card>
          <Card className="flex flex-col items-center text-center bg-transparent shadow-none border-none p-6">
            <FaBuilding className="h-16 w-16 text-[#5E445C] mb-3 mx-auto" data-aos="flip-left" />
            <h3 className="text-4xl font-bold text-black" data-aos="zoom-in">5,000+</h3>
            <p className="text-xl text-[#660000] font-bold">Houses Constructed</p>
          </Card>
          <Card className="flex flex-col items-center text-center bg-transparent shadow-none border-none p-6">
            <FaProjectDiagram className="h-16 w-16 text-[#5E445C] mb-3 mx-auto" data-aos="flip-left" />
            <h3 className="text-4xl font-bold text-black" data-aos="zoom-in">200+</h3>
            <p className="text-xl text-[#660000] font-bold">Projects</p>
          </Card>
          <Card className="flex flex-col items-center text-center bg-transparent shadow-none border-none p-6">
            <FaUsers className="h-16 w-16 text-[#5E445C] mb-3 mx-auto" data-aos="flip-left" />
            <h3 className="text-4xl font-bold text-black" data-aos="zoom-in">4,500+</h3>
            <p className="text-xl text-[#660000] font-bold">Homes Delivered</p>
          </Card>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#660000]" data-aos="zoom-in">Our Packages</h2>
          <p className="text-lg text-[#5E445C] mt-2" data-aos="zoom-in">
            Compare Standard, Premium, and Luxury options
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-[#5E445C] text-[#330000] shadow-lg border border-[#330000]">
            <h3 className="text-2xl font-bold mb-4 text-center">Standard</h3>
            <Accordion collapseAll>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Design</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Digital plot and contour survey</li>
                    <li>2D floor plan & 3D Elevation</li>
                    <li>GFC drawings (Section, Elevation, architectural, cross section, details)</li>
                    <li>RCC drawings</li>
                    <li>Electrical & Plumbing drawings</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Structure</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Cement - JSW OPC 53, JSW Max Super PPC</li>
                    <li>Steel - JSW Neo Steel 550D</li>
                    <li>Cement Concrete Blockwork (Jyoti) for walls</li>
                    <li>P Sand for plastering</li>
                    <li>10.5' Ceiling Height</li>
                    <li>2' elevated Plinth level</li>
                    <li>Branded waterproofing products</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Flooring & Dado</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>2' X 2' Vitrified tiles for Living, Dining, Bedrooms, Kitchen</li>
                    <li>2' X 2' Ceramic tiles for balcony & washroom</li>
                    <li>2' tall kitchen dado with ceramic tiles</li>
                    <li>7' washroom dado with ceramic tiles</li>
                    <li>Granite for Staircase & Kitchen countertop</li>
                    <li>Parking tiles included</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Door and Windows</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Main door - Teak wood frame & Teak door</li>
                    <li>Internal doors - Wooden frame & flush doors</li>
                    <li>Toilet doors - Wooden frame & WPC doors</li>
                    <li>UPVC Sliding window with mosquito mesh</li>
                    <li>SS finish aluminum hardware</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Painting</AccordionTitle>
                <AccordionContent>
                  <p className="text-sm">Internal and external - JSW Pixa Elegant</p>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Electrical</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Polycab or equivalent wiring</li>
                    <li>Anchor Roma Penta switches & sockets</li>
                    <li>Exhaust fan provision for kitchen & toilets</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Plumbing</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Astral pipes</li>
                    <li>UGWT - 8000 ltrs capacity</li>
                    <li>OHWT - PVC Double layered, 2000 ltrs</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Railing and Handrails</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>MS Window grills</li>
                    <li>MS Staircase railing</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>

            </Accordion>
          </Card>
          <Card className="bg-[#5E445C] text-[#330000] shadow-lg border border-[#330000]">
            <h3 className="text-2xl font-bold mb-4 text-center">Premium</h3>
            <Accordion collapseAll>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Design</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Digital plot and contour survey</li>
                    <li>2D floor plan & 3D Elevation</li>
                    <li>GFC drawings (Section, Elevation, architectural, cross section, details)</li>
                    <li>RCC drawings</li>
                    <li>Electrical & Plumbing drawings</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Structure</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Cement - JSW OPC 53, JSW Max Super PPC</li>
                    <li>Steel - JSW Neo Steel 550D</li>
                    <li>Cement Concrete Blockwork (Jyoti) for walls</li>
                    <li>P Sand for plastering</li>
                    <li>10.5' Ceiling Height</li>
                    <li>2' elevated Plinth level</li>
                    <li>Branded waterproofing products</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Flooring & Dado</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>2' X 2' Vitrified tiles for Living, Dining, Bedrooms, Kitchen</li>
                    <li>2' X 2' Ceramic tiles for balcony & washroom</li>
                    <li>2' tall kitchen dado with ceramic tiles</li>
                    <li>7' washroom dado with ceramic tiles</li>
                    <li>Granite for Staircase & Kitchen countertop</li>
                    <li>Parking tiles included</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Door and Windows</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Main door - Teak wood frame & Teak door</li>
                    <li>Internal doors - Wooden frame & flush doors</li>
                    <li>Toilet doors - Wooden frame & WPC doors</li>
                    <li>UPVC Sliding window with mosquito mesh</li>
                    <li>SS finish aluminum hardware</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Painting</AccordionTitle>
                <AccordionContent>
                  <p className="text-sm">Internal and external - JSW Pixa Elegant</p>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Electrical</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Polycab or equivalent wiring</li>
                    <li>Anchor Roma Penta switches & sockets</li>
                    <li>Exhaust fan provision for kitchen & toilets</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Plumbing</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Astral pipes</li>
                    <li>UGWT - 8000 ltrs capacity</li>
                    <li>OHWT - PVC Double layered, 2000 ltrs</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Railing and Handrails</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>MS Window grills</li>
                    <li>MS Staircase railing</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>
          </Card>
          <Card className="bg-[#5E445C] text-[#330000] shadow-lg border border-[#330000]">
            <h3 className="text-2xl font-bold mb-4 text-center">Luxury</h3>
            <Accordion collapseAll>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Design</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Digital plot and contour survey</li>
                    <li>2D floor plan & 3D Elevation</li>
                    <li>GFC drawings (Section, Elevation, architectural, cross section, details)</li>
                    <li>RCC drawings</li>
                    <li>Electrical & Plumbing drawings</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Structure</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Cement - JSW OPC 53, JSW Max Super PPC</li>
                    <li>Steel - JSW Neo Steel 550D</li>
                    <li>Cement Concrete Blockwork (Jyoti) for walls</li>
                    <li>P Sand for plastering</li>
                    <li>10.5' Ceiling Height</li>
                    <li>2' elevated Plinth level</li>
                    <li>Branded waterproofing products</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Flooring & Dado</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>2' X 2' Vitrified tiles for Living, Dining, Bedrooms, Kitchen</li>
                    <li>2' X 2' Ceramic tiles for balcony & washroom</li>
                    <li>2' tall kitchen dado with ceramic tiles</li>
                    <li>7' washroom dado with ceramic tiles</li>
                    <li>Granite for Staircase & Kitchen countertop</li>
                    <li>Parking tiles included</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Door and Windows</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Main door - Teak wood frame & Teak door</li>
                    <li>Internal doors - Wooden frame & flush doors</li>
                    <li>Toilet doors - Wooden frame & WPC doors</li>
                    <li>UPVC Sliding window with mosquito mesh</li>
                    <li>SS finish aluminum hardware</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Painting</AccordionTitle>
                <AccordionContent>
                  <p className="text-sm">Internal and external - JSW Pixa Elegant</p>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Electrical</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Polycab or equivalent wiring</li>
                    <li>Anchor Roma Penta switches & sockets</li>
                    <li>Exhaust fan provision for kitchen & toilets</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Plumbing</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Astral pipes</li>
                    <li>UGWT - 8000 ltrs capacity</li>
                    <li>OHWT - PVC Double layered, 2000 ltrs</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-[#330000]">Railing and Handrails</AccordionTitle>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>MS Window grills</li>
                    <li>MS Staircase railing</li>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>
          </Card>

        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
          <div>
            <h2 className="text-4xl font-extrabold text-[#660000] mb-4" data-aos="zoom-in">
              What our Client's Say
            </h2>
            <p className="text-lg text-[#5E445C] mb-6">
              We Have A Wealth Of Experience Working As Main Building Contractors On All Kinds Of Projects, Big And Small, From Home Maintenance And Improvements To Extensions, Refurbishments And New Builds.
            </p>
            <Button
              color="light"
              className="bg-[#660000] text-white hover:bg-[#5E445C] transition"
            >
              View More
            </Button>
          </div>

          <Card className="shadow-lg border border-[#5E445C] bg-white" data-aos="flip-left">
            <p className="text-[#330000] text-base mb-4">
              “I love House Construct; everyone has been great to work with. Professionalism, Punctuality, Quality, Responsiveness, Value — good quality and value for money. Thank you for the amazing service.”
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5E445C] flex items-center justify-center text-white font-bold">
                C
              </div>
              <div>
                <p className="font-semibold text-[#330000]">Chandan</p>
                <p className="text-sm text-[#5E445C]">Customer</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />

    </div>
  )
}

export default Home
