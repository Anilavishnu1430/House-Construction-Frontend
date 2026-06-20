import React from 'react'
import { Button } from "flowbite-react";
import { HiArrowLeft } from "react-icons/hi";
import Header from '../components/Header'
import Footer from "../../components/Footer";
import { Link } from 'react-router-dom';


function Paymenterror() {
  return (
    <div>
      <Header/>
      <div className="flex justify-center items-center min-h-screen text-center gap-8">
      <div>
        <h1 className="text-3xl font-bold text-red-600 mb-6">Sorry! Your Payment is Unsuccessfull</h1>
      <p className="text-gray-700 max-w-md mb-6">
        We Apologize for the inconvience caused and appreciate your visit to bookstore.
      </p>
      <Link to={"/projects"}>
      <Button  className=" inline-flex items-center gap-2 bg-[#660000] hover:bg-[#5E445C]">
        <HiArrowLeft className="h-5 w-5" />
        Explore More Project
      </Button>
      </Link>
      </div>
      <div>
        <img
        src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif"
        alt="Funny GIF"
        className="rounded shadow-md w-100 h-auto"
      />

      </div>
    </div>

<Footer/>
    </div>
  )
}

export default Paymenterror
