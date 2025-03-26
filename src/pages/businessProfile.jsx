import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetProfile, CreateProfile, profile_loading } from "../store/ActionCreators";
import { FaUserCircle, FaStar, FaBookmark } from 'react-icons/fa';
import { RiMessage2Fill } from "react-icons/ri";

const BusinessProfilePage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  let businessProfile = useSelector((state) => state.profile);

  let items = useSelector((state) => state.items);

  let customers  = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(GetProfile());
  }, [dispatch]);

  
  // useEffect(() => {
  //   toast.error(createProfileBusinessError, {
  //     position: "top-center"
  //   });
  //   dispatch(cleanBusinessCreation());
  // }, [createProfileBusinessError]);

  useEffect(() => {
    if (businessProfile.isLoading !== true && businessProfile.message == null) {
      setShowModal(true);
    }

  }, [businessProfile]);

  const onSubmit = async (data) => {
    try {
      let result = await dispatch(CreateProfile(data));
      console.log("result", result);
      if (result == businessProfile.message) {
        toast.success("Profile Created Successfully!");
        setShowModal(false);
      } else {
        toast.error(result.payload, {
          position: "top-center"
        });
        dispatch(profile_loading());
      }
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex w-full">
      <div className=" w-full bg-white p-6 rounded-lg shadow-md">
        {businessProfile.isLoading === true ? (
          <p>Loading profile...</p>
        ) : businessProfile.message ? (
          <>
            {/* Profile Header */}
            <div className="flex items-center gap-4 border-b pb-4">
              {/* <FaUserCircle size={80} className="text-gray-400" /> */}
              <div>
                <h2 className="text-2xl font-bold">{businessProfile.message?.name}</h2>
                <p className="text-gray-500">{businessProfile.message?.type_of_business || 'Business Type'}</p>
                <p className="text-gray-500">{businessProfile.message?.location}</p>
                <p className="text-gray-500">{businessProfile.message?.Email}</p>
              </div>
            </div>

            {/* Business Description */}
            <p className="mt-4 text-gray-700">{businessProfile.message?.About}</p>

            {/* Business Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {businessProfile.message?.open_days?.map((day) => (
                <span key={day} className="bg-gray-200 px-3 py-1 text-sm rounded-full">
                  {day}
                </span>
              ))}
            </div>

            {/* Follow & Message */}
            {/* <div className="flex gap-4 mt-6">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Follow</button>
              <button className="bg-gray-300 px-4 py-2 rounded-lg flex items-center gap-2">
                <RiMessage2Fill /> Message
              </button>
            </div> */}

            {/* Business Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6 border-t pt-4">
              <div className="text-center">
                <h3 className="text-xl font-bold">{customers.message !== null ? customers.message?.length : 0}</h3>
                <p className="text-gray-500 vsm:text-xs md:text-sm">Bookings</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">{items.message !== null ? items.message?.length : 0}</h3>
                <p className="text-gray-500 vsm:text-xs md:text-sm">Booking items created</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">{businessProfile.message?.reviews || 0}</h3>
                <p className="text-gray-500 vsm:text-xs md:text-sm">Reviews</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">{businessProfile.message?.totalViews || 0}</h3>
                <p className="text-gray-500 vsm:text-xs md:text-sm">Views</p>
              </div>
            </div>

            {/* Services Offered */}
            <h3 className="mt-6 text-lg font-bold">Services</h3>
            <div className="grid vsm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              {items.message?.map((service) => (
                <div key={service.id} className="p-4 border rounded-lg">
                  <h4 className="font-semibold">{service.name}</h4>
                  <p className="text-sm text-gray-500">{service.description}</p>
                  <p className="text-sm font-bold text-blue-500">${service.pricing}</p>
                  <button className="mt-2 bg-gray-300 px-4 py-1 rounded flex items-center gap-2">
                    <FaBookmark /> Save
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Create Business Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <input type="text" {...register("name", { required: true })} placeholder="Business Name" className="w-full p-2 border rounded" required />
                  <input type="email" {...register("Email", { required: true })} placeholder="Email" className="w-full p-2 border rounded" required />
                  <input type="text" {...register("type_of_business")} placeholder="Type of Business" className="w-full p-2 border rounded" />
                  <input type="text" {...register("Phone_number")} placeholder="Phone Number" className="w-full p-2 border rounded" />
                  <input type="text" {...register("location")} placeholder="Location" className="w-full p-2 border rounded" />
                  <textarea {...register("About", { required: true })} placeholder="About your business" className="w-full p-2 border rounded" required />
                  <input type="text" {...register("website")} placeholder="Website (optional)" className="w-full p-2 border rounded" />
                  <div className="flex gap-2">
                    <input type="time" {...register("hours.opening", { required: true })} className="w-full p-2 border rounded" required />
                    <input type="time" {...register("hours.closing", { required: true })} className="w-full p-2 border rounded" required />
                  </div>
                  <label className="block">Open Days:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <label key={day} className="text-sm flex items-center gap-2">
                        <input type="checkbox" {...register("open_days")} value={day} />
                        {day}
                      </label>
                    ))}
                  </div>
                  <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Create Profile</button>
                  <button onClick={() => setShowModal(false)} className="w-full mt-2 bg-gray-500 text-white py-2 rounded">Cancel</button>
                </form>
              </div>
            </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BusinessProfilePage;
