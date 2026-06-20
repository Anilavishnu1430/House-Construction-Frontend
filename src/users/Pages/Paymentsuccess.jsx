import React from 'react'
import { Button } from "flowbite-react";
import { HiArrowLeft } from "react-icons/hi";
import Header from '../components/Header'
import Footer from "../../components/Footer";
import { Link } from 'react-router-dom';

function Paymentsuccess() {
  return (
    <div>
      <Header/>
      <div className="flex justify-center items-center min-h-screen text-center gap-8">
      <div>
        <h1 className="text-3xl font-bold text-green-500 mb-6">Congratulations</h1>
      <p className="text-gray-700 max-w-md mb-6">
        Congratulations! Your booking is confirmed with an advance payment of ₹5000. You can customize interiors, flooring, and layout as per your choice.
      </p>
     <Link to={"/rating"}>
      <Button className="bg-[#660000] hover:bg-[#5E445C] inline-flex items-center gap-2">
        Give Feedback
      </Button>
     </Link>
      </div>
      <div>
        <img
        src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif"
        alt="Funny GIF"
        className="rounded shadow-md w-100 h-auto"
      />

      </div>
    </div>

<Footer/>
    </div>
  )
}

export default Paymentsuccess
