// src/pages/BusinessDashboard.js
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Link } from 'react-router-dom';
import BusinessSideBar from './businessSideBar';
// ✅ Register Chart.js components
// ✅ Register all required ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);
import { ToastContainer, toast } from 'react-toastify';
import { 
  GetProfile, 
  GetAnalytics, 
  GetItems, 
  customers_success,
  GetCustomers 
} from '../store/ActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowDropDown } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const BusinessDashboard = () => {
  let dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [bookableItems, setBookableItems] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [ edit, setEdit ] = useState(false);

  let businessProfile = useSelector((state) => state.profile);
  let login = useSelector((state) => state.login);
  let items = useSelector((state) => state.items);
  let analyticsInfo = useSelector((state) => state.analytics);
  let customers = useSelector((state) => state.customer);
  const [period, setPeriod] = useState("Daily"); // Default selection
  const [isOpen, setIsOpen] = useState(false); // Dropdown state
  const [ schedule, setSchedule ] = useState(0);
  const [ cancel, setCancel ] = useState(0);
  const [ complete, setComplete ] = useState(0);
  const [newCustomer, setNewCustomer] = useState({
    businessId: businessProfile.message?._id,
    name: "",
    // location: "",
    email: "",
    address: ""
  });


  const handleSelect = (value) => {
    setPeriod(value);
    setIsOpen(false); // Close dropdown after selection
  };

  const  analyticsStore = useSelector((state) => state.analytics);

  // let businessBooking  = useSelector((state) => state.getBusinessBooking);

  useEffect(() => {
    if (businessProfile.message !== null) {
      dispatch(GetAnalytics({businessId: businessProfile.message?._id, timeframe: period}));
    }
  }, [period]);

  useEffect(() => {    
    setTimeout(() => {
      dispatch(GetProfile());
    }, 50);
  }, []);

  useEffect(() => {
    if (analyticsInfo.message !== null) {
      setAnalytics(analyticsInfo.message.formattedData);
  
      setSchedule(analyticsInfo.message.overallAnalytics?.TotalScheduledBooking);
  
      setCancel(analyticsInfo.message.overallAnalytics?.TotalCancelledBooking);
  
      setComplete(analyticsInfo.message.overallAnalytics?.TotalCompletedBooking);
    }
  }, [analyticsInfo])

  useEffect(() => {
    // const itemsResponse = await api.get('/api/booking/get-business-bookings');
    const getAllNecessaryThing = async () => {
      dispatch(GetItems(businessProfile.message?._id)), 
      dispatch(GetAnalytics({businessId: businessProfile.message?._id, timeframe: period}));
      dispatch(GetCustomers(businessProfile.message?._id))
    }
    if (businessProfile.message !== null) {
      getAllNecessaryThing();
    } else if (businessProfile.isLoading == false && businessProfile.message == null) {
      toast("Please complete your profile to continue.", {
        position: "top-center",
      });
      window.location.href = "/business-profile";
    }
  }, [businessProfile]);

  // Handler to add a new bookable item
  const onEditCustomer = async (data) => {
    try {
      setEdit(true)
      setNewCustomer({ 
        customerId: data?._id || "", 
        name: data?.name || "", 
        // location: data?.location || "", 
        email: data?.email || "", 
        address: data?.address || ""
       });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const EditCustomer = async (e) => {
    try {
      e.preventDefault();
      console.log("newCustomer", newCustomer);
      let customerinfo;
      if (newCustomer.customerId == "" || newCustomer.customerId == undefined) {
        customerinfo = await api.post("/api/customer/create-customer", newCustomer);
      } else {
        let data = { ...newCustomer, businessId: businessProfile.message?._id};
        customerinfo = await api.put("/api/customer/update-customer", data);
      }
      console.log("newCustomer", customerinfo.data.data);
      if (customerinfo.data.data !== null && customerinfo.data.data.length > 0) {
        dispatch(customers_success(customerinfo.data.data));
        setNewCustomer({ 
          businessId: businessProfile.message?._id,
          customerId: "", 
          name: "", 
          // location: data?.location || "", 
          email: "", 
          address: ""
         });
        setEdit(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const onDeleteCustomer = async (item) => {
    try {
      let customerinfo = await api.delete("/api/customer/delete-customer", {data: {customerId: item._id, businessId: businessProfile.message?._id}});
      console.log("newCustomer", customerinfo.data.data);
      if (customerinfo.data.data !== null && customerinfo.data.data.length > 0) {
        dispatch(customers_success(customerinfo.data.data));
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleAddCustomer = () => {
    try {

    } catch (error) {
      console.log("error", error);
    }
  }


  const barChartRef = useRef(null);
  const lineChartRef  = useRef(null);

  // Clean up charts on unmount
  useEffect(() => {
    return () => {
      if (barChartRef.current) {
        barChartRef.current.destroy();
      }
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }
    };
  }, []);
  
  // Define chart options for responsiveness
  const barChartOptions = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  const lineChartOptions = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  const bookingData = {
    // labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    labels: analytics.map((data) => data.date),
    datasets: [
      {
        label: "Total Bookings",
        backgroundColor: "#2D85DE",
        data: analytics?.map((data) => data.totalBookings), //[80, 90, 30, 60, 50, 100, 70],
      },
      {
        label: "Total Scheduled",
        backgroundColor: "#E74C3C",
        data: analytics?.map((data) => data.scheduledBookings) // [20, 25, 10, 15, 20, 35, 15],
      },
      {
        label: "Total Completed",
        backgroundColor: "#3BAF6F",
        data: analytics?.map((data) => data.completedBookings) // [20, 25, 10, 15, 20, 35, 15],
      },
      {
        label: "Total Cancelled",
        backgroundColor: "#FF9800",
        data: analytics?.map((data) => data.cancelledBookings) // [20, 25, 10, 15, 20, 35, 15],
      },
    ],
  };

  // ✅ Corrected Data for Line Chart
  const lineChartData = {
    labels: analytics.map((data) => data.date),
    datasets: [
      {
        label: "Total Bookings",
        data: analytics.map((data) => data.totalBookings),
        borderColor: "#2D85DE",
        backgroundColor: "rgba(45, 133, 222, 0.2)",
        fill: true,
      },
      {
        label: "Scheduled",
        data: analytics.map((data) => data.scheduledBookings),
        borderColor: "#E74C3C",
        backgroundColor: "rgba(231, 76, 60, 0.2)",
        fill: true,
      },
      {
        label: "Completed",
        data: analytics.map((data) => data.completedBookings),
        borderColor: "#3BAF6F",
        backgroundColor: "rgba(59, 175, 111, 0.2)",
        fill: true,
      },
      {
        label: "Cancelled",
        data: analytics.map((data) => data.cancelledBookings),
        borderColor: "#FF9800",
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        fill: true,
      },
    ],
  };
  const analyticsData = {
    labels: analytics.map((data) => data.date) || ["Confirm", "Pending", "Cancel", "Success"],
    datasets: [
      {
        data: [35, 35, 15, 15],
        backgroundColor: ["#4A90E2", "#FF9800", "#E74C3C", "#2ECC71"],
      },
    ],
  };
  //  console.log("businessBooking", businessBooking.businessBookings);
  //  businessBooking = businessBooking.businessBookings;

   const formatData = (isoDate) => {
    const dateObj = new Date(isoDate);
  
    // Format to display "February 24"
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric"
    });
    return formattedDate;
  }
  
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      {/* <div className=''>
        <BusinessSideBar />
      </div> */}

      {/* Main Dashboard */}
      <main className="p-6 bg-gray-100">
        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-gray-500">customers</h3>
            <p className="text-xl font-bold">{customers.message !== null ? customers.message?.length : 0}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-gray-500">Cancelled</h3>
            <p className="text-xl font-bold">{cancel}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-gray-500">Completed</h3>
            <p className="text-xl font-bold">{complete}</p>
          </div>
          <div className="p-4 shadow rounded-lg">
          <div className="relative inline-block text-left">
          {/* Dropdown Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center justify-between min-w-[120px] hover:bg-pink-600"
          >
            {period} <MdArrowDropDown className='w-[30px] h-[30px]' />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute mt-2 bg-white text-gray-800 shadow-md rounded-lg w-40">
              <button
                onClick={() => handleSelect("Daily")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Daily
              </button>
              <button
                onClick={() => handleSelect("Weekly")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Weekly
              </button>
              <button
                onClick={() => handleSelect("Monthly")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Monthly
              </button>
            </div>
          )}
        </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid vsm:grid-col-2 md:grid-cols-4 gap-6 mt-6">
          {/* Weekly Bookings */}
          <div className="bg-white shadow rounded-lg p-6 md:col-span-2 w-full h-[300px] md:h-[450px]">
            <h3 className="text-lg font-bold text-gray-700">This Week Booking</h3>
            <div className='w-full h-[300px] md:h-[400px]'>
              <Bar ref={barChartRef} key={JSON.stringify(bookingData)} data={bookingData} options={barChartOptions}/>
            </div>            
          </div>

          {/* Analytics */}
          <div className="bg-white shadow rounded-lg p-6 md:col-span-2 w-full h-[300px] md:h-[450px]">
            <h3 className="text-lg font-bold text-gray-700">Analytics</h3>
            <div className='w-full h-[300px] md:h-[400px]'>
              <Line ref={lineChartRef} key={JSON.stringify(lineChartData)} data={lineChartData} options={lineChartOptions} />
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white shadow rounded-lg p-6 mt-6 w-full">
          <div className='flex items-center justify-between'>
            <h3 className="text-lg font-bold text-gray-700">Recent Bookings</h3>
            <button className="flex items-center bg-pink-500 px-4 py-2 rounded-lg hover:bg-pink-600 text-white" onClick={() => setEdit(true)}>
              <FiPlus className="mr-2" />Add Customer</button>
          </div>
          <table className="w-full mt-4">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Customer Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Edit Booking</th>
                <th className="py-3 px-6 text-left">Delete</th>
                {/* <th className="py-3 px-6 text-left">Payment Method</th> */}
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {customers.message?.map(customer => {
                return (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{customer.name}</td>
                    <td className="py-3 px-6 text-left">{customer.email}</td>
                    <td className="py-3 px-6 text-left text-green-500">{customer.address}</td>
                    <td className="py-3 px-6 text-left" onClick={() => onEditCustomer(customer)}><AiFillEdit /></td>
                    <td className="py-3 px-6 text-left" onClick={() => onDeleteCustomer(customer)}><MdDeleteForever /></td>
                    {/* <td className="py-3 px-6 text-left">{booking.paymentMethod}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {edit && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Book Service</h2>
              <form onSubmit={EditCustomer} className="space-y-4">
                <input type="hidden" name="customerId" value={newCustomer?.customerId} />

                <input type="text" name="name" value={newCustomer?.name} placeholder='Name'  onChange={(e) => setNewCustomer((prev) => ({...prev, name: e.target.value}))} className='w-full p-2' />

                <input type="text" name="email" value={newCustomer?.email} placeholder='Email' onChange={(e) => setNewCustomer((prev) => ({...prev, email: e.target.value}))} className='w-full p-2' />

                <input type="text" name="address" value={newCustomer?.address} placeholder='Address' onChange={(e) => setNewCustomer((prev) => ({...prev, address: e.target.value}))} className='w-full p-2' />
  
                {/* <input type="text" name="location" value={newCustomer?.location} placeholder='Location' onChange={(e) => setNewCustomer({location: e.target.value})} /> */}
  
                <button
                  type="submit"
                  className="w-full bg-pink-500 py-2 rounded-md text-white hover:bg-pink-700"
                >
                  {newCustomer?.customerId !== "" && newCustomer?.customerId !== undefined ? "Update Customer" : "Create Customer"}                  
                </button>
              </form>
              <button
                onClick={() => setEdit(false)}
                className="w-full mt-2 bg-gray-500 py-2 rounded-md text-white hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
          )}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default BusinessDashboard;
