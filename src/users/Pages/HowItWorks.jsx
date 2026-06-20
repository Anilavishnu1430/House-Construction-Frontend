import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Card } from "flowbite-react";
import { HiOutlineCalendar, HiOutlineSearch, HiOutlinePencilAlt, HiOutlineClipboardList, HiOutlineHome, HiOutlineGift } from "react-icons/hi";

function HowItWorks() {
  return (
    <div>
      <Header/>
      <section className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-[#660000] mb-4 text-center dark:text-white" data-aos="zoom-in">
          How it works
        </h2>
        <p className="text-lg text-black-800 mb-12 text-center" data-aos="zoom-in">
          Expertly built homes, from concept to completion in approximately 14 months.
        </p>
        <div className="rounded-lg overflow-hidden shadow-lg mb-12">
          <img
            src="https://cdn.jswonehomes.com/ky1otg6bcuwxb0fm2iyd_61c19122ae/ky1otg6bcuwxb0fm2iyd_61c19122ae.webp"
            alt="DreamConstruct building process"
            className="w-full h-96 object-cover" data-aos="flip-right"
          />
        </div>
        <h3 className="text-3xl font-extrabold text-[#660000] mb-4 text-center" data-aos="zoom-in">
          Our building process at glance
        </h3>
        <p className="text-lg text-black-800 mb-12 text-center" data-aos="zoom-in">
          Explore our step-by-step process of building your dream home.
        </p>
        <div className="space-y-6">
          <Card className="bg-white border border-gray-200 shadow-md" data-aos="fade-up">
            <div className="flex items-start gap-4">
              <HiOutlineCalendar className="text-[#330000] w-12 h-12 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-[#330000]">Book a meeting</h3>
                <p className="text-black/80">
                  Schedule a session to learn about us and our process.
                </p>
              </div>
            </div>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-md" data-aos="fade-up">
            <div className="flex items-start gap-4">
              <HiOutlineSearch className="text-[#330000] w-12 h-12 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-[#330000]">Do your research</h3>
                <p className="text-black/80">
                  Explore reference sites, get a preliminary quote, and review our contracts.
                </p>
              </div>
            </div>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-md" data-aos="fade-up">
            <div className="flex items-start gap-4">
              <HiOutlinePencilAlt className="text-[#330000] w-12 h-12 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-[#330000]">Begin design</h3>
                <p className="text-black/80">
                  Make the design phase payment to begin crafting your dream home designed by our empanelled architects.
                </p>
              </div>
            </div>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-md" data-aos="fade-up">
            <div className="flex items-start gap-4">
              <HiOutlineClipboardList className="text-[#330000] w-12 h-12 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-[#330000]">Pre‑Construction</h3>
                <p className="text-black/80">
                  Make the pre‑construction payment and leave the rest to us – while we finalise designs, conduct soil tests, provide final quotations and project plans, arrange contractor meetings, and complete legal formalities.
                </p>
              </div>
            </div>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-md" data-aos="fade-up">
            <div className="flex items-start gap-4">
              <HiOutlineHome className="text-[#330000] w-12 h-12 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-[#330000]">Construction</h3>
                <p className="text-black/80">
                  Track progress through weekly updates, scheduled meetings and detailed reports.
                </p>
              </div>
            </div>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-md" data-aos="fade-up">
            <div className="flex items-start gap-4">
              <HiOutlineGift className="text-[#330000] w-12 h-12 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-[#330000]">Handover & Housewarming</h3>
                <p className="text-black/80">
                  From dream to reality – enjoy a seamless handover with one‑year defect liability support, a structural stability certificate and a five‑year structural warranty for worry‑free ownership.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
      <Footer/>
    </div>
  )
}

export default HowItWorks
