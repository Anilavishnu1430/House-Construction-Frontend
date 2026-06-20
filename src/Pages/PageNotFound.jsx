import React from 'react'
import { Button } from "flowbite-react";
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
       <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-black mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-black-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-black mb-6 max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="w-full max-w-xs">
        <Button  className="bg-[#660000] text-black w-full hover:bg-[#2f222e]">
          Go Back Home
        </Button>
      </Link>
    </section>
    </div>
  )
}

export default PageNotFound
