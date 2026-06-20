import React, { useContext, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Button, FloatingLabel, Radio, Label, Card, } from "flowbite-react";
import { Link } from 'react-router-dom';
import { Pagination } from "flowbite-react";
import { useState } from "react";
import { viewAllProjectAPI } from '../../services/allAPIs';
import { searchContext } from '../../context/SearchContext';




function Projects() {
    const [token, setToken] = React.useState("")
    console.log(token);
    const [allProjects, setAllProjects] = React.useState([])
    const [dummyProjects, setDummyProjects] = React.useState([])
    const { searchKey, setSearchKey } = useContext(searchContext)
    console.log(searchKey);

    useEffect(() => {
        setToken(sessionStorage.getItem("token"))
        viewProject(searchKey)
    }, [token, searchKey])

    const viewProject = async (searchKey) => {
        try {
            const reqHeader = {
                Authorization: `Bearer ${token}`
            }
            const response = await viewAllProjectAPI(searchKey, reqHeader)
            console.log(response);
            setAllProjects(response.data.viewProject)
            setDummyProjects(response.data.viewProject)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleFilter = (fltr) => {
        console.log(fltr);
        if (fltr == "All") {
            setAllProjects(dummyProjects)
        }
        else {
            setAllProjects(dummyProjects.filter(item => (item.location).toLowerCase().trim() == fltr.toLowerCase().trim()))
        }
    }


    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = allProjects.slice(indexOfFirstItem, indexOfLastItem);

    const onPageChange = (page) => setCurrentPage(page);

    return (
        <div>
            <Header />
            {
                token ?
                    <div>
                        <h1 className="ps-10 mt-6 text-2xl text-[#660000]">Project Gallery</h1>
                        <div className="mx-auto w-full max-w-md mt-5">
                            <FloatingLabel onChange={(e) => setSearchKey(e.target.value)}
                                variant="outlined"
                                placeholder="Search projects"
                                className="bg-[#A68CA3] text-[#660000] placeholder-gray-100"
                            />
                        </div>
                        <div className="flex">
                            <div className="p-10 rounded-lg text-black-800">
                                <h3 className="text-xl font-semibold mb-4">Filter by City</h3>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2">
                                        <Radio onClick={() => handleFilter("All")} id="All" name="city" value="All" />
                                        <Label htmlFor="All Locations" className='text-black-800'>All Locations</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Radio onClick={() => handleFilter("Kochi")} id="kochi" name="city" value="Kochi" />
                                        <Label htmlFor="kochi" className='text-black-800'>Kochi</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Radio onClick={() => handleFilter("Chennai")} id="chennai" name="city" value="Chennai" />
                                        <Label htmlFor="chennai" className='text-black-800'>Chennai</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Radio onClick={() => handleFilter("Bengaluru")} id="bengaluru" name="city" value="Bengaluru" />
                                        <Label htmlFor="bengaluru" className='text-black-800'>Bengaluru</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Radio onClick={() => handleFilter("Hyderabad")} id="hyderabad" name="city" value="Hyderabad" />
                                        <Label htmlFor="hyderabad" className='text-black-800'>Hyderabad</Label>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-6">
                                {
                                    currentItems.length > 0 ?
                                        currentItems.map(item => (
                                            <Card className="max-w-sm shadow-md ">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.projectname}
                                                    className="w-full h-48 object-cover rounded-t-md"
                                                />
                                                <h3 className="text-lg font-semibold text-[#660000]">{item.projectname}</h3>
                                                <p className="text-sm text-gray-600">{item.location} | Type: {item.type}</p>
                                                <p className="text-sm text-gray-600">Plot: {item.plotsize} | Facing: {item.direction}</p>
                                                <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                                                <Link to={`/viewproject/${item._id}`}>
                                                    <Button className="mt-3 w-full bg-[#660000] hover:bg-[#5E445C] text-white">
                                                        View Details
                                                    </Button>
                                                </Link>
                                            </Card>
                                        ))
                                        : "No Project Found"
                                }

                            </div>
                        </div>
                        {
                            allProjects.length > itemsPerPage && (
                                <div className="flex justify-center mb-8">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={Math.ceil(allProjects.length / itemsPerPage)}
                                        onPageChange={(page) => setCurrentPage(page)}
                                        showIcons
                                    />
                                </div>
                            )
                        }
                    </div>
                    :
                    <div className='h-screen bg-gray-200 text-center'>
                        <h1 className='text-5xl text-center pt-60'>Please Login</h1>
                        <Link to={'/login'}>
                            <button className='bg-[#660000] hover:bg-[#5E445C] text-white p-3 rounded-2xl mt-6 shadow-2xl'>Login Now</button>
                        </Link>
                    </div>
            }
            <Footer />
        </div>
    )
}

export default Projects
