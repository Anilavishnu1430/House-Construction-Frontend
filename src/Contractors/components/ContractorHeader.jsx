import React, { useEffect } from 'react'
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarToggle } from "flowbite-react";
import { Link } from 'react-router-dom';
import Houselogo from "../../assets/Houselogo.png";
import { serverURL } from '../../services/serverURL';
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function ContractorHeader() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [contractorDetails, setContractorDetails] = React.useState({})

  useEffect(() => {
    setContractorDetails(JSON.parse(sessionStorage.getItem("existingUser")))
  }, [])
  return (
    <div>
      <Navbar fluid className="text-black" style={{ backgroundColor: "#5e445c" }}>
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center">
            <img
              src={Houselogo}
              className="mr-3 h-6 sm:h-9 rounded-full"
              alt="House Logo"
            />
            <h1>DreamConstruct</h1>
          </div>
          <div className="flex justify-center flex-1">
            <div className="flex space-x-8">
              <Link to="/conhome" className="text-black hover:text-[#660000] font-medium transition-colors">
                🏠 Home
              </Link>
              <Link to="/reqwork" className="text-black hover:text-[#660000] font-medium transition-colors">
                🧰 Request Work
              </Link>
              <Link to="/done" className="text-black hover:text-[#660000] font-medium transition-colors">
                📋 Work Updates
              </Link>
              <Link to="/history" className="text-black hover:text-[#660000] font-medium transition-colors">
                📜 Work History
              </Link>
            </div>
          </div>
          <div className="flex md:order-2 items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="px-4 py-1 rounded bg-black text-white dark:bg-white dark:text-black"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
            <Link to="/profilesettings" className="text-black hover:text-[#660000] font-medium transition-colors">
              ⚙️
            </Link>

            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={
                    contractorDetails.profile
                      ? contractorDetails.profile.startsWith("http")
                        ? contractorDetails.profile
                        : `${serverURL}/uploads/${contractorDetails.profile}`
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
                  }
                  rounded
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">{contractorDetails.username}</span>
                <span className="block truncate text-sm font-medium">{contractorDetails.email}</span>
              </DropdownHeader>
              <Link to={"/profilesettings"}><DropdownItem>Settings</DropdownItem></Link>
              <DropdownDivider />
              <Link to={"/login"}><DropdownItem>Sign out</DropdownItem></Link>
            </Dropdown>


            <NavbarToggle />
          </div>
        </div>
      </Navbar>
      <Navbar className="bg-[#dd9292]">
        <marquee behavior="scroll" direction="left" className="text-white font-semibold">
          Welcome! Track your projects, requests, and progress here.
        </marquee>
      </Navbar>
    </div>
  )
}

export default ContractorHeader
