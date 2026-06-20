import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Button, Textarea, TextInput } from 'flowbite-react'



function Contact() {
    return (
        <div>
            <Header />
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-3xl font-bold text-[#660000] mb-4" data-aos="zoom-in">Contact Us</h1>
                    <p className="text-black-600 mb-10" data-aos="zoom-in">
                        Ready to build your dream home? Connect with our team to discuss your plot,
                        design ideas, and construction timeline. We'll guide you from concept to completion.
                    </p>
                    <div className="rounded-lg overflow-hidden shadow-lg mb-12">
                    <img
                        src="https://cdn.jswonehomes.com/Project_Gallery_1_1_32ee7176fb/Project_Gallery_1_1_32ee7176fb.webp"
                        alt="DreamConstruct building process"
                        className="w-full h-96 object-cover" data-aos="fade-up"
                    />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10" data-aos="flip-left">

                        <div className="bg-black-100 shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-black-800 mb-4">
                                Send us a Message
                            </h3>
                            <form className="space-y-4">
                                <TextInput type="text" placeholder="Full Name" required />
                                <TextInput type="email" placeholder="Email Address" required />
                                <TextInput type="text" placeholder="Phone Number" required />
                                <Textarea placeholder="Tell us about your project" rows={4} required />
                                <Button
                                    type="submit"
                                    className="bg-[#660000] hover:bg-[#5E445C] text-white font-medium px-6 py-2 rounded-md w-full"
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                        <div>
                            <div className="mb-6 space-y-2">
                                <p className="text-black-700">
                                    <span className="font-semibold">Office Address:</span> DreamConstruct HQ,
                                    45 Builders Lane, Kakkanad, Kochi, Kerala
                                </p>
                                <p className="text-black-700">
                                    <span className="font-semibold">Phone:</span> +91 9876541230
                                </p>
                                <p className="text-black-700">
                                    <span className="font-semibold">EEmail:</span> contact@dreamconstruct.com
                                </p>
                            </div>
                            <iframe
                                title="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15720.123456789!2d76.357!3d10.015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d123456789%3A0xabcdef!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v123456789"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                className="rounded-lg shadow-md"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Contact
