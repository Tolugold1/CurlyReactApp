import React from "react"
import { Link } from "react-router-dom"
import { FaChartBar, FaUsers, FaFileInvoice, FaPercentage, FaHeadset  } from "react-icons/fa";
import { BsArrowReturnLeft } from "react-icons/bs";
import { logOut } from "../store/ActionCreators";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import api from "../services/api";

const BusinessSideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let path = window.location.pathname;
    const onLogout = async () => {
        await api.post("/api/auth/logout");
        localStorage.removeItem("jwt");
        navigate("/");
        dispatch(logOut());
    }
    return (
        <div className="sidebar ">
            <aside className="w-20 md:w-64 min-h-screen bg-white p-5">
                <h2 className="hidden md:block text-2xl font-bold text-blue-600">Schedulo</h2>
                <ul className="mt-6">
                    <Link to="/business-dashboard">
                        <li className={`flex items-center p-3 ${path === "/business-dashboard" ? "text-blue-500 bg-blue-100" : "text-gray-600"} rounded-lg`}>
                            <FaChartBar className="md:mr-3 w-[50px] h-[25px]" /> <span className="hidden md:block">Dashboard</span>
                        </li>
                    </Link>
                    <Link to="/business-service">
                    <li className={`flex items-center p-3 ${path === "/business-service" ? "text-blue-500 bg-blue-100" : "text-gray-600"} rounded-lg`}>
                        <FaFileInvoice className="md:mr-3 w-[50px] h-[25px]"  /> <span className="hidden md:block">Service</span>
                    </li>
                    </Link>
                    <Link to="/business-profile">
                    <li className={`flex items-center p-3 ${path === "/business-profile" ? "text-blue-500 bg-blue-100" : "text-gray-600"} rounded-lg`}>
                        <IoPersonSharp className="md:mr-3 w-[50px] h-[25px]"  /> <span className="hidden md:block">Profile</span>
                    </li>
                    </Link>
                    <Link to="#" onClick={onLogout}>
                    <li className={`flex items-center p-3 ${path == "/business-customers" ? "text-blue-500 bg-blue-100" : "text-gray-600"}  rounded-lg`}>
                        <BsArrowReturnLeft  className="md:mr-3 w-[50px] h-[25px]"  /> <span className="hidden md:block">Logout</span>
                    </li>
                    </Link>
                </ul>
                </aside>
        </div>
    )
}

export default BusinessSideBar;