import React from 'react'
import { Button, TextInput } from "flowbite-react";
import { FaInstagram, FaTwitter, FaPinterest, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div>
      <footer className="bg-[#5E445C] text-black py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">ABOUT US</h3>
            <p className="text-black/80">
              At DreamConstruct, we specialize in building homes that combine
              durability, functionality, and elegant design. From plot surveys and
              architectural planning to premium finishes and modern amenities, our
              mission is to deliver construction solutions that stand the test of
              time and bring your dream home to life.
            </p>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">NEWSLETTER</h3>
            <p className="text-black/80 mb-4">
              Subscribe to receive updates on new projects, construction tips, and
              exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <TextInput
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                required
              />
              <Button className="bg-[#660000] text-white hover:bg-[#2f222e]">
                Subscribe
              </Button>
            </form>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">FOLLOW US</h3>
            <p className="text-black/80 mb-4">Stay connected with our latest builds</p>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="hover:text-[#330000]"><FaInstagram /></a>
              <a href="#" className="hover:text-[#330000]"><FaTwitter /></a>
              <a href="#" className="hover:text-[#330000]"><FaPinterest /></a>
              <a href="#" className="hover:text-[#330000]"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-[#330000] pt-6 text-center text-black/70 text-sm">
          © 2026 DreamConstruct. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Footer
